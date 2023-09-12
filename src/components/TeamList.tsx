import { Group, Stack, Title } from "@mantine/core";
import { useGameProvider } from "../contexts/GameProvider";

export function WordGrid() {
  const { redPlayers, bluePlayers, redCodemaster, blueCodemaster } =
    useGameProvider();

  return (
    <Stack
      spacing={0}
      sx={{
        backgroundColor: "red",
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
          {/* {numberInput} */}
        </Title>
      </Group>
    </Stack>
  );
}
