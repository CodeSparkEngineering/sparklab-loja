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

const SITE_URL = "https://sparklab-loja.vercel.app";
const SITE_DESC =
  "Miniaturas, porta-chaves, acessórios e peças sob encomenda impressas em 3D com acabamento profissional. Encomenda online com entrega para todo o Portugal.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "SparkLab — Impressão 3D sob encomenda em Portugal",
    template: "%s · SparkLab",
  },
  description: SITE_DESC,
  keywords: [
    "impressão 3D",
    "impressão 3D Portugal",
    "miniaturas 3D",
    "porta-chaves 3D",
    "ficheiros STL",
    "peças sob encomenda",
    "SparkLab",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_PT",
    url: SITE_URL,
    siteName: "SparkLab",
    title: "SparkLab — Impressão 3D sob encomenda em Portugal",
    description: SITE_DESC,
  },
  twitter: {
    card: "summary_large_image",
    title: "SparkLab — Impressão 3D sob encomenda em Portugal",
    description: SITE_DESC,
  },
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
      lang="pt-PT"
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
