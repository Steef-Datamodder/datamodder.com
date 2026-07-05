import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink, Clock, EyeOff, ScrollText, ShieldCheck, Search, FileCode2, Wand2, Clipboard, CalendarDays, ArrowLeftRight, Fingerprint, AppWindow, BarChart2, Timer } from "lucide-react";
import MudSparkles from "@/components/MudSparkles";

export const metadata: Metadata = {
  title: "Utils — Datamodder",
  description: "Open source dbt en Snowflake utilities van Datamodder. Gratis te gebruiken via GitHub.",
};

const macros = [
  {
    icon: <ScrollText size={28} />,
    title: "Logging",
    subtitle: "dbt run monitoring",
    href: "/utils/logging",
    desc: "Houd bij wanneer een dbt run start en wanneer hij klaar is. Automatisch gelogd in Snowflake, zodat je altijd kunt terugkijken wat er wanneer is uitgevoerd. Onmisbaar voor productie-omgevingen.",
    files: ["log_dbt_start", "log_dbt_end"],
  },
  {
    icon: <EyeOff size={28} />,
    title: "Masking",
    subtitle: "AVG/GDPR data masking",
    href: "/utils/masking",
    desc: "Pas dynamische data masking toe op gevoelige kolommen via dbt tags. Eén macro, en je persoonsgegevens zijn automatisch afgeschermd voor rollen die er geen toegang toe mogen hebben.",
    files: ["apply_masking_tag", "create_masking_setup"],
  },
  {
    icon: <Clock size={28} />,
    title: "Timestamps",
    subtitle: "Datum & tijd utilities",
    href: "/utils/timestamps",
    desc: "Een complete set macros voor het omzetten en opschonen van datum- en tijdwaarden in Snowflake. Van ruwe timestamp-strings naar schone, consistente datums, inclusief fixes voor maanden en weekdagen.",
    files: ["to_timestamp", "fix_months", "fix_weekdays"],
  },
  {
    icon: <Wand2 size={28} />,
    title: "Generate Sources",
    subtitle: "code generator",
    href: "/utils/generate-sources",
    desc: "Genereer automatisch sources.yml, stagingmodellen en dbt_project.yml configuratie vanuit je Snowflake database. Geen handmatige boilerplate meer bij het onboarden van nieuwe databronnen.",
    files: ["generate_source_yaml", "generate_staging_models", "generate_dbt_project_snippet"],
  },
  {
    icon: <CalendarDays size={28} />,
    title: "Generate Date Dimension",
    subtitle: "code generator",
    href: "/utils/generate-date-dimension",
    desc: "Genereer een complete datumdimensie voor Snowflake met kalender- en fiscale periodes, weeknummers en Nederlandse feestdagen, inclusief beweeglijke feestdagen zoals Pasen.",
    files: ["generate_date_dimension"],
  },
  {
    icon: <ArrowLeftRight size={28} />,
    title: "Uniform Datatypes",
    subtitle: "datatype standaardisatie",
    href: "/utils/uniform-datatypes",
    desc: "Cast alle kolommen van een brontabel automatisch naar uniforme Snowflake datatypes. Ongeldige waarden worden via TRY_TO_*-functies omgezet naar NULL in plaats van een fout te geven.",
    files: ["uniform_datatypes"],
  },
];

const procedures = [
  {
    icon: <ShieldCheck size={28} />,
    title: "Anonymizer",
    href: "/utils/anonymizer",
    desc: "Anonimiseer data direct in Snowflake via een stored procedure. Ideaal voor het maken van veilige ontwikkel- en testomgevingen zonder dat persoonsgegevens buiten productie komen.",
  },
  {
    icon: <Search size={28} />,
    title: "Analyzer",
    href: "/utils/analyzer",
    desc: "Analyseer de structuur en inhoud van je Snowflake tabellen met één procedure-aanroep. Handig als startpunt bij het onboarden van nieuwe databronnen of het opsporen van datakwaliteitsproblemen.",
  },
  {
    icon: <Fingerprint size={28} />,
    title: "GDPR Profiler",
    href: "/utils/gdpr-profiler",
    desc: "Scan automatisch een Snowflake-schema op persoonsgegevens via configureerbare regex-regels. Combineert kolomnaam- en waardedetectie met een betrouwbaarheidsscore en aanbevolen actie.",
  },
];

