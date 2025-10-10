import express from "express";

const router = express.Router();

router.post("/auth/login", (req, res) => {
  res.send("Login route");
});

router.post("/auth/register", (req, res) => {
  res.send("Register route");
});

router.post("/auth/logout", (req, res) => {
  res.send("Logout route");
});

router.post("/auth/profile", (req, res) => {
  res.send("Profile route");
});

export default router;
