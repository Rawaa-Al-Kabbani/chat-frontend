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
import { createUser } from "../api/user";
import { updateToken, updateUser } from "../authentication";

const SignUpUser: FunctionComponent = () => {
  const defaultInput = {
    username: "",
    password: "",
  };
  const [input, setInput] = useState(defaultInput);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();

  const onSubmitUser = async () => {
    setErrorMessage("");
    try {
      const createUserResponse = await createUser(input);
      updateToken(createUserResponse.access_token);
      updateUser(createUserResponse.user);
      navigate("/", { replace: true });
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  return (
    <Container maxWidth="sm">
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      <Paper elevation={1} sx={{ padding: 6 }}>
        <Grid2 container spacing={8}>
          <Grid2 size={12}>
            <h1 style={{ margin: 0 }}>Sign up</h1>
          </Grid2>
          <Grid2 size={12}>
            <TextField
              required
              label="Username"
              name="username"
              variant="outlined"
              onChange={(event) =>
                setInput({ ...input, username: event.target.value.trim() })
              }
              fullWidth
            />
          </Grid2>
          <Grid2 size={12}>
            <TextField
              required
              label="Password"
              type="password"
              name="password"
              variant="outlined"
              onChange={(event) =>
                setInput({ ...input, password: event.target.value.trim() })
              }
              fullWidth
            />
          </Grid2>
          <Grid2 size={12}>
            <Button
              variant="contained"
              onClick={onSubmitUser}
              disabled={!input.username || !input.password}
            >
              Sign up
            </Button>
          </Grid2>
        </Grid2>
      </Paper>
    </Container>
  );
};

export default SignUpUser;
