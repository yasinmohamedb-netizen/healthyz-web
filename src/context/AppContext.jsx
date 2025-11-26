import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(true);

  // Track Online / Offline (Browser)
  useEffect(() => {
    const updateStatus = () => {
      setIsConnected(navigator.onLine);
    };

    window.addEventListener("online", updateStatus);
    window.addEventListener("offline", updateStatus);

    updateStatus(); // initial check

    return () => {
      window.removeEventListener("online", updateStatus);
      window.removeEventListener("offline", updateStatus);
    };
  }, []);

  // Dummy logError for Web (no crashlytics)
  const logError = (error) => {
    console.error("Logged Error:", error);
  };

  // Dummy event logger
  const logEvent = async (name, params = {}) => {
    console.log("Analytics Event:", name, params);
  };

  return (
    <AppContext.Provider value={{ isConnected, logError, logEvent }}>
      {children}
    </AppContext.Provider>
  );
};
