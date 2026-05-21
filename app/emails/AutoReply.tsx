import { Html, Head, Body, Container, Section, Text, Tailwind, Preview } from "@react-email/components";
import * as React from "react";

interface AutoReplyProps {
  name: string;
  project: string;
}

export default function AutoReply({ name = "Cliente", project = "Desarrollo Web" }: AutoReplyProps) {
  return (
    <Html>
      <Head />
      <Preview>He recibido tu solicitud para tu proyecto en Ferrum Forge.</Preview>
      <Tailwind>
        <Body className="bg-white font-sans text-slate-900">
          <Container className="max-w-[600px] mx-auto py-8">
            <Section className="border border-slate-200 rounded-xl p-8 shadow-sm">
              <Text className="text-2xl font-black text-slate-950 mb-6 tracking-tight">
                FF <span className="text-orange-600">FERRUM FORGE</span>
              </Text>
              
              <Text className="text-base text-slate-700 leading-relaxed">
                Hola <strong>{name}</strong>,
              </Text>
              
              <Text className="text-base text-slate-700 leading-relaxed">
                He recibido correctamente tu solicitud para tu proyecto de <strong>{project}</strong>.
              </Text>
              
              <Text className="text-base text-slate-700 leading-relaxed">
                Lo revisaré detenidamente y me pondré en contacto contigo en menos de 24 horas para analizar los detalles y ver cómo podemos llevarlo al siguiente nivel con una arquitectura sólida.
              </Text>
              
              <Text className="text-base text-slate-700 leading-relaxed mt-8">
                Un saludo,<br />
                <strong>Pablo Hierro</strong><br />
                <span className="text-slate-500 text-sm">Ingeniero Full-Stack | Ferrum Forge Studio</span>
              </Text>
            </Section>
            <Text className="text-center text-xs text-slate-400 mt-6">
              © {new Date().getFullYear()} Ferrum Forge Studio. Todos los derechos reservados.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}