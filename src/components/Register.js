import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerPerson } from "../api";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!username) {
      alert("Username is required!");
    } else if (password.length < 8) {
      alert("Password needs to be a minimum of 8 characters!");
    } else if (password !== confirmPassword) {
      alert("Password must match!");
    } else {
      registerPerson(event);
      alert("Registration successful please Login!");
      navigate("/");
    }
  };

  const userNameChange = (event) => {
    setUsername(event.target.value);
  };

  const passwordChange = (event) => {
    setPassword(event.target.value);
  };

  const confirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  return (
    <div id="login">
      <h1 className="title">Registration</h1>
      <form id="loginForm" onSubmit={handleSubmit}>
        <div className="boxes">
          <label>Username</label>
          <input
            className="input"
            type="text"
            name="username"
            onChange={userNameChange}
            value={username}
          />
          <label>Password</label>
          <input
            className="input"
            type="password"
            name="password"
            onChange={passwordChange}
            value={password}
          />
          <label>Confirm Password</label>
          <input
            className="input"
            type="password"
            name="confirm password"
            onChange={confirmPasswordChange}
            value={confirmPassword}
          />
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
