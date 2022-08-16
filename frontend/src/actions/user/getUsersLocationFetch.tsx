import { baseUrl } from "../../api/index";

export const getUsersLocationFetch = async (dispatch: any) => {
  const accessToken = localStorage.getItem("accessToken");
  const userId = localStorage.getItem("userId");

  try {
    const response = await fetch(`${baseUrl}/user/getUsersLocation`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 500) {
      const json = await response.json();
      alert(json.message);
      return;
    }

    const json = await response.json();
    /*     dispatch({ type: "SET_USERS_LOCATIONS", payload: json });*/
    return json;
  } catch (error) {
    console.error(error);
    return;
  }
};
