import { baseUrl } from "../../api/index";
interface registerProperties {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  lat: String;
  lng: String;
}

export const sendRegister = async (
  {
    firstName,
    lastName,
    email,
    username,
    password,
    lat,
    lng,
  }: registerProperties,
  navigate: any,
  saveNote: any,
  saveTask: any
) => {
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
        lat: lat,
        lng: lng,
      }),
    });

    if (response.status == 400) {
      const json = await response.json();
      alert(json.message);
      return;
    }

    if (response.status === 500) {
      const json = await response.json();
      alert(json.message);
      return;
    }

    const json = await response.json();
    localStorage.setItem("accessToken", json.token);
    localStorage.setItem("userId", json.newUser._id);

    await navigate("/app");
  } catch (error) {
    console.error(error);
    return;
  }
};
