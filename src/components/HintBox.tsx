import { TextInput, Group, Title, Button, Tooltip } from "@mantine/core";
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

    redHintGuesses,
    blueHintGuesses,
    setRedHintGuesses,
    setBlueHintGuesses,
  } = useGameProvider();

  const redLength = redCards.size;
  const blueLength = blueCards.size;

  const displayLength = team === "Red" ? redLength : blueLength;

  const [value, setValue] = useState("");

  const storeValue = (value: string) => {
    setValue(value);
  };

  const currentHint = team === "Red" ? redHint : blueHint;

  const submitHint = (team: string, hint: string) => {
    if (team === "Red") {
      setRedHint(hint);
      console.log("RED ", redHint);
      toggleTurn();
      setValue("");
      setRedHintGuesses(redLength);
    } else {
      setBlueHint(hint);
      console.log("BLUE ", hint);
      toggleTurn();
      setValue("");
      setBlueHintGuesses(blueLength);
    }
  };

  const submitBox = () => {
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
        {value === "" ? (
          <Tooltip label="Enter a hint">
            <Button
              variant="light"
              color="gray"
              size="lg"
              uppercase
              data-disabled
              sx={{ "&[data-disabled]": { pointerEvents: "all" } }}
              onClick={(event) => event.preventDefault()}
            >
              Submit
            </Button>
          </Tooltip>
        ) : (
          <Button
            onClick={() => submitHint(team, value)}
            variant="light"
            color="gray"
            size="lg"
            uppercase
          >
            Submit{" "}
          </Button>
        )}
      </Group>
    );
  };

  const displayBox = () => {
    return (
      <Group align="center">
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
          transform="uppercase"
        >
          {currentHint}
        </Title>
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
          transform="uppercase"
        >
          {team === "Red" ? redHintGuesses : blueHintGuesses}
        </Title>
      </Group>
    );
  };

  return <div>{turn === "Codemaster" ? submitBox() : displayBox()}</div>;
}
