// context_simulation.js
// Simulating a chat system with a limited context window

// Step 1: Create an array to store chat messages
let chatHistory = [];

// Step 2: Set the maximum context limit (number of messages remembered)
const MAX_CONTEXT = 5;

// Step 3: Function to add a message to chat history
function addMessage(sender, message) {
    const chatMessage = { sender, message, timestamp: new Date().toLocaleTimeString() };
    chatHistory.push(chatMessage);

    // Step 4: If chat exceeds the limit, remove oldest messages
    if (chatHistory.length > MAX_CONTEXT) {
        chatHistory.shift(); // remove the oldest message
    }

    displayChat();
}

// Helper function to display current chat history
function displayChat() {
    console.clear();
    console.log("===== Current Chat History =====");
    chatHistory.forEach(msg => {
        console.log(`[${msg.timestamp}] ${msg.sender}: ${msg.message}`);
    });
    console.log("================================");
}

// Step 5: Simulate a conversation
addMessage("User", "Hello!");
addMessage("AI", "Hi! Welcome to CivicConnect AI. I can help you with legal queries, government schemes, and local language support.");
addMessage("User", "Can you help me understand a legal document?");
addMessage("AI", "Absolutely! Please tell me which document it is or share the text. I'll explain it in simple language.");
addMessage("User", "I also want to know if there are any government schemes I'm eligible for.");
addMessage("AI", "Sure! I can find schemes based on your profile. Can you provide your age, occupation, and location?");
addMessage("User", "I'm 28, working as a teacher in Karnataka.");
addMessage("AI", "Great! Based on your profile, you may be eligible for education and skill development schemes. I can guide you on how to apply.");
addMessage("User", "Can you also translate some government instructions to Kannada?");
addMessage("AI", "Of course! I can translate complex government information into Kannada so it's easier to understand.");
addMessage("User", "Awesome! How do I start?");
addMessage("AI", "Just type your question or upload a document, and I'll assist you step by step. You can also speak if you prefer voice input.");

