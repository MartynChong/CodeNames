import { TextInput, Group, Title } from "@mantine/core";
import { useGameProvider } from "../contexts/GameProvider";

export default function HintBox() {
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

  const redLength = redCards.size;
  const blueLength = blueCards.size;

  const displayLength = team === "Red" ? redLength : blueLength;

  console.log("CURRENT TEAM", team);

  return (
    <Group align="center">
      <TextInput placeholder="Type your clue here" radius="xs" size="xl" />
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
        c="light"
      >
        {displayLength}
      </Title>
    </Group>
  );
}
