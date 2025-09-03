import { NextFunction, Request, Response } from "express";
import User from "../../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.status(400).json({ message: "user is already exsist" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword });
    // Generate token
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      "your_jwt_secret",
      { expiresIn: "1h" }
    );

    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};

export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      "your_jwt_secret",
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find().populate("urls");
    res.status(201).json(users);
  } catch (err) {
    next(err);
  }
};
