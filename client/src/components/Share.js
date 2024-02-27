import React, { Fragment } from "react";
import ShareBg from "../images/sharebg.png";
import Qrcode from "../images/qrcode.png";

const Share = () => {
  const handleWhatsAppShare = async () => {
    const response = await fetch(Qrcode);
    const blob = await response.blob();
    const file = new File([blob], "qrcode.png", { type: blob.type });

    if (navigator.share) {
      await navigator
        .share({
          title: "Share QR Code (BloodPlus)",
          text: "Share this QR Code with your friends",
          files: [file],
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error in sharing", error));
    } else {
      console.log(`System does not support sharing files.`);
    }
  };

  return (
    <Fragment>
      <div className="default-margin share">
        <div className="share-bg">
          <img src={ShareBg} alt="Share Background" />
        </div>
        <div className="qr-container">
          <h2 className="red">Scan QR Code to open the site in mobile</h2>
          <div className="qr-image">
            <img src={Qrcode} alt="QR Code" />
          </div>
          <h3 className="red">
            Share and Invite your friends to join in our bloodplus community
          </h3>
          <h3 className="btn btn-c share-icon">
            <span>
              <i
                onClick={() => {
                  handleWhatsAppShare();
                }}
                className="fa-solid fa-share "
              ></i>
            </span>
          </h3>
        </div>
      </div>
    </Fragment>
  );
};

export default Share;
