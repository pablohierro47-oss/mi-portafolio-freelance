"use client";
import { motion } from "framer-motion";

export default function ForgeLoader() {
  return (
    <div 
      className="fixed inset-0 bg-slate-950 z-[100] flex flex-col items-center justify-center"
      role="status"
      aria-label="Cargando contenido"
    >
      
      {/* Martillo animado (Ajustado para que el golpe sea más rápido y contundente) */}
      <motion.div 
        animate={{ 
          rotate: [-20, 35, -20], 
          y: [-5, 5, -5] 
        }}
        transition={{ 
          duration: 0.8, 
          repeat: Infinity, 
          times: [0, 0.3, 1], // El golpe es más rápido que la recuperación
          ease: "easeInOut" 
        }}
        className="text-6xl ml-16 origin-bottom-right z-10"
        aria-hidden="true"
      >
        🔨
      </motion.div>
      
      {/* Yunque con leve animación de impacto y atributos de accesibilidad */}
      <motion.div
        animate={{ scale: [1, 0.95, 1], y: [0, 2, 0] }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          times: [0, 0.3, 1],
          ease: "easeInOut"
        }}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512" 
          className="w-24 h-24 text-slate-400 border-b-4 border-orange-600 pb-2 drop-shadow-[0_15px_15px_rgba(234,88,12,0.6)] relative z-20"
          aria-hidden="true"
        >
          <path 
            fill="currentColor" 
            d="M416 112H96C42.98 112 0 154.1 0 208c0 35.35 28.65 64 64 64h32v64H64c-17.67 0-32 14.33-32 32v112h448V368c0-17.67-14.33-32-32-32h-32v-64h24c75.11 0 128-60.89 128-136C500 120.3 487.3 112 474.3 112zM320 336H192v-64h128V336z"
          />
        </svg>
      </motion.div>

      <p className="text-orange-500 font-black tracking-[0.3em] mt-8 animate-pulse" aria-hidden="true">
        FORJANDO...
      </p>
      
      {/* Texto visible solo para lectores de pantalla */}
      <span className="sr-only">Cargando el contenido...</span>
    </div>
  );
}