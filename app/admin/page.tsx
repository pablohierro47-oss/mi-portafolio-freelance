import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import { authOptions } from "../api/auth/[...nextauth]/options";
import Link from "next/link";

const prisma = new PrismaClient();

export default async function AdminDashboard() {
  // 1. Comprobamos la sesión
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  // 2. Extraemos los leads
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        
        {/* CABECERA CON BOTONES */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              Panel de <span className="text-blue-500">NovaStack</span>
            </h1>
            <p className="text-slate-400 mt-2">
              Sesión iniciada como: <span className="text-emerald-400 font-bold">{session.user?.name}</span>
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Link href="/" className="bg-slate-900 border border-slate-800 text-slate-300 px-5 py-2.5 rounded-full text-sm font-bold hover:bg-slate-800 transition-colors">
              Ver Web
            </Link>
            <Link href="/api/auth/signout" className="bg-red-500/10 border border-red-500/30 text-red-500 px-5 py-2.5 rounded-full text-sm font-bold hover:bg-red-500 hover:text-white transition-all">
              Cerrar Sesión
            </Link>
          </div>
        </div>

        {/* ZONA DE MENSAJES */}
        <div className="bg-slate-900/50 rounded-3xl border border-slate-800 p-6 md:p-10 shadow-2xl">
          <div className="flex items-center gap-3 mb-8">
            <span className="bg-blue-600/20 text-blue-500 font-bold px-3 py-1 rounded-full text-sm">
              {messages.length}
            </span>
            <h2 className="text-2xl font-bold">Leads Recibidos</h2>
          </div>

          {messages.length === 0 ? (
            <div className="text-center py-10 border-2 border-dashed border-slate-800 rounded-2xl">
              <p className="text-slate-500">Aún no hay mensajes. ¡Pronto llegarán clientes!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className="bg-slate-950 p-6 rounded-2xl border border-slate-800 transition-all hover:border-blue-500/50">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2">
                    <div>
                      <h3 className="font-bold text-lg text-white">{msg.name}</h3>
                      {/* Enlace directo a redacción de Gmail */}
                      <a 
                        href={`https://mail.google.com/mail/?view=cm&fs=1&to=${msg.email}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-400 text-sm hover:underline"
                      >
                        {msg.email}
                      </a>
                    </div>
                    <span className="text-slate-500 text-xs font-medium bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
                      {new Date(msg.createdAt).toLocaleDateString()} - {new Date(msg.createdAt).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-slate-300 leading-relaxed bg-slate-900/50 p-4 rounded-xl border border-slate-800/50 whitespace-pre-wrap">
                    {msg.message}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}