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
    redHint,
    blueHint,
    setRedHint,
    setBlueHint,
  } = useGameProvider();

  const redLength = redCards.size;
  const blueLength = blueCards.size;

  const displayLength = team === "Red" ? redLength : blueLength;

  const [value, setValue] = useState("");

  const storeValue = (value: string) => {
    setValue(value);
  };

  const submitHint = (team: string, hint: string) => {
    if (team === "Red") {
      setRedHint(hint);
      console.log("RED ", redHint);
      toggleTeam();
      setValue("");
    } else {
      setBlueHint(hint);
      console.log("BLUE ", blueHint);
      toggleTeam();
      setValue("");
    }
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
      <Button
        onClick={() => submitHint(team, value)}
        variant="light"
        color="gray"
        size="lg"
        uppercase
      >
        Submit{" "}
      </Button>
    </Group>
  );
}
