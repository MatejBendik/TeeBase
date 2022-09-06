import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import ContentEditable from "react-contenteditable";
import sanitizeHtml from "sanitize-html";
import * as api from "../api/notesApi";

import Canvas2 from "../components/Canvas2/Canvas2";

export default function NotesList(props: any) {
  const [isEditting, setIsEditing] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  const [newNote, setNewNote] = useState({
    userId: props.userId,
    subjectId: props.subjectId,
    type: "",
    content: "",
  });

  const handleChange = (e: any) => {
    const { value } = e.target;
    setNewNote({ ...newNote, ["type"]: "note", ["content"]: value });
  };

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

  const handleSave = (e: any) => {
    console.log(newNote);
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
        className="contentNemenitelny"
        tagName="pre"
        html={isEditting ? newNote.content : data.content}
        disabled={true}
        onChange={handleChange}
      />

      <textarea
        className={isEditting ? "show" : "hide"}
        name="content"
        value={newNote.content}
        onChange={handleChange}
        onBlur={sanitize}
      />

      {isEditting ? (
        <button
          className="setEdit"
          onClick={() => {
            setIsEditing(!isEditting);
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
            setIsEditing(!isEditting);
            setNewNote({
              ...newNote,
              ["content"]: newNote.content,
            });
          }}
        >
          Upraviť poznámku
        </button>
      )}

      <div className={isDrawing ? "showCanvas" : "hideCanvas"}>
        <Canvas2 />
      </div>

      {isDrawing ? (
        <button
          style={{ marginLeft: 10 }}
          className="setEdit"
          onClick={() => {
            setIsDrawing(!isDrawing);
          }}
        >
          Uložiť
        </button>
      ) : (
        <button
          style={{ marginLeft: 10 }}
          className="setEdit"
          onClick={() => {
            setIsDrawing(!isDrawing);
          }}
        >
          Nakresliť
        </button>
      )}
    </>
  );
}
