/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Features from "../components/Features";

const LandingPage = () => {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! 👋 I can help you understand laws, find government schemes, or translate documents. How can I assist you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(
        "https://civicconnectai.onrender.com/api/chat",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: userMessage.text }),
        }
      );

      const data = await response.json();

      const botMessage = {
        sender: "bot",
        text: data.reply || "No response from server.",
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Error: Unable to reach the server." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  const renderMessageContent = (msg) => {
    if (typeof msg.text === "string") {
      return (
        <span
          className={
            msg.sender === "user"
              ? "text-blue-700 font-medium"
              : "text-blue-600 italic"
          }
        >
          {msg.text}
        </span>
      );
    }

    if (msg.text && typeof msg.text === "object") {
      // Handle structured response
      const { summary, sections, ...rest } = msg.text;

      return (
        <div className="text-blue-700 italic">
          {summary && <p className="font-semibold">{summary}</p>}

          {sections &&
            sections.map((section, sIdx) => (
              <div key={sIdx} className="mt-2">
                <h4 className="font-bold">{section.title}</h4>
                <ul className="list-disc ml-4">
                  {section.content.map((line, lIdx) => (
                    <li key={lIdx}>{line}</li>
                  ))}
                </ul>
              </div>
            ))}

          {/* Render any other object fields safely */}
          {Object.keys(rest).length > 0 && (
            <pre>{JSON.stringify(rest, null, 2)}</pre>
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-blue-100 to-blue-200 flex flex-col text-blue-900">
      {/* Navbar */}
      <Navbar />

      {/* Hero/Header */}
      <Header />

      {/* Features */}
      <Features />

      {/* Chat Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center mb-16"
      >
        <h2 className="text-center text-2xl md:text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-900">
          Empowering Citizens, Simplifying Governance
        </h2>
        <p className="text-center text-sm md:text-base text-blue-600 mb-8">
          Ask about laws, find eligible schemes, or translate government info
          instantly.
        </p>

        {/* Chatbox */}
        <div className="w-full max-w-xl bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-blue-200">
          {/* Messages */}
          <div className="h-64 overflow-y-auto text-left p-3 rounded-lg bg-gradient-to-br from-blue-100/60 to-white mb-4 border border-blue-200">
            {messages.map((msg, idx) => (
              <div key={idx} className="mb-2">
                {msg.sender === "bot" && (
                  <span className="font-semibold text-blue-800">
                    CivicConnect AI:{" "}
                  </span>
                )}
                {renderMessageContent(msg)}
              </div>
            ))}
            {loading && <p className="text-blue-600 italic">Thinking...</p>}
          </div>

          {/* Input */}
          <div className="flex gap-3 mb-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 p-3 rounded-xl border border-blue-300 bg-blue-50 text-blue-800 placeholder-blue-400 font-medium focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleSend}
              className="px-5 py-3 bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl shadow-md hover:from-blue-600 hover:to-blue-800 transition font-semibold text-white"
            >
              Send
            </button>
          </div>

          {/* Quick action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-2">
            <button
              onClick={() => setInput("Find government schemes for me")}
              className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-800 transition rounded-xl py-2 font-medium shadow-sm"
            >
              Find Government Schemes
            </button>
            <button
              onClick={() => setInput("Simplify a law about traffic rules")}
              className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-800 transition rounded-xl py-2 font-medium shadow-sm"
            >
              Simplify a Law
            </button>
            <button
              onClick={() =>
                setInput("Translate this government notice into Tamil")
              }
              className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-800 transition rounded-xl py-2 font-medium shadow-sm"
            >
              Translate Document
            </button>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
