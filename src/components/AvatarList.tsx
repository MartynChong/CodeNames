import { Avatar, Tooltip } from "@mantine/core";
import { useGameProvider } from "../contexts/GameProvider";

interface Props {
  cardNumber: number;
}

export default function AvatarList({ cardNumber }: Props) {
  const { playerSelections } = useGameProvider();

  const newArr = playerSelections[cardNumber];

  return (
    <Tooltip.Group openDelay={300} closeDelay={100}>
      <Avatar.Group spacing="sm">
        {newArr.map((user, index) => (
          <Tooltip label={user.name} key={index}>
            <Avatar key={user.name} radius="xl" size="sm" src={null}></Avatar>
          </Tooltip>
        ))}
      </Avatar.Group>
    </Tooltip.Group>
  );
}
