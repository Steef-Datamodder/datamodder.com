import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, GitBranch, Layers, Shield, GitMerge, Code2, BarChart3, Zap, Lock, Wrench } from "lucide-react";
import MudBubbles from "@/components/MudBubbles";
import type { Lang } from "@/lib/i18n";

type PageProps = { params: Promise<{ lang: string }> };

const content = {
  nl: {
    meta: { title: "Datamodder — Data Engineering & Development", description: "Datamodder helpt organisaties met data engineering, data architectuur en business intelligence. Wij waden door jouw data." },
    badge: "Data Engineering in Nederland én Duitsland!",
    h1a: "Wij waden", h1b: "door jouw data",
    subtitle: "Datamodder is jouw partner in data engineering en -architectuur. Wij duiken in de diepste krochten van jouw data en maken er iets moois van.",
    cta1: "Bekijk onze diensten", cta2: "Neem contact op", scroll: "Scroll",
    stats: [["30+", "Projecten afgerond"], ["20+", "Tevreden klanten"], [null, "Jaar ervaring"], ["100%", "Klantfocus"]],
    servicesTitle: "Onze diensten", servicesSubtitle: "Van ruwe data tot bruikbare inzichten, wij begeleiden het hele traject.",
    servicesLink: "Alle diensten bekijken",
    approachLabel: "Onze aanpak", approachH2a: "Pragmatisch.", approachH2b: "Technisch.", approachH2c: "Resultaatgericht.",
    approachBody: "Wij geloven niet in overengineering of buzzwords. Datamodder kijkt naar wat jouw organisatie nodig heeft en bouwt een oplossing die werkt, nu en in de toekomst.",
    aboutLink: "Over Datamodder",
    steps: [
      ["01", "Intake & analyse", "Begrijpen van jouw data-landschap en uitdagingen"],
      ["02", "Architectuur", "Ontwerp van de optimale data-architectuur"],
      ["03", "Implementatie", "Bouwen en testen van pipelines en oplossingen"],
      ["04", "Beheer & groei", "Doorontwikkeling en kennisoverdracht"],
    ],
    ctaH2: "Zin om datavraagstukken aan te pakken?",
    ctaBody: "Neem contact met ons op en ontdek hoe we jouw organisatie een boost kunnen geven.",
    ctaBtn: "Start het gesprek",
    services: [
      { title: "Data Engineering", desc: "Robuuste datapipelines en ETL/ELT-processen die jouw data betrouwbaar en schaalbaar verplaatsen." },
      { title: "Data Architectuur", desc: "Van data lakes tot lakehouses, wij ontwerpen een solide architectuur die aansluit bij jouw organisatie." },
      { title: "Data Governance", desc: "Datakwaliteit, lineage, privacy (AVG/GDPR) en toegangsbeheer, wij zorgen dat het op orde is." },
      { title: "Data Vault", desc: "Robuuste Data Vault 2.0 modellering voor enterprise data warehouses, flexibel, historisch en auditeerbaar." },
      { title: "Software Ontwikkeling", desc: "Maatwerk applicaties, API-koppelingen en interne tooling, robuuste code die aansluit op jouw data-omgeving." },
      { title: "Business Intelligence", desc: "Power BI, Tableau, Looker, intuïtieve dashboards en rapportages waarmee jouw team betere beslissingen neemt." },
      { title: "Performance Optimalisatie", desc: "Trage queries, overbelaste pipelines, hoge cloudkosten? Wij zoeken het knelpunt en lossen het op." },
      { title: "IT Security", desc: "Beveiliging van data-omgevingen, toegangsbeheer en security reviews van jouw dataplatform." },
      { title: "Tool selectie", desc: "Onafhankelijk advies bij de keuze van tools, platformen en technologieën die passen bij jouw situatie." },
    ],
  },
  en: {
    meta: { title: "Datamodder — Data Engineering & Development", description: "Datamodder helps organisations with data engineering, data architecture and business intelligence. We wade through your data." },
    badge: "Data Engineering in the Netherlands and Germany!",
    h1a: "We wade", h1b: "through your data",
    subtitle: "Datamodder is your partner in data engineering and architecture. We dive deep into your data and make something great out of it.",
    cta1: "View our services", cta2: "Get in touch", scroll: "Scroll",
    stats: [["30+", "Projects completed"], ["20+", "Satisfied clients"], [null, "Years of experience"], ["100%", "Client focus"]],
    servicesTitle: "Our services", servicesSubtitle: "From raw data to actionable insights, we guide the entire journey.",
    servicesLink: "View all services",
    approachLabel: "Our approach", approachH2a: "Pragmatic.", approachH2b: "Technical.", approachH2c: "Results-driven.",
    approachBody: "We don't believe in overengineering or buzzwords. Datamodder looks at what your organisation needs and builds a solution that works — now and in the future.",
    aboutLink: "About Datamodder",
    steps: [
      ["01", "Intake & analysis", "Understanding your data landscape and challenges"],
      ["02", "Architecture", "Designing the optimal data architecture"],
      ["03", "Implementation", "Building and testing pipelines and solutions"],
      ["04", "Management & growth", "Continuous development and knowledge transfer"],
    ],
    ctaH2: "Ready to tackle your data challenges?",
    ctaBody: "Get in touch with us and discover how we can boost your organisation.",
    ctaBtn: "Start the conversation",
    services: [
      { title: "Data Engineering", desc: "Robust data pipelines and ETL/ELT processes that move your data reliably and at scale." },
      { title: "Data Architecture", desc: "From data lakes to lakehouses, we design a solid architecture that fits your organisation." },
      { title: "Data Governance", desc: "Data quality, lineage, privacy (GDPR) and access control — we make sure it's in order." },
      { title: "Data Vault", desc: "Robust Data Vault 2.0 modelling for enterprise data warehouses — flexible, historical, and auditable." },
      { title: "Software Development", desc: "Custom applications, API integrations and internal tooling — robust code that connects to your data environment." },
      { title: "Business Intelligence", desc: "Power BI, Tableau, Looker — intuitive dashboards and reports that help your team make better decisions." },
      { title: "Performance Optimization", desc: "Slow queries, overloaded pipelines, high cloud costs? We find the bottleneck and fix it." },
      { title: "IT Security", desc: "Securing data environments, access management and security reviews of your data platform." },
      { title: "Tool Selection", desc: "Independent advice on the choice of tools, platforms and technologies that fit your situation." },
    ],
  },
  de: {
    meta: { title: "Datamodder — Data Engineering & Entwicklung", description: "Datamodder unterstützt Organisationen bei Data Engineering, Datenarchitektur und Business Intelligence. Wir waten durch Ihre Daten." },
    badge: "Data Engineering in den Niederlanden und Deutschland!",
    h1a: "Wir waten", h1b: "durch Ihre Daten",
    subtitle: "Datamodder ist Ihr Partner in Data Engineering und -Architektur. Wir tauchen in die tiefsten Ecken Ihrer Daten ein und machen etwas Großartiges daraus.",
    cta1: "Unsere Leistungen ansehen", cta2: "Kontakt aufnehmen", scroll: "Scrollen",
    stats: [["30+", "Abgeschlossene Projekte"], ["20+", "Zufriedene Kunden"], [null, "Jahre Erfahrung"], ["100%", "Kundenorientierung"]],
    servicesTitle: "Unsere Leistungen", servicesSubtitle: "Von Rohdaten zu verwertbaren Erkenntnissen — wir begleiten den gesamten Prozess.",
    servicesLink: "Alle Leistungen ansehen",
    approachLabel: "Unser Ansatz", approachH2a: "Pragmatisch.", approachH2b: "Technisch.", approachH2c: "Ergebnisorientiert.",
    approachBody: "Wir glauben nicht an Overengineering oder Buzzwords. Datamodder schaut, was Ihre Organisation braucht, und baut eine Lösung, die funktioniert — jetzt und in Zukunft.",
    aboutLink: "Über Datamodder",
    steps: [
      ["01", "Intake & Analyse", "Verstehen Ihres Daten-Landscapes und Ihrer Herausforderungen"],
      ["02", "Architektur", "Entwurf der optimalen Daten-Architektur"],
      ["03", "Implementierung", "Aufbau und Test von Pipelines und Lösungen"],
      ["04", "Betrieb & Wachstum", "Weiterentwicklung und Wissenstransfer"],
    ],
    ctaH2: "Bereit, Ihre Daten-Herausforderungen anzugehen?",
    ctaBody: "Nehmen Sie Kontakt auf und entdecken Sie, wie wir Ihre Organisation voranbringen können.",
    ctaBtn: "Gespräch starten",
    services: [
      { title: "Data Engineering", desc: "Robuste Datenpipelines und ETL/ELT-Prozesse, die Ihre Daten zuverlässig und skalierbar transportieren." },
      { title: "Datenarchitektur", desc: "Von Data Lakes bis Lakehouses — wir entwerfen eine solide Architektur, die zu Ihrer Organisation passt." },
      { title: "Data Governance", desc: "Datenqualität, Lineage, Datenschutz (DSGVO) und Zugriffskontrolle — wir sorgen dafür, dass alles stimmt." },
      { title: "Data Vault", desc: "Robuste Data Vault 2.0 Modellierung für Enterprise Data Warehouses — flexibel, historisch und auditierbar." },
      { title: "Softwareentwicklung", desc: "Maßgeschneiderte Anwendungen, API-Integrationen und interne Tools — robuster Code für Ihre Datenumgebung." },
      { title: "Business Intelligence", desc: "Power BI, Tableau, Looker — intuitive Dashboards und Berichte für bessere Entscheidungen Ihres Teams." },
      { title: "Leistungsoptimierung", desc: "Langsame Abfragen, überlastete Pipelines, hohe Cloud-Kosten? Wir finden den Engpass und beheben ihn." },
      { title: "IT-Sicherheit", desc: "Absicherung von Datenumgebungen, Zugangsverwaltung und Sicherheitsreviews Ihrer Datenplattform." },
      { title: "Tool-Auswahl", desc: "Unabhängige Beratung bei der Auswahl von Tools, Plattformen und Technologien, die zu Ihrer Situation passen." },
    ],
  },
};

