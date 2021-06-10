import React, { Component } from "react";
import { Spinner } from "react-bootstrap";
import "./Test.css";
import axios from "axios";
export default class Test extends Component {
  async submit() {
    var i = 0;
    let res = await axios.post("http://localhost:5000/api/getIO", {
      problem_code: this.state.problem_code
    });

    this.state.fileinput = res.data.body.inputs;
    this.state.fileoutput = res.data.body.outputs;
    const noi = res.data.body.outputs.length;

    var subarray = [];
    for (i = 0; i < 2; i++) {
      var sa = {
        language_id: this.state.language_id,
        source_code: this.state.source_code,
        stdin: this.state.fileinput[i],
        expected_output: this.state.fileoutput[i]
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

    this.state.Results = jsonGetSolution;
    const SubmissionObject = {
      source_code: this.state.source_code,
      verdict: "",
      user: this.state.user,
      language: this.state.languagew,
      problem_code: this.state.problem_code,
      created_on: Date.now()
    };
    var no_ac = 0;
    for (i = 0; i < this.state.Results.length; i++) {
      if (this.state.Results[i].status_id == 3) no_ac++;
    }
    if (no_ac == 2) SubmissionObject.verdict = "Accepted";
    else {
      SubmissionObject.verdict = "Wrong Answer";
    }
    //o.log(SubmissionObject);
    axios
      .post(`http://localhost:5000/api/codesubmit`,  SubmissionObject )
      .then((res) => {
        console.log(res);
      });
     this.forceUpdate();
  }
  constructor(props) {
    super(props);

    if (this.props.location.TestProps) {
      this.state = {
        source_code: this.props.location.TestProps.source_code,
        language_id: this.props.location.TestProps.language_id,
        problem_code: this.props.location.TestProps.problem_code,
        user: this.props.location.TestProps.user,
        languagew: this.props.location.TestProps.languagew,
        fileoutput: null,
        fileinput: null
      };
      console.log('User in test is ', this.props.location.TestProps.user);
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
        if (this.state.Results[i].status_id === 3)
        table.push(<tr class='table-success'>{children}</tr>);
        else
        table.push(<tr class='table-danger'>{children}</tr>);
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
