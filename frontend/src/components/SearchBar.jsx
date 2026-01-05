// import { useState, useRef } from "react";
// import { Mic } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// export default function SearchBar() {
//   const [q, setQ] = useState("");
//   const [listening, setListening] = useState(false);
//   const recognitionRef = useRef(null);
//   const navigate = useNavigate();

//   const startListening = () => {
//     if (!("webkitSpeechRecognition" in window)) {
//       alert("Speech recognition not supported in this browser");
//       return;
//     }

//     const recognition = new window.webkitSpeechRecognition();
//     recognitionRef.current = recognition;

//     recognition.continuous = false;
//     recognition.interimResults = false;
//     recognition.lang = "en-IN";

//     recognition.onstart = () => {
//       setListening(true);
//     };

//     recognition.onresult = (event) => {
//       const transcript = event.results[0][0].transcript;
//       setQ(transcript);
//       navigate(`/search/${transcript}`);
//     };

//     recognition.onend = () => {
//       setListening(false);
//     };

//     recognition.start();
//   };

//   return (
//     <div className="relative flex items-center justify-center w-full">
//       <input
//         value={q}
//         onChange={(e) => setQ(e.target.value)}
//         onKeyDown={(e) => e.key === "Enter" && navigate(`/search/${q}`)}
//         placeholder="Search medicines, symptoms, guidance..."
//         className="
//           w-[700px] h-14 px-6 pr-14
//           rounded-full
//           shadow-lg
//           outline-none
//           border
//           text-lg
//         "
//       />

//       {/* Mic Button */}
//       <button
//         onClick={startListening}
//         className="absolute right-4"
//       >
//               <Mic
//                   className={`w-6 h-6 ${listening
//                           ? "text-red-500 animate-pulse drop-shadow-[0_0_10px_red]"
//                           : "text-gray-600"
//                       }`}
//               />

//       </button>
//     </div>
//   );
// }


/*import { useState, useRef } from "react";
import { Mic } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [q, setQ] = useState("");
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);
  const navigate = useNavigate();

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech recognition not supported");
      return;
    }

    // 🔥 STOP any existing session
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognitionRef.current = recognition;

    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      console.log("🎤 Listening started");
      setListening(true);
    };

    recognition.onresult = (event) => {
      console.log("✅ Result received", event);
      const transcript = event.results[0][0].transcript;
      setQ(transcript);
      navigate(`/search/${transcript}`);
    };

    recognition.onerror = (e) => {
      console.error("❌ Speech error:", e);
      setListening(false);
    };

    recognition.onend = () => {
      console.log("🛑 Listening ended");
      setListening(false);
    };

    recognition.start();

    // ⏱ Safety timeout (Chrome bug workaround)
    setTimeout(() => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        setListening(false);
      }
    }, 8000);
  };

  return (
    <div className="relative flex items-center justify-center w-full">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && navigate(`/search/${q}`)}
        placeholder="Search medicines, symptoms, guidance..."
        className="
          w-[700px] h-14 px-6 pr-14
          rounded-full shadow-lg
          outline-none border
          text-lg
        "
      />

      <button onClick={startListening} className="absolute right-4">
        <Mic
          className={`w-6 h-6 ${
            listening
              ? "text-red-500 animate-pulse drop-shadow-[0_0_10px_red]"
              : "text-gray-600"
          }`}
        />
      </button>
    </div>
  );
}
*/

/*import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  return (
    <div className="w-full flex justify-center mt-10">
      <input
        type="text"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && q.trim()) {
            navigate(`/search/${q}`);
          }
        }}
        placeholder="Search medicines, symptoms, guidance..."
        className="
          w-[720px] h-16
          px-8
          rounded-full
          border
          text-lg
          shadow-lg
          outline-none
          transition
          focus:ring-2 focus:ring-blue-500
        "
      />
    </div>
  );
}*/

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Search } from "lucide-react";

// export default function SearchBar() {
//   const [q, setQ] = useState("");
//   const navigate = useNavigate();

//   return (
//     <div className="w-full flex justify-center mt-10">
//       {/* Relative wrapper */}
//       <div className="relative">
//         <input
//           type="text"
//           value={q}
//           onChange={(e) => setQ(e.target.value)}
//           onKeyDown={(e) => {
//             if (e.key === "Enter" && q.trim()) {
//               navigate(`/search/${q}`);
//             }
//           }}
//           placeholder="Search medicines, symptoms, guidance..."
//           className="
//             w-[720px]
//             h-[58px]               /* 🔥 thicker search bar */
//             px-8 pr-20             /* space for icon */
//             rounded-full
//             border
//             text-lg
//             placeholder:text-2xl
//             shadow-lg
//             outline-none
//             transition
//             focus:ring-2 focus:ring-blue-500
//           "
//         />

//         {/* 🔍 Search icon INSIDE the bar */}
//         <Search
//           className="
//             absolute
//             right-7
//             top-1/2
//             -translate-y-1/2
//             w-6 h-6
//             text-gray-400
//             pointer-events-none
//           "
//         />
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

export default function SearchBar() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  return (
    <div className="w-full flex justify-center mt-10">
      <div className="relative w-[720px]">
        {/* 🔍 Search icon */}
        <Search
          className="
            absolute
            left-[26px]
            top-1/2
            -translate-y-1/2
            w-6 h-6
            text-gray-500
            pointer-events-none
          "
        />

        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && q.trim()) {
              navigate(`/search/${q}`);
            }
          }}
          placeholder="Search medicines, symptoms, guidance..."
          className="
            w-full
            h-[62px]
            pl-[72px]          /* ✅ KEY FIX — text starts AFTER icon */
            pr-8
            rounded-full
            border-2
            text-lg
            placeholder:text-xl
            shadow-lg
            outline-none
            transition
            focus:ring-2 focus:ring-blue-500
          "
        />
      </div>
    </div>
  );
}
