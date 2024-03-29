import User from "../models/user.js";
import jwt from "jsonwebtoken";

const requiresAuth = async (req, res, next) => {
  const token = req.cookies["access-token"];
  let isAuthed = false;

  if (token) {
    try {
      const id = jwt.verify(token, process.env.JWT_SECRET);

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
