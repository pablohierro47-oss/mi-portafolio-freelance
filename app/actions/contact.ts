"use server";

import prisma from "../../prisma";

export async function submitContact(prevState: any, formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    if (!name || !email || !message) {
      return { error: "Por favor, rellena todos los campos." };
    }

    await prisma.contactMessage.create({
      data: {
        name,
        email,
        message,
      },
    });

    return { success: true, message: "¡Mensaje enviado con éxito! Te responderé lo antes posible." };
  } catch (error) {
    console.error("Error al guardar el mensaje:", error);
    return { error: "Hubo un problema al enviar el mensaje. Por favor, intenta de nuevo." };
  }
}