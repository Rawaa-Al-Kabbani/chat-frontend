import { Alert, Button, Container, Grid2, Paper, styled } from "@mui/material";
import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { findRooms } from "../api/room";
import { FindRoomsQuery, Room } from "../graphql/graphql";
import { getErrorMessages } from "../utils";
import RoomCard from "./RoomCard";

const StyledCardContainer = styled(Grid2)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
}));

const Rooms: FunctionComponent = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<FindRoomsQuery["rooms"]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const fetchRooms = async () => {
    setErrorMessage("");
    try {
      setRooms(await findRooms());
    } catch (error) {
      setErrorMessage(getErrorMessages(error));
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <Container
      maxWidth={false}
      sx={{
        width: { xs: `calc(100% - 32px)`, md: 900 },
        padding: { xs: 0, md: 2 },
      }}
    >
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      <Paper elevation={1} sx={{ padding: 2 }}>
        <Grid2 container size={12} spacing={4}>
          <Grid2
            size={12}
            sx={{
              display: "flex",
              justifyContent: rooms.length ? "flex-end" : "center",
            }}
          >
            <Button
              variant="contained"
              disabled={false}
              onClick={() => navigate("/create-room")}
            >
              Create Room
            </Button>
          </Grid2>
          <StyledCardContainer container size={12} spacing={4}>
            {rooms.map((room) => (
              <RoomCard key={room.id} room={room as Room} />
            ))}
          </StyledCardContainer>
        </Grid2>
      </Paper>
    </Container>
  );
};

export default Rooms;
