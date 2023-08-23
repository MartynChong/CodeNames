import * as React from "react";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import { deepOrange, deepPurple } from "@mui/material/colors";
import Tooltip from "@mui/material/Tooltip";

interface Props {
  users: { name: string; pfp: string }[];
}

export default function PlayerList({ users }: Props) {
  return (
    <AvatarGroup max={6}>
      {users.map((user) => (
        <Tooltip title={user.name} key={user.name}>
          <Avatar key={user.name} sx={{ bgcolor: deepOrange[500] }}>
            {user.name}
          </Avatar>
        </Tooltip>
      ))}
    </AvatarGroup>
  );
}
