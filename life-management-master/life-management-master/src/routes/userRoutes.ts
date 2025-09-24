import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserModel, User } from '../models/userModel';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
  try {
    const { full_name, location, password } = req.body; // use full_name

    // Check if user already exists by full_name + location
    const existingUser = await UserModel.findByFullNameAndLocation(full_name, location);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const newUser: User = { full_name, location, password: hashedPassword }; // updated
    const user = await UserModel.create(newUser);

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, full_name: user.full_name },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: { id: user.id, full_name: user.full_name, location: user.location }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { full_name, location, password } = req.body; // use full_name

    // Find user by full_name and location
    const user = await UserModel.findByFullNameAndLocation(full_name, location);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, full_name: user.full_name },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: { id: user.id, full_name: user.full_name, location: user.location }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get current user profile
router.get('/profile', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const userId = req.user.userId;
    const user = await UserModel.findById(userId);

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Fetch all locations
router.get('/locations', async (req, res) => {
  try {
    const locations = await UserModel.getLocations();
    res.json({ locations });
  } catch (error) {
    console.error('Error fetching locations:', error); // <-- Log the actual error
    res.status(500).json({ message: 'Server error', error: (error as Error).message });
  }
});


export default router;
