import Editor from "@monaco-editor/react";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Compiler.css";

export default class Compiler extends Component {
  constructor(props) {
    super(props);
    console.log('User in compiler is ', this.props.location.user);
    this.state = {
      input: this.props.location.source_code || localStorage.getItem("input") || ``,
      output: ``,
      language_id: this.props.location.language_id || localStorage.getItem("language_Id") || 53,
      user_input: ``,
      problem_code: this.props.location.problem_code || `0606A`,
      languagew: this.props.location.languagew || localStorage.getItem("languagew") || `cpp`
    };
  }

  userInput = (event) => {
    event.preventDefault();
    this.setState({ user_input: event.target.value });
  };
  language = (event) => {
    event.preventDefault();
    let codearray = new Map();
    codearray["53"]="cpp";
    codearray["71"]="python";
    codearray["62"]= "java";
    //console.log("Language code ", event.target.value);
   

      this.setState({ language_id: event.target.value, languagew: codearray[event.target.value] });
      localStorage.setItem("languagew", codearray[event.target.value]);

    localStorage.setItem("language_Id", event.target.value);

    this.forceUpdate();
  };
  problem = (event) => {
    event.preventDefault();
    this.setState({ problem_code: event.target.value });
    localStorage.setItem("problem_code", event.target.value);
  };
  run = async (e) => {
    e.preventDefault();

    let outputText = document.getElementById("output");
    outputText.innerHTML = "";
    outputText.innerHTML += "Creating Submission ...\n";
    const response = await fetch(
      "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&fields=*",
      {
        method: "POST",
        headers: {
          "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
          "x-rapidapi-key":
            "efd968731amshc0c48985329faebp195f51jsnd8113d8b3fa2", // Get yours for free at https://rapidapi.com/hermanzdosilovic/api/judge0
          "content-type": "application/json"
        },
        body: JSON.stringify({
          source_code: this.state.input,
          stdin: this.state.user_input,
          language_id: this.state.language_id
        })
      }
    );
    outputText.innerHTML += "Submission Created ...\n";
    const jsonResponse = await response.json();
   // console.log(jsonResponse);

    let jsonGetSolution = {
      status: { description: "Queue" },
      stderr: null,
      compile_output: null
    };

    while (
      jsonGetSolution.status.description !== "Accepted" &&
      jsonGetSolution.stderr == null &&
      jsonGetSolution.compile_output == null
    ) {
      outputText.innerHTML = `Creating Submission ... \nSubmission Created ...\nChecking Submission Status\nstatus : ${jsonGetSolution.status.description}`;
      if (jsonResponse.token) {
        let url = `https://judge0-ce.p.rapidapi.com/submissions/${jsonResponse.token}?base64_encoded=true`;

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
      }
    }

    if (jsonGetSolution.stdout) {
      const output = atob(jsonGetSolution.stdout);

      outputText.innerHTML = "";

      outputText.innerHTML += `Results :\n${output}\nExecution Time : ${jsonGetSolution.time} Secs\nMemory used : ${jsonGetSolution.memory} bytes`;
    } else if (jsonGetSolution.stderr) {
      const error = atob(jsonGetSolution.stderr);

      outputText.innerHTML = "";

      outputText.innerHTML += `\n Error :${error}`;
    } else {
      const compilation_error = atob(jsonGetSolution.compile_output);
      console.log(compilation_error);
      outputText.innerHTML = "";

      outputText.innerHTML += `\n Error :${compilation_error}`;
    }
  };

  render() {
    return (
      <>
      <div id="bck">
        <div class="container cmp">
          <div class="jumbotron">
            <h1>  Use our compiler platform  </h1>
          </div>
          <div className="container-fluid">
            <div className="ml-4 ">
              <label for="solution ">
                <span className="badge badge-info heading mt-2 ">
                  <i className="fas fa-code fa-fw fa-lg"></i> Code Here
                </span>
              </label>
              <Editor
                theme="vs-dark"
                height="90vh"
                language={this.state.languagew}
                value={this.state.input}
                onChange={(value, event) => {
                  this.setState({
                    input: value
                  });
                  localStorage.setItem("input", value);
                }}
                fontSize="20"
                quickSuggestions ="false"
              />
              <br />
              <button
                type="submit"
                className="btn btn-danger ml-2 mr-2 "
                onClick={this.run}
              >
                <i class="fas fa-cog fa-fw"></i> Run
              </button>
              <Link
                to={{
                  pathname: "/test",
                  TestProps: {
                    source_code: this.state.input,
                    language_id: this.state.language_id,
                    problem_code: this.state.problem_code,
                    user : localStorage.getItem("username"),
                    languagew : this.state.languagew
                  }
                }}
                class=" btn btn-success  "
              >
                <i class="fas fa-cog fa-fw"></i>
                Submit and Test
              </Link>
              <br />
              <br />
              <label for="tags" className="mr-1">
                <b className="heading">Language :</b>
              </label>
              <select
                value={this.state.language_id}
                onChange={this.language}
                id="tags"
                name="tags"
                className="form-control form-inline mb-2 language"
              >
                <option value="53">C++</option>
                <option value="62">Java</option>
                <option value="71">Python</option>
              </select>
              <br />
              <label for="pbl" className="mr-1">
                <b className="heading">Problem Code :</b>
              </label>
              <br />
              <select
                value={this.state.problem_code}
                onChange={this.problem}
                name="pbl"
                id="pbl"
                className="form-control form-inline mb-2 language"
              >
                <option value="0606A">0606A</option>
                <option value="0606B">0606B</option>
              </select>
            </div>
          </div>

          <div class="mt-2 ml-5">
            <span class="badge badge-primary heading my-2 ">
              <i class="fas fa-user fa-fw fa-md"></i> User Input
            </span>
            <br />
            <textarea id="input" onChange={this.userInput}></textarea>
          </div>
          <div>
            <span class="badge badge-info heading my-2 ">
              <i class="fas fa-exclamation fa-fw fa-md"></i> Output
            </span>
            <textarea readonly="false" id="output"></textarea>
          </div>
        </div>
        </div>
      </>
    );
  }
}
