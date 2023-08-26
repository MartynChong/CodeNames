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
  pfp: string;
};

// export default function Card({ children, turn, users }: Props) {
export default function WordCard({ children, cardNumber }: Props) {
  // const theme = useMantineTheme();
  const {
    turn,
    toggleTurn,
    team,
    toggleTeam,
    redCards,
    addRedCard,
    blueCards,
    addBlueCard,
    removeBlueCard,
    removeRedCard,

    redWords,
    blueWords,
  } = useGameProvider();

  //Delete Later
  var currentUser = { name: "New", pfp: "Male" };
  const forceUpdate = useForceUpdate();

  let currentList: { name: string; pfp: string }[] = [];

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

  const styles = {
    border: "1px solid #eee",
    color: "#999",

    "&:hover": {
      backgroundColor: "#eee",
    },
  };

  //State of the list of users within
  const [currentUsers, setCurrentUsers] = useState(currentList);
  const [randomName, setRandomName] = useState("a");

  const addUserToCurrentUsers = (currentUser: User) => {
    // Check if user is already in list
    if (currentUsers.map((u) => u.name).includes(currentUser.name)) return;
    setCurrentUsers([...currentUsers, currentUser]);

    // Add mr random name to the list
    setCurrentUsers([...currentUsers, { name: randomName, pfp: "Male" }]);
    setRandomName(randomName + "a");
  };

  //Checks if word is selected by cardmaster
  const selectedByRed = redCards.has(cardNumber);

  //Checks if word is assigned to team
  const wordExistsRed = redWords.has(cardNumber);

  const wordExistsBlue = blueWords.has(cardNumber);

  //Checks if word is assigned to either team
  const wordUsed = redWords.has(cardNumber) || blueWords.has(cardNumber);

  //Selects the card
  const toggleSelected = () => {
    if (team === "Blue") {
      if (wordExistsBlue) {
        if (blueCards.has(cardNumber)) {
          removeBlueCard(cardNumber);
        } else {
          addBlueCard(cardNumber);
        }
      }
    } else {
      if (wordExistsRed) {
        if (redCards.has(cardNumber)) {
          removeRedCard(cardNumber);
        } else {
          addRedCard(cardNumber);
        }
      }
    }
  };

  return (
    <Stack
      onClick={() => {
        if (turn === "Codemaster") {
          toggleSelected();
          // toggleTeam();
          // toggleTurn();
          console.log("CLICKED");
          forceUpdate();
        } else {
          // toggleTurn();
          addUserToCurrentUsers(currentUser);
        }
      }}
      h="12vh"
      w="15vw"
      align="center"
      sx={{
        ...(turn === "Codemaster"
          ? wordUsed
            ? wordExistsRed
              ? redCards.has(cardNumber)
                ? redSelectedStyle
                : redCMStyle
              : wordExistsBlue
              ? blueCards.has(cardNumber)
                ? blueSelectedStyle
                : blueCMStyle
              : normalStyle
            : normalStyle
          : normalStyle),
      }}

      //Highlight when selected by codemaster
    >
      {/* {*Player Icons} */}
      <Group position="right" h="1vh" mt="xs">
        <AvatarList users={currentUsers}></AvatarList>
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
        c="dark"
        tt="capitalize"
      >
        {children}
      </Title>
    </Stack>
  );
}
