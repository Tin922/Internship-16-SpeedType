import { createContext, useContext, useState } from "react";

const defaultContext = {
  totalLevelsPassed: 0,
  averageWPMForUser: 0,
  handleLevelPass: () => {},
  handleNewWPM: () => {},
};

const UserStatsContext = createContext(defaultContext);

const UserStatsProvider = ({ children }) => {
  const [totalLevelsPassed, setTotalLevelsPassed] = useState(
    defaultContext.totalLevelsPassed
  );
  const [averageWPMForUser, setAverageWPMForUser] = useState(
    defaultContext.averageWPMForUser
  );

  const handleLevelPass = () => {
    setTotalLevelsPassed((prev) => prev + 1);
  };
  const handleNewWPM = (newWPM) => {
    setAverageWPMForUser((prevWPM) => Math.round((prevWPM + newWPM) / 2));
  };
  return (
    <UserStatsContext.Provider
      value={{
        totalLevelsPassed,
        averageWPMForUser,
        handleLevelPass,
        handleNewWPM,
      }}
    >
      {children}
    </UserStatsContext.Provider>
  );
};

export const useUserStats = () => useContext(UserStatsContext);
export default UserStatsProvider;
