import * as React from "react";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";

/* icons */
import AssignmentIcon from "@mui/icons-material/Assignment";

export default function SecondaryListItems() {
  return (
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
}
