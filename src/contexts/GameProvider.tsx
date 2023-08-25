import { createContext, useContext, useState } from "react";

// Define what variables can be accessed from the context
const GameProviderCtx = createContext<{
  turn: string;
  userID: string;
  toggleTurn: () => void;
  team: string;
  toggleTeam: () => void;

  redWords: Set<number>;
  blueWords: Set<number>;

  //Cards chosen by team members
  redCards: Set<number>;
  blueCards: Set<number>;
  addRedCard: (card: number) => void;
  removeRedCard: (card: number) => void;
  addBlueCard: (card: number) => void;
  removeBlueCard: (card: number) => void;
} | null>(null);

const wordSet = new Set<number>();
while (wordSet.size < 10) {
  wordSet.add(Math.floor(Math.random() * 24) + 1);
}
const arrayWordSet = Array.from(wordSet);
const redWordsArray = arrayWordSet.slice(0, 4);
const blueWordsArray = arrayWordSet.slice(5, arrayWordSet.length - 1);

const GameProvider = (props: { children: JSX.Element }) => {
  // Define all your fields and functions that will be accessed by the children
  const userID = "Martyn";

  const [turn, setTurn] = useState<"Codemaster" | "Players">("Codemaster");
  const toggleTurn = () => {
    setTurn(turn === "Codemaster" ? "Players" : "Codemaster");
  };

  const [team, setTeam] = useState<"Blue" | "Red">("Blue");
  const toggleTeam = () => {
    setTeam(team === "Red" ? "Blue" : "Red");
  };

  const [redCards, setRedCards] = useState(new Set<number>());
  const addRedCard = (card: number) => {
    let newArr = new Set(redCards.add(card));
    setRedCards(newArr);
  };

  const [blueCards, setBlueCards] = useState(new Set<number>());
  const addBlueCard = (card: number) => {
    let newArr = new Set(blueCards.add(card));
    setBlueCards(newArr);
  };

  const removeRedCard = (card: number) => {
    redCards.delete(card);
    let newArr = new Set(redCards);
    setRedCards(newArr);
  };

  const removeBlueCard = (card: number) => {
    blueCards.delete(card);
    let newArr = new Set(blueCards);
    setBlueCards(newArr);
  };

  const redWords = new Set<number>(redWordsArray);
  const blueWords = new Set<number>(blueWordsArray);
  console.log("RED", redWords);
  console.log("BLUE", blueWords);

  return (
    <GameProviderCtx.Provider
      value={{
        turn,
        userID,
        toggleTurn,

        redCards,
        addRedCard,
        removeRedCard,
        blueCards,
        addBlueCard,
        removeBlueCard,

        team,
        toggleTeam,

        redWords,
        blueWords,
      }}
    >
      {props.children}
    </GameProviderCtx.Provider>
  );
};

export const useGameProvider = () => {
  const gameProviderValues = useContext(GameProviderCtx);
  if (gameProviderValues === null)
    throw new Error("Cannot use Game Provider values outside of the provider");
  return gameProviderValues;
};

export default GameProvider;
