import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/",
});

export const getNote = () =>
  api.get("/note/getLatestNote").then((res) => res.data);

export const updateNote = ({ id, ...updatedNote }: any) =>
  api.put(`/note/updateNote/${id}`, updatedNote).then((res) => res.data);
