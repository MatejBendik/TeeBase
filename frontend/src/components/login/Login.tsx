import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import { sendLogin } from "../../actions/loginFetch";
import { sendRegister } from "../../actions/registerFetch";
import Input from "../../const/Input";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function Login() {
  const navigate = useNavigate();
  const theme = createTheme();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistered, setIsRegistered] = useState(true);

  useEffect(() => {
    const isLogged = localStorage.getItem("isLogged");

    if (isLogged === "true") {
      navigate("/app");
    }
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (isRegistered) {
      if (!username.length || !password.length) {
        alert("Vyplňte polia !");
        return;
      }

      sendLogin(username, password);
      //treba tu precitat z reduxu odpoved z tej funkcie
      //redux ti prerenderuje appku tak isto jakeby si menil state

      navigate("/app");

      setUsername("");
      setPassword("");
    } else {
      if (
        !firstName.length ||
        !lastName.length ||
        !email.length ||
        !username.length ||
        !password.length
      ) {
        alert("Vyplňte polia !");
        return;
      }
      sendRegister(firstName, lastName, email, username, password);

      setFirstName("");
      setLastName("");
      setEmail("");
      setUsername("");
      setPassword("");
    }
  };

  const switchMode = () => {
    setIsRegistered((prevIsRegistered) => !prevIsRegistered);
  };

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
          <Typography component="h1" variant="h5">
            {isRegistered ? "Prihlásiť sa" : "Registrovať sa"}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            {!isRegistered && (
              <>
                <Input
                  name="firstName"
                  label="Meno"
                  type="text"
                  handleChange={(e: any) => {
                    setFirstName(e.target.value);
                  }}
                  value={firstName}
                  autoFocus
                />
                <Input
                  name="lastName"
                  label="Priezvisko"
                  type="text"
                  handleChange={(e: any) => {
                    setLastName(e.target.value);
                  }}
                  value={lastName}
                />
                <Input
                  name="email"
                  label="Email"
                  type="email"
                  handleChange={(e: any) => {
                    setEmail(e.target.value);
                  }}
                  value={email}
                />
                <Input
                  name="username"
                  label="Používateľské meno"
                  type="text"
                  handleChange={(e: any) => {
                    setUsername(e.target.value);
                  }}
                  value={username}
                />
                <Input
                  name="password"
                  label="Heslo"
                  type="password"
                  handleChange={(e: any) => {
                    setPassword(e.target.value);
                  }}
                  value={password}
                />
              </>
            )}

            {isRegistered && (
              <>
                <Input
                  name="username"
                  label="Používateľské meno"
                  type="text"
                  handleChange={(e: any) => {
                    setUsername(e.target.value);
                  }}
                  value={username}
                />
                <Input
                  name="password"
                  label="Heslo"
                  type="password"
                  handleChange={(e: any) => {
                    setPassword(e.target.value);
                  }}
                  value={password}
                />
              </>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {isRegistered ? "Prihlásiť" : "Registrovať"}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Zabudnuté heslo?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2" onClick={switchMode}>
                  {isRegistered
                    ? "Ešte nemáš účet? Registruj sa"
                    : "Už máš účet? Prihlás sa"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 10 }} />
      </Container>
    </ThemeProvider>
  );

  function Copyright(props: any) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link color="inherit" href="https://mui.com/">
          TeeBase
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }
}
