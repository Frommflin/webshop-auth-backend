import User from "../models/User.js";
import { comparePassword } from "../utils/password.js";

const loginController = async (req, res) => {
  try {
    const { email = "", password = "" } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const user = await User.findOne({ email }).select("+passwordHash");
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const ok = await comparePassword(password, user.passwordHash);
    if (!ok) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    res.status(200).json({
      message: "Login successful",
      user: user.toPublicJSON(),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    console.error("Login error:", error);
  }
};

export default loginController;
