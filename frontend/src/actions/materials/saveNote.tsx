import { baseUrl } from "../../api/index";
export interface noteProperties {
  subjectID: string;
  userId: string;
  content: string;
}

export const saveNote = async (
  subjectID: string,
  userId: string,
  content: string
) => {
  try {
    const response = await fetch(`${baseUrl}/subject/saveNote/${subjectID}`, {
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
