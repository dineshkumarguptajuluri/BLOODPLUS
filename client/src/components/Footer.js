import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import BloodLogo from "../images/Bloodpluslogo.png";
import GetitonGooglePlay from "../images/get-it-on-google-play.png";

const Footer = () => {
  return (
    <Fragment>
      <div className="footer">
        <div className="footer-image">
          <Link to="/">
            <div className="image">
              <img src={BloodLogo} alt="Blood Plus logo" />
              <h3>Blood +</h3>
            </div>
          </Link>
          <div>
            <p>
              Welcome to Blood Plus - your compassionate community dedicated to
              saving lives <i className="fa-solid fa-heart red"></i>. Together,
              we stand strong, providing hope and support to those in need{" "}
              <i className="fa-solid fa-truck-medical success"></i>. Join us as
              we share the gift of life. Our Blood Plus Community... Made with
              love <i className="fa-solid fa-heart red"></i> and driven by the
              spirit of giving.
            </p>
          </div>
        </div>
        <div className="footer-routes">
          <ul>
            <Link to="/campaigns">
              <li>Campaigns</li>
            </Link>
          </ul>
          <ul>
            <Link to="/aboutus">
              <li>Abouts Us</li>
            </Link>
          </ul>
          <ul>
            <Link to="/contactus">
              <li>Contact Us</li>
            </Link>
          </ul>
          <ul>
            <Link to="/feedbacks">
              <li>Feedbacks</li>
            </Link>
          </ul>
        </div>
        <div className="footer-social">
          <ul>
            <Link to="/termsandconditions">
              <li>Terms & Conditions</li>
            </Link>
          </ul>
          <ul>
            <Link to="/share">
              <li>Share & Spread</li>
            </Link>
          </ul>
          <ul>
            <Link to="/guide">
              <li>Blood Compatibility Guide</li>
            </Link>
          </ul>
          <ul className="social-icons">
            <Link>
              <li>
                <i className="fa-brands fa-linkedin-in"></i>
              </li>
            </Link>
            <Link>
              <li>
                <i className="fa-brands fa-x-twitter"></i>
              </li>
            </Link>
            <Link>
              <li>
                <i className="fa-brands fa-instagram"></i>
              </li>
            </Link>
            <Link>
              <li>
                <i className="fa-brands fa-facebook-f"></i>
              </li>
            </Link>
          </ul>
        </div>
        <div className="footer-app">
          <div>
            <p>App Version Available</p>
          </div>
          <div>
            <img
              src={GetitonGooglePlay}
              onClick={() => {
                toast.info("Available Sooner..");
              }}
              alt="Get it on Google Play"
            />
          </div>
          <div>
            <p>
              <i className="fa-regular fa-copyright"></i> bloodplus | 2023
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Footer;
