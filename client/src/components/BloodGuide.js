import React, { Fragment } from "react";
import GuideBg from "../images/guidebg.png";

function BloodGuide() {
  const numRows = 9;
  const numCols = 9;

  const donorBloodTypes = [
    <i className="fa-solid fa-user-nurse"></i>,
    "O-",
    "O+",
    "B-",
    "B+",
    "A-",
    "A+",
    "AB-",
    "AB+",
    "AB+",
    <i className="fa-solid fa-droplet red-icon large-icon"></i>,

    <i className="fa-solid fa-droplet red-icon large-icon"></i>,

    <i className="fa-solid fa-droplet red-icon large-icon"></i>,

    <i className="fa-solid fa-droplet red-icon large-icon"></i>,

    <i className="fa-solid fa-droplet red-icon large-icon"></i>,

    <i className="fa-solid fa-droplet red-icon large-icon"></i>,

    <i className="fa-solid fa-droplet red-icon large-icon"></i>,

    <i className="fa-solid fa-droplet red-icon large-icon"></i>,

    "AB-",
    <i className="fa-solid fa-droplet red-icon large-icon"></i>,

    "",
    <i className="fa-solid fa-droplet red-icon large-icon"></i>,

    "",
    <i className="fa-solid fa-droplet red-icon large-icon"></i>,

    "",
    <i className="fa-solid fa-droplet red-icon large-icon"></i>,

    "",
    "A+",

    <i className="fa-solid fa-droplet red-icon large-icon"></i>,

    <i className="fa-solid fa-droplet red-icon large-icon"></i>,

    "",
    "",
    <i className="fa-solid fa-droplet red-icon large-icon"></i>,

    <i className="fa-solid fa-droplet red-icon large-icon"></i>,

    "",
    "",
    "A-",
    <i className="fa-solid fa-droplet red-icon large-icon"></i>,

    "",
    "",
    "",

    <i className="fa-solid fa-droplet red-icon large-icon"></i>,
    "",
    "",
    "",
    "B+",
    <i className="fa-solid fa-droplet red-icon large-icon"></i>,

    <i className="fa-solid fa-droplet red-icon large-icon"></i>,

    <i className="fa-solid fa-droplet red-icon large-icon"></i>,

    <i className="fa-solid fa-droplet red-icon large-icon"></i>,

    "",
    "",
    "",
    "",
    "B-",
    <i className="fa-solid fa-droplet red-icon large-icon"></i>,

    "",
    <i className="fa-solid fa-droplet red-icon large-icon"></i>,

    "",
    "",
    "",
    "",
    "",
    "O+",
    <i className="fa-solid fa-droplet red-icon large-icon"></i>,

    <i className="fa-solid fa-droplet red-icon large-icon"></i>,

    "",
    "",
    "",
    "",
    "",
    "",
    "O-",
    <i className="fa-solid fa-droplet red-icon large-icon"></i>,
  ];

  return (
    <Fragment>
      <div className="guide">
        <div className="centered blood-guide">
          <h1 className="red">
            {donorBloodTypes[0]} Blood Compatibility Guide
          </h1>
          <table>
            <h2 className="top">Donor</h2>
            <h2 className="left">Recipient</h2>
            <tbody>
              {Array.from({ length: numRows }, (_, rowIndex) => (
                <tr key={rowIndex}>
                  {Array.from({ length: numCols }, (_, colIndex) => (
                    <td key={colIndex}>
                      {donorBloodTypes[rowIndex * numCols + colIndex]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="guide-img">
          <img src={GuideBg} alt="Guide Bg" />
        </div>
      </div>
    </Fragment>
  );
}

export default BloodGuide;
