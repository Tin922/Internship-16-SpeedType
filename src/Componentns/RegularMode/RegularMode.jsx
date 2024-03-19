import useTypingGame from "react-typing-game-hook";
import { PhaseType, CharStateType } from "react-typing-game-hook";
import { useEffect, useState } from "react";
import { useUserStats } from "../../Providers/UserStatsProvider";
import { useGame, GAME_TYPE } from "../../Providers/GameProvider";
import { useDialog, DIALOG } from "../../Providers/DialogProvider";
import { useStopwatch } from "../../Providers/StopwatchProvider";

const TypingGameDemo = () => {
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
    states: {
      charsState,
      length,
      currIndex,
      currChar,
      correctChar,
      errorChar,
      phase,
      startTime,
      endTime,
    },
    actions: { insertTyping, resetTyping, deleteTyping },
  } = useTypingGame(text);

  const handleKey = (key) => {
    if (key === "Escape") {
      resetTyping();
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
      <h1>React Typing Game Hook Demo</h1>
      {<p>Elapsed Time: {Math.round(elapsedTime)} seconds</p>}

      <p>Click on the text below and start typing (esc to reset)</p>
      <div
        className="typing-test"
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
              className={currIndex + 1 === index ? "curr-letter" : ""}
            >
              {char}
            </span>
          );
        })}
      </div>

      <pre>
        {JSON.stringify(
          {
            startTime,
            endTime,
            length,
            currIndex,
            currChar,
            correctChar,
            errorChar,
            phase,
          },
          null,
          2
        )}
      </pre>
    </div>
  );
};

export default TypingGameDemo;
