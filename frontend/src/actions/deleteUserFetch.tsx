import { baseUrl } from "./../api/index";

export const deleteUserFetch = async (userId: any, navigate: any) => {
  try {
    const response = await fetch(`${baseUrl}/user/deleteUser/${userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });

    if (response.status === 400) {
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
    alert(json.message);
    navigate("/");

    return json;
  } catch (error) {
    console.error(error);
    return;
  }
};
