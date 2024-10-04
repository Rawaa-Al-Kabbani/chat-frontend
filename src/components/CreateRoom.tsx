import {
  Alert,
  Button,
  Container,
  Grid2,
  Paper,
  TextField,
} from "@mui/material";
import { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createRoom } from "../api/room";
import { CreateRoomInput } from "../graphql/graphql";
import { getErrorMessages } from "../utils";

const CreateRoom: FunctionComponent = () => {
  const defaultInput: CreateRoomInput = {
    name: "",
  };
  const [input, setInput] = useState<CreateRoomInput>(defaultInput);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const navigate = useNavigate();

  const onCreateRoom = async () => {
    setErrorMessage("");
    try {
      const room = await createRoom(input);
      navigate("/room/" + room.id, { replace: true });
    } catch (error: any) {
      setErrorMessage(getErrorMessages(error));
    }
  };

  return (
    <Container maxWidth="sm">
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      <Paper elevation={1} sx={{ padding: 6 }}>
        <Grid2 container spacing={8}>
          <Grid2 size={12}>
            <h1 style={{ margin: 0 }}>Create Room</h1>
          </Grid2>
          <Grid2 size={12}>
            <TextField
              required
              id="name"
              label="Name"
              variant="outlined"
              onChange={(event) =>
                setInput({ ...input, name: event.target.value.trim() })
              }
              fullWidth
            />
          </Grid2>

          <Grid2 size={12}>
            <Button
              variant="contained"
              onClick={onCreateRoom}
              disabled={!input.name}
            >
              Create
            </Button>
          </Grid2>
        </Grid2>
      </Paper>
    </Container>
  );
};

export default CreateRoom;
