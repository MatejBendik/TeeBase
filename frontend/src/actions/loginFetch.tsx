import { baseUrl } from "./../api/index";

interface loginProperties {
  username: string;
  password: string;
}

export const sendLogin = async ({ username, password }: loginProperties) => {
  try {
    const response = await fetch(`${baseUrl}/login`, {
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
