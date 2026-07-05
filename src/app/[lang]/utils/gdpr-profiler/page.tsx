import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Fingerprint, ExternalLink } from "lucide-react";
import { dict } from "@/lib/i18n";
import type { Lang } from "@/lib/i18n";

type PageProps = { params: Promise<{ lang: string }> };

const params = [
  ["DATABASE_NAME", "—", { nl: "Verplicht. Database die gescand wordt.", en: "Required. Database to be scanned.", de: "Erforderlich. Zu scannende Datenbank." }],
  ["SCHEMA_NAME", "—", { nl: "Verplicht. Schema dat gescand wordt.", en: "Required. Schema to be scanned.", de: "Erforderlich. Zu scannendes Schema." }],
  ["SAMPLE_ROWS", "—", { nl: "Verplicht. Aantal rijen dat per kolom wordt gesampeld.", en: "Required. Number of rows sampled per column.", de: "Erforderlich. Anzahl der pro Spalte entnommenen Stichprobenzeilen." }],
  ["MATCH_THRESHOLD", "0.1", { nl: "Minimale ratio van matchende waarden om een kolom te markeren (0–1).", en: "Minimum ratio of matching values to flag a column (0–1).", de: "Mindest-Verhältnis der übereinstimmenden Werte, um eine Spalte zu markieren (0–1)." }],
  ["UTILS_DATABASE", { nl: "current database", en: "current database", de: "current database" }, { nl: "Database waar PII_REGEX_RULES en PII_SCAN_RESULTS staan.", en: "Database where PII_REGEX_RULES and PII_SCAN_RESULTS are located.", de: "Datenbank, in der PII_REGEX_RULES und PII_SCAN_RESULTS gespeichert sind." }],
  ["UTILS_SCHEMA", { nl: "current schema", en: "current schema", de: "current schema" }, { nl: "Schema waar de utility-tabellen staan.", en: "Schema where the utility tables are located.", de: "Schema, in dem die Utility-Tabellen gespeichert sind." }],
];

