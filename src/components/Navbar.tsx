import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedIn, removeToken, removeUser } from "../authentication";
import { colors } from "../theme";

const Navbar: FunctionComponent = () => {
  const navigate = useNavigate();

  const onSignOut = (path: string) => {
    removeToken();
    removeUser();
    navigate(path);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ bgcolor: colors.green }} position="fixed">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            onClick={() =>
              isLoggedIn() ? navigate("/") : navigate("/sign-in")
            }
            sx={{
              ml: 0,
              cursor: "pointer",
            }}
          >
            Chat
          </Typography>
          {isLoggedIn() ? (
            <Box>
              <Button
                color="inherit"
                onClick={() => onSignOut("/sign-in")}
                style={{
                  backgroundColor: "transparent",
                }}
              >
                Sign out
              </Button>
            </Box>
          ) : (
            <Box>
              <Button
                onClick={() => navigate("/sign-in")}
                color="inherit"
                style={{
                  backgroundColor: "transparent",
                }}
              >
                Sign in
              </Button>
              <Button
                onClick={() => navigate("/sign-up")}
                color="inherit"
                style={{
                  backgroundColor: "transparent",
                }}
              >
                Sign up
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
