import {
  Avatar,
  Button,
  Divider,
  Group,
  Modal,
  Stack,
  Text,
  TextInput,
  Title,
  Tooltip,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

type User = {
  name: string;
  pfp: string;
};

export function LobbyModal() {
  const [menuOpen, { open, close }] = useDisclosure(true);
  const [lobbyOpen, setLobbyOpen] = useState(false);

  const redStyle = {
    backgroundColor: "#f29292",
  };

  const blueStyle = {
    backgroundColor: "#aef5f5",
  };

  const lobbyScreen = () => {
    return (
      <Group align="center">
        {teamMenu("Blue", blueStyle)} {teamMenu("Red", redStyle)}
      </Group>
    );
  };

  const teamMenu = (name: string, style: object) => {
    return (
      <Stack h="40vh" w="40vw" sx={{ ...style }}>
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
          {name} Team
        </Title>
        <Group position="apart">
          {" "}
          {playerTeam("Codemaster")}
          <Divider orientation="vertical"></Divider>
          {playerTeam("Players")}
        </Group>
      </Stack>
    );
  };

  var currentUser = { name: "New", pfp: "Whale" };
  const playerArr = new Array();
  playerArr.push(currentUser);

  const playerTeam = (title: string) => {
    return (
      <Stack>
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
        >
          {title}
        </Title>
        {playerArr.map((user, index) => (
          <Group>
            {" "}
            <Tooltip label={user.name} key={index}>
              <Avatar key={user.name} radius="xl" size="sm" src={null}></Avatar>
            </Tooltip>
            <Text>{user.name}</Text>
          </Group>
        ))}
      </Stack>
    );
  };

  return (
    <Modal
      opened={menuOpen}
      onClose={close}
      fullScreen
      withCloseButton={false}
      closeOnClickOutside={false}
      closeOnEscape={false}
    >
      <Stack>
        <Title>Codenames</Title>
        <TextInput
          placeholder="Your name"
          label="Username"
          radius="md"
          size="md"
          withAsterisk
        />
        <Button
          size="lg"
          onClick={() => {
            setLobbyOpen(true);
            console.log(lobbyOpen);
          }}
        >
          Join Game
        </Button>

        {lobbyOpen ? lobbyScreen() : <div></div>}
      </Stack>
    </Modal>
  );
}
