import { createContext, useContext, useState } from "react";
import { nouns } from "../resources/nouns";
import { useForceUpdate } from "@mantine/hooks";

type User = {
  name: string;
  pfp: number;
  voted: boolean;
};

type Vote = {
  user: User;
  card: number;
};

// Define what variables can be accessed from the context
const GameProviderCtx = createContext<{
  userID: User;
  setPfp: (num: number) => void;
  setUsername: (name: string) => void;
  setVoteStatus: () => void;

  redCodemaster: Set<User>;
  setRedCodemaster: (newTeam: Set<User>) => void;
  blueCodemaster: Set<User>;
  setBlueCodemaster: (newTeam: Set<User>) => void;

  turn: string;
  toggleTurn: () => void;
  team: string;
  toggleTeam: () => void;

  //Words generated for each team
  redWords: Set<{ card: number; found: boolean }>;
  blueWords: Set<{ card: number; found: boolean }>;
  blackWord: { card: number; found: boolean; team: "Red" | "Blue" | null };

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

  //Words list
  text: Array<string>;

  //Current Selected Word
  userSelected: boolean;
  selectedWord: number;
  setSelectedWord: (num: number) => void;
  changeSelection: (oldCard: number, newCard: number, player: User) => void;

  //Player card selection and confirmation
  playerSelections: Array<Array<User>>;
  addNewPlayerSelections: (card: number, player: User) => void;
  confirmation: boolean;
  confirmVote: () => void;
  votedCards: Set<Vote>;

  //Number of players
  redPlayers: Set<User>;
  setRedPlayers: (newTeam: Set<User>) => void;
  bluePlayers: Set<User>;
  setBluePlayers: (newTeam: Set<User>) => void;

  //End Turn
  playersVoted: Set<User>;
  endVotingTurn: boolean;
  votesSubmitted: () => void;
  finalCardVote: Set<number>;

  //Display title text
  displayNumber: number;
  setDisplayNumber: (num: number) => void;
} | null>(null);

const numberOfWords = 20;

const wordSet = new Set<number>();
while (wordSet.size < 11) {
  wordSet.add(Math.floor(Math.random() * 19) + 1);
}
const arrayWordSet = Array.from(wordSet);
const redWordsArray = arrayWordSet.slice(0, 4);
const blueWordsArray = arrayWordSet.slice(5, arrayWordSet.length - 2);
const blackFind = arrayWordSet[arrayWordSet.length - 1];
const blackWord = { card: blackFind, found: false, team: null };
const text = new Array<string>();

for (let i = 0; i < 20; i++) {
  text.push(nouns[Math.floor(Math.random() * nouns.length)]);
}

// var newUser = { name: "DONG", pfp: "Male" };
const filledArrayList = new Array();
for (let i = 0; i < numberOfWords; i++) {
  filledArrayList.push([]);
}
// for (let i = 0; i < numberOfWords; i++) {
//   filledArrayList[i].push(newUser);
// }

var user1 = { name: "Johnny", pfp: 0, voted: false };
var user2 = { name: "Bob", pfp: 1, voted: false };
var user3 = { name: "Dog", pfp: 2, voted: false };
var user4 = { name: "wat", pfp: 3, voted: false };

var startRedCodemaster = new Set<User>();
var startRedPlayers = new Set<User>();
var startBlueCodemaster = new Set<User>();
var startBluePlayers = new Set<User>();

startBlueCodemaster.add(user1);
// startBluePlayers.add(user2);
startRedCodemaster.add(user3);
startRedPlayers.add(user4);

var redSet = new Set<{ card: number; found: boolean }>();
for (let i = 0; i < redWordsArray.length; i++) {
  redSet.add({ card: redWordsArray[i], found: false });
}

var blueSet = new Set<{ card: number; found: boolean }>();
for (let i = 0; i < blueWordsArray.length; i++) {
  blueSet.add({ card: blueWordsArray[i], found: false });
}

