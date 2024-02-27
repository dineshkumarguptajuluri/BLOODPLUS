import React, { Fragment, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import AutofillCheckoutDemo from "./AutofillCheckout";

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const currentPathname = location.pathname;

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (currentPathname !== "/") {
      setIsOpen(false);
    }
  }, [currentPathname]);

  return (
    <Fragment>
      <div className={`side-nav ${isOpen ? "open" : ""}`}>
        <ul>
          <li>
            <NavLink to="/" onClick={toggleSidebar}>
              <div className="icon icon-fill">
                <i className="fa-solid fa-magnifying-glass"></i>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/campaigns">
              <div className="icon icon-fill">
                <i className="fa-solid fa-bullhorn"></i>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/feedbacks">
              <div className="icon icon-fill">
                <i className="fa-solid fa-heart"></i>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/guide">
              <div className="icon icon-fill">
                <i className="fa-solid fa-user-nurse"></i>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/share">
              <div className="icon icon-fill">
                <i className="fa-solid fa-share"></i>
              </div>
            </NavLink>
          </li>
        </ul>
        <div className="side-nav-div">
          <AutofillCheckoutDemo></AutofillCheckoutDemo>
        </div>
      </div>
    </Fragment>
  );
};

export default SideNav;
