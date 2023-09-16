import { Stack, Group, Title, Space, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import AvatarList from "./AvatarList";
import { useGameProvider } from "../contexts/GameProvider";
import { useForceUpdate } from "@mantine/hooks";

type Props = {
  children: string;
  cardNumber: number;
  // turn: "Spymaster" | "Voter";
  // users: { name: string; pfp: string }[];
  // onClick: () => void;
};

type User = {
  name: string;
  pfp: number;
};

// export default function Card({ children, turn, users }: Props) {
export default function WordCard({ children, cardNumber }: Props) {
  // const theme = useMantineTheme();
  const {
    userID,

    turn,
    redWords,
    blueWords,
    blackWord,

    selectedWord,
    changeSelection,

    confirmation,
  } = useGameProvider();

  const forceUpdate = useForceUpdate();

  let currentList: { name: string; pfp: number }[] = [];

  const redColour = "#f29292";
  const blueColour = "#aef5f5";
  const redOutline = "#ea4d4c";
  const blueOutline = "#19d4d5";

  const blueCMStyle = {
    backgroundColor: blueColour,
  };

  const redCMStyle = {
    backgroundColor: redColour,
  };

  const redSelectedStyle = {
    outlineStyle: "solid",
    outlineColor: redOutline,
    outlineWidth: "6px",
    backgroundColor: redColour,
  };

  const blueSelectedStyle = {
    outlineStyle: "solid",
    outlineColor: blueOutline,
    outlineWidth: "6px",
    backgroundColor: blueColour,
  };

  const normalStyle = {
    backgroundColor: "#f7fefe",
  };

  const blackStyle = {
    backgroundColor: "#010808",
  };

  const neutralStyle = {
    backgroundColor: "#b4b5b4",
  };

  const styles = {
    border: "1px solid #eee",
    color: "#999",

    "&:hover": {
      backgroundColor: "#eee",
    },
  };

  //State of the list of users within
  const [currentUsers, setCurrentUsers] = useState(currentList);
  // const [randomName, setRandomName] = useState("a");

  const addUserToCurrentUsers = (currentUser: User) => {
    // Check if user is already in list
    if (currentUsers.map((u) => u.name).includes(currentUser.name)) return;
    setCurrentUsers([...currentUsers, currentUser]);
  };

  //Checks if word is assigned to team
  const wordExistsRed = () => {
    for (const word of redWords) {
      if (word.card === cardNumber) {
        return true;
      }
    }
    return false;
  };

  //Checks if word is assigned to team
  const wordExistsBlue = () => {
    for (const word of blueWords) {
      if (word.card === cardNumber) {
        return true;
      }
    }
    return false;
  };

  //Checks if word is assigned to either team
  const wordUsed = () => {
    if (wordExistsBlue() || wordExistsRed()) {
      return true;
    } else {
      return false;
    }
  };

  //Checks if black card
  const wordUsedBlack = cardNumber === blackWord.card;

  //Selects the card
  // const toggleSelected = () => {
  //   if (team === "Blue") {
  //     if (wordExistsBlue()) {
  //       if (blueCards.has(cardNumber)) {
  //         removeBlueCard(cardNumber);
  //       } else {
  //         addBlueCard(cardNumber);
  //       }
  //     }
  //   } else {
  //     if (wordExistsRed()) {
  //       if (redCards.has(cardNumber)) {
  //         removeRedCard(cardNumber);
  //       } else {
  //         addRedCard(cardNumber);
  //       }
  //     }
  //   }
  // };

  return (
    <Stack
      onClick={() => {
        if (turn === "Codemaster") {
          // toggleSelected();
          // toggleTeam();
          // toggleTurn();
          forceUpdate();
        } else if (confirmation === true) {
        } else {
          // toggleTurn();
          // toggleTeam();
          changeSelection(selectedWord, cardNumber, userID);
        }
      }}
      h="12vh"
      w="13vw"
      align="center"
      // sx={{
      //   ...(turn === "Codemaster"
      //     ? wordUsed()
      //       ? wordExistsRed()
      //         ? redCMStyle
      //         : wordExistsBlue()
      //           ? blueCMStyle
      //           : blackCard
      //         ? blackStyle
      //         : normalStyle
      //       : blackCard
      //       ? blackStyle
      //       : normalStyle
      //     : //Players Turn: black cards and neutral cards ADD FOUND CARDS
      //       normalStyle),
      // }}

      sx={{
        ...(turn === "Codemaster"
          ? wordUsed()
            ? wordExistsBlue()
              ? blueCMStyle
              : wordExistsRed()
              ? redCMStyle
              : blackStyle
            : wordUsedBlack
            ? blackStyle
            : normalStyle
          : normalStyle),
      }}

      //Highlight when selected by codemaster
    >
      {/* {*Player Icons} */}
      <Group position="right" mt="xs">
        <AvatarList cardNumber={cardNumber}></AvatarList>
      </Group>

      {/* Display Word */}
      <Title
        sx={{
          WebkitUserSelect: "none",
          WebkitTouchCallout: "none",
          MozUserSelect: "none",
          msUserSelect: "none",
          userSelect: "none",
        }}
        order={3}
        weight={100}
        align="center"
        fw={700}
        c={wordUsedBlack && turn === "Codemaster" ? "silver" : "dark"}
        tt="capitalize"
      >
        {children}
      </Title>
    </Stack>
  );
}

//HEY ADD WAITING FOR PLAYERS TO CONFIRM
//RED TEAM BLUE TEAM ON EITHER SIDE
//WORD CONCLUSION
