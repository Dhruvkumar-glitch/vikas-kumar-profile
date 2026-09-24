import express from "express";
import Profile from "../models/Profile.js";
import { requireAdmin } from "../middleware/auth.js";

const router = express.Router();

// GET the profile (public - single-profile site)
router.get("/", async (req, res) => {
  try {
    const profile = await Profile.findOne();
    if (!profile) {
      return res.status(404).json({ message: "Profile not found. Run npm run seed in /server first." });
    }
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// UPDATE the profile (admin only)
router.put("/", requireAdmin, async (req, res) => {
  try {
    const profile = await Profile.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true
    });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