const content = {
  nl: {
    meta: { title: "GDPR Profiler — Utils — Datamodder", description: "Snowflake stored procedure die automatisch een schema scant op persoonsgegevens via configureerbare regex-regels." },
    lead: "Scan automatisch een Snowflake-schema op persoonsgegevens via configureerbare regex-regels — zonder handmatig elke tabel door te spitten.",
    goalP1: "Weten welke kolommen persoonsgegevens bevatten is de eerste stap voor AVG-compliance. De GDPR Profiler doet dit werk automatisch: hij koppelt de systeemcatalogus aan een tabel met regex-regels, sampelt kolomwaarden en schrijft zijn bevindingen — inclusief betrouwbaarheidsscore en aanbevolen actie — weg naar een resultatenset.",
    goalP2: "De detectieregels zijn volledig configureerbaar via",
    goalP2b: ". Nieuwe PII-categorieën toevoegen betekent een rij invoegen, geen code aanpassen.",
    tablesLabel: "Vereiste tabellen",
    tables: [
      { name: "PII_REGEX_RULES", desc: "Configuratietabel met detectiepatronen. Voeg rijen toe om nieuwe PII-categorieën te ondersteunen zonder de procedure aan te passen." },
      { name: "PII_SCAN_RESULTS", desc: "Resultatentabel. Elke scanrun schrijft zijn bevindingen hier naar toe, voorzien van scan_id en timestamp." },
    ],
    workflowLabel: "Werkwijze",
    phases: [
      { nr: "1", title: "Kandidaten bepalen", desc: "De procedure cross-joint information_schema.columns met PII_REGEX_RULES en filtert direct op datatype. Zo vallen niet-relevante kolommen al in SQL weg." },
      { nr: "2", title: "Waarden sampelen", desc: "Voor elke kandidaatkolom wordt een steekproef getrokken en de waarden worden gecontroleerd tegen het value_regex-patroon. De matchratio wordt vergeleken met MATCH_THRESHOLD." },
      { nr: "3", title: "Bevindingen opslaan", desc: "Naam- en waarde-confidence worden opgeteld (max. 1.0) en samen met de detectiereden en het aanbevolen actie ingevoerd in PII_SCAN_RESULTS." },
    ],
    paramHeader: "Parameter", defaultHeader: "Standaard", descHeader: "Beschrijving",
    step1: "1. Basis scan",
    step1Body: "Scan een heel schema met 1.000 steekproefrijen per kolom:",
    step2: "2. Gevoeligheid aanpassen",
    step2Body: "Verlaag de drempel om ook zwakkere signalen te detecteren (bijv. 5% van de waarden matcht):",
    step3: "3. Aparte utility-locatie",
    step3Body: "Staan je utility-tabellen in een andere database of schema? Geef die expliciet mee:",
    step4: "4. Resultaten bekijken",
    lang: 'nl',
  },
  en: {
    meta: { title: "GDPR Profiler — Utils — Datamodder", description: "Snowflake stored procedure that automatically scans a schema for personal data via configurable regex rules." },
    lead: "Automatically scan a Snowflake schema for personal data via configurable regex rules — without manually sifting through every table.",
    goalP1: "Knowing which columns contain personal data is the first step for GDPR compliance. The GDPR Profiler does this work automatically: it joins the system catalogue to a table of regex rules, samples column values and writes its findings — including a confidence score and recommended action — to a result set.",
    goalP2: "The detection rules are fully configurable via",
    goalP2b: ". Adding new PII categories means inserting a row, not changing code.",
    tablesLabel: "Required tables",
    tables: [
      { name: "PII_REGEX_RULES", desc: "Configuration table with detection patterns. Add rows to support new PII categories without modifying the procedure." },
      { name: "PII_SCAN_RESULTS", desc: "Results table. Each scan run writes its findings here, tagged with scan_id and timestamp." },
    ],
    workflowLabel: "How it works",
    phases: [
      { nr: "1", title: "Identify candidates", desc: "The procedure cross-joins information_schema.columns with PII_REGEX_RULES and filters directly on data type. This way irrelevant columns are already filtered out in SQL." },
      { nr: "2", title: "Sample values", desc: "For each candidate column a sample is taken and values are checked against the value_regex pattern. The match ratio is compared with MATCH_THRESHOLD." },
      { nr: "3", title: "Store findings", desc: "Name and value confidence are added together (max. 1.0) and stored in PII_SCAN_RESULTS together with the detection reason and recommended action." },
    ],
    paramHeader: "Parameter", defaultHeader: "Default", descHeader: "Description",
    step1: "1. Basic scan",
    step1Body: "Scan an entire schema with 1,000 sample rows per column:",
    step2: "2. Adjust sensitivity",
    step2Body: "Lower the threshold to also detect weaker signals (e.g. 5% of values match):",
    step3: "3. Separate utility location",
    step3Body: "Are your utility tables in a different database or schema? Pass them explicitly:",
    step4: "4. View results",
    lang: 'en',
  },
  de: {
    meta: { title: "GDPR Profiler — Utils — Datamodder", description: "Snowflake Stored Procedure, die ein Schema automatisch auf personenbezogene Daten über konfigurierbare Regex-Regeln scannt." },
    lead: "Scannen Sie ein Snowflake-Schema automatisch auf personenbezogene Daten über konfigurierbare Regex-Regeln — ohne jede Tabelle manuell zu durchsuchen.",
    goalP1: "Zu wissen, welche Spalten personenbezogene Daten enthalten, ist der erste Schritt zur DSGVO-Compliance. Der GDPR Profiler erledigt diese Arbeit automatisch: Er verbindet den Systemkatalog mit einer Tabelle von Regex-Regeln, entnimmt Stichproben von Spaltenwerten und schreibt seine Ergebnisse — einschließlich Konfidenz-Score und empfohlener Maßnahme — in einen Ergebnissatz.",
    goalP2: "Die Erkennungsregeln sind vollständig konfigurierbar über",
    goalP2b: ". Das Hinzufügen neuer PII-Kategorien bedeutet das Einfügen einer Zeile, keine Codeänderung.",
    tablesLabel: "Erforderliche Tabellen",
    tables: [
      { name: "PII_REGEX_RULES", desc: "Konfigurationstabelle mit Erkennungsmustern. Fügen Sie Zeilen hinzu, um neue PII-Kategorien zu unterstützen, ohne die Prozedur zu ändern." },
      { name: "PII_SCAN_RESULTS", desc: "Ergebnistabelle. Jeder Scan-Lauf schreibt seine Ergebnisse hier mit scan_id und Zeitstempel." },
    ],
    workflowLabel: "Funktionsweise",
    phases: [
      { nr: "1", title: "Kandidaten ermitteln", desc: "Die Prozedur verbindet information_schema.columns mit PII_REGEX_RULES und filtert direkt nach Datentyp. Nicht relevante Spalten werden bereits in SQL herausgefiltert." },
      { nr: "2", title: "Werte sampeln", desc: "Für jede Kandidatenspalte wird eine Stichprobe entnommen und die Werte werden gegen das value_regex-Muster geprüft. Das Übereinstimmungsverhältnis wird mit MATCH_THRESHOLD verglichen." },
      { nr: "3", title: "Ergebnisse speichern", desc: "Name- und Wert-Konfidenz werden addiert (max. 1.0) und zusammen mit dem Erkennungsgrund und der empfohlenen Maßnahme in PII_SCAN_RESULTS gespeichert." },
    ],
    paramHeader: "Parameter", defaultHeader: "Standard", descHeader: "Beschreibung",
    step1: "1. Basis-Scan",
    step1Body: "Scannen Sie ein ganzes Schema mit 1.000 Stichprobenzeilen pro Spalte:",
    step2: "2. Empfindlichkeit anpassen",
    step2Body: "Senken Sie den Schwellenwert, um auch schwächere Signale zu erkennen (z. B. 5 % der Werte stimmen überein):",
    step3: "3. Separate Utility-Lokation",
    step3Body: "Befinden sich Ihre Utility-Tabellen in einer anderen Datenbank oder einem anderen Schema? Übergeben Sie diese explizit:",
    step4: "4. Ergebnisse anzeigen",
    lang: 'de',
  },
};

