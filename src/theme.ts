import { createTheme } from "@mui/material";

export const colors = {
  green: "#25D366",
  red: "#f44336",
};

export const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: colors.green,
          "&.Mui-disabled": {
            cursor: "not-allowed",
            pointerEvents: "auto",
          },
          "&:hover": {
            backgroundColor: "#fff",
            color: colors.green,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          cursor: "pointer",
          "& label": {
            color: "black",
          },
          "& label.Mui-focused": {
            color: colors.green,
          },
          "& .MuiInput-underline:after": {
            borderBottomColor: colors.green,
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "black",
            },
            "&:hover fieldset": {
              borderColor: colors.green,
            },
            "&.Mui-focused fieldset": {
              borderColor: colors.green,
            },
          },
        },
      },
    },
  },
});
