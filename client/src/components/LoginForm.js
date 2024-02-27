import React, { Fragment, useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUserContext } from "./UserContext";

const LoginForm = () => {
  const [userData, setUserData] = useState({
    mailid: "",
    password: "",
  });

  const [coordinates, setCoordinates] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const Navigate = useNavigate();
  const { setUserEmail, setUserName } = useUserContext();

  const validateForm = () => {
    const errors = {};

    // Email validation
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!userData.mailid.match(emailRegex)) {
      errors.mailid = "Invalid email address";
      toast.error("Invalid email address");
    }

    // Password validation
    if (userData.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
      toast.error("Password must be at least 6 characters long");
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      fetch(process.env.REACT_APP_API_URL + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
        .then(async (response) => {
          if (response.status === 200) {
            // Login was successful
            const data = await response.json();
            setUserEmail(data.userEmail);
            setUserName(data.username);
            Navigate("/");
          } else if (response.status === 401) {
            toast.error("User not found");
          } else if (response.status === 402) {
            toast.error("Invalid password");
          } else {
            toast.error("Failed to log in. Please try again.");
          }
        })
        .catch((error) => {
          console.error(
            "An error occurred while making the request. Please try again."
          );
        });
    }
  };

  return (
    <div className="signup-form">
      <h1>
        Already A Donor <i className="red fa-solid fa-droplet"></i>
      </h1>
      <p>
        Welcome back to our BloodPlus Donor community. Please log in to
        continue.
      </p>
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="inputs">
          <label htmlFor="mailid">
            <i className="fa-solid fa-envelope"></i>
          </label>
          <input
            type="text"
            name="mailid"
            id="mailid"
            placeholder="Email"
            value={userData.mailid}
            onChange={(e) =>
              setUserData({ ...userData, mailid: e.target.value })
            }
          />
        </div>
        <div className="inputs">
          <label htmlFor="password">
            <i className="fa-solid fa-lock"></i>
          </label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            value={userData.password}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
          />
        </div>
        <div className="forgot">
          <Link to="/donors/forgot">forgot password..?</Link>
        </div>
        <button className="btn submit">
          <span>
            <i className="fa-solid fa-hand-holding-droplet red"></i> Login
          </span>
        </button>
      </form>
      <div className="or">
        <p>
          Want to became a Donor..?{" "}
          <label>
            <Link to="/donors/signup">Click Here</Link>
          </label>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
