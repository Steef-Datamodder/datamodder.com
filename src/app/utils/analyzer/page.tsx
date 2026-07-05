import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Search, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Analyzer — Utils — Datamodder",
  description: "Snowflake stored procedure voor automatische datakwaliteitsanalyse en profieling van tabellen.",
};

const procedures = [
  {
    name: "create_pit()",
    desc: "Maakt een point-in-time snapshot van een brontabel door een kloon aan te maken met een tijdstempel in de naam (bijv. KLANTEN_20240412_143000). Zo kun je de toestand van een tabel op elk moment vastleggen.",
  },
  {
    name: "register_pits()",
    desc: "Registreert nieuwe snapshots in een statistiekenregister. Haalt tabel- en kolommetadata op en koppelt de tijdstempel uit de tabelnaam, zodat alle PITs traceerbaar zijn.",
  },
  {
    name: "update_statistics()",
    desc: "Berekent datakwaliteitsmetrieken over alle geregistreerde snapshots: null-tellingen, distinct waarden, min- en maxwaarden, en drempeloverschrijdingen voor tekstlengte, numerieke ranges en datumranges.",
  },
];

const metrics = [
  { metric: "Null count", desc: "Aantal lege waarden per kolom" },
  { metric: "Distinct count", desc: "Aantal unieke waarden per kolom" },
  { metric: "Min / Max", desc: "Laagste en hoogste waarde" },
  { metric: "Tekstlengte", desc: "Overschrijdingen van configureerbare maximale lengte" },
  { metric: "Numerieke range", desc: "Waarden buiten een configureerbaar bereik" },
  { metric: "Datumrange", desc: "Datums buiten verwachte periode" },
];

export default function AnalyzerPage() {
  return (
    <>
      <div className="pt-28 pb-24 px-6">
        <div className="max-w-3xl mx-auto">

          <Link href="/utils" className="inline-flex items-center gap-2 text-[#9a8f85] text-sm hover:text-orange-400 transition-colors mb-10">
            <ArrowLeft size={14} /> Terug naar Utils
          </Link>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 flex-shrink-0">
              <Search size={24} />
            </div>
            <div>
              <p className="text-orange-500/70 text-xs font-semibold uppercase tracking-widest mb-0.5">Stored Procedure</p>
              <h1 className="text-3xl font-black text-[#f5f0eb]">Analyzer</h1>
            </div>
          </div>
          <p className="text-[#9a8f85] text-lg leading-relaxed mb-12">
            Automatische datakwaliteitsprofieling van Snowflake tabellen, via point-in-time snapshots en statistieken.
          </p>

          {/* Doel */}
          <section className="mb-12">
            <h2 className="text-xl font-black text-[#f5f0eb] mb-4">Doel</h2>
            <p className="text-[#9a8f85] leading-relaxed mb-4">
              Bij het onboarden van een nieuwe databron wil je snel weten wat er in zit: hoeveel nulls, welke ranges, hoe uniek zijn de waarden? De Analyzer bouwt een systematisch kwaliteitsprofiel op door tabellen als snapshot vast te leggen en daar geautomatiseerd statistieken over te berekenen, zonder dat je handmatig query&apos;s hoeft te schrijven.
            </p>
            <p className="text-[#9a8f85] leading-relaxed">
              Door snapshots in de tijd te vergelijken kun je ook veranderingen in de datakwaliteit signaleren: zijn er plotseling meer nulls? Is een kolom uit zijn range gelopen?
            </p>
          </section>

          {/* Procedures */}
          <section className="mb-12">
            <h2 className="text-xl font-black text-[#f5f0eb] mb-4">Wat je kunt verwachten</h2>
            <p className="text-[#9a8f85] leading-relaxed mb-6">
              De Analyzer bestaat uit drie stored procedures die je in volgorde aanroept:
            </p>
            <div className="space-y-3 mb-8">
              {procedures.map(({ name, desc }) => (
                <div key={name} className="p-5 rounded-xl bg-[#1a1612] border border-orange-900/20">
                  <p className="font-mono text-orange-300/80 text-sm mb-1">{name}</p>
                  <p className="text-[#9a8f85] text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>

            <p className="text-[#9a8f85] text-sm mb-4">Berekende statistieken per kolom:</p>
            <div className="rounded-xl bg-[#1a1612] border border-orange-900/20 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-orange-900/20">
                    <th className="text-left px-5 py-3 text-orange-400 font-semibold text-xs uppercase tracking-widest">Metriek</th>
                    <th className="text-left px-5 py-3 text-orange-400 font-semibold text-xs uppercase tracking-widest">Beschrijving</th>
                  </tr>
                </thead>
                <tbody className="text-[#9a8f85]">
                  {metrics.map(({ metric, desc }) => (
                    <tr key={metric} className="border-b border-orange-900/10 last:border-0">
                      <td className="px-5 py-3 text-xs font-semibold text-[#f5f0eb]/70">{metric}</td>
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

            <h3 className="text-[#f5f0eb] font-semibold mb-2 text-sm">1. Setup uitvoeren</h3>
            <p className="text-[#9a8f85] text-sm mb-3">
              Voer <span className="text-orange-400 font-mono">setup.sql</span> uit om de benodigde schema&apos;s en registratietabellen aan te maken, daarna <span className="text-orange-400 font-mono">create_analyze_sp.sql</span> om de procedures te installeren.
            </p>

            <h3 className="text-[#f5f0eb] font-semibold mb-2 text-sm">2. Snapshot aanmaken</h3>
            <div className="rounded-xl bg-[#0c0a08] border border-orange-900/20 p-5 font-mono text-sm text-orange-300/80 mb-6 overflow-x-auto">
              <pre>{`CALL datamodder.create_pit(
  source_db  => 'MIJN_DB',
  source_sch => 'RAW',
  source_tbl => 'KLANTEN'
);
-- Maakt: MIJN_DB.RAW.KLANTEN_20240412_143000`}</pre>
            </div>

            <h3 className="text-[#f5f0eb] font-semibold mb-2 text-sm">3. Snapshot registreren en analyseren</h3>
            <div className="rounded-xl bg-[#0c0a08] border border-orange-900/20 p-5 font-mono text-sm text-orange-300/80 overflow-x-auto">
              <pre>{`CALL datamodder.register_pits();
CALL datamodder.update_statistics();

-- Bekijk de resultaten:
SELECT * FROM datamodder.statistics
ORDER BY snapshot_ts DESC;`}</pre>
            </div>
          </section>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-orange-900/20">
            <a
              href="https://github.com/Steef-Datamodder/datamodder_utils/tree/main/Stored%20Procedure/analyze"
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
