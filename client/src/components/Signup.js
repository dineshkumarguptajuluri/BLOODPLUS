import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
import HandDonate from "../images/handdonate.png";

const Signup = () => {
  return (
    <Fragment>
      <div className="in-container">
        <Outlet />
        <div className="signup-side">
          <img src={HandDonate} alt="Hand Donate" />
        </div>
      </div>
    </Fragment>
  );
};

export default Signup;
