import express from "express";

const router = express.Router();

// POST /api/admin/login  { password }
// Returns a token (the password itself) if correct, which the
// dashboard then sends as "Authorization: Bearer <token>" on PUT /api/profile.
router.post("/login", (req, res) => {
  const { password } = req.body;

  if (!process.env.ADMIN_PASSWORD) {
    return res.status(500).json({ message: "ADMIN_PASSWORD not set on server" });
  }

  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ message: "Incorrect password" });
  }

  res.json({ token: password });
});

export default router;
