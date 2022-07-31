import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

import { sendLogin } from "../../actions/loginFetch";
import { sendRegister } from "../../actions/registerFetch";
import Input from "../../const/Input";
import GoogleIcon from "../../const/GoogleIcon";
import { GoogleLogin } from 'react-google-login';
import { login, register } from '../../actions/auth';

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

export default function Auth() {
  const navigate = useNavigate();
  const theme = createTheme();
  const dispatch = useDispatch();

  useEffect(() =>{
    //dispatch(getSign());
  }, [dispatch])

  //const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  const [isRegistered, setIsRegistered] = useState(true);

  // tu je docs ku handling multiple inputs https://www.pluralsight.com/guides/handling-multiple-inputs-with-single-onchange-handler-react

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: ''
  }
  );

  const handleSubmit = (e: any) =>{
    e.preventDefault();
  
    if(isRegistered){
      //dispatch(login(formData, navigate));
    }else{
      //dispatch(register(formData, navigate));
    }
  };

  const handleChange = (e: any) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  /*
  useEffect(() => {
    const userToken = localStorage.getItem("token");

    if (userToken) {
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

      sendLogin({ username, password });

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
      sendRegister({ firstName, lastName, email, username, password });

      setFirstName("");
      setLastName("");
      setEmail("");
      setUsername("");
      setPassword("");
    }
  };

  */
  const switchMode = () => {
    setIsRegistered((prevIsRegistered) => !prevIsRegistered);
  };

  // Google login potrebuje fix zatial nefunguje ten button Prihlasit sa cez google

  const googleSuccess = async (res: any) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({type: 'AUTH', data: {token: token, result: result}});
      navigate('/main');
    } catch (error) {
      console.log(error);
    }

  }

  const googleFailure = (error: any) => {
    console.log(error);
  }

  useEffect(() => {
    //const token = user?.token;

    // JWT ...

  }, [])

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
                  handleChange={handleChange}
                  value={formData.firstName}
                  autoFocus
                />
                <Input
                  name="lastName"
                  label="Priezvisko"
                  type="text"
                  handleChange={handleChange}
                  value={formData.lastName}
                />
                <Input
                  name="email"
                  label="Email"
                  type="email"
                  handleChange={handleChange}
                  value={formData.email}
                />
                <Input
                  name="username"
                  label="Používateľské meno"
                  type="text"
                  handleChange={handleChange}
                  value={formData.username}
                />
                <Input
                  name="password"
                  label="Heslo"
                  type="password"
                  handleChange={handleChange}
                  value={formData.password}
                />
              </>
            )}

            {isRegistered && (
              <>
                <Input
                  name="username"
                  label="Používateľské meno"
                  type="text"
                  handleChange={handleChange}
                  value={formData.username}
                />
                <Input
                  name="password"
                  label="Heslo"
                  type="password"
                  handleChange={handleChange}
                  value={formData.password}
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
            <GoogleLogin 
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
            />
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
