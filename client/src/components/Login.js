import React, { useState } from "react";
import "./Login.css";
function Login({ LoginF }) {
  const [username, setUsername] = useState("");
  const [pwd, setpwd] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    LoginF(username, pwd);
  };

  return (
    <div class="container it">
      <h1> WELCOME TO CODING WORLD </h1>
      <div class="container">
        <form class="frm">
          <h3>Log in</h3>

          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter username"
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={(event) => {
                setpwd(event.target.value);
              }}
            />
          </div>

          <button class="btn btn-dark btn-lg btn-block" onClick={submitHandler}>
            Sign in
          </button>
          <p className="forgot-password text-right">
            Forgot <a href="#">password?</a>
          </p>
        </form>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    </div>
  );
}
export default Login;
