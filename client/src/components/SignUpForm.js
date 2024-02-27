import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AutoSignupfill from "./AutoSignupFill";
import { toast } from "react-toastify";
import { useUserContext } from "./UserContext";
import { useEventTrigger } from "./EventTriggerContext";

const SignUpForm = () => {
  const [userData, setUserData] = useState({
    username: "",
    mailid: "",
    password: "",
    terms: false,
    bloodgroup: "",
    contact: "",
  });

  const { coordinatesTrigger, setCoordinatesTrigger } = useEventTrigger();
  const [validationErrors, setValidationErrors] = useState({});
  const Navigate = useNavigate();
  const [isLoading, setIsloading] = useState(false);
  const { setUserEmail, setUserName } = useUserContext();
  const handleBloodGroupSelect = (group) => {
    setUserData({
      ...userData,
      bloodgroup: group,
    });
  };

  const getLocation = async () => {
    if (!validateForm()) {
      return;
    }
    setIsloading(true);
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      const { latitude, longitude } = position.coords;
      setCoordinatesTrigger([longitude, latitude]);
      setIsloading(false);
    } catch (error) {
      console.error("Error getting user's location:", error);
    }
  };

  const validateForm = () => {
    const errors = {};

    // Email validation
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!userData.mailid.match(emailRegex)) {
      errors.mailid = "Invalid email address";
      toast.error("Invalid email address");
    }

    // Username validation
    if (userData.username.length < 5) {
      errors.username = "Username must be at least 5 characters long";
      toast.error("Username must be at least 5 characters long");
    }

    // Password validation
    if (userData.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
      toast.error("Password must be at least 6 characters long");
    }

    // Required fields
    if (!userData.bloodgroup) {
      errors.bloodgroup = "Blood group is required";
      toast.error("Blood group is required");
    }
    if (!userData.contact) {
      errors.contact = "Contact is required";
      toast.error("Contact is required");
    }
    if (!userData.terms) {
      errors.terms = "You must agree to the terms and conditions";
      toast.error("You must agree to the terms and conditions");
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (!coordinatesTrigger) {
        toast.error("Address is required");
        return;
      }
      userData["longitude"] = coordinatesTrigger[0];
      userData["latitude"] = coordinatesTrigger[1];
      fetch(process.env.REACT_APP_API_URL + "/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
        .then((response) => {
          if (response.status === 201) {
            // Registration was successful
            toast.success("User registered successfully");
            setUserEmail(userData.mailid);
            setUserName(userData.username);
            Navigate("/");
          } else if (response.status === 400) {
            // Validation or bad request error
            response.json().then((data) => {
              toast.error(data.message);
            });
          } else {
            // Registration failed, handle the error
            toast.error("Failed to register user. Please try again.");
          }
        })
        .catch((error) => {
          // Network or other errors
          toast.error(
            "An error occurred while making the request. Please try again."
          );
        });
    }
  };
  console.log(coordinatesTrigger);
  return (
    <div className="signup-form">
      <h1>
        Be A Donor <i className="red fa-solid fa-droplet"></i>
      </h1>
      <form className="form-container">
        <div className="inputs">
          <label htmlFor="username">
            <i className="fa-solid fa-user"></i>
          </label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            value={userData.username}
            onChange={(e) =>
              setUserData({ ...userData, username: e.target.value })
            }
          />
        </div>
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
        <div className="inputs2">
          <label>
            <i className="fa-solid fa-droplet"></i>
          </label>
          <div className="bloodgroup-tiles">
            <label
              className={`bloodgroup-tile ${
                userData.bloodgroup === "A+" ? "selected" : ""
              }`}
              onClick={() => handleBloodGroupSelect("A+")}
            >
              A+
            </label>
            <label
              className={`bloodgroup-tile ${
                userData.bloodgroup === "A-" ? "selected" : ""
              }`}
              onClick={() => handleBloodGroupSelect("A-")}
            >
              A-
            </label>
            <label
              className={`bloodgroup-tile ${
                userData.bloodgroup === "B+" ? "selected" : ""
              }`}
              onClick={() => handleBloodGroupSelect("B+")}
            >
              B+
            </label>
            <label
              className={`bloodgroup-tile ${
                userData.bloodgroup === "B-" ? "selected" : ""
              }`}
              onClick={() => handleBloodGroupSelect("B-")}
            >
              B-
            </label>
            <label
              className={`bloodgroup-tile ${
                userData.bloodgroup === "AB+" ? "selected" : ""
              }`}
              onClick={() => handleBloodGroupSelect("AB+")}
            >
              AB+
            </label>
            <label
              className={`bloodgroup-tile ${
                userData.bloodgroup === "AB-" ? "selected" : ""
              }`}
              onClick={() => handleBloodGroupSelect("AB-")}
            >
              AB-
            </label>
            <label
              className={`bloodgroup-tile ${
                userData.bloodgroup === "O+" ? "selected" : ""
              }`}
              onClick={() => handleBloodGroupSelect("O+")}
            >
              O+
            </label>
            <label
              className={`bloodgroup-tile ${
                userData.bloodgroup === "O-" ? "selected" : ""
              }`}
              onClick={() => handleBloodGroupSelect("O-")}
            >
              O-
            </label>
          </div>
        </div>
        <div className="inputs">
          <label htmlFor="contact">
            <i className="fa-solid fa-phone"></i>
          </label>
          <input
            type="text"
            id="contact"
            name="contact"
            placeholder="Contact Number"
            value={userData.contact}
            onChange={(e) =>
              setUserData({ ...userData, contact: e.target.value })
            }
          />
        </div>
        <div className="checkbox">
          <input
            type="checkbox"
            name="terms"
            id="checkbox"
            checked={userData.terms}
            onChange={() =>
              setUserData({ ...userData, terms: !userData.terms })
            }
          />
          <label htmlFor="checkbox">
            Agree to <Link to="/termsandconditions">terms and conditions</Link>
          </label>
        </div>
        <div
          id="manual-entry"
          onClick={() => {
            getLocation();
          }}
        >
          <i className="fa-solid fa-location-crosshairs"></i> Get Current
          Location as Address
        </div>
        <div className="or">
          <span className="line"></span>
          <span className="or-text">OR</span>
          <span className="line"></span>
        </div>
      </form>
      <AutoSignupfill userData={userData} />{" "}
      {isLoading && (
        <div className="loading-circle">
          <span className="circle-span"></span>
        </div>
      )}
      {coordinatesTrigger && (
        <p className="success">Your are now ready to became a Donor ❤️</p>
      )}
      <div className="or">
        <button className="btn submit" onClick={handleSubmit}>
          <span>
            <i className="fa-solid fa-hand-holding-droplet red"></i> Submit
          </span>
        </button>
      </div>
      <div className="or checkbox">
        <p>
          Alreay An Existing Donor..?{" "}
          <label>
            <Link to="/donors/login">Click Here</Link>
          </label>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
