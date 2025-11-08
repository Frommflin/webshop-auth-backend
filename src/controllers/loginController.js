import User from "../models/User.js";
import { comparePassword } from "../utils/password.js";
import { newCsrfToken } from "../middlewares/csrf.js";
import jwt from "jsonwebtoken";

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

    const jwtToken = jwt.sign(
      { sub: user._id.toString(), email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const csrfToken = newCsrfToken();

    res.cookie("JWT", jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      path: "/",
    });

    res.cookie("csrf_token", csrfToken, {
      httpOnly: false,
      sameSite: "Strict",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    return res.status(200).json({
      message: "Login successful",
      user: user.toPublicJSON(),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    console.error("Login error:", error);
  }
};

export default loginController;
