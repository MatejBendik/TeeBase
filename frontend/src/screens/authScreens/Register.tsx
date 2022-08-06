import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Input from "../../components/Input";
import { sendRegister } from "../../actions/registerFetch";

export default function Register() {
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem("accesToken");

    if (userToken) {
      navigate("/app");
    }
  }, []);

  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();

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
  };

  const handleChangeRegister = (e: any) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Typography component="h1" variant="h5">
        Registrovať sa
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
          type="text"
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

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 1, p: 1 }}
        >
          Registrovať sa
        </Button>
      </Box>
    </>
  );
}