export default function UtilsPage() {
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
            Open source <span className="text-gradient">utils</span>
          </h1>
          <p className="text-[#9a8f85] text-lg max-w-2xl mx-auto leading-relaxed mb-8">
            Wij geloven in het delen van kennis. Onze dbt en Snowflake utilities zijn gratis beschikbaar via GitHub, voor iedereen die er iets aan heeft.
          </p>
          <a
            href="https://github.com/Steef-Datamodder/datamodder_utils"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-orange-500/40 text-[#f5f0eb] font-medium hover:border-orange-500 hover:bg-orange-500/10 transition-all duration-200"
          >
            <ExternalLink size={18} />
            Bekijk op GitHub
          </a>
        </div>
      </section>

      {/* Macros */}
      <section className="pb-16 pt-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="text-orange-500 text-xs font-semibold uppercase tracking-widest mb-2">dbt</p>
            <h2 className="text-3xl md:text-4xl font-black text-[#f5f0eb]">Macros</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {macros.map(({ icon, title, subtitle, href, desc }) => (
              <Link key={title} href={href} className="p-8 rounded-2xl bg-[#1a1612] border border-orange-900/20 flex flex-col hover:border-orange-500/40 hover:-translate-y-1 transition-all duration-200">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 mb-5">
                  {icon}
                </div>
                <p className="text-orange-500/70 text-xs font-semibold uppercase tracking-widest mb-1">{subtitle}</p>
                <h3 className="text-[#f5f0eb] font-black text-xl mb-3">{title}</h3>
                <p className="text-[#9a8f85] text-sm leading-relaxed flex-1">{desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stored Procedures */}
      <section className="py-16 px-6 bg-[#0a0806]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="text-orange-500 text-xs font-semibold uppercase tracking-widest mb-2">Snowflake</p>
            <h2 className="text-3xl md:text-4xl font-black text-[#f5f0eb]">Stored Procedures</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {procedures.map(({ icon, title, href, desc }) => (
              <Link key={title} href={href} className="p-8 rounded-2xl bg-[#1a1612] border border-orange-900/20 flex flex-col hover:border-orange-500/40 hover:-translate-y-1 transition-all duration-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 flex-shrink-0">
                    {icon}
                  </div>
                  <h3 className="text-[#f5f0eb] font-black text-xl">{title}</h3>
                </div>
                <p className="text-[#9a8f85] text-sm leading-relaxed">{desc}</p>
              </Link>
            ))}
          </div>
          <div className="mt-16">
            <div className="mb-12">
              <h3 className="text-3xl md:text-4xl font-black text-[#f5f0eb]">Snippets</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  href: "/utils/snippets/generate-sources",
                  title: "Generate Sources",
                  desc: "Klaar-voor-gebruik dbt run-operation commando's voor het genereren van sources, stagingmodellen en projectconfiguratie.",
                },
                {
                  href: "/utils/snippets/analyze",
                  title: "Analyzer",
                  desc: "Kant-en-klare SQL voor het uitvoeren van create_pit, register_pits en update_statistics in een Snowflake worksheet.",
                },
              ].map(({ href, title, desc }) => (
                <Link key={title} href={href} className="p-8 rounded-2xl bg-[#1a1612] border border-orange-900/20 flex flex-col hover:border-orange-500/40 hover:-translate-y-1 transition-all duration-200">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 flex-shrink-0">
                      <Clipboard size={24} />
                    </div>
                    <h3 className="text-[#f5f0eb] font-black text-xl">{title}</h3>
                  </div>
                  <p className="text-[#9a8f85] text-sm leading-relaxed">{desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Apps */}
      <section className="py-16 px-6 bg-[#0a0806]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-[#f5f0eb]">Apps</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/utils/apps/generate-sources" className="p-8 rounded-2xl bg-[#1a1612] border border-orange-900/20 flex flex-col hover:border-orange-500/40 hover:-translate-y-1 transition-all duration-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 flex-shrink-0">
                  <AppWindow size={28} />
                </div>
                <h3 className="text-[#f5f0eb] font-black text-xl">Generate Sources</h3>
              </div>
              <p className="text-[#9a8f85] text-sm leading-relaxed">
                Lokale Streamlit-app die dbt sources, stagingmodellen en projectconfiguratie genereert vanuit Snowflake — met grafische interface en directe wegschrijf-functie.
              </p>
            </Link>
            <Link href="/utils/apps/analyze" className="p-8 rounded-2xl bg-[#1a1612] border border-orange-900/20 flex flex-col hover:border-orange-500/40 hover:-translate-y-1 transition-all duration-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 flex-shrink-0">
                  <BarChart2 size={28} />
                </div>
                <h3 className="text-[#f5f0eb] font-black text-xl">Analyze</h3>
              </div>
              <p className="text-[#9a8f85] text-sm leading-relaxed">
                Grafische frontend voor de Analyzer stored procedures. Maak point-in-time snapshots, registreer ze en bekijk kolomstatistieken met voorwaardelijke opmaak.
              </p>
            </Link>
            <Link href="/utils/apps/timestamps" className="p-8 rounded-2xl bg-[#1a1612] border border-orange-900/20 flex flex-col hover:border-orange-500/40 hover:-translate-y-1 transition-all duration-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 flex-shrink-0">
                  <Timer size={28} />
                </div>
                <h3 className="text-[#f5f0eb] font-black text-xl">Timestamp Tester</h3>
              </div>
              <p className="text-[#9a8f85] text-sm leading-relaxed">
                Test timestampstrings direct in Snowflake om het juiste formaatpatroon te vinden. Ondersteunt ISO, Europees, Amerikaans, compact en databasespecifieke formaten.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Plugins */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="text-orange-500 text-xs font-semibold uppercase tracking-widest mb-2">Notepad++</p>
            <h2 className="text-3xl md:text-4xl font-black text-[#f5f0eb]">Plugins</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/utils/sql-formatter" className="p-8 rounded-2xl bg-[#1a1612] border border-orange-900/20 flex flex-col hover:border-orange-500/40 hover:-translate-y-1 transition-all duration-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 flex-shrink-0">
                  <FileCode2 size={28} />
                </div>
                <h3 className="text-[#f5f0eb] font-black text-xl">SQL Formatter</h3>
              </div>
              <p className="text-[#9a8f85] text-sm leading-relaxed">
                Formatteer SQL direct vanuit Notepad++ met Ctrl+Alt+F. Werkt op een selectie of het hele document, zodat je SQL altijd netjes en leesbaar blijft.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Setup */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="p-8 md:p-12 rounded-3xl bg-[#1a1612] border border-orange-900/20">
            <h2 className="text-2xl font-black text-[#f5f0eb] mb-4">Aan de slag</h2>
            <p className="text-[#9a8f85] leading-relaxed mb-6">
              Clone de repository, voer <span className="text-orange-400 font-mono text-sm">setup.sql</span> eenmalig uit als accountadmin in Snowflake, en de macros en procedures zijn klaar voor gebruik in jouw dbt project.
            </p>
            <div className="bg-[#0c0a08] rounded-xl p-4 font-mono text-sm text-orange-400 mb-6">
              git clone https://github.com/Steef-Datamodder/datamodder_utils
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://github.com/Steef-Datamodder/datamodder_utils"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-400 transition-all duration-200 glow-orange"
              >
                <ExternalLink size={18} />
                Naar de repository
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-400 transition-all duration-200 glow-orange"
              >
                Vragen? <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
