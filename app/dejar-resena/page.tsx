"use client";

import { useActionState, useState } from "react";
import { submitTestimonial } from "../actions/testimonials";
import Link from "next/link";

export default function LeaveReview() {
  const [state, formAction, isPending] = useActionState(submitTestimonial, null);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-orange-600 selection:text-white flex items-center justify-center p-6 relative">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 bg-[radial-gradient(theme(colors.slate.900)_1px,transparent_1px)] [background-size:24px_24px] opacity-30"></div>
      
      <div className="max-w-xl w-full bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl relative z-10">
        <Link href="/" className="absolute top-6 left-6 text-slate-500 hover:text-white transition-colors text-sm font-medium flex items-center gap-2">
          &larr; Volver
        </Link>
        
        <div className="text-center mb-10 mt-6">
          <h1 className="text-3xl font-black text-white mb-2">Deja tu <span className="text-orange-500">Reseña</span></h1>
          <p className="text-slate-400">¿Qué tal fue trabajar conmigo? Tu opinión es muy valiosa para mi portfolio.</p>
        </div>

        <form action={formAction} className="space-y-6">
          {state?.success && (
            <div className="text-center space-y-6 py-4">
              <div className="bg-emerald-500/20 border border-emerald-400 text-emerald-100 px-6 py-8 rounded-2xl font-medium shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                <span className="text-5xl block mb-4">🎉</span>
                {state.message}
              </div>
              <Link href="/" className="inline-block bg-slate-800 text-white font-bold py-3 px-8 rounded-xl transition-all hover:bg-slate-700 hover:scale-105">
                Volver al inicio
              </Link>
            </div>
          )}
          {state?.error && (
            <div className="bg-red-500/20 border border-red-400 text-red-100 px-4 py-4 rounded-xl text-center font-medium">
              {state.error}
            </div>
          )}

          {!state?.success && (
            <>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-2">Tu nombre</label>
                <input type="text" id="name" name="name" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors" placeholder="Ej. Laura García" required />
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-slate-400 mb-2">Tu empresa o rol</label>
                <input type="text" id="role" name="role" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors" placeholder="Ej. CEO en MiEmpresa" required />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Valoración</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      aria-label={`Puntuar con ${star} estrellas`}
                      className="text-3xl focus:outline-none transition-transform hover:scale-110"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                    >
                      <svg className={`w-8 h-8 ${(hoverRating || rating) >= star ? 'text-amber-400 fill-current' : 'text-slate-700 fill-current transition-colors'}`} viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    </button>
                  ))}
                </div>
                {/* Input oculto para enviar las estrellas de forma nativa a la Server Action */}
                <input type="hidden" name="stars" value={rating} />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-400 mb-2">Tu testimonio</label>
                <textarea id="message" name="message" rows={4} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors resize-none" placeholder="El trabajo ha sido excelente por..." required></textarea>
              </div>

              <button type="submit" disabled={isPending} className="w-full bg-orange-600 text-white font-bold py-4 rounded-xl transition-all duration-300 hover:bg-orange-500 hover:shadow-[0_0_20px_-5px_rgba(234,88,12,0.5)] disabled:opacity-70">
                {isPending ? 'Enviando...' : 'Enviar Reseña'}
              </button>
            </>
          )}
        </form>
      </div>
    </main>
  );
}
