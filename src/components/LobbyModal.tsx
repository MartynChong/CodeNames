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
import determinePfp from "./DeterminePfp";
type User = {
  name: string;
  pfp: number;
  voted: boolean;
};

interface Props {
  setKey: (num: number) => void;
}

export function LobbyModal({ setKey }: Props) {
  const {
    userID,
    setUsername,
    setPfp,
    redCodemaster,
    blueCodemaster,
    redPlayers,
    bluePlayers,
    setBluePlayers,
    setRedPlayers,
    setRedCodemaster,
    setBlueCodemaster,
  } = useGameProvider();

  const [menuOpen, { open, close }] = useDisclosure(true);
  const [lobbyOpen, setLobbyOpen] = useState(false);

  const [gameJoined, setGameJoined] = useState(false);

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
        var replaceTeam = blueCodemaster;
        setBlueCodemaster(replaceTeam);
        break;
      case 2:
        setCurrentTeam(newTeam);
        bluePlayers.delete(userID);
        var replaceTeam = bluePlayers;
        setBluePlayers(replaceTeam);
        break;
      case 3:
        setCurrentTeam(newTeam);
        redCodemaster.delete(userID);
        var replaceTeam = redCodemaster;
        setRedCodemaster(replaceTeam);
        break;
      case 4:
        setCurrentTeam(newTeam);
        redPlayers.delete(userID);
        var replaceTeam = redPlayers;
        setRedPlayers(replaceTeam);
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
      <Stack align="center">
        <Group align="center">
          {teamMenu("Blue", blueStyle, 1, blueCodemaster, bluePlayers)}{" "}
          {teamMenu("Red", redStyle, 3, redCodemaster, redPlayers)}
        </Group>
        <Group align="center">
          <Button
            onClick={() => {
              console.log("Red Codemaster", redCodemaster);
              console.log("Blue Codemaster", blueCodemaster);
              console.log("Red Team", redPlayers);
              console.log("Blue Team", bluePlayers);
              setKey(1);
              close();
            }}
          >
            Start Game
          </Button>
        </Group>
      </Stack>
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
              <Avatar
                key={user.name}
                radius="xl"
                size="lg"
                src={determinePfp(user.pfp)}
              ></Avatar>
            </Tooltip>
            <Text fw={700} weight={100} c="dark">
              {user.name}
            </Text>
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

  const [pfpSelect, setPfpSelect] = useState<number>(-1);

  const highlightStyle = {
    outlineStyle: "solid",
    outlineColor: "green",
    outlineWidth: "6px",
  };

  const noStyle = {};

  const pfpSelection = () => {
    var radNum = 70;
    var size = 150;
    return (
      <Group position="center">
        <Avatar
          size={size}
          radius={radNum}
          src="src\resources\pfps\spongebob.png"
          onClick={() => {
            setPfpSelect(0);
          }}
          sx={{ ...(pfpSelect === 0 ? highlightStyle : noStyle) }}
        ></Avatar>
        <Avatar
          size={size}
          radius={radNum}
          src="src\resources\pfps\squidward.jpg"
          onClick={() => {
            setPfpSelect(1);
          }}
          sx={{ ...(pfpSelect === 1 ? highlightStyle : noStyle) }}
        ></Avatar>
        <Avatar
          radius={radNum}
          size={size}
          src="src\resources\pfps\gary.jpg"
          onClick={() => {
            setPfpSelect(2);
          }}
          sx={{ ...(pfpSelect === 2 ? highlightStyle : noStyle) }}
        ></Avatar>
        <Avatar
          radius={radNum}
          size={size}
          src="src\resources\pfps\patrick.jpg"
          onClick={() => {
            setPfpSelect(3);
          }}
          sx={{ ...(pfpSelect === 3 ? highlightStyle : noStyle) }}
        ></Avatar>
        <Avatar
          radius={radNum}
          size={size}
          src="src\resources\pfps\plankton.jpg"
          onClick={() => {
            setPfpSelect(4);
          }}
          sx={{ ...(pfpSelect === 4 ? highlightStyle : noStyle) }}
        ></Avatar>
        <Avatar
          radius={radNum}
          size={size}
          src="src\resources\pfps\sandy.jpg"
          onClick={() => {
            setPfpSelect(5);
          }}
          sx={{ ...(pfpSelect === 5 ? highlightStyle : noStyle) }}
        ></Avatar>
        <Avatar
          radius={radNum}
          size={size}
          src="src\resources\pfps\mrspuff.jpg"
          onClick={() => {
            setPfpSelect(6);
          }}
          sx={{ ...(pfpSelect === 6 ? highlightStyle : noStyle) }}
        ></Avatar>
        <Avatar
          radius={radNum}
          size={size}
          src="src\resources\pfps\mrkrabs.jpg"
          onClick={() => {
            setPfpSelect(7);
          }}
          sx={{ ...(pfpSelect === 7 ? highlightStyle : noStyle) }}
        ></Avatar>
      </Group>
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
      <Stack align="center">
        <Title>Codenames</Title>
        <Text weight={300} fw={500}>
          {" "}
          Username
        </Text>
        <TextInput
          placeholder="Your name"
          value={usernameValue}
          onChange={(event) => setUsernameValue(event.currentTarget.value)}
          radius="md"
          size="md"
          withAsterisk
        />
        <Text weight={300} fw={500}>
          Select an Avatar
        </Text>
        {pfpSelection()}
        {usernameValue != "" && pfpSelect != -1 && gameJoined != true ? (
          <Group>
            <Button
              size="lg"
              uppercase
              color="green"
              onClick={() => {
                setLobbyOpen(true);
                setUsername(usernameValue);
                setPfp(pfpSelect);
                setGameJoined(true);
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
