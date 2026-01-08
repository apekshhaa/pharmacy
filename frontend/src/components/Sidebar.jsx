import React from "react";

export default function Sidebar({ onSelectHistory }) {
  return (
    <aside className="w-72 bg-slate-100 border-r border-slate-200 px-5 py-6 hidden md:flex flex-col">
      {/* BRAND */}
      <div className="mb-8">
        <div className="flex items-center gap-2">
          <span className="text-xl">🧠</span>
          <h2 className="text-lg font-semibold text-slate-800">SmartRX</h2>
        </div>
        <p className="mt-1 text-xs text-slate-500">
          AI-assisted medical guidance
        </p>
      </div>

      {/* HISTORY */}
      <div className="flex-1">
        <h4 className="mb-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">
          Recent
        </h4>

        <div className="space-y-1">
          <button
            onClick={() => onSelectHistory?.(0)}
            className="w-full px-3 py-2 rounded-lg text-left hover:bg-white transition"
          >
            <div className="text-sm font-medium text-slate-800">
              Headache guidance
            </div>
            <div className="text-xs text-slate-400">3 days ago</div>
          </button>

          <button
            onClick={() => onSelectHistory?.(1)}
            className="w-full px-3 py-2 rounded-lg text-left hover:bg-white transition"
          >
            <div className="text-sm font-medium text-slate-800">
              Drug interactions
            </div>
            <div className="text-xs text-slate-400">1 week ago</div>
          </button>
        </div>
      </div>

      {/* FOOTER */}
      <div className="mt-6 text-[11px] text-slate-500 leading-relaxed">
        <strong className="text-slate-600">Privacy notice</strong>
        <p className="mt-1">
          Guidance only. Not a substitute for professional medical advice.
        </p>
      </div>
    </aside>
  );
}
