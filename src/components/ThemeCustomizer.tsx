import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, X, Check } from "lucide-react";
import { usePortfolio, accentColors } from "@/data/PortfolioContext";

const ThemeCustomizer = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { accentColor, setAccentColor } = usePortfolio();
  const customizerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (customizerRef.current && !customizerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  return (
    <div className="fixed bottom-24 right-6 z-[100]" ref={customizerRef}>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-card border border-border shadow-2xl flex items-center justify-center hover:shadow-primary/20 transition-shadow text-muted-foreground hover:text-primary"
      >
        <Palette className="w-5 h-5" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, x: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20, x: 20 }}
            className="absolute bottom-16 right-0 w-64 bg-card border border-border p-6 rounded-3xl shadow-2xl font-sans"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xs uppercase font-black text-primary tracking-widest">Theme Accent</h4>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {accentColors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setAccentColor(color.value)}
                  className={`flex items-center gap-2 p-2 rounded-xl border transition-all ${
                    accentColor === color.value 
                    ? "border-primary bg-primary/5 shadow-[0_0_10px_hsl(var(--primary)/0.1)]" 
                    : "border-white/5 hover:border-white/20 hover:bg-white/5"
                  }`}
                >
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: `hsl(${color.value})` }}
                  />
                  <span className="text-[10px] font-bold truncate">{color.name}</span>
                  {accentColor === color.value && <Check className="w-3 h-3 text-primary ml-auto" />}
                </button>
              ))}
            </div>

            <p className="mt-4 text-[9px] text-muted-foreground italic text-center leading-tight">
              Personalize the interface to match your preference. Changes are saved automatically.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeCustomizer;
