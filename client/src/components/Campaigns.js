import React, { Fragment, useEffect, useState } from "react";
import CampBg from "../images/camp-bg.png";
import { toast } from "react-toastify";
import AutofillCheckoutCamp from "./AutofillCheckoutCamp";
import { useEventTrigger } from "./EventTriggerContext";

const Campaigns = () => {
  const { campCordinates, setCampCordinates, campAddress, setCampAddress } =
    useEventTrigger();
  const [formData, setFormData] = useState({
    campname: "",
    dateandtime: "",
    venue: "",
    address: campAddress,
    purpose: "",
    conductedby: "",
    formlink: "",
    longitude: campCordinates ? campCordinates[0] : null,
    latitude: campCordinates ? campCordinates[1] : null,
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setFormData({
      ...formData,
      address: campAddress || "",
      longitude: campCordinates ? campCordinates[0] : null,
      latitude: campCordinates ? campCordinates[1] : null,
    });
  }, [campAddress, campCordinates]);

  const [showForm, setShowForm] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    fetchCampaigns();
  }, [showForm, campaigns]);

  const fetchCampaigns = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL + +"/getcampaigns"
      );
      if (response.ok) {
        const data = await response.json();
        setCampaigns(data);
      } else {
        toast.error("Error fetching campaign data");
      }
    } catch (error) {
      console.error("Error fetching campaign data:", error);
      toast.error("Error fetching campaign data");
    }
  };

  const today = new Date();
  const upcomingCampaigns = campaigns.filter(
    (campaign) => new Date(campaign.dateandtime) > today
  );
  const pastCampaigns = campaigns.filter(
    (campaign) => new Date(campaign.dateandtime) <= today
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requiredFields = [
      "campname",
      "dateandtime",
      "venue",
      "address",
      "purpose",
      "conductedby",
      "formlink",
    ];
    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      toast.error(`Missing required fields: ${missingFields.join(", ")}`);
    } else {
      try {
        const response = await fetch(
          process.env.REACT_APP_API_URL + "/createcampaigns",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        if (response.ok) {
          toast.success("Campaign created successfully");
          setCampAddress(null);
          setCampCordinates(null);
          setShowForm(false);
          setFormData(null);
          setShowModal(false);
        } else {
          toast.error("Error creating campaign");
        }
      } catch (error) {
        console.error("Error creating campaign:", error);
        toast.error("Error creating campaign");
      }
    }
  };

  function formatDateAndTime(dateString) {
    const date = new Date(dateString);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();

    const hours = date.getHours() % 12 || 12; // Convert to 12-hour format
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = date.getHours() < 12 ? "AM" : "PM";

    return `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;
  }

  const [imagePosition, setImagePosition] = useState("fixed");

  const handleScroll = () => {
    const parentContainer = document.querySelector(".campaign");
    if (window.scrollY > parentContainer.offsetHeight - 644) {
      setImagePosition("absolute");
    } else {
      setImagePosition("fixed");
    }
  };

  const handleWhatsAppShare = async (campaign) => {
    const message = `*🩸🏕️Bloodplus Community Campaign Details🏕️🩸*
Campaign Name: ${campaign.campname}
Date & Time: ${formatDateAndTime(campaign.dateandtime)}
Venue: ${campaign.venue}
Address: ${campaign.address}
Purpose: ${campaign.purpose}
Conducted By: ${campaign.conductedby}
Location: https://www.google.com/maps/search/?api=1&query=${
      campaign.latitude
    },${campaign.longitude}
