import * as React from "react";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import { deepOrange, deepPurple } from "@mui/material/colors";

interface Props {
  users: { name: string; pfp: string }[];
}

export default function PlayerList({ users }: Props) {
  return (
    <AvatarGroup>
      {users.map((user) => (
        <Avatar key={user.name} sx={{ bgcolor: deepOrange[500] }}>
          {user.name}
        </Avatar>
      ))}
    </AvatarGroup>
  );
}
