import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { CardActionArea } from "@mui/material";
import Divider from "@mui/material/Divider";
import PlayerList from "./PlayerList";
import { useState } from "react";

//Card States:
//Blue/Red Master's turn: Select cards for this round - Sees red and blue cards
//Voter's turn: Vote for card

interface Props {
  children: string;
  turn: "Spymaster" | "Voter";
  users: { name: string; pfp: string }[];
}

type User = {
  name: string;
  pfp: string;
};

export default function MediaCard({ children, turn, users }: Props) {
  var currentUser = { name: "New", pfp: "Male" };

  let currentList: { name: string; pfp: string }[] = [];

  const [currentUsers, setCurrentUsers] = useState(currentList);
  const [randomName, setRandomName] = useState("a");

  const addUserToCurrentUsers = (currentUser: User) => {
    // Check if user is already in list
    if (currentUsers.map((u) => u.name).includes(currentUser.name)) return;
    setCurrentUsers([...currentUsers, currentUser]);

    // Add mr random name to the list
    setCurrentUsers([...currentUsers, { name: randomName, pfp: "Male" }]);
    setRandomName(randomName + "a");
  };

  return (
    <Card
      style={
        turn === "Spymaster"
          ? { backgroundColor: "blue" }
          : { backgroundColor: "green" }
      }
      sx={{ maxWidth: 300 }}
    >
      <CardActionArea
        onClick={() => {
          addUserToCurrentUsers(currentUser);
        }}
      >
        <CardContent>
          <Box
            // width={300}
            // height={800}
            // marginTop={200}
            component="span"
            //   display="flex"
            //   flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Box
              component="span"
              display="flex"
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
            >
              <Typography
                gutterBottom
                fontWeight="450"
                variant="h2"
                component="div"
                color="whitesmoke"
              >
                {children}
              </Typography>
            </Box>{" "}
            <Divider
              variant="middle"
              sx={{ borderBottomWidth: 3, bgcolor: "white" }}
            />
            <Box
              minHeight={50}
              component="span"
              display="flex"
              flexDirection="row"
              justifyContent="flex-end"
              alignItems="flex-end"
            >
              <PlayerList users={currentUsers} />
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
