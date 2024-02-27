import React, { useState, useEffect } from "react";
import { useEventTrigger } from "./EventTriggerContext";
import BloodShape from "../images/bloodshape.png";
import BloodShapeNight from "../images/bloodshapenight.png";

const Loading = () => {
  const { themeTrigger } = useEventTrigger();
  const [text, setText] = useState("");
  const fullText = "Uniting Hearts, One Drop at a Time...";

  useEffect(() => {
    let timer;
    let i = 0;

    const typeText = () => {
      if (i < fullText.length) {
        setText(fullText.slice(0, i + 1));
        i++;
        timer = setTimeout(typeText, 50); // Adjust typing speed here
      }
    };

    typeText();

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="loading">
      <div className="container">
        <div className="water-effect">
          <div className="waves"></div>
          <div className="water"></div>
        </div>
      </div>
      <div className="blood-shape">
        {themeTrigger ? (
          <img src={BloodShapeNight} alt="Blood Shape" />
        ) : (
          <img src={BloodShape} alt="Blood Shape" />
        )}
      </div>
      <div className="blood-outline">
        <div className="img"></div>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default Loading;
