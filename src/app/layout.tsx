import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Datamodder — Data Engineering & Development",
  description:
    "Datamodder helpt organisaties met data engineering, data architectuur en business intelligence. Wij waden door jouw data.",
  keywords: ["data engineering", "data architectuur", "ETL", "data pipelines", "business intelligence", "Netherlands"],
  openGraph: {
    title: "Datamodder — Data Engineering & Development",
    description: "Wij waden door jouw data.",
    url: "https://datamodder.nl",
    siteName: "Datamodder",
    locale: "nl_NL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-LTRED3MZGV"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-LTRED3MZGV');
          `}
        </Script>
      </body>
    </html>
  );
}
