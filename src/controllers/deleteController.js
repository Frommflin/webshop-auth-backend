import User from "../models/User.js";

const deleteController = async (req, res) => {
  try {
    const userId = req.auth?.userId;

    if (!userId) {
      return res.status(400).json({ message: "No user id" });
    }

    const deleted = await User.findByIdAndDelete(userId);

    if (!deleted) {
      return res.status(404).json({ message: "User not found" });
    }

    res.clearCookie("JWT");
    res.clearCookie("csrf_token");

    return res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error("Delete account error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export default deleteController;
