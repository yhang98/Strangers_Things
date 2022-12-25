import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { confirmLogin } from "../api";

const Login = ({ setLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = await confirmLogin(username, password);

    if (token) {
      localStorage.setItem("token", token);
      setUsername("");
      setPassword("");
      navigate("/Home");
      setLoggedIn(true);
      localStorage.setItem("loggedIn", true);
    } else {
      alert("Incorrect Username or Password");
    }
  };

  const userNameChange = (event) => {
    setUsername(event.target.value);
  };

  const passwordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div id="login">
      <h1 className="title">Log In</h1>
      <form id="loginForm" onSubmit={handleSubmit}>
        <div className="boxes">
        <label>Username</label>
          <input
            className="input"
            type="text"
            name="username"
            onChange={userNameChange}
          />
          <label>Password</label>
          <input
            className="input"
            type="password"
            name="password"
            onChange={passwordChange}
          />
          <button type="submit">Log In</button>
        </div>
      </form>
      <Link to="/Register">Don't have account? Register here!</Link>
    </div>
  );
};

export default Login;
