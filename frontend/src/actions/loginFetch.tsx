import react from "react";

export const sendLogin = async (username: string, password: string) => {
  try {
    const response = await fetch("http://localhost:8080/login", {
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
    });

    if (!response.ok) {
      console.log("Eror login response");
      return;
    }
    const json = await response.json();

    localStorage.setItem("token", json.token);
  } catch (error) {
    console.error(error);
    return;
  }
};
