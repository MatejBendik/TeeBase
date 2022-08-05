import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
/* import { GoogleLogin } from "react-google-login";*/

import GoogleIcon from "../const/GoogleIcon";
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

import Input from "../components/Input";
import Copyright from "../components/Copyright";
import { sendLogin } from "../actions/loginFetch";
import { sendRegister } from "../actions/registerFetch";

export default function Auth() {
  const navigate = useNavigate();
  const theme = createTheme();

  useEffect(() => {
    const userToken = localStorage.getItem("token");

    if (userToken) {
      navigate("/app");
    }
  }, []);

  const [isRegistered, setIsRegistered] = useState(true);
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (isRegistered) {
      if (!loginData.username.length || !loginData.password.length) {
        alert("Vyplňte polia !");
        return;
      }

      sendLogin(loginData, navigate);

      setLoginData({ ...loginData, ["username"]: "", ["password"]: "" });
    } else {
      if (
        !registerData.firstName.length ||
        !registerData.lastName.length ||
        !registerData.email.length ||
        !registerData.username.length ||
        !registerData.password.length
      ) {
        alert("Vyplňte polia !");
        return;
      }
      sendRegister(registerData, navigate);

      setRegisterData({
        ...registerData,
        ["firstName"]: "",
        ["lastName"]: "",
        ["email"]: "",
        ["username"]: "",
        ["password"]: "",
      });
    }
  };

  const handleChangeLogin = (e: any) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleChangeRegister = (e: any) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const switchMode = () => {
    setIsRegistered(!isRegistered);
  };

  // Google login potrebuje fix zatial nefunguje ten button Prihlasit sa cez google

  /*  const googleSuccess = async (res: any) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: "AUTH", data: { token: token, result: result } });
      navigate("/main");
    } catch (error) {
      console.log(error);
    }
  }; */

  const googleFailure = (error: any) => {
    console.log(error);
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
                  handleChange={handleChangeRegister}
                  value={registerData.firstName}
                  autoFocus
                />
                <Input
                  name="lastName"
                  label="Priezvisko"
                  type="text"
                  handleChange={handleChangeRegister}
                  value={registerData.lastName}
                />
                <Input
                  name="email"
                  label="Email"
                  type="email"
                  handleChange={handleChangeRegister}
                  value={registerData.email}
                />
                <Input
                  name="username"
                  label="Používateľské meno"
                  type="text"
                  handleChange={handleChangeRegister}
                  value={registerData.username}
                />
                <Input
                  name="password"
                  label="Heslo"
                  type="password"
                  handleChange={handleChangeRegister}
                  value={registerData.password}
                />
              </>
            )}

            {isRegistered && (
              <>
                <Input
                  name="username"
                  label="Používateľské meno"
                  type="text"
                  handleChange={handleChangeLogin}
                  value={loginData.username}
                  autoFocus
                />
                <Input
                  name="password"
                  label="Heslo"
                  type="password"
                  handleChange={handleChangeLogin}
                  value={loginData.password}
                />
              </>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 1 }}
            >
              {isRegistered ? "Prihlásiť" : "Registrovať"}
            </Button>
            {/*   <GoogleLogin
              clientId="1088267011890-bnbnlc5mluso8pmn86h3g3qe8vju1tmh.apps.googleusercontent.com"
              render={(renderProps) => (
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 1, mb: 3 }}
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  startIcon={<GoogleIcon />}
                >
                  Prihlásiť cez Google
                </Button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy="single_host_origin"
            /> */}
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
}
