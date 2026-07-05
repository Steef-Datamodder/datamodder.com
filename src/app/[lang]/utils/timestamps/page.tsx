import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock, ExternalLink } from "lucide-react";
import { dict } from "@/lib/i18n";
import type { Lang } from "@/lib/i18n";

type PageProps = { params: Promise<{ lang: string }> };

const content = {
  nl: {
    meta: { title: "Timestamps — Utils — Datamodder", description: "dbt timestamp macro set voor Snowflake. Parseer datumstrings uit tientallen formaten en talen." },
    lead: "Parseer datumstrings uit vrijwel elk formaat en elke taal naar een consistente Snowflake timestamp.",
    goalP1: "Brondata bevat datums in alle mogelijke gedaanten: ISO 8601, Europese notatie, Amerikaans formaat, met of zonder tijdzone, met maandnamen in het Duits, Frans of Spaans. De Timestamps macro set zet al deze varianten automatisch om naar een uniforme",
    goalP1b: "of",
    goalP1c: "in Snowflake.",
    goalP2: "In plaats van voor elke bronsysteem een aparte",
    goalP2b: "keten te schrijven, roep je één macro aan die de detectievolgorde voor je afhandelt.",
    macrosLabel: "De set bestaat uit drie macros:",
    macros: [
      { name: "to_timestamp", desc: "Converteert een datumstring naar een Snowflake timestamp. Probeert automatisch het juiste formaat te vinden via een vaste prioriteitsvolgorde." },
      { name: "fix_months", desc: "Normaliseert maandnamen naar 3-letterige Engelse afkortingen (bijv. 'janvier' → 'jan', 'März' → 'mar'). Ondersteunt 13+ talen inclusief accenten." },
      { name: "fix_weekdays", desc: "Verwijdert voorloopdag-namen zodat een datumstring als 'Monday, 12 April 2021' correct geparseerd kan worden." },
    ],
    formatLabel: "Ondersteunde formaatgroepen (configureerbaar):",
    groupHeader: "Groep", exampleHeader: "Voorbeelden",
    step1: "1. Aanroepen in een dbt model",
    step1Body: "Gebruik", step1Body2: "direct in een SQL-expressie:",
    step2: "2. Configuratie aanpassen (_config.sql)",
    step2Body: "Stel in welke talen, formaatgroepen en uitvoertype je wil gebruiken:",
    step3: "3. Testen",
    step3Body: "Valideer de configuratie met de ingebouwde testmacros:",
  },
  en: {
    meta: { title: "Timestamps — Utils — Datamodder", description: "dbt timestamp macro set for Snowflake. Parse date strings from dozens of formats and languages." },
    lead: "Parse date strings from virtually any format and language into a consistent Snowflake timestamp.",
    goalP1: "Source data contains dates in all possible forms: ISO 8601, European notation, US format, with or without timezone, with month names in German, French or Spanish. The Timestamps macro set automatically converts all these variants to a uniform",
    goalP1b: "or",
    goalP1c: "in Snowflake.",
    goalP2: "Instead of writing a separate",
    goalP2b: "chain for each source system, you call one macro that handles the detection order for you.",
    macrosLabel: "The set consists of three macros:",
    macros: [
      { name: "to_timestamp", desc: "Converts a date string to a Snowflake timestamp. Automatically tries to find the correct format via a fixed priority order." },
      { name: "fix_months", desc: "Normalises month names to 3-letter English abbreviations (e.g. 'janvier' → 'jan', 'März' → 'mar'). Supports 13+ languages including accents." },
      { name: "fix_weekdays", desc: "Removes leading day names so a date string like 'Monday, 12 April 2021' can be parsed correctly." },
    ],
    formatLabel: "Supported format groups (configurable):",
    groupHeader: "Group", exampleHeader: "Examples",
    step1: "1. Call in a dbt model",
    step1Body: "Use", step1Body2: "directly in a SQL expression:",
    step2: "2. Adjust configuration (_config.sql)",
    step2Body: "Set which languages, format groups and output type you want to use:",
    step3: "3. Testing",
    step3Body: "Validate the configuration with the built-in test macros:",
  },
  de: {
    meta: { title: "Timestamps — Utils — Datamodder", description: "dbt-Timestamp-Makro-Set für Snowflake. Parsen Sie Datums-Strings aus Dutzenden von Formaten und Sprachen." },
    lead: "Parsen Sie Datums-Strings aus nahezu jedem Format und jeder Sprache in einen konsistenten Snowflake-Timestamp.",
    goalP1: "Quelldaten enthalten Datumsangaben in allen möglichen Formen: ISO 8601, europäische Notation, US-Format, mit oder ohne Zeitzone, mit Monatsnamen auf Deutsch, Französisch oder Spanisch. Das Timestamps-Makro-Set konvertiert all diese Varianten automatisch in ein einheitliches",
    goalP1b: "oder",
    goalP1c: "in Snowflake.",
    goalP2: "Anstatt für jedes Quellsystem eine separate",
    goalP2b: "Kette zu schreiben, rufen Sie ein Makro auf, das die Erkennungsreihenfolge für Sie verarbeitet.",
    macrosLabel: "Das Set besteht aus drei Makros:",
    macros: [
      { name: "to_timestamp", desc: "Konvertiert einen Datums-String in einen Snowflake-Timestamp. Versucht automatisch, das richtige Format über eine feste Prioritätsreihenfolge zu finden." },
      { name: "fix_months", desc: "Normalisiert Monatsnamen zu 3-buchstabigen englischen Abkürzungen (z. B. 'janvier' → 'jan', 'März' → 'mar'). Unterstützt 13+ Sprachen einschließlich Akzenten." },
      { name: "fix_weekdays", desc: "Entfernt führende Tagesnamen, sodass ein Datums-String wie 'Monday, 12 April 2021' korrekt geparst werden kann." },
    ],
    formatLabel: "Unterstützte Formatgruppen (konfigurierbar):",
    groupHeader: "Gruppe", exampleHeader: "Beispiele",
    step1: "1. In einem dbt-Modell aufrufen",
    step1Body: "Verwenden Sie", step1Body2: "direkt in einem SQL-Ausdruck:",
    step2: "2. Konfiguration anpassen (_config.sql)",
    step2Body: "Legen Sie fest, welche Sprachen, Formatgruppen und Ausgabetypen verwendet werden sollen:",
    step3: "3. Testen",
    step3Body: "Validieren Sie die Konfiguration mit den integrierten Test-Makros:",
  },
};

