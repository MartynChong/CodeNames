import { SimpleGrid } from "@mantine/core";
import WordCard from "./WordCard";
import { useGameProvider } from "../contexts/GameProvider";

export function WordGrid() {
  const { text } = useGameProvider();

  return (
    <SimpleGrid cols={5} verticalSpacing="xl">
      {text.map((word, index) => (
        <WordCard key={index} cardNumber={index}>
          {word}
        </WordCard>
      ))}
    </SimpleGrid>
  );
}
