import Link from "next/link";
import DeleteForm from "./DeleteForm";
import prisma from "../../prisma";
import AuthPanel from "./AuthPanel";
import { cookies } from "next/headers";
import { toggleReadStatus, deleteMessage, logout } from "../actions/admin";
import { toggleTestimonialApproval, deleteTestimonial } from "../actions/testimonials";

export default async function AdminDashboard(props: {
  searchParams?: Promise<{ filter?: string }> | { filter?: string };
}) {
  // 1. Verificamos la cookie de sesión
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  // Si no hay cookie, mostramos la pantalla de Login
  if (!session?.value) {
    return <AuthPanel />;
  }

  // Obtenemos el usuario administrador actual exacto
  const admin = await prisma.admin.findUnique({ where: { id: session.value } });
  if (!admin) return <AuthPanel />; // Si el admin fue borrado de la BD pero tiene cookie
  const adminName = admin.username;

  const resolvedSearchParams = await props.searchParams;
  const filter = resolvedSearchParams?.filter || "all";

  // Obtenemos los contadores totales para las pestañas
  const [totalCount, pendingCount, contactedCount, testimonialsCount, pendingTestimonialsCount] = await Promise.all([
    prisma.contactMessage.count(),
    prisma.contactMessage.count({ where: { isRead: false } }),
    prisma.contactMessage.count({ where: { isRead: true } }),
    prisma.testimonial.count(),
    prisma.testimonial.count({ where: { isApproved: false } }),
  ]);

  // Extraemos los datos según el filtro activo
  const isTestimonialsTab = filter === "testimonials";
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let messages: any[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let testimonials: any[] = [];

  if (isTestimonialsTab) {
    testimonials = await prisma.testimonial.findMany({
      orderBy: { createdAt: "desc" },
    });
  } else {
    const whereClause = 
      filter === "pending" ? { isRead: false } : 
      filter === "contacted" ? { isRead: true } : 
      {};

    messages = await prisma.contactMessage.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
    });
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-black">Panel de <span className="text-orange-500">Control</span></h1>
            <p className="text-slate-400 mt-1">Gestiona tus leads y testimonios públicos.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
              <p className="text-sm font-bold text-white">Hola, <span className="text-orange-400">{adminName}</span> 👋</p>
              <p className="text-xs text-slate-500">Perfil de Administrador</p>
            </div>
            <div className="w-px h-8 bg-slate-800 mx-2 hidden md:block"></div>
            <Link href="/" className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm font-bold text-slate-300 hover:bg-slate-800 transition-colors">
              Ver web pública
            </Link>
            <form action={logout}>
              <button type="submit" className="px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-lg text-sm font-bold text-red-400 hover:bg-red-500 hover:text-white transition-all shadow-sm">
                Cerrar sesión
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-8 bg-slate-900/50 p-2 rounded-xl border border-slate-800">
          <Link href="?filter=all" className={`flex items-center px-4 py-2 rounded-lg text-sm font-bold transition-all ${filter === 'all' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-white hover:bg-slate-900/50'}`}>
            Todos
            <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${filter === 'all' ? 'bg-slate-700' : 'bg-slate-900'}`}>{totalCount}</span>
          </Link>
          <Link href="?filter=pending" className={`flex items-center px-4 py-2 rounded-lg text-sm font-bold transition-all ${filter === 'pending' ? 'bg-orange-600/20 text-orange-400 border border-orange-600/30' : 'text-slate-400 hover:text-white hover:bg-slate-900/50'}`}>
            Pendientes
            <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${filter === 'pending' ? 'bg-orange-600/30 text-white' : 'bg-slate-900'}`}>{pendingCount}</span>
          </Link>
          <Link href="?filter=contacted" className={`flex items-center px-4 py-2 rounded-lg text-sm font-bold transition-all ${filter === 'contacted' ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-600/30' : 'text-slate-400 hover:text-white hover:bg-slate-900/50'}`}>
            Contactados 
            <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${filter === 'contacted' ? 'bg-emerald-600/30' : 'bg-slate-900'}`}>{contactedCount}</span>
          </Link>
          <div className="w-px h-6 bg-slate-800 mx-2"></div>
          <Link href="?filter=testimonials" className={`flex items-center px-4 py-2 rounded-lg text-sm font-bold transition-all ${filter === 'testimonials' ? 'bg-purple-600/20 text-purple-400 border border-purple-600/30' : 'text-slate-400 hover:text-white hover:bg-slate-900/50'}`}>
            Testimonios 
            {pendingTestimonialsCount > 0 && (
              <span className="ml-2 px-2 py-0.5 rounded-full text-[10px] bg-purple-500 text-white animate-pulse">{pendingTestimonialsCount} Nuevos</span>
            )}
            <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${filter === 'testimonials' ? 'bg-purple-600/30 text-white' : 'bg-slate-900'}`}>{testimonialsCount} Totales</span>
          </Link>
        </div>

        {!isTestimonialsTab ? (messages.length === 0 ? (
          <div className="text-center py-16 border-2 border-dashed border-slate-800 rounded-2xl">
            <span className="text-4xl block mb-4">📭</span>
            <p className="text-slate-500 font-medium">No hay ningún lead en esta categoría.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((m) => (
              <div key={m.id} className={`p-6 rounded-2xl border transition-all ${m.isRead ? "bg-slate-950 border-slate-800 opacity-70" : "bg-slate-900 border-orange-500/30 shadow-[0_0_15px_rgba(234,88,12,0.1)]"}`}>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                  <div>
                    <h3 className="font-bold text-lg text-white">{m.name}</h3>
                    <a href={`mailto:${m.email}`} className="text-orange-400 hover:underline text-sm font-medium">{m.email}</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-500 text-xs font-medium bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
                      {new Date(m.createdAt).toLocaleDateString()}
                    </span>
                    <form action={toggleReadStatus.bind(null, m.id, m.isRead)}>
                      <button type="submit" className={`text-xs font-bold px-4 py-2 rounded-xl transition-all ${m.isRead ? "bg-slate-800 text-slate-400 hover:bg-slate-700" : "bg-orange-600 text-white hover:bg-orange-500"}`}>
                        {m.isRead ? "Marcar pendiente" : "✓ Contactado"}
                      </button>
                    </form>
                    <DeleteForm action={deleteMessage.bind(null, m.id)}>
                      <button type="submit" className="p-2.5 rounded-xl bg-slate-800 text-slate-500 hover:bg-red-500/20 hover:text-red-400 transition-colors">
                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </DeleteForm>
                  </div>
                </div>
                {m.project && (
                  <div className="inline-block px-3 py-1 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold mb-3">
                    {m.project}
                  </div>
                )}
                <p className="text-slate-400 leading-relaxed text-sm p-4 bg-slate-950 rounded-xl border border-slate-800/50">
                  {m.message}
                </p>
              </div>
            ))}
          </div>
        )) : (
          testimonials.length === 0 ? (
            <div className="text-center py-16 border-2 border-dashed border-slate-800 rounded-2xl">
              <span className="text-4xl block mb-4">💬</span>
              <p className="text-slate-500 font-medium">No hay testimonios registrados en la base de datos.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {testimonials.map((t) => (
                <div key={t.id} className={`p-6 rounded-2xl border transition-all ${t.isApproved ? "bg-slate-950/50 border-slate-800/50 opacity-70" : "bg-slate-950 border-slate-800 hover:border-purple-500/50 shadow-lg"}`}>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="font-bold text-lg text-white">{t.name}</h3>
                        {t.isApproved ? (
                          <span className="text-[10px] bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-2 py-0.5 rounded-full font-bold tracking-widest uppercase">Público</span>
                        ) : (
                          <span className="text-[10px] bg-purple-500/20 text-purple-400 border border-purple-500/30 px-2 py-0.5 rounded-full font-bold tracking-widest uppercase animate-pulse">Pendiente</span>
                        )}
                      </div>
                      <span className="text-[10px] bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 px-2 py-0.5 rounded-full font-bold tracking-widest uppercase mt-2 inline-block">{t.role}</span>
                    </div>
                    
                    <div className="flex flex-col md:items-end gap-3 w-full md:w-auto">
                      <span className="text-slate-500 text-xs font-medium bg-slate-900 px-3 py-1 rounded-lg border border-slate-800 shrink-0">
                        {new Date(t.createdAt).toLocaleDateString()}
                      </span>
                      
                      <div className="flex items-stretch gap-2 w-full md:w-auto">
                        <form action={toggleTestimonialApproval.bind(null, t.id, t.isApproved)} className="flex-grow">
                          <button type="submit" className={`w-full h-full text-xs font-bold px-4 py-2 rounded-xl transition-all ${t.isApproved ? "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white" : "bg-purple-600/20 text-purple-400 border border-purple-600/30 hover:bg-purple-600 hover:text-white"}`}>
                            {t.isApproved ? "Ocultar" : "✓ Publicar"}
                          </button>
                        </form>
                        <DeleteForm action={deleteTestimonial.bind(null, t.id)}>
                          <button type="submit" aria-label="Eliminar testimonio" className="h-full p-2.5 rounded-xl bg-slate-800 text-slate-500 hover:bg-red-500/20 hover:text-red-400 transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                          </button>
                        </DeleteForm>
                      </div>
                    </div>
                  </div>
                  <div className="text-amber-400 text-sm mb-2">{Array.from({ length: t.stars || 5 }).map(() => "★").join("")}</div>
                  <p className={`leading-relaxed p-4 rounded-xl border italic whitespace-pre-wrap ${t.isApproved ? "text-slate-500 bg-slate-900/30 border-slate-800/30" : "text-slate-300 bg-slate-900/50 border-slate-800/50"}`}>
                    "{t.message}"
                  </p>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
}