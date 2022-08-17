import { baseUrl } from "../../api/index";
export interface noteProperties {
  subjectId: string;
  userId: string;
  type: string;
  content: string;
}

export const saveNote = async ({
  subjectId,
  userId,
  type,
  content,
}: noteProperties) => {
  try {
    console.log(subjectId, userId, type, content);
    const response = await fetch(`${baseUrl}/note/saveNote`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        creatorId: userId,
        subjectId: subjectId,
        type: type,
        content: content,
      }),
    });

    if (response.status === 500) {
      const json = await response.json();
      alert(json.message);
      return;
    }

    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.error(error);
    return;
  }
};
