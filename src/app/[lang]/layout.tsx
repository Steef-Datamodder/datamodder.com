import { notFound } from "next/navigation";
import { hasLocale } from "@/lib/i18n";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export async function generateStaticParams() {
  return [{ lang: "nl" }, { lang: "en" }, { lang: "de" }];
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
