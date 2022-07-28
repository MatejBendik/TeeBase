import React from "react";
import { useQuery } from "@tanstack/react-query";
/* export interface LoginCredentials {
  username: string;
  password: string;
}
 */

export const sendLogin = async (username: string, password: string) => {
  try {
    fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          console.log("Eror post");
          return;
        }
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        return data;
      });
  } catch (error) {
    console.error(error);
    return;
  }
};

/* export const send = () => {
  const { status, data } = useQuery(["login"], sendLogin);

  if (status === "loading") {
    return "Loading";
  }

  if (status === "error") {
    return "Error";
  }

  return data;
}; */
