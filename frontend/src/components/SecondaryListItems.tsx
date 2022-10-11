import * as React from "react";
import { useDispatch } from "react-redux";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import MapIcon from "@mui/icons-material/Map";

/* icons */
import AssignmentIcon from "@mui/icons-material/Assignment";

export default function SecondaryListItems() {
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <ListSubheader component="div" inset>
        Ostatné
      </ListSubheader>

      <ListItemButton
        onClick={() => {
          dispatch({ type: "SET_SCREEN_CONTENT", payload: "map" });
        }}
      >
        <ListItemIcon>
          <MapIcon />
        </ListItemIcon>
        <ListItemText primary="Kamoši" />
      </ListItemButton>
    </React.Fragment>
  );
}
