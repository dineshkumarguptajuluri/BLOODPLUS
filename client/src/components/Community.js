import React, { Fragment, useState, useEffect } from "react";
import BloodTypeGraph from "../components/BloodTypeGraph";
import CommunityBg from "../images/community.png";

const Community = () => {
  const [donorCounts, setDonorCounts] = useState({
    allDonorsCount: 0,
    bloodTypeCounts: {},
  });

  useEffect(() => {
    // Fetch the donor counts from the API
    fetch(process.env.REACT_APP_API_URL + "/getdonorcounts")
      .then((response) => response.json())
      .then((data) => {
        // Set initial donor counts to 0
        setDonorCounts({
          allDonorsCount: 0,
          bloodTypeCounts: data.bloodTypeCounts,
        });

        // Start the animation to increase counts
        animateCounts(data.allDonorsCount, data.bloodTypeCounts, 2000); // Animation duration: 3000 ms (3 seconds)
      })
      .catch((error) => {
        console.error("Error fetching donor counts:", error);
      });
  }, []);

  const animateCounts = (totalDonors, bloodTypeCounts, duration) => {
    const startTime = Date.now();
    const incrementStep = totalDonors / duration; // Calculate increment step based on duration

    const incrementCounts = () => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime;

      if (elapsedTime < duration) {
        const currentCount = Math.floor(incrementStep * elapsedTime);
        setDonorCounts({
          allDonorsCount: currentCount,
          bloodTypeCounts: bloodTypeCounts,
        });

        // Continue the animation
        requestAnimationFrame(incrementCounts);
      } else {
        // Animation completed, set the final counts
        setDonorCounts({
          allDonorsCount: totalDonors,
          bloodTypeCounts: bloodTypeCounts,
        });
      }
    };

    // Start the animation
    requestAnimationFrame(incrementCounts);
  };

  return (
    <Fragment>
      <div className="default-margin community">
        <div className="community-div">
          <div className="about-community">
            <h2>About Our Blood Plus Community</h2>
            <p>
              Welcome to our Blood Plus community, a place where compassion and
              generosity come together to save lives. We are dedicated to making
              a positive impact on our community and beyond by providing a vital
              resource—blood.
            </p>
            <p>
              Every day, lives are saved because of the selflessness and
              kindness of our donors. Our community thrives on the shared values
              of empathy and support. Join us in this noble cause to ensure that
              no one faces a shortage of blood when they need it the most.
            </p>
          </div>
          <div className="count-animation">
            <h2>
              Total Donors:{" "}
              <span id="allDonorsCount">{donorCounts.allDonorsCount}</span>
              {"  "}
              <i className="fa-solid fa-droplet"></i>
            </h2>
            {donorCounts.allDonorsCount && (
              <BloodTypeGraph bloodTypeCounts={donorCounts.bloodTypeCounts} />
            )}
          </div>
        </div>
        <div className="community-bg">
          <img src={CommunityBg} alt="Community Background" />
        </div>
      </div>
    </Fragment>
  );
};

export default Community;
