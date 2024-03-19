import useTypingGame from "react-typing-game-hook";
import { PhaseType } from "react-typing-game-hook";
import { useEffect } from "react";
import { useUserStats } from "../../Providers/UserStatsProvider";
import { useGame, GAME_TYPE } from "../../Providers/GameProvider";
import { useDialog, DIALOG } from "../../Providers/DialogProvider";
import { useStopwatch } from "../../Providers/StopwatchProvider";
import classes from "./index.module.css";

const TypingGame = () => {
  const {
    currentLevel,
    currentTypingText: text,
    gameType,
    setGameType,
    handleCurrentGameLevelPass,
    handleCurrentGameNewWPM,
    resetGame,
  } = useGame();
  const { handleLevelPass, handleNewWPM } = useUserStats();
  const { open, close } = useDialog();
  const { elapsedTime, startStopwatch, stopStopwatch } = useStopwatch();

  const {
    states: { charsState, currIndex, errorChar, phase, startTime, endTime },
    actions: { insertTyping, resetTyping, deleteTyping },
  } = useTypingGame(text, { skipCurrentWordOnSpace: false });

  const handleKey = (key) => {
    if (key === "Escape") {
      resetTyping();
      stopStopwatch();
    } else if (key === "Backspace") {
      deleteTyping(false);
    } else if (key.length === 1) {
      insertTyping(key);
    }
  };
  const openNewGameDialog = () => {
    open(DIALOG.NEW_GAME, {
      handleSubmitRegular: () => handleGameRestartSubmit(GAME_TYPE.REGULAR),
      handleSubmitInstantDeath: () =>
        handleGameRestartSubmit(GAME_TYPE.INSTANT_DEATH),
    });
  };
  const handleGameRestartSubmit = (gameType) => {
    close();
    setGameType(gameType);
    stopStopwatch();
    resetGame();
  };

  useEffect(() => {
    if (gameType !== GAME_TYPE.INSTANT_DEATH || errorChar === 0) return;
    stopStopwatch();
    open(DIALOG.RESULTS, {
      onSubmit: () => {
        openNewGameDialog();
      },
    });
  }, [errorChar]);

  useEffect(() => {
    if (phase === PhaseType.Started) startStopwatch(startTime);
    if (phase === PhaseType.Ended) {
      stopStopwatch();

      const wordCount = text.split(" ").length;
      const newWPM = (wordCount / (endTime - startTime)) * 1000 * 60;
      handleNewWPM(newWPM);
      handleCurrentGameNewWPM(newWPM);

      handleLevelPass();

      if (currentLevel !== 2)
        open(DIALOG.CONFIRM, {
          onSubmit: () => {
            handleCurrentGameLevelPass();
            close();
          },
        });
      else {
        open(DIALOG.RESULTS, {
          onSubmit: () => {
            openNewGameDialog();
          },
        });
      }
    }
  }, [phase]);
  return (
    <div>
      <h1
        className={`${classes.gameMode} ${
          gameType === GAME_TYPE.INSTANT_DEATH
            ? classes.gameModeInstantDeath
            : ""
        }`}
      >
        {gameType === GAME_TYPE.REGULAR ? "Regular Mode" : "Instant Death Mode"}
      </h1>
      <div className={classes.elapsedTimeContainer}>
        <p>Elapsed Time: {Math.round(elapsedTime)} seconds</p>
      </div>

      <p className={classes.instructions}>
        Click on the text below and start typing (esc to reset)
      </p>
      <div
        className={classes.typingTest}
        onKeyDown={(e) => {
          handleKey(e.key);
          e.preventDefault();
        }}
        tabIndex={0}
      >
        {text.split("").map((char, index) => {
          let state = charsState[index];
          let color = state === 0 ? "grey" : state === 1 ? "black" : "red";
          return (
            <span
              key={char + index}
              style={{ color }}
              className={currIndex + 1 === index ? classes.currLetter : ""}
            >
              {char}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default TypingGame;
