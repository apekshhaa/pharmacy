import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import lottie from "lottie-web";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import HowItWorks from "../components/HowItWorks";
import RotatingText from "../components/RotatingText";

export default function Home({ onLogout }) {
  const navigate = useNavigate();
  const lottieRef = useRef(null);

  useEffect(() => {
    if (!lottieRef.current) return;
    const anim = lottie.loadAnimation({
      container: lottieRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "/animations/Doctor,%20Medical,%20Surgeon,%20Healthcare%20Animation.json",
    });
    return () => anim?.destroy();
  }, []);

  return (
    <div className="relative min-h-screen bg-white">
      <Header hideLogo={false} onLogout={onLogout} />

      <main className="flex flex-col items-center mt-14">
        <div className="w-full max-w-4xl px-4 text-center">
          <h2 className="text-lg text-slate-600 mb-6 inline-flex items-center justify-center gap-3 flex-wrap">
            <span>Your</span>
            <span className="relative inline-block">
              {/* Blue glow layer behind */}
              <span className="absolute -inset-2 bg-blue-400/50 rounded-lg blur-lg"></span>
              {/* Rotating text with blue highlight */}
              <span className="relative px-3 py-1 bg-blue-600 rounded-lg inline-block">
                <RotatingText
                  texts={["intelligent", "smart", "clever", "insightful", "savvy"]}
                  mainClassName="text-white font-semibold inline"
                />
              </span>
            </span>
            <span>medical assistant</span>
          </h2>

          <SearchBar />

          {/* ✅ BUTTON WITH ANIMATION */}
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
            <span className="text-lg">Ask SmartRX</span>
            <div
              ref={lottieRef}
              className="w-0.5 h-0.5"
              style={{ width: 2, height: 2, overflow: "hidden" }}
              aria-hidden="true"
            />
          </button>
        </div>

        {/* CONTENT SECTION */}
        <div className="w-full mt-20 bg-white/90 backdrop-blur-md py-16">
          <HowItWorks />
        </div>
      </main>
    </div>
  );
}
