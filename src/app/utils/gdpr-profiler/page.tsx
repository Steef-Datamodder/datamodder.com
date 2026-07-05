import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Fingerprint, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "GDPR Profiler — Utils — Datamodder",
  description: "Snowflake stored procedure die automatisch een schema scant op persoonsgegevens via configureerbare regex-regels.",
};

const params = [
  ["DATABASE_NAME", "—", "Verplicht. Database die gescand wordt."],
  ["SCHEMA_NAME", "—", "Verplicht. Schema dat gescand wordt."],
  ["SAMPLE_ROWS", "—", "Verplicht. Aantal rijen dat per kolom wordt gesampeld."],
  ["MATCH_THRESHOLD", "0.1", "Minimale ratio van matchende waarden om een kolom te markeren (0–1)."],
  ["UTILS_DATABASE", "current database", "Database waar PII_REGEX_RULES en PII_SCAN_RESULTS staan."],
  ["UTILS_SCHEMA", "current schema", "Schema waar de utility-tabellen staan."],
];

const tables = [
  {
    name: "PII_REGEX_RULES",
    desc: "Configuratietabel met detectiepatronen. Voeg rijen toe om nieuwe PII-categorieën te ondersteunen zonder de procedure aan te passen.",
  },
  {
    name: "PII_SCAN_RESULTS",
    desc: "Resultatentabel. Elke scanrun schrijft zijn bevindingen hier naar toe, voorzien van scan_id en timestamp.",
  },
];

const phases = [
  {
    nr: "1",
    titel: "Kandidaten bepalen",
    desc: "De procedure cross-joint information_schema.columns met PII_REGEX_RULES en filtert direct op datatype. Zo vallen niet-relevante kolommen al in SQL weg.",
  },
  {
    nr: "2",
    titel: "Waarden sampelen",
    desc: "Voor elke kandidaatkolom wordt een steekproef getrokken en de waarden worden gecontroleerd tegen het value_regex-patroon. De matchratio wordt vergeleken met MATCH_THRESHOLD.",
  },
  {
    nr: "3",
    titel: "Bevindingen opslaan",
    desc: "Naam- en waarde-confidence worden opgeteld (max. 1.0) en samen met de detectiereden en het aanbevolen actie ingevoerd in PII_SCAN_RESULTS.",
  },
];

