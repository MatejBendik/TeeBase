import { baseUrl } from "../../api/index";
interface loginProperties {
  username: string;
  password: string;
  lat: String;
  lng: String;
}

export const sendLogin = async (
  { username, password, lat, lng }: loginProperties,
  navigate: any,
  dispatch: any
) => {
  try {
    const response = await fetch(`${baseUrl}/user/login`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        lat: lat,
        lng: lng,
      }),
    });

    if (response.status === 401) {
      const json = await response.json();
      alert(json.message);
      return;
    }

    if (response.status === 403) {
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
    localStorage.setItem("userId", json.user._id);
    await navigate("/app");
  } catch (error) {
    console.error(error);
    return;
  }
};
