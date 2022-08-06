import { baseUrl } from "./../api/index";
interface loginProperties {
  id: string;
  oldPassword: string;
  newPassword: string;
  copyNewPassword: string;
}

export const changePasswordFetch = async ({
  id,
  oldPassword,
  newPassword,
  copyNewPassword,
}: loginProperties) => {
  try {
    const response = await fetch(`${baseUrl}/user/${id}/changePassword`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        oldPassword: oldPassword,
        newPassword: newPassword,
        copyNewPassword: copyNewPassword,
      }),
    });

    if (response.status === 400) {
      const json = await response.json();
      alert(json.message);
      return;
    }

    if (response.status === 401) {
      const json = await response.json();
      alert(json.message);
      return;
    }

    if (response.status === 402) {
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
    alert(json.message);
  } catch (error) {
    console.error(error);
    return;
  }
};
