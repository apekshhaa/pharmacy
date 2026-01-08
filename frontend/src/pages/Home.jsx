import Header from "../components/Header";
import SearchBar from "../components/SearchBar";

export default function Home({ onLogout }) {
  return (
    <div className="relative min-h-screen bg-transparent">
      <Header hideLogo={false} onLogout={onLogout} />

      <main className="flex items-center justify-center min-h-screen">
        <div className="relative w-[85vw] max-w-[1200px] animate-tabletFloat">
          {/* Tablet image */}
          <img
            src="/tablet.png"
            alt="Tablet"
            className="w-full h-auto select-none pointer-events-none"
          />

          {/* Screen content */}
          <div className="absolute inset-[6%] rounded-2xl bg-black/80 flex flex-col items-center justify-center text-center px-6">
            <h1 className="text-white text-3xl md:text-4xl font-semibold mb-6">
              Your intelligent medical assistant
            </h1>

            <div className="w-full max-w-[700px] mb-6">
              <SearchBar />
            </div>

            <button className="px-6 py-3 bg-white text-black rounded-full font-semibold hover:scale-105 transition">
              Ask SmartRX
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
