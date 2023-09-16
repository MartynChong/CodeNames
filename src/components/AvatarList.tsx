import { Avatar, Tooltip } from "@mantine/core";
import { useGameProvider } from "../contexts/GameProvider";
import determinePfp from "./DeterminePfp";

interface Props {
  cardNumber: number;
}

export default function AvatarList({ cardNumber }: Props) {
  const { playerSelections, confirmation } = useGameProvider();

  const newArr = playerSelections[cardNumber];

  const highlightStyle = {
    outlineStyle: "solid",
    outlineColor: "green",
    outlineWidth: "4px",
    borderWidth: "0px",
  };

  const noStyle = {
    borderWidth: "0px",
  };

  return (
    <Tooltip.Group openDelay={300} closeDelay={100}>
      <Avatar.Group spacing="sm">
        {newArr.map((user, index) => (
          <Tooltip label={user.name} key={index}>
            <Avatar
              key={user.name}
              size={30}
              radius={60}
              src={determinePfp(user.pfp)}
              sx={{ ...(confirmation ? highlightStyle : noStyle) }}
            ></Avatar>
          </Tooltip>
        ))}
      </Avatar.Group>
    </Tooltip.Group>
  );
}
