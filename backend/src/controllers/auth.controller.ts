import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed });
  res.json(user);
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      message: "Login failed",
      data: null,
      error: "Please provide email and password",
    });
    return;
  }

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      res.status(401).json({
        message: "Login failed",
        data: null,
        error: "Invalid credentials",
      });
      return;
    }

    const match = await bcrypt.compare(password, user.password || "");

    if (!match) {
      res.status(401).json({
        message: "Login failed",
        data: null,
        error: "Invalid credentials",
      });
      return;
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "", {
      expiresIn: "7d",
    });

    res.status(200).json({
      message: "Login successful",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      },
    });
    return;
  } catch (err: any) {
    res.status(500).json({
      message: "Login failed",
      data: null,
      error: err.message,
    });
    return;
  }
};
