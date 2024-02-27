import React, { Fragment, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import BloodplusLogo from "../images/Bloodpluslogo.png";
import { useEventTrigger } from "./EventTriggerContext";
import { useUserContext } from "./UserContext";
import UserProfilePopup from "./UserProfilePopup";

const Nav = () => {
  const savedTheme = localStorage.getItem("theme");
  const [isDarkMode, setIsDarkMode] = useState(savedTheme === "dark");
  const { themeTrigger, setThemeTrigger } = useEventTrigger();
  const { userEmail, userName } = useUserContext();
  const [showUserProfile, setShowUserProfile] = useState(false);

  const toggleMode = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);
    setThemeTrigger(!isDarkMode);
    localStorage.setItem("theme", newTheme);
  };

  const closeProfilePopup = () => {
    setShowUserProfile(false);
  };

  const toggleUserProfile = () => {
    setShowUserProfile(!showUserProfile);
  };

  useEffect(() => {
    document.documentElement.setAttribute(
      "theme",
      isDarkMode ? "dark" : "light"
    );
  }, [isDarkMode]);

  return (
    <Fragment>
      <div className="nav">
        <NavLink to="/">
          <div className="blood-logo">
            <div className="image">
              <img src={BloodplusLogo} alt="Blood + Logo" />
            </div>
            <div className="title">Blood +</div>
          </div>
        </NavLink>

        <div className="tags">
          <ul>
            <span onClick={toggleMode}>
              <span className="thememode">
                {isDarkMode ? (
                  <i className="fa-solid fa-lightbulb glow"></i>
                ) : (
                  <i className="fa-regular fa-lightbulb"></i>
                )}
              </span>
            </span>
            {userEmail.length === 0 && (
              <>
                <li>
                  <NavLink to="/donors/signup">
                    <span>Be a Donor</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/donors/login">
                    <span>Already a Donor</span>
                  </NavLink>
                </li>
              </>
            )}
            <li>
              <NavLink to="/community">
                <span>Community</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/aboutus">
                <span>About Us</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/contactus">
                <span>Contact Us</span>
              </NavLink>
            </li>
            {userEmail.length > 0 && (
              <li onClick={toggleUserProfile} className="userprofile">
                <div>{userName.charAt(0)}</div>
              </li>
            )}
          </ul>
        </div>
      </div>
      {showUserProfile && <UserProfilePopup onPClose={closeProfilePopup} />}
    </Fragment>
  );
};

export default Nav;
