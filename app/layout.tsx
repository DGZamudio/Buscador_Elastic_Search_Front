import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "@/styles/Base_Buscador_general.css";

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Astrea Search",
  description: "Motor de busqueda con monton de archivos de leyes para buscar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${workSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
