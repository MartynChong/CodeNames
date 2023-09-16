import { Avatar, Group, Stack, Title, Tooltip, Text } from "@mantine/core";
import { useGameProvider } from "../contexts/GameProvider";
import determinePfp from "./DeterminePfp";

interface Props {
  team: string;
}
type User = {
  name: string;
  pfp: number;
};

export function TeamList({ team }: Props) {
  const { redPlayers, bluePlayers, redCodemaster, blueCodemaster } =
    useGameProvider();

  const redStyle = {
    backgroundColor: "#f29292",
  };

  const blueStyle = {
    backgroundColor: "#aef5f5",
  };

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
      // <Group h="30vh" w="22vw" sx={{ padding: "20px" }}>
      <Group sx={{ paddingLeft: "8px" }}>
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
      </Group>
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
      {playerTeamDisplay(redCodemaster)}
      {textType("Players")}
      {playerTeamDisplay(redPlayers)}
    </Stack>
  );
}
