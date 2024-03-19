import { createContext, useContext, useState, useEffect } from "react";

const defaultContext = {
  elapsedTime: 0,
  startStopwatch: (startTime) => {},
  stopStopwatch: () => {},
};

const StopwatchContext = createContext(defaultContext);

const StopwatchProvider = ({ children }) => {
  const [elapsedTime, setElapsedTime] = useState(defaultContext.elapsedTime);
  const [intervalId, setIntervalId] = useState(null);

  const startStopwatch = (startTime) => {
    const id = setInterval(() => {
      const currentTime = Date.now();
      setElapsedTime((currentTime - startTime) / 1000);
    }, 1000);
    setIntervalId(id);
  };

  const stopStopwatch = () => {
    clearInterval(intervalId);
    setElapsedTime(0);
  };

  useEffect(() => {
    return () => {
      clearInterval(intervalId);
    };
  }, [intervalId]);

  return (
    <StopwatchContext.Provider
      value={{
        elapsedTime,
        startStopwatch,
        stopStopwatch,
      }}
    >
      {children}
    </StopwatchContext.Provider>
  );
};

export const useStopwatch = () => useContext(StopwatchContext);
export default StopwatchProvider;