export async function generateMetadata({ params: p }: PageProps): Promise<Metadata> {
  const { lang } = await p;
  return content[(lang as Lang)]?.meta ?? content.nl.meta;
}

export default async function GdprProfilerPage({ params: p }: PageProps) {
  const { lang } = await p;
  const t = content[(lang as Lang)] ?? content.nl;
  const u = dict[(lang as Lang)]?.utils ?? dict.nl.utils;
  const l = (lang as 'nl' | 'en' | 'de') in { nl: 1, en: 1, de: 1 } ? lang as 'nl' | 'en' | 'de' : 'nl';

  return (
    <div className="pt-28 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href={`/${lang}/utils`} className="inline-flex items-center gap-2 text-[#9a8f85] text-sm hover:text-orange-400 transition-colors mb-10">
          <ArrowLeft size={14} /> {u.back}
        </Link>

        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 flex-shrink-0">
            <Fingerprint size={24} />
          </div>
          <div>
            <p className="text-orange-500/70 text-xs font-semibold uppercase tracking-widest mb-0.5">Snowflake stored procedure</p>
            <h1 className="text-3xl font-black text-[#f5f0eb]">GDPR Profiler</h1>
          </div>
        </div>
        <p className="text-[#9a8f85] text-lg leading-relaxed mb-12">{t.lead}</p>

        <section className="mb-12">
          <h2 className="text-xl font-black text-[#f5f0eb] mb-4">{u.goal}</h2>
          <p className="text-[#9a8f85] leading-relaxed mb-4">{t.goalP1}</p>
          <p className="text-[#9a8f85] leading-relaxed">
            {t.goalP2} <span className="text-orange-400 font-mono text-sm">PII_REGEX_RULES</span>{t.goalP2b}
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-black text-[#f5f0eb] mb-4">{t.tablesLabel}</h2>
          <div className="space-y-3">
            {t.tables.map(({ name, desc }) => (
              <div key={name} className="p-5 rounded-xl bg-[#1a1612] border border-orange-900/20">
                <p className="font-mono text-orange-300/80 text-sm mb-1">{name}</p>
                <p className="text-[#9a8f85] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-black text-[#f5f0eb] mb-4">{t.workflowLabel}</h2>
          <div className="space-y-3">
            {t.phases.map(({ nr, title, desc }) => (
              <div key={nr} className="p-5 rounded-xl bg-[#1a1612] border border-orange-900/20 flex gap-4">
                <div className="w-7 h-7 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-400 text-xs font-black flex-shrink-0 mt-0.5">{nr}</div>
                <div>
                  <p className="text-[#f5f0eb] font-semibold text-sm mb-1">{title}</p>
                  <p className="text-[#9a8f85] text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-black text-[#f5f0eb] mb-4">{t.paramHeader === 'Parameter' ? (lang === 'de' ? 'Parameter' : 'Parameters') : t.paramHeader}</h2>
          <div className="rounded-xl bg-[#1a1612] border border-orange-900/20 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-orange-900/20">
                  <th className="text-left px-5 py-3 text-orange-400 font-semibold font-mono text-xs">{t.paramHeader}</th>
                  <th className="text-left px-5 py-3 text-orange-400 font-semibold text-xs uppercase tracking-widest">{t.defaultHeader}</th>
                  <th className="text-left px-5 py-3 text-orange-400 font-semibold text-xs uppercase tracking-widest">{t.descHeader}</th>
                </tr>
              </thead>
              <tbody className="text-[#9a8f85]">
                {params.map(([param, def, descs]) => (
                  <tr key={param as string} className="border-b border-orange-900/10 last:border-0">
                    <td className="px-5 py-3 font-mono text-orange-300/70 text-xs">{param as string}</td>
                    <td className="px-5 py-3 font-mono text-xs">{typeof def === 'object' ? (def as Record<string, string>)[l] : def as string}</td>
                    <td className="px-5 py-3 text-xs">{(descs as Record<string, string>)[l]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-black text-[#f5f0eb] mb-4">{u.usage}</h2>

          <h3 className="text-[#f5f0eb] font-semibold mb-2 text-sm">{t.step1}</h3>
          <p className="text-[#9a8f85] text-sm mb-3">{t.step1Body}</p>
          <div className="rounded-xl bg-[#0c0a08] border border-orange-900/20 p-5 font-mono text-sm text-orange-300/80 mb-6 overflow-x-auto">
            <pre>{`CALL DATAMODDER_UTILS.PROFILE_PII(
    'MY_DATABASE',
    'MY_SCHEMA',
    1000
);`}</pre>
          </div>

          <h3 className="text-[#f5f0eb] font-semibold mb-2 text-sm">{t.step2}</h3>
          <p className="text-[#9a8f85] text-sm mb-3">{t.step2Body}</p>
          <div className="rounded-xl bg-[#0c0a08] border border-orange-900/20 p-5 font-mono text-sm text-orange-300/80 mb-6 overflow-x-auto">
            <pre>{`CALL DATAMODDER_UTILS.PROFILE_PII(
    'MY_DATABASE',
    'MY_SCHEMA',
    5000,
    0.05
);`}</pre>
          </div>

          <h3 className="text-[#f5f0eb] font-semibold mb-2 text-sm">{t.step3}</h3>
          <p className="text-[#9a8f85] text-sm mb-3">{t.step3Body}</p>
          <div className="rounded-xl bg-[#0c0a08] border border-orange-900/20 p-5 font-mono text-sm text-orange-300/80 mb-6 overflow-x-auto">
            <pre>{`CALL DATAMODDER_UTILS.PROFILE_PII(
    'MY_DATABASE',
    'MY_SCHEMA',
    1000,
    0.1,
    'UTILS_DB',
    'UTILS_SCHEMA'
);`}</pre>
          </div>

          <h3 className="text-[#f5f0eb] font-semibold mb-2 text-sm">{t.step4}</h3>
          <div className="rounded-xl bg-[#0c0a08] border border-orange-900/20 p-5 font-mono text-sm text-orange-300/80 overflow-x-auto">
            <pre>{`SELECT *
  FROM DATAMODDER_UTILS.PII_SCAN_RESULTS
 ORDER BY scanned_at DESC, confidence DESC;`}</pre>
          </div>
        </section>

        <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-orange-900/20">
          <a href="https://github.com/Steef-Datamodder/datamodder_utils/tree/main/Stored%20Procedure/profile" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-400 transition-all duration-200 glow-orange text-sm">
            <ExternalLink size={16} /> {u.github}
          </a>
          <Link href={`/${lang}/utils`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-orange-500/40 text-[#f5f0eb] font-medium hover:border-orange-500 hover:bg-orange-500/10 transition-all duration-200 text-sm">
            <ArrowLeft size={16} /> {u.allUtils}
          </Link>
        </div>
      </div>
    </div>
  );
}
