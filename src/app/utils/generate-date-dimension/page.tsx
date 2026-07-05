import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CalendarDays, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Generate Date Dimension — Utils — Datamodder",
  description: "dbt macro die automatisch een volledige datumdimensie genereert voor Snowflake, inclusief fiscale periodes en Nederlandse feestdagen.",
};

const columns = [
  { groep: "Dag", cols: ["dag_nummer", "dag_van_het_jaar", "dag_van_de_week", "naam_van_de_dag", "weekend_vlag", "werkdag_vlag"] },
  { groep: "Week", cols: ["kalenderweek", "iso_week_nummer", "iso_week_jaar", "iso_week_label"] },
  { groep: "Maand", cols: ["maandnummer", "maandnaam", "maandafkorting", "maand_label"] },
  { groep: "Kwartaal & Jaar", cols: ["kwartaal", "kwartaal_label", "kalenderjaar", "fiscaal_jaar", "fiscale_maand", "fiscaal_kwartaal"] },
  { groep: "Feestdagen", cols: ["is_feestdag", "naam_feestdag"] },
  { groep: "Schoolvakanties (optioneel)", cols: ["is_schoolvakantie", "schoolvakantie_naam"] },
];

const schoollandenRows = [
  ["NL", "Noord, Midden, Zuid", "rijksoverheid.nl"],
  ["BE", "NL, FR, DE gemeenschappen", "onderwijs.vlaanderen.be / enseignement.be"],
  ["DE", "16 Bundesländer", "kmk.org"],
  ["GB", "Per local authority", "gov.uk"],
  ["FR", "Zones A, B, C", "education.gouv.fr"],
  ["US", "School district niveau", "Geen centrale bron"],
];

