import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DREAMFRAME — Next-Gen AI Image Generator",
  description:
    "Turn imagination into photorealistic 8K visuals, cinematic concept art, and bespoke creative assets in milliseconds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full bg-black text-zinc-100 flex flex-col font-sans selection:bg-orange-500/20 selection:text-white">
        {children}
      </body>
    </html>
  );
}

