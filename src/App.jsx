import { Route, Routes } from "react-router-dom";
import Header from "./Pages/Header/Header";
import { StyledEngineProvider } from "@mui/material";
import NewGameMode from "./Componentns/NewGameMode/NewGameMode";
import UserStatsProvider from "./Providers/UserStatsProvider";
import DialogProvider from "./Providers/DialogProvider";
import PracticeMode from "./Componentns/PracticeMode/PracticeMode";
import GameProvider from "./Providers/GameProvider";
import StopwatchProvider from "./Providers/StopwatchProvider";
import HomePage from "./Pages/HomePage/HomePage";
import NotFound from "./Pages/NotFound/NotFound";
const App = () => {
  return (
    <>
      <StyledEngineProvider injectFirst>
        <UserStatsProvider>
          <DialogProvider>
            <GameProvider>
              <StopwatchProvider>
                <Header />
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/newGame" element={<NewGameMode />} />
                  <Route path="/practice" element={<PracticeMode />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </StopwatchProvider>
            </GameProvider>
          </DialogProvider>
        </UserStatsProvider>
      </StyledEngineProvider>
    </>
  );
};

export default App;
