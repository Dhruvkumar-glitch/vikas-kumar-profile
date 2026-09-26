import express from "express";
import Profile from "../models/Profile.js";

const router = express.Router();

// POST /api/chat  { message }
// A small AI assistant that answers visitor questions using the
// profile data as context, via the Google Gemini API.
router.post("/", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message || !message.trim()) {
      return res.status(400).json({ message: "message is required" });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        message: "GEMINI_API_KEY not set on server. Add it to server/.env to enable the AI chat."
      });
    }

    const profile = await Profile.findOne();
    const context = profile
      ? JSON.stringify({
          name: profile.name,
          role: profile.role,
          company: profile.company,
          tagline: profile.tagline,
          bio: profile.bio,
          about: profile.about,
          experience: profile.experience,
          contact: profile.contact
        })
      : "{}";

    const systemPrompt = `You are a helpful assistant embedded on ${profile?.name || "this person"}'s professional profile website. Answer visitor questions using ONLY the profile information below. Be concise (2-4 sentences), professional, and friendly. If asked something not covered by the profile, politely say you don't have that information and suggest using the contact details on the page.

Profile data:
${context}`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: `${systemPrompt}\n\nVisitor question: ${message}` }]
            }
          ]
        })
      }
    );

    const data = await response.json(); console.log("Gemini API response:", JSON.stringify(data));
    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't generate a response right now.";

    res.json({ reply });
  } catch (err) {
    res.status(500).json({ message: "Chat error", error: err.message });
  }
});

export default router;
