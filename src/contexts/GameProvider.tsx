import { createContext, useContext, useState } from "react";

// Define what variables can be accessed from the context
const GameProviderCtx = createContext<{
  turn: string;
  userID: string;
  toggleTurn: () => void;
  team: string;
  toggleTeam: () => void;

  redCards: Set<number>;
  blueCards: Set<number>;
  addRedCard: (card: number) => void;
  removeRedCard: (card: number) => void;
  addBlueCard: (card: number) => void;
  removeBlueCard: (card: number) => void;
} | null>(null);

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
    setRedCards(redCards.add(card));
  };

  const [blueCards, setBlueCards] = useState(new Set<number>());
  const addBlueCard = (card: number) => {
    setBlueCards(blueCards.add(card));
  };

  const removeRedCard = (card: number) => {
    redCards.delete(card);
  };

  const removeBlueCard = (card: number) => {
    blueCards.delete(card);
  };

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
