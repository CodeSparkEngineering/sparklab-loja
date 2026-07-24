import type { Metadata } from "next";
import { Quicksand, Caveat } from "next/font/google";
import "./globals.css";
import ScrollFX from "@/components/ScrollFX";
import BackgroundScrollVideo from "@/components/BackgroundScrollVideo";
import { CartProvider } from "@/context/CartContext";
import { LanguageProvider } from "@/i18n/LanguageContext";
import CartDrawer from "@/components/CartDrawer";
import BackToTop from "@/components/BackToTop";
import CheckoutNotice from "@/components/CheckoutNotice";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SITE_URL, SITE_DESC, GOOGLE_PROFILE_URL } from "@/data/site";
import { Analytics } from "@vercel/analytics/next";
import GoogleAdsTag from "@/components/GoogleAdsTag";

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


const schemaMarkup = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "OnlineStore"],
  "@id": `${SITE_URL}/#business`,
  "name": "SparkLab",
  "alternateName": "SparkLab 3D",
  "description": SITE_DESC,
  "slogan": "Impressão 3D sob encomenda, com acabamento que impressiona.",
  "url": SITE_URL,
  "logo": `${SITE_URL}/logo.jpg`,
  "image": `${SITE_URL}/logo.jpg`,
  "telephone": "+351916853802",
  "priceRange": "€-€€",
  "currenciesAccepted": "EUR",
  "paymentAccepted": "Visa, Mastercard (Stripe)",
  "sameAs": [
    "https://www.instagram.com/sparklabs.3d/",
    GOOGLE_PROFILE_URL
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "telephone": "+351916853802",
    "availableLanguage": ["Portuguese", "English"],
    "url": "https://wa.me/351916853802"
  },
  "founder": [
    { "@type": "Person", "name": "Israel Vieira" },
    { "@type": "Person", "name": "Pamela Falk" }
  ],
  // Morada e coordenadas iguais às do Perfil de Empresa no Google (SEO local:
  // a consistência NAP entre o site e o perfil reforça o ranking em pesquisas
  // locais tipo "impressão 3D perto de mim").
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "R. Comércio 926",
    "addressLocality": "Sangalhos",
    "addressRegion": "Aveiro",
    "postalCode": "3780-124",
    "addressCountry": "PT"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 40.4856906,
    "longitude": -8.4694809
  },
  "areaServed": {
    "@type": "Country",
    "name": "Portugal"
  },
  "knowsAbout": [
    "Impressão 3D FDM",
    "Modelação 3D",
    "PLA, PETG, ABS, ASA, TPU, PC",
    "Bambu Lab P1S",
    "Peças personalizadas sob encomenda"
  ]
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  "name": "SparkLab",
  "url": SITE_URL,
  "inLanguage": "pt-PT",
  "publisher": { "@id": `${SITE_URL}/#business` }
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
          <LanguageProvider>
          <CartProvider>
            <BackgroundScrollVideo src="/videos/hero.mp4" />
            <div className="scroll-progress" aria-hidden="true" />
            <ScrollFX />
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup).replace(/</g, '\\u003c') }}
            />
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema).replace(/</g, '\\u003c') }}
            />
            {children}
            <CartDrawer />
            <BackToTop />
            <CheckoutNotice />
          </CartProvider>
          </LanguageProvider>
        </ThemeProvider>
        {/* Só em produção — em dev o script /_vercel/insights não existe (404). */}
        {process.env.NODE_ENV === 'production' && <Analytics />}
        {/* Google Ads: inerte sem NEXT_PUBLIC_GADS_ID definido (ver GoogleAdsTag). */}
        <GoogleAdsTag />
      </body>
    </html>
  );
}
