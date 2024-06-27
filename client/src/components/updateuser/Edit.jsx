import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "./edit.css";

const Edit = () => {
  const initialUserState = {
    fname: "",
    lname: "",
    email: "",
  };

  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(initialUserState);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/getone/${id}`)
      .then((response) => {
        setUser(response.data); // Assuming response.data contains user details
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      });
  }, [id]);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:8000/api/update/${id}`,
        user
      );
      toast.success(response.data.msg, { position: "top-right" });
      navigate("/");
    } catch (error) {
      console.error("Update Error:", error);
      toast.error("Failed to update user.", { position: "top-right" });
    }
  };

  return (
    <div className="addUser">
      <form className="addUserForm" onSubmit={handleSubmit}>
        <Link to="/" className="back-link">
          Back
        </Link>
        <h3>Update user</h3>
        <div className="inputGroup">
          <label htmlFor="fname">First name</label>
          <input
            type="text"
            id="fname"
            name="fname"
            value={user.fname}
            onChange={inputChangeHandler}
            autoComplete="off"
            placeholder="First Name"
            className="input-class"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="lname">Last name</label>
          <input
            type="text"
            id="lname"
            name="lname"
            value={user.lname}
            onChange={inputChangeHandler}
            autoComplete="off"
            placeholder="Last Name"
            className="input-class"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={user.email}
            onChange={inputChangeHandler}
            autoComplete="off"
            placeholder="Email"
            className="input-class"
          />
        </div>
        <div className="inputGroup">
          <button type="submit" className="addButton">
            Update User
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
