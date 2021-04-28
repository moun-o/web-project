import { createMuiTheme } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
// import green from "@material-ui/core/colors/green";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#009688",
    },
    secondary: {
      main: "#FF4136",
    },
  },
  typography: {
    primary: {
      fontFamily: "Consolas",
    },
  },
  overrides: {
    MuiCard: {
      root: {
        // backgroundColor: "#FF4136",
        // color: "#DDDDDD",
        fontFamily: "Consolas",
      },
    },
    MuiTypography: {
      root: {
        color: "#004d40",
      },
      colorTextSecondary: {
        color: "##4a148c",
      },
      body1: {
        fontFamily: "cursive !important",
      },
      // body1: {
      //   fontFamily: "cursive",
      // },
    },
    MuiAvatar: {
      colorDefault: {
        backgroundColor: "#fff",
        color: "#001f3f",
      },
    },
    MuiInputBase: {
      root: {
        overflow: "hidden",
      },
      input: {
        backgroundColor: "#fff",
      },
    },
  },
});
export default theme;
