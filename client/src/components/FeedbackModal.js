import React, { useState } from "react";
import { useUserContext } from "../components/UserContext";
import { toast } from "react-toastify";

const FeedbackModal = ({ isOpen, onClose, onSubmit }) => {
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const { userEmail, userName } = useUserContext();

  const handleRatingChange = (event) => {
    setRating(parseInt(event.target.value));
  };

  const handleSubmit = async () => {
    if (!message || rating === 0) {
      toast.error("Please provide a message and rating.");
    } else {
      const feedbackData = {
        mailid: userEmail,
        name: userName,
        feedback: message,
        stars: rating,
      };

      try {
        const response = await fetch(
          process.env.REACT_APP_API_URL + "/createfeedbacks",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(feedbackData),
          }
        );

        if (response.ok) {
          toast.success("Feedback submitted successfully.");
          onSubmit(feedbackData);
          onClose();
        } else {
          toast.error("Error creating feedback. Please try again later.");
        }
      } catch (error) {
        console.error("Error creating feedback:", error);
        toast.error("Error creating feedback. Please try again later.");
      }
    }
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i
          key={i}
          className={`fa-solid fa-star ${
            i <= rating ? "filled" : "not-filled"
          }`}
          onClick={() => handleRatingChange({ target: { value: i } })}
        ></i>
      );
    }
    return stars;
  };

  return isOpen ? (
    <div className="feedback-modal modal">
      <div className="modal-content fb-div">
        <h2>Give Feedback</h2>
        <textarea
          rows="4"
          placeholder="Your feedback..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="rating">
          <span>Rating:</span>
          {renderStars()}
        </div>
        <div className="buttons">
          <button onClick={handleSubmit} className="btn">
            <span>Submit</span>
          </button>
          <button onClick={onClose} className="btn">
            <span>Close</span>
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default FeedbackModal;
