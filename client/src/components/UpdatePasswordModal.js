import React, { Fragment, useState } from "react";
import { toast } from "react-toastify";
import { useUserContext } from "./UserContext";

const UpdatePasswordModal = ({ onClose }) => {
  const { userEmail, userName } = useUserContext();
  const [newPassword, setNewPassword] = useState("");
  const [password, setPassword] = useState("");

  const handleUpdateUsername = async (e) => {
    e.preventDefault();
    try {
      if (!newPassword || !password) {
        toast.error("Please enter a new password and password");
        return;
      }

      const response = await fetch(
        process.env.REACT_APP_API_URL + "/updatepassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mailid: userEmail,
            newpassword: newPassword,
            oldpassword: password,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        toast.success("Password updated successfully");
        onClose();
      } else {
        throw new Error("Failed to update Password");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    onClose();
  };

  return (
    <Fragment>
      <div className="modal">
        <form className="form-container modal-content profile-modal">
          <h1 className="red">Change Password</h1>
          <p>
            Hey {userName} .. Do you want to change the password fill the
            required fields{" "}
          </p>
          <div className="inputs">
            <label>
              <i className="fa-solid fa-lock"></i>
            </label>
            <input
              type="password"
              value={newPassword}
              placeholder="New Password"
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="inputs">
            <label>
              <i className="fa-solid fa-lock"></i>
            </label>
            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="buttons">
            <button onClick={handleUpdateUsername} className="btn">
              <span>Update</span>
            </button>
            <button onClick={handleCancel} className="btn">
              <span>Cancel</span>
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default UpdatePasswordModal;
