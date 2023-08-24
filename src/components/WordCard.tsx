import { Stack, Button, Group, Title } from "@mantine/core";
import { useMemo, useState } from "react";
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

// export const WordCards = () => {
//   const [voteMap, setVoteMap] = useState<{
//     [userID: string]: string;
//   }>({});

//   const userID = "John";

//   const voteOnWord = (currentWord: string) => {
//     setVoteMap({ ...voteMap, [userID]: currentWord });
//   };

//   const words = ["dog", "cat", "mouse"];
//   const currentTurn = "Spymaster";

//   return words.map((word) => (
//     <WordCard turn={currentTurn} users={[]} onClick={() => voteOnWord(word)}>
//       {word}
//     </WordCard>
//   ));
// };

// export default function Card({ children, turn, users }: Props) {
export default function WordCard({ children, cardNumber }: Props) {
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
  } = useGameProvider();

  //Delete Later
  var currentUser = { name: "New", pfp: "Male" };
  const forceUpdate = useForceUpdate();

  let currentList: { name: string; pfp: string }[] = [];

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

  const wordSelected =
    (team === "Red" && redCards.has(cardNumber)) ||
    (team === "Blue" && blueCards.has(cardNumber));

  const toggleSelected = () => {
    if (team === "Blue") {
      if (blueCards.has(cardNumber)) {
        removeBlueCard(cardNumber);
      } else {
        addBlueCard(cardNumber);
      }
    } else {
      if (redCards.has(cardNumber)) {
        removeRedCard(cardNumber);
      } else {
        addRedCard(cardNumber);
      }
    }
  };

  return (
    <Stack
      onClick={() => {
        forceUpdate();
        if (turn === "Codemaster") {
          toggleSelected();
        } else {
          toggleTurn();
          addUserToCurrentUsers(currentUser);
        }
      }}
      h="12vh"
      w="15vw"
      align="center"
      sx={
        turn === "Codemaster" && wordSelected
          ? (theme) => ({
              outlineStyle: "groove",
              outlineColor: "cyan",
              outlineWidth: "2px",

              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[8]
                  : theme.colors.gray[0],
            })
          : (theme) => ({
              backgroundColor:
                theme.colorScheme === "light"
                  ? theme.colors.dark[8]
                  : theme.colors.gray[0],
            })
      }

      //Highlight when selected by codemaster
    >
      {/* {*Player Icons} */}
      <Group position="right" h="1vh">
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
        order={1}
        weight={100}
        align="center"
        fw={700}
        c="dark"
      >
        {children}
      </Title>
    </Stack>
  );
}
