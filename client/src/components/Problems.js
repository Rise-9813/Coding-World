import React, { Component } from "react";
import {Link} from 'react-router-dom';
export default class Problems extends Component {
  render() {
    return (
      <div class="container">
        <div class="jumbotron">
          <h2> Available Problems to Practice !! </h2>
        </div>
        <h3 class="text-muted">List of Problems</h3>
        <div class="container">
        <div class="row">
  <div class="col-3">
    <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
      <a class="nav-link active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">Problem 0606A</a>
      <a class="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">Problem 0606B</a>
     
    </div>
  </div>
  <div class="col-9">
    <div class="tab-content" id="v-pills-tabContent">
      <div class="tab-pane fade show active alert alert-success" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
      <h3 class='alert-header'> Say Hello </h3>
      <br/>
      <span class='badge badge-primary'> <h5>Problem Code : 0606A </h5>  </span>
      <br/>
      <br/>
      <p> Write a program to take in a string from the standard input and print <strong>"Hello World"</strong></p>
      <br/>
      <br/>
      <h5> Input Format </h5>
      <p>A single string S</p>
      < br/>
      <br/>
      <h5> Output Format </h5>
      <p>A single string S of "Hello World"</p>
      < br/>
      <br/>
      <Link class="btn btn-warning" to={
        {
          pathname : "/compiler",
          problem_code : '0606A'
        }
      }> Try Out in Editor </Link>
      </div>
      <div class="tab-pane fade alert alert-success" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
      <h3> Maximum Element </h3>
      <br/>
      <span class='badge badge-primary'> <h5>Problem Code : 0606B </h5>  </span>
      <br/>
      <br/>
      <p> Write a program to take in an array  <strong>A </strong> of size N and find the maximum element in it.</p>
      <br/>
      <br/>
      <hr/>
      <h5> Input Format </h5>
      <p>The number <strong> N </strong> followed by <strong> N</strong> space separated integers</p>
      < br/>
      <br/>
      <h5> Output Format </h5>
      <p>A single integer corresponding to the maximum value of the array</p>
      < br/>
      <h5> Example test case</h5>
      <p>Input : </p>
      <p> 5 1 2 3 4 5</p>
      <p>Output : </p>
      <p>5</p>
      <Link class="btn btn-warning" to={
        {
          pathname : "/compiler",
          problem_code : '0606B'
        }
      }> Try Out in Editor </Link>
      </div>
    </div>
  </div>
</div>
</div>
      </div>
    );
  }
}
