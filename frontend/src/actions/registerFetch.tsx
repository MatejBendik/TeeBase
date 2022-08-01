import { baseUrl } from "./../api/index";
interface registerProperties {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}

export const sendRegister = async ({
  firstName,
  lastName,
  email,
  username,
  password,
}: registerProperties) => {
  try {
    const response = await fetch(`${baseUrl}/user/register`, {
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
    });

    if (!response.ok) {
      console.log("Eror login response");
      return;
    }
    const json = await response.json();
    console.log(json);

    localStorage.setItem("accesToken", json.token);
  } catch (error) {
    console.error(error);
    return;
  }
};
