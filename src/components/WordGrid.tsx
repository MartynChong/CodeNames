import { SimpleGrid } from "@mantine/core";
import WordCard from "./WordCard";

type Props = {
  words: string[];
};

export const WordGrid = ({ words }: Props) => {
  return (
    <SimpleGrid cols={5} verticalSpacing="xl">
      {words.map((word, index) => (
        <WordCard key={index} cardNumber={index}>
          {word}
        </WordCard>
      ))}
    </SimpleGrid>
  );
};
