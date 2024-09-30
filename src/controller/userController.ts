import { Request, Response } from 'express';
import User from '../model/user';


export const getAllUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const generateUserId = (email: string): string => {
  const prefix = email.slice(0, 2);
  const randomNumber = Math.random().toString().slice(2, 10);
  return `${prefix}${randomNumber}`;
};


export const addUser = async (req: Request, res: Response): Promise<void> => {
  const { name, email } = req.body;

  if (!name || !email) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  try {

    const userId = generateUserId(email);

    const newUser = new User({
      userId,
      name,
      email
    });

    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error: any) {

    if (error.code === 11000) {
      res.status(400).json({ error: 'Email already exists' });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

