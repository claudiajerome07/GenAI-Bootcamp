require('dotenv').config();
const axios = require('axios');

const MODEL_NAME = process.env.MODEL_NAME || 'gemini-2.5-flash';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY?.trim();

console.log('🔧 Gemini Configuration:');
console.log(`   Model: ${MODEL_NAME}`);
console.log(`   API Key: ${GEMINI_API_KEY ? '✓ Loaded' : '✗ NOT FOUND'}`);

if (!GEMINI_API_KEY) {
    console.error('❌ ERROR: GEMINI_API_KEY is not set in environment variables');
}

const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1/models/${MODEL_NAME}:generateContent`;
console.log(`   URL: ${GEMINI_API_URL}`);

const generateResponse = async (prompt, temperature = 0.3, top_p = 0.7) => {
    try {
        console.log('📤 Sending request to Gemini API...');
        
        const response = await axios.post(
            GEMINI_API_URL,
            {
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: {
                    temperature: temperature,
                    topP: top_p,
                }
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'x-goog-api-key': GEMINI_API_KEY
                }
            }
        );

        console.log('✅ Gemini API response received');
        
        const text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";

        if (!text) {
            console.warn("⚠️ Gemini returned empty text");
            return {
                summary: "No response generated.",
                sections: []
            };
        }

        // --- STRUCTURING LOGIC ---
        const lines = text.split('\n').filter(line => line.trim() !== '');
        const structured = { summary: '', sections: [] };

        let currentSection = null;
        let currentSubheading = null;

        lines.forEach(line => {
            line = line.trim();

            // Detect main section titles (bolded or ending with colon)
            const sectionMatch = line.match(/^\*\*(.+?)\*\*$/) || line.match(/^(.+?):$/);
            if (sectionMatch) {
                if (currentSection) structured.sections.push(currentSection);
                currentSection = { title: sectionMatch[1].trim(), content: [] };
                currentSubheading = null;
                return;
            }

            // Detect subheadings like "**What it is:**" or "**Eligibility:**"
            const subheadingMatch = line.match(/^\*\*(.+?)\*\*:?\s*(.*)/);
            if (subheadingMatch) {
                const [, subheading, content] = subheadingMatch;
                currentSubheading = { subheading: subheading.trim(), text: content.trim() || '' };
                currentSection?.content.push(currentSubheading);
                return;
            }

            // Regular content lines
            if (line.startsWith('- ') || line.startsWith('* ')) {
                // Bullet points
                const bulletText = line.replace(/^(-|\*)\s+/, '').trim();
                if (currentSubheading) {
                    currentSubheading.text += `\n- ${bulletText}`;
                } else {
                    currentSection?.content.push({ subheading: null, text: `- ${bulletText}` });
                }
            } else {
                // Plain text lines
                if (currentSubheading) {
                    currentSubheading.text += ` ${line}`;
                } else {
                    currentSection?.content.push({ subheading: null, text: line });
                }
            }
        });

        if (currentSection) structured.sections.push(currentSection);

        // First non-empty line as summary (if not already set)
        if (!structured.summary && structured.sections.length) {
            structured.summary = structured.sections[0].content?.[0]?.text || "";
        }

        return structured;

    } catch (error) {
        console.error("❌ Gemini API error:");
        console.error("   Status:", error.response?.status);
        console.error("   Message:", error.response?.data || error.message);
        if (error.response?.data) {
            console.error("   Full Error:", JSON.stringify(error.response.data, null, 2));
        }
        
        return {
            summary: "Sorry, I couldn't generate a response at the moment.",
            sections: []
        };
    }
};




const generateTranslation = async (prompt) => {
    try {

        const response = await axios.post(
            GEMINI_API_URL,
            {
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: {
                    temperature: 0.3,
                    topP: 0.7,
                    maxOutputTokens: 1000,
                },
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "x-goog-api-key": GEMINI_API_KEY,
                },
            }
        );

        const translatedText =
            response.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
            "⚠️ Sorry, translation not available.";

        return translatedText;
    } catch (error) {
        console.error(
            "Gemini Translation API error:",
            error.response?.data || error.message
        );
        return "⚠️ Sorry, there was an error generating the translation.";
    }
};


module.exports = {
    getGeminiResponse: generateResponse,
    getTranslation: generateTranslation
};
