const promptManager = require('../utils/promptManager');
const geminiService = require('./geminiService');

async function handleLawBotChat(req, res) {
    try {
        const message = req.body?.message;
        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        const prompt = promptManager.getLawBotPrompt(message);
        const aiReply = await geminiService.getGeminiResponse(prompt);

        res.json({ reply: aiReply });
    } catch (err) {
        console.error("LawBot Error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = handleLawBotChat;
