import { useState } from "react";
import ContentEditable from "react-contenteditable";
import sanitizeHtml from "sanitize-html";

import "./Lang1.css";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Paper from "@mui/material/Paper";

import { saveNote } from "./../../../actions/saveNote";

export default function LANG1() {
  /* Poznamky */
  const [checkedPoznamky, setCheckedPoznamky] = useState(true);
  const [contentPoznamky, editContentPoznamky] = useState(
    "Sem môžeš začať pridávať svoje poznámky ..."
  );
  const [editablePoznamky, setRditablepoznamky] = useState(false);

  /* Ulohy */
  const [checkedUlohy, setCheckedlohy] = useState(false);
  const [contentULohy, editContentUlohy] = useState(
    "Sem môžeš začať pridávať svoje úlohy ....................................................................................... ..............."
  );
  const [editableUlohy, setEditableUlohy] = useState(false);

  const sanitizeConf = {
    allowedTags: ["b", "i", "em", "strong", "a", "p", "h1", "h2", "h3", "img"],
    allowedAttributes: { a: ["href"], img: ["src"] },
  };

  const sanitize = () => {
    editContentPoznamky(sanitizeHtml(contentPoznamky, sanitizeConf));
  };

  const poznamky = (
    <Paper sx={{ m: 1 }} elevation={4}>
      <div className="poznamky">
        <ContentEditable
          tagName="pre"
          html={contentPoznamky}
          disabled={true}
          onChange={() => {}}
        />

        <textarea
          className={editablePoznamky ? "show" : "hide"}
          value={contentPoznamky}
          onChange={(e: any) => {
            editContentPoznamky(e.target.value);
          }}
          onBlur={sanitize}
        />

        <button
          className="setEdit"
          onClick={() => {
            setRditablepoznamky(!editablePoznamky);
          }}
        >
          {editablePoznamky ? "Uložiť" : "Pridať"}
        </button>
      </div>
    </Paper>
  );

  const ulohy = (
    <Paper sx={{ m: 1 }} elevation={4}>
      <div className="ulohy">
        <ContentEditable
          tagName="pre"
          html={contentULohy}
          disabled={true}
          onChange={() => {}}
        />

        <textarea
          className={editableUlohy ? "show" : "hide"}
          value={contentULohy}
          onChange={(e: any) => {
            editContentUlohy(e.target.value);
          }}
          onBlur={sanitize}
        />

        <button
          className="setEdit"
          onClick={() => {
            setEditableUlohy(!editableUlohy);
            saveNote("111", "Nova poznamocka");
          }}
        >
          {editableUlohy ? "Uložiť" : "Pridať"}
        </button>
      </div>
    </Paper>
  );

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
          <Box sx={{ width: "100%" }}>
            <Collapse
              orientation="horizontal"
              in={checkedPoznamky}
              collapsedSize={250}
              timeout={500}
            >
              {poznamky}
            </Collapse>
          </Box>

          <Box>
            <Collapse
              orientation="horizontal"
              in={checkedUlohy}
              collapsedSize={250}
              timeout={500}
            >
              {ulohy}
            </Collapse>
          </Box>
        </div>
      </Box>
    </>
  );
}
