import { Avatar, Tooltip } from "@mantine/core";

interface Props {
  users: { name: string; pfp: string }[];
}

export default function AvatarList({ users }: Props) {
  return (
    <Tooltip.Group openDelay={300} closeDelay={100}>
      <Avatar.Group spacing="sm">
        {users.map((user) => (
          <Tooltip label={user.name} key={user.name}>
            <Avatar key={user.name} radius="xl" size="sm" src={null}></Avatar>
          </Tooltip>
        ))}
      </Avatar.Group>
    </Tooltip.Group>
  );
}
