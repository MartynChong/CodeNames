import { Stack, Button, Group, Title } from "@mantine/core";
import { useState } from "react";
import AvatarList from "./AvatarList";

interface Props {
  children: string;
  turn: "Spymaster" | "Voter";
  users: { name: string; pfp: string }[];
}

type User = {
  name: string;
  pfp: string;
};

// export default function Card({ children, turn, users }: Props) {
export default function WordCard({ children }: Props) {
  //Delete Later
  var currentUser = { name: "New", pfp: "Male" };

  let currentList: { name: string; pfp: string }[] = [];

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

  return (
    <Stack
      onClick={() => {
        addUserToCurrentUsers(currentUser);
      }}
      h="20vh"
      w="18vw"
      align="center"
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "light"
            ? theme.colors.dark[8]
            : theme.colors.gray[0],
      })}
    >
      {/* {*Player Icons} */}
      <Group position="right">
        <AvatarList users={currentUsers}></AvatarList>
      </Group>

      {/* Display Word */}
      <Title order={1} weight={100} align="center" fw={700} c="dark">
        {children}
      </Title>

      {/* Voting Bar */}
      <Group position="center">
        <Button></Button>
      </Group>
    </Stack>
  );
}
