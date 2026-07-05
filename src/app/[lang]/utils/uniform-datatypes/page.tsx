import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowLeftRight, ExternalLink } from "lucide-react";
import { dict } from "@/lib/i18n";
import type { Lang } from "@/lib/i18n";

type PageProps = { params: Promise<{ lang: string }> };

const typeMapping = [
  { source: "VARCHAR, CHAR, TEXT, STRING, …", target: "TEXT" },
  { source: "NUMBER, DECIMAL, FLOAT, INT, …", target: "DECIMAL(digits_before, digits_after)" },
  { source: "DATE, DATETIME, TIMESTAMP_*", target: "TIMESTAMP_TZ" },
  { source: "TIME", target: "TIMESTAMP_TZ (anchor date 2000-01-01)" },
  { source: "BOOLEAN, VARIANT, ARRAY, OBJECT", target: "Unchanged" },
];

const content = {
  nl: {
    meta: { title: "Uniform Datatypes — Utils — Datamodder", description: "dbt macro die alle kolommen van een brontabel automatisch cast naar uniforme Snowflake datatypes." },
    lead: "Cast alle kolommen van een brontabel automatisch naar uniforme Snowflake datatypes, zonder handmatig elke kolom te hoeven specificeren.",
    goalP1: "Brondata bevat vaak een wirwar aan datatypes. De",
    goalP1b: "macro inspecteert de metadata van een tabel en genereert automatisch een",
    goalP1c: "statement waarbij elke kolom naar een consistent doeltype wordt gecast.",
    goalP2: "Ongeldige waarden worden via",
    goalP2b: "afgehandeld: in plaats van een fout te geven, worden ze omgezet naar",
    goalP2c: ". Zo breekt een enkel vervuild getal je hele staginglaag niet meer.",
    typeMappingLabel: "Type-mapping", sourceHeader: "Brontype", targetHeader: "Doeltype",
    paramsLabel: "Parameters", paramHeader: "Parameter", defaultHeader: "Standaard", descHeader: "Beschrijving",
    params: [
      ["relatie", "—", "Verplicht. Verwijzing naar de brontabel via ref() of source()."],
      ["voor_komma", "18", "Aantal cijfers vóór de komma bij DECIMAL casting."],
      ["na_komma", "4", "Aantal cijfers ná de komma bij DECIMAL casting."],
      ["kolommen_uitsluiten", "[]", "Lijst met kolomnamen die niet worden getransformeerd."],
    ],
    step1: "1. Aanroepen in een dbt model",
    step1Body: "Gebruik de macro als volledige body van een stagingmodel:",
    step2: "2. Precisie aanpassen",
    step2Body: "Stel de gewenste precisie in voor numerieke kolommen:",
    step3: "3. Kolommen uitsluiten",
    step3Body: "Geef een lijst mee van kolommen die je ongewijzigd wil laten:",
  },
  en: {
    meta: { title: "Uniform Datatypes — Utils — Datamodder", description: "dbt macro that automatically casts all columns of a source table to uniform Snowflake data types." },
    lead: "Automatically cast all columns of a source table to uniform Snowflake data types, without manually specifying each column.",
    goalP1: "Source data often contains a jumble of data types. The",
    goalP1b: "macro inspects the metadata of a table and automatically generates a",
    goalP1c: "statement where each column is cast to a consistent target type.",
    goalP2: "Invalid values are handled via",
    goalP2b: "functions: instead of throwing an error, they are converted to",
    goalP2c: ". So a single dirty value no longer breaks your entire staging layer.",
    typeMappingLabel: "Type mapping", sourceHeader: "Source type", targetHeader: "Target type",
    paramsLabel: "Parameters", paramHeader: "Parameter", defaultHeader: "Default", descHeader: "Description",
    params: [
      ["relatie", "—", "Required. Reference to the source table via ref() or source()."],
      ["voor_komma", "18", "Number of digits before the decimal point for DECIMAL casting."],
      ["na_komma", "4", "Number of digits after the decimal point for DECIMAL casting."],
      ["kolommen_uitsluiten", "[]", "List of column names that are not transformed."],
    ],
    step1: "1. Call in a dbt model",
    step1Body: "Use the macro as the full body of a staging model:",
    step2: "2. Adjust precision",
    step2Body: "Set the desired precision for numeric columns:",
    step3: "3. Exclude columns",
    step3Body: "Pass a list of columns you want to leave unchanged:",
  },
  de: {
    meta: { title: "Uniform Datatypes — Utils — Datamodder", description: "dbt-Makro, das alle Spalten einer Quelltabelle automatisch in einheitliche Snowflake-Datentypen umwandelt." },
    lead: "Wandeln Sie alle Spalten einer Quelltabelle automatisch in einheitliche Snowflake-Datentypen um, ohne jede Spalte manuell angeben zu müssen.",
    goalP1: "Quelldaten enthalten oft ein Durcheinander von Datentypen. Das",
    goalP1b: "Makro inspiziert die Metadaten einer Tabelle und generiert automatisch ein",
    goalP1c: "Statement, in dem jede Spalte in einen konsistenten Zieltyp umgewandelt wird.",
    goalP2: "Ungültige Werte werden über",
    goalP2b: "Funktionen verarbeitet: Anstatt einen Fehler auszulösen, werden sie in",
    goalP2c: "umgewandelt. So bricht ein einzelner fehlerhafter Wert nicht mehr Ihre gesamte Staging-Schicht.",
    typeMappingLabel: "Typ-Mapping", sourceHeader: "Quelltyp", targetHeader: "Zieltyp",
    paramsLabel: "Parameter", paramHeader: "Parameter", defaultHeader: "Standard", descHeader: "Beschreibung",
    params: [
      ["relatie", "—", "Erforderlich. Verweis auf die Quelltabelle über ref() oder source()."],
      ["voor_komma", "18", "Anzahl der Stellen vor dem Komma beim DECIMAL-Casting."],
      ["na_komma", "4", "Anzahl der Stellen nach dem Komma beim DECIMAL-Casting."],
      ["kolommen_uitsluiten", "[]", "Liste von Spaltennamen, die nicht transformiert werden."],
    ],
    step1: "1. In einem dbt-Modell aufrufen",
    step1Body: "Verwenden Sie das Makro als vollständigen Body eines Staging-Modells:",
    step2: "2. Präzision anpassen",
    step2Body: "Legen Sie die gewünschte Präzision für numerische Spalten fest:",
    step3: "3. Spalten ausschließen",
    step3Body: "Übergeben Sie eine Liste von Spalten, die Sie unverändert lassen möchten:",
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  return content[(lang as Lang)]?.meta ?? content.nl.meta;
}

export default async function UniformDatatypesPage({ params }: PageProps) {
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
            <ArrowLeftRight size={24} />
          </div>
          <div>
            <p className="text-orange-500/70 text-xs font-semibold uppercase tracking-widest mb-0.5">dbt macro</p>
            <h1 className="text-3xl font-black text-[#f5f0eb]">Uniform Datatypes</h1>
          </div>
        </div>
        <p className="text-[#9a8f85] text-lg leading-relaxed mb-12">{t.lead}</p>

        <section className="mb-12">
          <h2 className="text-xl font-black text-[#f5f0eb] mb-4">{u.goal}</h2>
          <p className="text-[#9a8f85] leading-relaxed mb-4">
            {t.goalP1} <span className="font-mono text-orange-300/80 text-sm">uniform_datatypes</span> {t.goalP1b} <span className="text-orange-400 font-mono text-sm">SELECT</span> {t.goalP1c}
          </p>
          <p className="text-[#9a8f85] leading-relaxed">
            {t.goalP2} <span className="text-orange-400 font-mono text-sm">TRY_TO_*</span> {t.goalP2b} <span className="text-orange-400 font-mono text-sm">NULL</span>{t.goalP2c}
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-black text-[#f5f0eb] mb-4">{t.typeMappingLabel}</h2>
          <div className="rounded-xl bg-[#1a1612] border border-orange-900/20 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-orange-900/20">
                  <th className="text-left px-5 py-3 text-orange-400 font-semibold text-xs uppercase tracking-widest">{t.sourceHeader}</th>
                  <th className="text-left px-5 py-3 text-orange-400 font-semibold text-xs uppercase tracking-widest">{t.targetHeader}</th>
                </tr>
              </thead>
              <tbody className="text-[#9a8f85]">
                {typeMapping.map(({ source, target }) => (
                  <tr key={source} className="border-b border-orange-900/10 last:border-0">
                    <td className="px-5 py-3 font-mono text-orange-300/70 text-xs">{source}</td>
                    <td className="px-5 py-3 font-mono text-xs">{target}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-black text-[#f5f0eb] mb-4">{t.paramsLabel}</h2>
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
                {t.params.map(([param, def, desc]) => (
                  <tr key={param} className="border-b border-orange-900/10 last:border-0">
                    <td className="px-5 py-3 font-mono text-orange-300/70 text-xs">{param}</td>
                    <td className="px-5 py-3 font-mono text-xs">{def}</td>
                    <td className="px-5 py-3 text-xs">{desc}</td>
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
            <pre>{`{{ uniform_datatypes(ref('my_source_table')) }}`}</pre>
          </div>

          <h3 className="text-[#f5f0eb] font-semibold mb-2 text-sm">{t.step2}</h3>
          <p className="text-[#9a8f85] text-sm mb-3">{t.step2Body}</p>
          <div className="rounded-xl bg-[#0c0a08] border border-orange-900/20 p-5 font-mono text-sm text-orange-300/80 mb-6 overflow-x-auto">
            <pre>{`{{ uniform_datatypes(
    source('raw', 'orders'),
    voor_komma = 15,
    na_komma   = 2
) }}`}</pre>
          </div>

          <h3 className="text-[#f5f0eb] font-semibold mb-2 text-sm">{t.step3}</h3>
          <p className="text-[#9a8f85] text-sm mb-3">{t.step3Body}</p>
          <div className="rounded-xl bg-[#0c0a08] border border-orange-900/20 p-5 font-mono text-sm text-orange-300/80 overflow-x-auto">
            <pre>{`{{ uniform_datatypes(
    ref('my_source_table'),
    kolommen_uitsluiten = ['_loaded_at', '_row_hash']
) }}`}</pre>
          </div>
        </section>

        <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-orange-900/20">
          <a href="https://github.com/Steef-Datamodder/datamodder_utils/tree/main/macros/datatypes" target="_blank" rel="noopener noreferrer"
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
