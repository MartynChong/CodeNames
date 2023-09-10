import {
  Avatar,
  Button,
  Divider,
  Group,
  Modal,
  ScrollArea,
  Stack,
  Text,
  TextInput,
  Title,
  Tooltip,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { useGameProvider } from "../contexts/GameProvider";

type User = {
  name: string;
  pfp: number;
};

export function LobbyModal() {
  const {
    userID,
    setUsername,
    setPfp,
    redCodemaster,
    blueCodemaster,
    redPlayers,
    bluePlayers,
  } = useGameProvider();

  const [menuOpen, { open, close }] = useDisclosure(true);
  const [lobbyOpen, setLobbyOpen] = useState(false);

  //Team 1 is blue codemaster, team 2 is blue players, team 3 is red codemaster, team 4 is red players
  const [currentTeam, setCurrentTeam] = useState<number>(0);

  const changeTeam = (newTeam: number) => {
    switch (currentTeam) {
      case 0:
        setCurrentTeam(newTeam);
        break;
      case 1:
        setCurrentTeam(newTeam);
        blueCodemaster.delete(userID);
        break;
      case 2:
        setCurrentTeam(newTeam);
        bluePlayers.delete(userID);
        break;
      case 3:
        setCurrentTeam(newTeam);
        redCodemaster.delete(userID);
        break;
      case 4:
        setCurrentTeam(newTeam);
        redPlayers.delete(userID);
        break;
    }
  };

  const redStyle = {
    backgroundColor: "#f29292",
  };

  const blueStyle = {
    backgroundColor: "#aef5f5",
  };

  const lobbyScreen = () => {
    return (
      <Group align="center">
        {teamMenu("Blue", blueStyle, 1, blueCodemaster, bluePlayers)}{" "}
        {teamMenu("Red", redStyle, 3, redCodemaster, redPlayers)}
      </Group>
    );
  };

  const teamMenu = (
    name: string,
    style: object,
    teamNum: number,
    codemasterSet: Set<User>,
    playerSet: Set<User>
  ) => {
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
          {playerTeamDisplay("Codemaster", teamNum, codemasterSet, 1)}
          <Divider orientation="vertical"></Divider>
          {playerTeamDisplay("Players", teamNum + 1, playerSet, 4)}
        </Group>
      </Stack>
    );
  };

  //Codemaster or Player box
  const playerTeamDisplay = (
    title: string,
    ind: number,
    set: Set<User>,
    numOfPlayers: number
  ) => {
    console.log("REPRINT");
    var arrayVersion = Array.from(set);
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
        {arrayVersion.map((user, index) => (
          <Group key={index}>
            <Tooltip label={user.name}>
              <Avatar key={user.name} radius="xl" size="sm" src={null}></Avatar>
            </Tooltip>
            <Text>{user.name}</Text>
          </Group>
        ))}
        {currentTeam != ind && arrayVersion.length < numOfPlayers && (
          <Group>
            <Button
              color="lime"
              size="md"
              uppercase
              onClick={() => {
                changeTeam(ind);
                set.add(userID);
                console.log(
                  "Current Arr",
                  redCodemaster,
                  blueCodemaster,
                  bluePlayers,
                  redPlayers
                );
              }}
            >
              JOIN
            </Button>
          </Group>
        )}
      </Stack>
    );
  };

  const [usernameValue, setUsernameValue] = useState("");

  const pfpSelection = () => {
    var sizeNum = 100;
    var radNum = 60;
    return (
      <ScrollArea w="90vw" h="15vh">
        <Group>
          <Avatar
            size={sizeNum}
            radius={radNum}
            src="src\resources\pfps\spongebob.png"
          ></Avatar>
          <Avatar
            size={sizeNum}
            radius={radNum}
            src="src\resources\pfps\squidward.jpg"
          ></Avatar>
          <Avatar
            size={sizeNum}
            radius={radNum}
            src="src\resources\pfps\gary.jpg"
          ></Avatar>
          <Avatar
            size={sizeNum}
            radius={radNum}
            src="src\resources\pfps\patrick.jpg"
          ></Avatar>
          <Avatar
            size={sizeNum}
            radius={radNum}
            src="src\resources\pfps\plankton.jpg"
          ></Avatar>
          <Avatar
            size={sizeNum}
            radius={radNum}
            src="src\resources\pfps\sandy.jpg"
          ></Avatar>
          <Avatar
            size={sizeNum}
            radius={radNum}
            src="src\resources\pfps\mrspuff.jpg"
          ></Avatar>
          <Avatar
            size={sizeNum}
            radius={radNum}
            src="src\resources\pfps\mrkrabs.jpg"
          ></Avatar>
        </Group>
      </ScrollArea>
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
          value={usernameValue}
          onChange={(event) => setUsernameValue(event.currentTarget.value)}
          radius="md"
          size="md"
          withAsterisk
        />
        {pfpSelection()}
        {usernameValue != "" ? (
          <Group>
            <Button
              size="lg"
              uppercase
              color="green"
              onClick={() => {
                setLobbyOpen(true);
                setUsername(usernameValue);
                console.log("Current User ", userID);
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
