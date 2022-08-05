import * as React from "react";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";

/* icons */
import GTranslateIcon from "@mui/icons-material/GTranslate";
import CalculateIcon from "@mui/icons-material/Calculate";
import FunctionsIcon from "@mui/icons-material/Functions";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import TerminalIcon from "@mui/icons-material/Terminal";
import BiotechIcon from "@mui/icons-material/Biotech";
import ArchitectureIcon from "@mui/icons-material/Architecture";
import SchoolIcon from "@mui/icons-material/School";
import AssignmentIcon from "@mui/icons-material/Assignment";

export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <GTranslateIcon />
      </ListItemIcon>
      <ListItemText primary="Jazyk 1" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <CalculateIcon />
      </ListItemIcon>
      <ListItemText primary="Matematika I" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <FunctionsIcon />
      </ListItemIcon>
      <ListItemText primary="Repetitórium z matematiky" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <FitnessCenterIcon />
      </ListItemIcon>
      <ListItemText primary="Telesná výchova I" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <TerminalIcon />
      </ListItemIcon>
      <ListItemText primary="Základy algoritmizácie a programovania" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <BiotechIcon />
      </ListItemIcon>
      <ListItemText primary="Základy elektrotechnického inžinierstva" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <ArchitectureIcon />
      </ListItemIcon>
      <ListItemText primary="Základy inžinierstva materiálov" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <SchoolIcon />
      </ListItemIcon>
      <ListItemText primary="Úvod do inžinierstva" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Ostatné
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Priemer známok" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Úlohy" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Písomky" />
    </ListItemButton>
  </React.Fragment>
);
