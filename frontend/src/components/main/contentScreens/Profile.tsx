import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "./profile.css";

import Input from "../../../const/Input";
import Button from "@mui/material/Button";

import { getUserFetch } from "../../../actions/getUserFetch";
import { deleteUserFetch } from "../../../actions/deleteUserFetch";

import { formatDate } from "../../../actions/formatDate";

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

  const navigate = useNavigate();
  const userID = localStorage.getItem("user_id");
  const [userData, setUserData] = useState<userData>();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [copyNewPassword, setCopyNewPassword] = useState("");

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
          <h1 className="containerTitle">Údaje</h1>
          <p className="dataName">Celé meno</p>
          <div className="flex-container">
            <p className="dataLabel">{userData?.firstName}</p>
            <p style={{ margin: "10px" }}></p>
            <p className="dataLabel">{userData?.lastName}</p>
          </div>
          <p className="dataName">Email</p>
          <p className="dataLabel">{userData?.email}</p>
          <p className="dataName">Používateľské meno</p>
          <p className="dataLabel">{userData?.username}</p>
          <p className="dataName">Dátum vytvorenia:</p>
          <p className="dataLabel">
            {formatDate(String(userData?.registeredAt))}
          </p>
        </div>
        <div className="passwordDiv">
          <h1 className="containerTitle">Heslo</h1>
          <Input
            name="oldPassword"
            label="Staré heslo"
            type="password"
            handleChange={(e: any) => {
              setOldPassword(e.target.value);
            }}
            value={oldPassword}
          />
          <div className="separator"></div>
          <Input
            name="newPassword"
            label="Nové heslo"
            type="password"
            handleChange={(e: any) => {
              setNewPassword(e.target.value);
            }}
            value={newPassword}
          />
          <div className="separator"></div>
          <Input
            name="copyNewPassword"
            label="Potvrdenie nového hesla "
            type="password"
            handleChange={(e: any) => {
              setCopyNewPassword(e.target.value);
            }}
            value={copyNewPassword}
          />
          <div className="separator"></div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Potvrdiť zmeny
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: "red" }}
            onClick={async () => {
              localStorage.clear();
              await deleteUserFetch(String(userID), navigate);
            }}
          >
            Nenávratne zmazať užívateľa
          </Button>
        </div>
      </div>
    </>
  );
}
