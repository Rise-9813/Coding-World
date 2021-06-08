import React, { Component } from "react";
export default class Problems extends Component {
  render() {
    return (
      <div class="container">
        <div class="jumbotron">
          <h2> Available Problems to Practice !! </h2>
        </div>
        <h3 class="text-muted">List of Problems</h3>

        <dl class="row">
          <dt class="col-sm-3">
            <p>Finding the Second Maximum </p>( Problem Code : 0606A )
          </dt>
          <dd class="col-sm-9">
            <p>
              You are given an array of <strong> N </strong> elements.{" "}
            </p>
            <br />
            <h5> Input Format </h5>
            <p>
              A single integer N followed by N space separated integers of array
              A.{" "}
            </p>
            <br />
            <h5> Output Format </h5>A single integer which is the second maximum
            element.
          </dd>
        </dl>
        <hr />
      </div>
    );
  }
}
