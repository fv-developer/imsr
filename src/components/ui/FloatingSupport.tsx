"use client";

import React, { useState, useEffect } from "react";
import { MessageSquare, X, Send, Bot, PhoneCall, Sparkles, ArrowUp } from "lucide-react";

export default function FloatingSupport() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    // Static UI as requested
    setMessage("");
  };

  return (
    <>
      {/* ============================================================ */}
      {/* STATIC SUPPORT CHAT POPUP WINDOW */}
      {/* ============================================================ */}
      {isChatOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[340px] sm:w-[380px] max-w-[calc(100vw-32px)] bg-zinc-950/95 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden font-sans animate-in fade-in slide-in-from-bottom-5 duration-300 text-white">
          
          {/* CHAT HEADER */}
          <div className="bg-gradient-to-r from-[#00629f] to-[#00bcda] p-4 sm:p-5 text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full bg-white/20 border border-white/30 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-zinc-900 rounded-full" />
              </div>
              <div>
                <h4 className="font-display font-medium text-base text-white leading-tight">
                  IMSR Support Desk
                </h4>
                <p className="text-[11px] text-cyan-100 flex items-center gap-1.5 mt-0.5 font-light">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Online • Replies instantly
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsChatOpen(false)}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
              aria-label="Close Chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* CHAT BODY */}
          <div className="p-4 sm:p-5 max-h-[350px] overflow-y-auto space-y-4 text-xs sm:text-sm">
            <div className="text-center">
              <span className="px-2.5 py-1 rounded-full bg-white/10 text-zinc-400 text-[11px] font-mono">
                Today
              </span>
            </div>

            {/* BOT GREETING */}
            <div className="flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[#00bcda]/20 border border-[#00bcda]/40 flex items-center justify-center shrink-0 mt-0.5">
                <Bot className="w-3.5 h-3.5 text-[#00bcda]" />
              </div>
              <div className="bg-zinc-900 border border-white/10 rounded-2xl rounded-tl-none p-3.5 text-zinc-200 leading-relaxed shadow-sm">
                <p className="font-medium text-white mb-1 flex items-center gap-1.5">
                  Welcome to IMSR! <Sparkles className="w-3.5 h-3.5 text-cyan-300 inline" />
                </p>
                <p className="text-zinc-300 text-xs sm:text-[13px] font-light">
                  How can we help you today? Inquire about B.B.A., B.Com., Digital Media programs, or admissions.
                </p>
              </div>
            </div>

            {/* QUICK STATIC OPTIONS */}
            <div className="pl-9 space-y-2">
              <p className="text-[11px] uppercase tracking-wider text-zinc-400 font-medium">
                Quick Inquiries
              </p>
              <div className="flex flex-wrap gap-1.5">
                {[
                  "🎓 Admission 2027",
                  "📚 Fee & Eligibility",
                  "🏢 Campus Tour",
                  "💼 Placement Records",
                ].map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setMessage(item.slice(2).trim())}
                    className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-[#00bcda]/20 hover:border-[#00bcda]/50 border border-white/10 text-xs text-zinc-200 transition-all cursor-pointer text-left"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* DIRECT WHATSAPP PROMPT IN CHAT */}
            <div className="pl-9 pt-1">
              <a
                href="https://wa.me/919320556600?text=Hi%20IMSR%2C%20I%20would%20like%20to%20know%20more%20about%20admissions%20and%20programs."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/30 text-[#25D366] text-xs font-medium transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Chat live on WhatsApp: +91 9320556600</span>
              </a>
            </div>
          </div>

          {/* CHAT INPUT FORM (STATIC) */}
          <form
            onSubmit={handleSendMessage}
            className="p-3.5 border-t border-white/10 bg-zinc-900/90 flex items-center gap-2"
          >
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-white/5 border border-white/15 focus:border-[#00bcda] focus:outline-none rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white placeholder-zinc-500"
            />
            <button
              type="submit"
              className="w-9 h-9 rounded-xl bg-gradient-to-r from-[#00629f] to-[#00bcda] text-white flex items-center justify-center hover:opacity-90 active:scale-95 transition-all shadow-md cursor-pointer shrink-0"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}

      {/* ============================================================ */}
      {/* FLOATING ACTION BUTTONS STACK (BOTTOM RIGHT) */}
      {/* ORDER: 1. WHATSAPP  2. CHAT ICON  3. BACK TO TOP */}
      {/* ALL THREE BUTTONS MAINTAIN THE EXACT SAME SIZE */}
      {/* ============================================================ */}
      <div className="fixed bottom-6 right-4 sm:right-6 z-50 flex flex-col items-center gap-3 select-none pointer-events-auto">
        
        {/* 1. WHATSAPP FLOATING BUTTON */}
        <div className="relative group flex items-center justify-center">
          {/* DESKTOP HOVER TOOLTIP */}
          <div className="hidden sm:block absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-zinc-900/95 backdrop-blur-md text-white text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-xl border border-white/10">
            WhatsApp (+91 9320556600)
            <span className="absolute top-1/2 -right-1 -translate-y-1/2 border-4 border-transparent border-l-zinc-900/95" />
          </div>

          <a
            href="https://wa.me/919320556600?text=Hello%20IMSR%2C%20I%20would%20like%20to%20inquire%20about%20the%20programs."
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp +91 9320556600"
            className="w-[48px] h-[48px] rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white shadow-xl shadow-[#25D366]/30 hover:shadow-2xl hover:shadow-[#25D366]/50 flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer relative shrink-0"
            style={{ width: "48px", height: "48px" }}
          >
            {/* AMBIENT PULSING AURA RING */}
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 pointer-events-none" />

            {/* OFFICIAL WHATSAPP ICON */}
            <svg
              className="w-6 h-6 fill-current text-white relative z-10"
              viewBox="0 0 24 24"
            >
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
          </a>
        </div>

        {/* 2. STATIC CHAT SUPPORT BUTTON */}
        <div className="relative group flex items-center justify-center">
          {/* DESKTOP HOVER TOOLTIP */}
          <div className="hidden sm:block absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-zinc-900/95 backdrop-blur-md text-white text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-xl border border-white/10">
            {isChatOpen ? "Close Support Chat" : "Support Chat"}
            <span className="absolute top-1/2 -right-1 -translate-y-1/2 border-4 border-transparent border-l-zinc-900/95" />
          </div>

          <button
            onClick={() => setIsChatOpen(!isChatOpen)}
            aria-label="Toggle Support Chat"
            className={`w-[48px] h-[48px] rounded-full text-white shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer shrink-0 ${
              isChatOpen
                ? "bg-zinc-800 hover:bg-zinc-700 shadow-zinc-900/50"
                : "bg-gradient-to-r from-[#00629f] to-[#00bcda] shadow-[#00bcda]/30 hover:shadow-[#00bcda]/50"
            }`}
            style={{ width: "48px", height: "48px" }}
          >
            {isChatOpen ? (
              <X className="w-5.5 h-5.5 text-white" />
            ) : (
              <MessageSquare className="w-5.5 h-5.5 text-white" />
            )}
          </button>
        </div>

        {/* 3. BACK TO TOP BUTTON (SAME EXACT SIZE: 48px x 48px) */}
        <div className="relative group flex items-center justify-center">
          {/* DESKTOP HOVER TOOLTIP */}
          <div className="hidden sm:block absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-zinc-900/95 backdrop-blur-md text-white text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-xl border border-white/10">
            Back to Top
            <span className="absolute top-1/2 -right-1 -translate-y-1/2 border-4 border-transparent border-l-zinc-900/95" />
          </div>

          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className={`w-[48px] h-[48px] rounded-full border border-white/20 bg-zinc-950/85 backdrop-blur-md text-white/90 shadow-xl shadow-black/40 hover:bg-white hover:border-white hover:text-zinc-950 hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer shrink-0 ${
              isScrolled
                ? "opacity-100 scale-100"
                : "opacity-75 hover:opacity-100 scale-100"
            }`}
            style={{ width: "48px", height: "48px" }}
          >
            <ArrowUp className="w-5.5 h-5.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>
        </div>

      </div>
    </>
  );
}
