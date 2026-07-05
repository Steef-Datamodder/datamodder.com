import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { dict } from "@/lib/i18n";
import type { Lang } from "@/lib/i18n";

type PageProps = { params: Promise<{ lang: string }> };

const code = `-- Step 1: one-time setup (run create_analyze_sp.sql first)

-- Step 2: create a point-in-time snapshot of a table
CALL datamodder.create_pit();

-- Or with explicit parameters:
CALL datamodder.create_pit(
  source_db  => 'MY_DB',
  source_sch => 'RAW',
  source_tbl => 'CUSTOMERS'
);

-- Step 3: register new snapshots in the statistics register
CALL datamodder.register_pits();

-- Step 4: calculate column statistics over all registered snapshots
CALL datamodder.update_statistics();

-- View the results:
SELECT * FROM datamodder.statistics
ORDER BY snapshot_ts DESC;`;

const content = {
  nl: {
    meta: { title: "Snippet: Analyzer — Utils — Datamodder", description: "Kant-en-klare SQL snippet voor het uitvoeren van de Analyzer stored procedure in Snowflake." },
    lead: "Kant-en-klare SQL om de Analyzer stored procedure stap voor stap uit te voeren. Kopieer, pas de parameternamen aan en plak in een Snowflake worksheet.",
    moreInfo: "Meer uitleg over de Analyzer?",
    docLink: "Bekijk de volledige documentatie →",
  },
  en: {
    meta: { title: "Snippet: Analyzer — Utils — Datamodder", description: "Ready-to-use SQL snippet for running the Analyzer stored procedure in Snowflake." },
    lead: "Ready-to-use SQL to run the Analyzer stored procedure step by step. Copy, adjust the parameter names and paste into a Snowflake worksheet.",
    moreInfo: "Want more details about the Analyzer?",
    docLink: "View the full documentation →",
  },
  de: {
    meta: { title: "Snippet: Analyzer — Utils — Datamodder", description: "Sofort einsatzbereites SQL-Snippet zur Ausführung der Analyzer Stored Procedure in Snowflake." },
    lead: "Sofort einsatzbereites SQL zur schrittweisen Ausführung der Analyzer Stored Procedure. Kopieren, Parameternamen anpassen und in ein Snowflake-Worksheet einfügen.",
    moreInfo: "Mehr Infos zum Analyzer?",
    docLink: "Vollständige Dokumentation ansehen →",
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  return content[(lang as Lang)]?.meta ?? content.nl.meta;
}

export default async function SnippetAnalyzePage({ params }: PageProps) {
  const { lang } = await params;
  const t = content[(lang as Lang)] ?? content.nl;
  const u = dict[(lang as Lang)]?.utils ?? dict.nl.utils;

  return (
    <div className="pt-28 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href={`/${lang}/utils`} className="inline-flex items-center gap-2 text-[#9a8f85] text-sm hover:text-orange-400 transition-colors mb-10">
          <ArrowLeft size={14} /> {u.back}
        </Link>

        <div className="mb-4">
          <p className="text-orange-500/70 text-xs font-semibold uppercase tracking-widest mb-2">Snippet · Snowflake</p>
          <h1 className="text-3xl font-black text-[#f5f0eb] mb-3">Analyzer</h1>
          <p className="text-[#9a8f85] leading-relaxed">{t.lead}</p>
        </div>

        <div className="my-10 rounded-xl bg-[#0c0a08] border border-orange-900/20 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-orange-900/20">
            <span className="text-[#9a8f85] text-xs font-mono">analyze_sp.sql</span>
          </div>
          <pre className="p-5 font-mono text-sm text-orange-300/80 overflow-x-auto leading-relaxed whitespace-pre">{code}</pre>
        </div>

        <p className="text-[#9a8f85] text-sm mb-10">
          {t.moreInfo}{" "}
          <Link href={`/${lang}/utils/analyzer`} className="text-orange-400 hover:text-orange-300 transition-colors">
            {t.docLink}
          </Link>
        </p>

        <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-orange-900/20">
          <a href="https://github.com/Steef-Datamodder/datamodder_utils/blob/main/snippets/analyze_sp.sql" target="_blank" rel="noopener noreferrer"
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
