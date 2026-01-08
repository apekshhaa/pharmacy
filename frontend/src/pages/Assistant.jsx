import { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import MessageList from "../components/MessageList";
import Composer from "../components/Composer";

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
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg = { role: "user", text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Simulated assistant response (placeholder for integration with backend/AI)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text:
            "Thanks — here’s a summary based on the information provided. This is educational guidance only. For personalized care, consult a clinician.",
        },
      ]);
    }, 650);
  };

  const handleSelectHistory = (idx) => {
    // simple placeholder behavior: show a canned message
    const historySamples = [
      { role: "assistant", text: "Previously: simple headache guidance." },
      { role: "assistant", text: "Previously: interaction checks for common meds." },
    ];
    setMessages([messages[0], historySamples[idx] || { role: "assistant", text: "No history." }]);
  };

  return (
    <div className="h-screen bg-slate-50 flex flex-col">
      <Header hideLogo={false} onLogout={onLogout} />

      <div className="flex-1 flex overflow-hidden">
        <Sidebar onSelectHistory={handleSelectHistory} />

        <main className="flex-1 flex justify-center items-stretch px-4 py-6">
          <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg border border-slate-200 flex flex-col overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between gap-4">
              <div>
                <h1 className="text-lg font-semibold text-slate-800 flex items-center gap-3">
                  <span className="text-2xl">🤖</span> SmartRX Assistant
                </h1>
                <p className="text-sm text-slate-500">AI-assisted, safety-first health guidance</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-sm text-slate-500">Model: private</div>
                <div className="px-3 py-1 bg-slate-100 text-xs rounded-full text-slate-700">HIPAA-aware</div>
              </div>
            </div>

            <MessageList messages={messages} messagesEndRef={messagesEndRef} />

            <Composer input={input} setInput={setInput} onSend={sendMessage} />
          </div>
        </main>
      </div>
    </div>
  );
}
