import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, GitBranch, Layers, BarChart3, Shield, Zap, Lock, Wrench, GitMerge, Code2 } from "lucide-react";
import MudSparkles from "@/components/MudSparkles";

export const metadata: Metadata = {
  title: "Diensten — Datamodder",
  description: "Ontdek onze data engineering diensten: pipelines, architectuur, business intelligence en meer.",
};

const mainServices = [
  {
    icon: <GitBranch size={36} />,
    title: "Data Engineering",
    subtitle: "Pipelines & Integratie",
    desc: "Wij bouwen betrouwbare, schaalbare datapipelines die jouw data van bron naar bestemming brengen. Of het nu gaat om batch-processen of real-time streaming, wij hebben de expertise om het goed te doen.",
    features: [
      "ETL & ELT pipelines",
      "Performance tuning",
      "Batch processing (dbt, bash Powershell)",
      "API-integraties",
      "DevOps inrichting",
    ],
  },
  {
    icon: <Layers size={36} />,
    title: "Data Architectuur",
    subtitle: "Ontwerp & Implementatie",
    desc: "Een solide data-architectuur is de basis van alles. Wij ontwerpen en implementeren moderne data-platforms die vandaag werken en morgen meegroeien.",
    features: [
      "Data lake & lakehouse design",
      "Medallion architecture",
      "Data mesh implementatie",
      "Cloud-native oplossingen",
      "Migraties van legacy systemen",
    ],
  },
  {
    icon: <Shield size={36} />,
    title: "Data Governance",
    subtitle: "Kwaliteit, Beleid & Compliance",
    desc: "Data die je niet vertrouwt, gebruik je niet. Wij helpen organisaties met het inrichten van datakwaliteitsprocessen, beleid en compliance, zodat data een betrouwbare basis wordt voor beslissingen.",
    features: [
      "Datakwaliteit & validatie",
      "Data lineage & catalogisering",
      "AVG/GDPR compliance",
      "Toegangsbeheer & security",
      "Master data management",
    ],
  },
  {
    icon: <GitMerge size={36} />,
    title: "Data Vault",
    subtitle: "Modellering & Historisering",
    desc: "Data Vault is de meest robuuste modelleringsmethode voor enterprise data warehouses. Wij ontwerpen en implementeren Data Vault 2.0 oplossingen die flexibel meegroeien met jouw bronnen en business regels.",
    features: [
      "Data Vault 2.0 modellering",
      "Hub, Link & Satellite design",
      "Historisering & auditability",
      "Integratie met dbt & Databricks",
      "Migratie vanuit bestaand DWH",
    ],
  },
  {
    icon: <Code2 size={36} />,
    title: "Software Ontwikkeling",
    subtitle: "Maatwerk & Integratie",
    desc: "Naast data-oplossingen bouwen wij ook maatwerksoftware. Van interne tooling tot API-koppelingen en dashboards, wij schrijven robuuste, onderhoudbare code die aansluit op jouw data-omgeving.",
    features: [
      "Maatwerk applicaties (Python, C#)",
      "API-ontwikkeling & integraties",
      "Interne tooling & automatisering",
      "IoT-koppelingen (Raspberry Pi, Arduino)",
      "Onderhoud & doorontwikkeling",
    ],
  },
];

const additionalServices = [
  {
    icon: <BarChart3 size={24} />,
    title: "Business Intelligence",
    desc: "Power BI, Tableau, Looker, intuïtieve dashboards en rapportages waarmee jouw team betere beslissingen neemt.",
  },
  {
    icon: <Zap size={24} />,
    title: "Performance Optimalisatie",
    desc: "Trage queries, overbelaste pipelines, hoge cloudkosten? Wij zoeken het knelpunt en lossen het op.",
  },
  {
    icon: <Lock size={24} />,
    title: "IT Security",
    desc: "Beveiliging van data-omgevingen, toegangsbeheer en security reviews van jouw dataplatform.",
  },
  {
    icon: <Wrench size={24} />,
    title: "Tool selectie",
    desc: "Onafhankelijk advies bij de keuze van tools, platformen en technologieën die passen bij jouw situatie.",
  },
];

const techStack = [
  "Snowflake", "dbt", "Python", "C#", "Apache Spark", "Apache Airflow",
  "Databricks", "BigQuery", "Azure", "AWS", "GCP",
  "Power BI", "Tableau", "PostgreSQL", "SQL Server", "Raspberry Pi", "Arduino",
];

export default function DienstenPage() {
  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/images/modderpoel.jpg')`,
            filter: "brightness(0.25) saturate(0.7)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0a08]/40 via-transparent to-[#0c0a08]" />
        <MudSparkles />
        <div className="max-w-4xl mx-auto text-center relative z-20">
          <h1 className="text-5xl md:text-6xl font-black text-[#f5f0eb] leading-tight mb-6">
            Onze <span className="text-gradient">diensten</span>
          </h1>
          <p className="text-[#9a8f85] text-lg max-w-2xl mx-auto leading-relaxed">
            Van ruwe data tot bruikbare produkten, wij dekken het volledige spectrum van back-end tot front-end. Op het gebied van data en software, maar ook als het gaat om het samenstellen en begeleiden van complete teams specialisten.
          </p>
        </div>
      </section>

      {/* Main services */}
      <section className="pb-24 px-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {mainServices.map(({ icon, title, subtitle, desc, features }, i) => (
            <div
              key={title}
              className={`grid md:grid-cols-2 gap-10 items-start p-8 md:p-12 rounded-3xl bg-[#1a1612] border border-orange-900/20 ${
                i % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className={i % 2 === 1 ? "md:order-2" : ""}>
                <div className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-400 mb-6">
                  {icon}
                </div>
                <p className="text-orange-500 text-xs font-semibold uppercase tracking-widest mb-2">{subtitle}</p>
                <h2 className="text-3xl md:text-4xl font-black text-[#f5f0eb] mb-4">{title}</h2>
                <p className="text-[#9a8f85] leading-relaxed">{desc}</p>
              </div>
              <div className={i % 2 === 1 ? "md:order-1" : ""}>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-orange-500/60 mb-4">
                  Wat we leveren
                </h3>
                <ul className="space-y-3">
                  {features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-[#f5f0eb] text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-orange-400 font-medium hover:text-orange-300 transition-colors text-sm"
                  >
                    Meer weten? Neem contact op <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Additional services */}
      <section className="py-24 px-6 bg-[#0a0806]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-[#f5f0eb] mb-4">Ook voor&hellip;</h2>
            <p className="text-[#9a8f85]">Aanvullende diensten die wij verlenen</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalServices.map(({ icon, title, desc }) => (
              <div key={title} className="p-6 rounded-2xl bg-[#1a1612] border border-orange-900/20">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 mb-4">
                  {icon}
                </div>
                <h3 className="text-[#f5f0eb] font-bold mb-2">{title}</h3>
                <p className="text-[#9a8f85] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech stack */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-[#f5f0eb] mb-4">Onze toolbox</h2>
            <p className="text-[#9a8f85]">Technologieën waarmee wij dagelijks werken</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-full border border-orange-900/30 bg-[#1a1612] text-[#9a8f85] text-sm hover:border-orange-500/50 hover:text-orange-400 transition-colors cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-[#0a0806]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black text-[#f5f0eb] mb-4">
            Iets wat je hier niet ziet?
          </h2>
          <p className="text-[#9a8f85] mb-8">
            Data engineering is breed. Vertel ons jouw uitdaging en wij denken graag mee.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-400 transition-all duration-200 glow-orange"
          >
            Stel jouw vraag <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
