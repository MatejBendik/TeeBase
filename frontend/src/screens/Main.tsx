import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

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

import { mainListItems, secondaryListItems } from "../components/ListItems";
import Copyright from "./../components/Copyright";
import Home from "./contentScreens/Home";
import Profile from "./contentScreens/Profile";

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
  useEffect(() => {
    const userToken = localStorage.getItem("accesToken");

    if (!userToken) {
      navigate("/");
    }
  }, []);

  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const navigate = useNavigate();
  const [content, setContent] = useState("home");

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
            <IconButton color="inherit">
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                onClick={() => {
                  setContent("home");
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
                  setContent("profile");
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
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
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
            </Grid>
            <Copyright sx={{ mt: 10 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Main() {
  return <DashboardContent />;
}
