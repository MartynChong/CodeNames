import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";
import { CardActionArea } from "@mui/material";
import Divider from "@mui/material/Divider";
import PlayerList from "./PlayerList";

//Card States:
//Blue/Red Master's turn: Select cards for this round - Sees red and blue cards
//Voter's turn: Vote for card

interface Props {
  children: string;
  turn: "Spymaster" | "Voter";
  users: { name: string; pfp: string }[];
}

export default function MediaCard({ children, turn, users }: Props) {
  return (
    <Card
      style={
        turn === "Spymaster"
          ? { backgroundColor: "blue" }
          : { backgroundColor: "green" }
      }
      //   sx={{ maxWidth: 300 }}
    >
      <CardActionArea>
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
              component="span"
              display="flex"
              flexDirection="row"
              justifyContent="flex-end"
              alignItems="flex-end"
            >
              <PlayerList users={users}></PlayerList>;
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
