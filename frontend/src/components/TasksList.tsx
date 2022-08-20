import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ContentEditable from "react-contenteditable";
import sanitizeHtml from "sanitize-html";

import Canvas2 from "../components/Canvas2/Canvas2";

import { baseUrl } from "../api/index";
import { saveTask } from "../actions/materials/saveTask";

export default function TasksList(props: any) {
  const [editableUlohy, setEditableUlohy] = useState(false);
  const [editableDrawUlohy, setEditableDrawUlohy] = useState(false);

  const [newTask, setNewTask] = useState({
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
    setNewTask({
      ...newTask,
      content: sanitizeHtml(newTask.content, sanitizeConf),
    });
  };

  const { isLoading, error, data, refetch } = useQuery(["getTasks"], () =>
    fetch(`${baseUrl}/task/getTasks/${props.userId}/${props.subjectId}`).then(
      (res) => res.json()
    )
  );
  let tasks = data;
  console.log(tasks);

  if (isLoading) return <p>Načítavam ...</p>;

  if (error) return <p>Chyba pri načítavaní ! </p>;

  return (
    <>
      {tasks.map((task: any) => (
        <ContentEditable
          tagName="pre"
          html={task.content}
          disabled={true}
          onChange={() => {}}
        />
      ))}

      <ContentEditable
        tagName="pre"
        html={newTask.content}
        disabled={true}
        onChange={() => {}}
      />

      <textarea
        className={editableDrawUlohy ? "show" : "hide"}
        value={newTask.content}
        onChange={(e: any) => {
          setNewTask({
            ...newTask,
            ["type"]: "task",
            ["content"]: e.target.value,
          });
        }}
        onBlur={sanitize}
      />

      {editableDrawUlohy ? (
        <button
          className="setEdit"
          onClick={() => {
            setEditableUlohy(!editableDrawUlohy);
            saveTask(newTask);
            refetch();
            setNewTask({
              ...newTask,
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
          Pridať poznámku
        </button>
      )}

      <div className={editableDrawUlohy ? "showCanvas" : "hideCanvas"}>
        <Canvas2 />
      </div>

      {editableDrawUlohy ? (
        <button
          style={{ marginLeft: 10 }}
          className="setEdit"
          onClick={() => {
            setEditableDrawUlohy(!editableDrawUlohy);
          }}
        >
          Uložiť
        </button>
      ) : (
        <button
          style={{ marginLeft: 10 }}
          className="setEdit"
          onClick={() => {
            setEditableDrawUlohy(!editableDrawUlohy);
          }}
        >
          Nakresliť
        </button>
      )}
    </>
  );
}
