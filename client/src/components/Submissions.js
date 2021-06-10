import React, { Component } from "react";
import { Spinner } from "react-bootstrap";
import {Link} from 'react-router-dom';
import "./Test.css";
import axios from "axios";
export default class Submissions extends Component {

  constructor(props) {
    super(props);

    
    this.state={
        submissions : null
    };

  }

  async componentDidMount() {  
    try {
        let res = await axios.get("/api/getsubmit"); 
        this.setState({
            submissions: res.data.body.submissions
        }); 
        console.log(res.data.body.submissions);
    } catch(err) {
        console.log('Unexpected error')
    }

    
    
}
  createTable = () => {
    if (this.state.submissions) {
      let table = [];
      // Outer loop to create parent
      let langarray = new Map();
      langarray['cpp'] = 53;
      langarray['python']= 36;
      console.log('The user is ', this.props.location.user);
      for (let i = 0; i < this.state.submissions.length; i++) {
        let children = [];

        children.push(<th scope="row">{` ${i + 1}`}</th>);

        children.push(<td>{this.state.submissions[i].username}</td>);
        children.push(<td>{this.state.submissions[i].problem_code}</td>);
        var dt = new Date(this.state.submissions[i].created_on);
        children.push(<td>{dt.toString()}</td>);
        children.push(<td>{this.state.submissions[i].verdict}</td>);
        var lang_id = langarray[this.state.submissions[i].language];
        children.push(<td><Link to={{
          pathname: "/compiler",
          user : this.props.location.user,
          languagew : this.state.submissions[i].language,
          language_id : lang_id,
          source_code : this.state.submissions[i].source_code,
          problem_code : this.state.submissions[i].problem_code
        }}

        class='btn btn-success'>See In Editor </Link></td>);
        //Create the parent and add the children
        if(this.state.submissions[i].verdict=="Wrong Answer")
        table.push(<tr class='table-danger'>{children}</tr>);
        else
        table.push(<tr class='table-success'>{children}</tr>);
      }
      return table;
    }
    return <Spinner animation="border" variant="warning" />;
  };

  render() {
    return (
      <>
        <div class="container">
          <h1> Submission History </h1>
          <h3> Please view all your code submissions here </h3>
          <table class="table">
            <thead class="thead-dark">
              <tr>
                <th scope="col">Submission #</th>
                <th scope="col"> User </th>
                <th scope="col">Problem Code</th>
                <th scope="col">Time of Submission</th>
                <th scope="col">Verdict </th>
                <th scope="col">Link to Code</th>
              </tr>
            </thead>
            <tbody>{this.createTable()}</tbody>
          </table>
        </div>
        <div class="container">
          <p>
            {" "}
            <strong>End of Submissions </strong> {" "}
          </p>
        </div>
      </>
    );
  }
}
