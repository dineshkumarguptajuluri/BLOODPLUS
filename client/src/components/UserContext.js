import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  // Initialize user data from localStorage or empty strings
  const [userEmail, setUserEmail] = useState(
    localStorage.getItem("userEmail") || ""
  );
  const [userName, setUserName] = useState(
    localStorage.getItem("userName") || ""
  );

  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") || ""
  );

  // Initialize coordinates
  const [coordinates, setCoordinates] = useState(() => {
    const storedCoordinates = localStorage.getItem("coordinates");
    if (storedCoordinates) {
      return JSON.parse(storedCoordinates);
    } else {
      return null; // Initial value is set to null
    }
  });

  // Attempt to get the user's current location and update coordinates
  useEffect(() => {
    if (coordinates === null) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const userCoordinates = [longitude, latitude];
          setCoordinates(userCoordinates);
          localStorage.setItem("coordinates", JSON.stringify(userCoordinates));
        },
        (error) => {
          console.error("Error getting user's location:", error);
        }
      );
    }
  }, [coordinates]);

  // Save user data to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem("userEmail", userEmail);
      localStorage.setItem("userName", userName);
      localStorage.setItem("theme", isDarkMode);
    } catch (error) {
      console.error("Error saving user data to localStorage:", error);
    }
  }, [userEmail, userName, isDarkMode]);

  return (
    <UserContext.Provider
      value={{
        userEmail,
        setUserEmail,
        userName,
        setUserName,
        isDarkMode,
        setIsDarkMode,
        coordinates,
        setCoordinates,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
