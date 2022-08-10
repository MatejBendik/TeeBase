import { baseUrl } from "./../api/index";

interface userProperties {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}

export const editUserFetch = async ({
  id,
  firstName,
  lastName,
  username,
  email,
}: userProperties) => {
  const accessToken = localStorage.getItem("accessToken");

  try {
    const response = await fetch(`${baseUrl}/user/${id}/editUser`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
      }),
    });

    if (response.status === 500) {
      const json = await response.json();
      alert(json.message);
      return;
    }

    const json = await response.json();
    alert(json.message);
  } catch (error) {
    console.error(error);
    return;
  }
};
