import type { Metadata } from "next";
import { Poppins, Lora } from "next/font/google";
import "./globals.css";
import ScrollFX from "@/components/ScrollFX";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "SparkLab — Impressão 3D sob encomenda",
  description: "Protótipos, miniaturas, peças técnicas e objetos decorativos impressos com acabamento profissional e entrega para todo o Brasil.",
  icons: {
    icon: "/logo.jpg",
    apple: "/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${poppins.variable} ${lora.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <CartProvider>
          <div className="scroll-progress" aria-hidden="true" />
          <ScrollFX />
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
