import { createContext, useContext, useState, useEffect } from "react";
import typingTexts from "../data/data";

function getRandomElements(arr, count) {
  let shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
}
export const GAME_TYPE = {
  REGULAR: "REGULAR",
  INSTANT_DEATH: "INSTANT_DEATH",
};
const defaultContext = {
  currentLevel: 0,
  totalGameWPM: 0,
  currentTypingText: "",
  randomTypingTexts: [],
  handleCurrentGameLevelPass: () => {},
  handleCurrentGameNewWPM: () => {},
  handleNextLevelText: () => {},
  resetGame: () => {},
};

const GameContext = createContext(defaultContext);

const GameProvider = ({ children }) => {
  const [currentLevel, setCurrentLevel] = useState(defaultContext.currentLevel);
  const [totalGameWPM, setTotalGameWPM] = useState(defaultContext.totalGameWPM);
  const [gameType, setGameType] = useState(GAME_TYPE.REGULAR);
  const [randomTypingTexts, setRandomTypingTexts] = useState([]);
  const [currentTypingText, setCurrentTypingText] = useState("");

  useEffect(() => {
    if (currentLevel === 0) {
      const newRandomTypingTexts = getRandomElements(typingTexts, 3);
      setRandomTypingTexts(newRandomTypingTexts);
      setCurrentTypingText(newRandomTypingTexts[currentLevel].text);
    } else setCurrentTypingText(randomTypingTexts[currentLevel].text);
  }, [currentLevel]);

  const handleCurrentGameLevelPass = () => {
    setCurrentLevel((prev) => {
      const nextLevel = prev + 1;
      return nextLevel;
    });
  };

  const handleCurrentGameNewWPM = (newWPM) => {
    setTotalGameWPM((prevWPM) => (prevWPM + newWPM) / 2);
  };
  const handleNextLevelText = () => {
    setCurrentTypingText(randomTypingTexts[currentLevel].text);
  };
  const resetGame = () => {
    setCurrentLevel(0);
    setTotalGameWPM(0);
    const newRandomTypingTexts = getRandomElements(typingTexts, 3);
    setRandomTypingTexts(newRandomTypingTexts);
    setCurrentTypingText(newRandomTypingTexts[currentLevel].text);
  };
  return (
    <GameContext.Provider
      value={{
        currentLevel,
        totalGameWPM,
        currentTypingText,
        randomTypingTexts,
        gameType,
        setGameType,
        handleCurrentGameLevelPass,
        handleCurrentGameNewWPM,
        handleNextLevelText,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
export default GameProvider;
