import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import HowItWorks from "../components/HowItWorks";

export default function Home({ onLogout }) {
  const vantaRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    let effect = null;

    const loadScript = (src) =>
      new Promise((resolve, reject) => {
        const existing = document.querySelector(`script[src="${src}"]`);
        if (existing) return resolve();
        const s = document.createElement("script");
        s.src = src;
        s.async = true;
        s.onload = () => resolve();
        s.onerror = reject;
        document.body.appendChild(s);
      });

    const init = async () => {
      try {
        if (!window.p5) {
          await loadScript(
            "https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js"
          );
        }
        if (!window.VANTA?.TRUNK) {
          await loadScript(
            "https://unpkg.com/vanta/dist/vanta.trunk.min.js"
          );
        }
        if (vantaRef.current && window.VANTA?.TRUNK) {
          effect = window.VANTA.TRUNK({
            el: vantaRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
            scaleMobile: 1.0,
            color: 0x3b82f6,
            backgroundColor: 0xffffff,
            spacing: 1.2,
            chaos: 1.0,
          });
        }
      } catch (e) {
        console.error("VANTA init failed:", e);
      }
    };

    init();
    return () => {
      if (effect && typeof effect.destroy === "function") effect.destroy();
    };
  }, []);

  return (
    <div ref={vantaRef} className="relative min-h-screen">
      <div className="relative z-10">
        <Header hideLogo={false} onLogout={onLogout} />

        <main className="flex flex-col items-center mt-14">
          <div className="w-full max-w-4xl px-4 text-center">
            <h2 className="text-lg text-slate-600 mb-6">
              Your intelligent medical assistant
            </h2>

            <SearchBar />

            {/* ✅ PROFESSIONAL CTA BUTTON */}
            <button
              onClick={() => navigate("/assistant")}
              className="
                mt-8
                inline-flex items-center justify-center gap-2
                px-8 py-4
                rounded-full
                bg-blue-600
                text-white
                text-base font-semibold
                shadow-lg shadow-blue-200
                hover:bg-blue-700
                hover:shadow-xl hover:shadow-blue-300
                transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              "
            >
              Ask SmartRX
              <span className="text-lg">→</span>
            </button>
          </div>

          {/* CONTENT SECTION */}
          <div className="w-full mt-20 bg-white/90 backdrop-blur-md py-16">
            <HowItWorks />
          </div>
        </main>
      </div>
    </div>
  );
}
