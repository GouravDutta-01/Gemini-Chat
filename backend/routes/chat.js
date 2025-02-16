const express = require("express");
const axios = require("axios");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent",
      { contents: [{ role: "user", parts: [{ text: req.body.message }] }] },
      { params: { key: process.env.GEMINI_API_KEY } }
    );

    res.json({ reply: response.data.candidates[0].content.parts[0].text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error in AI response" });
  }
});

module.exports = router;
