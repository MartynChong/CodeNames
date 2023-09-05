import {
  TextInput,
  Group,
  Title,
  Button,
  Tooltip,
  ActionIcon,
  NumberInputHandlers,
  NumberInput,
  rem,
} from "@mantine/core";
import { useGameProvider } from "../contexts/GameProvider";
import { useState, useRef } from "react";

export default function HintBox() {
  const {
    turn,
    toggleTurn,
    team,
    redCards,
    blueCards,

    redHint,
    blueHint,
    setRedHint,
    setBlueHint,

    countValue,
    setCountValue,

    redWords,
    blueWords,

    confirmation,
  } = useGameProvider();

  const redLength = redCards.size;
  const blueLength = blueCards.size;

  const [value, setValue] = useState("");

  const storeValue = (value: string) => {
    setValue(value);
  };

  const currentHint = team === "Red" ? redHint : blueHint;

  const arrowKeys = () => {
    return (
      <Button.Group orientation="vertical">
        <Button
          variant="light"
          sx={{
            backgroundColor: "silver",
            "&[data-disabled]": { opacity: 0.4 },
          }}
          color="gray"
          size="xs"
          radius="xs"
          onClick={() => setCountValue(countValue + 1)}
          disabled={
            team === "Red"
              ? redWords.size <= countValue
              : blueWords.size <= countValue
          }
        >
          +
        </Button>

        <Button
          variant="light"
          sx={{ backgroundColor: "silver" }}
          color="gray"
          size="xs"
          radius="xs"
          onClick={() => setCountValue(countValue - 1)}
          disabled={countValue < 1}
        >
          -
        </Button>
      </Button.Group>
    );
  };

  //Box contains the number display and arrow keys
  const numberBox = (numberInput: number) => {
    return (
      <Group
        spacing={0}
        sx={{
          backgroundColor: "silver",
          borderRadius: "5px",
          // margin: "15px",
        }}
      >
        <Group position="center">
          <Title
            sx={{
              WebkitUserSelect: "none",
              WebkitTouchCallout: "none",
              MozUserSelect: "none",
              msUserSelect: "none",
              userSelect: "none",
              paddingLeft: "15px",
              paddingRight: "15px",
            }}
            order={1}
            weight={100}
            align="center"
            fw={700}
            c="dark"
          >
            {numberInput}
          </Title>
        </Group>
        {turn === "Codemaster" && arrowKeys()}
      </Group>
    );
  };

  const submitHint = (team: string, hint: string) => {
    if (team === "Red") {
      setRedHint(hint);
      console.log(countValue, " COUNT");
      toggleTurn();
      setValue("");
    } else {
      setBlueHint(hint);
      console.log(countValue, " COUNT");
      toggleTurn();
      setValue("");
    }
  };

  //HintBar that displays when cardmaster's turn
  const submitBox = () => {
    return (
      <Group position="apart">
        <TextInput
          value={value}
          onChange={(event) => storeValue(event.currentTarget.value)}
          placeholder="Type your clue here"
          radius="xs"
          size="xl"
        />
        {numberBox(countValue)}

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
            Submit
          </Button>
        )}
      </Group>
    );
  };

  //Hintbar that displays when player's turn
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
        {numberBox(countValue)}
        {confirmation === false ? (
          <Tooltip label="Select an option">
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
            // onClick={() => submitHint(team, value)}
            variant="light"
            color="gray"
            size="lg"
            uppercase
          >
            Submit
          </Button>
        )}
      </Group>
    );
  };

  return <div>{turn === "Codemaster" ? submitBox() : displayBox()}</div>;
}
