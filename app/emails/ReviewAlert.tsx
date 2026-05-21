import { Html, Head, Body, Container, Section, Text, Tailwind, Preview } from "@react-email/components";
import * as React from "react";

interface ReviewAlertProps {
  name: string;
  role: string;
  stars: number;
  message: string;
}

export default function ReviewAlert({ name, role, stars, message }: ReviewAlertProps) {
  return (
    <Html>
      <Head />
      <Preview>{`Nueva reseña de ${name} (${stars} estrellas)`}</Preview>
      <Tailwind>
        <Body className="bg-slate-100 font-sans">
          <Container className="max-w-[600px] mx-auto py-8">
            <Section className="bg-white border-t-4 border-purple-600 rounded-lg p-6 shadow-sm">
              <Text className="text-xl font-bold text-slate-900 mb-4">
                ⭐ Nueva Reseña Recibida
              </Text>
              <Section className="bg-slate-50 rounded-lg p-4 mb-6">
                <Text className="m-0 mb-2 text-sm"><strong>Nombre:</strong> {name}</Text>
                <Text className="m-0 mb-2 text-sm"><strong>Rol/Empresa:</strong> {role}</Text>
                <Text className="m-0 text-sm"><strong>Valoración:</strong> {stars}/5 estrellas</Text>
              </Section>
              <Text className="text-sm font-bold text-slate-800 mb-2">Mensaje:</Text>
              <Text className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 border border-slate-200 rounded-lg italic whitespace-pre-wrap">
                "{message}"
              </Text>
              <Text className="text-center text-xs text-slate-400 mt-8">
                Entra a tu panel de administrador para publicar esta reseña en la web.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}