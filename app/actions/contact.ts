"use server";

import prisma from "../../prisma";
import { Resend } from "resend";
import AutoReply from "../emails/AutoReply";
import AdminAlert from "../emails/AdminAlert";
import * as React from "react";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export type ContactFormState = {
  success?: boolean;
  error?: string;
  message?: string;
} | null;

export async function submitContact(prevState: ContactFormState, formData: FormData): Promise<ContactFormState> {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;
    const project = formData.get("project") as string || "No especificado";

    if (!name || !email || !message) {
      return { error: "Por favor, rellena todos los campos." };
    }

    await prisma.contactMessage.create({
      data: {
        name,
        email,
        message,
        project,
      },
    });

    // Enviar correos transaccionales concurrentemente
    if (resend) {
      try {
        await Promise.allSettled([
          resend.emails.send({
            from: "Ferrum Forge Studio <onboarding@resend.dev>", 
            to: [email], // ⚠️ IMPORTANTE: En modo pruebas, este 'email' debe ser TU Gmail.
            subject: "He recibido tu solicitud - Ferrum Forge Studio",
            react: React.createElement(AutoReply, { name, project }),
          }),
          resend.emails.send({
            from: "Notificaciones <onboarding@resend.dev>",
            to: ["pablohierro47@gmail.com"],
            subject: `🔥 Nuevo Lead: ${project} - ${name}`,
            react: React.createElement(AdminAlert, { name, email, project, message }),
          })
        ]);
      } catch (emailError) {
        console.error("Error interno aislando la creación de correos:", emailError);
      }
    }

    return { success: true, message: "¡Mensaje enviado con éxito! Te responderé lo antes posible." };
  } catch (error) {
    console.error("Error al guardar el mensaje:", error);
    return { error: "Hubo un problema al enviar el mensaje. Por favor, intenta de nuevo." };
  }
}