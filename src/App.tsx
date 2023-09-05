import { useState } from "react";
import "./App.css";
import { nouns } from "./resources/nouns";
import {
  Container,
  MantineProvider,
  Space,
  RemoveScroll,
  Box,
} from "@mantine/core";
import { WordGrid } from "./components/WordGrid";
import { Modal, Stack, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import VoteWheel from "./components/VoteWheel";

import HintBox from "./components/HintBox";

import "./resources/countstyle.css";
import GameProvider from "./contexts/GameProvider";
// import TestCard from "./components/TestCard";

function App() {
  let players = [
    { name: "Dog", pfp: "Undefined" },
    { name: "Man", pfp: "Man" },
  ];
  console.log(players.length);

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{ colorScheme: "dark" }}
    >
      <GameProvider>
        <div>
          <Stack align="center">
            <Space h="md" />
            {/* <TestCard></TestCard> */}
            <WordGrid></WordGrid>
            <HintBox></HintBox>
            <Modal opened={opened} onClose={close} centered size="auto">
              <Stack align="center" sx={{ overflow: "hidden" }}>
                <VoteWheel></VoteWheel>
              </Stack>
            </Modal>
            <Button onClick={open}>Open centered Modal</Button>
          </Stack>
        </div>
      </GameProvider>
    </MantineProvider>
  );
}

export default App;
