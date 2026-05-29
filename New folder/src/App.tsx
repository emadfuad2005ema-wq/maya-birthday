import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Stars, Calendar, Lock, Sparkles, Wand2 } from "lucide-react";
import { synth } from "./utils/audio";
import { HeartParticles } from "./components/HeartParticles";
import { SuccessView } from "./components/SuccessView";
import { Envelope } from "./components/Envelope";

export default function App() {
  const [stage, setStage] = useState<"envelope" | "proposal" | "transition" | "success">("envelope");
  const [dodgeCount, setDodgeCount] = useState(0);
  const [noBtnOffset, setNoBtnOffset] = useState<{ top: string; left: string } | null>(null);
  const [burstTrigger, setBurstTrigger] = useState(0);

  const name = "Malak";

  // Trigger dodge motion & play audio
  const handleDodge = () => {
    synth.playDodgeSound();

    // Generate random positions (restricted to 15%-80% to avoid fully clipping off edges)
    const randomTop = Math.floor(Math.random() * 66) + 15;
    const randomLeft = Math.floor(Math.random() * 66) + 15;

    // Apply translation style coordinates
    setNoBtnOffset({
      top: `${randomTop}%`,
      left: `${randomLeft}%`,
    });
    setDodgeCount((prev) => prev + 1);
  };

  // Click Yes!
  const handleAccept = () => {
    setBurstTrigger((prev) => prev + 1);
    synth.playSuccessCascade();
    // Beautiful transition stage so the old card disappears
    setStage("transition");
    // Beautiful delay for massive heart display coverage before opening the success view!
    setTimeout(() => {
      setStage("success");
    }, 2200);
  };

  // Dynamic dialogue text showing playful sass as she pursues the NO button
  const getPlayfulComment = () => {
    if (dodgeCount === 0) return "Choose wisely! 😉";
    if (dodgeCount === 1) return "Oops! Almost had it! 😄";
    if (dodgeCount === 2) return "Wait, didn't you see the YES button? Haha!";
    if (dodgeCount === 3) return "Nope, no escaping! Malak is holding the love lease! 🔐💖";
    if (dodgeCount === 4) return "Are you still trying?! Love is fully locked! ❤️";
    if (dodgeCount === 5) return "Look how much workout you are getting! 🏃‍♀️💨";
    if (dodgeCount < 8) return "Legend says nobody has ever pressed that No button! 😂";
    return "Okay okay, you proved your speed! Now click YES! 💍✨";
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-rose-200 via-pink-100 to-rose-300 flex items-center justify-center p-4 overflow-x-hidden" id="main-app-viewport">
      {/* Decorative shapes for deep glass dynamic layout */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-rose-300 rounded-full mix-blend-multiply filter blur-3xl opacity-35 animate-pulse pointer-events-none" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-35 animate-pulse pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-white rounded-full mix-blend-overlay filter blur-[120px] opacity-45 pointer-events-none" />

      {/* Floating Heart Particles */}
      <HeartParticles burstTrigger={burstTrigger} />

      {/* Animated Screen Stages */}
      <AnimatePresence mode="wait">
        {stage === "envelope" && (
          <motion.div
            key="envelope-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.5 }}
            className="w-full flex justify-center"
          >
            <Envelope name={name} onOpen={() => setStage("proposal")} />
          </motion.div>
        )}

        {stage === "proposal" && (
          <motion.div
            key="proposal-stage"
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="max-w-xl w-full bg-white/40 backdrop-blur-2xl border border-white/60 rounded-[40px] shadow-[0_25px_50px_-12px_rgba(251,113,133,0.25)] p-12 text-center relative z-10"
            id="proposal-card-flow"
          >
            {/* Beating Header Crown */}
            <div className="inline-flex items-center justify-center space-x-1.5 px-4 py-1.5 bg-white/60 backdrop-blur-md rounded-full mb-8 border border-white/40 shadow-sm">
              <Sparkles className="w-4 h-4 text-rose-500 animate-spin" />
              <span className="text-[11px] font-bold text-rose-600 font-mono tracking-widest uppercase">
                An Invitation for Malak
              </span>
            </div>

            {/* Proposal Message */}
            <h1 className="text-4xl md:text-5xl font-extrabold text-rose-600 tracking-tight font-sans leading-tight">
              Would you be my date on June 5th? 🌹
            </h1>
            <p className="text-rose-800 text-base md:text-lg font-medium mt-4 leading-relaxed">
              Friday, June 5th, 2026 isn't just an ordinary day.<br />
              I want to celebrate it with you and make you smile!
            </p>

            {/* Dynamic Sassy / Playful Advice box */}
            <motion.div
              layout
              key={dodgeCount}
              className="mt-8 min-h-[48px] flex items-center justify-center px-5 py-3 bg-white/50 backdrop-blur-md rounded-2xl border border-white/60 shadow-sm"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <span className="text-xs md:text-sm font-semibold text-rose-700">
                {getPlayfulComment()}
              </span>
            </motion.div>

            {/* Interactive Decision Button Area */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 min-h-[140px] relative font-sans" id="decision-panel">
              
              {/* YES Button */}
              <motion.button
                onClick={handleAccept}
                onMouseEnter={() => synth.playCutePop()}
                id="btn-proposal-yes"
                className="w-full sm:w-auto px-12 py-4 bg-rose-500 text-white rounded-full text-xl font-bold shadow-xl shadow-rose-200 hover:shadow-rose-300 hover:bg-rose-600 cursor-pointer border-b-4 border-rose-700 transition-all select-none"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                YES! 💖
              </motion.button>

              {/* DODGING NO Button */}
              <motion.button
                id="btn-proposal-no"
                // Listen to every dodging trigger
                onMouseEnter={handleDodge}
                onTouchStart={(e) => {
                  e.preventDefault(); // prevents dual clicks/taps on phone screens
                  handleDodge();
                }}
                onPointerDown={(e) => {
                  e.preventDefault();
                  handleDodge();
                }}
                onFocus={handleDodge}
                
                style={{
                  position: noBtnOffset ? "fixed" : "static",
                  top: noBtnOffset?.top,
                  left: noBtnOffset?.left,
                  zIndex: 999, // Ensure it stays on top when floating
                }}
                // Smooth glide animations when it teleports
                animate={noBtnOffset ? { scale: [1, 1.1, 1] } : {}}
                transition={{
                  scale: { duration: 0.2, ease: "easeInOut" },
                  default: { type: "spring", damping: 12, stiffness: 120 }
                }}
                className={`w-full sm:w-auto px-12 py-4 bg-white/60 text-rose-400 rounded-full text-xl font-bold border border-rose-200 cursor-pointer shadow-sm hover:bg-rose-50/50 hover:border-rose-300 transition-all select-none ${
                  noBtnOffset ? "shadow-2xl scale-95 opacity-90 backdrop-blur-xl border-rose-400" : "backdrop-blur-md"
                }`}
              >
                No 😢
              </motion.button>
            </div>

            {/* Bottom visual anchor */}
            <div className="mt-10 flex items-center justify-center gap-2 group cursor-pointer" onClick={handleAccept}>
              <div className="w-8 h-[1px] bg-white/50" />
              <div className="inline-flex space-x-1">
                <Heart className="w-3 h-3 text-pink-500 fill-pink-300 animate-pulse" />
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-bounce" />
                <Heart className="w-3 h-3 text-pink-500 fill-pink-300 animate-pulse" />
              </div>
              <div className="w-8 h-[1px] bg-white/50" />
            </div>
          </motion.div>
        )}

        {stage === "transition" && (
          <motion.div
            key="transition-stage"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className="max-w-md w-full bg-white/40 backdrop-blur-2xl border border-white/60 rounded-[40px] shadow-[0_25px_50px_-12px_rgba(251,113,133,0.2)] p-10 text-center relative z-10 flex flex-col items-center justify-center"
            id="transition-page-card"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.25, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
              className="w-16 h-16 rounded-full bg-white/70 backdrop-blur-md flex items-center justify-center border border-rose-200 shadow-sm mb-6"
            >
              <Heart className="w-8 h-8 text-rose-500 fill-rose-500 animate-pulse" />
            </motion.div>
            <h3 className="text-2xl font-black text-rose-600 tracking-tight">
              Locking in our Date! 🔐💖
            </h3>
            <p className="text-rose-800 text-sm font-semibold mt-2 animate-pulse">
              Creating your dream evening with Emad...
            </p>
          </motion.div>
        )}

        {stage === "success" && (
          <motion.div
            key="success-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full flex justify-center"
          >
            <SuccessView name={name} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
