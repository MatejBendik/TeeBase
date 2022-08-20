import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ContentEditable from "react-contenteditable";
import sanitizeHtml from "sanitize-html";

import Canvas2 from "../components/Canvas2/Canvas2";

import { baseUrl } from "../api/index";
import { saveNote } from "../actions/materials/saveNote";

export default function NotesList(props: any) {
  const [editablePoznamky, setEditablepoznamky] = useState(false);
  const [editableDrawPoznamky, setEditableDrawPoznamky] = useState(false);

  const [newNote, setNewNote] = useState({
    userId: props.userId,
    subjectId: props.subjectId,
    type: "",
    content: "",
  });

  const sanitizeConf = {
    allowedTags: ["b", "i", "em", "strong", "a", "p", "h1", "h2", "h3", "img"],
    allowedAttributes: { a: ["href"], img: ["src"] },
  };

  const sanitize = () => {
    setNewNote({
      ...newNote,
      content: sanitizeHtml(newNote.content, sanitizeConf),
    });
  };

  const { isLoading, error, data, refetch } = useQuery(["getNotes"], () =>
    fetch(`${baseUrl}/note/getNotes/${props.userId}/${props.subjectId}`).then(
      (res) => res.json()
    )
  );
  let notes = data;
  console.log(notes);

  if (isLoading) return <p>Načítavam ...</p>;

  if (error) return <p>Chyba pri načítavaní ! </p>;

  return (
    <>
      {notes.map((note: any) => (
        <ContentEditable
          tagName="pre"
          html={note.content}
          disabled={true}
          onChange={() => {}}
        />
      ))}

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
            refetch();
            setNewNote({
              ...newNote,
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
    </>
  );
}
