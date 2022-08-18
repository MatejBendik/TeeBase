import { useState } from "react";
import ContentEditable from "react-contenteditable";
import sanitizeHtml from "sanitize-html";
import { useSelector } from "react-redux";

import "./Lang1.css";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Paper from "@mui/material/Paper";
import Canvas2 from "../../../components/Canvas2/Canvas2";

import { saveNote } from "../../../actions/materials/saveNote";
import { saveTask } from "../../../actions/materials/saveTask";

export default function LANG1() {
  const userData = useSelector((state: any) => state.userData);

  /* Poznamky */
  const [checkedPoznamky, setCheckedPoznamky] = useState(true);
  const [editablePoznamky, setEditablepoznamky] = useState(false);
  const [editableDrawPoznamky, setEditableDrawPoznamky] = useState(false);

  const [newNote, setNewNote] = useState({
    userId: userData._id,
    subjectId: "1",
    type: "",
    content: "Sem môžeš pridať tvoju poznámku.",
  });

  /* Ulohy */
  const [checkedUlohy, setCheckedlohy] = useState(false);
  const [editableUlohy, setEditableUlohy] = useState(false);
  const [editableDrawUlohy, setEditableDrawUlohy] = useState(false);

  const sanitizeConf = {
    allowedTags: ["b", "i", "em", "strong", "a", "p", "h1", "h2", "h3", "img"],
    allowedAttributes: { a: ["href"], img: ["src"] },
  };

  const [newTask, setNewTask] = useState({
    userId: userData._id,
    subjectId: "1",
    type: "",
    content:
      "Sem môžeš pridať tvoju úlohu ..............................................................................................................................",
  });

  const sanitize = () => {
    setNewNote({
      ...newNote,
      content: sanitizeHtml(newNote.content, sanitizeConf),
    });
    setNewTask({
      ...newTask,
      content: sanitizeHtml(newTask.content, sanitizeConf),
    });
  };

  const poznamky = (
    <Paper sx={{ m: 1 }} elevation={4}>
      <div className="poznamky">
        <ContentEditable
          tagName="pre"
          html={newNote.content}
          disabled={true}
          onChange={() => {}}
        />

        <textarea
          className={editablePoznamky ? "show" : "hide"}
          value={newNote.content}
          onChange={(e: any) => {
            setNewNote({
              ...newNote,
              ["type"]: "poznamka",
              ["content"]: e.target.value,
            });
          }}
          onBlur={sanitize}
        />

        {editablePoznamky ? (
          <button
            className="setEdit"
            onClick={() => {
              setEditablepoznamky(!editablePoznamky);
              saveNote(newNote);
              setNewNote({
                ...newNote,
                ["userId"]: "",
                ["subjectId"]: "",
                ["type"]: "",
                ["content"]: "",
              });
            }}
          >
            Uložiť
          </button>
        ) : (
          <button
            className="setEdit"
            onClick={() => {
              setEditablepoznamky(!editablePoznamky);
            }}
          >
            Pridať poznámku
          </button>
        )}

        <div className={editableDrawPoznamky ? "showCanvas" : "hideCanvas"}>
          <Canvas2 />
        </div>

        {editableDrawPoznamky ? (
          <button
            style={{ marginLeft: 10 }}
            className="setEdit"
            onClick={() => {
              setEditableDrawPoznamky(!editableDrawPoznamky);
              saveNote(newNote);
            }}
          >
            Uložiť
          </button>
        ) : (
          <button
            style={{ marginLeft: 10 }}
            className="setEdit"
            onClick={() => {
              setEditableDrawPoznamky(!editableDrawPoznamky);
            }}
          >
            Nakresliť
          </button>
        )}
      </div>
    </Paper>
  );

  const ulohy = (
    <Paper sx={{ m: 1 }} elevation={4}>
      <div className="ulohy">
        <ContentEditable
          tagName="pre"
          html={newTask.content}
          disabled={true}
          onChange={() => {}}
        />

        <textarea
          className={editableUlohy ? "show" : "hide"}
          value={newTask.content}
          onChange={(e: any) => {
            setNewTask({
              ...newTask,
              ["type"]: "uloha",
              ["content"]: e.target.value,
            });
          }}
          onBlur={sanitize}
        />

        {editableUlohy ? (
          <button
            className="setEdit"
            onClick={() => {
              setEditableUlohy(!editableUlohy);
              saveTask(newTask);
              setNewTask({
                ...newTask,
                ["userId"]: "",
                ["subjectId"]: "",
                ["type"]: "",
                ["content"]: "",
              });
            }}
          >
            Uložiť
          </button>
        ) : (
          <button
            className="setEdit"
            onClick={() => {
              setEditableUlohy(!editableUlohy);
            }}
          >
            Pridať úlohu
          </button>
        )}
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
