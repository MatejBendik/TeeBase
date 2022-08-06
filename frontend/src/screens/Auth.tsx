import React, { useState } from "react";

import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Copyright from "../components/Copyright";
import Login from "./authScreens/Login";
import Register from "./authScreens/Register";
import ForgottenPassword from "./authScreens/ForgottenPassword";

export default function Auth() {
  const theme = createTheme();
  const [display, setDisplay] = useState("login");

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>

          {display === "login" && <Login />}
          {display === "register" && <Register />}
          {display === "forgotten" && <ForgottenPassword />}

          <Grid container>
            <Grid item xs>
              <Link
                href="#"
                variant="body2"
                onClick={() => {
                  setDisplay("forgotten");
                }}
              >
                {display != "forgotten" && <p> Zabudnuté heslo? </p>}
              </Link>
            </Grid>

            <Grid item>
              <Link
                href="#"
                variant="body2"
                onClick={() => {
                  display === "register" && setDisplay("login");
                  display === "login" && setDisplay("register");
                  display === "forgotten" && setDisplay("login");
                }}
              >
                {display === "register" && <p>Prihlásiť sa</p>}
                {display === "login" && <p>Registrovať sa</p>}
                {display === "forgotten" && <p>Prihlásiť</p>}
              </Link>
            </Grid>
          </Grid>
        </Box>
        <Copyright sx={{ mt: 10 }} />
      </Container>
    </ThemeProvider>
  );
}