const formatGroups = [
  { group: "iso", example: "2024-04-12T14:30:00Z" },
  { group: "european", example: "12-04-2024, 12/04/2024" },
  { group: "us", example: "04/12/2024" },
  { group: "compact", example: "20240412" },
  { group: "oracle / mssql / postgresql / mysql / sap", example: "Database-specific formats" },
];

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  return content[(lang as Lang)]?.meta ?? content.nl.meta;
}

export default async function TimestampsPage({ params }: PageProps) {
  const { lang } = await params;
  const t = content[(lang as Lang)] ?? content.nl;
  const u = dict[(lang as Lang)]?.utils ?? dict.nl.utils;

  return (
    <div className="pt-28 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href={`/${lang}/utils`} className="inline-flex items-center gap-2 text-[#9a8f85] text-sm hover:text-orange-400 transition-colors mb-10">
          <ArrowLeft size={14} /> {u.back}
        </Link>

        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 flex-shrink-0">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-orange-500/70 text-xs font-semibold uppercase tracking-widest mb-0.5">dbt macro</p>
            <h1 className="text-3xl font-black text-[#f5f0eb]">Timestamps</h1>
          </div>
        </div>
        <p className="text-[#9a8f85] text-lg leading-relaxed mb-12">{t.lead}</p>

        <section className="mb-12">
          <h2 className="text-xl font-black text-[#f5f0eb] mb-4">{u.goal}</h2>
          <p className="text-[#9a8f85] leading-relaxed mb-4">
            {t.goalP1} <span className="text-orange-400 font-mono text-sm">timestamp_tz</span> {t.goalP1b} <span className="text-orange-400 font-mono text-sm">timestamp_ntz</span> {t.goalP1c}
          </p>
          <p className="text-[#9a8f85] leading-relaxed">
            {t.goalP2} <span className="text-orange-400 font-mono text-sm">TRY_TO_TIMESTAMP</span> {t.goalP2b}
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-black text-[#f5f0eb] mb-4">{u.whatToExpect}</h2>
          <p className="text-[#9a8f85] leading-relaxed mb-6">{t.macrosLabel}</p>
          <div className="space-y-4">
            {t.macros.map(({ name, desc }) => (
              <div key={name} className="p-5 rounded-xl bg-[#1a1612] border border-orange-900/20">
                <p className="font-mono text-orange-300/80 text-sm mb-1">{name}</p>
                <p className="text-[#9a8f85] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <p className="text-[#9a8f85] text-sm mb-4">{t.formatLabel}</p>
            <div className="rounded-xl bg-[#1a1612] border border-orange-900/20 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-orange-900/20">
                    <th className="text-left px-5 py-3 text-orange-400 font-semibold text-xs uppercase tracking-widest">{t.groupHeader}</th>
                    <th className="text-left px-5 py-3 text-orange-400 font-semibold text-xs uppercase tracking-widest">{t.exampleHeader}</th>
                  </tr>
                </thead>
                <tbody className="text-[#9a8f85]">
                  {formatGroups.map(({ group, example }) => (
                    <tr key={group} className="border-b border-orange-900/10 last:border-0">
                      <td className="px-5 py-3 font-mono text-xs text-orange-300/70">{group}</td>
                      <td className="px-5 py-3 text-xs">{example}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-black text-[#f5f0eb] mb-4">{u.usage}</h2>

          <h3 className="text-[#f5f0eb] font-semibold mb-2 text-sm">{t.step1}</h3>
          <p className="text-[#9a8f85] text-sm mb-3">
            {t.step1Body} <span className="text-orange-400 font-mono">to_timestamp</span> {t.step1Body2}
          </p>
          <div className="rounded-xl bg-[#0c0a08] border border-orange-900/20 p-5 font-mono text-sm text-orange-300/80 mb-6 overflow-x-auto">
            <pre>{`SELECT
  {{ to_timestamp('raw_date_column') }} AS parsed_date
FROM {{ source('source', 'table') }}`}</pre>
          </div>

          <h3 className="text-[#f5f0eb] font-semibold mb-2 text-sm">{t.step2}</h3>
          <p className="text-[#9a8f85] text-sm mb-3">{t.step2Body}</p>
          <div className="rounded-xl bg-[#0c0a08] border border-orange-900/20 p-5 font-mono text-sm text-orange-300/80 mb-6 overflow-x-auto">
            <pre>{`-- _config.sql
languages:     ['nl', 'de', 'fr', 'en']
format_groups: ['iso', 'european', 'us']
output_type:   'timestamp_tz'
two_digit_years: false`}</pre>
          </div>

          <h3 className="text-[#f5f0eb] font-semibold mb-2 text-sm">{t.step3}</h3>
          <p className="text-[#9a8f85] text-sm mb-3">{t.step3Body}</p>
          <div className="rounded-xl bg-[#0c0a08] border border-orange-900/20 p-5 font-mono text-sm text-orange-300/80 overflow-x-auto">
            <pre>{`{{ create_test() }}   -- creates test table
{{ do_test() }}       -- fills and validates, logs pass/fail`}</pre>
          </div>
        </section>

        <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-orange-900/20">
          <a href="https://github.com/Steef-Datamodder/datamodder_utils/tree/main/macros/timestamps" target="_blank" rel="noopener noreferrer"
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
