import { TextInput, Group, Title, Button } from "@mantine/core";
import { useGameProvider } from "../contexts/GameProvider";
import { useState } from "react";

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

  const [value, setValue] = useState("");

  const storeValue = (value: string) => {
    setValue(value);
    console.log(value);
  };

  return (
    <Group align="center">
      <TextInput
        value={value}
        onChange={(event) => storeValue(event.currentTarget.value)}
        placeholder="Type your clue here"
        radius="xs"
        size="xl"
      />
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
      <Button variant="light" color="gray" size="lg" uppercase>
        Submit{" "}
      </Button>
    </Group>
  );
}
