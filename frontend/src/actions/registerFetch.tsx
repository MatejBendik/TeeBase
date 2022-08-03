import { baseUrl } from "./../api/index";
interface registerProperties {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}

export const sendRegister = async (
  { firstName, lastName, email, username, password }: registerProperties,
  navigate: any
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
    localStorage.setItem("accesToken", json.token);
    localStorage.setItem("user_id", json.newUser._id);
    navigate("/app");
  } catch (error) {
    console.error(error);
    return;
  }
};
