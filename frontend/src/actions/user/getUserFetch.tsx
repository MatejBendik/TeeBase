import { baseUrl } from "../../api/index";

export const getUserFetch = async (dispatch: any) => {
  const accessToken = localStorage.getItem("accessToken");
  const userId = localStorage.getItem("userId");

  try {
    const response = await fetch(`${baseUrl}/user/getUser/${userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 400) {
      const json = await response.json();
      alert(json.message);
      return;
    }

    if (response.status === 405) {
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
    dispatch({ type: "SET_USER_DATA", payload: json });

    return json;
  } catch (error) {
    console.error(error);
    return;
  }
};
