const promptManager = require('../utils/promptManager');
const geminiService = require('../controllers/geminiService');


async function handleUnifiedChat(req, res) {
    try {
        const body = req.body || {};
        const message = body.message;
        if (!message) return res.status(400).json({ error: "Message is required" });

        console.log("🔗 Unified Chat request received:", message.substring(0, 50) + "...");
        
        const prompt = promptManager.getUnifiedPrompt(message);
        const aiReply = await geminiService.getGeminiResponse(prompt);
        
        console.log("✅ Unified Chat response generated successfully");
        res.json({ reply: aiReply });
    } catch (err) {
        console.error("❌ Unified Chat Error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

function handleLawBotChat(req, res) {
    const message = req.body?.message;
    if (!message) return res.status(400).json({ error: "Message is required" });

    console.log("⚖️  LawBot request received:", message.substring(0, 50) + "...");

    const prompt = promptManager.getLawBotPrompt(message);

    geminiService.getGeminiResponse(prompt)
        .then(aiReply => {
            console.log("✅ LawBot response generated successfully");
            res.json({ reply: aiReply });
        })
        .catch(err => {
            console.error("❌ LawBot Error:", err);
            res.status(500).json({ error: "Internal Server Error" });
        });
}

function handleTalk2GovChat(req, res) {
    const message = req.body?.message;
    if (!message) return res.status(400).json({ error: "Message is required" });

    console.log("🏛️  Talk2Gov request received:", message.substring(0, 50) + "...");

    const prompt = promptManager.getTalk2GovPrompt(message);

    geminiService.getGeminiResponse(prompt)
        .then(aiReply => {
            console.log("✅ Talk2Gov response generated successfully");
            res.json({ reply: aiReply });
        })
        .catch(err => {
            console.error("❌ Talk2Gov Error:", err);
            res.status(500).json({ error: "Internal Server Error" });
        });
}

async function handleLocalLanguageChat(req, res) {
    try {
        const { message, language } = req.body;

        if (!message) return res.status(400).json({ error: "Message is required" });
        if (!language) return res.status(400).json({ error: "Target language is required" });

        console.log(`🌐 Language Assistant request received (${language}):`, message.substring(0, 50) + "...");

        // Create prompt with target language
        const prompt = promptManager.getLocalLanguagePrompt(message, language);

        // Get plain translated text
        const translation = await geminiService.getTranslation(prompt);

        console.log("✅ Translation generated successfully");
        // Return only the translated text
        res.json({ reply: translation });
    } catch (err) {
        console.error("❌ Local Language Assistant Error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = { handleUnifiedChat, handleLawBotChat,handleTalk2GovChat,handleLocalLanguageChat };
