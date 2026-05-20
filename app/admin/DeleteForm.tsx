"use client";

import { ReactNode } from "react";

export default function DeleteForm({
  action,
  children,
}: {
  action: string | ((formData: FormData) => void | Promise<void>);
  children: ReactNode;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!window.confirm("¿Estás seguro de que deseas eliminar este lead definitivamente? Esta acción no se puede deshacer.")) {
          e.preventDefault(); // Si el usuario cancela, detenemos el borrado
        }
      }}
    >
      {children}
    </form>
  );
}