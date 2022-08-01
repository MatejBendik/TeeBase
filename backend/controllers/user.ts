require("dotenv").config();
import { Response, Request } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username: username });

    if (!existingUser){
      return res.status(400).json({ error: "User doesn't exist. ", user: existingUser });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!passwordMatch) {
      return res.status(400).json({ message: "There was a problem with login" });
    }

    const token = jwt.sign(
      {
        id: existingUser._id
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    /* cookies nejdu
    res.cookie("access-token", token, { 
      expires: new Date(Date.now() * 3600000),         // cas sa zadava v ms, 1hod = 3 600 000ms 
      httpOnly: true,
      secure: process.env.NODE_ENV === "production"    // ked to je v produkcii secure je true, ked ne ta false, ked je true tak v produkcii musime mat SSL
    });
    */
    return res.status(200).json({ user: existingUser, token: token });
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

    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      username,
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        id: newUser._id,
        username: newUser.username,
        password: newUser.password,
      },
      "test",
      { expiresIn: "1h" }
    );

    newUser.save();
    res.status(200).json({ newUser, token });
  } catch (error) {
    res.status(500).json({ message: "Coškaj wrong s registerom" });
  }
};
