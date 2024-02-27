import { createContext, useContext, useState } from "react";

// Create a context
const EventTriggerContext = createContext();

// Create a provider component
export const EventTriggerProvider = ({ children }) => {
  const [themeTrigger, setThemeTrigger] = useState(false);
  const [coordinatesTrigger, setCoordinatesTrigger] = useState(null);
  const [campAddress, setCampAddress] = useState(null);
  const [campCordinates, setCampCordinates] = useState(null);
  const [requestModalOpen, setRequestModalOpen] = useState(false);

  return (
    <EventTriggerContext.Provider
      value={{
        themeTrigger,
        setThemeTrigger,
        coordinatesTrigger,
        setCoordinatesTrigger,
        campAddress,
        setCampAddress,
        campCordinates,
        setCampCordinates,
        requestModalOpen,
        setRequestModalOpen,
      }}
    >
      {children}
    </EventTriggerContext.Provider>
  );
};

// Create a custom hook to access the event trigger state and function
export const useEventTrigger = () => useContext(EventTriggerContext);
