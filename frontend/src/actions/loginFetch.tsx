import react from "react";

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
      //.then((res) => res.json())
      .then((data) => {
        console.log(data);
        return data; //toto musime vyriešit - data = odpoved zo serverva ze je prihlaseny, takže dostat token treba  = a odpoved neprichazda xd
      });
  } catch (error) {
    console.error(error);
    return;
  }
};
