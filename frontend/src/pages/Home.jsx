import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import lottie from "lottie-web";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import RotatingText from "../components/RotatingText";

export default function Home({ onLogout, onNavigate }) {
  const navigate = useNavigate();
  const lottieRef = useRef(null);
  const heroLottieRef = useRef(null);

  useEffect(() => {
    if (!lottieRef.current) return;
    const anim = lottie.loadAnimation({
      container: lottieRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "/animations/doctor-animation.json",
    });
    return () => anim?.destroy();
  }, []);

  useEffect(() => {
    if (!heroLottieRef.current) return;
    const heroAnim = lottie.loadAnimation({
      container: heroLottieRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "/animations/doctor-animation.json",
    });
    return () => heroAnim?.destroy();
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

          {/* Doctor animation above the CTA, bigger and lower on the page */}
          <div className="mt-20 flex w-full justify-center">
            <div
              ref={heroLottieRef}
              className="w-[180px] h-[180px] sm:w-[200px] sm:h-[200px]"
              aria-label="Doctor animation"
            />
          </div>

          {/* ✅ Larger CTA below the animation */}
          <button
            onClick={() => {
              onNavigate?.();
              navigate("/assistant");
            }}
            className="
              mt-6
              inline-flex items-center justify-center gap-3
              px-10 py-5
              rounded-full
              bg-blue-600
              text-white
              text-lg font-semibold
              shadow-lg shadow-blue-200
              hover:bg-blue-700
              hover:shadow-xl hover:shadow-blue-300
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            "
          >
            <span className="text-xl">Ask SmartRX</span>
            <div
              ref={lottieRef}
              className="w-0.5 h-0.5"
              style={{ width: 2, height: 2, overflow: "hidden" }}
              aria-hidden="true"
            />
          </button>
        </div>
      </main>
    </div>
  );
}
