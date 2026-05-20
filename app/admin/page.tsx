import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/options";
import Link from "next/link";
import DeleteForm from "./DeleteForm";
import prisma from "../../prisma";
import { toggleReadStatus, deleteMessage } from "../actions/admin";

export default async function AdminDashboard(props: {
  searchParams?: Promise<{ filter?: string }> | { filter?: string };
}) {
  // 1. Comprobamos la sesión
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  // 2. Obtenemos el filtro actual de la URL de manera compatible con Next.js 14 y 15
  const resolvedSearchParams = await Promise.resolve(props.searchParams);
  const filter = resolvedSearchParams?.filter || "all";

  // 3. Obtenemos los contadores totales para las pestañas
  const [totalCount, pendingCount, contactedCount] = await Promise.all([
    prisma.contactMessage.count(),
    prisma.contactMessage.count({ where: { isRead: false } }),
    prisma.contactMessage.count({ where: { isRead: true } }),
  ]);

  // 4. Extraemos los leads según el filtro activo
  const whereClause = 
    filter === "pending" ? { isRead: false } : 
    filter === "contacted" ? { isRead: true } : 
    {};

  const messages = await prisma.contactMessage.findMany({
    where: whereClause,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        
        {/* CABECERA CON BOTONES */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              Panel de <span className="text-orange-500">Ferrum Forge</span>
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
          
          {/* Pestañas de Filtro */}
          <div className="flex flex-wrap items-center gap-2 mb-8 bg-slate-950 p-1.5 rounded-xl border border-slate-800 w-fit">
            <Link href="?filter=all" className={`flex items-center px-4 py-2 rounded-lg text-sm font-bold transition-all ${filter === 'all' ? 'bg-slate-800 text-white shadow' : 'text-slate-400 hover:text-white hover:bg-slate-900/50'}`}>
              Todos 
              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${filter === 'all' ? 'bg-slate-700' : 'bg-slate-900'}`}>{totalCount}</span>
            </Link>
            <Link href="?filter=pending" className={`flex items-center px-4 py-2 rounded-lg text-sm font-bold transition-all ${filter === 'pending' ? 'bg-orange-600/20 text-orange-400 border border-orange-600/30' : 'text-slate-400 hover:text-white hover:bg-slate-900/50'}`}>
              Pendientes 
              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${filter === 'pending' ? 'bg-orange-600/30' : 'bg-slate-900'}`}>{pendingCount}</span>
            </Link>
            <Link href="?filter=contacted" className={`flex items-center px-4 py-2 rounded-lg text-sm font-bold transition-all ${filter === 'contacted' ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-600/30' : 'text-slate-400 hover:text-white hover:bg-slate-900/50'}`}>
              Contactados 
              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${filter === 'contacted' ? 'bg-emerald-600/30' : 'bg-slate-900'}`}>{contactedCount}</span>
            </Link>
          </div>

          {messages.length === 0 ? (
            <div className="text-center py-16 border-2 border-dashed border-slate-800 rounded-2xl">
              <span className="text-4xl block mb-4">📭</span>
              <p className="text-slate-500 font-medium">No hay ningún lead en esta categoría.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`p-6 rounded-2xl border transition-all ${
                    msg.isRead 
                      ? "bg-slate-950/50 border-slate-800/50 opacity-70" 
                      : "bg-slate-950 border-slate-800 hover:border-orange-500/50 shadow-lg"
                  }`}
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="font-bold text-lg text-white">{msg.name}</h3>
                        {msg.isRead ? (
                          <span className="text-[10px] bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-2 py-0.5 rounded-full font-bold tracking-widest uppercase">Contactado</span>
                        ) : (
                          <span className="text-[10px] bg-orange-500/20 text-orange-400 border border-orange-500/30 px-2 py-0.5 rounded-full font-bold tracking-widest uppercase animate-pulse">Nuevo</span>
                        )}
                      </div>
                      
                      {/* BADGE TIPO DE PROYECTO (Si el cliente lo seleccionó en el form) */}
                      {/* @ts-ignore - Ignoramos si el tipo de TS no se ha regenerado aún */}
                      {msg.project && (
                        <span className="text-[10px] bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 px-2 py-0.5 rounded-full font-bold tracking-widest uppercase">
                          {msg.project}
                        </span>
                      )}

                      {/* Enlace directo a redacción de Gmail */}
                      <a 
                        href={`https://mail.google.com/mail/?view=cm&fs=1&to=${msg.email}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-orange-400 text-sm transition-colors mt-1 inline-block"
                      >
                        {msg.email}
                      </a>
                    </div>
                    
                    <div className="flex flex-col md:items-end gap-3 w-full md:w-auto">
                      <span className="text-slate-500 text-xs font-medium bg-slate-900 px-3 py-1 rounded-lg border border-slate-800 shrink-0">
                        {new Date(msg.createdAt).toLocaleDateString()} - {new Date(msg.createdAt).toLocaleTimeString().slice(0, 5)}
                      </span>
                      
                      {/* Contenedor para los botones de acción */}
                      <div className="flex items-stretch gap-2 w-full md:w-auto">
                        <form action={toggleReadStatus.bind(null, msg.id, msg.isRead)} className="flex-grow">
                          <button type="submit" className={`w-full h-full text-xs font-bold px-4 py-2 rounded-xl transition-all ${
                            msg.isRead 
                              ? "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white" 
                              : "bg-emerald-600/20 text-emerald-400 border border-emerald-600/30 hover:bg-emerald-600 hover:text-white"
                          }`}>
                            {msg.isRead ? "Marcar como pendiente" : "✓ Marcar contactado"}
                          </button>
                        </form>
                        <DeleteForm action={deleteMessage.bind(null, msg.id)}>
                          <button type="submit" aria-label="Eliminar mensaje" className="h-full p-2.5 rounded-xl bg-slate-800 text-slate-500 hover:bg-red-500/20 hover:text-red-400 transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                          </button>
                        </DeleteForm>
                      </div>
                    </div>
                  </div>
                  <p className={`leading-relaxed p-4 rounded-xl border whitespace-pre-wrap ${
                    msg.isRead 
                      ? "text-slate-500 bg-slate-900/30 border-slate-800/30" 
                      : "text-slate-300 bg-slate-900/50 border-slate-800/50"
                  }`}>
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