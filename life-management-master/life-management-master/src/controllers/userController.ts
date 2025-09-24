import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserModel, User } from '../models/userModel';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { full_name, location, password } = req.body; // changed here

    // Check if user already exists
    const existingUser = await UserModel.findByFullNameAndLocation(full_name, location);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists in this location' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user: User = { full_name, location, password: hashedPassword }; // updated
    const newUser = await UserModel.create(user);

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser.id, full_name: newUser.full_name, location: newUser.location },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    res.status(201).json({ message: 'User registered successfully', token, user: newUser });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { full_name, location, password } = req.body; // changed here

    // Find user by full_name and location
    const user = await UserModel.findByFullNameAndLocation(full_name, location);
    if (!user) {
      return res.status(400).json({ message: 'Invalid full name or location' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, full_name: user.full_name, location: user.location },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    res.json({ message: 'Login successful', token, user });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};
