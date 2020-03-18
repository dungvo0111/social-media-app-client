export default {
  palette: {
    primary: {
      light: "#35baf6",
      main: "#03a9f4",
      dark: "#0276aa",
      contrastText: "#fff"
    },
    secondary: {
      light: "#f73378",
      main: "#f50057",
      dark: "#ab003c",
      contrastText: "#fff"
    }
  },

  spreadThis: {
    form: {
      textAlign: "center"
    },
    // image: {
    //   margin: "10px auto",
    //   height: 50
    // },
    pageTitle: {
      margin: "10px auto"
    },
    textField: {
      margin: "10px auto"
    },
    button: {
      marginTop: 20,
      position: "relative"
    },
    customError: {
      color: "red",
      fontSize: "0.8rem",
      marginTop: 10
    },
    progress: {
      position: "absolute"
    },
    typography: {
      useNextVariants: true
    },
    invisibleSeparator: {
      border: "none",
      margin: 4
    },
    visibleSeparator: {
      width: "100%",
      borderBottom: "1px solid rgba(0,0,0,0.1)",
      margin: "10px 20px"
    },
    spinnerDiv: {
      textAlign: "center",
      margin: 50
    },
    paper: {
      padding: 20
    },
    profile: {
      "& .image-wrapper": {
        textAlign: "center",
        position: "relative",
        "& button": {
          position: "absolute",
          top: "80%",
          left: "70%"
        }
      },
      "& .profile-image": {
        width: 200,
        height: 200,
        objectFit: "cover",
        maxWidth: "100%",
        borderRadius: "50%"
      },
      "& .profile-details": {
        textAlign: "center",
        "& span, svg": {
          verticalAlign: "middle"
        },
        "& a": {
          color: "#03a9f4"
        }
      },
      "& hr": {
        border: "none",
        margin: "0 0 10px 0"
      },
      "& svg.button": {
        "&:hover": {
          cursor: "pointer"
        }
      }
    },
    buttons: {
      textAlign: "center",
      "& a": {
        margin: "20px 10px"
      }
    },
    card: {
      position: "relative",
      display: "flex",
      marginBottom: 20
    },
    image: {
      minWidth: 200
    },
    content: {
      padding: 25,
      objectFit: "cover"
    },
    submitButton: {
      position: "relative",
      float: "right",
      marginTop: 5,
      marginBottom: 10
    },
    progressSpinner: {
      position: "absolute"
    },
    closeButton: {
      position: "absolute",
      left: "90%",
      top: "3%"
    },
   
    profileImage: {
      maxWidth: 200,
      height: 200,
      borderRadius: "50%",
      objectFit: "cover"
    },
    DialogContent: {
      padding: 20
    },
    expandButton: {
      position: "absolute",
      left: "90%"
    }
  }
};
