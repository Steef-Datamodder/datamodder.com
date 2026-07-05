import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Snippet: Generate Sources — Utils — Datamodder",
  description: "Kant-en-klare dbt run-operation commando's voor het genereren van sources, stagingmodellen en projectconfiguratie.",
};

const code = `-- Genereer sources.yml voor alle schemas in een database:
dbt run-operation generate_source_yaml \\
  --args '{"database": "MIJN_DB"}'

-- Of voor specifieke schemas:
dbt run-operation generate_source_yaml \\
  --args '{"database": "MIJN_DB", "schemas": ["RAW", "LANDING"]}'

-- Per schema gesplitste output:
dbt run-operation generate_source_yaml \\
  --args '{"database": "MIJN_DB", "split": true}'


-- Genereer stagingmodellen (SQL per tabel):
dbt run-operation generate_staging_models \\
  --args '{"database": "MIJN_DB"}'

-- Voor specifieke schemas:
dbt run-operation generate_staging_models \\
  --args '{"database": "MIJN_DB", "schemas": ["RAW"]}'


-- Genereer dbt_project.yml snippet:
dbt run-operation generate_dbt_project_snippet \\
  --args '{"database": "MIJN_DB"}'`;

export default function SnippetGenerateSourcesPage() {
  return (
    <>
      <div className="pt-28 pb-24 px-6">
        <div className="max-w-3xl mx-auto">

          <Link href="/utils" className="inline-flex items-center gap-2 text-[#9a8f85] text-sm hover:text-orange-400 transition-colors mb-10">
            <ArrowLeft size={14} /> Terug naar Utils
          </Link>

          <div className="mb-4">
            <p className="text-orange-500/70 text-xs font-semibold uppercase tracking-widest mb-2">Snippet · dbt</p>
            <h1 className="text-3xl font-black text-[#f5f0eb] mb-3">Generate Sources</h1>
            <p className="text-[#9a8f85] leading-relaxed">
              Kant-en-klare <span className="text-orange-400 font-mono text-sm">dbt run-operation</span> commando&apos;s voor het genereren van sources, stagingmodellen en projectconfiguratie. Kopieer en pas de database- en schemanamen aan.
            </p>
          </div>

          <div className="my-10 rounded-xl bg-[#0c0a08] border border-orange-900/20 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 border-b border-orange-900/20">
              <span className="text-[#9a8f85] text-xs font-mono">generate_sources.sql</span>
            </div>
            <pre className="p-5 font-mono text-sm text-orange-300/80 overflow-x-auto leading-relaxed whitespace-pre">{code}</pre>
          </div>

          <p className="text-[#9a8f85] text-sm mb-10">
            Meer uitleg over Generate Sources?{" "}
            <Link href="/utils/generate-sources" className="text-orange-400 hover:text-orange-300 transition-colors">
              Bekijk de volledige documentatie →
            </Link>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-orange-900/20">
            <a
              href="https://github.com/Steef-Datamodder/datamodder_utils/blob/main/snippets/generate_sources.sql"
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
