import React, { useState } from "react";
import { useNavigate } from "react-router";
import { sendLogin } from "./../../actions/postLoginForm";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Input from "./Input";

const Auth = () => {
    const theme = createTheme();
    const [isRegistered, setIsRegistered] = useState(false);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = () => {

    };

    const handleChange = () => {

    }

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
            {
                !isRegistered && (
                    <>
                        <Input name="firstName" label="Meno" type="text" handleChange={handleChange} autoFocus />
                        <Input name="lastName" label="Priezvisko" type="text" handleChange={handleChange} />
                        <Input name="email" label="Email" type="email" handleChange={handleChange} />
                        <Input name="username" label="Používateľské meno" type="text" handleChange={handleChange} />
                    </>
                )
            }
                <Input name="password" label="Heslo" type="password" handleChange={handleChange} />
                { isRegistered && <Input name="confirmPassword" label="Zopakuj heslo" type="password" handleChange={handleChange} /> }
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                { isRegistered ? "Prihlásiť" : "Registrovať"}
            </Button>
            <Grid container>
                <Grid item xs>
                    <Link href="#" variant="body2">
                    Zabudnuté heslo?
                    </Link>
                </Grid>
                <Grid item>
                    <Link href="#" variant="body2" onClick={switchMode}>
                    {isRegistered ? "Ešte nemáš účet? Registruj sa" :"Už máš účet? Prihlás sa"}
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

export default Auth;