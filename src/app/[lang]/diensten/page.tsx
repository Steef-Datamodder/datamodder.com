import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, GitBranch, Layers, BarChart3, Shield, Zap, Lock, Wrench, GitMerge, Code2 } from "lucide-react";
import MudSparkles from "@/components/MudSparkles";
import type { Lang } from "@/lib/i18n";

type PageProps = { params: Promise<{ lang: string }> };

const content = {
  nl: {
    meta: { title: "Diensten — Datamodder", description: "Ontdek onze data engineering diensten: pipelines, architectuur, business intelligence en meer." },
    h1a: "Onze", h1b: "diensten",
    headerSub: "Van ruwe data tot bruikbare produkten, wij dekken het volledige spectrum van back-end tot front-end. Op het gebied van data en software, maar ook als het gaat om het samenstellen en begeleiden van complete teams specialisten.",
    delivers: "Wat we leveren",
    moreInfo: "Meer weten? Neem contact op",
    alsoFor: "Ook voor…",
    alsoForSub: "Aanvullende diensten die wij verlenen",
    toolboxTitle: "Onze toolbox",
    toolboxSub: "Technologieën waarmee wij dagelijks werken",
    ctaH2: "Iets wat je hier niet ziet?",
    ctaBody: "Data engineering is breed. Vertel ons jouw uitdaging en wij denken graag mee.",
    ctaBtn: "Stel jouw vraag",
    main: [
      { title: "Data Engineering", subtitle: "Pipelines & Integratie",
        desc: "Wij bouwen betrouwbare, schaalbare datapipelines die jouw data van bron naar bestemming brengen. Of het nu gaat om batch-processen of real-time streaming, wij hebben de expertise om het goed te doen.",
        features: ["ETL & ELT pipelines", "Performance tuning", "Batch processing (dbt, bash Powershell)", "API-integraties", "DevOps inrichting"] },
      { title: "Data Architectuur", subtitle: "Ontwerp & Implementatie",
        desc: "Een solide data-architectuur is de basis van alles. Wij ontwerpen en implementeren moderne data-platforms die vandaag werken en morgen meegroeien.",
        features: ["Data lake & lakehouse design", "Medallion architecture", "Data mesh implementatie", "Cloud-native oplossingen", "Migraties van legacy systemen"] },
      { title: "Data Governance", subtitle: "Kwaliteit, Beleid & Compliance",
        desc: "Data die je niet vertrouwt, gebruik je niet. Wij helpen organisaties met het inrichten van datakwaliteitsprocessen, beleid en compliance, zodat data een betrouwbare basis wordt voor beslissingen.",
        features: ["Datakwaliteit & validatie", "Data lineage & catalogisering", "AVG/GDPR compliance", "Toegangsbeheer & security", "Master data management"] },
      { title: "Data Vault", subtitle: "Modellering & Historisering",
        desc: "Data Vault is de meest robuuste modelleringsmethode voor enterprise data warehouses. Wij ontwerpen en implementeren Data Vault 2.0 oplossingen die flexibel meegroeien met jouw bronnen en business regels.",
        features: ["Data Vault 2.0 modellering", "Hub, Link & Satellite design", "Historisering & auditability", "Integratie met dbt & Databricks", "Migratie vanuit bestaand DWH"] },
      { title: "Software Ontwikkeling", subtitle: "Maatwerk & Integratie",
        desc: "Naast data-oplossingen bouwen wij ook maatwerksoftware. Van interne tooling tot API-koppelingen en dashboards, wij schrijven robuuste, onderhoudbare code die aansluit op jouw data-omgeving.",
        features: ["Maatwerk applicaties (Python, C#)", "API-ontwikkeling & integraties", "Interne tooling & automatisering", "IoT-koppelingen (Raspberry Pi, Arduino)", "Onderhoud & doorontwikkeling"] },
    ],
    additional: [
      { title: "Business Intelligence", desc: "Power BI, Tableau, Looker, intuïtieve dashboards en rapportages waarmee jouw team betere beslissingen neemt." },
      { title: "Performance Optimalisatie", desc: "Trage queries, overbelaste pipelines, hoge cloudkosten? Wij zoeken het knelpunt en lossen het op." },
      { title: "IT Security", desc: "Beveiliging van data-omgevingen, toegangsbeheer en security reviews van jouw dataplatform." },
      { title: "Tool selectie", desc: "Onafhankelijk advies bij de keuze van tools, platformen en technologieën die passen bij jouw situatie." },
    ],
  },
  en: {
    meta: { title: "Services — Datamodder", description: "Discover our data engineering services: pipelines, architecture, business intelligence and more." },
    h1a: "Our", h1b: "services",
    headerSub: "From raw data to usable products, we cover the full spectrum from back-end to front-end. In data and software, but also when it comes to assembling and guiding complete teams of specialists.",
    delivers: "What we deliver",
    moreInfo: "Want to know more? Get in touch",
    alsoFor: "Also for…",
    alsoForSub: "Additional services we provide",
    toolboxTitle: "Our toolbox",
    toolboxSub: "Technologies we work with every day",
    ctaH2: "Something you don't see here?",
    ctaBody: "Data engineering is broad. Tell us your challenge and we'll think along with you.",
    ctaBtn: "Ask your question",
    main: [
      { title: "Data Engineering", subtitle: "Pipelines & Integration",
        desc: "We build reliable, scalable data pipelines that move your data from source to destination. Whether batch processes or real-time streaming, we have the expertise to do it right.",
        features: ["ETL & ELT pipelines", "Performance tuning", "Batch processing (dbt, bash, PowerShell)", "API integrations", "DevOps setup"] },
      { title: "Data Architecture", subtitle: "Design & Implementation",
        desc: "A solid data architecture is the foundation of everything. We design and implement modern data platforms that work today and scale tomorrow.",
        features: ["Data lake & lakehouse design", "Medallion architecture", "Data mesh implementation", "Cloud-native solutions", "Legacy system migrations"] },
      { title: "Data Governance", subtitle: "Quality, Policy & Compliance",
        desc: "Data you don't trust, you don't use. We help organisations set up data quality processes, policies and compliance, making data a reliable basis for decisions.",
        features: ["Data quality & validation", "Data lineage & cataloguing", "GDPR compliance", "Access control & security", "Master data management"] },
      { title: "Data Vault", subtitle: "Modelling & Historization",
        desc: "Data Vault is the most robust modelling method for enterprise data warehouses. We design and implement Data Vault 2.0 solutions that flexibly grow with your sources and business rules.",
        features: ["Data Vault 2.0 modelling", "Hub, Link & Satellite design", "Historization & auditability", "Integration with dbt & Databricks", "Migration from existing DWH"] },
      { title: "Software Development", subtitle: "Custom & Integration",
        desc: "Besides data solutions, we also build custom software. From internal tooling to API integrations and dashboards, we write robust, maintainable code that connects to your data environment.",
        features: ["Custom applications (Python, C#)", "API development & integrations", "Internal tooling & automation", "IoT integrations (Raspberry Pi, Arduino)", "Maintenance & further development"] },
    ],
    additional: [
      { title: "Business Intelligence", desc: "Power BI, Tableau, Looker — intuitive dashboards and reports that help your team make better decisions." },
      { title: "Performance Optimization", desc: "Slow queries, overloaded pipelines, high cloud costs? We find the bottleneck and fix it." },
      { title: "IT Security", desc: "Securing data environments, access management and security reviews of your data platform." },
      { title: "Tool Selection", desc: "Independent advice on the choice of tools, platforms and technologies that fit your situation." },
    ],
  },
  de: {
    meta: { title: "Leistungen — Datamodder", description: "Entdecken Sie unsere Data-Engineering-Leistungen: Pipelines, Architektur, Business Intelligence und mehr." },
    h1a: "Unsere", h1b: "Leistungen",
    headerSub: "Von Rohdaten zu nutzbaren Produkten — wir decken das gesamte Spektrum von Back-End bis Front-End ab. Im Bereich Data und Software, aber auch beim Zusammenstellen und Begleiten kompletter Spezialistenteams.",
    delivers: "Was wir liefern",
    moreInfo: "Mehr erfahren? Kontakt aufnehmen",
    alsoFor: "Auch für…",
    alsoForSub: "Zusätzliche Leistungen, die wir erbringen",
    toolboxTitle: "Unsere Toolbox",
    toolboxSub: "Technologien, mit denen wir täglich arbeiten",
    ctaH2: "Etwas, das Sie hier nicht sehen?",
    ctaBody: "Data Engineering ist vielfältig. Erzählen Sie uns von Ihrer Herausforderung, und wir denken gerne mit.",
    ctaBtn: "Frage stellen",
    main: [
      { title: "Data Engineering", subtitle: "Pipelines & Integration",
        desc: "Wir bauen zuverlässige, skalierbare Datenpipelines, die Ihre Daten von der Quelle zum Ziel transportieren. Ob Batch-Prozesse oder Echtzeit-Streaming — wir haben die Expertise, es richtig zu machen.",
        features: ["ETL & ELT Pipelines", "Performance-Tuning", "Batch-Verarbeitung (dbt, bash, PowerShell)", "API-Integrationen", "DevOps-Einrichtung"] },
      { title: "Datenarchitektur", subtitle: "Entwurf & Implementierung",
        desc: "Eine solide Datenarchitektur ist die Grundlage von allem. Wir entwerfen und implementieren moderne Datenplattformen, die heute funktionieren und morgen mitwachsen.",
        features: ["Data Lake & Lakehouse Design", "Medallion-Architektur", "Data-Mesh-Implementierung", "Cloud-native Lösungen", "Legacy-System-Migrationen"] },
      { title: "Data Governance", subtitle: "Qualität, Richtlinien & Compliance",
        desc: "Daten, denen Sie nicht vertrauen, nutzen Sie nicht. Wir helfen Organisationen beim Einrichten von Datenqualitätsprozessen, Richtlinien und Compliance, sodass Daten eine verlässliche Grundlage für Entscheidungen werden.",
        features: ["Datenqualität & Validierung", "Data Lineage & Katalogisierung", "DSGVO-Compliance", "Zugriffskontrolle & Sicherheit", "Master Data Management"] },
      { title: "Data Vault", subtitle: "Modellierung & Historisierung",
        desc: "Data Vault ist die robusteste Modellierungsmethode für Enterprise Data Warehouses. Wir entwerfen und implementieren Data Vault 2.0 Lösungen, die flexibel mit Ihren Quellen und Geschäftsregeln mitwachsen.",
        features: ["Data Vault 2.0 Modellierung", "Hub-, Link- & Satellite-Design", "Historisierung & Auditierbarkeit", "Integration mit dbt & Databricks", "Migration aus bestehendem DWH"] },
      { title: "Softwareentwicklung", subtitle: "Maßgeschneidert & Integration",
        desc: "Neben Datenlösungen entwickeln wir auch maßgeschneiderte Software. Von internen Tools bis hin zu API-Integrationen und Dashboards — wir schreiben robusten, wartbaren Code für Ihre Datenumgebung.",
        features: ["Maßgeschneiderte Anwendungen (Python, C#)", "API-Entwicklung & Integrationen", "Interne Tools & Automatisierung", "IoT-Integrationen (Raspberry Pi, Arduino)", "Wartung & Weiterentwicklung"] },
    ],
    additional: [
      { title: "Business Intelligence", desc: "Power BI, Tableau, Looker — intuitive Dashboards und Berichte für bessere Entscheidungen Ihres Teams." },
      { title: "Leistungsoptimierung", desc: "Langsame Abfragen, überlastete Pipelines, hohe Cloud-Kosten? Wir finden den Engpass und beheben ihn." },
      { title: "IT-Sicherheit", desc: "Absicherung von Datenumgebungen, Zugangsverwaltung und Sicherheitsreviews Ihrer Datenplattform." },
      { title: "Tool-Auswahl", desc: "Unabhängige Beratung bei der Auswahl von Tools, Plattformen und Technologien, die zu Ihrer Situation passen." },
    ],
  },
};

