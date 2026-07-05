import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Timestamps — Utils — Datamodder",
  description: "dbt timestamp macro set voor Snowflake. Parseer datumstrings uit tientallen formaten en talen.",
};

const macros = [
  {
    name: "to_timestamp",
    desc: "Converteert een datumstring naar een Snowflake timestamp. Probeert automatisch het juiste formaat te vinden via een vaste prioriteitsvolgorde.",
  },
  {
    name: "fix_months",
    desc: "Normaliseert maandnamen naar 3-letterige Engelse afkortingen (bijv. 'janvier' → 'jan', 'März' → 'mar'). Ondersteunt 13+ talen inclusief accenten.",
  },
  {
    name: "fix_weekdays",
    desc: "Verwijdert voorloopdag-namen zodat een datumstring als 'Monday, 12 April 2021' correct geparseerd kan worden.",
  },
];

const formatGroups = [
  { group: "iso", voorbeeld: "2024-04-12T14:30:00Z" },
  { group: "european", voorbeeld: "12-04-2024, 12/04/2024" },
  { group: "us", voorbeeld: "04/12/2024" },
  { group: "compact", voorbeeld: "20240412" },
  { group: "oracle / mssql / postgresql / mysql / sap", voorbeeld: "Databasespecifieke formaten" },
];

export default function TimestampsPage() {
  return (
    <>
      <div className="pt-28 pb-24 px-6">
        <div className="max-w-3xl mx-auto">

          <Link href="/utils" className="inline-flex items-center gap-2 text-[#9a8f85] text-sm hover:text-orange-400 transition-colors mb-10">
            <ArrowLeft size={14} /> Terug naar Utils
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
          <p className="text-[#9a8f85] text-lg leading-relaxed mb-12">
            Parseer datumstrings uit vrijwel elk formaat en elke taal naar een consistente Snowflake timestamp.
          </p>

          {/* Doel */}
          <section className="mb-12">
            <h2 className="text-xl font-black text-[#f5f0eb] mb-4">Doel</h2>
            <p className="text-[#9a8f85] leading-relaxed mb-4">
              Brondata bevat datums in alle mogelijke gedaanten: ISO 8601, Europese notatie, Amerikaans formaat, met of zonder tijdzone, met maandnamen in het Duits, Frans of Spaans. De Timestamps macro set zet al deze varianten automatisch om naar een uniforme <span className="text-orange-400 font-mono text-sm">timestamp_tz</span> of <span className="text-orange-400 font-mono text-sm">timestamp_ntz</span> in Snowflake.
            </p>
            <p className="text-[#9a8f85] leading-relaxed">
              In plaats van voor elke bronsysteem een aparte <span className="text-orange-400 font-mono text-sm">TRY_TO_TIMESTAMP</span>-keten te schrijven, roep je één macro aan die de detectievolgorde voor je afhandelt.
            </p>
          </section>

          {/* Macros */}
          <section className="mb-12">
            <h2 className="text-xl font-black text-[#f5f0eb] mb-4">Wat je kunt verwachten</h2>
            <p className="text-[#9a8f85] leading-relaxed mb-6">
              De set bestaat uit drie macros:
            </p>
            <div className="space-y-4">
              {macros.map(({ name, desc }) => (
                <div key={name} className="p-5 rounded-xl bg-[#1a1612] border border-orange-900/20">
                  <p className="font-mono text-orange-300/80 text-sm mb-1">{name}</p>
                  <p className="text-[#9a8f85] text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <p className="text-[#9a8f85] text-sm mb-4">Ondersteunde formaatgroepen (configureerbaar):</p>
              <div className="rounded-xl bg-[#1a1612] border border-orange-900/20 overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-orange-900/20">
                      <th className="text-left px-5 py-3 text-orange-400 font-semibold text-xs uppercase tracking-widest">Groep</th>
                      <th className="text-left px-5 py-3 text-orange-400 font-semibold text-xs uppercase tracking-widest">Voorbeelden</th>
                    </tr>
                  </thead>
                  <tbody className="text-[#9a8f85]">
                    {formatGroups.map(({ group, voorbeeld }) => (
                      <tr key={group} className="border-b border-orange-900/10 last:border-0">
                        <td className="px-5 py-3 font-mono text-xs text-orange-300/70">{group}</td>
                        <td className="px-5 py-3 text-xs">{voorbeeld}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Gebruik */}
          <section className="mb-12">
            <h2 className="text-xl font-black text-[#f5f0eb] mb-4">Gebruik</h2>

            <h3 className="text-[#f5f0eb] font-semibold mb-2 text-sm">1. Aanroepen in een dbt model</h3>
            <p className="text-[#9a8f85] text-sm mb-3">
              Gebruik <span className="text-orange-400 font-mono">to_timestamp</span> direct in een SQL-expressie:
            </p>
            <div className="rounded-xl bg-[#0c0a08] border border-orange-900/20 p-5 font-mono text-sm text-orange-300/80 mb-6 overflow-x-auto">
              <pre>{`SELECT
  {{ to_timestamp('raw_date_column') }} AS parsed_date
FROM {{ source('bron', 'tabel') }}`}</pre>
            </div>

            <h3 className="text-[#f5f0eb] font-semibold mb-2 text-sm">2. Configuratie aanpassen (_config.sql)</h3>
            <p className="text-[#9a8f85] text-sm mb-3">
              Stel in welke talen, formaatgroepen en uitvoertype je wil gebruiken:
            </p>
            <div className="rounded-xl bg-[#0c0a08] border border-orange-900/20 p-5 font-mono text-sm text-orange-300/80 mb-6 overflow-x-auto">
              <pre>{`-- _config.sql
languages:     ['nl', 'de', 'fr', 'en']
format_groups: ['iso', 'european', 'us']
output_type:   'timestamp_tz'
two_digit_years: false`}</pre>
            </div>

            <h3 className="text-[#f5f0eb] font-semibold mb-2 text-sm">3. Testen</h3>
            <p className="text-[#9a8f85] text-sm mb-3">
              Valideer de configuratie met de ingebouwde testmacros:
            </p>
            <div className="rounded-xl bg-[#0c0a08] border border-orange-900/20 p-5 font-mono text-sm text-orange-300/80 overflow-x-auto">
              <pre>{`{{ create_test() }}   -- maakt testtabel aan
{{ do_test() }}       -- vult en controleert, logt pass/fail`}</pre>
            </div>
          </section>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-orange-900/20">
            <a
              href="https://github.com/Steef-Datamodder/datamodder_utils/tree/main/macros/timestamps"
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
