import React, { Fragment, useEffect, useState, useRef } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUserContext } from "./UserContext";
// import UpdatePasswordModal from "./UpdatePasswordModal";

const ForgotPassword = () => {
  const [userData, setUserData] = useState({
    mailid: "",
    password: "",
  });

  const [coordinates, setCoordinates] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const Navigate = useNavigate();
  const { setUserEmail, setUserName } = useUserContext();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpSent, setOtpSent] = useState(false);

  const inputRefs = useRef([]);

  const validateForm = () => {
    const errors = {};

    // Email validation
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!userData.mailid.match(emailRegex)) {
      errors.mailid = "Invalid email address";
      toast.error("Invalid email address");
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        toast.loading("Sending OTP...");
        e.target.setAttribute("disabled", true);
        const response = await fetch(
          process.env.REACT_APP_API_URL + "/sendforgototp",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              mailid: userData.mailid,
            }),
          }
        );

        if (response.status === 200) {
          setOtpSent(true);
          toast.dismiss();
          e.target.removeAttribute("disabled");
          toast.success("OTP sent successfully");
        } else {
          const errorData = await response.json();
          toast.dismiss();
          e.target.removeAttribute("disabled");
          toast.error(errorData.error);
        }
      } catch (err) {
        console.log(err);
        toast.dismiss();
        e.target.removeAttribute("disabled");
        toast.error("Something went wrong");
      }
    }
  };

  const handleInputChange = (index, value) => {
    // Update the current input value in the state
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to the next input field if a number is entered
    if (value !== "" && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (index) => {
    // Move focus to the previous input field when backspace is pressed on an empty field
    if (index > 0 && otp[index] === "" && index <= otp.length - 1) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    try {
      toast.loading("Verifying OTP...");
      e.target.setAttribute("disabled", true);
      const response = await fetch(
        process.env.REACT_APP_API_URL + "/verifyforgototp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mailid: userData.mailid,
            otp: otp.join(""),
          }),
        }
      );

      if (response.status === 200) {
        toast.dismiss();
        e.target.removeAttribute("disabled");
        toast.success("OTP verified successfully");
        Navigate("/donors/resetpassword");
      } else {
        const errorData = await response.json();
        toast.dismiss();
        e.target.removeAttribute("disabled");
        toast.error(errorData.error);
      }
    } catch (err) {
      console.log(err);
      toast.dismiss();
      e.target.removeAttribute("disabled");
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    // Focus on the first input field on initial render
    inputRefs.current[0]?.focus();
  }, []);

  return (
    <div className="signup-form">
      <h1>
        Forgot Password..? <i className="red fa-solid fa-droplet"></i>
      </h1>
      <p>
        Enter your email address and we'll send you a otp to reset your
        password.
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
        <p className="divider">Enter the otp sent to your email address.</p>
        <div className="otp">
          {otp.map((value, index) => (
            <div key={index}>
              <input
                type="number"
                value={value}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Backspace") {
                    handleBackspace(index);
                  }
                }}
                ref={(ref) => (inputRefs.current[index] = ref)}
              />
            </div>
          ))}
        </div>
        <div className="forgot">
          <Link to="/donors/login">login here..?</Link>
        </div>
        <div className="flex">
          {!otpSent ? (
            <button className="btn submit">
              <span>
                <i className="fa-solid fa-paper-plane red w-btn"></i> Send
              </span>
            </button>
          ) : (
            <button className="btn submit" type="button" onClick={verifyOtp}>
              <span>
                <i className="fa-solid fa-circle-check red w-btn"></i> Verify
              </span>
            </button>
          )}
        </div>
      </form>
      {/* {isPModalOpen && <UpdatePasswordModal onClose={handleClosePModal} />} */}
    </div>
  );
};

export default ForgotPassword;
