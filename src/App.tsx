import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowRight, 
  Check, 
  Globe, 
  Instagram, 
  Mail, 
  Compass, 
  Sparkles, 
  Eye, 
  X,
  LineChart,
  ShieldCheck,
  Zap,
  LayoutGrid,
  Video,
  Sliders
} from "lucide-react";
import { 
  WordsPullUp, 
  WordsPullUpMultiStyle, 
  AboutScrollReveal, 
  StaggeredCard 
} from "./components/SharedAnimations";

// Structuring mock details for card interactions using liquid-glass popups
interface CardDetail {
  id: string;
  title: string;
  number: string;
  tagline: string;
  description: string;
  workflows: string[];
}

export default function App() {
  const [activeNav, setActiveNav] = useState<string>("Our story");
  const [activeStream, setActiveStream] = useState<"alpha" | "beta">("alpha");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  // React video element refs for flawless sequential seamless stream playing
  const videoAlphaRef = useRef<HTMLVideoElement>(null);
  const videoBetaRef = useRef<HTMLVideoElement>(null);

  // Selected card details modal
  const [activeCardDetail, setActiveCardDetail] = useState<CardDetail | null>(null);

  // Sync document title dynamically!
  useEffect(() => {
    document.title = "Helios — Trading Focus";
  }, []);

  // Sync video play state on activeStream transitions
  useEffect(() => {
    if (activeStream === "alpha") {
      if (videoAlphaRef.current) {
        videoAlphaRef.current.currentTime = 0;
        videoAlphaRef.current.play().catch(() => {});
      }
      if (videoBetaRef.current) {
        videoBetaRef.current.pause();
      }
    } else {
      if (videoBetaRef.current) {
        videoBetaRef.current.currentTime = 0;
        videoBetaRef.current.play().catch(() => {});
      }
      if (videoAlphaRef.current) {
        videoAlphaRef.current.pause();
      }
    }
  }, [activeStream]);

  const navItems = [
    { label: "Our story", href: "#story" },
    { label: "Collective", href: "#features" },
    { label: "Workshops", href: "#features" },
    { label: "Programs", href: "#features" },
    { label: "Inquiries", href: "#inquiries" },
  ];

  const handleCTA = () => {
    showToast("Helios Desktop Terminal is downloading from Google Drive...");
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3800);
  };

  // Content mapped based on selected brand to guarantee pure compliance and interactive elegance
  const heroDescription = "Our mission is simple: to create the absolute best-in-class experiences, combining supreme precision with artistic dominance to elevate your visual performance beyond all boundaries.";

  // Dynamic details displayed in liquid-glass drawers on click
  const cardDetailsData: Record<string, CardDetail> = {
    storyboard: {
      id: "storyboard",
      title: "Founder Giddy",
      number: "01",
      tagline: "High-integrity setups and elite execution workflows.",
      description: "Formulated and executed by Founder Giddy, analyzing complex market order blocks, real-time volume profiles, and institutional liquidity setups.",
      workflows: [
        "Real-time order flow & price action tracking",
        "Founder Giddy's institutional order blocks identifier",
        "Advanced volume profile and delta calculations",
        "Precision multi-timeframe candle structural setups"
      ]
    },
    critiques: {
      id: "critiques",
      title: "Disciplined Strategy",
      number: "02",
      tagline: "Master psychological consistency.",
      description: "Build robust risk-to-reward ratios, pre-plan trading sessions, and run automated post-market reviews to eliminate emotional execution errors.",
      workflows: [
        "Pre-market strategy checklist with rigorous verification",
        "Optimal position sizing and risk-reward ratio calculator",
        "Automated journal sync with post-trade grading engine",
        "Real-time discipline analytics and metric visualizer"
      ]
    },
    immersion: {
      id: "immersion",
      title: "Flow Terminal",
      number: "03",
      tagline: "Isolate execution focus.",
      description: "Engage in an immersive focus-priming workstation that silences outer digital distractions, controls sensory environments, and aligns your attention with key timezone open periods.",
      workflows: [
        "Active execution shield mutes system notifications",
        "Ambient focus audio relative to live market volatility levels",
        "Visual breathing pacing helpers to control heart rate under pressure",
        "Automatic trade log synchronization to track focus window status"
      ]
    }
  };

  return (
    <div className="min-h-screen bg-black text-[#E1E0CC] selection:bg-primary/20 selection:text-white relative overflow-x-hidden">
      
      {/* Dynamic Toast Feedback Pill */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            className="fixed top-24 left-1/2 z-50 px-6 py-3 rounded-full text-xs md:text-sm text-center text-primary border border-white/10 shadow-2xl min-w-[280px] sm:min-w-[400px] pointer-events-none liquid-glass bg-black/80"
          >
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="w-4.5 h-4.5 text-primary shrink-0 animate-pulse" />
              <span className="font-sans font-medium tracking-wide">{toastMessage}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER NAVBAR (Hangs from top center) */}
      <header className="absolute top-0 left-1/2 -translate-x-1/2 z-40 w-full max-w-6xl px-4 md:px-6 pt-4 md:pt-6">
        <div className="liquid-glass rounded-b-2xl md:rounded-b-3xl px-4 py-3 md:px-8 flex items-center justify-between">
          
          {/* Logo / Brand Indicator */}
          <div className="flex items-center gap-1 select-none text-left">
            <span className="tracking-widest uppercase text-xs md:text-sm font-extrabold font-sans">
              Helios
            </span>
            <sup className="text-primary text-xs font-serif font-bold transition-transform block select-none">
              *
            </sup>
            <div className="w-1.5 h-1.5 rounded-full bg-primary/70 animate-ping ml-2 hidden sm:block" />
          </div>

          {/* 5 Navigation Menu Items */}
          <nav className="flex items-center gap-3 sm:gap-6 md:gap-10 lg:gap-12">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  const targetElement = document.querySelector(item.href);
                  if (targetElement) {
                    targetElement.scrollIntoView({ behavior: "smooth" });
                  }
                  setActiveNav(item.label);
                }}
                className="text-[10px] sm:text-xs md:text-sm font-medium tracking-widest transition-colors duration-300 uppercase relative"
                style={{
                  color: activeNav === item.label ? "#E1E0CC" : "rgba(225, 224, 204, 0.45)"
                }}
              >
                {item.label}
                {activeNav === item.label && (
                  <motion.div 
                    layoutId="activeIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-primary"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </nav>

          {/* Liquid-Glass CTA Action Button (Hidden on Mobile) */}
          <a 
            href="https://drive.google.com/uc?export=download&id=1R5umi9DLa-JRLXkpo50nsTVMW5znBM5A"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleCTA}
            className="hidden md:inline-flex items-center gap-2 px-5 py-2 text-[10px] md:text-xs font-extrabold uppercase tracking-widest text-[#E1E0CC] rounded-full cursor-pointer hover:scale-[1.03] active:scale-95 transition-all duration-300 liquid-glass"
          >
            Download for Mac
          </a>
        </div>
      </header>

      {/* SECTION 1 — HERO */}
      <section 
        id="hero" 
        className="h-screen p-4 md:p-6 flex flex-col relative"
      >
        <div className="w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden relative border border-white/5 bg-black">
          
          {/* Loop/Autoplay Background Video and Ambient Glows */}
          <div className="absolute inset-0 z-0 overflow-hidden bg-black">
            {/* Dual high-fidelity live stream background feeds with seamless onEnded sequence */}
            <video
              ref={videoAlphaRef}
              autoPlay
              muted
              playsInline
              onEnded={() => setActiveStream("beta")}
              className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-1000 ${
                activeStream === "alpha" ? "opacity-[0.82]" : "opacity-0 pointer-events-none"
              }`}
            >
              <source 
                src="https://i.imgur.com/OCY0tkl.mp4" 
                type="video/mp4" 
              />
            </video>

            <video
              ref={videoBetaRef}
              autoPlay
              muted
              playsInline
              onEnded={() => setActiveStream("alpha")}
              className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-1000 ${
                activeStream === "beta" ? "opacity-[0.82]" : "opacity-0 pointer-events-none"
              }`}
            >
              <source 
                src="https://i.imgur.com/cjViGYg.mp4" 
                type="video/mp4" 
              />
            </video>

            {/* Premium high-concept tech-grid & scanline overlay to mask video compression/pixelation */}
            <div 
              className="absolute inset-0 z-10 pointer-events-none opacity-80"
              style={{
                backgroundImage: `
                  radial-gradient(circle, rgba(225, 224, 204, 0.08) 1.5px, transparent 1.5px),
                  linear-gradient(to right, rgba(225, 224, 204, 0.015) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(225, 224, 204, 0.015) 1px, transparent 1px)
                `,
                backgroundSize: '3px 3px, 32px 32px, 32px 32px',
                backgroundPosition: 'center center'
              }}
            />

            {/* Technical CRT subtle horizontal scanline effect */}
            <div 
              className="absolute inset-0 z-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,_rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none mix-blend-overlay opacity-40" 
            />

            {/* Subtle radial gradients as atmospheric glows */}
            <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-primary/10 to-transparent blur-[120px] mix-blend-screen animate-pulse duration-[8s] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-[#E1E0CC]/5 to-transparent blur-[140px] mix-blend-screen pointer-events-none" />
          </div>

          {/* Clean high-fidelity glass/gradient overlays that eliminate blocky compression and maximize typography contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/50 z-10 pointer-events-none" />

          {/* Bottom-aligned Hero Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 z-20 w-full">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              
              {/* Giant Left Wordmark Column (8 Columnswide) */}
              <div className="lg:col-span-8 flex flex-col items-start text-left">
                
                {/* Giant pulling up label */}
                <div className="w-full tracking-tighter">
                  <WordsPullUp 
                    text="Helios"
                    showAsterisk={true}
                    symbol="*"
                    className="text-[26vw] sm:text-[24vw] md:text-[22vw] lg:text-[20vw] xl:text-[19vw] 2xl:text-[20vw] font-medium leading-[0.78] tracking-[-0.07em] text-[#E1E0CC] font-sans"
                  />
                </div>

                {/* Optional/poetic serif tagline under title */}
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-lg md:text-2xl lg:text-3xl leading-[1.1] mt-6 font-serif text-[#E1E0CC]/80 font-normal italic tracking-tight flex items-center flex-wrap gap-2"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  <span className="not-italic text-gray-400 font-sans tracking-widest text-[9px] uppercase border border-white/10 px-2.5 py-0.5 rounded-full mr-2">
                    HELIOS — TRADING —
                  </span>
                  "Where dreams rise through the silence."
                </motion.p>
              </div>

              {/* Right Descriptions & Call to Action (4 Columnswide) */}
              <div className="lg:col-span-4 flex flex-col gap-6 items-start text-left w-full">
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="text-primary/70 text-xs sm:text-sm md:text-base leading-relaxed font-sans tracking-wide max-w-md"
                >
                  {heroDescription}
                </motion.p>

                {/* Interactive Liquid-Glass CTA button */}
                <motion.a
                  href="https://drive.google.com/uc?export=download&id=1R5umi9DLa-JRLXkpo50nsTVMW5znBM5A"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleCTA}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="liquid-glass group rounded-full inline-flex items-center gap-4 pl-6 pr-2 py-2 cursor-pointer hover:scale-[1.02] active:scale-100 transition-all duration-300 mt-2"
                >
                  <span className="text-[#E1E0CC] font-sans font-bold text-xs sm:text-sm uppercase tracking-widest">
                    Download for Mac
                  </span>
                  <div className="bg-black rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center transition-transform group-hover:scale-110">
                    <ArrowRight className="w-4.5 h-4.5 text-[#DEDBC8]" />
                  </div>
                </motion.a>
              </div>

            </div>
          </div>
          
        </div>
      </section>

      {/* SECTION 2 — ABOUT/STORY */}
      <section 
        id="story" 
        className="py-32 px-4 sm:px-6 md:px-12 bg-black relative"
      >
        <div className="max-w-6xl mx-auto rounded-3xl bg-[#101010] p-8 sm:p-12 md:p-20 border border-white/5 relative overflow-hidden">
          
          <div className="absolute top-0 right-0 p-8 opacity-40">
            <Compass className="w-16 h-16 text-[#DEDBC8]/10 animate-pulse" />
          </div>

          <div className="text-center">
            
            {/* Top Label */}
            <span className="text-primary text-[10px] sm:text-xs uppercase tracking-[0.25em] mb-8 block font-semibold text-primary/80">
              — Helios —
            </span>

            {/* Title via Multiline word pullups */}
            <div className="mb-12">
              <WordsPullUpMultiStyle 
                segments={[
                  { text: "Helios ", className: "italic text-primary font-normal text-primary/100", style: { fontFamily: "'Instrument Serif', serif" } },
                  { text: "was created to solve the one problem every trader faces: executing a good strategy with perfect consistency.", className: "font-sans font-normal text-[#E1E0CC]" },
                ]}
                className="text-2xl sm:text-3xl md:text-5xl lg:text-5xl xl:text-5xl max-w-4xl mx-auto leading-[1.3] text-center tracking-tight"
              />
            </div>

            {/* Scroll-Linked Progressive Letter Highlight */}
            <div className="max-w-3xl mx-auto border-t border-white/5 pt-12 mt-12">
              <span className="text-[10px] uppercase tracking-widest text-gray-500 block mb-6 font-sans">
                Scroll to Read More
              </span>
              <div className="space-y-8">
                <AboutScrollReveal 
                  text="Helios began with the pursuit of flawless execution. What started this was the belief that trading performance should not be limited by hesitation, emotion, or inconsistency, but enhanced through automation, structure, and precision."
                  className="text-[#DEDBC8] text-sm sm:text-base md:text-lg leading-relaxed tracking-wide font-sans text-center max-w-2xl mx-auto"
                />
                <AboutScrollReveal 
                  text="Helios was built as an auto trader for those who demand a system that moves with discipline, operates with intelligence, and executes with intent."
                  className="text-[#DEDBC8] text-sm sm:text-base md:text-lg leading-relaxed tracking-wide font-sans text-center max-w-2xl mx-auto"
                />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 3 — FEATURES */}
      <section 
        id="features" 
        className="min-h-screen bg-black relative py-32 px-4 sm:px-6 md:px-12 overflow-hidden"
      >
        {/* Subtle Background Noise Texture */}
        <div className="absolute inset-0 bg-noise opacity-[0.08] pointer-events-none z-0" />

        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-white/[0.01] blur-3xl pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Header */}
          <div className="text-center mb-20">
            <WordsPullUpMultiStyle 
              segments={[
                { text: "Elite workflows for high-performance trading.", className: "text-[#E1E0CC] font-normal" },
                { text: "Built for supreme precision. Powered by focus.", className: "text-gray-500 font-light block mt-3 text-sm sm:text-base md:text-lg" }
              ]}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-center max-w-4xl mx-auto tracking-tight leading-snug"
            />
          </div>

          {/* 4-Column Card Grid (Heights matching specifications) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch lg:h-[480px]">
            
            {/* CARD 1: GEOMETRIC TRADING MATRIX CARD */}
            <StaggeredCard delayIndex={0}>
              <div className="relative overflow-hidden rounded-2xl h-[420px] lg:h-full group border border-white/5 flex flex-col justify-end bg-[#0f0f0f] hover:border-white/20 transition-all duration-300">
                
                {/* Full-bleed pure SVG/CSS geometric visual representation of markets */}
                <div className="absolute inset-0 z-0 opacity-30 group-hover:opacity-40 transition-opacity duration-300">
                  <div className="absolute top-10 right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
                  <div 
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `
                        linear-gradient(to right, rgba(225, 224, 204, 0.08) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(225, 224, 204, 0.08) 1px, transparent 1px)
                      `,
                      backgroundSize: '24px 24px',
                    }}
                  />
                  {/* Mock financial candlestick bars and volume nodes in vector styling */}
                  <div className="absolute bottom-24 left-6 right-6 h-36 flex items-end gap-2.5 opacity-40">
                    <div className="w-full bg-[#E1E0CC]/10 rounded-t-sm h-[30%] relative">
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-[1px] h-8 bg-[#E1E0CC]/35" />
                    </div>
                    <div className="w-full bg-primary/25 rounded-t-sm h-[65%] relative">
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-[1px] h-14 bg-primary/50" />
                    </div>
                    <div className="w-full bg-[#E1E0CC]/10 rounded-t-sm h-[40%] relative">
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-[1px] h-10 bg-[#E1E0CC]/35" />
                    </div>
                    <div className="w-full bg-primary/25 rounded-t-sm h-[85%] relative">
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[1px] h-20 bg-primary/60" />
                    </div>
                    <div className="w-full bg-[#E1E0CC]/15 rounded-t-sm h-[50%] relative">
                      <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-[1px] h-12 bg-[#E1E0CC]/40" />
                    </div>
                  </div>
                </div>

                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-0 noise-overlay opacity-[0.2] mix-blend-overlay z-10 pointer-events-none" />

                <div className="relative z-20 p-6 md:p-8">
                  <div className="w-10 h-10 rounded-full border border-white/10 mb-4 bg-black flex items-center justify-center">
                    <LayoutGrid className="w-4.5 h-4.5 text-primary animate-pulse" />
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-primary/80 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full mb-3 inline-block">
                    TRADING MATRIX
                  </span>
                  <h3 className="text-xl md:text-2xl font-serif text-[#E1E0CC] font-normal italic leading-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
                    "Your market cockpit."
                  </h3>
                  <p className="text-xs text-gray-400 mt-2 font-sans tracking-wide">
                    Real-time market tick data and uncompromised liquidity maps.
                  </p>
                </div>
              </div>
            </StaggeredCard>

            {/* CARD 2: FOUNDER GIDDY ELITE WORKFLOWS */}
            <StaggeredCard delayIndex={1}>
              <div className="bg-[#121212] h-[420px] lg:h-full p-6 sm:p-8 rounded-2xl border border-white/5 hover:border-white/20 transition-all duration-300 relative overflow-hidden flex flex-col justify-end group">
                
                {/* Background image & gradient overlay to capture the motorcycle rider aesthetic in original full color */}
                <div className="absolute inset-0 z-0">
                  <img 
                    src="https://i.imgur.com/LJdZkXK.png" 
                    referrerPolicy="no-referrer"
                    alt="Founder Giddy" 
                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-95 transition-all duration-500 scale-100 group-hover:scale-105"
                  />
                  {/* Minimalist ambient bottom shield for seamless legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
                </div>

                <div className="relative z-10">
                  {/* Header/Title */}
                  <div className="flex flex-col">
                    <h3 className="text-xl sm:text-2xl font-bold font-sans tracking-tight text-[#E1E0CC] drop-shadow-md">
                      Founder Giddy
                    </h3>
                  </div>
                </div>

              </div>
            </StaggeredCard>

            {/* CARD 3: SMART CRITIQUES (02) */}
            <StaggeredCard delayIndex={2}>
              <div className="bg-[#212121] h-[420px] lg:h-full p-6 sm:p-8 rounded-2xl border border-white/5 hover:border-white/20 transition-all duration-300 relative overflow-hidden flex flex-col justify-between group">
                <div>
                  
                  {/* Top Vector Icon */}
                  <div className="w-12 h-12 rounded-full border border-white/10 mb-6 bg-black flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                  </div>

                  {/* Header/Title */}
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg sm:text-xl font-bold font-sans tracking-tight text-[#E1E0CC]">
                      Disciplined Strategy.
                    </h3>
                    <span className="text-xs tracking-wider text-gray-500 font-mono">
                      (02)
                    </span>
                  </div>

                  {/* 3 Checklist Items */}
                  <ul className="space-y-3.5 my-4">
                    {[
                      "Pre-market strategy checklist",
                      "Optimal position sizes calculation",
                      "Automated trade grading logs"
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span className="text-[11px] sm:text-xs text-gray-400 font-sans tracking-wide">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                </div>

                {/* Bottom Learn More link */}
                <button 
                  onClick={() => setActiveCardDetail(cardDetailsData.critiques)}
                  className="group/link inline-flex items-center gap-1.5 text-xs text-primary font-medium hover:text-white transition-colors duration-200 mt-6 cursor-pointer text-left self-start"
                >
                  <span>Learn more</span>
                  <ArrowRight className="w-3.5 h-3.5 transform -rotate-45 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-200" />
                </button>
              </div>
            </StaggeredCard>

            {/* CARD 4: IMMERSION CAPSULE (03) */}
            <StaggeredCard delayIndex={3}>
              <div className="bg-[#212121] h-[420px] lg:h-full p-6 sm:p-8 rounded-2xl border border-white/5 hover:border-white/20 transition-all duration-300 relative overflow-hidden flex flex-col justify-between group">
                <div>
                  
                  {/* Top Vector Icon */}
                  <div className="w-12 h-12 rounded-full border border-white/10 mb-6 bg-black flex items-center justify-center shrink-0">
                    <Zap className="w-5 h-5 text-primary" />
                  </div>

                  {/* Header/Title */}
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg sm:text-xl font-bold font-sans tracking-tight text-[#E1E0CC]">
                      Flow Terminal.
                    </h3>
                    <span className="text-xs tracking-wider text-gray-500 font-mono">
                      (03)
                    </span>
                  </div>

                  {/* 3 Checklist Items */}
                  <ul className="space-y-3.5 my-4">
                    {[
                      "Active distraction block shield",
                      "Session-specific sensory loops",
                      "Automated focus time tracking"
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span className="text-[11px] sm:text-xs text-gray-400 font-sans tracking-wide">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                </div>

                {/* Bottom Learn More link */}
                <button 
                  onClick={() => setActiveCardDetail(cardDetailsData.immersion)}
                  className="group/link inline-flex items-center gap-1.5 text-xs text-primary font-medium hover:text-white transition-colors duration-200 mt-6 cursor-pointer text-left self-start"
                >
                  <span>Learn more</span>
                  <ArrowRight className="w-3.5 h-3.5 transform -rotate-45 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-200" />
                </button>
              </div>
            </StaggeredCard>

          </div>

        </div>
      </section>

      {/* SECTION 4 — INQUIRIES & CONTACT AREA (Black coordinates footer) */}
      <footer 
        id="inquiries" 
        className="bg-[#000000] py-24 px-6 md:px-12 border-t border-white/5 relative"
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
          
          <div className="flex flex-col gap-3">
            <h4 
              className="text-2xl sm:text-3xl lg:text-4xl italic text-primary leading-none"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Helios*
            </h4>
            <p className="text-xs text-gray-500 font-mono tracking-wide">
              COORDINATES: price action // strategy // flow
            </p>
          </div>

          {/* Core Interactive Contact Request Form - Elegant & liquid-glass */}
          <div className="w-full md:w-auto max-w-md flex flex-col gap-4">
            <span className="text-xs uppercase tracking-widest text-[#E1E0CC]/80 font-semibold block">
              Inquire Collaboration
            </span>
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                showToast("Collaboration request registered. Our curator will contact you shortly.");
                (e.target as HTMLFormElement).reset();
              }}
              className="flex flex-col sm:flex-row gap-2 w-full"
            >
              <input 
                type="email" 
                required
                placeholder="Submit your email / alias" 
                className="bg-black/50 border border-white/10 rounded-full px-5 py-3 text-xs text-[#E1E0CC] focus:outline-none focus:border-primary/50 flex-1 placeholder:text-gray-600 focus:ring-1 focus:ring-primary/20"
              />
              <button 
                type="submit" 
                className="liquid-glass hover:scale-103 px-6 py-3 rounded-full text-xs font-bold text-primary uppercase tracking-widest cursor-pointer whitespace-nowrap active:scale-95 transition-all"
              >
                Inquire
              </button>
            </form>
          </div>

          <div className="flex flex-col gap-4 items-start md:items-end text-left md:text-right">
            <a 
              href="mailto:gideon@helios.trading" 
              className="text-sm md:text-base text-primary/90 hover:text-white transition-colors duration-200 inline-flex items-center gap-1.5"
            >
              <Mail className="w-4 h-4 mt-0.5 text-primary" />
              <span>gideon@helios.trading</span>
            </a>
            <div className="flex gap-4">
               <a href="#story" className="text-gray-500 hover:text-white transition-colors duration-200">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#features" className="text-gray-500 hover:text-white transition-colors duration-200">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#hero" className="text-gray-500 hover:text-white transition-colors duration-200">
                <Compass className="w-4 h-4" />
              </a>
            </div>
            
            <p className="text-[10px] text-gray-600 font-mono text-left md:text-right">
              © {new Date().getFullYear()} Helios*. All rights reserved.
            </p>
          </div>

        </div>
      </footer>

      {/* LIQUID-GLASS DRAWER MODAL OVERLAY */}
      <AnimatePresence>
        {activeCardDetail && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveCardDetail(null)}
              className="absolute inset-0 bg-black/95 cursor-pointer"
            />

            {/* Modal Box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="w-full max-w-xl p-8 rounded-3xl z-10 border border-white/10 shadow-3xl bg-black/90 relative overflow-hidden flex flex-col justify-between"
              style={{
                boxShadow: "inset 0 1px 1px rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(12px)"
              }}
            >
              
              {/* Glass subtle shimmer line */}
              <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              
              {/* Close Button */}
              <button 
                onClick={() => setActiveCardDetail(null)}
                className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors duration-200 cursor-pointer p-1 rounded-full hover:bg-white/5"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6">
                
                {/* Accent and sequence indicator */}
                <span className="text-[10px] font-mono tracking-widest text-[#DEDBC8]/60 bg-white/5 border border-white/10 px-3 py-1 rounded-full inline-block leading-none mb-3">
                  MODULE ({activeCardDetail.number})
                </span>

                <h2 className="text-3xl font-sans font-bold text-[#E1E0CC] tracking-tight mb-2">
                  {activeCardDetail.title}
                </h2>
                
                <p className="text-sm font-serif italic text-primary/80 mb-5 block" style={{ fontFamily: "'Instrument Serif', serif" }}>
                  "{activeCardDetail.tagline}"
                </p>

                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed tracking-wide font-sans mb-6">
                  {activeCardDetail.description}
                </p>

                {/* Workflow checklist */}
                <div className="border-t border-white/5 pt-5">
                  <h4 className="text-[10px] uppercase font-bold tracking-widest text-primary mb-4">
                    MODULE CAPABILITIES
                  </h4>
                  <ul className="space-y-3">
                    {activeCardDetail.workflows.map((flow, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-4 h-4 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10 animate-pulse mt-0.5">
                          <Check className="w-2.5 h-2.5 text-primary" />
                        </div>
                        <span className="text-xs text-gray-300 font-sans tracking-wide">
                          {flow}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Close CTAs */}
              <button 
                onClick={() => setActiveCardDetail(null)}
                className="w-full mt-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest border border-white/10 text-white hover:bg-white/5 active:scale-98 transition-all cursor-pointer text-center"
              >
                Close Module
              </button>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
