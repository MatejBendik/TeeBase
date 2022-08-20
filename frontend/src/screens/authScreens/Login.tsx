import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

import { useGeolocated } from "react-geolocated";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Input from "../../components/Input";
import { sendLogin } from "../../actions/user/loginFetch";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
    lat: "",
    lng: "",
  });

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: true,
      },
      userDecisionTimeout: 5000,
    });

  useEffect(() => {
    const userToken = localStorage.getItem("accessToken");

    if (userToken) {
      navigate("/app");
    }
  }, []);

  useEffect(() => {
    /* Getting user location */
    !isGeolocationAvailable
      ? setLoginData({
          ...loginData,
          lat: "Your browser does not support Geolocation",
          lng: "Your browser does not support Geolocation",
        })
      : !isGeolocationEnabled
      ? setLoginData({
          ...loginData,
          lat: "Geolocation is not enabled",
          lng: "Geolocation is not enabled",
        })
      : setLoginData({
          ...loginData,
          lat: String(coords?.latitude),
          lng: String(coords?.longitude),
        });
  }, [coords]);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!loginData.username.length || !loginData.password.length) {
      alert("Vyplňte polia !");
      return;
    }

    sendLogin(loginData, navigate, dispatch);
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
