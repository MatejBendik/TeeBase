import { useState } from "react";
import { useSelector } from "react-redux";

import "./subjectStyle.css";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Paper from "@mui/material/Paper";

import NotesList from "../../../components/NotesList";
import TasksList from "../../../components/TasksList";

export default function LANG1() {
  const userData = useSelector((state: any) => state.userData);
  const [checkedPoznamky, setCheckedPoznamky] = useState(true);
  const [checkedUlohy, setCheckedlohy] = useState(false);

  return (
    <>
      <div className="switchContainer">
        <h3
          onClick={() => {
            setCheckedPoznamky(true);
            setCheckedlohy(false);
          }}
        >
          Poznámky
        </h3>
        <h3
          onClick={() => {
            setCheckedPoznamky(false);

            setCheckedlohy(true);
          }}
        >
          Úlohy
        </h3>
      </div>

      <Box
        sx={{
          flex: 1,
        }}
      >
        <div className="container">
          {/* Poznamky */}
          <Box sx={{ width: "100%", marginLeft: "25%" }}>
            <Collapse
              orientation="horizontal"
              in={checkedPoznamky}
              collapsedSize={250}
              timeout={500}
            >
              <Paper sx={{ m: 1 }} elevation={4}>
                <div className="poznamky">
                  <NotesList userId={userData._id} subjectId={1} />
                </div>
              </Paper>
            </Collapse>
          </Box>

          {/* Ulohy */}
          <Box sx={{ width: "100%" }}>
            <Collapse
              orientation="horizontal"
              in={checkedUlohy}
              collapsedSize={250}
              timeout={500}
            >
              <Paper sx={{ m: 1 }} elevation={4}>
                <div className="ulohy">
                  <TasksList userId={userData._id} subjectId={1} />
                </div>
              </Paper>
            </Collapse>
          </Box>
        </div>
      </Box>
    </>
  );
}
