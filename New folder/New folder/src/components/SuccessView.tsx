import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, Heart, Clock, Copy, Check, Sparkles, Utensils, Compass, GlassWater, Coffee, Trees, Sparkle, Smile } from "lucide-react";
import { synth } from "../utils/audio";

interface SuccessViewProps {
  name: string;
}

type DateType = "coffee" | "nature" | "fancy" | "play";

export function SuccessView({ name }: SuccessViewProps) {
  // Date type configuration
  const [dateType, setDateType] = useState<DateType>("coffee");

  const dateTypeOptions = {
    coffee: {
      label: "☕ Coffee & Cafe Date",
      color: "from-amber-400 to-amber-600",
      foodTitle: "🥐 Bakery & Sweet Treats",
      foodOptions: ["🥐 Warm Butter Croissant", "🍩 Sweet Waffles & Syrup", "🧁 Pastel Macarons", "🍰 Red Velvet Cake Slice"],
      drinkTitle: "☕ Specialty Coffee & Teas",
      drinkOptions: ["🍓 Pink Strawberry Latte", "☕ Warm Cafe Velvet Heart", "🍵 Creamy Matcha Latte", "🧋 Sweet Brown Sugar Boba"],
      activityTitle: "🛋️ Cafe Vibes & Fun",
      activityOptions: ["🛋️ Cozy Corner Secret Talks", "📖 Cute Reading Session", "🎵 Sharing head-phone playlists", "✍️ Drawing cute doodles of each other"],
    },
    nature: {
      label: "🌲 Beautiful Outdoor Nature",
      color: "from-emerald-400 to-emerald-600",
      foodTitle: "Picnic Food",
      foodOptions: [" Sandwich Hearts", "🍓 Strawberry Chocolate Skewers", "🍉 Sweet Chilled Watermelon", "🧁 Fresh Picnic Muffins"],
      drinkTitle: "🍹 Cool Refreshments",
      drinkOptions: ["🍹 Pink Rose Lemonade", "🍓 Fresh Wild-Berry Slushy", "🥤 Iced Organic Hibiscus", "🥥 Fresh Iced Coconut Water"],
      activityTitle: " Outdoors Fun",
      activityOptions: ["🧺 Romantic Garden Picnic", "🌅 Beachside Sunset Walk", "🎨 Painting on canvas together", "📸 Polaroid Photo Shooting"],
    },
    fancy: {
      label: "✨ Elegant Fancy Night",
      color: "from-rose-400 to-rose-600",
      foodTitle: "🍽️ Luxury Dinner",
      foodOptions: ["🍣 Premium Sushi Dragon Platter", "🍝 Rich Truffle Cream Pasta", "🍕 Wood-Fired Neapolitan Pizza", "🥩 Premium Tender Steak"],
      drinkTitle: "🍷 Sparkling Elixirs",
      drinkOptions: ["🍹 Sparkling Apple Cider", "🍇 Sparkling Grape Nectar", "🍒 Sweet Wild-Cherry Mocktail", "🍸 Sparkling Lavender Lemonade"],
      activityTitle: " Evening Sparks",
      activityOptions: ["🕯️ Candlelit Rooftop Dinner", "🎡 Riding the City Ferris Wheel", "🎬 Premium Private Movie Night", "🎼 Soft Violins Dinner Music"],
    },
    play: {
      label: "🎡 Fun & Playing Games",
      color: "from-indigo-400 to-indigo-600",
      foodTitle: "🍿 Amusement Park Snacks",
      foodOptions: ["🍿 Hot Caramel Popcorn", " Warm Spanish Churros", "🌽 Sweet Buttered Corn Cups", "🍔 Yummy Mini Cheeseburgers"],
      drinkTitle: "🍧 Bubble Fizzies",
      drinkOptions: ["🍧 Rainbow Fruit Slushy", "🍓 Strawberry Bubble Soda", "🥤 Sweet Melon Cream Pop", "🧋 Taro Coconut Milk Tea"],
      activityTitle: " Interactive Games",
      activityOptions: ["🎡 Thrilling Park Rides", "🎳 Neon Bowling & Arcade", "🎯 Claw Machine Challenge", "🏎️ Mario Kart Co-op Battle"],
    }
  };

  const currentConfig = dateTypeOptions[dateType];

  const [copied, setCopied] = useState(false);

  // Countdown calculations (Target: June 5, 2026)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date("2026-06-05T18:00:00"); // 6:00 PM on June 5th
    
    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const generatedMessage = `Yay Emad! I locked in our June 5th date! 💖\n\nMy Chosen Date Style:\n${currentConfig.label}\n\nCan't wait for our special night, Malak! ✨🥰`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedMessage);
    setCopied(true);
    synth.playCutePop();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", damping: 15, stiffness: 100 }}
      className="max-w-2xl w-full bg-white/40 backdrop-blur-2xl border border-white/60 rounded-[40px] shadow-[0_25px_50px_-12px_rgba(251,113,133,0.25)] p-8 md:p-10 text-center relative overflow-hidden z-10"
      id="success-card-container"
    >
      {/* Decorative floating bubbles inside card for texture */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-rose-300/20 rounded-full filter blur-xl opacity-60 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-44 h-44 bg-pink-300/20 rounded-full filter blur-xl opacity-60 pointer-events-none" />

      {/* Love Confirmation Header */}
      <motion.div
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="inline-flex items-center justify-center p-4 bg-white/60 backdrop-blur-md text-pink-500 rounded-full mb-4 border border-white/45 shadow-sm animate-bounce"
        id="beating-heart-badge"
      >
        <Heart fill="currentColor" className="w-8 h-8 text-rose-500" />
      </motion.div>

      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-rose-600 mb-2">
        SHE SAID YES! 🎉💖
      </h1>
      <p className="text-rose-950 text-sm md:text-base max-w-lg mx-auto mb-8 font-medium">
        Malak, you just made my day! June 5th is officially locked in. Get ready for a beautiful date night planned just for you!
      </p>

      {/* Grid: Calendar Visual and Countdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {/* Cute Calendar Card */}
        <div className="bg-white/50 backdrop-blur-md rounded-3xl p-5 border border-white/60 shadow-sm flex flex-col items-center justify-center" id="calendar-card">
          <Calendar className="w-6 h-6 text-rose-500 mb-2 animate-pulse" />
          <span className="text-xs uppercase tracking-widest text-rose-700 font-bold font-mono">Our Date Date</span>
          <div className="mt-2 text-center">
            <span className="text-4xl font-extrabold text-rose-600 block select-none">05</span>
            <span className="text-sm font-semibold text-rose-500">June, 2026</span>
          </div>
          <div className="mt-3 flex items-center gap-1.5 px-3 py-1 bg-white/70 rounded-full text-[11px] text-pink-600 font-mono shadow-sm border border-white/50">
            <Sparkles className="w-3.5 h-3.5 text-rose-500 animate-spin" />
            Locked in with Love
          </div>
        </div>

        {/* Live Countdown Timer */}
        <div className="bg-white/50 backdrop-blur-md rounded-3xl p-5 border border-white/60 shadow-sm flex flex-col items-center justify-center" id="countdown-card">
          <Clock className="w-6 h-6 text-rose-500 mb-2 animate-pulse" />
          <span className="text-xs uppercase tracking-widest text-rose-700 font-bold font-mono">Countdown</span>
          
          <div className="grid grid-cols-4 gap-2 mt-2 select-none">
            <div className="text-center">
              <span className="text-2xl font-extrabold text-rose-600 block">{timeLeft.days}</span>
              <span className="text-[10px] text-rose-800 uppercase font-bold font-mono">Days</span>
            </div>
            <div className="text-center">
              <span className="text-2xl font-extrabold text-rose-600 block">{timeLeft.hours}</span>
              <span className="text-[10px] text-rose-800 uppercase font-bold font-mono">Hrs</span>
            </div>
            <div className="text-center">
              <span className="text-2xl font-extrabold text-rose-600 block">{timeLeft.minutes}</span>
              <span className="text-[10px] text-rose-800 uppercase font-bold font-mono">Mins</span>
            </div>
            <div className="text-center">
              <span className="text-2xl font-extrabold text-rose-600 block">{timeLeft.seconds}</span>
              <span className="text-[10px] text-rose-800 uppercase font-bold font-mono">Secs</span>
            </div>
          </div>

          <div className="mt-3 text-[11px] text-rose-600 bg-white/70 px-3 py-1 rounded-full font-mono shadow-sm border border-white/50">
            Until Friday Night 🌹
          </div>
        </div>
      </div>

      {/* Date Type Selector (Tab bar) */}
      <div className="bg-white/40 backdrop-blur-md rounded-3xl p-5 border border-white/50 text-left mb-6" id="date-type-selector">
        <h3 className="text-sm font-bold text-rose-700 uppercase tracking-wider mb-3.5 flex items-center gap-2">
          <Sparkle className="w-4 h-4 text-pink-500" />
          Choose Our Date Style! 💖
        </h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* Coffee */}
          <button
            onClick={() => { setDateType("coffee"); synth.playCutePop(); }}
            className={`p-3 rounded-2xl border text-center flex flex-col items-center justify-center transition-all cursor-pointer ${
              dateType === "coffee"
                ? "bg-amber-100/80 border-amber-300 text-amber-900 shadow-md scale-[1.03] font-bold"
                : "bg-white/40 border-white/50 hover:bg-white/70 text-rose-700"
            }`}
          >
            <Coffee className="w-6 h-6 mb-1.5 text-amber-700" />
            <span className="text-xs">Coffee ☕</span>
          </button>

          {/* Nature */}
          <button
            onClick={() => { setDateType("nature"); synth.playCutePop(); }}
            className={`p-3 rounded-2xl border text-center flex flex-col items-center justify-center transition-all cursor-pointer ${
              dateType === "nature"
                ? "bg-emerald-100/80 border-emerald-300 text-emerald-900 shadow-md scale-[1.03] font-bold"
                : "bg-white/40 border-white/50 hover:bg-white/70 text-rose-700"
            }`}
          >
            <Trees className="w-6 h-6 mb-1.5 text-emerald-700" />
            <span className="text-xs">Nature 🌲</span>
          </button>

          {/* Fancy */}
          <button
            onClick={() => { setDateType("fancy"); synth.playCutePop(); }}
            className={`p-3 rounded-2xl border text-center flex flex-col items-center justify-center transition-all cursor-pointer ${
              dateType === "fancy"
                ? "bg-rose-100/90 border-rose-300 text-rose-900 shadow-md scale-[1.03] font-bold"
                : "bg-white/40 border-white/50 hover:bg-white/70 text-rose-700"
            }`}
          >
            <Sparkle className="w-6 h-6 mb-1.5 text-rose-500" />
            <span className="text-xs">Fancy ✨</span>
          </button>

          {/* Play */}
          <button
            onClick={() => { setDateType("play"); synth.playCutePop(); }}
            className={`p-3 rounded-2xl border text-center flex flex-col items-center justify-center transition-all cursor-pointer ${
              dateType === "play"
                ? "bg-indigo-100/80 border-indigo-300 text-indigo-900 shadow-md scale-[1.03] font-bold"
                : "bg-white/40 border-white/50 hover:bg-white/70 text-rose-700"
            }`}
          >
            <Smile className="w-6 h-6 mb-1.5 text-indigo-700" />
            <span className="text-xs">Play 🎡</span>
          </button>
        </div>
      </div>

      {/* Dynamic Aesthetic Theme Preview */}
      <AnimatePresence mode="wait">
        <motion.div
          key={dateType}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.22 }}
          className={`bg-gradient-to-br ${currentConfig.color} text-white rounded-3xl p-6 md:p-8 shadow-lg text-center relative overflow-hidden mb-6`}
          id="date-theme-preview-card"
        >
          {/* Subtle ambient blur bubbles inside the preview */}
          <div className="absolute -top-10 -right-10 w-24 h-24 bg-white/20 rounded-full blur-xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />

          {/* Icon Badge */}
          <div className="mx-auto w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4 border border-white/30 shadow-inner">
            {dateType === "coffee" && <Coffee className="w-10 h-10 text-white" />}
            {dateType === "nature" && <Trees className="w-10 h-10 text-white" />}
            {dateType === "fancy" && <Sparkle className="w-10 h-10 text-white" />}
            {dateType === "play" && <Smile className="w-10 h-10 text-white" />}
          </div>

          {/* Theme text descriptors */}
          <h4 className="text-xl md:text-2xl font-black tracking-tight mb-4">
            {currentConfig.label}
          </h4>

          {/* Pure English Poetic descriptors */}
          <div className="space-y-3 bg-black/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10 max-w-md mx-auto">
            <p className="text-xs md:text-sm font-medium leading-relaxed font-sans text-rose-50">
              {dateType === "coffee" && "Warm cups, sweet pastries, and endless cozy talks with you... ☕🍰"}
              {dateType === "nature" && "A romantic picnic under the trees, polaroid pictures, and beautiful sunset walks... 🧺🌅"}
              {dateType === "fancy" && "Candlelit premium dishes, ferris wheel views, and romantic evening sparks... 🕯️✨"}
              {dateType === "play" && "Arcade games, thrilling park rides, sharing sweet popcorn, and pure happy energy! 🎡🍿"}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Copy invitation share button */}
      <div className="bg-white/40 backdrop-blur-md rounded-2xl p-4 border border-white/50 flex flex-col items-center" id="copy-summary-section">
        <span className="text-xs font-semibold text-rose-800 mb-2 font-sans">
          Send your choices to Emad as a sweet checklist!
        </span>
        <button
          onClick={copyToClipboard}
          id="copy-options-btn"
          className="relative inline-flex items-center gap-2 px-6 py-2.5 bg-rose-500 hover:bg-rose-600 active:bg-rose-700 text-white rounded-xl transition-all font-semibold text-sm shadow-md cursor-pointer hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" /> Message Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" /> Copy My Choices 💌
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}
