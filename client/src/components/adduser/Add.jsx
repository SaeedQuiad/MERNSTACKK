import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./add.css";

const Add = () => {
  const initialUserState = {
    fname: "",
    lname: "",
    email: "",
    password: "",
  };

  const [user, setUser] = useState(initialUserState);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any required fields are empty
    if (!user.fname || !user.lname || !user.email || !user.password) {
      setError({ message: "Please fill out all fields." });
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/create", user);
      console.log("API Response:", response.data);

      setSuccess(true);
      setError(null);
      setUser(initialUserState);

      // Automatically hide success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);

    } catch (error) {
      console.error("API Error:", error.response.data);

      setError(error.response.data);
      setSuccess(false);
    }
  };

  // Function to handle anchor tag click (simulate form submission and redirect)
  const handleAnchorClick = (e) => {
    e.preventDefault();

    // Check if any required fields are empty
    if (!user.fname || !user.lname || !user.email || !user.password) {
      setError({ message: "Please fill out all fields." });
      return;
    }

    // Submit the form programmatically
    handleSubmit(e);

    // Redirect to the specified URL
    window.location.href = "http://localhost:5173/";
  };

  return (
    <div className="addUser">
      <form className="addUserForm" onSubmit={handleSubmit}>
        <Link to="/">Back</Link>
        <h3>Add new user</h3>
        <div className="inputGroup">
          <label htmlFor="fname">First name</label>
          <input
            type="text"
            onChange={inputHandler}
            id="fname"
            name="fname"
            value={user.fname}
            autoComplete="off"
            placeholder="First Name"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="lname">Last name</label>
          <input
            type="text"
            onChange={inputHandler}
            id="lname"
            name="lname"
            value={user.lname}
            autoComplete="off"
            placeholder="Last Name"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            onChange={inputHandler}
            id="email"
            name="email"
            value={user.email}
            autoComplete="off"
            placeholder="Email"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            onChange={inputHandler}
            id="password"
            name="password"
            value={user.password}
            autoComplete="off"
            placeholder="Password"
          />
        </div>
        <div className="inputGroup">
          <a className="addButton" href="#" onClick={handleAnchorClick}>Add User</a>
        </div>
      </form>
      {error && (
        <div className="notification-container">
          <div className="notification error-notification">{error.message}</div>
        </div>
      )}
      {success && (
        <div className="notification-container">
          <div className="notification success-notification">User successfully added!</div>
        </div>
      )}
    </div>
  );
};

export default Add;
