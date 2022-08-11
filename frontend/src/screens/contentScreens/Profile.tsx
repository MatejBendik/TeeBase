import { useState } from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import "./profile.css";

import { formatDate } from "../../utils/formatDate";
import { deleteUserFetch } from "../../actions/deleteUserFetch";
import { changePasswordFetch } from "../../actions/changePasswordFetch";
import { editUserFetch } from "../../actions/editUserFetch";
import { getUserFetch } from "../../actions/getUserFetch";

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
  const dispatch = useDispatch();
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
    await deleteUserFetch(String(userData._id), navigate);
  };

  /* Changing user password */
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

  /* Changing user data */
  const [areEditable, setAreEditable] = useState(false);
  const [editUserData, setEditUserData] = useState({
    id: String(userData._id),
    firstName: "",
    lastName: "",
    email: "",
    username: "",
  });

  const handleEditing = () => {
    setAreEditable(!areEditable);
  };

  const saveEditedData = async () => {
    console.log(editUserData);
    await editUserFetch(editUserData);
    await getUserFetch(userData._id, dispatch);
  };

  const handleChangeEditUserData = (e: any) => {
    setEditUserData({ ...editUserData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <h2 className="title">Tvoj profil</h2>
      <div className="container">
        <div className="profileDiv">
          <div className="flex-container">
            <h1 className="containerTitle">Údaje</h1>

            {areEditable && (
              <SaveIcon
                fontSize="medium"
                style={{ marginTop: "30px", marginRight: "10px" }}
                cursor="pointer"
                onClick={() => {
                  handleEditing();
                  saveEditedData();
                }}
              />
            )}
            {!areEditable && (
              <EditIcon
                fontSize="medium"
                style={{ marginTop: "30px", marginRight: "10px" }}
                cursor="pointer"
                onClick={handleEditing}
              />
            )}
          </div>

          <p className="dataName">Celé meno</p>
          <div className="flex-container">
            {areEditable && (
              <>
                <input
                  className="dataLabel editableLabel"
                  placeholder={userData?.firstName}
                  name="firstName"
                  onChange={handleChangeEditUserData}
                  value={editUserData?.firstName}
                />
                <p style={{ margin: "10px" }}></p>
                <input
                  className="dataLabel editableLabel"
                  name="lastName"
                  placeholder={userData?.lastName}
                  onChange={handleChangeEditUserData}
                  value={editUserData?.lastName}
                />
              </>
            )}
            {!areEditable && (
              <>
                <input
                  className="dataLabel"
                  value={userData?.firstName}
                  disabled
                />
                <p style={{ margin: "10px" }}></p>
                <input
                  className="dataLabel"
                  value={userData?.lastName}
                  disabled
                />
              </>
            )}
          </div>
          {areEditable && (
            <>
              <p className="dataName ">Email</p>
              <input
                className="dataLabel editableLabel"
                type="email"
                placeholder={userData?.email}
                name="email"
                onChange={handleChangeEditUserData}
                value={editUserData?.email}
              />
              <p className="dataName">Používateľské meno</p>
              <input
                className="dataLabel editableLabel"
                name="username"
                placeholder={userData?.username}
                onChange={handleChangeEditUserData}
                value={editUserData?.username}
              />
            </>
          )}
          {!areEditable && (
            <>
              <p className="dataName">Email</p>
              <input
                className="dataLabel"
                type="email"
                value={userData?.email}
                disabled
              />
              <p className="dataName">Používateľské meno</p>
              <input
                className="dataLabel"
                value={userData?.username}
                disabled
              />
            </>
          )}
          <p className="dataName">Dátum vytvorenia:</p>
          <input
            className="dataLabel"
            value={formatDate(String(userData?.registeredAt))}
            disabled
          />
          <Button
            className="deleteUserButton"
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
