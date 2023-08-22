import { useState } from "react";
import "./App.css";
import Card from "./components/Card";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { nouns } from "./resources/nouns";
import PlayerList from "./components/PlayerList";

function App() {
  const [count, setCount] = useState(0);

  let players = [
    { name: "Dog", pfp: "Undefined" },
    { name: "Man", pfp: "Man" },
  ];
  console.log(players.length);
  var text = nouns[Math.floor(Math.random() * nouns.length)];

  return (
    <div>
      {" "}
      //{" "}
      <Card turn="Spymaster" users={players}>
        {text}
      </Card>
    </div>
  );
}

export default App;
