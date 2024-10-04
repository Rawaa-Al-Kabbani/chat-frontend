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
import { signInUser } from "../api/user";
import { updateToken, updateUser } from "../authentication";
import { SignInUserInput } from "../graphql/graphql";
import { getErrorMessages } from "../utils";

const SignInUser: FunctionComponent = () => {
  const navigate = useNavigate();
  const defaultInput: SignInUserInput = {
    username: "",
    password: "",
  };
  const [input, setInput] = useState<SignInUserInput>(defaultInput);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const onSignInUser = async () => {
    setErrorMessage("");
    try {
      const signInResponse = await signInUser({
        username: input.username,
        password: input.password,
      });

      updateToken(signInResponse?.access_token);
      updateUser(signInResponse?.user);
      navigate("/", { replace: true });
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
            <h1 style={{ margin: 0 }}>Sign in</h1>
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
              onClick={onSignInUser}
              disabled={!input.username || !input.password}
            >
              Sign in
            </Button>
          </Grid2>
        </Grid2>
      </Paper>
    </Container>
  );
};

export default SignInUser;
