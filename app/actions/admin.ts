"use server";

import prisma from "../../prisma";
import { revalidatePath } from "next/cache";

// Acción de servidor para alternar el estado del mensaje
export async function toggleReadStatus(id: string, currentStatus: boolean) {
  await prisma.contactMessage.update({
    where: { id },
    data: { isRead: !currentStatus },
  });
  revalidatePath("/admin");
}

// Acción de servidor para eliminar un mensaje
export async function deleteMessage(id: string) {
  await prisma.contactMessage.delete({
    where: { id },
  });
  revalidatePath("/admin");
}