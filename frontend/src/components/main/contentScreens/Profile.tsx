import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "./profile.css";

import Input from "../../../const/Input";
import Button from "@mui/material/Button";
import { Oval } from "react-loader-spinner";
/* MOodal */
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";

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
  const [spinner, setSpinner] = useState(false);
  /* Modal */
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    setSpinner(true);
    const user = await getUserFetch(String(userID));
    setUserData(user);
    setSpinner(false);
  };

  return (
    <>
      <h2 className="title">Tvoj profil</h2>
      {spinner && (
        <Oval
          height={80}
          width={80}
          color="#4fa94d"
          wrapperStyle={{ justifyContent: "center", marginTop: "100px" }}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#4fa94d"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      )}
      {!spinner && (
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
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: "red" }}
              onClick={async () => {
                handleOpen();
              }}
            >
              Nenávratne zmazať užívateľa
            </Button>
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
          </div>
        </div>
      )}

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 800,
        }}
      >
        <Fade in={open}>
          <Box sx={modal}>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              sx={{
                textAlign: "center",
                padding: 2,
                backgroundColor: "#ebe8e8",
                borderRadius: 2,
              }}
            >
              Zmazať užívateľa ?
            </Typography>
            <Typography
              id="transition-modal-description"
              sx={{ mt: 2, textAlign: "center" }}
            >
              Užívateľ bude natrvalo vymazaný.
            </Typography>
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
              Potvrdiť
            </Button>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

const modal = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 55,
  p: 4,
};
