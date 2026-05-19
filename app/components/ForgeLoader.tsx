"use client";
import { motion } from "framer-motion";

export default function ForgeLoader() {
  return (
    <div className="fixed inset-0 bg-slate-950 z-[100] flex flex-col items-center justify-center">
      
      {/* Martillo animado (Ajustado para que "golpee" el yunque) */}
      <motion.div 
        animate={{ rotate: [-20, 25, -20], y: [-5, 5, -5] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
        className="text-6xl ml-16 origin-bottom-right"
      >
        🔨
      </motion.div>
      
      {/* Icono de Yunque (SVG puro) con resplandor naranja */}
      <svg 
        viewBox="0 0 512 512" 
        className="w-24 h-24 text-slate-400 border-b-4 border-orange-600 pb-2 drop-shadow-[0_15px_15px_rgba(234,88,12,0.6)]"
      >
        <path 
          fill="currentColor" 
          d="M416 112H96C42.98 112 0 154.1 0 208c0 35.35 28.65 64 64 64h32v64H64c-17.67 0-32 14.33-32 32v112h448V368c0-17.67-14.33-32-32-32h-32v-64h24c75.11 0 128-60.89 128-136C500 120.3 487.3 112 474.3 112zM320 336H192v-64h128V336z"
        />
      </svg>

      <p className="text-orange-500 font-black tracking-[0.3em] mt-8 animate-pulse">
        FORJANDO...
      </p>
    </div>
  );
}