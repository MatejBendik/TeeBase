import { Response, Request } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user";

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  console.log(username, password);

  try {
    const existingUser = await User.findOne({ username });

    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist. " });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Wrong password" });

    const token = jwt.sign(
      {
        id: existingUser._id,
        username: existingUser.username,
        password: existingUser.password,
      },
      "test",
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Coškaj wrong s loginom" });
  }
};

export const register = async (req: Request, res: Response) => {
  const { firstName, lastName, email, username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser)
      return res.status(400).json({ message: "User already exists. " });

    if (!password) return res.status(400).json({ message: "Weak password" });

    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const result = await User.create({
      firstName,
      lastName,
      email,
      username,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: result._id, username: result.username, password: result.password },
      "test",
      { expiresIn: "1h" }
    );

    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Coškaj wrong s registerom" });
  }
};
