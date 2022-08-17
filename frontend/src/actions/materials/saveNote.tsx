import { baseUrl } from "../../api/index";
export interface noteProperties {
  subjectID: string;
  userId: string;
  content: string;
}

export const saveNote = async ({
  subjectID,
  userId,
  content,
}: noteProperties) => {
  try {
    console.log(subjectID, userId, content);
    const response = await fetch(`${baseUrl}/subject/saveNote`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        subjectID: subjectID,
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
