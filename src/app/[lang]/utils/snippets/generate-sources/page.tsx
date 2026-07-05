import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { dict } from "@/lib/i18n";
import type { Lang } from "@/lib/i18n";

type PageProps = { params: Promise<{ lang: string }> };

const code = `-- Generate sources.yml for all schemas in a database:
dbt run-operation generate_source_yaml \\
  --args '{"database": "MY_DB"}'

-- Or for specific schemas:
dbt run-operation generate_source_yaml \\
  --args '{"database": "MY_DB", "schemas": ["RAW", "LANDING"]}'

-- Per-schema split output:
dbt run-operation generate_source_yaml \\
  --args '{"database": "MY_DB", "split": true}'


-- Generate staging models (SQL per table):
dbt run-operation generate_staging_models \\
  --args '{"database": "MY_DB"}'

-- For specific schemas:
dbt run-operation generate_staging_models \\
  --args '{"database": "MY_DB", "schemas": ["RAW"]}'


-- Generate dbt_project.yml snippet:
dbt run-operation generate_dbt_project_snippet \\
  --args '{"database": "MY_DB"}'`;

const content = {
  nl: {
    meta: { title: "Snippet: Generate Sources — Utils — Datamodder", description: "Kant-en-klare dbt run-operation commando's voor het genereren van sources, stagingmodellen en projectconfiguratie." },
    lead: "Kant-en-klare",
    lead2: "commando's voor het genereren van sources, stagingmodellen en projectconfiguratie. Kopieer en pas de database- en schemanamen aan.",
    moreInfo: "Meer uitleg over Generate Sources?",
    docLink: "Bekijk de volledige documentatie →",
  },
  en: {
    meta: { title: "Snippet: Generate Sources — Utils — Datamodder", description: "Ready-to-use dbt run-operation commands for generating sources, staging models and project configuration." },
    lead: "Ready-to-use",
    lead2: "commands for generating sources, staging models and project configuration. Copy and adjust the database and schema names.",
    moreInfo: "Want more details about Generate Sources?",
    docLink: "View the full documentation →",
  },
  de: {
    meta: { title: "Snippet: Generate Sources — Utils — Datamodder", description: "Sofort einsatzbereite dbt run-operation Befehle zum Generieren von Sources, Staging-Modellen und Projektkonfiguration." },
    lead: "Sofort einsatzbereite",
    lead2: "Befehle zum Generieren von Sources, Staging-Modellen und Projektkonfiguration. Kopieren und passen Sie die Datenbank- und Schemanamen an.",
    moreInfo: "Mehr Infos zu Generate Sources?",
    docLink: "Vollständige Dokumentation ansehen →",
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  return content[(lang as Lang)]?.meta ?? content.nl.meta;
}

export default async function SnippetGenerateSourcesPage({ params }: PageProps) {
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
          <p className="text-orange-500/70 text-xs font-semibold uppercase tracking-widest mb-2">Snippet · dbt</p>
          <h1 className="text-3xl font-black text-[#f5f0eb] mb-3">Generate Sources</h1>
          <p className="text-[#9a8f85] leading-relaxed">
            {t.lead} <span className="text-orange-400 font-mono text-sm">dbt run-operation</span> {t.lead2}
          </p>
        </div>

        <div className="my-10 rounded-xl bg-[#0c0a08] border border-orange-900/20 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-orange-900/20">
            <span className="text-[#9a8f85] text-xs font-mono">generate_sources.sql</span>
          </div>
          <pre className="p-5 font-mono text-sm text-orange-300/80 overflow-x-auto leading-relaxed whitespace-pre">{code}</pre>
        </div>

        <p className="text-[#9a8f85] text-sm mb-10">
          {t.moreInfo}{" "}
          <Link href={`/${lang}/utils/generate-sources`} className="text-orange-400 hover:text-orange-300 transition-colors">
            {t.docLink}
          </Link>
        </p>

        <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-orange-900/20">
          <a href="https://github.com/Steef-Datamodder/datamodder_utils/blob/main/snippets/generate_sources.sql" target="_blank" rel="noopener noreferrer"
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