export default function GdprProfilerPage() {
  return (
    <>
      <div className="pt-28 pb-24 px-6">
        <div className="max-w-3xl mx-auto">

          <Link href="/utils" className="inline-flex items-center gap-2 text-[#9a8f85] text-sm hover:text-orange-400 transition-colors mb-10">
            <ArrowLeft size={14} /> Terug naar Utils
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
          <p className="text-[#9a8f85] text-lg leading-relaxed mb-12">
            Scan automatisch een Snowflake-schema op persoonsgegevens via configureerbare regex-regels — zonder handmatig elke tabel door te spitten.
          </p>

          {/* Doel */}
          <section className="mb-12">
            <h2 className="text-xl font-black text-[#f5f0eb] mb-4">Doel</h2>
            <p className="text-[#9a8f85] leading-relaxed mb-4">
              Weten welke kolommen persoonsgegevens bevatten is de eerste stap voor AVG-compliance. De GDPR Profiler doet dit werk automatisch: hij koppelt de systeemcatalogus aan een tabel met regex-regels, sampelt kolomwaarden en schrijft zijn bevindingen — inclusief betrouwbaarheidsscore en aanbevolen actie — weg naar een resultatenset.
            </p>
            <p className="text-[#9a8f85] leading-relaxed">
              De detectieregels zijn volledig configureerbaar via <span className="text-orange-400 font-mono text-sm">PII_REGEX_RULES</span>. Nieuwe PII-categorieën toevoegen betekent een rij invoegen, geen code aanpassen.
            </p>
          </section>

          {/* Vereiste tabellen */}
          <section className="mb-12">
            <h2 className="text-xl font-black text-[#f5f0eb] mb-4">Vereiste tabellen</h2>
            <div className="space-y-3">
              {tables.map(({ name, desc }) => (
                <div key={name} className="p-5 rounded-xl bg-[#1a1612] border border-orange-900/20">
                  <p className="font-mono text-orange-300/80 text-sm mb-1">{name}</p>
                  <p className="text-[#9a8f85] text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Werkwijze */}
          <section className="mb-12">
            <h2 className="text-xl font-black text-[#f5f0eb] mb-4">Werkwijze</h2>
            <div className="space-y-3">
              {phases.map(({ nr, titel, desc }) => (
                <div key={nr} className="p-5 rounded-xl bg-[#1a1612] border border-orange-900/20 flex gap-4">
                  <div className="w-7 h-7 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-400 text-xs font-black flex-shrink-0 mt-0.5">{nr}</div>
                  <div>
                    <p className="text-[#f5f0eb] font-semibold text-sm mb-1">{titel}</p>
                    <p className="text-[#9a8f85] text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Parameters */}
          <section className="mb-12">
            <h2 className="text-xl font-black text-[#f5f0eb] mb-4">Parameters</h2>
            <div className="rounded-xl bg-[#1a1612] border border-orange-900/20 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-orange-900/20">
                    <th className="text-left px-5 py-3 text-orange-400 font-semibold font-mono text-xs">Parameter</th>
                    <th className="text-left px-5 py-3 text-orange-400 font-semibold text-xs uppercase tracking-widest">Standaard</th>
                    <th className="text-left px-5 py-3 text-orange-400 font-semibold text-xs uppercase tracking-widest">Beschrijving</th>
                  </tr>
                </thead>
                <tbody className="text-[#9a8f85]">
                  {params.map(([param, def, desc]) => (
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

          {/* Gebruik */}
          <section className="mb-12">
            <h2 className="text-xl font-black text-[#f5f0eb] mb-4">Gebruik</h2>

            <h3 className="text-[#f5f0eb] font-semibold mb-2 text-sm">1. Basis scan</h3>
            <p className="text-[#9a8f85] text-sm mb-3">
              Scan een heel schema met 1.000 steekproefrijen per kolom:
            </p>
            <div className="rounded-xl bg-[#0c0a08] border border-orange-900/20 p-5 font-mono text-sm text-orange-300/80 mb-6 overflow-x-auto">
              <pre>{`CALL DATAMODDER_UTILS.PROFILE_PII(
    'MY_DATABASE',
    'MY_SCHEMA',
    1000
);`}</pre>
            </div>

            <h3 className="text-[#f5f0eb] font-semibold mb-2 text-sm">2. Gevoeligheid aanpassen</h3>
            <p className="text-[#9a8f85] text-sm mb-3">
              Verlaag de drempel om ook zwakkere signalen te detecteren (bijv. 5% van de waarden matcht):
            </p>
            <div className="rounded-xl bg-[#0c0a08] border border-orange-900/20 p-5 font-mono text-sm text-orange-300/80 mb-6 overflow-x-auto">
              <pre>{`CALL DATAMODDER_UTILS.PROFILE_PII(
    'MY_DATABASE',
    'MY_SCHEMA',
    5000,
    0.05   -- match_threshold
);`}</pre>
            </div>

            <h3 className="text-[#f5f0eb] font-semibold mb-2 text-sm">3. Aparte utility-locatie</h3>
            <p className="text-[#9a8f85] text-sm mb-3">
              Staan je utility-tabellen in een andere database of schema? Geef die expliciet mee:
            </p>
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

            <h3 className="text-[#f5f0eb] font-semibold mb-2 text-sm">4. Resultaten bekijken</h3>
            <div className="rounded-xl bg-[#0c0a08] border border-orange-900/20 p-5 font-mono text-sm text-orange-300/80 overflow-x-auto">
              <pre>{`SELECT *
  FROM DATAMODDER_UTILS.PII_SCAN_RESULTS
 ORDER BY scanned_at DESC, confidence DESC;`}</pre>
            </div>
          </section>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-orange-900/20">
            <a
              href="https://github.com/Steef-Datamodder/datamodder_utils/tree/main/Stored%20Procedure/profile"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-400 transition-all duration-200 glow-orange text-sm"
            >
              <ExternalLink size={16} /> Bekijk op GitHub
            </a>
            <Link
              href="/utils"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-orange-500/40 text-[#f5f0eb] font-medium hover:border-orange-500 hover:bg-orange-500/10 transition-all duration-200 text-sm"
            >
              <ArrowLeft size={16} /> Alle utils
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}
