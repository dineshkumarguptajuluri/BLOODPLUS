import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import { useEventTrigger } from "./EventTriggerContext";
import { useUserContext } from "./UserContext";
import MarkerPopup from "./MarkerPopup";
import { createRoot } from "react-dom/client";
import RequestModal from "./RequestModal";

const Map = () => {
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const drawRef = useRef(null);
  const circleLayerRef = useRef(null);
  const [userLocation, setUserLocation] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const { themeTrigger, requestModalOpen, setRequestModalOpen } =
    useEventTrigger();
  const { coordinates } = useUserContext();
  const [userLocations, setUserLocations] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState(null);

  const closeRequestModal = () => {
    setRequestModalOpen(false);
  };

  const [recmail, setRecMail] = useState(null);
  const openRequestModal = (recipientemail) => {
    setRecMail(recipientemail);
    setRequestModalOpen(true);
  };

  const createCustomMarkerElement = (userData) => {
    const customMarkerElement = document.createElement("div");
    customMarkerElement.className = `custom-marker ${userData.bloodgroup}`;
    return customMarkerElement;
  };

  const createCustomHospitalMarkerElement = () => {
    const customMarkerElement = document.createElement("div");
    customMarkerElement.className = `custom-marker hospital`;
    return customMarkerElement;
  };

  const createCustomMarkerPopup = (userData) => {
    const container = document.createElement("div");
    const root = createRoot(container);

    root.render(
      <MarkerPopup userData={userData} openRequestModal={openRequestModal} />
    );

    // Create a Mapbox GL popup and set its maximum width to 300px
    const popup = new mapboxgl.Popup({ offset: 25 });
    popup.setDOMContent(container);
    popup.setMaxWidth("300px");

    return popup;
  };

  const initializeMap = (latitude, longitude) => {
    if (mapContainer.current) {
      mapContainer.current.innerHTML = "";
    }

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: isDarkMode
        ? "mapbox://styles/mapbox/dark-v10"
        : "mapbox://styles/mapbox/streets-v11",
      center: [longitude, latitude],
      zoom: 12,
    });

    mapRef.current = map;

    map.addControl(new mapboxgl.NavigationControl());

    drawRef.current = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        circle: true,
        trash: true,
      },
    });

    map.addControl(drawRef.current);

    map.on("load", async () => {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        const { latitude, longitude } = position.coords;
        const circleFeature = {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
          properties: {},
        };

        map.addSource("circle-source", {
          type: "geojson",
          data: circleFeature,
        });

        circleLayerRef.current = map.addLayer({
          id: "circle-layer",
          type: "circle",
          source: "circle-source",
          paint: {
            "circle-radius": calculateCircleRadius(map.getZoom()), // Set initial radius
            "circle-color": "#0074e4",
            "circle-opacity": 0.2,
          },
        });
        drawRef.current.add(circleFeature);
      } catch (error) {
        console.error("Error getting user's location:", error);
      }

      map.on("zoom", () => {
        map.setPaintProperty(
          "circle-layer",
          "circle-radius",
          calculateCircleRadius(map.getZoom())
        );
      });

      // After initializing the map, fetch user location data and create markers.
      fetchUserLocations();
      fetchHospitalLocations();
    });
    addOrUpdateMarker(latitude, longitude);
  };

  const calculateCircleRadius = (zoom) => {
    return Math.min(200 / Math.pow(2, 12 - zoom), 200);
  };

  const getLocation = async () => {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      const { latitude, longitude } = position.coords;
      // console.log(latitude, longitude);
      setUserLocation({ latitude, longitude });
    } catch (error) {
      console.error("Error getting user's location:", error);
    }
  };

  const markerRef = useRef(null);

  const addOrUpdateMarker = (latitude, longitude) => {
    if (mapRef.current) {
      if (markerRef.current) {
        markerRef.current.remove();
      }
      markerRef.current = new mapboxgl.Marker()
        .setLngLat([longitude, latitude])
        .addTo(mapRef.current);
    }
  };

  const fetchUserLocations = () => {
    // Replace this URL with your API endpoint.
    const apiUrl = process.env.REACT_APP_API_URL + "/getlocations";

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setUserLocations(data);
        // Create markers for each user's location.
        data.forEach((userData) => {
          createCustomMarker(userData);
        });
      })
      .catch((error) => {
        console.error("Error fetching user locations:", error);
      });
  };

  const fetchHospitalLocations = () => {
    // Replace this URL with your API endpoint.
    const apiUrl = process.env.REACT_APP_API_URL + "/gethospitals";
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        // setUserLocations(data);
        // Create markers for each user's location.
        data.forEach((userData) => {
          createCustomHospitalMarker(userData);
        });
      })
      .catch((error) => {
        console.error("Error fetching user locations:", error);
      });
  };

  const createCustomHospitalMarker = (userData) => {
    const cordinateString = userData.Location_Coordinates.split(",");
    const latitude = cordinateString[0];
    const longitude = cordinateString[1];
    const customMarker = new mapboxgl.Marker({
      element: createCustomHospitalMarkerElement(),
    })
      .setLngLat([longitude, latitude])
      .addTo(mapRef.current);
  };

  const createCustomMarker = (userData) => {
    const { latitude, longitude } = userData;
    const customMarker = new mapboxgl.Marker({
      element: createCustomMarkerElement(userData),
    })
      .setLngLat([longitude, latitude])
      .setPopup(createCustomMarkerPopup(userData))
      .addTo(mapRef.current);
  };

  const filterMarkers = () => {
    if (!mapRef.current) {
      return;
    }

    // Remove all existing markers
    const markers = mapRef.current
      .getCanvasContainer()
      .querySelectorAll(".custom-marker");
    markers.forEach((marker) => marker.remove());

    const { latitude, longitude } = userLocation;
    const filteredMarkers = userLocations.filter(
      (userData) =>
        filterCriteria === null || userData.bloodgroup === filterCriteria
    );

    // Create markers for the filtered data
    filteredMarkers.forEach((userData) => {
      createCustomMarker(userData);
    });
  };

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (coordinates !== null) {
      try {
        const latitude = coordinates[1];
        const longitude = coordinates[0];

        if (userLocation) {
          setUserLocation({ latitude, longitude });
        } else {
          initializeMap(latitude, longitude);
        }
        addOrUpdateMarker(latitude, longitude);
      } catch (error) {
        console.error("Error parsing coordinates JSON:", error);
      }
    }
  }, [coordinates]);

  useEffect(() => {
    setIsDarkMode(localStorage.getItem("theme") === "dark");
    if (userLocation) {
      const { latitude, longitude } = userLocation;
      initializeMap(latitude, longitude);
    }
  }, [themeTrigger, isDarkMode]);

  useEffect(() => {
    if (userLocation) {
      const { latitude, longitude } = userLocation;
      addOrUpdateMarker(latitude, longitude);
      if (mapRef.current) {
        mapRef.current.flyTo({
          center: [longitude, latitude],
          zoom: 12,
          essential: true,
        });
      }
    }
  }, [userLocation]);

  return (
    <div className="map-container">
      <div ref={mapContainer} style={{ width: "100%", height: "85vh" }}></div>
      <div className="floating-icon" onClick={getLocation}>
        <i className="fa-solid fa-location-crosshairs"></i>
      </div>
      <div className="floating-filter">
        <label>Filter by Blood Group:</label>
        <div className="drop">
          <i className="fa-solid fa-droplet red"></i>
        </div>
        <select
          onChange={(e) =>
            setFilterCriteria(e.target.value === "All" ? null : e.target.value)
          }
          value={filterCriteria || "All"}
        >
          <option value="All">All</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>
        <button className="btn" onClick={filterMarkers}>
          <span>
            <i className="fa-solid fa-filter red"></i> Filter
          </span>
        </button>
      </div>
      {requestModalOpen && (
        <RequestModal closeRequestModal={closeRequestModal} recmail={recmail} />
      )}
    </div>
  );
};

export default Map;
