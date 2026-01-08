import { useState, useEffect, useRef } from "react";
import Header from "../components/Header";

export default function Assistant({ onLogout }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi, I’m SmartRX. Tell me your symptoms or ask about medicines — I’ll guide you safely.",
    },
  ]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      { role: "user", text: input },
      {
        role: "assistant",
        text:
          "Thanks for sharing. Based on your symptoms, here’s some general guidance. If symptoms persist or worsen, please consult a doctor.",
      },
    ]);

    setInput("");
  };

  return (
    <div className="h-screen bg-slate-50 flex flex-col">
      <Header hideLogo={false} onLogout={onLogout} />

      {/* CHAT CONTAINER */}
      <div className="flex-1 flex justify-center px-4 py-6">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg border border-slate-200 flex flex-col overflow-hidden">
          
          {/* CHAT HEADER */}
          <div className="px-6 py-4 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              SmartRX Assistant
            </h2>
            <p className="text-sm text-slate-500">
              AI-powered health guidance
            </p>
          </div>

          {/* MESSAGES */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4 bg-slate-50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white rounded-br-md"
                      : "bg-white text-slate-800 border border-slate-200 rounded-bl-md"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* INPUT BAR */}
          <div className="px-6 py-4 border-t border-slate-200 bg-white">
            <div className="flex items-center gap-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Describe symptoms or ask about a medicine..."
                className="flex-1 px-4 py-3 rounded-full border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <button
                onClick={sendMessage}
                className="px-6 py-3 rounded-full bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition"
              >
                Send →
              </button>
            </div>

            <p className="mt-2 text-xs text-slate-500 text-center">
              SmartRX provides guidance only and does not replace professional medical advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