const mainIcons = [<GitBranch key="de" size={36} />, <Layers key="da" size={36} />, <Shield key="dg" size={36} />, <GitMerge key="dv" size={36} />, <Code2 key="so" size={36} />];
const addIcons = [<BarChart3 key="bi" size={24} />, <Zap key="po" size={24} />, <Lock key="sec" size={24} />, <Wrench key="ts" size={24} />];

const techStack = ["Snowflake", "dbt", "Python", "C#", "Apache Spark", "Apache Airflow", "Databricks", "BigQuery", "Azure", "AWS", "GCP", "Power BI", "Tableau", "PostgreSQL", "SQL Server", "Raspberry Pi", "Arduino"];

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  return content[(lang as Lang)]?.meta ?? content.nl.meta;
}

export default async function DienstenPage({ params }: PageProps) {
  const { lang } = await params;
  const t = content[(lang as Lang)] ?? content.nl;

  return (
    <>
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/images/modderpoel.jpg')`, filter: "brightness(0.25) saturate(0.7)" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0a08]/40 via-transparent to-[#0c0a08]" />
        <MudSparkles />
        <div className="max-w-4xl mx-auto text-center relative z-20">
          <h1 className="text-5xl md:text-6xl font-black text-[#f5f0eb] leading-tight mb-6">
            {t.h1a} <span className="text-gradient">{t.h1b}</span>
          </h1>
          <p className="text-[#9a8f85] text-lg max-w-2xl mx-auto leading-relaxed">{t.headerSub}</p>
        </div>
      </section>

      <section className="pb-24 px-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {t.main.map(({ title, subtitle, desc, features }, i) => (
            <div key={title}
              className={`grid md:grid-cols-2 gap-10 items-start p-8 md:p-12 rounded-3xl bg-[#1a1612] border border-orange-900/20 ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
              <div className={i % 2 === 1 ? "md:order-2" : ""}>
                <div className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-400 mb-6">
                  {mainIcons[i]}
                </div>
                <p className="text-orange-500 text-xs font-semibold uppercase tracking-widest mb-2">{subtitle}</p>
                <h2 className="text-3xl md:text-4xl font-black text-[#f5f0eb] mb-4">{title}</h2>
                <p className="text-[#9a8f85] leading-relaxed">{desc}</p>
              </div>
              <div className={i % 2 === 1 ? "md:order-1" : ""}>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-orange-500/60 mb-4">{t.delivers}</h3>
                <ul className="space-y-3">
                  {features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-[#f5f0eb] text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0" />{f}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Link href={`/${lang}/contact`}
                    className="inline-flex items-center gap-2 text-orange-400 font-medium hover:text-orange-300 transition-colors text-sm">
                    {t.moreInfo} <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 bg-[#0a0806]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-[#f5f0eb] mb-4">{t.alsoFor}</h2>
            <p className="text-[#9a8f85]">{t.alsoForSub}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.additional.map(({ title, desc }, i) => (
              <div key={title} className="p-6 rounded-2xl bg-[#1a1612] border border-orange-900/20">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 mb-4">
                  {addIcons[i]}
                </div>
                <h3 className="text-[#f5f0eb] font-bold mb-2">{title}</h3>
                <p className="text-[#9a8f85] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-[#f5f0eb] mb-4">{t.toolboxTitle}</h2>
            <p className="text-[#9a8f85]">{t.toolboxSub}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((tech) => (
              <span key={tech}
                className="px-4 py-2 rounded-full border border-orange-900/30 bg-[#1a1612] text-[#9a8f85] text-sm hover:border-orange-500/50 hover:text-orange-400 transition-colors cursor-default">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-[#0a0806]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black text-[#f5f0eb] mb-4">{t.ctaH2}</h2>
          <p className="text-[#9a8f85] mb-8">{t.ctaBody}</p>
          <Link href={`/${lang}/contact`}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-400 transition-all duration-200 glow-orange">
            {t.ctaBtn} <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
