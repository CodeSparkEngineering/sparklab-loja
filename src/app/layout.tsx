import type { Metadata } from "next";
import { Quicksand, Caveat } from "next/font/google";
import "./globals.css";
import ScrollFX from "@/components/ScrollFX";
import BackgroundScrollVideo from "@/components/BackgroundScrollVideo";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";
import { ThemeProvider } from "@/components/ThemeProvider";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const SITE_URL = "https://sparklab-loja.vercel.app";
const SITE_DESC =
  "Miniaturas, porta-chaves, acessórios e peças sob encomenda impressas em 3D com acabamento profissional. Encomenda online com entrega para todo o Portugal.";

const schemaMarkup = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "SparkLab",
  "alternateName": "SparkLab 3D",
  "description": SITE_DESC,
  "url": SITE_URL,
  "logo": `${SITE_URL}/logo.jpg`,
  "image": `${SITE_URL}/logo.jpg`,
  "priceRange": "€-€€",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "PT",
    "addressRegion": "Portugal"
  },
  "areaServed": {
    "@type": "Country",
    "name": "Portugal"
  }
};

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
      className={`${quicksand.variable} ${caveat.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <CartProvider>
            <BackgroundScrollVideo src="/videos/hero.mp4" />
            <div className="scroll-progress" aria-hidden="true" />
            <ScrollFX />
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
            />
            {children}
            <CartDrawer />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
