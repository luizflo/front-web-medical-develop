import { createTheme } from "@pankod/refine-mui";
import { createBreakpoints } from "@pankod/refine-mui";

const breakpoints = createBreakpoints({});

const theme = createTheme({
  palette: {
    error: {
      main: "#FF4545",
      light: "#FF4545",
    },
  },
  typography: {
    allVariants: {
      fontFamily: "Nunito",
    },
    body1: {
      fontSize: "12px",
      marginBottom: "0px",
    },
    body2: {
      fontSize: "16px",
      marginBottom: "0px",
    },
    h6: {
      fontSize: "10px",
    },
    h1: {
      fontSize: "28px",
      [breakpoints.down("md")]: {
        fontSize: "22px",
      },
    },
    h2: {
      fontSize: "25px",
      [breakpoints.down("md")]: {
        fontSize: "18px",
      },
    },
    h3: {
      fontSize: "18px",
      [breakpoints.down("md")]: {
        fontSize: "14px",
      },
    },
    h4: {
      fontSize: "14px",
      marginBottom: "0px",
    },
    caption: {
      fontSize: "40px",
    },
    subtitle1: {
      fontSize: "35px",
      [breakpoints.down("md")]: {
        fontSize: "20px",
      },
    },
    subtitle2: {
      fontSize: "28px",
      fontWeightBold: 800,
    },
    h5: {
      fontSize: "22px",
      [breakpoints.down("md")]: {
        fontSize: "16px",
      },
    },
    fontWeightLight: 400,
    fontWeightRegular: 600,
    fontWeightMedium: 700,
    fontWeightBold: 800,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontSize: "20px",
          fontWeight: 800,
        },
      },
    },
    MuiDialogContentText: {
      styleOverrides: {
        root: {
          fontSize: "14px",
          fontWeight: 600,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        root: {
          padding: "30px",
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: "12px",
          marginBottom: "0px",
        },
        secondary: {
          fontSize: "14px",
        },
      },
    },
  },
});
export default theme;
