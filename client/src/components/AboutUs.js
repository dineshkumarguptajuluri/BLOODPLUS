import React, { Fragment, useState } from "react";
import Mahesh from "../images/my-image-logo.png";
import Dinesh from "../images/dinesh.jpg";
import Asha from "../images/asha.jpg";
import Kousik from "../images/kousik.png";

const AboutUs = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const accordionData = [
    {
      title: "Who We Are",
      content:
        "We are from Vishnu Institute of Technology, Bhimavaram, studying 3rd year B.Tech from the CSE department, and we developed this blood management system to help people in emergencies.",
    },
    {
      title: "What We Do",
      content:
        "As 3rd-year B.Tech students from the CSE department at Vishnu Institute of Technology, we are dedicated to providing a reliable and efficient system for blood management. This includes donor registration, blood bank management, and connecting donors with those in need.",
    },
    {
      title: "What We're Doing",
      content:
        "We are committed to improving the accessibility of blood for emergency situations, connecting donors with patients, and ensuring the smooth operation of our blood management system.",
    },
  ];

  return (
    <Fragment>
      <div className="aboutus default-margin">
        <div>
          <h1 className="red">| About Us</h1>
        </div>
        <div className="banner"></div>
        <div className="hor-line"></div>
        <div className="matter-section">
          <div className="matter">
            <h2>Our Team</h2>
            <p>
              We are a passionate team from the Vishnu Institute of Technology,
              Bhimavaram, dedicated to developing a blood management system to
              help those in need during emergencies.
            </p>
          </div>
          <div className="accordion">
            {accordionData.map((item, index) => (
              <div key={index} className="accordion-item">
                <div
                  className={`accordion-title ${
                    index === activeAccordion ? "active" : ""
                  }`}
                  onClick={() => toggleAccordion(index)}
                >
                  <p>{item.title} </p>
                  {index === activeAccordion ? (
                    <span className="minus-sign">-</span>
                  ) : (
                    <span className="plus-sign">+</span>
                  )}
                </div>
                <div
                  className={`accordion-content ${
                    index === activeAccordion ? "active" : ""
                  }`}
                >
                  {item.content}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="hor-line"></div>
        <div className="our-profiles">
          <div className="profile">
            <div className="profile-img">
              <img src={Mahesh} alt="My Image" />
              <div className="red-line"></div>
            </div>
            <div className="name">Cheegiti Mahesh</div>
            <div className="role">Full Stack Developer</div>
            <div className="matter">
              A third-year B.Tech student majoring in CSE. I have a strong
              foundation in full-stack development, with experience in
              JavaScript, React, Node.js, and more. I'm known for my
              problem-solving skills. I'm excited to contribute my expertise to
              your full-stack development team.
            </div>
            <div className="icons">
              <i className="fa-brands fa-linkedin"></i>
              <i className="fa-brands fa-github"></i>
              <i className="fa-brands fa-x-twitter"></i>
            </div>
          </div>
          <div className="profile">
            <div className="profile-img">
              <img src={Asha} alt="My Image" />
              <div className="red-line"></div>
            </div>
            <div className="name">E Asha Bibi</div>
            <div className="role">Full Stack Developer</div>
            <div className="matter">
              A third-year B.Tech student majoring in CSE. I have a strong
              foundation in full-stack development, with experience in
              JavaScript, React, Node.js, and more. I'm known for my
              problem-solving skills. I'm excited to contribute my expertise to
              your full-stack development team.
            </div>
            <div className="icons">
              <i className="fa-brands fa-linkedin"></i>
              <i className="fa-brands fa-github"></i>
              <i className="fa-brands fa-x-twitter"></i>
            </div>
          </div>
          <div className="profile">
            <div className="profile-img">
              <img src={Dinesh} alt="My Image" />
              <div className="red-line"></div>
            </div>
            <div className="name">J Dinesh Kumar</div>
            <div className="role">Full Stack Developer</div>
            <div className="matter">
              A third-year B.Tech student majoring in CSE. I have a strong
              foundation in full-stack development, with experience in
              JavaScript, React, Node.js, and more. I'm known for my
              problem-solving skills. I'm excited to contribute my expertise to
              your full-stack development team.
            </div>
            <div className="icons">
              <i className="fa-brands fa-linkedin"></i>
              <i className="fa-brands fa-github"></i>
              <i className="fa-brands fa-x-twitter"></i>
            </div>
          </div>
          <div className="profile">
            <div className="profile-img">
              <img src={Kousik} alt="My Image" />
              <div className="red-line"></div>
            </div>
            <div className="name">G Venkata Kousik</div>
            <div className="role">Full Stack Developer</div>
            <div className="matter">
              A third-year B.Tech student majoring in CSE. I have a strong
              foundation in full-stack development, with experience in
              JavaScript, React, Node.js, and more. I'm known for my
              problem-solving skills. I'm excited to contribute my expertise to
              your full-stack development team.
            </div>
            <div className="icons">
              <i className="fa-brands fa-linkedin"></i>
              <i className="fa-brands fa-github"></i>
              <i className="fa-brands fa-x-twitter"></i>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AboutUs;
