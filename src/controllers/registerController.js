import { hashPassword } from "../utils/password.js";
import User from "../models/User.js";

const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email, and password are required" });
    }

    const passwordHash = await hashPassword(password);

    const newUser = new User({ name, email, passwordHash });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    console.error("Register error:", error);
  }
};

export default registerController;
