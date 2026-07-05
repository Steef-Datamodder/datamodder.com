import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Snippet: Analyzer — Utils — Datamodder",
  description: "Kant-en-klare SQL snippet voor het uitvoeren van de Analyzer stored procedure in Snowflake.",
};

const code = `-- Stap 1: eenmalige setup (run create_analyze_sp.sql eerst)

-- Stap 2: maak een point-in-time snapshot van een tabel
CALL datamodder.create_pit();

-- Of met expliciete parameters:
CALL datamodder.create_pit(
  source_db  => 'MIJN_DB',
  source_sch => 'RAW',
  source_tbl => 'KLANTEN'
);

-- Stap 3: registreer nieuwe snapshots in het statistiekenregister
CALL datamodder.register_pits();

-- Stap 4: bereken kolomstatistieken over alle geregistreerde snapshots
CALL datamodder.update_statistics();

-- Bekijk de resultaten:
SELECT * FROM datamodder.statistics
ORDER BY snapshot_ts DESC;`;

export default function SnippetAnalyzePage() {
  return (
    <>
      <div className="pt-28 pb-24 px-6">
        <div className="max-w-3xl mx-auto">

          <Link href="/utils" className="inline-flex items-center gap-2 text-[#9a8f85] text-sm hover:text-orange-400 transition-colors mb-10">
            <ArrowLeft size={14} /> Terug naar Utils
          </Link>

          <div className="mb-4">
            <p className="text-orange-500/70 text-xs font-semibold uppercase tracking-widest mb-2">Snippet · Snowflake</p>
            <h1 className="text-3xl font-black text-[#f5f0eb] mb-3">Analyzer</h1>
            <p className="text-[#9a8f85] leading-relaxed">
              Kant-en-klare SQL om de Analyzer stored procedure stap voor stap uit te voeren. Kopieer, pas de parameternamen aan en plak in een Snowflake worksheet.
            </p>
          </div>

          <div className="my-10 rounded-xl bg-[#0c0a08] border border-orange-900/20 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 border-b border-orange-900/20">
              <span className="text-[#9a8f85] text-xs font-mono">analyze_sp.sql</span>
            </div>
            <pre className="p-5 font-mono text-sm text-orange-300/80 overflow-x-auto leading-relaxed whitespace-pre">{code}</pre>
          </div>

          <p className="text-[#9a8f85] text-sm mb-10">
            Meer uitleg over de Analyzer?{" "}
            <Link href="/utils/analyzer" className="text-orange-400 hover:text-orange-300 transition-colors">
              Bekijk de volledige documentatie →
            </Link>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-orange-900/20">
            <a
              href="https://github.com/Steef-Datamodder/datamodder_utils/blob/main/snippets/analyze_sp.sql"
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
