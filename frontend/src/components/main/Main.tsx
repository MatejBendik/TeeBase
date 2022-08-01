import React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";

const Main = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Sme v maine</h1>
      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 1 }}
        onClick={() => {
          localStorage.clear();
          navigate("/");
        }}
      >
        Odhlásiť sa
      </Button>
    </div>
  );
};

export default Main;
