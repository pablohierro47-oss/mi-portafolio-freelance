"use server";

import prisma from "../../prisma";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Acción de servidor para alternar el estado del mensaje
export async function toggleReadStatus(id: string, currentStatus: boolean) {
  await prisma.contactMessage.update({
    where: { id },
    data: { isRead: !currentStatus },
  });
  revalidatePath("/admin");
}

// Acción de servidor para cerrar sesión
export async function logout() {
  // Nota: Asegúrate de que "admin_session" coincida con el nombre real de la cookie que uses en tu middleware
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  redirect("/"); 
}

// Acción de servidor para eliminar un mensaje
export async function deleteMessage(id: string) {
  await prisma.contactMessage.delete({
    where: { id },
  });
  revalidatePath("/admin");
}