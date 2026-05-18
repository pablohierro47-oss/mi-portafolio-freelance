import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-slate-300 font-sans selection:bg-blue-500 selection:text-white">
      
      {/* HERO SECTION */}
      <section className="relative flex flex-col items-center justify-center min-h-[90vh] px-6 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(theme(colors.slate.900)_1px,transparent_1px)] [background-size:16px_16px] opacity-20"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="text-blue-400 font-semibold tracking-wider uppercase text-sm mb-4 block">
            Desarrollador Web Freelance
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight mb-6 text-slate-100">
            Transformo tus ideas en <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">experiencias digitales</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Desarrollo web a medida, rápido y escalable. Ayudo a negocios a destacar en internet con plataformas modernas y enfocadas en resultados.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="#contacto" 
              className="bg-blue-600 text-white px-8 py-4 rounded-full font-medium transition-all duration-300 hover:bg-blue-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-600/30"
            >
              Solicitar Presupuesto
            </Link>
            <Link 
              href="#proyectos" 
              className="bg-transparent text-slate-200 border border-slate-700 px-8 py-4 rounded-full font-medium transition-all duration-300 hover:bg-slate-900 hover:text-white hover:-translate-y-1"
            >
              Ver mis trabajos
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="servicios" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-100">¿Cómo puedo ayudarte?</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">Soluciones integrales para que tu negocio crezca en el entorno digital.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-slate-950 p-8 rounded-2xl shadow-sm border border-slate-800 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-blue-500/30 group">
            <div className="w-14 h-14 bg-blue-600/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <span className="text-blue-400 text-2xl">🎨</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Diseño UI/UX</h3>
            <p className="text-slate-400 leading-relaxed">
              Interfaces modernas, intuitivas y centradas en el usuario para garantizar la mejor experiencia de navegación y maximizar conversiones.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-slate-950 p-8 rounded-2xl shadow-sm border border-slate-800 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-blue-500/30 group">
            <div className="w-14 h-14 bg-blue-600/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <span className="text-blue-400 text-2xl">💻</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Desarrollo a Medida</h3>
            <p className="text-slate-400 leading-relaxed">
              Aplicaciones web robustas utilizando las últimas tecnologías del mercado (React, Next.js) asegurando un rendimiento impecable.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-slate-950 p-8 rounded-2xl shadow-sm border border-slate-800 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-blue-500/30 group">
            <div className="w-14 h-14 bg-blue-600/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <span className="text-blue-400 text-2xl">⚙️</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Mantenimiento</h3>
            <p className="text-slate-400 leading-relaxed">
              Soporte técnico continuo, optimización SEO técnica y actualizaciones de seguridad para que tu web nunca se quede atrás.
            </p>
          </div>
        </div>
      </section>

      {/* WORK PROCESS SECTION */}
      <section id="proceso" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-100">Mi Proceso de Trabajo</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">Un enfoque estructurado para garantizar el éxito de tu proyecto de principio a fin.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Step 1 */}
          <div className="text-center">
            <div className="w-16 h-16 bg-slate-900 text-blue-400 font-bold text-2xl rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-slate-800">1</div>
            <h3 className="text-xl font-bold mb-2 text-slate-100">Planificación</h3>
            <p className="text-slate-400">Análisis de objetivos y definición de la estrategia del proyecto.</p>
          </div>
          {/* Step 2 */}
          <div className="text-center">
            <div className="w-16 h-16 bg-slate-900 text-blue-400 font-bold text-2xl rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-slate-800">2</div>
            <h3 className="text-xl font-bold mb-2 text-slate-100">Diseño</h3>
            <p className="text-slate-400">Creación de prototipos y un diseño visual atractivo y funcional.</p>
          </div>
          {/* Step 3 */}
          <div className="text-center">
            <div className="w-16 h-16 bg-slate-900 text-blue-400 font-bold text-2xl rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-slate-800">3</div>
            <h3 className="text-xl font-bold mb-2 text-slate-100">Desarrollo</h3>
            <p className="text-slate-400">Implementación con código limpio y tecnologías modernas.</p>
          </div>
          {/* Step 4 */}
          <div className="text-center">
            <div className="w-16 h-16 bg-slate-900 text-blue-400 font-bold text-2xl rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-slate-800">4</div>
            <h3 className="text-xl font-bold mb-2 text-slate-100">Lanzamiento</h3>
            <p className="text-slate-400">Despliegue, optimización y entrega final del proyecto.</p>
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="proyectos" className="py-24 px-6 bg-slate-950 border-y border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-100">Casos de Éxito</h2>
              <p className="text-slate-400 max-w-xl text-lg">Una muestra de proyectos recientes donde he transformado problemas complejos en soluciones elegantes.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Project 1: Fiestas Web */}
            <Link href="https://fiestas-web.vercel.app/" target="_blank" rel="noopener noreferrer" className="group block cursor-pointer">
              <div className="overflow-hidden rounded-2xl bg-slate-900 aspect-video mb-6 relative">
                {/* Placeholder de imagen */}
                <div className="absolute inset-0 bg-slate-800 transition-all duration-500 group-hover:scale-105 flex items-center justify-center">
                  <span className="text-slate-500 font-medium">Fiestas Web</span>
                </div>
              </div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-semibold px-3 py-1 bg-slate-800 text-slate-400 rounded-full">Aplicación Web</span>
                <span className="text-xs font-semibold px-3 py-1 bg-slate-800 text-slate-400 rounded-full">React</span>
              </div>
              <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-400 transition-colors">Fiestas Web - Plataforma de Eventos</h3>
              <p className="text-slate-400">Aplicación web para la promoción y gestión de eventos locales, con un diseño moderno y enfocado en la experiencia de usuario.</p>
            </Link>

            {/* Project 2: B2B */}
            <Link href="#proyectos" className="group block cursor-pointer">
              <div className="overflow-hidden rounded-2xl bg-slate-900 aspect-video mb-6 relative">
                {/* Placeholder de imagen */}
                <div className="absolute inset-0 bg-slate-800 transition-all duration-500 group-hover:scale-105 flex items-center justify-center">
                  <span className="text-slate-500 font-medium">800x600 Placeholder</span>
                </div>
              </div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-semibold px-3 py-1 bg-slate-800 text-slate-400 rounded-full">Aplicación Web</span>
                <span className="text-xs font-semibold px-3 py-1 bg-slate-800 text-slate-400 rounded-full">Next.js</span>
              </div>
              <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-400 transition-colors">Plataforma de Gestión B2B</h3>
              <p className="text-slate-400">Desarrollo de un dashboard corporativo con analíticas en tiempo real.</p>
            </Link>

            {/* Project 3: Landing Page */}
            <Link href="#proyectos" className="group block cursor-pointer">
              <div className="overflow-hidden rounded-2xl bg-slate-900 aspect-video mb-6 relative">
                {/* Placeholder de imagen */}
                <div className="absolute inset-0 bg-slate-800 transition-all duration-500 group-hover:scale-105 flex items-center justify-center">
                  <span className="text-slate-500 font-medium">800x600 Placeholder</span>
                </div>
              </div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-semibold px-3 py-1 bg-slate-800 text-slate-400 rounded-full">Landing Page</span>
                <span className="text-xs font-semibold px-3 py-1 bg-slate-800 text-slate-400 rounded-full">Tailwind CSS</span>
              </div>
              <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-400 transition-colors">Web para Evento Local</h3>
              <p className="text-slate-400">Sitio promocional de alta conversión optimizado para venta de entradas.</p>
            </Link>
            
            {/* Project 4: E-commerce */}
            <Link href="#proyectos" className="group block cursor-pointer">
              <div className="overflow-hidden rounded-2xl bg-slate-900 aspect-video mb-6 relative">
                {/* Placeholder de imagen */}
                <div className="absolute inset-0 bg-slate-800 transition-all duration-500 group-hover:scale-105 flex items-center justify-center">
                  <span className="text-slate-500 font-medium">800x600 Placeholder</span>
                </div>
              </div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-semibold px-3 py-1 bg-slate-800 text-slate-400 rounded-full">E-commerce</span>
                <span className="text-xs font-semibold px-3 py-1 bg-slate-800 text-slate-400 rounded-full">Shopify</span>
              </div>
              <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-400 transition-colors">E-commerce de Moda</h3>
              <p className="text-slate-400">Tienda online completa con pasarela de pagos, gestión de inventario y diseño responsive.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section id="testimonios" className="py-24 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-100">Lo que dicen mis clientes</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">La satisfacción de mis clientes es mi mayor recompensa.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial Card 1 */}
            <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 flex flex-col justify-between">
              <p className="text-slate-400 mb-6 italic">"Trabajar con Pablo fue un cambio de juego para nuestro negocio. La nueva web no solo es visualmente impresionante, sino que también ha mejorado nuestras conversiones en un 40%."</p>
              <div>
                <p className="font-bold text-slate-200">Ana García</p>
                <p className="text-sm text-slate-500">CEO de TechAvanza</p>
              </div>
            </div>
            {/* Testimonial Card 2 */}
            <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 flex flex-col justify-between">
              <p className="text-slate-400 mb-6 italic">"El proceso fue increíblemente fluido y profesional. Entendió nuestra visión desde el primer día y la ejecutó a la perfección. ¡Totalmente recomendado!"</p>
              <div>
                <p className="font-bold text-slate-200">Carlos Martínez</p>
                <p className="text-sm text-slate-500">Director de Marketing en InnovaLocal</p>
              </div>
            </div>
            {/* Testimonial Card 3 */}
            <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 flex flex-col justify-between">
              <p className="text-slate-400 mb-6 italic">"La calidad del código y la atención al detalle son excepcionales. La plataforma es rápida, segura y fácil de mantener. Un verdadero profesional."</p>
              <div>
                <p className="font-bold text-slate-200">Laura Fernández</p>
                <p className="text-sm text-slate-500">Fundadora de ModaOnline</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contacto" className="py-32 px-6 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-100">¿Listo para llevar tu proyecto al siguiente nivel?</h2>
          <p className="text-slate-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
            Cuéntame sobre tu idea. Estaré encantado de analizar tu caso, proponerte la mejor solución tecnológica y darte un presupuesto sin compromiso.
          </p>
          
          <a 
            href="https://wa.me/34000000000?text=Hola,%20me%20gustaría%20pedir%20información%20sobre%20un%20desarrollo%20web" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-green-500 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:bg-green-400 hover:scale-105 hover:shadow-lg hover:shadow-green-500/30"
          >
            {/* Ícono simple de WhatsApp SVG en línea */}
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
            Hablemos por WhatsApp
          </a>
          <p className="mt-8 text-sm text-slate-500">
            También puedes escribirme a <a href="mailto:pablohierro47@gmail.com" className="text-blue-400 hover:underline">pablohierro47@gmail.com</a>
          </p>
        </div>
      </section>

    </main>
  );
}
