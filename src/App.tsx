import { useState } from "react";
import "./App.css";
import { nouns } from "./resources/nouns";
import { Container, MantineProvider, Space, RemoveScroll } from "@mantine/core";
import { WordGrid } from "./components/WordGrid";
import { Modal, Stack, Button } from "@mantine/core";
import { CountdownTimer } from "./components/CountdownTimer";
import { useDisclosure } from "@mantine/hooks";
import VoteWheel from "./components/VoteWheel";

import HintBox from "./components/HintBox";

import "./resources/countstyle.css";
import GameProvider from "./contexts/GameProvider";

function App() {
  let players = [
    { name: "Dog", pfp: "Undefined" },
    { name: "Man", pfp: "Man" },
  ];
  console.log(players.length);
  const text = new Array<string>();

  for (let i = 0; i < 20; i++) {
    text.push(nouns[Math.floor(Math.random() * nouns.length)]);
  }

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
            <CountdownTimer duration={10}></CountdownTimer>
            <WordGrid words={text}></WordGrid>
            <HintBox></HintBox>
            <Modal
              opened={opened}
              onClose={close}
              centered
              size="auto"
              fullScreen
            >
              <Container h="60vh" w="35vw">
                <VoteWheel></VoteWheel>
              </Container>
              ;
            </Modal>
            <Button onClick={open}>Open centered Modal</Button>
          </Stack>
        </div>
      </GameProvider>
    </MantineProvider>
  );
}

export default App;
