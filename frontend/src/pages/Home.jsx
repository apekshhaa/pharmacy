import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import HowItWorks from "../components/HowItWorks";


export default function Home({ onLogout }) {
return (
<div>
<Header hideLogo={false} onLogout={onLogout} />
<main className="flex flex-col items-center mt-10 px-4">
<h2 className="text-lg text-slate-600 mb-6">
Your intelligent medical assistant
</h2>
<SearchBar />
<HowItWorks />
</main>
</div>
);
}