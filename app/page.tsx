"use client";

import Image from "next/image";
import { motion, useInView, useMotionValue, useSpring, AnimatePresence, useScroll } from "framer-motion";
import { useActionState, useRef, useEffect, useState } from "react";
import { submitContact } from "./actions/contact";
import { getApprovedTestimonials } from "./actions/testimonials";
import ForgeLoader from "./components/ForgeLoader"; // Importamos el cargador

// ─── ANIMATED COUNTER HOOK ────────────────────────────────────────────────────
function useCounter(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

// ─── STAT CARD ────────────────────────────────────────────────────────────────
function StatCard({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const count = useCounter(value, 1800, inView);
  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-black text-white mb-1">
        {count}<span className="text-orange-500">{suffix}</span>
      </div>
      <div className="text-slate-400 text-sm font-medium">{label}</div>
    </div>
  );
}

// ─── DATOS ESTÁTICOS (CONTENIDO) ─────────────────────────────────────────────
const FAQS = [
  { q: "¿Cuánto tiempo tardas en desarrollar una web?", a: "Depende de la complejidad. Una Landing Page corporativa suele estar lista en 2-3 semanas. Proyectos más complejos pueden llevar entre 1 y 2 meses. Siempre establecemos plazos cerrados desde el día 1." },
  { q: "¿Usas WordPress o plantillas prefabricadas?", a: "No. Todo el desarrollo se hace a medida utilizando Next.js y React. Esto garantiza que tu web sea extremadamente rápida, segura ante hackeos y totalmente exclusiva para tu marca." },
  { q: "¿Haces tiendas online / e-commerce?", a: "Sí. Integro pasarelas de pago como Stripe o PayPal, gestión de inventario y catálogos de productos. Todo a medida, sin depender de plataformas de terceros que limiten tu crecimiento." },
  { q: "¿El hosting y el dominio están incluidos?", a: "El desarrollo no incluye hosting ni dominio por defecto, pero te asesoro y configuro todo en plataformas como Vercel o AWS. El coste suele ser mínimo (desde 0€/mes en Vercel para proyectos pequeños)." },
  { q: "¿Qué pasa si quiero cambios después de la entrega?", a: "Los planes incluyen un periodo de revisiones gratuitas. Pasado ese tiempo, ofrezco planes de mantenimiento mensuales o presupuesto por hora para cambios puntuales. Siempre con respuesta en menos de 24h." },
];

type Testimonial = {
  id: string;
  name: string;
  role: string;
  avatar: string;
  message: string;
  stars: number;
};

export default function Home() {
  const [state, formAction, isPending] = useActionState(submitContact, null);
  const [showCopiedTooltip, setShowCopiedTooltip] = useState(false);
  
  const handleShare = async () => {
    const shareData = {
      title: "Ferrum Forge Studio | Desarrollo Web a Medida",
      text: "Ingeniería y diseño web a medida. Sin plantillas. Sin intermediarios.",
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setShowCopiedTooltip(true);
        setTimeout(() => {
          setShowCopiedTooltip(false);
        }, 2500);
      }
    } catch (error) {
      console.error("Error al compartir:", error);
      alert("No se pudo compartir o copiar el enlace.");
    }
  };

  // ─── ESTADOS PARA CARGADOR Y CURSOR ───────────────────────────────────────
  const [loading, setLoading] = useState(true);

  // Usamos useMotionValue en lugar de useState para evitar re-renderizar
  // todo el componente Home cada vez que se mueve el ratón.
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const sparkX = useSpring(mouseX, { stiffness: 500, damping: 28, mass: 2 });
  const sparkY = useSpring(mouseY, { stiffness: 500, damping: 28, mass: 2 });
  const coreX = useSpring(mouseX, { stiffness: 1000, damping: 40, mass: 1 });
  const coreY = useSpring(mouseY, { stiffness: 1000, damping: 40, mass: 1 });

  // ─── SCROLL PROGRESS & BACK TO TOP ───────────────────────────────────────
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const [showScrollTop, setShowScrollTop] = useState(false);

  // ─── ESTADOS DE TESTIMONIOS ─────────────────────────────────────────────
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loadingTestimonials, setLoadingTestimonials] = useState(true);

  useEffect(() => {
    async function fetchTestimonials() {
      const res = await getApprovedTestimonials();
      if (res.success) setTestimonials(res.data);
      setLoadingTestimonials(false);
    }
    fetchTestimonials();
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Efecto para ocultar el cargador tras 2 segundos
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Efecto para rastrear el ratón (Cursor de chispa)
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, [mouseX, mouseY]);

  // Si está cargando, mostramos la pantalla de forja
  if (loading) return <ForgeLoader />;

  return (
    <main className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-orange-600 selection:text-white">

      {/* ── PROGRESS BAR ────────────────────────────────────────────────────── */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-600 to-amber-400 origin-left z-[100]" style={{ scaleX }} />

      {/* ── CUSTOM CURSOR (Chispa) Solo en Desktop ──────────────────────────── */}
      <motion.div
        className="hidden md:block fixed top-0 left-0 w-8 h-8 bg-orange-500/30 rounded-full pointer-events-none z-[9999] blur-md mix-blend-screen"
        style={{ x: sparkX, y: sparkY, translateX: "-50%", translateY: "-50%" }}
      />
      <motion.div
        className="hidden md:block fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[10000] shadow-[0_0_10px_2px_rgba(234,88,12,0.8)]"
        style={{ x: coreX, y: coreY, translateX: "-50%", translateY: "-50%" }}
      />

      {/* ── TOOLTIP "COPIADO" PARA EL BOTÓN DE COMPARTIR ────────────────────── */}
      <AnimatePresence>
        {showCopiedTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 bg-slate-800 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-lg"
          >
            ¡Enlace copiado!
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── FLOATING SHARE BUTTON ─────────────────────────────────────────── */}
      <button
        onClick={handleShare}
        aria-label="Compartir esta página"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-orange-600 hover:bg-orange-500 text-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(234,88,12,0.5)] hover:shadow-[0_0_30px_rgba(234,88,12,0.7)] transition-all duration-300 hover:scale-110"
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.368a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
        </svg>
      </button>

      {/* ── BACK TO TOP BUTTON ────────────────────────────────────────────── */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            className="fixed bottom-24 right-6 z-40"
          >
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Volver arriba" className="w-14 h-14 bg-slate-800 hover:bg-slate-700 text-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 border border-slate-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7"/></svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HEADER / NAVBAR ─────────────────────────────────────────────────── */}
      <header className="fixed top-0 w-full z-50 bg-slate-950/70 backdrop-blur-xl border-b border-slate-900 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-2xl font-black text-white tracking-tighter flex items-center gap-2">
            <span className="text-orange-600 text-3xl">FF</span>
            FERRUM FORGE STUDIO
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-medium">
            <a href="#servicios" className="hover:text-orange-500 transition-colors">Servicios</a>
            <a href="#rendimiento" className="hover:text-orange-500 transition-colors">Métricas</a>
            <a href="#proyectos" className="hover:text-orange-500 transition-colors">Proyectos</a>
            <a href="#precios" className="hover:text-orange-500 transition-colors">Precios</a>
          </nav>
          <a href="#contacto" className="hidden md:inline-flex bg-orange-600 text-white px-5 py-2.5 rounded-full text-sm font-bold transition-all hover:bg-orange-500 hover:scale-105">
            Pedir Presupuesto
          </a>
        </div>
      </header>

      {/* ── HERO SECTION ────────────────────────────────────────────────────── */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(theme(colors.slate.900)_1px,transparent_1px)] [background-size:24px_24px] opacity-30"></div>
        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <span className="text-orange-500 font-bold tracking-widest uppercase text-sm mb-6 block">
              Agencia de Desarrollo Web
            </span>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight mb-6 text-white">
              Ingeniería y Diseño Web de <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-400 drop-shadow-[0_0_15px_rgba(234,88,12,0.3)]">Alto Rendimiento</span>
            </h1>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
            <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              En Ferrum Forge creamos aplicaciones web a medida que impulsan tu negocio, combinando una solidez técnica extrema con una estética premium.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#contacto"
              className="bg-orange-600 text-white px-8 py-4 rounded-full font-bold transition-all duration-300 hover:bg-orange-500 hover:-translate-y-1 hover:shadow-[0_0_30px_-5px_rgba(234,88,12,0.6)]"
            >
              Comenzar Proyecto
            </a>
            <a
              href="#proyectos"
              className="bg-transparent text-slate-300 border border-slate-700 px-8 py-4 rounded-full font-bold transition-all duration-300 hover:bg-slate-900 hover:text-white hover:border-slate-500"
            >
              Ver Casos de Éxito
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── TECH STACK TICKER ───────────────────────────────────────────────── */}
      <div className="w-full bg-slate-900 border-y border-slate-800 py-6 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-8 md:gap-14">
          {[
            { name: "Next.js", icon: "N" },
            { name: "React", icon: "⚛" },
            { name: "TypeScript", icon: "TS" },
            { name: "Tailwind CSS", icon: "🎨" },
            { name: "Node.js", icon: "⬡" },
            { name: "Vercel", icon: "▲" },
          ].map((t) => (
            <div key={t.name} className="flex items-center gap-2 text-slate-500 hover:text-slate-300 transition-colors cursor-default font-bold text-sm md:text-base uppercase tracking-widest">
              <span className="text-orange-500 font-black text-base">{t.icon}</span>
              {t.name}
            </div>
          ))}
        </div>
      </div>

      {/* ── STATS COUNTER ───────────────────────────────────────────────────── */}
      <section className="py-20 px-6 border-b border-slate-900">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10"
        >
          <StatCard value={12} suffix="+" label="Proyectos Entregados" />
          <StatCard value={100} suffix="%" label="Código a Medida" />
          <StatCard value={98} suffix="" label="Puntuación Lighthouse" />
          <StatCard value={0} suffix="" label="Plantillas Genéricas" />
        </motion.div>
      </section>

      {/* ── ABOUT ME SECTION ────────────────────────────────────────────────── */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="aspect-square bg-slate-900 rounded-3xl border border-slate-800 relative overflow-hidden">
            <Image
              src="/logo5.1.png"
              alt="Pablo Hierro - Ferrum Forge"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-top"
              loading="lazy"
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
            <div className="flex gap-4">
              <a href="https://github.com/pablohierro47-oss" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-xl text-slate-400 hover:text-white hover:border-slate-600 transition-all duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/pablo-hierro-dev" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-xl text-slate-400 hover:text-white hover:border-slate-600 transition-all duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES SECTION ────────────────────────────────────────────────── */}
      <section id="servicios" className="py-24 px-6 bg-slate-900/50 border-y border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">¿Cómo puedo ayudarte?</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">Soluciones integrales para que tu negocio domine el entorno digital.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "🎨", title: "Diseño UI/UX", desc: "Interfaces modernas, intuitivas y centradas en el usuario para garantizar la mejor experiencia de navegación y conversiones." },
              { icon: "💻", title: "Desarrollo a Medida", desc: "Aplicaciones web robustas utilizando las últimas tecnologías (React, Next.js) asegurando un rendimiento impecable." },
              { icon: "⚙️", title: "Mantenimiento", desc: "Soporte técnico continuo, optimización SEO y actualizaciones de seguridad para que tu web nunca se caiga." },
            ].map((s) => (
              <div key={s.title} className="bg-slate-950 p-8 rounded-2xl shadow-sm border border-slate-800 transition-all duration-300 hover:-translate-y-2 hover:border-orange-600 group">
                <div className="w-14 h-14 bg-orange-600/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-orange-600 transition-colors duration-300">
                  <span className="text-orange-500 group-hover:text-white text-2xl transition-colors">{s.icon}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{s.title}</h3>
                <p className="text-slate-400 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIVE PERFORMANCE DASHBOARD (NUEVO) ──────────────────────────────── */}
      <section id="rendimiento" className="py-24 px-6 bg-slate-950 border-b border-slate-800 relative overflow-hidden">
        {/* Fondo sutil de "cuadrícula técnica" */}
        <div className="absolute inset-0 bg-[radial-gradient(theme(colors.orange.600)_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.03]"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Rendimiento en <span className="text-orange-500">Tiempo Real</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              La velocidad no es un lujo, es una métrica de conversión. Así rinden las arquitecturas que forjamos.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Tarjeta 1: Lighthouse */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: 0.1 }} viewport={{ once: true }}
              className="bg-slate-900 border border-slate-800 p-8 rounded-3xl text-center shadow-lg hover:border-emerald-500/50 transition-colors"
            >
              <div className="w-24 h-24 mx-auto border-4 border-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                <span className="text-3xl font-black text-emerald-400">100</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Lighthouse Score</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Puntuación perfecta en rendimiento, accesibilidad, mejores prácticas y SEO técnico.</p>
            </motion.div>

            {/* Tarjeta 2: TTFB (Server Response) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: 0.2 }} viewport={{ once: true }}
              className="bg-slate-900 border border-slate-800 p-8 rounded-3xl text-center shadow-lg relative overflow-hidden hover:border-orange-500/50 transition-colors"
            >
               <div className="absolute top-6 right-6 flex items-center gap-2">
                 <span className="relative flex h-3 w-3">
                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                   <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
                 </span>
                 <span className="text-xs font-bold text-orange-500 tracking-widest">LIVE</span>
               </div>
               <div className="text-5xl font-black text-white mb-2 mt-6">42<span className="text-2xl text-slate-500">ms</span></div>
               <h3 className="text-xl font-bold text-orange-400 mb-2">TTFB Global</h3>
               <p className="text-slate-400 text-sm leading-relaxed">Tiempo hasta el primer byte. Utilizamos servidores Edge globales para reducir la latencia al mínimo.</p>
            </motion.div>

            {/* Tarjeta 3: Uptime */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: 0.3 }} viewport={{ once: true }}
              className="bg-slate-900 border border-slate-800 p-8 rounded-3xl text-center shadow-lg hover:border-blue-500/50 transition-colors"
            >
               <div className="text-5xl font-black text-white mb-2 mt-6">99.9<span className="text-2xl text-slate-500">%</span></div>
               <h3 className="text-xl font-bold text-blue-400 mb-2">Uptime Garantizado</h3>
               <p className="text-slate-400 text-sm leading-relaxed">Arquitecturas Serverless y bases de datos distribuidas a prueba de caídas masivas de tráfico.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS SECTION ────────────────────────────────────────────────── */}
      <section id="proyectos" className="py-24 bg-slate-950 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">
              Ingeniería <span className="text-orange-500">Real</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              No solo hacemos webs bonitas. Desarrollamos arquitecturas complejas, bases de datos eficientes y algoritmos a bajo nivel.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true }}
              className="group bg-slate-900/80 border border-slate-800 rounded-3xl p-8 hover:border-orange-500/50 hover:bg-slate-900 transition-all duration-300 shadow-xl">
              <div className="h-12 w-12 bg-orange-500/10 rounded-2xl flex items-center justify-center mb-6 border border-orange-500/20 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">AutoDeusto: Arquitectura C/C++</h3>
              <p className="text-slate-400 mb-6 leading-relaxed">Sistema de gestión robusto desarrollado con una arquitectura puro Cliente-Servidor. Implementación de conexiones por sockets y gestión de base de datos relacional SQLite a bajo nivel para garantizar un rendimiento extremo sin intermediarios.</p>
              <div className="flex flex-wrap gap-2">
                {["C/C++", "SQLite", "Sockets TCP/IP"].map(t => <span key={t} className="bg-slate-950 border border-slate-800 text-orange-400 px-3 py-1 rounded-full text-xs font-bold tracking-wider">{t}</span>)}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.4 }} viewport={{ once: true }}
              className="group bg-slate-900/80 border border-slate-800 rounded-3xl p-8 hover:border-emerald-500/50 hover:bg-slate-900 transition-all duration-300 shadow-xl">
              <div className="h-12 w-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 border border-emerald-500/20 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">DeustoChess: Motor Lógico</h3>
              <p className="text-slate-400 mb-6 leading-relaxed">Desarrollo completo de un motor de ajedrez basado en Programación Orientada a Objetos (POO). Diseño complejo de jerarquías de clases, polimorfismo y validación algorítmica de movimientos en tiempo real para todas las piezas del tablero.</p>
              <div className="flex flex-wrap gap-2">
                {["Java", "POO Avanzada", "Algoritmia"].map(t => <span key={t} className="bg-slate-950 border border-slate-800 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold tracking-wider">{t}</span>)}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.6 }} viewport={{ once: true }}
              className="group bg-slate-900/80 border border-slate-800 rounded-3xl p-8 hover:border-violet-500/50 hover:bg-slate-900 transition-all duration-300 shadow-xl">
              <div className="h-12 w-12 bg-violet-500/10 rounded-2xl flex items-center justify-center mb-6 border border-violet-500/20 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Ferrum Forge: Portafolio Freelance</h3>
              <p className="text-slate-400 mb-6 leading-relaxed">Este mismo sitio web. Diseñado y desarrollado desde cero con Next.js 14, App Router y Tailwind CSS. Incluye gestión de leads integrada, animaciones con Framer Motion y despliegue optimizado en Vercel.</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {["Next.js 14", "Tailwind CSS", "Framer Motion"].map(t => <span key={t} className="bg-slate-950 border border-slate-800 text-violet-400 px-3 py-1 rounded-full text-xs font-bold tracking-wider">{t}</span>)}
              </div>
              <a href="https://github.com/pablohierro47-oss/mi-portafolio-freelance" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 text-sm font-bold transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                Ver en GitHub →
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.8 }} viewport={{ once: true }}
              className="group bg-slate-900/80 border border-slate-800 rounded-3xl p-8 hover:border-amber-500/50 hover:bg-slate-900 transition-all duration-300 shadow-xl">
              <div className="h-12 w-12 bg-amber-500/10 rounded-2xl flex items-center justify-center mb-6 border border-amber-500/20 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">FiestasWeb: Plataforma de Eventos</h3>
              <p className="text-slate-400 mb-6 leading-relaxed">Plataforma web para la gestión y promoción de eventos y fiestas. Diseño orientado a la conversión con gestión de reservas, landing pages personalizadas y optimización para móvil.</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {["React", "Next.js", "UI/UX"].map(t => <span key={t} className="bg-slate-950 border border-slate-800 text-amber-400 px-3 py-1 rounded-full text-xs font-bold tracking-wider">{t}</span>)}
              </div>
              <a href="https://github.com/pablohierro47-oss/fiestas-web" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 text-sm font-bold transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                Ver en GitHub →
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── WHY ME VS BIG AGENCY ────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-slate-900/50 border-y border-slate-800">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              ¿Por qué <span className="text-orange-500">Ferrum Forge</span> y no una agencia grande?
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">La diferencia entre pagar por un número y trabajar con la persona que escribe tu código.</p>
          </motion.div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-900 border-b border-slate-800">
                  <th className="text-left px-6 py-4 text-slate-400 font-semibold w-1/3">Característica</th>
                  <th className="text-center px-6 py-4 w-1/3">
                    <span className="text-orange-500 font-black text-base">Ferrum Forge</span>
                  </th>
                  <th className="text-center px-6 py-4 text-slate-500 font-semibold w-1/3">Agencia Grande</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Trato directo con el desarrollador", true, false],
                  ["Precio justo sin intermediarios", true, false],
                  ["Plazos ágiles (2-4 semanas)", true, false],
                  ["Código 100% a medida", true, "A veces"],
                  ["Disponibilidad y respuesta rápida", true, false],
                  ["Escalabilidad y soporte a largo plazo", true, true],
                  ["Equipo de 20+ personas", false, true],
                ].map(([feat, ferrum, agencia], i) => (
                  <tr key={i} className={`border-b border-slate-800/50 ${i % 2 === 0 ? "bg-slate-950" : "bg-slate-900/30"}`}>
                    <td className="px-6 py-4 text-slate-300 font-medium">{feat as string}</td>
                    <td className="px-6 py-4 text-center">
                      {ferrum === true ? (
                        <span className="inline-flex items-center justify-center w-6 h-6 bg-orange-500/20 rounded-full">
                          <svg className="w-3.5 h-3.5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>
                        </span>
                      ) : ferrum === false ? (
                        <span className="inline-flex items-center justify-center w-6 h-6 bg-slate-800 rounded-full">
                          <svg className="w-3.5 h-3.5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12"/></svg>
                        </span>
                      ) : (
                        <span className="text-orange-300 text-xs font-bold">{ferrum as string}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {agencia === true ? (
                        <span className="inline-flex items-center justify-center w-6 h-6 bg-slate-800 rounded-full">
                          <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>
                        </span>
                      ) : agencia === false ? (
                        <span className="inline-flex items-center justify-center w-6 h-6 bg-slate-800 rounded-full">
                          <svg className="w-3.5 h-3.5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12"/></svg>
                        </span>
                      ) : (
                        <span className="text-slate-400 text-xs font-bold">{agencia as string}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── PRICING SECTION ─────────────────────────────────────────────────── */}
      <section id="precios" className="py-24 px-6 bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Tarifas <span className="text-orange-500">Transparentes</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">Sin letras pequeñas. Precios desde los que partir. El presupuesto final depende de los requisitos concretos de tu proyecto.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {/* PLAN BÁSICO */}
            <motion.div
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-8 flex flex-col"
            >
              <div className="mb-6">
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Lanzamiento</p>
                <div className="flex items-end gap-1 mb-1">
                  <span className="text-4xl font-black text-white">800€</span>
                  <span className="text-slate-500 mb-1.5">desde</span>
                </div>
                <p className="text-slate-500 text-sm">Entrega en ~2 semanas</p>
              </div>
              <hr className="border-slate-800 mb-6" />
              <ul className="space-y-3 flex-1 mb-8">
                {["Landing Page profesional", "Diseño UI/UX a medida", "Responsive (móvil + escritorio)", "Formulario de contacto", "Optimización SEO básica", "Despliegue en Vercel incluido"].map(item => (
                  <li key={item} className="flex items-start gap-3 text-slate-400 text-sm">
                    <svg className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>
                    {item}
                  </li>
                ))}
              </ul>
              <a href="#contacto" className="block text-center bg-slate-800 text-white font-bold py-3.5 rounded-xl transition-all hover:bg-slate-700 hover:text-orange-400">
                Solicitar Presupuesto
              </a>
            </motion.div>

            {/* PLAN PRO — DESTACADO */}
            <motion.div
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: true }}
              className="bg-slate-900 border-2 border-orange-600 rounded-3xl p-8 flex flex-col relative shadow-[0_0_40px_-10px_rgba(234,88,12,0.4)]"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="bg-orange-600 text-white text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">Más Popular</span>
              </div>
              <div className="mb-6">
                <p className="text-sm font-bold text-orange-400 uppercase tracking-widest mb-2">Web Corporativa</p>
                <div className="flex items-end gap-1 mb-1">
                  <span className="text-4xl font-black text-white">1.800€</span>
                  <span className="text-slate-500 mb-1.5">desde</span>
                </div>
                <p className="text-slate-500 text-sm">Entrega en ~4 semanas</p>
              </div>
              <hr className="border-slate-700 mb-6" />
              <ul className="space-y-3 flex-1 mb-8">
                {["Todo lo del plan Lanzamiento", "Múltiples páginas (Inicio, Servicios, Blog…)", "Panel de administración", "Blog integrado / CMS", "Integración con CRM o email marketing", "SEO avanzado + Analytics", "1 mes de soporte gratuito"].map(item => (
                  <li key={item} className="flex items-start gap-3 text-slate-300 text-sm">
                    <svg className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>
                    {item}
                  </li>
                ))}
              </ul>
              <a href="#contacto" className="block text-center bg-orange-600 text-white font-bold py-3.5 rounded-xl transition-all hover:bg-orange-500 hover:shadow-[0_0_20px_-5px_rgba(234,88,12,0.5)]">
                Solicitar Presupuesto
              </a>
            </motion.div>

            {/* PLAN E-COMMERCE */}
            <motion.div
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} viewport={{ once: true }}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-8 flex flex-col"
            >
              <div className="mb-6">
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">E-Commerce</p>
                <div className="flex items-end gap-1 mb-1">
                  <span className="text-4xl font-black text-white">3.500€</span>
                  <span className="text-slate-500 mb-1.5">desde</span>
                </div>
                <p className="text-slate-500 text-sm">Entrega en ~6-8 semanas</p>
              </div>
              <hr className="border-slate-800 mb-6" />
              <ul className="space-y-3 flex-1 mb-8">
                {["Todo lo del plan Corporativa", "Tienda online completa a medida", "Integración Stripe / PayPal", "Gestión de inventario y catálogo", "Sistema de pedidos y notificaciones", "Área privada de clientes", "3 meses de soporte gratuito"].map(item => (
                  <li key={item} className="flex items-start gap-3 text-slate-400 text-sm">
                    <svg className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>
                    {item}
                  </li>
                ))}
              </ul>
              <a href="#contacto" className="block text-center bg-slate-800 text-white font-bold py-3.5 rounded-xl transition-all hover:bg-slate-700 hover:text-orange-400">
                Solicitar Presupuesto
              </a>
            </motion.div>
          </div>

          <p className="text-center text-slate-600 text-sm mt-8">
            ¿Necesitas algo diferente? <a href="#contacto" className="text-orange-500 hover:text-orange-400 underline underline-offset-4">Hablemos y diseñamos un plan a tu medida.</a>
          </p>
        </div>
      </section>

      {/* ── TESTIMONIALS ────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-slate-900/50 border-y border-slate-800">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Lo que dicen <span className="text-orange-500">mis clientes</span>
            </h2>
            <p className="text-slate-400 text-lg">Resultados reales de personas reales.</p>
          </motion.div>

        {loadingTestimonials ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        ) : testimonials.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-slate-800 rounded-3xl bg-slate-900/30">
            <span className="text-4xl block mb-4">💬</span>
            <p className="text-slate-500 font-medium text-lg">Aún no hay testimonios públicos.</p>
            <p className="text-slate-600 text-sm mt-2">¡Sé el primero en dejar tu reseña trabajando juntos!</p>
            <a href="/dejar-resena" className="inline-block mt-6 bg-orange-600/20 text-orange-500 border border-orange-600/30 px-6 py-2.5 rounded-full font-bold hover:bg-orange-600 hover:text-white transition-all">
              Escribir una reseña
            </a>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((t, i) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.15 }} viewport={{ once: true }}
                  className="bg-slate-950 border border-slate-800 rounded-2xl p-8 hover:border-orange-600/40 transition-colors duration-300 flex flex-col"
                >
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.stars }).map((_, si) => (
                      <svg key={si} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    ))}
                  </div>
                  <p className="text-slate-400 leading-relaxed mb-6 text-sm italic flex-grow">"{t.message}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-600/20 border border-orange-600/30 rounded-full flex items-center justify-center text-orange-400 font-black text-xs shrink-0">
                      {t.avatar}
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm">{t.name}</p>
                      <p className="text-slate-500 text-xs">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-12">
              <a href="/dejar-resena" className="inline-block bg-slate-900 border border-slate-800 text-slate-300 px-6 py-3 rounded-full font-bold hover:bg-slate-800 hover:text-white transition-colors">
                ¿Has trabajado conmigo? Deja tu reseña
              </a>
            </div>
          </>
        )}
        </div>
      </section>

      {/* ── WORK PROCESS SECTION ────────────────────────────────────────────── */}
      <section id="proceso" className="py-24 px-6 bg-slate-950 border-b border-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Mi Proceso de Trabajo</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">Metodología de ingeniería aplicada para que tu proyecto vea la luz sin retrasos.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { n: "1", title: "Descubrimiento", desc: "Análisis de objetivos, competencia y definición de la arquitectura." },
              { n: "2", title: "Diseño UI/UX", desc: "Creación de prototipos visuales antes de escribir una sola línea de código." },
              { n: "3", title: "Desarrollo", desc: "Programación a medida con tecnologías de alto rendimiento." },
              { n: "4", title: "Lanzamiento", desc: "Pruebas de estrés, despliegue en servidores y optimización SEO." },
            ].map((s) => (
              <div key={s.n} className="text-center">
                <div className="w-16 h-16 bg-slate-950 text-orange-500 font-black text-2xl rounded-2xl flex items-center justify-center mx-auto mb-4 border border-orange-600/30 shadow-[0_0_15px_rgba(234,88,12,0.2)]">{s.n}</div>
                <h3 className="text-xl font-bold mb-2 text-white">{s.title}</h3>
                <p className="text-slate-400">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ SECTION ─────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Preguntas Frecuentes</h2>
        </div>
        <div className="space-y-4">
              {FAQS.map((faq, i) => (
            <details key={i} className="group bg-slate-900 border border-slate-800 rounded-2xl p-6 cursor-pointer open:border-orange-600/50 transition-colors">
              <summary className="text-lg font-bold text-white outline-none flex justify-between items-center">
                {faq.q}
                <span className="text-orange-500 group-open:rotate-180 transition-transform ml-4 shrink-0">▼</span>
              </summary>
              <p className="mt-4 text-slate-400 leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ── CONTACT SECTION ─────────────────────────────────────────────────── */}
      <section id="contacto" className="py-24 px-6 max-w-5xl mx-auto">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 md:p-16 shadow-[0_0_40px_rgba(234,88,12,0.1)] relative overflow-hidden flex flex-col md:flex-row gap-12">
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
                <span className="w-10 h-10 bg-slate-950 rounded-full flex items-center justify-center border border-slate-800 text-orange-500">📍</span>
                Bilbao (Bizkaia) / Castro-Urdiales (Cantabria)
              </div>
            </div>
          </div>

          <div className="md:w-1/2 relative z-10 bg-slate-950 p-8 rounded-2xl border border-slate-800">
            <form action={formAction} className="space-y-6 text-left">
              {state?.success && (
                <div className="bg-emerald-500/20 border border-emerald-400 text-emerald-100 px-4 py-3 rounded-xl text-center font-medium">{state.message}</div>
              )}
              {state?.error && (
                <div className="bg-red-500/20 border border-red-400 text-red-100 px-4 py-3 rounded-xl text-center font-medium">{state.error}</div>
              )}
          {!state?.success && (
            <>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-2">Nombre completo</label>
                <input type="text" id="name" name="name" className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors" placeholder="Ej. Carlos Martínez" required />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-2">Correo electrónico</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors peer invalid:border-red-500/50 invalid:focus:border-red-500 invalid:focus:ring-red-500" 
                  placeholder="hola@tuempresa.com" 
                  required 
                  pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                />
                <p className="mt-2 invisible peer-invalid:visible text-red-400 text-xs">Por favor, introduce un correo válido.</p>
              </div>
              <div>
                <label htmlFor="project" className="block text-sm font-medium text-slate-400 mb-2">Tipo de proyecto</label>
                <select id="project" name="project" className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors">
                  <option value="">Selecciona una opción</option>
                  <option value="landing">Landing Page</option>
                  <option value="corporativa">Web Corporativa</option>
                  <option value="ecommerce">E-Commerce / Tienda Online</option>
                  <option value="webapp">Aplicación Web a Medida</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-400 mb-2">Háblame de tu proyecto</label>
                <textarea id="message" name="message" rows={4} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors resize-none" placeholder="Me gustaría desarrollar una web para..." required></textarea>
              </div>
              <button type="submit" disabled={isPending} className="w-full bg-orange-600 text-white font-bold py-4 rounded-xl transition-all duration-300 hover:bg-orange-500 hover:shadow-[0_0_20px_-5px_rgba(234,88,12,0.5)] disabled:opacity-70">
                {isPending ? 'Enviando...' : 'Enviar Mensaje'}
              </button>
            </>
          )}
              <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center items-center text-sm">
                <span className="text-slate-500">O si lo prefieres:</span>
                <a href="mailto:pablohierro47@gmail.com" className="text-orange-400 font-medium underline underline-offset-4 hover:text-orange-300 transition-colors">Enviar un Email</a>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────────── */}
      <footer className="border-t border-slate-900 py-10 text-center text-slate-600 text-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-6">
          <p>© {new Date().getFullYear()} Ferrum Forge. Todos los derechos reservados.</p>
          <div className="flex gap-6 mt-4 md:mt-0 items-center">
            <a href="/admin" className="w-2 h-2 rounded-full bg-slate-800 hover:bg-orange-500 transition-colors" aria-label="Admin Login"></a>
            <a href="https://github.com/pablohierro47-oss" target="_blank" rel="noopener noreferrer" className="hover:text-slate-400 transition-colors">GitHub</a>
            <a href="https://www.linkedin.com/in/pablo-hierro-dev" target="_blank" rel="noopener noreferrer" className="hover:text-slate-400 transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Aviso Legal</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Política de Privacidad</a>
          </div>
        </div>
      </footer>

    </main>
  );
}