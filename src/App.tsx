import { useState } from "react";
import "./App.css";
import { nouns } from "./resources/nouns";
import { Group, MantineProvider, Space } from "@mantine/core";
import WordCard from "./components/WordCard";
// import GameProvider from "./contexts/GameProvider";
import { WordGrid } from "./components/WordGrid";
import { Stack } from "@mantine/core";
import { CountdownTimer } from "./components/CountdownTimer";
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
          </Stack>
        </div>
      </GameProvider>
    </MantineProvider>
  );
}

export default App;
