import { useState, useRef } from "react";
import {
  NumberInput,
  Group,
  ActionIcon,
  NumberInputHandlers,
  rem,
} from "@mantine/core";

function Demo() {
  const [value, setValue] = useState<number | "">(0);
  const [numberValue, setNumberValue] = useState<number>(0);

  return (
    <Group spacing={5}>
      <ActionIcon
        size={42}
        variant="default"
        onClick={() => setNumberValue(numberValue - 1)}
      >
        –
      </ActionIcon>

      <NumberInput
        hideControls
        value={value}
        onChange={(val) => setValue(val)}
        max={10}
        min={0}
        step={2}
        styles={{ input: { width: rem(54), textAlign: "center" } }}
      >
        {numberValue}
      </NumberInput>

      <ActionIcon
        size={42}
        variant="default"
        onClick={() => setNumberValue(numberValue + 1)}
      >
        +
      </ActionIcon>
    </Group>
  );
}
