import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ferrum Forge Studio | Ingeniería Web de Alto Rendimiento",
  description:
    "Agencia de desarrollo web en Bilbao. Creamos aplicaciones web con Next.js, React y TypeScript. Diseño UI/UX premium + ingeniería de software. Solicita presupuesto.",
  keywords: [
    "desarrollo web bilbao",
    "agencia web freelance",
    "next.js developer",
    "diseño web a medida",
    "ferrum forge",
    "desarrollo frontend",
    "full stack engineer"
  ],
  authors: [{ name: "Pablo Hierro", url: "https://ferrumforge.dev" }],
  creator: "Pablo Hierro",
  icons: {
    icon: "/logo1.png",
  },
  openGraph: {
    title: "Ferrum Forge Studio | Ingeniería Web de Alto Rendimiento",
    description:
      "Ingeniería y diseño web a medida. Sin plantillas. Sin intermediarios. Presupuesto gratis.",
    url: "https://ferrumforge.dev", // ← cambia por tu dominio real
    siteName: "Ferrum Forge Studio",
    images: [
      {
        url: "https://ferrumforge.dev/og-image.jpg", // Asegúrate de tener public/og-image.jpg
        width: 1200,
        height: 630,
        alt: "Ferrum Forge Studio - Desarrollo Web",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ferrum Forge Studio | Ingeniería Web de Alto Rendimiento",
    description: "Aplicaciones web con Next.js, React y diseño UI/UX premium.",
    images: ["https://ferrumforge.dev/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Ferrum Forge Studio",
  "image": "https://ferrumforge.dev/og-image.png",
  "description": "Agencia de desarrollo web en Bilbao. Creamos aplicaciones web con Next.js, React y TypeScript. Diseño UI/UX premium + ingeniería de software.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Bilbao",
    "addressRegion": "Bizkaia",
    "addressCountry": "ES"
  },
  "url": "https://ferrumforge.dev",
  "priceRange": "$$$"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}