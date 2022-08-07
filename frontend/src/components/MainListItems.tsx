import * as React from "react";
import { useDispatch } from "react-redux";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

/* icons */
import GTranslateIcon from "@mui/icons-material/GTranslate";
import CalculateIcon from "@mui/icons-material/Calculate";
import FunctionsIcon from "@mui/icons-material/Functions";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import TerminalIcon from "@mui/icons-material/Terminal";
import BiotechIcon from "@mui/icons-material/Biotech";
import ArchitectureIcon from "@mui/icons-material/Architecture";
import SchoolIcon from "@mui/icons-material/School";

export default function MainListItems() {
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <ListItemButton
        onClick={() => {
          dispatch({ type: "SET_SCREEN_CONTENT", payload: "Lang1" });
        }}
      >
        <ListItemIcon>
          <GTranslateIcon />
        </ListItemIcon>
        <ListItemText primary="Jazyk 1" />
      </ListItemButton>

      <ListItemButton
        onClick={() => {
          dispatch({ type: "SET_SCREEN_CONTENT", payload: "MAT1" });
        }}
      >
        <ListItemIcon>
          <CalculateIcon />
        </ListItemIcon>
        <ListItemText primary="Matematika I" />
      </ListItemButton>

      <ListItemButton
        onClick={() => {
          dispatch({ type: "SET_SCREEN_CONTENT", payload: "RepMAT" });
        }}
      >
        <ListItemIcon>
          <FunctionsIcon />
        </ListItemIcon>
        <ListItemText primary="Repetitórium z matematiky" />
      </ListItemButton>

      <ListItemButton
        onClick={() => {
          dispatch({ type: "SET_SCREEN_CONTENT", payload: "TSV" });
        }}
      >
        <ListItemIcon>
          <FitnessCenterIcon />
        </ListItemIcon>
        <ListItemText primary="Telesná výchova I" />
      </ListItemButton>

      <ListItemButton
        onClick={() => {
          dispatch({ type: "SET_SCREEN_CONTENT", payload: "BasicPRG" });
        }}
      >
        <ListItemIcon>
          <TerminalIcon />
        </ListItemIcon>
        <ListItemText primary="Základy algoritmizácie a programovania" />
      </ListItemButton>

      <ListItemButton
        onClick={() => {
          dispatch({ type: "SET_SCREEN_CONTENT", payload: "BasicELE" });
        }}
      >
        <ListItemIcon>
          <BiotechIcon />
        </ListItemIcon>
        <ListItemText primary="Základy elektrotechnického inžinierstva" />
      </ListItemButton>

      <ListItemButton
        onClick={() => {
          dispatch({ type: "SET_SCREEN_CONTENT", payload: "BasicING" });
        }}
      >
        <ListItemIcon>
          <ArchitectureIcon />
        </ListItemIcon>
        <ListItemText primary="Základy inžinierstva materiálov" />
      </ListItemButton>

      <ListItemButton
        onClick={() => {
          dispatch({ type: "SET_SCREEN_CONTENT", payload: "IntroductionING" });
        }}
      >
        <ListItemIcon>
          <SchoolIcon />
        </ListItemIcon>
        <ListItemText primary="Úvod do inžinierstva" />
      </ListItemButton>
    </React.Fragment>
  );
}
