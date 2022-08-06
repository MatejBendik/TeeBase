import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Input from "../../components/Input";
import { sendLogin } from "../../actions/loginFetch";

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem("accesToken");

    if (userToken) {
      navigate("/app");
    }
  }, []);

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!loginData.username.length || !loginData.password.length) {
      alert("Vyplňte polia !");
      return;
    }

    sendLogin(loginData, navigate);
    setLoginData({ ...loginData, ["username"]: "", ["password"]: "" });
  };

  const handleChangeLogin = (e: any) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Typography component="h1" variant="h5">
        Prihlásiť sa
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
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

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 1, p: 1 }}
        >
          Prihlásiť sa
        </Button>
      </Box>
    </>
  );
}
