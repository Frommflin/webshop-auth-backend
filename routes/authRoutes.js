import express from "express";

const router = express.Router();

router.post("/auth/login", (req, res) => {
  res.send("Login route");
});

router.post("/auth/register", (req, res) => {
  res.send("Register route");
});

export default router;
