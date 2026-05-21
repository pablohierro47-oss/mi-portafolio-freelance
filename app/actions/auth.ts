"use server";

import prisma from "../../prisma";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

// 1. Iniciar sesión
export async function loginAdmin(prevState: any, formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!username || !password) return { error: "Rellena todos los campos." };

  const admin = await prisma.admin.findUnique({ where: { username } });
  if (!admin) return { error: "Credenciales incorrectas." };

  const isValid = await bcrypt.compare(password, admin.password);
  if (!isValid) return { error: "Credenciales incorrectas." };

  // Guardamos la ID del administrador en la cookie
  const cookieStore = await cookies();
  cookieStore.set("admin_session", admin.id, { httpOnly: true, path: "/" });

  return { success: true };
}

// 2. Registrar nuevo administrador
export async function registerAdmin(prevState: any, formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const masterCode = formData.get("masterCode") as string;

  if (!username || !password || !masterCode) return { error: "Rellena todos los campos." };

  // SEGURIDAD: Solo quien conozca este código puede crear un Admin
  if (masterCode !== "FerrumForge26") {
    return { error: "Código maestro incorrecto. No tienes permiso." };
  }

  const existing = await prisma.admin.findUnique({ where: { username } });
  if (existing) return { error: "Este nombre de usuario ya está en uso." };

  const hashedPassword = await bcrypt.hash(password, 10);
  const newAdmin = await prisma.admin.create({
    data: { username, password: hashedPassword }
  });

  return { 
    success: true, 
    message: "Administrador creado con éxito. Ya puedes iniciar sesión." 
  };
}