function yearsActive() {
  const founded = new Date(2017, 5, 1);
  const now = new Date();
  const years = now.getFullYear() - founded.getFullYear() -
    (now < new Date(now.getFullYear(), 5, 1) ? 1 : 0);
  return `${years}+`;
}

const serviceIcons = [
  <GitBranch key="de" size={28} />, <Layers key="da" size={28} />, <Shield key="dg" size={28} />,
  <GitMerge key="dv" size={28} />, <Code2 key="so" size={28} />, <BarChart3 key="bi" size={28} />,
  <Zap key="po" size={28} />, <Lock key="sec" size={28} />, <Wrench key="ts" size={28} />,
];

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  return content[(lang as Lang) ?? "nl"]?.meta ?? content.nl.meta;
}

export default async function HomePage({ params }: PageProps) {
  const { lang } = await params;
  const t = content[(lang as Lang)] ?? content.nl;

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/images/modderpoel.jpg')`, filter: "brightness(0.35) saturate(0.7)" }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a08] via-[#0c0a08]/20 to-transparent" />
        <MudBubbles />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-orange-600/10 blur-3xl rounded-full" />
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-sm font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
            {t.badge}
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-none tracking-tight mb-6">
            <span className="block text-[#f5f0eb]">{t.h1a}</span>
            <span className="block text-gradient">{t.h1b}</span>
          </h1>
          <p className="text-lg md:text-xl text-[#9a8f85] max-w-2xl mx-auto leading-relaxed mb-10">{t.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${lang}/diensten`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-orange-500 text-white font-semibold text-base hover:bg-orange-400 transition-all duration-200 glow-orange">
              {t.cta1} <ArrowRight size={18} />
            </Link>
            <Link href={`/${lang}/contact`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-orange-500/40 text-[#f5f0eb] font-semibold text-base hover:border-orange-500 hover:bg-orange-500/10 transition-all duration-200">
              {t.cta2}
            </Link>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#9a8f85] text-xs">
          <span>{t.scroll}</span>
          <div className="w-px h-8 bg-gradient-to-b from-orange-500/60 to-transparent" />
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 border-y border-orange-900/20 bg-[#0a0806]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {t.stats.map(([value, label]) => (
              <div key={label} className="text-center">
                <div className="text-4xl md:text-5xl font-black text-gradient mb-1">{value ?? yearsActive()}</div>
                <div className="text-sm text-[#9a8f85]">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIENSTEN */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-[#f5f0eb] leading-tight">{t.servicesTitle}</h2>
            <p className="mt-4 text-[#9a8f85] max-w-xl mx-auto">{t.servicesSubtitle}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.services.map(({ title, desc }, i) => (
              <div key={title}
                className="group p-6 rounded-2xl bg-[#1a1612] border border-orange-900/20 hover:border-orange-500/40 transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 mb-5 group-hover:bg-orange-500/20 transition-colors">
                  {serviceIcons[i]}
                </div>
                <h3 className="text-[#f5f0eb] font-bold text-lg mb-2">{title}</h3>
                <p className="text-[#9a8f85] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href={`/${lang}/diensten`} className="inline-flex items-center gap-2 text-orange-400 font-medium hover:text-orange-300 transition-colors">
              {t.servicesLink} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* HOE WIJ WERKEN */}
      <section className="py-24 px-6 bg-[#0a0806]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-orange-500 text-sm font-semibold uppercase tracking-widest mb-3">{t.approachLabel}</p>
              <h2 className="text-4xl md:text-5xl font-black text-[#f5f0eb] leading-tight mb-6">
                {t.approachH2a} <br />{t.approachH2b} <br />
                <span className="text-gradient">{t.approachH2c}</span>
              </h2>
              <p className="text-[#9a8f85] leading-relaxed mb-6">{t.approachBody}</p>
              <Link href={`/${lang}/over-ons`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-orange-500/40 text-[#f5f0eb] font-medium hover:border-orange-500 hover:bg-orange-500/10 transition-all duration-200">
                {t.aboutLink} <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {t.steps.map(([step, title, desc]) => (
                <div key={step} className="p-5 rounded-2xl bg-[#1a1612] border border-orange-900/20">
                  <div className="text-orange-500/40 text-xs font-black mb-2">{step}</div>
                  <div className="text-[#f5f0eb] font-bold text-sm mb-1">{title}</div>
                  <div className="text-[#9a8f85] text-xs leading-relaxed">{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-no-repeat"
          style={{ backgroundImage: `url('/images/modderpoel.jpg')`, backgroundPosition: "bottom", filter: "brightness(0.3) saturate(0.7)" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0a08] via-[#0c0a08]/30 to-[#0c0a08]/60" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-black text-[#f5f0eb] leading-tight mb-6">
            <span className="text-gradient">{t.ctaH2}</span>
          </h2>
          <p className="text-[#9a8f85] text-lg mb-10">{t.ctaBody}</p>
          <Link href={`/${lang}/contact`}
            className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full bg-orange-500 text-white font-bold text-lg hover:bg-orange-400 transition-all duration-200 glow-orange animate-pulse-glow">
            {t.ctaBtn} <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </>
  );
}
