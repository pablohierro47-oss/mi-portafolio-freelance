"use client";

import { useState, useActionState } from "react";
import { loginAdmin, registerAdmin } from "../actions/auth";
import Link from "next/link";

export default function AuthPanel() {
  const [isLogin, setIsLogin] = useState(true);
  const [loginState, loginAction, isLoginPending] = useActionState(loginAdmin, null);
  const [registerState, registerAction, isRegisterPending] = useActionState(registerAdmin, null);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 relative text-slate-300">
      <div className="absolute inset-0 bg-[radial-gradient(theme(colors.slate.900)_1px,transparent_1px)] [background-size:24px_24px] opacity-30"></div>
      
      <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-white mb-2">
            {isLogin ? "Iniciar Sesión" : "Nuevo Admin"}
          </h1>
          <p className="text-slate-400 text-sm">
            {isLogin ? "Accede al panel de control de Ferrum Forge" : "Registra un nuevo usuario administrador"}
          </p>
        </div>

        {isLogin ? (
          <form action={loginAction} className="space-y-5">
            {loginState?.error && <div className="bg-red-500/20 text-red-400 text-sm p-3 rounded-lg border border-red-500/30 text-center font-medium">{loginState.error}</div>}
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-400">Usuario</label>
              <input type="text" name="username" required className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-orange-500 focus:outline-none" placeholder="admin" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-400">Contraseña</label>
              <input type="password" name="password" required className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-orange-500 focus:outline-none" placeholder="••••••••" />
            </div>
            <button type="submit" disabled={isLoginPending} className="w-full bg-orange-600 text-white font-bold py-3.5 rounded-xl hover:bg-orange-500 transition-colors disabled:opacity-50 mt-4">
              {isLoginPending ? "Entrando..." : "Acceder al Dashboard"}
            </button>
          </form>
        ) : (
          <form action={registerAction} className="space-y-5">
            {registerState?.error && <div className="bg-red-500/20 text-red-400 text-sm p-3 rounded-lg border border-red-500/30 text-center font-medium">{registerState.error}</div>}
            {registerState?.success && <div className="bg-emerald-500/20 text-emerald-400 text-sm p-3 rounded-lg border border-emerald-500/30 text-center font-medium">{registerState.message}</div>}
            
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-400">Nuevo Usuario</label>
              <input type="text" name="username" required className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-orange-500 focus:outline-none" placeholder="Escribe un usuario" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-400">Contraseña</label>
              <input type="password" name="password" required className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-orange-500 focus:outline-none" placeholder="Crea una contraseña" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-orange-400">Código Maestro de Autorización</label>
              <input type="password" name="masterCode" required className="w-full bg-orange-950/20 border border-orange-500/30 rounded-xl px-4 py-3 text-orange-200 focus:border-orange-500 focus:outline-none" placeholder="Código secreto" />
            </div>
            <button type="submit" disabled={isRegisterPending} className="w-full bg-slate-800 text-white font-bold py-3.5 rounded-xl hover:bg-slate-700 transition-colors disabled:opacity-50 mt-4">
              {isRegisterPending ? "Registrando..." : "Crear Administrador"}
            </button>
          </form>
        )}

        <div className="mt-8 pt-6 border-t border-slate-800 text-center">
          <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-sm text-slate-500 hover:text-white transition-colors">
            {isLogin ? "¿Necesitas crear un admin? Regístrate" : "Volver a Iniciar Sesión"}
          </button>
        </div>
      </div>

      <Link href="/" className="mt-8 text-slate-500 hover:text-white transition-colors text-sm font-medium relative z-10">
        &larr; Volver a la web pública
      </Link>
    </div>
  );
}