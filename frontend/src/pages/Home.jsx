import { useEffect, useRef } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import { useNavigate } from "react-router-dom";
import RotatingText from "../components/RotatingText";
import lottie from "lottie-web";

export default function Home({ onLogout, onNavigate }) {
  const navigate = useNavigate();
  const doctorAnimRef = useRef(null);

  useEffect(() => {
    if (!doctorAnimRef.current) return;
    const anim = lottie.loadAnimation({
      container: doctorAnimRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "/animations/doctor-animation.json",
    });
    return () => anim?.destroy();
  }, []);

  const goToAssistant = () => {
    const doNav = () => navigate("/assistant");
    onNavigate ? onNavigate(doNav) : doNav();
  };

  return (
    <div className="min-h-screen">
      <Header hideLogo={false} onLogout={onLogout} />

      <main className="px-6 py-12">
        <div className="mx-auto max-w-4xl text-center">
          {/* Title with rotating text */}
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-8">
            <span>Your </span>
            <RotatingText
              texts={[
                "intelligent",
                "smart",
                "advanced",
                "AI-powered",
              ]}
              splitBy="characters"
              staggerDuration={0.03}
              mainClassName="text-blue-700"
            />
            <span> medical assistant</span>
          </h1>

          {/* Search bar */}
          <div className="max-w-xl mx-auto mb-8">
            <SearchBar />
          </div>

          {/* Doctor animation */}
          <div className="flex justify-center mb-6">
            <div ref={doctorAnimRef} className="w-[320px] h-[320px] md:w-[420px] md:h-[420px]" />
          </div>

          {/* Ask SmartRX button */}
          <button
            onClick={goToAssistant}
            className="px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition"
          >
            Ask SmartRX
          </button>
        </div>
      </main>
    </div>
  );
}
