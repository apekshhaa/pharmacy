import React from "react";

export default function Composer({ input, setInput, onSend }) {
  return (
    <div className="border-t border-slate-200 bg-white px-6 py-4">
      {/* QUICK ACTIONS */}
      <div className="hidden sm:flex gap-2 mb-3">
        <button
          onClick={() => setInput("I have a headache and nausea.")}
          className="px-3 py-1.5 text-xs rounded-full bg-slate-100 hover:bg-slate-200 transition"
        >
          Headache
        </button>
        <button
          onClick={() =>
            setInput("Are there interactions with warfarin?")
          }
          className="px-3 py-1.5 text-xs rounded-full bg-slate-100 hover:bg-slate-200 transition"
        >
          Interactions
        </button>
      </div>

      {/* INPUT ROW */}
      <div className="flex items-center gap-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSend()}
          placeholder="Describe symptoms or ask about a medicine..."
          className="
            flex-1
            h-12
            px-5
            rounded-full
            border border-slate-300
            focus:outline-none
            focus:ring-2
            focus:ring-purple-500
            text-sm
          "
        />

        <button
          onClick={onSend}
          className="
            h-12
            px-6
            rounded-full
            bg-purple-600
            text-white
            text-sm
            font-semibold
            hover:bg-purple-700
            transition
          "
        >
          Send
        </button>
      </div>

      {/* DISCLAIMER */}
      <p className="mt-3 text-xs text-slate-500 text-center">
        SmartRX provides general guidance only and does not replace professional medical advice.
      </p>
    </div>
  );
}
