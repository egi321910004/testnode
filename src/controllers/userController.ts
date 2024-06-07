import { Request, Response } from "express";
import User, { IUser } from "../models/userModel";

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, identity_number, email, date_of_birth } = req.body;
    const user: IUser = new User({
      name,
      identity_number,
      email,
      date_of_birth,
    });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(400).json({ message: errorMessage });
  }
};
