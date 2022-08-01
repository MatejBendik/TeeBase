import React from "react";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";

const Main = () => {
  const navigate = useNavigate();

  const user = useSelector((state: any) => state.loginReducers);
  console.log(user);

  return (
    <div>
      <h1>Sme v maine</h1>
      <Button fullWidth variant="contained" sx={{ mt: 3, mb: 1 }}>
        Odhlásiť sa
      </Button>
    </div>
  );
};

export default Main;
