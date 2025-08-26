import express from "express";
import User from "../models/User.model.js";
import { protect } from "../middleware/auth.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = await User.findOne({ email });
    const userNameExits = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: "Email is already registered" });
    }
    if (userNameExits) {
      return res.status(400).json({ message: "Username is not available" });
    }
    const user = await User.create({ username, email, password });
    const token = generateToken(user._id);

    res.status(201).json({
      id: user._id,
      username: user.username,
      email: user.email,
      token,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Fill all the fields" });
    }

    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id);
    res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      token,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/me", protect, async (req, res) => {
  res.status(200).json(req.user);
});

// Generate jwt token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

export default router;
