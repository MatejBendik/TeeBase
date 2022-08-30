import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useGeolocated } from "react-geolocated";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Input from "../../components/Input";
import { sendRegister } from "../../actions/user/registerFetch";
import { saveNote } from "../../actions/materials/saveNote";
import { saveTask } from "../../actions/materials/saveTask";

export default function Register() {
  const navigate = useNavigate();

  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    lat: "",
    lng: "",
  });

  const [welcomeNote, setWelcomeNote] = useState({
    subjectId: "0",
    userId: "000",
    type: "note",
    content:
      "<b>Toto je úvodná poznámka,</b> začni ju upravovať stlačením tlačidla Upraviť poznámku. <br> Pri písaní môžeš použiť aj tieto HTML tagy: h1, h2, h3, b, i, em, a, p, img, strong",
  });

  const [welcomeTask, setWelcomeTask] = useState({
    subjectId: "0",
    userId: "000",
    type: "task",
    content:
      "<b>Toto je úvodná úloha,</b> začni ju upravovať stlačením tlačidla Upraviť úlohu. <br> Pri písaní môžeš použiť aj tieto HTML tagy: h1, h2, h3, b, i, em, a, p, img, strong",
  });

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: true,
      },
      userDecisionTimeout: 5000,
    });

  useEffect(() => {
    const userToken = localStorage.getItem("accesToken");

    if (userToken) {
      navigate("/app");
    }
  }, []);

  useEffect(() => {
    /* Getting user location */
    !isGeolocationAvailable
      ? setRegisterData({
          ...registerData,
          lat: "Your browser does not support Geolocation",
          lng: "Your browser does not support Geolocation",
        })
      : !isGeolocationEnabled
      ? setRegisterData({
          ...registerData,
          lat: "Geolocation is not enabled",
          lng: "Geolocation is not enabled",
        })
      : setRegisterData({
          ...registerData,
          lat: String(coords?.latitude),
          lng: String(coords?.longitude),
        });
  }, [coords]);

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
    sendRegister(
      registerData,
      navigate,
      saveNote(welcomeNote),
      saveTask(welcomeTask)
    );

    setRegisterData({
      ...registerData,
      ["firstName"]: "",
      ["lastName"]: "",
      ["email"]: "",
      ["username"]: "",
      ["password"]: "",
      ["lat"]: "",
      ["lng"]: "",
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
