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

  const [currentTeam, setCurrentTeam] = useState<number>(0);

  const redStyle = {
    backgroundColor: "#f29292",
  };

  const blueStyle = {
    backgroundColor: "#aef5f5",
  };

  const lobbyScreen = () => {
    return (
      <Group align="center">
        {teamMenu("Blue", blueStyle, 1)} {teamMenu("Red", redStyle, 3)}
      </Group>
    );
  };

  const teamMenu = (name: string, style: object, teamNum: number) => {
    return (
      <Stack h="40vh" w="48vw" sx={{ ...style }}>
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
        <Group position="center">
          {" "}
          {playerTeam("Codemaster", teamNum)}
          <Divider orientation="vertical"></Divider>
          {playerTeam("Players", teamNum + 1)}
        </Group>
      </Stack>
    );
  };

  var currentUser = { name: "New", pfp: "Whale" };
  const playerArr = new Array();
  playerArr.push(currentUser);

  //Codemaster or Player box
  const playerTeam = (title: string, ind: number) => {
    return (
      <Stack h="30vh" w="22vw" sx={{ padding: "20px" }}>
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
            <Tooltip label={user.name} key={index}>
              <Avatar key={user.name} radius="xl" size="sm" src={null}></Avatar>
            </Tooltip>
            <Text>{user.name}</Text>
          </Group>
        ))}
        {currentTeam != ind && (
          <Group>
            <Button
              color="lime"
              size="md"
              uppercase
              onClick={() => setCurrentTeam(ind)}
            >
              {" "}
              JOIN
            </Button>
          </Group>
        )}
      </Stack>
    );
  };

  const [value, setValue] = useState("");

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
          value={value}
          onChange={(event) => setValue(event.currentTarget.value)}
          radius="md"
          size="md"
          withAsterisk
        />
        {value != "" ? (
          <Group>
            <Button
              size="lg"
              uppercase
              color="green"
              onClick={() => {
                setLobbyOpen(true);
                console.log(lobbyOpen);
              }}
            >
              Join Game
            </Button>
          </Group>
        ) : (
          <Group>
            <Button
              size="lg"
              uppercase
              data-disabled
              sx={{ "&[data-disabled]": { pointerEvents: "all" } }}
              onClick={(event) => event.preventDefault()}
            >
              Join Game
            </Button>
          </Group>
        )}

        {lobbyOpen ? lobbyScreen() : <div></div>}
      </Stack>
    </Modal>
  );
}
