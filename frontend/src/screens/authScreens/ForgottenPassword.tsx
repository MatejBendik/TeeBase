import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
/* import { GoogleLogin } from "react-google-login";*/

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Input from "../../components/Input";

export default function ForgottenPassword() {
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem("accesToken");

    if (userToken) {
      navigate("/app");
    }
  }, []);

  const [forgottenPData, setForgottenPData] = useState({
    username: "",
    email: "",
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!forgottenPData.username.length || !forgottenPData.email.length) {
      alert("Vyplňte polia !");
      return;
    }

    setForgottenPData({ ...forgottenPData, ["username"]: "", ["email"]: "" });
  };

  const handleChangeForgotten = (e: any) => {
    setForgottenPData({ ...forgottenPData, [e.target.name]: e.target.value });
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
    <>
      <Typography component="h1" variant="h5">
        Odoslať email
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <Input
          name="username"
          label="Používateľské meno"
          type="text"
          handleChange={handleChangeForgotten}
          value={forgottenPData.username}
          autoFocus
        />
        <Input
          name="email"
          label="Váš email"
          type="text"
          handleChange={handleChangeForgotten}
          value={forgottenPData.email}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 1, p: 1 }}
        >
          Odoslať email
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
      </Box>
    </>
  );
}
