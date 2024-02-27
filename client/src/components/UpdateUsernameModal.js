import React, { Fragment, useState } from "react";
import { toast } from "react-toastify";
import { useUserContext } from "./UserContext";

const UpdateUsernameModal = ({ onClose }) => {
  const { userEmail, userName, setUserName } = useUserContext();
  const [newUsername, setNewUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUpdateUsername = async (e) => {
    e.preventDefault();
    try {
      if (!newUsername || !password) {
        toast.error("Please enter a new username and password");
        return;
      }

      const response = await fetch(
        process.env.REACT_APP_API_URL + "/updateusername",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mailid: userEmail,
            newUsername: newUsername,
            password: password,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        toast.success("Username updated successfully");
        setUserName(newUsername);
        onClose();
      } else {
        throw new Error("Failed to update username");
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
          <h1 className="red">Update Username</h1>
          <p>
            Hey {userName} .. Do you want to change the username fill the
            required fields{" "}
          </p>
          <div className="inputs">
            <label>
              <i className="fa-solid fa-user"></i>
            </label>
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              placeholder="New Username"
            />
          </div>
          <div className="inputs">
            <label>
              <i className="fa-solid fa-lock"></i>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
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

export default UpdateUsernameModal;
