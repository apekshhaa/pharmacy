import { useEffect, useRef } from "react";
import lottie from "lottie-web";

export default function LoadingScreen() {
  const lottieRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!lottieRef.current) return;

      try {
        lottie.loadAnimation({
          container: lottieRef.current,
          renderer: "svg",
          loop: true,
          autoplay: true,
          path: "/animations/capsule.json",
        });
      } catch (error) {
        console.error("Animation error:", error);
      }
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className="fixed top-0 left-0 right-0 bottom-0 z-[9999] flex items-center justify-center bg-white"
      style={{ width: '100vw', height: '100vh' }}
    >
      <div 
        ref={lottieRef} 
        style={{ width: 300, height: 300 }}
      />
    </div>
  );
}



