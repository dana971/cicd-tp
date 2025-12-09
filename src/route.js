const express = require("express");
const axios = require("axios");
const router = express.Router();
 
router.post("/ai-greet", async (req, res) => {
  const { name } = req.body;
  try {
    const apiKey = process.env.OPENROUTER_API_KEY;
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "kwaipilot/kat-coder-pro:free",
        messages: [
          { role: "user", content: `Rédige un message de bienvenue pour ${name}.` }
        ]
      },
      {
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        }
      }
    );
    const aiText = response.data.choices?.[0]?.message?.content;
    res.json({ greeting: aiText });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur OpenRouter" });
  }
});
 module.exports =  router;