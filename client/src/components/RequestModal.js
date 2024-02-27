import React, { Fragment, useState } from "react";
import { toast } from "react-toastify";
import { useUserContext } from "./UserContext";

const RequestModal = ({ closeRequestModal, recmail }) => {
  const { coordinates } = useUserContext();
  const [fromEmail, setFromEmail] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [optionalMessage, setOptionalMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendRequest = async (e) => {
    e.preventDefault();
    try {
      if (!fromEmail || !contactNo) {
        toast.error("Please enter the sender's email and your contact number");
        return;
      }
      setLoading(true);

      const response = await fetch(
        process.env.REACT_APP_API_URL + "/sendmail",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fromEmail: fromEmail,
            toEmail: recmail,
            contactNo: contactNo,
            optionalMessage: optionalMessage,
            longitude: coordinates[0],
            latitude: coordinates[1],
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        toast.success("Request sent successfully");
        closeRequestModal();
      } else {
        throw new Error("Failed to send request");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    closeRequestModal();
  };

  return (
    <Fragment>
      <div className="modal">
        <form className="form-container modal-content profile-modal">
          <h1 className="red">Request to Donor</h1>
          <p>
            Hey, please fill out the required fields to send a request to a
            donor.
          </p>
          <div className="inputs">
            <label>
              <i className="fa-solid fa-envelope"></i>
            </label>
            <input
              type="email"
              value={fromEmail}
              placeholder="Sender's Email"
              onChange={(e) => setFromEmail(e.target.value)}
            />
          </div>
          <div className="inputs">
            <label>
              <i className="fa-solid fa-envelope"></i>
            </label>
            <input
              type="email"
              value={recmail}
              placeholder="Recipient's Email"
              disabled
            />
          </div>
          <div className="inputs">
            <label>
              <i className="fa-solid fa-phone"></i>
            </label>
            <input
              type="text"
              value={contactNo}
              placeholder="Your Contact No"
              onChange={(e) => setContactNo(e.target.value)}
            />
          </div>
          <div>
            <textarea
              className="textarea"
              value={optionalMessage}
              placeholder="Optional Message"
              onChange={(e) => setOptionalMessage(e.target.value)}
            ></textarea>
          </div>
          <div className="buttons">
            <button
              onClick={handleSendRequest}
              className="btn"
              disabled={loading}
            >
              {loading ? (
                <span className="circle-span"></span>
              ) : (
                <span>Request</span>
              )}
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

export default RequestModal;
