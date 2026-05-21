"use server";

import prisma from "../../prisma";
import { revalidatePath } from "next/cache";

// 1. Obtener testimonios (Solo los aprobados)
export async function getApprovedTestimonials() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: { isApproved: true },
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: testimonials };
  } catch (error) {
    console.error("Error al obtener los testimonios:", error);
    return { success: false, error: "Error interno del servidor", data: [] };
  }
}

// 2. Esbozo para enviar un nuevo testimonio (Desde un formulario público)
export async function submitTestimonial(prevState: any, formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const role = formData.get("role") as string;
    const message = formData.get("message") as string;
    const stars = parseInt(formData.get("stars") as string) || 5;

    if (!name || !role || !message) {
      return { error: "Por favor, rellena todos los campos." };
    }

    // Autogeneramos las iniciales (Ej: "Carlos Martínez" -> "CM")
    const avatar = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

    await prisma.testimonial.create({
      data: { name, role, avatar, message, stars, isApproved: false },
    });

    revalidatePath("/admin"); // Notifica al dashboard al instante

    return { success: true, message: "¡Gracias por tu testimonio! Será revisado antes de publicarse." };
  } catch (error) {
    console.error("Error al guardar el testimonio:", error);
    return { error: "Hubo un problema al enviar la reseña. Inténtalo de nuevo." };
  }
}

// 3. Alternar visibilidad de un testimonio (Admin)
export async function toggleTestimonialApproval(id: string, currentStatus: boolean) {
  try {
    await prisma.testimonial.update({
      where: { id },
      data: { isApproved: !currentStatus },
    });
    revalidatePath("/admin"); // Actualiza dashboard
    revalidatePath("/");      // Actualiza home (portfolio público)
  } catch (error) {
    console.error("Error al actualizar el testimonio:", error);
  }
}

// 4. Eliminar testimonio definitivamente (Admin)
export async function deleteTestimonial(id: string) {
  try {
    await prisma.testimonial.delete({ where: { id } });
    revalidatePath("/admin");
    revalidatePath("/");
  } catch (error) {
    console.error("Error al eliminar el testimonio:", error);
  }
}