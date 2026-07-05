import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink, Clock, EyeOff, ScrollText, ShieldCheck, Search, FileCode2, Wand2, Clipboard, CalendarDays, ArrowLeftRight, Fingerprint, AppWindow, BarChart2, Timer, Eye } from "lucide-react";
import MudSparkles from "@/components/MudSparkles";
import type { Lang } from "@/lib/i18n";

type PageProps = { params: Promise<{ lang: string }> };

const content = {
  nl: {
    meta: { title: "Utils — Datamodder", description: "Open source dbt en Snowflake utilities van Datamodder. Gratis te gebruiken via GitHub." },
    h1a: "Open source", h1b: "utils",
    headerBody: "Wij geloven in het delen van kennis. Onze dbt en Snowflake utilities zijn gratis beschikbaar via GitHub, voor iedereen die er iets aan heeft.",
    github: "Bekijk op GitHub",
    macrosLabel: "dbt", macrosH2: "Macros",
    procsLabel: "Snowflake", procsH2: "Stored Procedures",
    viewsH2: "Views",
    viewsIntro: "Een verzameling SQL views voor Snowflake platformbeheerders. De views lezen uit SNOWFLAKE.ACCOUNT_USAGE en geven inzicht in kosten, querygedrag en beveiligingsgebeurtenissen.",
    snippetsH2: "Snippets",
    appsH2: "Apps",
    pluginsLabel: "Notepad++", pluginsH2: "Plugins",
    getStarted: "Aan de slag",
    getStartedBody: "Clone de repository, voer setup.sql eenmalig uit als accountadmin in Snowflake, en de macros en procedures zijn klaar voor gebruik in jouw dbt project.",
    toRepo: "Naar de repository",
    questions: "Vragen?",
    macros: [
      { title: "Logging", subtitle: "dbt run monitoring", desc: "Houd bij wanneer een dbt run start en wanneer hij klaar is. Automatisch gelogd in Snowflake, zodat je altijd kunt terugkijken wat er wanneer is uitgevoerd. Onmisbaar voor productie-omgevingen." },
      { title: "Masking", subtitle: "AVG/GDPR data masking", desc: "Pas dynamische data masking toe op gevoelige kolommen via dbt tags. Eén macro, en je persoonsgegevens zijn automatisch afgeschermd voor rollen die er geen toegang toe mogen hebben." },
      { title: "Timestamps", subtitle: "Datum & tijd utilities", desc: "Een complete set macros voor het omzetten en opschonen van datum- en tijdwaarden in Snowflake. Van ruwe timestamp-strings naar schone, consistente datums, inclusief fixes voor maanden en weekdagen." },
      { title: "Generate Sources", subtitle: "code generator", desc: "Genereer automatisch sources.yml, stagingmodellen en dbt_project.yml configuratie vanuit je Snowflake database. Geen handmatige boilerplate meer bij het onboarden van nieuwe databronnen." },
      { title: "Generate Date Dimension", subtitle: "code generator", desc: "Genereer een complete datumdimensie voor Snowflake met kalender- en fiscale periodes, weeknummers en Nederlandse feestdagen, inclusief beweeglijke feestdagen zoals Pasen." },
      { title: "Uniform Datatypes", subtitle: "datatype standaardisatie", desc: "Cast alle kolommen van een brontabel automatisch naar uniforme Snowflake datatypes. Ongeldige waarden worden via TRY_TO_*-functies omgezet naar NULL in plaats van een fout te geven." },
    ],
    procs: [
      { title: "Anonymizer", desc: "Anonimiseer data direct in Snowflake via een stored procedure. Ideaal voor het maken van veilige ontwikkel- en testomgevingen zonder dat persoonsgegevens buiten productie komen." },
      { title: "Analyzer", desc: "Analyseer de structuur en inhoud van je Snowflake tabellen met één procedure-aanroep. Handig als startpunt bij het onboarden van nieuwe databronnen of het opsporen van datakwaliteitsproblemen." },
      { title: "GDPR Profiler", desc: "Scan automatisch een Snowflake-schema op persoonsgegevens via configureerbare regex-regels. Combineert kolomnaam- en waardedetectie met een betrouwbaarheidsscore en aanbevolen actie." },
    ],
    snippets: [
      { title: "Generate Sources", desc: "Klaar-voor-gebruik dbt run-operation commando's voor het genereren van sources, stagingmodellen en projectconfiguratie." },
      { title: "Analyzer", desc: "Kant-en-klare SQL voor het uitvoeren van create_pit, register_pits en update_statistics in een Snowflake worksheet." },
    ],
    views: [
      { title: "warehouse_cost", desc: "Dagelijks creditverbruik per warehouse, uitgesplitst in compute en cloud services." },
      { title: "search_optimization_cost", desc: "Dagelijkse kosten voor zoekoptimalisatie per tabel, inclusief wie het heeft ingeschakeld." },
      { title: "clustering_cost", desc: "Dagelijkse automatische clusteringkosten per tabel, inclusief wie clustering heeft ingeschakeld." },
      { title: "expensive_queries", desc: "Queries met een uitvoertijd van 60 seconden of langer, inclusief mislukte queries." },
      { title: "spilling_queries", desc: "Queries die data naar een externe schijf hebben gespoeld — een teken dat het warehouse te klein is." },
      { title: "system_role_usage", desc: "Alle statements uitgevoerd onder ACCOUNTADMIN, SYSADMIN of SECURITYADMIN." },
      { title: "privilege_changes", desc: "Alle GRANT en REVOKE statements, ongeacht de gebruikte rol, inclusief mislukte pogingen." },
      { title: "login_history", desc: "Mislukte inlogpogingen per gebruiker, inclusief IP-adres en foutmelding." },
    ],
    apps: [
      { title: "Generate Sources", desc: "Lokale Streamlit-app die dbt sources, stagingmodellen en projectconfiguratie genereert vanuit Snowflake — met grafische interface en directe wegschrijf-functie." },
      { title: "Analyze", desc: "Grafische frontend voor de Analyzer stored procedures. Maak point-in-time snapshots, registreer ze en bekijk kolomstatistieken met voorwaardelijke opmaak." },
      { title: "Timestamp Tester", desc: "Test timestampstrings direct in Snowflake om het juiste formaatpatroon te vinden. Ondersteunt ISO, Europees, Amerikaans, compact en databasespecifieke formaten." },
    ],
    plugin: { title: "SQL Formatter", desc: "Formatteer SQL direct vanuit Notepad++ met Ctrl+Alt+F. Werkt op een selectie of het hele document, zodat je SQL altijd netjes en leesbaar blijft." },
  },
  en: {
    meta: { title: "Utils — Datamodder", description: "Open source dbt and Snowflake utilities by Datamodder. Free to use via GitHub." },
    h1a: "Open source", h1b: "utils",
    headerBody: "We believe in sharing knowledge. Our dbt and Snowflake utilities are freely available on GitHub, for anyone who finds them useful.",
    github: "View on GitHub",
    macrosLabel: "dbt", macrosH2: "Macros",
    procsLabel: "Snowflake", procsH2: "Stored Procedures",
    viewsH2: "Views",
    viewsIntro: "A collection of SQL views for Snowflake platform administrators. The views read from SNOWFLAKE.ACCOUNT_USAGE and provide insight into costs, query behaviour and security events.",
    snippetsH2: "Snippets",
    appsH2: "Apps",
    pluginsLabel: "Notepad++", pluginsH2: "Plugins",
    getStarted: "Getting started",
    getStartedBody: "Clone the repository, run setup.sql once as accountadmin in Snowflake, and the macros and procedures are ready for use in your dbt project.",
    toRepo: "View repository",
    questions: "Questions?",
    macros: [
      { title: "Logging", subtitle: "dbt run monitoring", desc: "Track when a dbt run starts and finishes. Automatically logged in Snowflake so you can always look back at what ran and when. Essential for production environments." },
      { title: "Masking", subtitle: "GDPR data masking", desc: "Apply dynamic data masking to sensitive columns via dbt tags. One macro, and your personal data is automatically shielded from roles that shouldn't have access." },
      { title: "Timestamps", subtitle: "Date & time utilities", desc: "A complete set of macros for converting and cleaning date and time values in Snowflake. From raw timestamp strings to clean, consistent dates — including fixes for months and weekdays." },
      { title: "Generate Sources", subtitle: "code generator", desc: "Automatically generate sources.yml, staging models and dbt_project.yml configuration from your Snowflake database. No more manual boilerplate when onboarding new data sources." },
      { title: "Generate Date Dimension", subtitle: "code generator", desc: "Generate a complete date dimension for Snowflake with calendar and fiscal periods, week numbers and Dutch public holidays, including moveable holidays like Easter." },
      { title: "Uniform Datatypes", subtitle: "datatype standardisation", desc: "Automatically cast all columns of a source table to uniform Snowflake data types. Invalid values are converted to NULL via TRY_TO_* functions instead of throwing an error." },
    ],
    procs: [
      { title: "Anonymizer", desc: "Anonymise data directly in Snowflake via a stored procedure. Ideal for creating safe development and test environments without personal data leaving production." },
      { title: "Analyzer", desc: "Analyse the structure and content of your Snowflake tables with a single procedure call. Useful as a starting point when onboarding new data sources or tracking down data quality issues." },
      { title: "GDPR Profiler", desc: "Automatically scan a Snowflake schema for personal data via configurable regex rules. Combines column name and value detection with a confidence score and recommended action." },
    ],
    snippets: [
      { title: "Generate Sources", desc: "Ready-to-use dbt run-operation commands for generating sources, staging models and project configuration." },
      { title: "Analyzer", desc: "Ready-made SQL for running create_pit, register_pits and update_statistics in a Snowflake worksheet." },
    ],
    views: [
      { title: "warehouse_cost", desc: "Daily credit consumption per warehouse, split into compute and cloud services." },
      { title: "search_optimization_cost", desc: "Daily search optimization credit consumption per table, with the role and user that enabled it." },
      { title: "clustering_cost", desc: "Daily automatic clustering credit consumption per table, with the role and user that enabled it." },
      { title: "expensive_queries", desc: "Queries with an execution time of 60 seconds or longer, including failed queries." },
      { title: "spilling_queries", desc: "Queries that spilled data to remote disk — a sign that the warehouse is undersized for the query." },
      { title: "system_role_usage", desc: "All statements executed under ACCOUNTADMIN, SYSADMIN or SECURITYADMIN." },
      { title: "privilege_changes", desc: "All GRANT and REVOKE statements, regardless of the role used, including failed attempts." },
      { title: "login_history", desc: "Failed login attempts per user, including IP address and error message." },
    ],
    apps: [
      { title: "Generate Sources", desc: "Local Streamlit app that generates dbt sources, staging models and project configuration from Snowflake — with graphical interface and direct write-to-file feature." },
      { title: "Analyze", desc: "Graphical frontend for the Analyzer stored procedures. Create point-in-time snapshots, register them and view column statistics with conditional formatting." },
      { title: "Timestamp Tester", desc: "Test timestamp strings directly in Snowflake to find the right format pattern. Supports ISO, European, US, compact and database-specific formats." },
    ],
    plugin: { title: "SQL Formatter", desc: "Format SQL directly from Notepad++ with Ctrl+Alt+F. Works on a selection or the entire document, keeping your SQL neat and readable at all times." },
  },
  de: {
    meta: { title: "Utils — Datamodder", description: "Open-Source dbt- und Snowflake-Utilities von Datamodder. Kostenlos über GitHub nutzbar." },
    h1a: "Open-Source", h1b: "Utils",
    headerBody: "Wir glauben an die Weitergabe von Wissen. Unsere dbt- und Snowflake-Utilities sind kostenlos auf GitHub verfügbar, für jeden, dem sie nützlich sind.",
    github: "Auf GitHub ansehen",
    macrosLabel: "dbt", macrosH2: "Makros",
    procsLabel: "Snowflake", procsH2: "Stored Procedures",
    viewsH2: "Views",
    viewsIntro: "Eine Sammlung von SQL-Views für Snowflake-Plattformadministratoren. Die Views lesen aus SNOWFLAKE.ACCOUNT_USAGE und geben Einblicke in Kosten, Abfrageverhalten und Sicherheitsereignisse.",
    snippetsH2: "Snippets",
    appsH2: "Apps",
    pluginsLabel: "Notepad++", pluginsH2: "Plugins",
    getStarted: "Erste Schritte",
    getStartedBody: "Klonen Sie das Repository, führen Sie setup.sql einmalig als accountadmin in Snowflake aus, und die Makros und Prozeduren sind bereit für den Einsatz in Ihrem dbt-Projekt.",
    toRepo: "Repository ansehen",
    questions: "Fragen?",
    macros: [
      { title: "Logging", subtitle: "dbt-Run-Monitoring", desc: "Verfolgen Sie, wann ein dbt-Run startet und endet. Automatisch in Snowflake protokolliert, sodass Sie jederzeit nachsehen können, was wann ausgeführt wurde. Unverzichtbar für Produktionsumgebungen." },
      { title: "Masking", subtitle: "DSGVO-Datenmaskierung", desc: "Wenden Sie dynamische Datenmaskierung auf sensible Spalten über dbt-Tags an. Ein Makro, und Ihre persönlichen Daten sind automatisch vor Rollen geschützt, die keinen Zugang haben sollten." },
      { title: "Timestamps", subtitle: "Datum & Uhrzeit Utilities", desc: "Ein vollständiger Satz von Makros zum Konvertieren und Bereinigen von Datums- und Zeitwerten in Snowflake. Von rohen Timestamp-Strings zu sauberen, konsistenten Datumswerten." },
      { title: "Generate Sources", subtitle: "Code-Generator", desc: "Generieren Sie automatisch sources.yml, Staging-Modelle und dbt_project.yml-Konfiguration aus Ihrer Snowflake-Datenbank. Kein manuelles Boilerplate mehr beim Onboarding neuer Datenquellen." },
      { title: "Generate Date Dimension", subtitle: "Code-Generator", desc: "Generieren Sie eine vollständige Datumsdimension für Snowflake mit Kalender- und Fiskalperioden, Kalenderwochen und niederländischen Feiertagen, einschließlich beweglicher Feiertage wie Ostern." },
      { title: "Uniform Datatypes", subtitle: "Datentypstandardisierung", desc: "Wandeln Sie alle Spalten einer Quelltabelle automatisch in einheitliche Snowflake-Datentypen um. Ungültige Werte werden über TRY_TO_*-Funktionen in NULL umgewandelt statt einen Fehler zu erzeugen." },
    ],
    procs: [
      { title: "Anonymizer", desc: "Anonymisieren Sie Daten direkt in Snowflake über eine Stored Procedure. Ideal für die Erstellung sicherer Entwicklungs- und Testumgebungen ohne personenbezogene Daten außerhalb der Produktion." },
      { title: "Analyzer", desc: "Analysieren Sie die Struktur und den Inhalt Ihrer Snowflake-Tabellen mit einem einzigen Prozeduraufruf. Nützlich als Ausgangspunkt beim Onboarding neuer Datenquellen oder bei Datenqualitätsproblemen." },
      { title: "GDPR Profiler", desc: "Scannen Sie ein Snowflake-Schema automatisch auf personenbezogene Daten über konfigurierbare Regex-Regeln. Kombiniert Spaltenname- und Werterkennung mit einem Konfidenz-Score und empfohlenem Vorgehen." },
    ],
    snippets: [
      { title: "Generate Sources", desc: "Sofort einsatzbereite dbt run-operation Befehle zum Generieren von Sources, Staging-Modellen und Projektkonfiguration." },
      { title: "Analyzer", desc: "Fertige SQL für die Ausführung von create_pit, register_pits und update_statistics in einem Snowflake-Worksheet." },
    ],
    views: [
      { title: "warehouse_cost", desc: "Täglicher Credit-Verbrauch pro Warehouse, aufgeteilt in Compute- und Cloud-Service-Kosten." },
      { title: "search_optimization_cost", desc: "Täglicher Suchoptimierungs-Credit-Verbrauch pro Tabelle, mit der Rolle und dem Benutzer, der ihn aktiviert hat." },
      { title: "clustering_cost", desc: "Täglicher Clustering-Credit-Verbrauch pro Tabelle, mit der Rolle und dem Benutzer, der Clustering aktiviert hat." },
      { title: "expensive_queries", desc: "Abfragen mit einer Ausführungszeit von 60 Sekunden oder länger, einschließlich fehlgeschlagener Abfragen." },
      { title: "spilling_queries", desc: "Abfragen, die Daten ausgelagert haben — ein Zeichen, dass das Warehouse zu klein ist." },
      { title: "system_role_usage", desc: "Alle Statements, die unter ACCOUNTADMIN, SYSADMIN oder SECURITYADMIN ausgeführt wurden." },
      { title: "privilege_changes", desc: "Alle GRANT- und REVOKE-Statements, unabhängig von der verwendeten Rolle, einschließlich fehlgeschlagener Versuche." },
      { title: "login_history", desc: "Fehlgeschlagene Anmeldeversuche pro Benutzer, einschließlich IP-Adresse und Fehlermeldung." },
    ],
    apps: [
      { title: "Generate Sources", desc: "Lokale Streamlit-App, die dbt-Sources, Staging-Modelle und Projektkonfiguration aus Snowflake generiert — mit grafischer Oberfläche und direkter Schreibfunktion." },
      { title: "Analyze", desc: "Grafisches Frontend für die Analyzer Stored Procedures. Erstellen Sie Point-in-Time-Snapshots, registrieren Sie diese und sehen Sie Spaltenstatistiken mit bedingter Formatierung." },
      { title: "Timestamp Tester", desc: "Testen Sie Timestamp-Strings direkt in Snowflake, um das richtige Formatmuster zu finden. Unterstützt ISO, europäische, US-, kompakte und datenbankspezifische Formate." },
    ],
    plugin: { title: "SQL Formatter", desc: "Formatieren Sie SQL direkt aus Notepad++ mit Strg+Alt+F. Funktioniert auf einer Auswahl oder dem gesamten Dokument und hält Ihr SQL jederzeit ordentlich und lesbar." },
  },
};

