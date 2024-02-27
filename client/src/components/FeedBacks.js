import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ShareBg from "../images/sharebg.png";
import FeedbackModal from "../components/FeedbackModal";
import { useUserContext } from "./UserContext";

const FeedBacks = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userEmail } = useUserContext();
  const [feedbacks, setFeedbacks] = useState([]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const submitFeedback = (feedbackData) => {
    console.log("Feedback submitted:", feedbackData);
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

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i
          key={i}
          className={`fa-solid fa-star ${
            i <= rating ? "filled" : "not-filled"
          }`}
        ></i>
      );
    }
    return stars;
  };

  useEffect(() => {
    fetchFeedbacks();
  }, [isModalOpen]);

  const fetchFeedbacks = () => {
    fetch(process.env.REACT_APP_API_URL + "/getfeedbacks")
      .then((response) => response.json())
      .then((data) => {
        setFeedbacks(data);
      })
      .catch((error) => {
        console.error("Error fetching feedbacks:", error);
      });
  };

  const [imagePosition, setImagePosition] = useState("fixed");
  const handleScroll = () => {
    const parentContainer = document.querySelector(".feedback");
    if (window.scrollY > parentContainer.offsetHeight - 644) {
      setImagePosition("absolute");
    } else {
      setImagePosition("fixed");
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
      <div className="default-margin feedback">
        <div className="fb-container">
          <div className="all-feedback">
            <h2 className="red">Feedbacks</h2>
            <ul>
              {feedbacks.map((feedback, index) => (
                <li key={index}>
                  <b>
                    <p>{feedback.name}</p>
                  </b>
                  <p>Rating: {renderStars(feedback.stars)}</p>
                  <p>{feedback.feedback}</p>
                  <p className="date">{formatDateAndTime(feedback.date)}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            {userEmail ? (
              <button onClick={openModal} className="btn right">
                <span>
                  <i className="fa-solid fa-heart red"></i> Give Feedback
                </span>
              </button>
            ) : (
              <div className="btn right big">
                <Link to="/donors/login">
                  <span>Be a donor to give feedback</span>
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="fb-bg">
          <img
            src={ShareBg}
            style={{ position: imagePosition, right: 0, bottom: 0 }}
            alt="Share Background"
          />
        </div>
      </div>
      <FeedbackModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={submitFeedback}
      />
    </Fragment>
  );
};

export default FeedBacks;
