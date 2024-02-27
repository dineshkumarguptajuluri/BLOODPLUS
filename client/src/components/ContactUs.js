import React, { Fragment, useState } from "react";

const ContactUs = () => {
  return (
    <Fragment>
      <div className="aboutus contactus default-margin">
        <div>
          <h1 className="red">| Contact Us</h1>
        </div>
        <div className="banner"></div>
        <div className="hor-line"></div>
        <div className="matter-form">
          <div className="matter">
            Feel free to get in touch with us if you have any questions,
            suggestions, or need assistance. We're here to help you. Your
            feedback is valuable to us, and we'll do our best to respond
            promptly.
            <div>
              <i className="fa-solid fa-envelope red"></i>{" "}
              bloodplus.help@gmail.com
            </div>
          </div>
          <div className="form">
            <form className="form-container">
              <div className="inputs">
                <label>
                  <i className="fa-solid fa-user"></i>
                </label>
                <input type="text" name="name" placeholder="Name" />
              </div>
              <div className="inputs">
                <label>
                  <i className="fa-solid fa-envelope"></i>
                </label>
                <input type="email" name="email" placeholder="Email" />
              </div>
              <div>
                <textarea name="message" placeholder="Message"></textarea>
              </div>
              <div className="buttons">
                <button type="submit" className="btn">
                  <span>Submit</span>
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="hor-line"></div>
      </div>
    </Fragment>
  );
};

export default ContactUs;
