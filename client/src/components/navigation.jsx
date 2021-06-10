import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./navigation.css";
export default class Navigation extends Component {
  render() {
    return (
      <nav id="menu" className="navbar navbar-expand-lg navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#bs-example-navbar-collapse-1"
            >
              {" "}
              <span className="sr-only">Toggle navigation</span>{" "}
              <span className="icon-bar"></span>{" "}
              <span className="icon-bar"></span>{" "}
              <span className="icon-bar"></span>{" "}
            </button>
            <a className="navbar-brand page-scroll" href="#page-top">
              Coding World
            </a>{" "}
          </div>

          <div
            className="collapse navbar-collapse"
            id="bs-example-navbar-collapse-1"
          >
            <ul className="nav navbar-nav navbar-right">
              <li>
                <Link  to={{
                    pathname: "/compiler",
                    user: this.props.uid
                  }}> Compiler </Link>
              </li>
              <li>
                <Link to="/"> About </Link>
              </li>
              <li>
                <Link to="/problems"> Problems </Link>
              </li>

              <li>
                <Link to="/contact"> Team </Link>
              </li>
              <li>
              <Link
                  to={{
                    pathname: "/submissions",
                    user: this.props.uid
                  }}
                >
                  {" "}
                 Submissions{" "}
                </Link>
              </li>
              <li class="nav-item rhs">
                {" "}
                <strong> Welcome {this.props.uid} !!! </strong>
              </li>
              <li class="rhs">
                <button
                  class="btn btn-primary"
                  onClick={() => {
                    this.props.logout();
                  }}
                >
                  {" "}
                  Logout{" "}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
