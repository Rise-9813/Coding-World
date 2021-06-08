import React, { Component } from "react";
import { Spinner } from "react-bootstrap";
import "./Test.css";
export default class Test extends Component {
  async submit() {
    var fs = require("fs");
    var fileinput = [];
    var fileoutput = [];

    for (var i = 0; i < 2; i++) {
      var fi = fs
        .readFileSync(
          `../../public/InputFiles/${this.state.problem_code}/${i}.txt`
        )
        .toString();
      fileinput.push(fi);
      var fo = fs
        .readFileSync(
          `../../public/OutputFiles/${this.state.problem_code}/${i}.txt`
        )
        .toString();
      fileoutput.push(fo);
    }

    var subarray = [];
    for (i = 0; i < 2; i++) {
      var sa = {
        language_id: 53,
        source_code: this.state.source_code,
        stdin: fileinput[i],
        expected_output: fileoutput[i]
      };
      subarray.push(sa);
    }
    const response = await fetch(
      "https://judge0-ce.p.rapidapi.com/submissions/batch?base64_encoded=false",
      {
        method: "POST",
        headers: {
          "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
          "x-rapidapi-key":
            "efd968731amshc0c48985329faebp195f51jsnd8113d8b3fa2", // Get yours for free at https://rapidapi.com/hermanzdosilovic/api/judge0
          "content-type": "application/json"
        },
        body: JSON.stringify({
          submissions: subarray
        })
      }
    );

    const jsonResponse = await response.json();

    var alltokens = "";
    for (i = 0; i < 2; i++) {
      alltokens += jsonResponse[i].token;
      if (i !== 1) alltokens += "%2C";
    }
    let jsonGetSolution = [
      {
        status_id: 1
      },
      {
        status_id: 1
      }
    ];

    for (i = 0; i < 2; i++) {
      while (
        jsonGetSolution[i].status_id === 2 ||
        jsonGetSolution[i].status_id === 1
      ) {
        if (alltokens) {
          let url = `https://judge0-ce.p.rapidapi.com/submissions/batch?tokens=${alltokens}&base64_encoded=false&fields=*`;

          const getSolution = await fetch(url, {
            method: "GET",
            headers: {
              "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
              "x-rapidapi-key":
                "efd968731amshc0c48985329faebp195f51jsnd8113d8b3fa2", // Get yours for free at https://rapidapi.com/hermanzdosilovic/api/judge0
              "content-type": "application/json"
            }
          });

          jsonGetSolution = await getSolution.json();
          jsonGetSolution = jsonGetSolution.submissions;
        }
      }
    }

    console.log(jsonGetSolution[0]);
    console.log(jsonGetSolution[1]);
    this.state.Results = jsonGetSolution;
    this.forceUpdate();
  }
  constructor(props) {
    super(props);

    if (this.props.location.TestProps) {
      this.state = {
        source_code: this.props.location.TestProps.source_code,
        language_id: this.props.location.TestProps.language_id,
        problem_code: this.props.location.TestProps.problem_code
      };
      this.submit();
    } else {
      this.state = {
        source_code: "C++",
        language_id: "",
        problem_code: ""
      };
    }
  }

  createTable = () => {
    if (this.state.Results) {
      let table = [];
      // Outer loop to create parent
      for (let i = 0; i < 2; i++) {
        let children = [];

        children.push(<th scope="row">{` ${i + 1}`}</th>);

        if (this.state.Results[i].status_id === 3)
          children.push(
            <td>
              {" "}
              Accepted
              <i class="far fa-check-circle ac"></i>{" "}
            </td>
          );
        else {
          children.push(
            <td>
              {this.state.Results[i].status.description}
              <i class="far fa-times-circle wa"></i>{" "}
            </td>
          );
        }
        children.push(<td> {this.state.Results[i].time} </td>);
        children.push(<td> {this.state.Results[i].memory} </td>);
        //Create the parent and add the children
        table.push(<tr>{children}</tr>);
      }
      return table;
    }
    return <Spinner animation="border" variant="warning" />;
  };

  render() {
    return (
      <>
        <div class="container">
          <h1> Test Page </h1>
          <h3> Testing your Code Against Available Test Cases </h3>
          <table class="table">
            <thead class="thead-dark">
              <tr>
                <th scope="col">Test Case #</th>
                <th scope="col"> Verdict</th>
                <th scope="col">Execution Time</th>
                <th scope="col">Memory</th>
              </tr>
            </thead>
            <tbody>{this.createTable()}</tbody>
          </table>
        </div>
        <div class="container">
          <p>
            {" "}
            <strong>Problem Code </strong> : {this.state.problem_code}{" "}
          </p>
        </div>
      </>
    );
  }
}
