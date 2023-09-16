import { SimpleGrid, Title, Text, Stack } from "@mantine/core";
import WordCard from "./WordCard";
import { useGameProvider } from "../contexts/GameProvider";

export function TitleHeader() {
  const { turn, team } = useGameProvider();

  const teamColor = team === "red" ? "red" : "dodgerblue";

  const turnText = () => {
    return (
      <Title>
        <Text span tt="capitalize" c={teamColor}>
          {team}
        </Text>{" "}
        {playersVoting}
      </Title>
    );
  };

  const playersVoting = "Players are voting";

  const codemasterHinting = "Codemaster is selecting a new Hint";

  const smallText = () => {
    return <Title order={3}>{waiting}</Title>;
  };

  const waiting = "Waiting...";

  return (
    <Stack align="center" sx={{ paddingBottom: "10px" }}>
      {turnText()} {smallText()}
    </Stack>
  );
}
