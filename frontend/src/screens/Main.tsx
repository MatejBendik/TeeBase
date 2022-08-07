import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import LogoutIcon from "@mui/icons-material/Logout";

import MainListItems from "../components/MainListItems";
import SecondaryListItems from "../components/SecondaryListItems";
import Copyright from "./../components/Copyright";

import Home from "./contentScreens/Home";
import Profile from "./contentScreens/Profile";
import BasicELE from "./contentScreens/subjects/BasicELE";
import BasicING from "./contentScreens/subjects/BasicING";
import BasicPRG from "./contentScreens/subjects/BasicPRG";
import IntroductionING from "./contentScreens/subjects/IntroductionING";
import LANG1 from "./contentScreens/subjects/Lang1";
import MAT1 from "./contentScreens/subjects/MAT1";
import RepMAT from "./contentScreens/subjects/RepMAT";
import TSV from "./contentScreens/subjects/TSV";

const drawerWidth: number = 390;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

function DashboardContent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const content = useSelector((state: any) => state.contentScreen);

  useEffect(() => {
    const userToken = localStorage.getItem("accesToken");

    if (!userToken) {
      navigate("/");
    }
  }, []);

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            {/* Horné ikony */}
            <IconButton color="inherit">
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                onClick={() => {
                  dispatch({ type: "SET_SCREEN_CONTENT", payload: "home" });
                }}
              >
                Nástenka
              </Typography>
            </IconButton>

            <IconButton color="inherit">
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                onClick={() => {
                  dispatch({ type: "SET_SCREEN_CONTENT", payload: "profile" });
                }}
              >
                Profil
              </Typography>
            </IconButton>

            <IconButton color="inherit">
              <Badge>
                <LogoutIcon
                  onClick={() => {
                    localStorage.clear();
                    navigate("/");
                  }}
                />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>

        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />

          <List component="nav">
            <MainListItems />
            <Divider sx={{ my: 1 }} />
            <SecondaryListItems />
          </List>
        </Drawer>

        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Tu začínajú podmienky na prepínanie screenov */}

              {content == "home" && (
                <Grid item xs={12} md={15} lg={15}>
                  <Paper
                    sx={{
                      p: 2,
                      flexDirection: "column",
                      minHeight: "80vh",
                    }}
                  >
                    <Home />
                  </Paper>
                </Grid>
              )}

              {content == "profile" && (
                <Grid item xs={12} md={15} lg={15}>
                  <Paper
                    sx={{
                      p: 2,
                      flexDirection: "column",
                      minHeight: "85vh",
                    }}
                  >
                    <Profile />
                  </Paper>
                </Grid>
              )}

              {content == "Lang1" && (
                <Grid item xs={12} md={15} lg={15}>
                  <Paper
                    sx={{
                      p: 2,
                      flexDirection: "column",
                      minHeight: "85vh",
                    }}
                  >
                    <LANG1 />
                  </Paper>
                </Grid>
              )}

              {content == "MAT1" && (
                <Grid item xs={12} md={15} lg={15}>
                  <Paper
                    sx={{
                      p: 2,
                      flexDirection: "column",
                      minHeight: "85vh",
                    }}
                  >
                    <MAT1 />
                  </Paper>
                </Grid>
              )}

              {content == "RepMAT" && (
                <Grid item xs={12} md={15} lg={15}>
                  <Paper
                    sx={{
                      p: 2,
                      flexDirection: "column",
                      minHeight: "85vh",
                    }}
                  >
                    <RepMAT />
                  </Paper>
                </Grid>
              )}

              {content == "TSV" && (
                <Grid item xs={12} md={15} lg={15}>
                  <Paper
                    sx={{
                      p: 2,
                      flexDirection: "column",
                      minHeight: "85vh",
                    }}
                  >
                    <TSV />
                  </Paper>
                </Grid>
              )}

              {content == "BasicPRG" && (
                <Grid item xs={12} md={15} lg={15}>
                  <Paper
                    sx={{
                      p: 2,
                      flexDirection: "column",
                      minHeight: "85vh",
                    }}
                  >
                    <BasicPRG />
                  </Paper>
                </Grid>
              )}

              {content == "BasicELE" && (
                <Grid item xs={12} md={15} lg={15}>
                  <Paper
                    sx={{
                      p: 2,
                      flexDirection: "column",
                      minHeight: "85vh",
                    }}
                  >
                    <BasicELE />
                  </Paper>
                </Grid>
              )}

              {content == "BasicING" && (
                <Grid item xs={12} md={15} lg={15}>
                  <Paper
                    sx={{
                      p: 2,
                      flexDirection: "column",
                      minHeight: "85vh",
                    }}
                  >
                    <BasicING />
                  </Paper>
                </Grid>
              )}

              {content == "IntroductionING" && (
                <Grid item xs={12} md={15} lg={15}>
                  <Paper
                    sx={{
                      p: 2,
                      flexDirection: "column",
                      minHeight: "85vh",
                    }}
                  >
                    <IntroductionING />
                  </Paper>
                </Grid>
              )}
            </Grid>
            <Copyright sx={{ mt: 7 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Main() {
  return <DashboardContent />;
}
