import { useState } from "react";
import { motion } from "motion/react";
import { Heart, MailOpen } from "lucide-react";
import { synth } from "../utils/audio";

interface EnvelopeProps {
  onOpen: () => void;
  name: string;
}

export function Envelope({ onOpen, name }: EnvelopeProps) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    setIsOpening(true);
    synth.playCutePop();
    // Delay triggering the main screen so the envelope open animations can complete beautifully
    setTimeout(() => {
      onOpen();
    }, 1200);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] w-full max-w-lg px-4 relative z-10" id="envelope-stage">
      {/* Decorative text above envelope */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-center mb-6"
      >
        <span className="text-xs uppercase tracking-widest text-slate-400 font-bold font-mono">Special Delivery</span>
        <h2 className="text-2xl font-extrabold text-pink-700 mt-1 font-sans">
          Dear {name} ✨
        </h2>
        <p className="text-gray-500 text-xs mt-1">
          A handwritten parcel has just arrived for you. Open it!
        </p>
      </motion.div>

      {/* Main interactive envelope container */}
      <motion.button
        onClick={handleOpen}
        disabled={isOpening}
        id="envelope-interactive-btn"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: isOpening ? 1 : 1.03 }}
        whileTap={{ scale: isOpening ? 1 : 0.97 }}
        className="relative w-full aspect-[1.58] bg-white/40 backdrop-blur-2xl border border-white/60 rounded-[32px] p-0 shadow-[0_25px_50px_-12px_rgba(251,113,133,0.22)] flex flex-col items-center justify-center overflow-hidden cursor-pointer group"
      >
        {/* Envelope Top Triangle Flap SVG */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 300 190"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main Envelope Body Back */}
          <rect width="300" height="190" rx="16" fill="#FFF5F7" />

          {/* Letter inside (slides up) */}
          <motion.rect
            x="15"
            y="25"
            width="270"
            height="150"
            rx="8"
            fill="#FFF"
            stroke="#FFE4E6"
            strokeWidth="1.5"
            initial={{ y: 0 }}
            animate={isOpening ? { y: -80, opacity: 0.8 } : { y: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />

          {/* Envelope Left Triangle */}
          <path d="M0 190L135 110L0 0V190Z" fill="#FFE4E6" fillOpacity="0.8" />
          
          {/* Envelope Right Triangle */}
          <path d="M300 190L165 110L300 0V190Z" fill="#FFE4E6" fillOpacity="0.8" />

          {/* Envelope Bottom Triangle */}
          <path d="M0 190H300L150 95L0 190Z" fill="#FFD1DC" fillOpacity="0.85" />

          {/* Envelope Folding Flap Lid */}
          <motion.path
            d="M0 0H300L150 95L0 0Z"
            fill="#FFD1DC"
            style={{ transformOrigin: "top center" }}
            initial={{ rotateX: 0 }}
            animate={isOpening ? { rotateX: 180, y: -20, fill: "#FFE4E6" } : { rotateX: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
        </svg>

        {/* Heart Seal (Wax Stamp) */}
        {!isOpening ? (
          <motion.div
            id="heart-seal-element"
            className="absolute inset-0 flex items-center justify-center z-20 flex-col"
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <div className="w-16 h-16 bg-rose-500 rounded-full flex items-center justify-center shadow-[0_6px_15px_rgba(244,63,94,0.35)] cursor-pointer hover:bg-rose-600 active:scale-95 transition-all">
              <Heart className="w-8 h-8 text-white fill-white" />
            </div>
            <span className="text-[10px] font-bold text-rose-600 font-mono tracking-widest uppercase mt-3 bg-rose-100/75 px-3 py-1 rounded-full shrink-0">
              Open My Love Letter 💌
            </span>
          </motion.div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1.4, opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="w-16 h-16 bg-pink-400 rounded-full"
            />
            <MailOpen className="w-10 h-10 text-pink-500 animate-pulse" />
          </div>
        )}
      </motion.button>
    </div>
  );
}
