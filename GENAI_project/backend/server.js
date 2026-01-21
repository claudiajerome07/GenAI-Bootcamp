require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { handleUnifiedChat, handleLawBotChat, handleLocalLanguageChat, handleTalk2GovChat } = require('./Services/aiService');

const app = express();

const PORT = process.env.PORT || 8080;

// app.use(cors({
//     origin: "civicconnectaiweb.netlify.app", // or your frontend port
//     methods: ["POST", "GET"],
//     credentials: true,
// }));
app.use(cors());
app.use(express.json());

app.post('/api/chat', handleUnifiedChat);
app.post('/api/lawbot', handleLawBotChat);
app.post('/api/talk2gov', handleTalk2GovChat);
app.post('/api/translate', handleLocalLanguageChat);


app.listen(PORT, ()=>{
    console.log(`Server is running on Port:${PORT}`);
});