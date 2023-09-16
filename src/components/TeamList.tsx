import { Avatar, Group, Stack, Title, Tooltip, Text } from "@mantine/core";
import { useGameProvider } from "../contexts/GameProvider";
import determinePfp from "./DeterminePfp";
import { useForceUpdate } from "@mantine/hooks";

interface Props {
  team: string;
  thisKey: number;
}
type User = {
  name: string;
  pfp: number;
};

export function TeamList({ team, thisKey }: Props) {
  const { redPlayers, bluePlayers, redCodemaster, blueCodemaster } =
    useGameProvider();

  const redStyle = {
    backgroundColor: "#f29292",
  };

  const blueStyle = {
    backgroundColor: "#aef5f5",
  };

  const lmao = thisKey;

  const textType = (input: string) => {
    return (
      <Title
        sx={{
          WebkitUserSelect: "none",
          WebkitTouchCallout: "none",
          MozUserSelect: "none",
          msUserSelect: "none",
          userSelect: "none",
          paddingTop: "5px",
        }}
        order={3}
        weight={100}
        align="center"
        fw={700}
        c={"dark"}
        tt="capitalize"
      >
        {input}
      </Title>
    );
  };

  //Codemaster or Player box
  const playerTeamDisplay = (set: Set<User>) => {
    var arrayVersion = Array.from(set);
    return (
      <Stack
        sx={{ paddingLeft: "25px", paddingTop: "2px", paddingBottom: "2px" }}
      >
        {arrayVersion.map((user, index) => (
          <Group key={index}>
            <Tooltip label={user.name}>
              <Avatar
                key={user.name}
                radius="xl"
                size="md"
                src={determinePfp(user.pfp)}
              ></Avatar>
            </Tooltip>
            <Text fw={700} weight={100} c="dark">
              {user.name}
            </Text>
          </Group>
        ))}
      </Stack>
    );
  };

  return (
    <Stack
      spacing={0}
      h="45vh"
      w="12vw"
      sx={{ ...(team === "Red" ? redStyle : blueStyle) }}
    >
      {textType("8")}
      {textType("Codemaster")}
      {team === "Red" && playerTeamDisplay(redCodemaster)}
      {team !== "Red" && playerTeamDisplay(blueCodemaster)}
      {textType("Players")}
      {team === "Red" && playerTeamDisplay(redPlayers)}
      {team !== "Red" && playerTeamDisplay(bluePlayers)}
    </Stack>
  );
}
