import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "./UserContext";
import UpdateUsernameModal from "./UpdateUsernameModal";
import UpdateContactModal from "./UpdateConactModal";
import UpdatePasswordModal from "./UpdatePasswordModal";

const UserProfilePopup = ({ onPClose }) => {
  const navigate = useNavigate();
  const { userName, userEmail } = useUserContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCModalOpen, setIsCModalOpen] = useState(false);
  const [isPModalOpen, setIsPModalOpen] = useState(false);

  const handleLogout = () => {
    for (const key in localStorage) {
      if (key !== "theme") {
        localStorage.removeItem(key);
      }
    }
    navigate("/");
    window.location.reload();
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    onPClose();
  };

  const handleOpenCModal = () => {
    setIsCModalOpen(true);
  };

  const handleCloseCModal = () => {
    setIsCModalOpen(false);
    onPClose();
  };

  const handleOpenPModal = () => {
    setIsPModalOpen(true);
  };

  const handleClosePModal = () => {
    setIsPModalOpen(false);
    onPClose();
  };
  return (
    <Fragment>
      <div className="userprofile-popup">
        <div>
          <div>
            <i className="fa-solid fa-user"></i>
            {userName}
          </div>
          <div>
            <i
              className="fa-regular fa-pen-to-square"
              onClick={handleOpenModal}
            ></i>
          </div>
        </div>
        <div>
          <div>
            <i className="fa-solid fa-envelope"></i>
            {userEmail}
          </div>
        </div>
        <div>
          <div>
            <i className="fa-solid fa-location-dot"></i>Update address
          </div>
          <div>
            <i className="fa-regular fa-pen-to-square"></i>
          </div>
        </div>
        <div>
          <div>
            <i className="fa-solid fa-phone"></i>
            Update Contact No
          </div>
          <div>
            <i
              className="fa-regular fa-pen-to-square"
              onClick={handleOpenCModal}
            ></i>
          </div>
        </div>
        <div>
          <div>
            <i className="fa-solid fa-lock"></i>Change Password
          </div>
          <div>
            <i
              className="fa-regular fa-pen-to-square"
              onClick={handleOpenPModal}
            ></i>
          </div>
        </div>
        <div className="button">
          <button className="btn" onClick={handleLogout}>
            <span>
              <i className="fa-solid fa-arrow-right-from-bracket"></i> Logout
            </span>
          </button>
        </div>
      </div>
      {isModalOpen && <UpdateUsernameModal onClose={handleCloseModal} />}
      {isCModalOpen && <UpdateContactModal onClose={handleCloseCModal} />}
      {isPModalOpen && <UpdatePasswordModal onClose={handleClosePModal} />}
    </Fragment>
  );
};

export default UserProfilePopup;
