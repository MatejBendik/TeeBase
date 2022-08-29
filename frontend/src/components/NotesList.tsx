import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import ContentEditable from "react-contenteditable";
import sanitizeHtml from "sanitize-html";
import * as api from "../api/notesApi";

import Canvas2 from "../components/Canvas2/Canvas2";

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

  const handleChange = (e: any) => {
    const { value } = e.target;
    setNewNote({ ...newNote, ["type"]: "note", ["content"]: value });
  };

  // useMutation musi byt nad useQuery v kode

  const { mutate, status } = useMutation(api.updateNote);

  const { data, isLoading, isFetching, isError } = useQuery(
    ["getNote"],
    api.getNote
  );

  if (isLoading) return <p>Načítavam ...</p>;

  if (isError) return <p>Chyba pri načítavaní ! </p>;

  if (isFetching) return <p>Načítavam najnovšie dáta...</p>;

  return (
    <>
      {/*
      <ContentEditable
        tagName="pre"
        html={data.content}
        disabled={true}
        onChange={(e: any) => {
          setNewNote({
            ...newNote,
            ["type"]: "note",
            ["content"]: e.target.value,
          });
        }}
      />
      */}

      <ContentEditable
        tagName="pre"
        html={editablePoznamky ? newNote.content : data.content}
        disabled={true}
        onChange={handleChange}
      />

      <textarea
        className={editablePoznamky ? "show" : "hide"}
        value={newNote.content}
        onChange={handleChange}
        onBlur={sanitize}
      />

      {editablePoznamky ? (
        <button
          className="setEdit"
          onClick={() => {
            setEditablepoznamky(!editablePoznamky);
            //saveNote(newNote);
            setNewNote({
              ...newNote,
            });
            mutate(newNote);
          }}
        >
          Uložiť
        </button>
      ) : (
        <button
          className="setEdit"
          onClick={() => {
            setEditablepoznamky(!editablePoznamky);
            setNewNote({
              ...newNote,
              ["content"]: newNote.content,
            });
          }}
        >
          Upraviť poznámku
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
