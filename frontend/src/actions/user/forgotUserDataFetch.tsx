import { baseUrl } from "../../api/index";

interface userProperties {
  username: string;
  email: string;
}

export const forgotUserDataFetch = async ({
  username,
  email,
}: userProperties) => {
  try {
    const response = await fetch(`${baseUrl}/user/forgotUserDataFetch`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        username: username,
        email: email,
      }),
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
    return json;
  } catch (error) {
    console.error(error);
    return;
  }
};
