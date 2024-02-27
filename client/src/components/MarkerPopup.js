import React, { Fragment } from "react";
import { useEventTrigger } from "./EventTriggerContext";

const MarkerPopup = ({ userData, openRequestModal }) => {
  const mapsUrl = `https://www.google.com/maps?q=${userData.latitude},${userData.longitude}`;

  return (
    <Fragment>
      <div className="popup">
        <div className="first">
          <div className="username">
            <i className="fa-solid fa-user-nurse red"></i>
            <h3>{userData.username}</h3>
          </div>
          <div className="blood-group">
            <div className="circle">{userData.bloodgroup}</div>
          </div>
        </div>
        <div className="username">
          <i className="fa-solid fa-envelope red"></i>
          <h3>{userData.mailid}</h3>
        </div>
        <div className="username">
          <i className="fa-solid fa-phone red"></i>
          <h3>{userData.contact}</h3>
        </div>
        <div className="username">
          <i className="fa-solid fa-map-location-dot red"></i>
          <h3>Address:</h3>
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
            Open in Google Maps
          </a>
        </div>
        <div className="btn-container">
          <button
            className="btn"
            onClick={() => {
              openRequestModal(userData.mailid);
            }}
          >
            <span>
              <i className="fa-solid fa-bell red"></i>Notify
            </span>
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default MarkerPopup;
