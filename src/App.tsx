import { useState } from "react";
import "./App.css";
// import "@fontsource/roboto/300.css";
// import "@fontsource/roboto/400.css";
// import "@fontsource/roboto/500.css";
// import "@fontsource/roboto/700.css";
import { nouns } from "./resources/nouns";
import { Group, MantineProvider } from "@mantine/core";
import WordCard from "./components/WordCard";

function App() {
  const [count, setCount] = useState(0);

  let players = [
    { name: "Dog", pfp: "Undefined" },
    { name: "Man", pfp: "Man" },
  ];
  console.log(players.length);
  var text = nouns[Math.floor(Math.random() * nouns.length)];

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{ colorScheme: "dark" }}
    >
      <div>
        {" "}
        {/* <Card turn="Spymaster" users={players}> */}
        <Group
          align="center"
          mx="xl"
          mt="md"
          sx={{ justifyContent: "space-between" }}
        >
          <WordCard>{text}</WordCard>
          <WordCard>{text}</WordCard>
          <WordCard>{text}</WordCard>
          <WordCard>{text}</WordCard>
          <WordCard>{text}</WordCard>
        </Group>
      </div>
    </MantineProvider>
  );
}

export default App;
