import { baseUrl } from "../../api/index";
interface noteProperties {
  userId: string;
  content: string;
}

export const saveNote = async (userId: any, content: any) => {
  try {
    const response = await fetch(`${baseUrl}/subject/saveNote/${1}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        userId: userId,
        content: content,
      }),
    });

    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.error(error);
    return;
  }
};
