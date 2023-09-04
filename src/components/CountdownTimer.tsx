import Countdown from "react-countdown";
import { useGameProvider } from "../contexts/GameProvider";
import { Group, Title } from "@mantine/core";

export default function CountdownTimer() {
  const { timerValue } = useGameProvider();

  // Random component
  const Completionist = () => <span>You are good to go!</span>;

  // Renderer callback with condition
  // @ts-ignore
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <Group
          spacing={0}
          sx={{
            backgroundColor: "silver",
            borderRadius: "5px",
            border: "10px",
            // margin: "15px",
          }}
        >
          <Title
            sx={{
              WebkitUserSelect: "none",
              WebkitTouchCallout: "none",
              MozUserSelect: "none",
              msUserSelect: "none",
              userSelect: "none",
              paddingLeft: "10px",
              paddingRight: "10px",
              paddingTop: "5px",
              paddingBottom: "5px",
            }}
            order={1}
            weight={100}
            align="center"
            fw={700}
            c="dark"
          >
            {minutes}:{seconds}
          </Title>
        </Group>
      );
    }
  };

  return (
    <Countdown key={timerValue} date={Date.now() + 30000} renderer={renderer} />
  );
}
