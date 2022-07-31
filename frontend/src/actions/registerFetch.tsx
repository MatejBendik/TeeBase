interface registerProperties {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}

export const sendRegister = async ({
  firstName,
  lastName,
  email,
  username,
  password,
}: registerProperties) => {
  try {
    const response = await fetch("http://localhost:8080/register", {
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

    if (!response.ok) {
      console.log("Eror login response");
      return;
    }
    const json = await response.json();

    localStorage.setItem("reg", "registrovaný");
  } catch (error) {
    console.error(error);
    return;
  }
};
