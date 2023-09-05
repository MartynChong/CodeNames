import { createContext, useContext, useState } from "react";
import { nouns } from "../resources/nouns";

// Define what variables can be accessed from the context
const GameProviderCtx = createContext<{
  turn: string;
  userID: string;
  toggleTurn: () => void;
  team: string;
  toggleTeam: () => void;

  //Words generated for each team
  redWords: Set<number>;
  blueWords: Set<number>;
  blackWord: number;

  //Cards chosen by team members
  redCards: Set<number>;
  blueCards: Set<number>;
  addRedCard: (card: number) => void;
  removeRedCard: (card: number) => void;
  addBlueCard: (card: number) => void;
  removeBlueCard: (card: number) => void;

  //Hints given by cardmasters
  redHint: string;
  blueHint: string;
  setRedHint: (hint: string) => void;
  setBlueHint: (hint: string) => void;

  //Count value of box gets reset
  countValue: number;
  setCountValue: (num: number) => void;

  //Timer index
  timerValue: number;
  setTimerValue: (num: number) => void;

  //Words list
  text: Array<string>;

  //Current Selected Word
  selectedWord: number;
  setSelectedWord: (num: number) => void;
  changeSelection: (oldCard: number, newCard: number, player: User) => void;

  PlayerSelections: Array<Array<User>>;
  addNewPlayerSelections: (card: number, player: User) => void;
  // removePlayerSelections: (card: number, player: User) => void;
} | null>(null);

const numberOfWords = 20;

const wordSet = new Set<number>();
while (wordSet.size < 11) {
  wordSet.add(Math.floor(Math.random() * 19) + 1);
}
const arrayWordSet = Array.from(wordSet);
const redWordsArray = arrayWordSet.slice(0, 4);
const blueWordsArray = arrayWordSet.slice(5, arrayWordSet.length - 2);
const blackWord = arrayWordSet[arrayWordSet.length - 1];
const text = new Array<string>();

for (let i = 0; i < 20; i++) {
  text.push(nouns[Math.floor(Math.random() * nouns.length)]);
}

var newUser = { name: "DONG", pfp: "Male" };
const filledArrayList = new Array(numberOfWords);
filledArrayList.fill(new Array<User>());
filledArrayList[0].push(newUser);

type User = {
  name: string;
  pfp: string;
};

const GameProvider = (props: { children: JSX.Element }) => {
  // Define all your fields and functions that will be accessed by the children
  const userID = "Martyn";

  const [timerValue, setTimerValue] = useState<number>(0);

  const [turn, setTurn] = useState<"Codemaster" | "Players">("Codemaster");
  const toggleTurn = () => {
    setTurn(turn === "Codemaster" ? "Players" : "Codemaster");
    setTimerValue(timerValue + 1);
  };

  const [team, setTeam] = useState<"Blue" | "Red">("Blue");
  const toggleTeam = () => {
    if (team === "Red") {
      setTeam("Blue");
      let newArr = new Set<number>();
      setRedCards(newArr);
      setCountValue(0);
    } else {
      setTeam("Red");
      let newArr = new Set<number>();
      setBlueCards(newArr);
      setCountValue(0);
    }
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

  const [redHint, setRedHint] = useState("");
  const [blueHint, setBlueHint] = useState("");

  const [countValue, setCountValue] = useState<number>(0);

  const [selectedWord, setSelectedWord] = useState<number>(0);

  const changeSelection = (oldCard: number, newCard: number, player: User) => {
    console.log("CHANGED WOW", selectedWord);
    setSelectedWord(newCard);
    console.log("CHANGED NEW", newCard);
    addNewPlayerSelections(newCard, player);
    if (selectedWord != -1) {
      removePlayerSelections(oldCard, player);
    }
  };

  const [PlayerSelections, setPlayerSelections] = useState(filledArrayList);

  const addNewPlayerSelections = (card: number, player: User) => {
    console.log("CURRENT CARD", card);
    var newList = new Array(PlayerSelections[card]);
    newList.push(player);
    PlayerSelections[card] = newList;
    console.log("ADDED PLAYER - ", player.name, " TO ", card);
    console.log(PlayerSelections);
  };

  const removePlayerSelections = (card: number, player: User) => {
    var newList = new Array(PlayerSelections[card]);

    var index = newList.indexOf(player);
    newList.splice(index);
    PlayerSelections[card] = newList;
    console.log("REMOVED PLAYER - ", player.name, " FROM ", card);
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

        redWords,
        blueWords,
        blackWord,

        redHint,
        blueHint,
        setRedHint,
        setBlueHint,

        countValue,
        setCountValue,

        timerValue,
        setTimerValue,

        text,

        setSelectedWord,
        selectedWord,
        changeSelection,

        PlayerSelections,
        addNewPlayerSelections,
        // removePlayerSelections,
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
