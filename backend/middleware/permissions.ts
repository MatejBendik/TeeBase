import User from "../models/user";
import jwt from "jsonwebtoken";

const requiresAuth = async (req: any, res: any, next: any) => {
  const token = req.cookies["access-token"];
  let isAuthed = false;

  if (token) {
    try {
      const id = jwt.verify(token, process.env.JWT_SECRET as string);

      try {
        const user = await User.findById(id);

        if (user) {
          const userToReturn = { ...user };
          req.user = userToReturn;
          isAuthed = true;
        }
      } catch {
        isAuthed = false;
      }
    } catch {
      isAuthed = false;
    }
  }

  if (isAuthed) {
    return next();
  } else {
    return res.status(401).send("Unauthorized");
  }
};

export default requiresAuth;