export default function GenerateDateDimensionPage() {
  return (
    <>
      <div className="pt-28 pb-24 px-6">
        <div className="max-w-3xl mx-auto">

          <Link href="/utils" className="inline-flex items-center gap-2 text-[#9a8f85] text-sm hover:text-orange-400 transition-colors mb-10">
            <ArrowLeft size={14} /> Terug naar Utils
          </Link>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 flex-shrink-0">
              <CalendarDays size={24} />
            </div>
            <div>
              <p className="text-orange-500/70 text-xs font-semibold uppercase tracking-widest mb-0.5">dbt macro</p>
              <h1 className="text-3xl font-black text-[#f5f0eb]">Generate Date Dimension</h1>
            </div>
          </div>
          <p className="text-[#9a8f85] text-lg leading-relaxed mb-12">
            Genereer een complete datumdimensie voor Snowflake, inclusief fiscale periodes en Nederlandse feestdagen.
          </p>

          {/* Doel */}
          <section className="mb-12">
            <h2 className="text-xl font-black text-[#f5f0eb] mb-4">Doel</h2>
            <p className="text-[#9a8f85] leading-relaxed mb-4">
              Een datumdimensie is de ruggengraat van elk data warehouse. Met deze macro genereer je in één stap een volledige <span className="text-orange-400 font-mono text-sm">dim_datum</span> tabel voor Snowflake, met alle kalender- en fiscale attributen die je nodig hebt voor tijdgebaseerde analyses. Geen handmatig SQL meer, geen ontbrekende feestdagen.
            </p>
            <p className="text-[#9a8f85] leading-relaxed">
              De macro berekent Nederlandse feestdagen automatisch, inclusief beweeglijke feestdagen zoals Pasen en Pinksteren (via het Computus-algoritme) en houdt rekening met de zondagsuitwijkregel voor Koningsdag.
            </p>
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
                  {[
                    ["start_date", "'2000-01-01'", "Begindatum van de dimensie"],
                    ["end_date", "'2030-12-31'", "Einddatum van de dimensie"],
                    ["fiscal_year_start_month", "1", "Startmaand van het fiscale jaar (1–12)"],
                    ["dim_datum_taal", "'nl'", "Taal voor namen: 'nl' of 'en'"],
                    ["schoolvakanties", "none", "Optionele tabel met schoolvakantiedata (van_datum, tot_datum, vakantie_naam, land, regio)."],
                    ["schoolvakantie_land", "none", "Filter op land, bijv. 'NL'. Vereist schoolvakanties."],
                    ["schoolvakantie_regio", "none", "Filter op regio, bijv. 'Noord'. Vereist schoolvakanties."],
                  ].map(([param, def, desc]) => (
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

          {/* Kolommen */}
          <section className="mb-12">
            <h2 className="text-xl font-black text-[#f5f0eb] mb-4">Wat je kunt verwachten</h2>
            <p className="text-[#9a8f85] leading-relaxed mb-6">
              De gegenereerde tabel bevat kolommen over vijf dimensies:
            </p>
            <div className="space-y-3">
              {columns.map(({ groep, cols }) => (
                <div key={groep} className="p-5 rounded-xl bg-[#1a1612] border border-orange-900/20">
                  <p className="text-[#f5f0eb] font-semibold text-sm mb-3">{groep}</p>
                  <div className="flex flex-wrap gap-2">
                    {cols.map((col) => (
                      <span key={col} className="px-2.5 py-1 rounded-lg bg-[#0c0a08] border border-orange-900/20 text-[#9a8f85] text-xs font-mono">
                        {col}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Gebruik */}
          <section className="mb-12">
            <h2 className="text-xl font-black text-[#f5f0eb] mb-4">Gebruik</h2>

            <h3 className="text-[#f5f0eb] font-semibold mb-2 text-sm">1. Maak een dbt model aan</h3>
            <p className="text-[#9a8f85] text-sm mb-3">
              Maak een bestand <span className="text-orange-400 font-mono">dim_datum.sql</span> aan in je dbt models-map en roep de macro daarin aan:
            </p>
            <div className="rounded-xl bg-[#0c0a08] border border-orange-900/20 p-5 font-mono text-sm text-orange-300/80 mb-6 overflow-x-auto">
              <pre>{`{{ generate_date_dimension(
    start_date = '2000-01-01',
    end_date   = '2035-12-31'
) }}`}</pre>
            </div>

            <h3 className="text-[#f5f0eb] font-semibold mb-2 text-sm">2. Fiscaal jaar instellen</h3>
            <p className="text-[#9a8f85] text-sm mb-3">
              Begint jouw fiscale jaar in april? Geef de startmaand mee:
            </p>
            <div className="rounded-xl bg-[#0c0a08] border border-orange-900/20 p-5 font-mono text-sm text-orange-300/80 mb-6 overflow-x-auto">
              <pre>{`{{ generate_date_dimension(
    fiscal_year_start_month = 4
) }}`}</pre>
            </div>

            <h3 className="text-[#f5f0eb] font-semibold mb-2 text-sm">3. Schoolvakanties koppelen</h3>
            <p className="text-[#9a8f85] text-sm mb-3">
              Koppel een tabel met schoolvakantiedata en filter optioneel op land en regio. De macro voegt <span className="text-orange-400 font-mono">is_schoolvakantie</span> en <span className="text-orange-400 font-mono">schoolvakantie_naam</span> toe aan de output:
            </p>
            <div className="rounded-xl bg-[#0c0a08] border border-orange-900/20 p-5 font-mono text-sm text-orange-300/80 mb-6 overflow-x-auto">
              <pre>{`{{ generate_date_dimension(
    schoolvakanties      = ref('schoolvakanties'),
    schoolvakantie_land  = 'NL',
    schoolvakantie_regio = 'Noord'
) }}`}</pre>
            </div>

            <p className="text-[#9a8f85] text-sm mb-3">
              De gekoppelde tabel verwacht de volgende kolommen:
            </p>
            <div className="rounded-xl bg-[#1a1612] border border-orange-900/20 overflow-hidden mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-orange-900/20">
                    <th className="text-left px-5 py-3 text-orange-400 font-semibold font-mono text-xs">Kolom</th>
                    <th className="text-left px-5 py-3 text-orange-400 font-semibold text-xs uppercase tracking-widest">Type</th>
                    <th className="text-left px-5 py-3 text-orange-400 font-semibold text-xs uppercase tracking-widest">Beschrijving</th>
                  </tr>
                </thead>
                <tbody className="text-[#9a8f85]">
                  {[
                    ["van_datum", "DATE", "Eerste dag van de vakantie"],
                    ["tot_datum", "DATE", "Laatste dag van de vakantie"],
                    ["vakantie_naam", "TEXT", "Naam, bijv. \"Zomervakantie\""],
                    ["land", "TEXT", "Landcode, bijv. 'NL'"],
                    ["regio", "TEXT", "Regio of null voor heel het land"],
                  ].map(([col, type, desc]) => (
                    <tr key={col} className="border-b border-orange-900/10 last:border-0">
                      <td className="px-5 py-3 font-mono text-orange-300/70 text-xs">{col}</td>
                      <td className="px-5 py-3 font-mono text-xs">{type}</td>
                      <td className="px-5 py-3 text-xs">{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-[#9a8f85] text-sm mb-3">Ondersteunde landen en databronnen:</p>
            <div className="rounded-xl bg-[#1a1612] border border-orange-900/20 overflow-hidden mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-orange-900/20">
                    <th className="text-left px-5 py-3 text-orange-400 font-semibold text-xs uppercase tracking-widest">Land</th>
                    <th className="text-left px-5 py-3 text-orange-400 font-semibold text-xs uppercase tracking-widest">Regio&#39;s</th>
                    <th className="text-left px-5 py-3 text-orange-400 font-semibold text-xs uppercase tracking-widest">Bron</th>
                  </tr>
                </thead>
                <tbody className="text-[#9a8f85]">
                  {schoollandenRows.map(([land, regio, bron]) => (
                    <tr key={land} className="border-b border-orange-900/10 last:border-0">
                      <td className="px-5 py-3 font-mono text-xs text-orange-300/70">{land}</td>
                      <td className="px-5 py-3 text-xs">{regio}</td>
                      <td className="px-5 py-3 font-mono text-xs">{bron}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className="text-[#f5f0eb] font-semibold mb-2 text-sm">4. Taal configureren</h3>
            <p className="text-[#9a8f85] text-sm mb-3">
              Stel de taal in via een dbt variabele in <span className="text-orange-400 font-mono">dbt_project.yml</span>:
            </p>
            <div className="rounded-xl bg-[#0c0a08] border border-orange-900/20 p-5 font-mono text-sm text-orange-300/80 overflow-x-auto">
              <pre>{`vars:
  dim_datum_taal: 'nl'   # of 'en' voor Engelstalige kolomwaarden`}</pre>
            </div>
          </section>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-orange-900/20">
            <a
              href="https://github.com/Steef-Datamodder/datamodder_utils/tree/main/macros/date_dimension"
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
