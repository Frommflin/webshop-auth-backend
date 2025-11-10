import express from "express";
import loginController from "../controllers/loginController.js";
import registerController from "../controllers/registerController.js";
import deleteController from "../controllers/deleteController.js";
import requireAuth from "../middlewares/jwtauth.js";

const router = express.Router();

router.post("/auth/login", loginController);

router.post("/auth/register", registerController);

router.post("/auth/logout", (req, res) => {
  res.clearCookie("JWT");
  res.clearCookie("csrf_token");
  res.json({ success: true });
});

router.post("/auth/profile", requireAuth);

router.delete("/auth/delete", requireAuth, deleteController);

export default router;
