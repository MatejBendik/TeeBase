import React from "react";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const Main = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch({ type: 'LOGOUT' });

    navigate('/');
  }

  return (
    <div>
      <h1>Sme v maine</h1>
    <Button
      fullWidth
      variant="contained"
      sx={{ mt: 3, mb: 1 }} 
      onClick={logout}
    >
      Odhlásiť sa
    </Button>
    </div>
  )
};

export default Main;
