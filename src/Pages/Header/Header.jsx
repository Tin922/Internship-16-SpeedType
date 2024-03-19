import { Button } from "@mui/material";
import { useUserStats } from "../../Providers/UserStatsProvider";
import { DIALOG, useDialog } from "../../Providers/DialogProvider";
import { useNavigate } from "react-router-dom";
import DialogSwitch from "../../Dialogs/DialogSwitch";
import { GAME_TYPE, useGame } from "../../Providers/GameProvider";
import { useStopwatch } from "../../Providers/StopwatchProvider";
const Header = () => {
  const context = useUserStats();
  const { open, close } = useDialog();
  const navigate = useNavigate();
  const { setGameType, resetGame } = useGame();
  const { stopStopwatch } = useStopwatch();

  const handleSubmit = (route) => {
    close();
    navigate(route);
  };
  const handleNewGameClick = () => {
    open(DIALOG.NEW_GAME, {
      handleSubmitRegular: () => {
        handleSubmit("/newGame");
        resetGame();
        stopStopwatch();
        setGameType(GAME_TYPE.REGULAR);
      },
      handleSubmitInstantDeath: () => {
        handleSubmit("/newGame");
        resetGame();
        stopStopwatch();
        setGameType(GAME_TYPE.INSTANT_DEATH);
      },
    });
  };
  const handlePracticeClick = () => {
    open(DIALOG.PRACTICE, { onSubmit: () => handlePracticeMode() });
  };
  const handlePracticeMode = () => {
    open(DIALOG.PRACTICE);
  };
  return (
    <>
      <Button onClick={handlePracticeClick}>Practice</Button>
      <Button onClick={handleNewGameClick}>New Game</Button>
      <p>Stats:</p>
      <p>WPM: {context.averageWPMForUser}</p>
      <p>Levels passed:{context.totalLevelsPassed}</p>
      <DialogSwitch />
    </>
  );
};

export default Header;
