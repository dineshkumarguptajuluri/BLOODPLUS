import React, { Fragment } from "react";
import TermPicture from "../images/termpicture.png";

const TermsandConditions = () => {
  return (
    <Fragment>
      <div className="centered default-margin terms">
        <h2>Terms and Conditions</h2>
        <div className="terms-container">
          <p>
            &nbsp;&nbsp;&nbsp;&nbsp;Welcome to the Blood+ Location Tracking
            System. These terms and conditions govern your use of our website
            and mobile application. Please read these Terms carefully, as they
            represent a legally binding agreement between you and Blood+. By
            accessing and using our Service, you agree to be bound by these
            Terms. If you do not agree to these Terms, please refrain from using
            the Service.
          </p>
          <img src={TermPicture} alt="Terms Picture" />
          <h3>Acceptance of Terms</h3>
          <p>
            By accessing or using our Service, you agree to be bound by these
            Terms. If you do not agree to these Terms, please do not use the
            Service.
          </p>
          <h3>Privacy Policy</h3>
          <p>
            Your use of the Service is also governed by our Privacy Policy.
            Please review our Privacy Policy to understand how we collect, use,
            and share information.
          </p>
          <h3>User Registration</h3>
          <p>
            In order to access certain features of the Service, you may be
            required to register for an account. You agree to provide accurate
            and up-to-date information during the registration process and to
            keep your account information updated. You are responsible for
            maintaining the confidentiality of your account credentials.
          </p>
          <h3>Prohibited Activities</h3>
          <p>
            You may not use the Service for any unlawful or unauthorized
            purpose. You agree not to engage in any activity that could harm,
            disrupt, or interfere with the Service or other users' experience.
          </p>
          <h3>Termination</h3>
          <p>
            We may terminate or suspend your account and access to the Service
            for any reason without prior notice. You may also terminate your
            account at any time by contacting us.
          </p>
          <h3>Changes to Terms</h3>
          <p>
            We may revise and update these Terms from time to time. Any changes
            will be posted on this page. Your continued use of the Service after
            any such changes constitutes your acceptance of the new Terms.
          </p>
          <p>
            These Terms are a legally binding agreement. By using the Service,
            you acknowledge that you have read, understood, and agree to be
            bound by these Terms and any future revisions.
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default TermsandConditions;
