import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BarChart2, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Analyze App — Utils — Datamodder",
  description: "Streamlit app voor het aanmaken en beheren van point-in-time snapshots en kolomstatistieken in Snowflake.",
};

const actions = [
  ["Create PIT", "create_pit(db, schema, table)", "Maakt een snapshottabel aan met naam {TABEL}_{YYYYMMDD}_{HH24MISS} in het PIT-schema."],
  ["Register PITs", "register_pits()", "Scant het PIT-schema en registreert alle snapshottabellen in de metadata."],
  ["Update statistics", "update_statistics()", "Berekent kolomstatistieken voor alle geregistreerde PITs."],
];

const targetFields = [
  ["Database", "datamodder", "Snowflake-database waar de analyze-schema's in staan."],
  ["PIT schema", "analyze", "Schema waar de snapshottabellen worden aangemaakt."],
  ["Agg schema", "analyzer_agg", "Schema waar de statistics-aggregatietabel staat."],
];

export default function AnalyzeAppPage() {
  return (
    <>
      <div className="pt-28 pb-24 px-6">
        <div className="max-w-3xl mx-auto">

          <Link href="/utils" className="inline-flex items-center gap-2 text-[#9a8f85] text-sm hover:text-orange-400 transition-colors mb-10">
            <ArrowLeft size={14} /> Terug naar Utils
          </Link>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 flex-shrink-0">
              <BarChart2 size={24} />
            </div>
            <div>
              <p className="text-orange-500/70 text-xs font-semibold uppercase tracking-widest mb-0.5">Streamlit app</p>
              <h1 className="text-3xl font-black text-[#f5f0eb]">Analyze</h1>
            </div>
          </div>
          <p className="text-[#9a8f85] text-lg leading-relaxed mb-12">
            Grafische frontend voor de Analyzer stored procedures — maak point-in-time snapshots van brontabellen en bekijk kolomstatistieken direct in de browser.
          </p>

          {/* Doel */}
          <section className="mb-12">
            <h2 className="text-xl font-black text-[#f5f0eb] mb-4">Doel</h2>
            <p className="text-[#9a8f85] leading-relaxed mb-4">
              De Analyzer stored procedures zijn krachtig maar vergen handmatige SQL-aanroepen met sessievariabelen. Deze app maakt dat proces visueel: je selecteert een tabel, klikt op een knop, en de app roept de juiste procedure aan met de correcte variabelen — inclusief overzicht van alle snapshots en hun statistieken.
            </p>
            <p className="text-[#9a8f85] leading-relaxed">
              Statistieken worden weergegeven met voorwaardelijke opmaak: kolommen met nulls krijgen een gele achtergrond, kolommen buiten de verwachte range een rode.
            </p>
          </section>

          {/* Acties */}
          <section className="mb-12">
            <h2 className="text-xl font-black text-[#f5f0eb] mb-4">Acties</h2>
            <div className="rounded-xl bg-[#1a1612] border border-orange-900/20 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-orange-900/20">
                    <th className="text-left px-5 py-3 text-orange-400 font-semibold text-xs uppercase tracking-widest">Knop</th>
                    <th className="text-left px-5 py-3 text-orange-400 font-semibold font-mono text-xs">Procedure</th>
                    <th className="text-left px-5 py-3 text-orange-400 font-semibold text-xs uppercase tracking-widest">Beschrijving</th>
                  </tr>
                </thead>
                <tbody className="text-[#9a8f85]">
                  {actions.map(([knop, proc, desc]) => (
                    <tr key={knop} className="border-b border-orange-900/10 last:border-0">
                      <td className="px-5 py-3 text-xs font-semibold text-[#f5f0eb]">{knop}</td>
                      <td className="px-5 py-3 font-mono text-orange-300/70 text-xs">{proc}</td>
                      <td className="px-5 py-3 text-xs">{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Target configuratie */}
          <section className="mb-12">
            <h2 className="text-xl font-black text-[#f5f0eb] mb-4">Configuratie</h2>
            <p className="text-[#9a8f85] text-sm mb-4">Standaardwaarden komen overeen met de datamodder_utils setup:</p>
            <div className="rounded-xl bg-[#1a1612] border border-orange-900/20 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-orange-900/20">
                    <th className="text-left px-5 py-3 text-orange-400 font-semibold text-xs uppercase tracking-widest">Veld</th>
                    <th className="text-left px-5 py-3 text-orange-400 font-semibold text-xs uppercase tracking-widest">Standaard</th>
                    <th className="text-left px-5 py-3 text-orange-400 font-semibold text-xs uppercase tracking-widest">Beschrijving</th>
                  </tr>
                </thead>
                <tbody className="text-[#9a8f85]">
                  {targetFields.map(([veld, def, desc]) => (
                    <tr key={veld} className="border-b border-orange-900/10 last:border-0">
                      <td className="px-5 py-3 text-xs font-semibold text-[#f5f0eb]">{veld}</td>
                      <td className="px-5 py-3 font-mono text-orange-300/70 text-xs">{def}</td>
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

            <h3 className="text-[#f5f0eb] font-semibold mb-2 text-sm">1. Start de app</h3>
            <div className="rounded-xl bg-[#0c0a08] border border-orange-900/20 p-5 font-mono text-sm text-orange-300/80 mb-6 overflow-x-auto">
              <pre>{`streamlit\\analyze\\start.cmd`}</pre>
            </div>

            <h3 className="text-[#f5f0eb] font-semibold mb-2 text-sm">2. Verbind met Snowflake</h3>
            <p className="text-[#9a8f85] text-sm mb-6">
              Vul account, gebruikersnaam en wachtwoord in de zijbalk in. De app slaat account en gebruikersnaam op in <span className="text-orange-400 font-mono">~/.streamlit_sources.json</span> en het wachtwoord via Windows Credential Manager.
            </p>

            <h3 className="text-[#f5f0eb] font-semibold mb-2 text-sm">3. Selecteer bron en voer acties uit</h3>
            <p className="text-[#9a8f85] text-sm">
              Kies database, schema en tabel. Gebruik de knoppen om een PIT aan te maken, te registreren of statistieken bij te werken. Selecteer daarna een PIT uit de lijst om de kolomstatistieken te bekijken.
            </p>
          </section>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-orange-900/20">
            <a
              href="https://github.com/Steef-Datamodder/datamodder_utils/tree/main/streamlit/analyze"
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
