import { useState } from "react";
import ContentEditable from "react-contenteditable";
import "./Lang1.css";
import sanitizeHtml from "sanitize-html";

import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Paper from "@mui/material/Paper";

export default function LANG1() {
  const [checkedPoznamky, setCheckedPoznamky] = useState(true);
  const [checkedUlohy, setCheckedlohy] = useState(false);

  const [content, editContent] = useState("s");
  const [editable, setRditable] = useState(false);

  const handleChange = (textPrisiel: string) => {
    editContent(textPrisiel);
  };

  const sanitizeConf = {
    allowedTags: ["b", "i", "em", "strong", "a", "p", "h1", "img"],
    allowedAttributes: { a: ["href"], img: ["src"] },
  };

  const sanitize = () => {
    editContent(sanitizeHtml(content, sanitizeConf));
  };

  const poznamky = (
    <Paper sx={{ m: 1 }} elevation={4}>
      <div className="poznamky">
        <h2>Plechy</h2>
        <ContentEditable
          tagName="pre"
          html={content}
          disabled={true}
          onChange={(e: any) => {
            handleChange(e.target.value);
          }}
        />

        <textarea
          style={{ minWidth: "100%", height: 100 }}
          className={editable ? "show" : "hide"}
          value={content}
          onChange={(e: any) => {
            handleChange(e.target.value);
          }}
          onBlur={sanitize}
        />

        <button
          onClick={() => {
            setRditable(!editable);
          }}
        >
          {editable ? "Uložiť" : "Upraviť"}
        </button>

        <p>
          hyUlohyUloh sasdasdd saltRoundsasas sa s asasdasdd saltRoundsasas sa s
          asasdasdd saltRoundsasas sa s asasdasdd saltRoundsasas sa s asasdasdd
          saltRoundsasas sa s asasdasdd saltRoundsasas sa s as asdasdd
          saltRoundsasas sa s asasdasdd saltRoundsasas sa s as hyUlohyUloh
          sasdasdd saltRoundsasas sa s asasdasdd saltRoundsasas sa s asasdasdd
          saltRoundsasas sa s asasdasdd saltRoundsasas sa s asasdasdd
          saltRoundsasas sa s asasdasdd saltRoundsasas sa s as
          asyUlohyUlohyUlohy hyUlohyUloh sasdasdd saltRoundsasas sa s asasdasdd
          saltRoundsasas sa s asasdasdd saltRoundsasas sa s asasdasdd
          saltRoundsasas sa s asasdasdd saltRoundsasas sa s asasdasdd
          saltRoundsasas sa s as as hyUlohyUloh sasdasdd saltRoundsasas sa s
          asasdasdd saltRoundsasas sa s asasdasdd saltRoundsasas sa s
          hyUlohyUloh sasdasdd saltRoundsasas sa s asasdasdd saltRoundsasas sa s
          asasdasdd saltRoundsasas sa
        </p>
        <h2>Materiály</h2>
        <p>
          hyUlohyUloh sasdasdd saltRoundsasas sa s asasdasdd saltRoundsasas sa s
          asasdasdd saltRoundsasas sa s asasdasdd saltRoundsasas sa s asasdasdd
          saltRoundsasas sa s asasdasdd saltRoundsasas sa s as asdasdd
          saltRoundsasas sa s asasdasdd saltRoundsasas sa s as hyUlohyUloh
          sasdasdd saltRoundsasas sa s asasdasdd saltRoundsasas sa s asasdasdd
          saltRoundsasas sa s asasdasdd saltRoundsasas sa s asasdasdd
          saltRoundsasas sa s asasdasdd saltRoundsasas sa s as
          asyUlohyUlohyUlohy hyUlohyUloh sasdasdd saltRoundsasas sa s asasdasdd
          saltRoundsasas sa s asasdasdd saltRoundsasas sa s asasdasdd
          saltRoundsasas sa s asasdasdd saltRoundsasas sa s asasdasdd
          saltRoundsasas sa s as as hyUlohyUloh sasdasdd saltRoundsasas sa s
          asasdasdd saltRoundsasas sa s asasdasdd saltRoundsasas sa s
          hyUlohyUloh sasdasdd saltRoundsasas sa s asasdasdd saltRoundsasas sa s
          asasdasdd saltRoundsasas sa
        </p>
        <h2>Výroba</h2>
        <p>
          hyUlohyUloh sasdasdd saltRoundsasas sa s asasdasdd saltRoundsasas sa s
          asasdasdd saltRoundsasas sa s asasdasdd saltRoundsasas sa s asasdasdd
          saltRoundsasas sa s asasdasdd saltRoundsasas sa s as asdasdd
          saltRoundsasas sa s asasdasdd saltRoundsasas sa s as hyUlohyUloh
          sasdasdd saltRoundsasas sa s asasdasdd saltRoundsasas sa s asasdasdd
          saltRoundsasas sa s asasdasdd saltRoundsasas sa s asasdasdd
          saltRoundsasas sa s asasdasdd saltRoundsasas sa s as
          asyUlohyUlohyUlohy hyUlohyUloh sasdasdd saltRoundsasas sa s asasdasdd
          saltRoundsasas sa s asasdasdd saltRoundsasas sa s asasdasdd
          saltRoundsasas sa s asasdasdd saltRoundsasas sa s asasdasdd
          saltRoundsasas sa s as as hyUlohyUloh sasdasdd saltRoundsasas sa s
          asasdasdd saltRoundsasas sa s asasdasdd saltRoundsasas sa s
          hyUlohyUloh sasdasdd saltRoundsasas sa s asasdasdd saltRoundsasas sa s
          asasdasdd saltRoundsasas sa
        </p>
        <h2>Výroba</h2>
        <p>
          hyUlohyUloh sasdasdd saltRoundsasas sa s asasdasdd saltRoundsasas sa s
          asasdasdd saltRoundsasas sa s asasdasdd saltRoundsasas sa s asasdasdd
          saltRoundsasas sa s asasdasdd saltRoundsasas sa s as asdasdd
          saltRoundsasas sa s asasdasdd saltRoundsasas sa s as hyUlohyUloh
          sasdasdd saltRoundsasas sa s asasdasdd saltRoundsasas sa s asasdasdd
          saltRoundsasas sa s asasdasdd saltRoundsasas sa s asasdasdd
          saltRoundsasas sa s asasdasdd saltRoundsasas sa s as
          asyUlohyUlohyUlohy hyUlohyUloh sasdasdd saltRoundsasas sa s asasdasdd
          saltRoundsasas sa s asasdasdd saltRoundsasas sa s asasdasdd
          saltRoundsasas sa s asasdasdd saltRoundsasas sa s asasdasdd
          saltRoundsasas sa s as as hyUlohyUloh sasdasdd saltRoundsasas sa s
          asasdasdd saltRoundsasas sa s asasdasdd saltRoundsasas sa s
          hyUlohyUloh sasdasdd saltRoundsasas sa s asasdasdd saltRoundsasas sa s
          asasdasdd saltRoundsasas sa
        </p>
      </div>
    </Paper>
  );

  const ulohy = (
    <Paper sx={{ m: 1 }} elevation={4}>
      <div className="ulohy">
        <h2>Domáca 1</h2>
        <p>
          hyUlohyUloh sasdasdd saltRoundsasas sa s asasdasdd saltRoundsasas sa s
          asasdasdd saltRoundsasas sa s asasdasdd saltRoundsasas sa s asasdasdd
          saltRoundsasas sa s asasdasdd saltRoundsasas sa s as asdasdd
          saltRoundsasas sa s asasdasdd saltRoundsasas sa s as hyUlohyUloh
          sasdasdd saltRoundsasas sa s asasdasdd saltRoundsasas sa s asasdasdd
          saltRoundsasas sa s asasdasdd saltRoundsasas sa s asasdasdd
          saltRoundsasas sa s asasdasdd saltRoundsasas sa s as
          asyUlohyUlohyUlohy hyUlohyUloh sasdasdd saltRoundsasas sa s asasdasdd
          saltRoundsasas sa s asasdasdd saltRoundsasas sa s asasdasdd
          saltRoundsasas sa s asasdasdd saltRoundsasas sa s asasdasdd
          saltRoundsasas sa s as as hyUlohyUloh sasdasdd saltRoundsasas sa s
          asasdasdd saltRoundsasas sa s asasdasdd saltRoundsasas sa s
          hyUlohyUloh sasdasdd saltRoundsasas sa s asasdasdd saltRoundsasas sa s
          asasdasdd saltRoundsasas sa
        </p>
        <h2>Domáca 2</h2>
        <p>
          hyUlohyUloh sasdasdd saltRoundsasas sa s asasdasdd saltRoundsasas sa s
          asasdasdd saltRoundsasas sa s asasdasdd saltRoundsasas sa s asasdasdd
          saltRoundsasas sa s asasdasdd saltRoundsasas sa s as asdasdd
          saltRoundsasas sa s asasdasdd saltRoundsasas sa s as hyUlohyUloh
          sasdasdd saltRoundsasas sa s asasdasdd saltRoundsasas sa s asasdasdd
          saltRoundsasas sa s asasdasdd saltRoundsasas sa s asasdasdd
          saltRoundsasas sa s asasdasdd saltRoundsasas sa s as
          asyUlohyUlohyUlohy hyUlohyUloh sasdasdd saltRoundsasas sa s asasdasdd
          saltRoundsasas sa s asasdasdd saltRoundsasas sa s asasdasdd
          saltRoundsasas sa s asasdasdd saltRoundsasas sa s asasdasdd
          saltRoundsasas sa s as as hyUlohyUloh sasdasdd saltRoundsasas sa s
          asasdasdd saltRoundsasas sa s asasdasdd saltRoundsasas sa s
          hyUlohyUloh sasdasdd saltRoundsasas sa s asasdasdd saltRoundsasas sa s
          asasdasdd saltRoundsasas sa
        </p>
        <h2>Domáca 3</h2>
        <p>
          hyUlohyUloh sasdasdd saltRoundsasas sa s asasdasdd saltRoundsasas sa s
          asasdasdd saltRoundsasas sa s asasdasdd saltRoundsasas sa s asasdasdd
          saltRoundsasas sa s asasdasdd saltRoundsasas sa s as asdasdd
          saltRoundsasas sa s asasdasdd saltRoundsasas sa s as hyUlohyUloh
          sasdasdd saltRoundsasas sa s asasdasdd saltRoundsasas sa s asasdasdd
          saltRoundsasas sa s asasdasdd saltRoundsasas sa s asasdasdd
          saltRoundsasas sa s asasdasdd saltRoundsasas sa s as
          asyUlohyUlohyUlohy hyUlohyUloh sasdasdd saltRoundsasas sa s asasdasdd
          saltRoundsasas sa s asasdasdd saltRoundsasas sa s asasdasdd
          saltRoundsasas sa s asasdasdd saltRoundsasas sa s asasdasdd
          saltRoundsasas sa s as as hyUlohyUloh sasdasdd saltRoundsasas sa s
          asasdasdd saltRoundsasas sa s asasdasdd saltRoundsasas sa s
          hyUlohyUloh sasdasdd saltRoundsasas sa s asasdasdd saltRoundsasas sa s
          asasdasdd saltRoundsasas sa
        </p>
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
