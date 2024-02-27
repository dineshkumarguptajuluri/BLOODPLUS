import React, { useState, useCallback, useEffect } from "react";
import {
  AddressAutofill,
  useConfirmAddress,
  config,
} from "@mapbox/search-js-react";
import { toast } from "react-toastify";
import { useEventTrigger } from "./EventTriggerContext";

export default function AutoSignupFill() {
  const [showFormExpanded, setShowFormExpanded] = useState(false);
  const [token, setToken] = useState("");
  const [location, setLocation] = useState("");
  const { coordinatesTrigger, setCoordinatesTrigger } = useEventTrigger();

  useEffect(() => {
    const accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
    setToken(accessToken);
    config.accessToken = accessToken;
  }, []);

  const { formRef, showConfirm } = useConfirmAddress({
    skipConfirmModal: (feature) =>
      ["exact", "high"].includes(feature.properties.match_code.confidence),
  });

  const handleRetrieve = useCallback((res) => {
    const feature = res.features[0];
    setLocation(feature.place_name);
  }, []);

  const getCoordinatesForAddress = async (address) => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          address
        )}.json?access_token=${token}`
      );
      const data = await response.json();

      if (data.features && data.features.length > 0) {
        const coordinates = data.features[0].center;
        setCoordinatesTrigger(coordinates);
      } else {
        toast.error("Location not found."); // Show an error toast
        console.error("Location not found.");
      }
    } catch (error) {
      toast.error("Error fetching coordinates: " + error.message); // Show an error toast
      console.error("Error fetching coordinates:", error);
    }
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (location.trim() === "") {
        toast.error("Please enter a location.");
      } else {
        await showConfirm();
        setShowFormExpanded(false);
        getCoordinatesForAddress(location);
      }
    },
    [showConfirm, location]
  );

  return (
    <div>
      <form
        ref={formRef}
        className="flex flex--column form-container"
        onSubmit={handleSubmit}
      >
        <div className="grid grid--gut24 mb60">
          <div className="col col--auto-mm w-full">
            {!showFormExpanded ? (
              <div
                id="manual-entry"
                className="w180 mt6 link txt-ms border-b color-gray color-black-on-hover"
                onClick={() => setShowFormExpanded(true)}
              >
                <i className="fa-regular fa-keyboard"></i> Enter an address
                manually
              </div>
            ) : null}

            <div
              className="secondary-inputs"
              style={{ display: showFormExpanded ? "block" : "none" }}
            >
              <AddressAutofill accessToken={token} onRetrieve={handleRetrieve}>
                <div className="search-section inputs">
                  <label htmlFor="mapbox-autofill">
                    <i className="fa-solid fa-location-dot"></i>
                  </label>
                  <input
                    className="input mb12"
                    placeholder="Start typing your address..."
                    autoComplete="address-line1"
                    id="mapbox-autofill"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </AddressAutofill>
              <div className="inputs">
                <label className="txt-s txt-bold color-gray mb3">
                  <i className="fa-solid fa-address-book"></i>
                </label>
                <input
                  className="input mb12"
                  placeholder="Apartment, suite, unit, building, floor, etc."
                  autoComplete="address-line2"
                />
              </div>
              <div className="inputs">
                <label className="txt-s txt-bold color-gray mb3">
                  <i className="fa-solid fa-city"></i>
                </label>
                <input
                  className="input mb12"
                  placeholder="City"
                  autoComplete="address-level2"
                />
              </div>
              <div className="inputs">
                <label className="txt-s txt-bold color-gray mb3">
                  <i className="fa-solid fa-earth-asia"></i>
                </label>
                <input
                  className="input mb12"
                  placeholder="State / Region"
                  autoComplete="address-level1"
                />
              </div>
              <div className="inputs">
                <label className="txt-s txt-bold color-gray mb3">
                  <i className="fa-solid fa-map-pin"></i>
                </label>
                <input
                  className="input"
                  placeholder="ZIP / Postcode"
                  autoComplete="postal-code"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Form buttons */}
        {showFormExpanded ? (
          <div className="mb30 submit-btns">
            <button type="submit" className="btn round" id="btn-confirm">
              <span>
                <i className="fa-solid fa-check success"></i> Confirm
              </span>
            </button>
            <button
              type="button"
              className="btn round btn--gray-light ml3"
              id="btn-reset"
              onClick={() => setShowFormExpanded(false)}
            >
              <span>
                <i className="fa-regular fa-circle-xmark red"></i> Close
              </span>
            </button>
          </div>
        ) : null}
      </form>
    </div>
  );
}
