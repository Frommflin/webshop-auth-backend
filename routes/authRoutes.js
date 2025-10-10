import express from "express";

const router = express.Router();

router.post("/auth/login", (req, res) => {
  res.send("Login route");
});

export default router;
