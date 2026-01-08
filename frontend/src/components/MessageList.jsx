import React from "react";

function Avatar({ role }) {
  if (role === "user")
    return (
      <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm">U</div>
    );

  return (
    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 text-white flex items-center justify-center font-semibold text-sm">AI</div>
  );
}

export default function MessageList({ messages, messagesEndRef }) {
  return (
    <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4 bg-gradient-to-b from-slate-50 to-white">
      {messages.map((msg, idx) => {
        const isUser = msg.role === "user";
        const bubbleClass = isUser
          ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-2xl rounded-br-md"
          : "bg-white text-slate-800 border border-slate-200 rounded-2xl rounded-bl-md";

        return (
          <div key={idx} className={`flex ${isUser ? "justify-end" : "justify-start"} items-end`}>
            {!isUser && (
              <div className="mr-3">
                <Avatar role="assistant" />
              </div>
            )}

            <div
              className={`max-w-[72%] px-5 py-3 text-sm leading-relaxed shadow-sm transition-colors duration-150 ${bubbleClass}`}
            >
              {msg.text}
            </div>

            {isUser && (
              <div className="ml-3">
                <Avatar role="user" />
              </div>
            )}
          </div>
        );
      })}

      <div ref={messagesEndRef} />
    </div>
  );
}