const macroHrefs = ["logging", "masking", "timestamps", "generate-sources", "generate-date-dimension", "uniform-datatypes"];
const macroIcons = [<ScrollText key="l" size={28} />, <EyeOff key="m" size={28} />, <Clock key="t" size={28} />, <Wand2 key="gs" size={28} />, <CalendarDays key="gd" size={28} />, <ArrowLeftRight key="ud" size={28} />];
const procHrefs = ["anonymizer", "analyzer", "gdpr-profiler"];
const procIcons = [<ShieldCheck key="an" size={28} />, <Search key="az" size={28} />, <Fingerprint key="gp" size={28} />];
const viewHrefs = ["warehouse-cost", "search-optimization-cost", "clustering-cost", "expensive-queries", "spilling-queries", "system-role-usage", "privilege-changes", "login-history"];
const snippetHrefs = ["generate-sources", "analyze"];
const appHrefs = ["generate-sources", "analyze", "timestamps"];
const appIcons = [<AppWindow key="gs" size={28} />, <BarChart2 key="az" size={28} />, <Timer key="ts" size={28} />];

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  return content[(lang as Lang)]?.meta ?? content.nl.meta;
}

export default async function UtilsPage({ params }: PageProps) {
  const { lang } = await params;
  const t = content[(lang as Lang)] ?? content.nl;
  const base = `/${lang}/utils`;

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
          <p className="text-[#9a8f85] text-lg max-w-2xl mx-auto leading-relaxed mb-8">{t.headerBody}</p>
          <a href="https://github.com/Steef-Datamodder/datamodder_utils" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-orange-500/40 text-[#f5f0eb] font-medium hover:border-orange-500 hover:bg-orange-500/10 transition-all duration-200">
            <ExternalLink size={18} /> {t.github}
          </a>
        </div>
      </section>

      {/* Macros */}
      <section className="pb-16 pt-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="text-orange-500 text-xs font-semibold uppercase tracking-widest mb-2">{t.macrosLabel}</p>
            <h2 className="text-3xl md:text-4xl font-black text-[#f5f0eb]">{t.macrosH2}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.macros.map(({ title, subtitle, desc }, i) => (
              <Link key={title} href={`${base}/${macroHrefs[i]}`}
                className="p-8 rounded-2xl bg-[#1a1612] border border-orange-900/20 flex flex-col hover:border-orange-500/40 hover:-translate-y-1 transition-all duration-200">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 mb-5">
                  {macroIcons[i]}
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
            <p className="text-orange-500 text-xs font-semibold uppercase tracking-widest mb-2">{t.procsLabel}</p>
            <h2 className="text-3xl md:text-4xl font-black text-[#f5f0eb]">{t.procsH2}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.procs.map(({ title, desc }, i) => (
              <Link key={title} href={`${base}/${procHrefs[i]}`}
                className="p-8 rounded-2xl bg-[#1a1612] border border-orange-900/20 flex flex-col hover:border-orange-500/40 hover:-translate-y-1 transition-all duration-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 flex-shrink-0">
                    {procIcons[i]}
                  </div>
                  <h3 className="text-[#f5f0eb] font-black text-xl">{title}</h3>
                </div>
                <p className="text-[#9a8f85] text-sm leading-relaxed">{desc}</p>
              </Link>
            ))}
          </div>

          {/* Snippets */}
          <div className="mt-16">
            <div className="mb-12">
              <h3 className="text-3xl md:text-4xl font-black text-[#f5f0eb]">{t.snippetsH2}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {t.snippets.map(({ title, desc }, i) => (
                <Link key={title} href={`${base}/snippets/${snippetHrefs[i]}`}
                  className="p-8 rounded-2xl bg-[#1a1612] border border-orange-900/20 flex flex-col hover:border-orange-500/40 hover:-translate-y-1 transition-all duration-200">
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

          {/* Apps */}
          <div className="mt-16">
            <div className="mb-12">
              <h3 className="text-3xl md:text-4xl font-black text-[#f5f0eb]">{t.appsH2}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {t.apps.map(({ title, desc }, i) => (
                <Link key={title} href={`${base}/apps/${appHrefs[i]}`}
                  className="p-8 rounded-2xl bg-[#1a1612] border border-orange-900/20 flex flex-col hover:border-orange-500/40 hover:-translate-y-1 transition-all duration-200">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 flex-shrink-0">
                      {appIcons[i]}
                    </div>
                    <h3 className="text-[#f5f0eb] font-black text-xl">{title}</h3>
                  </div>
                  <p className="text-[#9a8f85] text-sm leading-relaxed">{desc}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Views */}
          <div className="mt-16">
            <div className="mb-12">
              <h3 className="text-3xl md:text-4xl font-black text-[#f5f0eb]">{t.viewsH2}</h3>
            </div>
            <div className="p-8 rounded-2xl bg-[#1a1612] border border-orange-900/20 max-w-2xl">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 flex-shrink-0">
                  <Eye size={28} />
                </div>
                <h3 className="text-[#f5f0eb] font-black text-xl">Admin Views</h3>
              </div>
              <p className="text-[#9a8f85] text-sm leading-relaxed mb-6">{t.viewsIntro}</p>
              <ul className="space-y-1">
                {t.views.map(({ title }, i) => (
                  <li key={title}>
                    <Link href={`${base}/views/${viewHrefs[i]}`}
                      className="flex items-center justify-between px-4 py-2.5 rounded-lg hover:bg-orange-500/5 hover:text-orange-400 text-[#9a8f85] transition-colors group">
                      <span className="font-mono text-sm">{title}</span>
                      <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Plugins */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="text-orange-500 text-xs font-semibold uppercase tracking-widest mb-2">{t.pluginsLabel}</p>
            <h2 className="text-3xl md:text-4xl font-black text-[#f5f0eb]">{t.pluginsH2}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href={`${base}/sql-formatter`}
              className="p-8 rounded-2xl bg-[#1a1612] border border-orange-900/20 flex flex-col hover:border-orange-500/40 hover:-translate-y-1 transition-all duration-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 flex-shrink-0">
                  <FileCode2 size={28} />
                </div>
                <h3 className="text-[#f5f0eb] font-black text-xl">{t.plugin.title}</h3>
              </div>
              <p className="text-[#9a8f85] text-sm leading-relaxed">{t.plugin.desc}</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Setup */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="p-8 md:p-12 rounded-3xl bg-[#1a1612] border border-orange-900/20">
            <h2 className="text-2xl font-black text-[#f5f0eb] mb-4">{t.getStarted}</h2>
            <p className="text-[#9a8f85] leading-relaxed mb-6">{t.getStartedBody}</p>
            <div className="bg-[#0c0a08] rounded-xl p-4 font-mono text-sm text-orange-400 mb-6">
              git clone https://github.com/Steef-Datamodder/datamodder_utils
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="https://github.com/Steef-Datamodder/datamodder_utils" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-400 transition-all duration-200 glow-orange">
                <ExternalLink size={18} /> {t.toRepo}
              </a>
              <Link href={`/${lang}/contact`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-400 transition-all duration-200 glow-orange">
                {t.questions} <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
