import React, { useState, useCallback, useEffect } from "react";
import {
  AddressAutofill,
  useConfirmAddress,
  config,
} from "@mapbox/search-js-react";
import { useEventTrigger } from "./EventTriggerContext";

export default function AutofillCheckout() {
  const [selectedLocation, setSelectedLocation] = useState("");
  const { campCordinates, setCampAddress, setCampCordinates } =
    useEventTrigger();
  const [token, setToken] = useState("");

  useEffect(() => {
    const accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
    setToken(accessToken);
    config.accessToken = accessToken;
  }, []);

  const { formRef, showConfirm } = useConfirmAddress({
    minimap: true,
    skipConfirmModal: (feature) =>
      ["exact", "high"].includes(feature.properties.match_code.confidence),
  });

  const submitForm = async () => {
    await getCoordinates(selectedLocation);
  };

  const getCoordinates = async (location) => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${token}`
      );
      const data = await response.json();

      if (data.features && data.features.length > 0) {
        const coordinates = data.features[0].center;
        setCampAddress(location);
        setCampCordinates(coordinates);
      } else {
        console.error("Location not found.");
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      submitForm();
    },
    [showConfirm, submitForm]
  );

  const handleRetrieve = useCallback(
    (res) => {
      const feature = res.features[0];
      setSelectedLocation(feature.place_name);
    },
    [setSelectedLocation]
  );

  return (
    <>
      <form ref={formRef} className="flex flex--column" onSubmit={handleSubmit}>
        <div className="grid grid--gut24 mb60">
          <div className="col col--auto-mm w-full">
            <AddressAutofill accessToken={token} onRetrieve={handleRetrieve}>
              <div className="search-section">
                <input
                  className="input mb12"
                  placeholder="Start typing your address..."
                  autoComplete="address-line1"
                  id="mapbox-autofill"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                />
                <div id="confirm" onClick={handleSubmit}>
                  {campCordinates ? (
                    <i className="fa-solid fa-circle-check success"></i>
                  ) : (
                    <i className="fa-solid fa-circle-check red"></i>
                  )}
                </div>
              </div>
            </AddressAutofill>
          </div>
        </div>
      </form>
    </>
  );
}
