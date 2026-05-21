import { Html, Head, Body, Container, Section, Text, Tailwind, Preview } from "@react-email/components";
import * as React from "react";

interface AdminAlertProps {
  name: string;
  email: string;
  project: string;
  message: string;
}

export default function AdminAlert({ name, email, project, message }: AdminAlertProps) {
  return (
    <Html>
      <Head />
      <Preview>Nuevo lead de {name} - {project}</Preview>
      <Tailwind>
        <Body className="bg-slate-100 font-sans">
          <Container className="max-w-[600px] mx-auto py-8">
            <Section className="bg-white border-t-4 border-orange-600 rounded-lg p-6 shadow-sm">
              <Text className="text-xl font-bold text-slate-900 mb-4">
                🔥 Nuevo Lead Recibido
              </Text>
              <Section className="bg-slate-50 rounded-lg p-4 mb-6">
                <Text className="m-0 mb-2 text-sm"><strong>Nombre:</strong> {name}</Text>
                <Text className="m-0 mb-2 text-sm"><strong>Email:</strong> {email}</Text>
                <Text className="m-0 text-sm"><strong>Proyecto:</strong> {project}</Text>
              </Section>
              <Text className="text-sm font-bold text-slate-800 mb-2">Mensaje:</Text>
              <Text className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 border border-slate-200 rounded-lg whitespace-pre-wrap">
                {message}
              </Text>
              <Text className="text-center text-xs text-slate-400 mt-8">
                Notificación automática del dashboard de Ferrum Forge
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}