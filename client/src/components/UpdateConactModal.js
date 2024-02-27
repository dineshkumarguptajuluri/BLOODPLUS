import React, { Fragment, useState } from "react";
import { toast } from "react-toastify";
import { useUserContext } from "./UserContext";

const UpdateContactModal = ({ onClose }) => {
  const { userEmail, userName } = useUserContext();
  const [newContact, setNewContact] = useState("");
  const [password, setPassword] = useState("");

  const handleUpdateUsername = async (e) => {
    e.preventDefault();
    try {
      if (!newContact || !password) {
        toast.error("Please enter a new contact and password");
        return;
      }

      const response = await fetch(
        process.env.REACT_APP_API_URL + "/updatecontact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mailid: userEmail,
            newcontact: newContact,
            password: password,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        toast.success("Contact updated successfully");
        onClose();
      } else {
        throw new Error("Failed to update Contact");
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
          <h1 className="red">Update Contact</h1>
          <p>
            Hey {userName} .. Do you want to change the contact no fill the
            required fields{" "}
          </p>
          <div className="inputs">
            <label>
              <i className="fa-solid fa-phone"></i>
            </label>
            <input
              type="text"
              value={newContact}
              placeholder="New Contact No"
              onChange={(e) => setNewContact(e.target.value)}
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

export default UpdateContactModal;
