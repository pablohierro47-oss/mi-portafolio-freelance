"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useActionState } from "react";
import { submitContact } from "./actions/contact";

export default function Home() {
  const [state, formAction, isPending] = useActionState(submitContact, null);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-orange-600 selection:text-white">
      
      {/* HEADER / NAVBAR */}
      <header className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-2xl font-black text-white tracking-tighter flex items-center gap-2">
            <span className="text-orange-600 text-3xl">FF</span>
            FERRUM FORGE STUDIO
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-medium">
            <Link href="#servicios" className="hover:text-orange-500 transition-colors">Servicios</Link>
            <Link href="#proyectos" className="hover:text-orange-500 transition-colors">Proyectos</Link>
            <Link href="#proceso" className="hover:text-orange-500 transition-colors">Proceso</Link>
          </nav>
          <Link href="#contacto" className="hidden md:inline-flex bg-orange-600 text-white px-5 py-2.5 rounded-full text-sm font-bold transition-all hover:bg-orange-500 hover:scale-105">
            Pedir Presupuesto
          </Link>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(theme(colors.slate.900)_1px,transparent_1px)] [background-size:24px_24px] opacity-30"></div>
        <div className="relative z-10 max-w-5xl mx-auto">
          <span className="text-orange-500 font-bold tracking-widest uppercase text-sm mb-6 block">
            Agencia de Desarrollo Web
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight mb-6 text-white">
            Ingeniería y Diseño Web de <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-400">Alto Rendimiento</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            En Ferrum Forge creamos aplicaciones web a medida que impulsan tu negocio, combinando una solidez técnica extrema con una estética premium.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="#contacto" 
              className="bg-orange-600 text-white px-8 py-4 rounded-full font-bold transition-all duration-300 hover:bg-orange-500 hover:-translate-y-1 hover:shadow-[0_0_30px_-5px_rgba(234,88,12,0.6)]"
            >
              Comenzar Proyecto
            </Link>
            <Link 
              href="#proyectos" 
              className="bg-transparent text-slate-300 border border-slate-700 px-8 py-4 rounded-full font-bold transition-all duration-300 hover:bg-slate-900 hover:text-white hover:border-slate-500"
            >
              Ver Casos de Éxito
            </Link>
          </div>
        </div>
      </section>

      {/* TECH STACK TICKER */}
      <div className="w-full bg-slate-900 border-y border-slate-800 py-6 overflow-hidden flex">
        <div className="w-full max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-8 md:gap-16 text-slate-500 font-bold text-lg md:text-xl uppercase tracking-widest">
          <span>Next.js</span>
          <span>React</span>
          <span>TypeScript</span>
          <span>Tailwind CSS</span>
          <span>Node.js</span>
          <span>Vercel</span>
        </div>
      </div>

      {/* ABOUT ME SECTION */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* FOTO PROFESIONAL */}
          <div className="aspect-square bg-slate-900 rounded-3xl border border-slate-800 relative overflow-hidden">
            <Image
            src="/logo5.1.png"
            alt="Pablo Hierro - Ferrum Forge"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-top"
            priority
          />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">El balance perfecto entre <span className="text-orange-500">Ingeniería y Diseño</span></h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-6">
              Soy Pablo, el motor detrás de Ferrum Forge. Mi formación en <strong>Ingeniería de Software</strong> me permite construir arquitecturas web robustas, rápidas y seguras. Pero el código por sí solo no vende.
            </p>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              Por eso, lo combino con una obsesión por el diseño UI/UX. No hago "plantillas"; diseño interfaces personalizadas que capturan la esencia de tu marca y guían al usuario directo hacia la conversión.
            </p>
            <div className="flex gap-4 mb-8">
               <div className="flex flex-col">
                  <span className="text-3xl font-black text-white">100%</span>
                  <span className="text-sm text-slate-500">Código a Medida</span>
               </div>
               <div className="w-px bg-slate-800"></div>
               <div className="flex flex-col">
                  <span className="text-3xl font-black text-white">0</span>
                  <span className="text-sm text-slate-500">Plantillas Genéricas</span>
               </div>
            </div>

            {/* SOCIAL LINKS */}
            <div className="flex gap-4">
              <a 
                href="https://github.com/pablohierro47-oss" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-xl text-slate-400 hover:text-white hover:border-slate-600 transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                GitHub
              </a>
              <a 
                href="https://www.linkedin.com/in/pablo-hierro-dev" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-xl text-slate-400 hover:text-white hover:border-slate-600 transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="servicios" className="py-24 px-6 bg-slate-900/50 border-y border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">¿Cómo puedo ayudarte?</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">Soluciones integrales para que tu negocio domine el entorno digital.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-950 p-8 rounded-2xl shadow-sm border border-slate-800 transition-all duration-300 hover:-translate-y-2 hover:border-orange-600 group">
              <div className="w-14 h-14 bg-orange-600/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-orange-600 transition-colors duration-300">
                <span className="text-orange-500 group-hover:text-white text-2xl transition-colors">🎨</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Diseño UI/UX</h3>
              <p className="text-slate-400 leading-relaxed">Interfaces modernas, intuitivas y centradas en el usuario para garantizar la mejor experiencia de navegación y conversiones.</p>
            </div>
            <div className="bg-slate-950 p-8 rounded-2xl shadow-sm border border-slate-800 transition-all duration-300 hover:-translate-y-2 hover:border-orange-600 group">
              <div className="w-14 h-14 bg-orange-600/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-orange-600 transition-colors duration-300">
                <span className="text-orange-500 group-hover:text-white text-2xl transition-colors">💻</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Desarrollo a Medida</h3>
              <p className="text-slate-400 leading-relaxed">Aplicaciones web robustas utilizando las últimas tecnologías (React, Next.js) asegurando un rendimiento impecable.</p>
            </div>
            <div className="bg-slate-950 p-8 rounded-2xl shadow-sm border border-slate-800 transition-all duration-300 hover:-translate-y-2 hover:border-orange-600 group">
              <div className="w-14 h-14 bg-orange-600/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-orange-600 transition-colors duration-300">
                <span className="text-orange-500 group-hover:text-white text-2xl transition-colors">⚙️</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Mantenimiento</h3>
              <p className="text-slate-400 leading-relaxed">Soporte técnico continuo, optimización SEO y actualizaciones de seguridad para que tu web nunca se caiga.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN DE PROYECTOS TÉCNICOS */}
      <section id="proyectos" className="py-24 bg-slate-950 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">
              Ingeniería <span className="text-orange-500">Real</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              No solo hacemos webs bonitas. Desarrollamos arquitecturas complejas, bases de datos eficientes y algoritmos a bajo nivel.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            
            {/* TARJETA 1: AUTODEUSTO */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="group bg-slate-900/80 border border-slate-800 rounded-3xl p-8 hover:border-orange-500/50 hover:bg-slate-900 transition-all duration-300 shadow-xl"
            >
              <div className="h-12 w-12 bg-orange-500/10 rounded-2xl flex items-center justify-center mb-6 border border-orange-500/20 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">AutoDeusto: Arquitectura C/C++</h3>
              <p className="text-slate-400 mb-6 leading-relaxed">
                Sistema de gestión robusto desarrollado con una arquitectura puro Cliente-Servidor. Implementación de conexiones por sockets y gestión de base de datos relacional SQLite a bajo nivel para garantizar un rendimiento extremo sin intermediarios.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-slate-950 border border-slate-800 text-orange-400 px-3 py-1 rounded-full text-xs font-bold tracking-wider">C/C++</span>
                <span className="bg-slate-950 border border-slate-800 text-orange-400 px-3 py-1 rounded-full text-xs font-bold tracking-wider">SQLite</span>
                <span className="bg-slate-950 border border-slate-800 text-orange-400 px-3 py-1 rounded-full text-xs font-bold tracking-wider">Sockets TCP/IP</span>
              </div>
            </motion.div>

            {/* TARJETA 2: DEUSTOCHESS */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="group bg-slate-900/80 border border-slate-800 rounded-3xl p-8 hover:border-emerald-500/50 hover:bg-slate-900 transition-all duration-300 shadow-xl"
            >
              <div className="h-12 w-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 border border-emerald-500/20 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">DeustoChess: Motor Lógico</h3>
              <p className="text-slate-400 mb-6 leading-relaxed">
                Desarrollo completo de un motor de ajedrez basado en Programación Orientada a Objetos (POO). Diseño complejo de jerarquías de clases, polimorfismo y validación algorítmica de movimientos en tiempo real para todas las piezas del tablero.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-slate-950 border border-slate-800 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold tracking-wider">Java</span>
                <span className="bg-slate-950 border border-slate-800 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold tracking-wider">POO Avanzada</span>
                <span className="bg-slate-950 border border-slate-800 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold tracking-wider">Algoritmia</span>
              </div>
            </motion.div>

            {/* TARJETA 3: MI PORTAFOLIO FREELANCE */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="group bg-slate-900/80 border border-slate-800 rounded-3xl p-8 hover:border-violet-500/50 hover:bg-slate-900 transition-all duration-300 shadow-xl"
            >
              <div className="h-12 w-12 bg-violet-500/10 rounded-2xl flex items-center justify-center mb-6 border border-violet-500/20 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Ferrum Forge: Portafolio Freelance</h3>
              <p className="text-slate-400 mb-6 leading-relaxed">
                Este mismo sitio web. Diseñado y desarrollado desde cero con Next.js 14, App Router y Tailwind CSS. Incluye gestión de leads integrada, animaciones con Framer Motion y despliegue optimizado en Vercel.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-slate-950 border border-slate-800 text-violet-400 px-3 py-1 rounded-full text-xs font-bold tracking-wider">Next.js 14</span>
                <span className="bg-slate-950 border border-slate-800 text-violet-400 px-3 py-1 rounded-full text-xs font-bold tracking-wider">Tailwind CSS</span>
                <span className="bg-slate-950 border border-slate-800 text-violet-400 px-3 py-1 rounded-full text-xs font-bold tracking-wider">Framer Motion</span>
              </div>
              <a 
                href="https://github.com/pablohierro47-oss/mi-portafolio-freelance"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 text-sm font-bold transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                Ver en GitHub →
              </a>
            </motion.div>

            {/* TARJETA 4: FIESTAS WEB */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              className="group bg-slate-900/80 border border-slate-800 rounded-3xl p-8 hover:border-amber-500/50 hover:bg-slate-900 transition-all duration-300 shadow-xl"
            >
              <div className="h-12 w-12 bg-amber-500/10 rounded-2xl flex items-center justify-center mb-6 border border-amber-500/20 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">FiestasWeb: Plataforma de Eventos</h3>
              <p className="text-slate-400 mb-6 leading-relaxed">
                Plataforma web para la gestión y promotion de eventos y fiestas. Diseño orientado a la conversión con gestión de reservas, landing pages personalizadas y optimización para móvil.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-slate-950 border border-slate-800 text-amber-400 px-3 py-1 rounded-full text-xs font-bold tracking-wider">React</span>
                <span className="bg-slate-950 border border-slate-800 text-amber-400 px-3 py-1 rounded-full text-xs font-bold tracking-wider">Next.js</span>
                <span className="bg-slate-950 border border-slate-800 text-amber-400 px-3 py-1 rounded-full text-xs font-bold tracking-wider">UI/UX</span>
              </div>
              <a 
                href="https://github.com/pablohierro47-oss/fiestas-web"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 text-sm font-bold transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                Ver en GitHub →
              </a>
            </motion.div>

          </div>
        </div>
      </section>

      {/* WORK PROCESS SECTION */}
      <section id="proceso" className="py-24 px-6 bg-slate-900/50 border-y border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Mi Proceso de Trabajo</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">Metodología de ingeniería aplicada para que tu proyecto vea la luz sin retrasos.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-slate-950 text-orange-500 font-black text-2xl rounded-2xl flex items-center justify-center mx-auto mb-4 border border-orange-600/30 shadow-[0_0_15px_rgba(234,88,12,0.2)]">1</div>
              <h3 className="text-xl font-bold mb-2 text-white">Descubrimiento</h3>
              <p className="text-slate-400">Análisis de objetivos, competencia y definición de la arquitectura.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-slate-950 text-orange-500 font-black text-2xl rounded-2xl flex items-center justify-center mx-auto mb-4 border border-orange-600/30 shadow-[0_0_15px_rgba(234,88,12,0.2)]">2</div>
              <h3 className="text-xl font-bold mb-2 text-white">Diseño UI/UX</h3>
              <p className="text-slate-400">Creación de prototipos visuales antes de escribir una sola línea de código.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-slate-950 text-orange-500 font-black text-2xl rounded-2xl flex items-center justify-center mx-auto mb-4 border border-orange-600/30 shadow-[0_0_15px_rgba(234,88,12,0.2)]">3</div>
              <h3 className="text-xl font-bold mb-2 text-white">Desarrollo</h3>
              <p className="text-slate-400">Programación a medida con tecnologías de alto rendimiento.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-slate-950 text-orange-500 font-black text-2xl rounded-2xl flex items-center justify-center mx-auto mb-4 border border-orange-600/30 shadow-[0_0_15px_rgba(234,88,12,0.2)]">4</div>
              <h3 className="text-xl font-bold mb-2 text-white">Lanzamiento</h3>
              <p className="text-slate-400">Pruebas de estrés, despliegue en servidores y optimización SEO.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-24 px-6 max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Preguntas Frecuentes</h2>
        </div>
        <div className="space-y-4">
          <details className="group bg-slate-900 border border-slate-800 rounded-2xl p-6 cursor-pointer open:border-orange-600/50 transition-colors">
            <summary className="text-lg font-bold text-white outline-none flex justify-between items-center">
              ¿Cuánto tiempo tardas en desarrollar una web?
              <span className="text-orange-500 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-4 text-slate-400 leading-relaxed">
              Depende de la complejidad. Una Landing Page corporativa suele estar lista en 2-3 semanas. Proyectos más complejos pueden llevar entre 1 y 2 meses. Siempre establecemos plazos cerrados desde el día 1.
            </p>
          </details>
          <details className="group bg-slate-900 border border-slate-800 rounded-2xl p-6 cursor-pointer open:border-orange-600/50 transition-colors">
            <summary className="text-lg font-bold text-white outline-none flex justify-between items-center">
              ¿Usas WordPress o plantillas prefabricadas?
              <span className="text-orange-500 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-4 text-slate-400 leading-relaxed">
              No. Todo el desarrollo se hace a medida utilizando Next.js y React. Esto garantiza que tu web sea extremadamente rápida, segura ante hackeos y totalmente exclusiva para tu marca.
            </p>
          </details>
          <details className="group bg-slate-900 border border-slate-800 rounded-2xl p-6 cursor-pointer open:border-orange-600/50 transition-colors">
            <summary className="text-lg font-bold text-white outline-none flex justify-between items-center">
              ¿Haces tiendas online / e-commerce?
              <span className="text-orange-500 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-4 text-slate-400 leading-relaxed">
              Sí. Integro pasarelas de pago como Stripe o PayPal, gestión de inventario y catálogos de productos. Todo a medida, sin depender de plataformas de terceros que limiten tu crecimiento.
            </p>
          </details>
          <details className="group bg-slate-900 border border-slate-800 rounded-2xl p-6 cursor-pointer open:border-orange-600/50 transition-colors">
            <summary className="text-lg font-bold text-white outline-none flex justify-between items-center">
              ¿El hosting y el dominio están incluidos?
              <span className="text-orange-500 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-4 text-slate-400 leading-relaxed">
              El desarrollo no incluye hosting ni dominio por defecto, pero te asesoro y configuro todo en plataformas como Vercel o AWS. El coste suele ser mínimo (desde 0€/mes en Vercel para proyectos pequeños).
            </p>
          </details>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contacto" className="py-24 px-6 max-w-5xl mx-auto">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 md:p-16 shadow-[0_0_40px_rgba(234,88,12,0.1)] relative overflow-hidden flex flex-col md:flex-row gap-12">
          
          {/* Lado izquierdo */}
          <div className="md:w-1/2 flex flex-col justify-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-white leading-tight">
              ¿Hablamos de tu <br/><span className="text-orange-500">próximo proyecto?</span>
            </h2>
            <p className="text-slate-400 text-lg mb-8">
              Cuéntame qué necesitas. Analizaremos tu caso sin compromiso y te daré una solución tecnológica real para impulsar tu negocio.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-slate-300">
                <span className="w-10 h-10 bg-slate-950 rounded-full flex items-center justify-center border border-slate-800 text-orange-500">✉️</span>
                pablohierro47@gmail.com
              </div>
              <div className="flex items-center gap-4 text-slate-300">
                <span className="w-10 h-10 bg-slate-950 rounded-full flex items-center justify-center border border-slate-800 text-orange-500">📞</span>
                +34 612 345 678
              </div>
              <div className="flex items-center gap-4 text-slate-300">
                <span className="w-10 h-10 bg-slate-950 rounded-full flex items-center justify-center border border-slate-800 text-orange-500">📍</span>
                Bilbao (Bizkaia) / Castro-Urdiales (Cantabria)
              </div>
            </div>
          </div>

          {/* Lado derecho: Formulario */}
          <div className="md:w-1/2 relative z-10 bg-slate-950 p-8 rounded-2xl border border-slate-800">
            <form action={formAction} className="space-y-6 text-left">
              
              {state?.success && (
                <div className="bg-emerald-500/20 border border-emerald-400 text-emerald-100 px-4 py-3 rounded-xl text-center font-medium">
                  {state.message}
                </div>
              )}
              {state?.error && (
                <div className="bg-red-500/20 border border-red-400 text-red-100 px-4 py-3 rounded-xl text-center font-medium">
                  {state.error}
                </div>
              )}
              
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-2">Nombre completo</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                  placeholder="Ej. Carlos Martínez"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-2">Correo electrónico</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                  placeholder="hola@tuempresa.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-400 mb-2">Háblame de tu proyecto</label>
                <textarea 
                  id="message" 
                  name="message"
                  rows={4}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors resize-none"
                  placeholder="Me gustaría desarrollar una web para..."
                  required
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={isPending}
                className="w-full bg-orange-600 text-white font-bold py-4 rounded-xl transition-all duration-300 hover:bg-orange-500 hover:shadow-[0_0_20px_-5px_rgba(234,88,12,0.5)] disabled:opacity-70"
              >
                {isPending ? 'Enviando...' : 'Enviar Mensaje'}
              </button>

              <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center items-center text-sm">
                <span className="text-slate-500">O si lo prefieres:</span>
                <a href="https://wa.me/34620251864" target="_blank" rel="noopener noreferrer" className="text-orange-400 font-medium underline underline-offset-4 hover:text-orange-300 transition-colors">WhatsApp</a>
                <a href="mailto:ferrumforge26@gmail.com" className="text-orange-400 font-medium underline underline-offset-4 hover:text-orange-300 transition-colors">Email</a>
              </div>
            </form>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-900 py-10 text-center text-slate-600 text-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-6">
          <p>© {new Date().getFullYear()} Ferrum Forge. Todos los derechos reservados.</p>
          <div className="flex gap-6 mt-4 md:mt-0 items-center">
            {/* ENLACE SECRETO AL PANEL ADMIN */}
            <Link href="/admin" className="w-2 h-2 rounded-full bg-slate-800 hover:bg-orange-500 transition-colors" aria-label="Admin Login"></Link>
            
            <a href="https://github.com/pablohierro47-oss" target="_blank" rel="noopener noreferrer" className="hover:text-slate-400 transition-colors">GitHub</a>
            <a href="https://www.linkedin.com/in/pablo-hierro-dev" target="_blank" rel="noopener noreferrer" className="hover:text-slate-400 transition-colors">LinkedIn</a>
            <Link href="#" className="hover:text-slate-400 transition-colors">Aviso Legal</Link>
            <Link href="#" className="hover:text-slate-400 transition-colors">Política de Privacidad</Link>
          </div>
        </div>
      </footer>

    </main>
  );
}