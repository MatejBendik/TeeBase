import React, { useState, useEffect } from "react";
import "./profile.css";

import Input from "../../../const/Input";
import Button from "@mui/material/Button";

import { getUserFetch } from "../../../actions/getUserFetch";

export default function Profile() {
  interface userData {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    registeredAt: string;
  }

  const userID = localStorage.getItem("user_id");
  const [userData, setUserData] = useState<userData>();

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const user = await getUserFetch(String(userID));
    setUserData(user);
  };

  return (
    <>
      <h2 className="title">Tvoj profil</h2>
      <div className="container">
        <div className="profileDiv">
          <div>
            <p>{userData?.firstName}</p>
            <p>{userData?.lastName}</p>
          </div>
          <div>
            <p>{userData?.email}</p>
            <p>{userData?.username}</p>
          </div>
          <p>Dátum vytvorenia: {userData?.registeredAt}</p>
        </div>
        <div className="passwordDiv">
          <Input
            name="password"
            label="Staré heslo"
            type="password"
            handleChange={() => {}}
            value="s"
          />
          <Input
            name="password"
            label="Nové heslo"
            type="password"
            handleChange={() => {}}
            value="s"
          />
          <Input
            name="password"
            label="Potvrdenie nového hesla "
            type="password"
            handleChange={() => {}}
            value="s"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 1 }}
          >
            Potvrdiť zmeny
          </Button>
        </div>
      </div>
    </>
  );
}
