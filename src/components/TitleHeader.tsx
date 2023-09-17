import { SimpleGrid, Title, Text, Stack } from "@mantine/core";
import WordCard from "./WordCard";
import { useGameProvider } from "../contexts/GameProvider";

var oppositeTeam = "Red";

export function TitleHeader() {
  const { turn, team, displayNumber } = useGameProvider();

  const teamColor = team === "Red" ? "red" : "dodgerblue";

  const oppTeam = team === "Red" ? "Blue" : "Red";

  const oppColor = oppTeam === "Red" ? "red" : "dodgerblue";

  const turnText = () => {
    return (
      <Title>
        <Text span tt="capitalize" c={teamColor}>
          {team}
        </Text>{" "}
        {displayTurn()}
      </Title>
    );
  };
  const playersVoting = "Players are voting";

  const codemasterHinting = "Codemaster is selecting a new Hint";

  const displayTurn = () => {
    switch (turn) {
      case "Codemaster":
        return codemasterHinting;
        break;
      case "Players":
        return playersVoting;
        break;
    }
  };

  const smallText = () => {
    return (
      <Title order={3}>
        {" "}
        {displayNumber != 0 && (
          <Text
            span
            tt="capitalize"
            c={displayNumber === 1 ? teamColor : oppColor}
          >
            {displayNumber === 1 ? team : oppTeam} team{" "}
          </Text>
        )}
        {displayStatus()}
      </Title>
    );
  };
  //Display 1
  const waiting = "Waiting...";
  //Display 2
  const wordRight = "has guessed the right word! They get another turn.";
  //Display 3
  const wordWrong = "has guessed the wrong word! Switching teams.";

  console.log("HERE IS THE NUMBER", displayNumber);

  const displayStatus = () => {
    switch (displayNumber) {
      case 0:
        console.log("returning wait");
        return waiting;
        break;
      case 1:
        console.log("returning right");

        return wordRight;
        break;
      case 2:
        console.log("returning wrong");

        return wordWrong;
        break;
    }
  };

  return (
    <Stack align="center" sx={{ paddingBottom: "10px" }}>
      {turnText()} {smallText()}
    </Stack>
  );
}
