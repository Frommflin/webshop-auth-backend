import express from "express";
import loginController from "../controllers/loginController.js";
import registerController from "../controllers/registerController.js";

const router = express.Router();

router.post("/auth/login", loginController);

router.post("/auth/register", registerController);

router.post("/auth/logout", (req, res) => {
  res.send("Logout route");
});

router.post("/auth/profile", (req, res) => {
  res.send("Profile route");
});

export default router;
