import { useState } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import "./profile.css";

import { formatDate } from "../../utils/formatDate";
import { deleteUserFetch } from "../../actions/deleteUserFetch";
import { changePasswordFetch } from "../../actions/changePasswordFetch";
import Input from "../../components/Input";
import Modal from "../../components/Modal";
interface userData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  registeredAt: string;
}

export default function Profile() {
  const navigate = useNavigate();
  const userData = useSelector((state: any) => state.userData);

  const [setPassData, setSetPassData] = useState({
    id: String(userData._id),
    oldPassword: "",
    newPassword: "",
    copyNewPassword: "",
  });

  /* Modal */
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  /* Deleting user */
  const deleteUser = async () => {
    localStorage.clear();
    await deleteUserFetch(String(userData._id), navigate);
  };

  /* Changing user's password */
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (
      !setPassData.oldPassword.length ||
      !setPassData.newPassword.length ||
      !setPassData.copyNewPassword.length
    ) {
      alert("Vyplňte polia !");
      return;
    }

    changePasswordFetch(setPassData);
  };

  const handleChangePass = (e: any) => {
    setSetPassData({ ...setPassData, [e.target.name]: e.target.value });
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
          <Box component="form" onSubmit={handleSubmit}>
            <Input
              name="oldPassword"
              label="Staré heslo"
              type="password"
              handleChange={handleChangePass}
              value={setPassData.oldPassword}
            />
            <div className="separator"></div>
            <Input
              name="newPassword"
              label="Nové heslo"
              type="password"
              handleChange={handleChangePass}
              value={setPassData.newPassword}
            />
            <div className="separator"></div>
            <Input
              name="copyNewPassword"
              label="Potvrdenie nového hesla "
              type="password"
              handleChange={handleChangePass}
              value={setPassData.copyNewPassword}
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
          </Box>
        </div>
      </div>

      <Modal
        setOpen={open}
        handleCloseFunction={handleClose}
        title={"Naozaj si prajete odstrániť uživateľa ? "}
        subTitle={"Táto akcia sa nebude dať vrátiť späť ! "}
        deleteUserFunction={deleteUser}
      />
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