Form Link: ${campaign.formlink}
*Shared from Bloodplus🩸 Community*`;

    try {
      if (navigator.share) {
        await navigator
          .share({
            title: "Bloodplus Campaign Details",
            text: message,
          })
          .then(() => console.log("Successful share"))
          .catch((error) => console.log("Error in sharing", error));
      } else {
        console.log(`System does not support sharing text messages.`);

        const whatsappURL = `https://api.whatsapp.com/send?text=${encodeURIComponent(
          message
        )}`;
        window.open(whatsappURL, "_blank");
      }
    } catch (error) {
      console.error("Error creating and sharing text file:", error);

      const whatsappURL = `https://api.whatsapp.com/send?text=${encodeURIComponent(
        message
      )}`;
      window.open(whatsappURL, "_blank");
    }
  };

  const shareToDonors = async (campaign, e) => {
    try {
      // add class disabled to buttonc
      e.target.setAttribute("disabled", true);
      toast.loading("Sharing campaign details...");
      const response = await fetch(
        process.env.REACT_APP_API_URL + "/sendmailall",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ campaign }),
        }
      );

      if (response.ok) {
        e.target.removeAttribute("disabled");
        toast.dismiss();
        toast.success("Campaign details shared successfully");
      } else {
        e.target.removeAttribute("disabled");
        toast.dismiss();
        toast.error("Error sharing campaign details");
      }
    } catch (error) {
      e.target.removeAttribute("disabled");
      toast.dismiss();
      console.error("Error  sharing campaign details:", error);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <Fragment>
      <div className="default-margin campaign">
        <div className="all-campaigns">
          <div className="upcoming">
            <h2>Upcoming Blood Campaigns</h2>
            {upcomingCampaigns ? (
              <div>
                {upcomingCampaigns.map((campaign) => (
                  <div key={campaign._id} className="campaign-template">
                    <div className="template">
                      <h2>{campaign.campname}</h2>
                      <p>
                        <b> Date & Time:</b>{" "}
                        {formatDateAndTime(campaign.dateandtime)}
                      </p>
                      <p>
                        <b>Venue: </b>
                        {campaign.venue}
                      </p>
                      <p>
                        <b>Address:</b> {campaign.address}
                      </p>
                      <p>
                        <b>Purpose:</b> {campaign.purpose}
                      </p>
                      <p>
                        <b>Conducted By:</b> {campaign.conductedby}
                      </p>
                      <p>
                        <b>Location:</b>{" "}
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${campaign.latitude},${campaign.longitude}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Open in Google Maps
                        </a>
                      </p>
                      <p>
                        <b>Form Link:</b>{" "}
                        <a
                          href={campaign.formlink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Open Google Form
                        </a>
                      </p>
                      <div className="buttons-c">
                        <button
                          className="btn btn-c"
                          onClick={() => {
                            handleWhatsAppShare(campaign);
                          }}
                        >
                          <span>
                            <i className="fa-solid fa-share"></i>
                          </span>
                        </button>
                        <button
                          className="btn btn-c"
                          onClick={(e) => {
                            shareToDonors(campaign, e);
                          }}
                        >
                          <span>
                            <i className="fa-solid fa-bullhorn"></i>
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>No Upcoming Campaigns...</div>
            )}
          </div>
          <div className="past">
            <h2>Past Blood Campaigns</h2>
            <div>
              {pastCampaigns.map((campaign) => (
                <div key={campaign._id} className="campaign-template">
                  <div className="template">
                    <h2>{campaign.campname}</h2>
                    <p>
                      <b>Date & Time:</b>{" "}
                      {formatDateAndTime(campaign.dateandtime)}
                    </p>
                    <p>
                      <b>Venue:</b> {campaign.venue}
                    </p>
                    <p>
                      <b>Address:</b> {campaign.address}
                    </p>
                    <p>
                      <b>Purpose: </b>
                      {campaign.purpose}
                    </p>
                    <p>
                      <b>Conducted By: </b>
                      {campaign.conductedby}
                    </p>
                    <p>
                      <b>Location:</b>{" "}
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${campaign.latitude},${campaign.longitude}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Open in Google Maps
                      </a>
                    </p>
                    <p>
                      <b>Form Link:</b>{" "}
                      <a
                        href={campaign.formlink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Open Google Form
                      </a>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="campaign-form form-container">
          {showModal && (
            <div className="modal">
              <div className="modal-content">
                <h2>Conduct Blood Campaign</h2>
                <form>
                  <div className="form-group inputs">
                    <label>
                      <i className="fa-solid fa-house-flag"></i>
                    </label>
                    <input
                      type="text"
                      name="campname"
                      placeholder="Campaign Name"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group inputs">
                    <label>
                      <i className="fa-solid fa-calendar-day"></i>
                    </label>
                    <input
                      type="datetime-local"
                      name="dateandtime"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group inputs">
                    <label>
                      <i className="fa-solid fa-hospital"></i>
                    </label>
                    <input
                      type="text"
                      name="venue"
                      placeholder="Venue"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group inputs">
                    <label>
                      <i className="fa-solid fa-bullseye"></i>
                    </label>
                    <input
                      type="text"
                      name="purpose"
                      placeholder="Purpose"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group inputs">
                    <label>
                      <i className="fa-solid fa-people-roof"></i>
                    </label>
                    <input
                      type="text"
                      placeholder="Conducted By"
                      name="conductedby"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group inputs">
                    <label>
                      <i className="fa-solid fa-file-invoice"></i>
                    </label>
                    <input
                      type="text"
                      name="formlink"
                      onChange={handleChange}
                      placeholder="Google Form Link"
                    />
                  </div>
                  <div className="form-group inputs">
                    <label>
                      <i className="fa-solid fa-map-location-dot"></i>
                    </label>
                    <AutofillCheckoutCamp />
                  </div>
                  <div className="buttons">
                    <button
                      type="submit"
                      className="btn"
                      onClick={handleSubmit}
                    >
                      <span>Create</span>
                    </button>
                    <button
                      onClick={() => {
                        setShowModal(false);
                        setCampCordinates(null);
                      }}
                      className="close btn"
                    >
                      <span>Close</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div className="conduct-button">
            <button className="btn" onClick={() => setShowModal(true)}>
              <span>Conduct Blood Campaign</span>
            </button>
          </div>

          <div className="image">
            <img
              src={CampBg}
              alt="Camp Background"
              style={{ position: imagePosition, right: 0, bottom: 0 }}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Campaigns;
