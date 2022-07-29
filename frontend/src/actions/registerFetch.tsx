export const sendRegister = async (
  firstName: string,
  lastName: string,
  email: string,
  username: string,
  password: string
) => {
  try {
    fetch("http://localhost:8080/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
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
        return data; //toto musime vyriešit - data = odpoved zo serverva ze je zaregistrovany = a odpoved neprichazda xd
      });
  } catch (error) {
    console.error(error);
    return;
  }
};
