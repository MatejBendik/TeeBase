import { baseUrl } from "./../api/index";

export const deleteUserFetch = async (userId: any, navigate: any) => {
  const accessToken = localStorage.getItem("accessToken");

  try {
    const response = await fetch(`${baseUrl}/user/deleteUser/${userId}`, {
      method: "DELETE",
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
