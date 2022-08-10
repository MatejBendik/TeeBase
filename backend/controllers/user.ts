require("dotenv").config();
import { Response, Request } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user";

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username: username });
    if (!existingUser) {
      return res.status(401).json({ message: "Používateľ neexistuje !" });
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if (!passwordMatch) {
      return res.status(403).json({ message: "Heslo sa nezhoduje s menom" });
    }

    const token = jwt.sign(
      {
        id: existingUser._id,
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
    res.status(500).json({ message: "Chyba servera" });
  }
};

export const register = async (req: Request, res: Response) => {
  const { firstName, lastName, email, username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res
        .status(400)
        .json({ message: "Užívateľ s týmto nickom už existuje !" });

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
    res.status(500).json({ message: "Chyba servera" });
  }
};

export function authenticateToken(req: Request, res: Response, next: any) {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) console.log(token);
  return res.status(404).json({ message: "Neautorizovaný !" });

  const JWT_SECRET = process.env.JWT_SECRET ?? "nie je";

  jwt.verify(token, JWT_SECRET, (err: any, data: any) => {
    if (err)
      return res.status(405).json({ message: "Error with authentication!" });

    next();
  });
}

export const getUser = async (req: Request, res: Response) => {
  const userId = req.params.id;

  try {
    const existingUser = await User.findById(userId);

    if (!existingUser) {
      return res.status(400).json({ message: "Uživateľ sa nenašiel !" });
    }

    res.status(200).json(existingUser);
  } catch (error) {
    res.status(500).json({ message: "Nepodarilo sa načítat profil" });
  }
};

export const deleteUser = async (req: Request, res: Response, next: any) => {
  const userId = req.params.id;

  try {
    /* authenticateToken(req, res, next); */
    const existingUser = await User.findByIdAndDelete(userId);

    if (!existingUser) {
      return res.status(400).json({ message: "Uživateľ sa nenašiel !" });
    }

    res.status(200).json({ message: "Účet bol úspešne vymazaný" });
  } catch (error) {
    res.status(500).json({ message: "Nepodarilo sa načítat profil" });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const { oldPassword, newPassword, copyNewPassword } = req.body;

  try {
    const existingUser = await User.findById(userId);

    if (!existingUser) {
      return res.status(400).json({ message: "Uživateľ sa nenašiel !" });
    }

    const passwordMatch = await bcrypt.compare(
      oldPassword,
      existingUser.password
    );
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ message: "Heslo sa nezhoduje s vasím učtom" });
    }

    if (newPassword === oldPassword) {
      return res
        .status(402)
        .json({ message: "Nové heslo sa zhoduje so starým !" });
    }

    if (newPassword !== copyNewPassword) {
      return res.status(403).json({ message: "Nové heslá sa nezhodujú !" });
    }

    let newHashedPassword = await bcrypt.hash(newPassword, 12);

    User.updateOne(
      { _id: userId },
      { password: newHashedPassword },
      (err: any, user: any) => {
        console.log(err);
      }
    );

    res.status(200).json({ message: "Heslo bolo zmenené" });
  } catch (error) {
    res.status(500).json({ message: "Nepodarilo sa načítat profil" });
  }
};

export const editUser = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const { firstName, lastName, email, username } = req.body;

  try {
    const existingUser = await User.findById(userId);

    if (!existingUser) {
      return res.status(400).json({ message: "Uživateľ sa nenašiel !" });
    }

    User.updateOne(
      { _id: userId },
      {
        firstName: firstName,
        lastName: lastName,
        email: email,
        username: username,
      },
      (err: any, user: any) => {
        console.log(err);
      }
    );

    res.status(200).json({ message: "Zmeny boly uložené" });
  } catch (error) {
    res.status(500).json({ message: "Nepodarilo sa načítat profil" });
  }
};