const GameProvider = (props: { children: JSX.Element }) => {
  const defaultUser = { name: "Bobo", pfp: -1, voted: false };
  const [userID, setUserID] = useState<User>(defaultUser);

  const [displayNumber, setDisplayNumber] = useState<number>(0);

  const [finalCardVote, setFinalCardVote] = useState<Set<number>>(
    new Set<number>()
  );

  const setFCard = (num: number) => {
    finalCardVote.clear;
    finalCardVote.add(num);
  };

  const setPfp = (num: number) => {
    userID.pfp = num;
  };

  const setUsername = (name: string) => {
    userID.name = name;
  };

  const setVoteStatus = () => {
    userID.voted === true ? (userID.voted = false) : (userID.voted = true);
  };

  const [turn, setTurn] = useState<"Codemaster" | "Players">("Codemaster");
  const toggleTurn = () => {
    setTurn(turn === "Codemaster" ? "Players" : "Codemaster");
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

  const redWords = new Set<{ card: number; found: boolean }>(redSet);
  const blueWords = new Set<{ card: number; found: boolean }>(blueSet);

  const [redHint, setRedHint] = useState("");
  const [blueHint, setBlueHint] = useState("");

  const [countValue, setCountValue] = useState<number>(0);

  const [userSelected, setUserSelected] = useState<boolean>(false);

  const [selectedWord, setSelectedWord] = useState<number>(-1);

  const changeSelection = (oldCard: number, newCard: number, player: User) => {
    setUserSelected(true);
    setSelectedWord(newCard);
    addNewPlayerSelections(newCard, player);
    if (selectedWord != -1) {
      removePlayerSelections(oldCard, player);
    }
  };

  const [playerSelections, setPlayerSelections] =
    useState<Array<Array<User>>>(filledArrayList);

  const addNewPlayerSelections = (card: number, player: User) => {
    console.log("CURRENT CARD", card);
    var newList = playerSelections[card];
    newList.push(player);
    console.log("ADDED PLAYER - ", player.name, " TO ", card);
    console.log(playerSelections);
  };

  const removePlayerSelections = (card: number, player: User) => {
    console.log("PREV ARR", playerSelections[card]);
    var oldList = playerSelections[card];
    var index = oldList.indexOf(player);
    oldList.splice(index, 1);
    console.log("REMOVED PLAYER - ", player.name, " FROM ", card);
    console.log("NEW ARR ", playerSelections[card]);
  };

  const [confirmation, setConfirmation] = useState<boolean>(false);

  const playersVoted = new Set<User>();

  const confirmVote = () => {
    setConfirmation(confirmation === true ? false : true);
    playersVoted.add(userID);
    VoteForCard(userID, selectedWord);
  };

  const [redPlayers, setRedPlayers] = useState(startRedPlayers);
  const [bluePlayers, setBluePlayers] = useState(startBluePlayers);

  const [redCodemaster, setRedCodemaster] = useState(startRedCodemaster);
  const [blueCodemaster, setBlueCodemaster] = useState(startBlueCodemaster);

  const [endVotingTurn, setEndingVotingTurn] = useState<boolean>(false);

  const votesSubmitted = () => {
    console.log("Checking if votes are submitted");
    if (team === "Red") {
      console.log(playersVoted.size, " - ", redPlayers.size);
      if (playersVoted.size === redPlayers.size) {
        setVoteStatus();
        endVoting();
      }
    } else {
      console.log(playersVoted.size, " - ", bluePlayers.size);
      if (playersVoted.size === bluePlayers.size) {
        setVoteStatus();
        endVoting();
      }
    }
  };

  const changeFinalCard = (num: number) => {
    setFCard(num);
  };

  const endVoting = () => {
    var longestCard = [];
    var largestVote = 0;
    for (const card of votedCards) {
      var currentCard = card.card;
      var currentSize = 0;
      for (const word of votedCards) {
        if (word.card === currentCard) {
          currentSize = currentSize + 1;
        }
      }
      if (largestVote <= currentCard) {
        var newLarge = currentSize;
        largestVote = newLarge;
      }
    }

    for (const card of votedCards) {
      var currentLength = 0;
      for (const word of votedCards) {
        if (card.card === word.card) {
          currentLength += 1;
        }
      }
      if (currentLength >= largestVote) {
        longestCard.push(card.card);
      }
    }
    var rand = Math.ceil(Math.random() * longestCard.length) - 1;
    changeFinalCard(longestCard[rand]);
    console.log("FINAL VOTE", finalCardVote);
    confirmCorrectVote();
  };

  const confirmCorrectVote = () => {
    console.log("HERE CONFIRMATION");
    var [first] = finalCardVote;
    if (team === "Blue") {
      var wordFound = false;
      for (const word of blueWords) {
        if (word.card === first && word.found === false) {
          word.found = true;
          wordFound = true;
        }
      }
      if (wordFound) {
        console.log("Word found");
        setDisplayNumber(1);
        console.log("Blue words", blueWords);
      } else {
        console.log("Blue Word not Found");
        setDisplayNumber(2);
        toggleTeam();
        toggleTurn();
      }
    } else if (team === "Red") {
      var wordFound = false;
      for (const word of redWords) {
        if (word.card === first && word.found === false) {
          word.found = true;
          wordFound = true;
        }
      }
      if (wordFound) {
        console.log("Red Word found");
        setDisplayNumber(1);
        console.log("Red words", redWords);
      } else {
        console.log("Red Word not Found");
        setDisplayNumber(2);
        toggleTeam();
        toggleTurn();
      }
    }
    resetVotes();
  };

  const votedCards = new Set<Vote>();

  const VoteForCard = (user: User, card: number) => {
    votedCards.add({ user, card });
    votesSubmitted();
  };

  const resetVotes = () => {
    for (var i = 0; i < playerSelections.length; i++) {
      playerSelections[i] = [];
    }
    setUserSelected(false);
    setConfirmation(false);
  };

  return (
    <GameProviderCtx.Provider
      value={{
        userID,
        setPfp,
        setUsername,
        setVoteStatus,

        blueCodemaster,
        redCodemaster,
        setBlueCodemaster,
        setRedCodemaster,

        turn,
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

        text,

        userSelected,
        setSelectedWord,
        selectedWord,
        changeSelection,

        playerSelections,
        addNewPlayerSelections,
        confirmation,
        confirmVote,

        redPlayers,
        setRedPlayers,
        bluePlayers,
        setBluePlayers,
        playersVoted,
        endVotingTurn,
        votesSubmitted,
        votedCards,
        finalCardVote,

        displayNumber,
        setDisplayNumber,
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
