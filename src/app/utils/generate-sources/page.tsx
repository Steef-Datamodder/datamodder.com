import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Wand2, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Generate Sources — Utils — Datamodder",
  description: "code generator macro die automatisch sources.yml, stagingmodellen en dbt_project.yml snippets genereert vanuit Snowflake metadata.",
};

const macros = [
  {
    name: "generate_source_yaml",
    params: "database, schemas?, split?",
    desc: "Genereert een kant-en-klare sources.yml op basis van de tabellen en kolommen die in Snowflake staan. Vermeldt alle tabellen per schema, inclusief kolomdefinities. Met split: true wordt de output per schema gesplitst.",
  },
  {
    name: "generate_staging_models",
    params: "database, schemas?",
    desc: "Genereert voor elke tabel een eenvoudig SQL stagingmodel met een select * from source(). De bestandsnaam en het pad worden als commentaar bovenaan meegegeven, zodat je de bestanden direct kunt aanmaken.",
  },
  {
    name: "generate_dbt_project_snippet",
    params: "database, schemas?",
    desc: "Genereert het staging-blok voor dbt_project.yml, georganiseerd per schema in submappen. Alle modellen staan standaard op disabled: true, zodat je ze bewust activeert.",
  },
];

export default function GenerateSourcesPage() {
  return (
    <>
      <div className="pt-28 pb-24 px-6">
        <div className="max-w-3xl mx-auto">

          <Link href="/utils" className="inline-flex items-center gap-2 text-[#9a8f85] text-sm hover:text-orange-400 transition-colors mb-10">
            <ArrowLeft size={14} /> Terug naar Utils
          </Link>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 flex-shrink-0">
              <Wand2 size={24} />
            </div>
            <div>
              <p className="text-orange-500/70 text-xs font-semibold uppercase tracking-widest mb-0.5">dbt macro</p>
              <h1 className="text-3xl font-black text-[#f5f0eb]">Generate Sources</h1>
            </div>
          </div>
          <p className="text-[#9a8f85] text-lg leading-relaxed mb-12">
            Genereer automatisch dbt sources, stagingmodellen en projectconfiguratie rechtstreeks vanuit je Snowflake database.
          </p>

          {/* Doel */}
          <section className="mb-12">
            <h2 className="text-xl font-black text-[#f5f0eb] mb-4">Doel</h2>
            <p className="text-[#9a8f85] leading-relaxed mb-4">
              Bij het onboarden van een nieuwe databron in dbt moet je handmatig sources.yml bijhouden, stagingmodellen aanmaken en dbt_project.yml uitbreiden. Bij tientallen tabellen is dat tijdrovend en foutgevoelig. Generate Sources legt die boilerplate weg door de Snowflake information schema te bevragen en de benodigde bestanden voor je te genereren.
            </p>
            <p className="text-[#9a8f85] leading-relaxed">
              Je roept de macro aan in een dbt-sessie, kopieert de output naar de juiste bestanden en hebt direct een werkende basis voor je staginglaag.
            </p>
          </section>

          {/* Macros */}
          <section className="mb-12">
            <h2 className="text-xl font-black text-[#f5f0eb] mb-4">Wat je kunt verwachten</h2>
            <p className="text-[#9a8f85] leading-relaxed mb-6">
              De macro bestaat uit drie onderdelen die je los of in combinatie gebruikt:
            </p>
            <div className="space-y-4">
              {macros.map(({ name, params, desc }) => (
                <div key={name} className="p-5 rounded-xl bg-[#1a1612] border border-orange-900/20">
                  <div className="flex flex-wrap items-baseline gap-2 mb-2">
                    <p className="font-mono text-orange-300/80 text-sm">{name}</p>
                    <p className="font-mono text-[#9a8f85]/50 text-xs">({params})</p>
                  </div>
                  <p className="text-[#9a8f85] text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Gebruik */}
          <section className="mb-12">
            <h2 className="text-xl font-black text-[#f5f0eb] mb-4">Gebruik</h2>

            <h3 className="text-[#f5f0eb] font-semibold mb-2 text-sm">1. Sources YAML genereren</h3>
            <p className="text-[#9a8f85] text-sm mb-3">
              Roep de macro aan via <span className="text-orange-400 font-mono">dbt run-operation</span>. De output is direct kopieerbaar als <span className="text-orange-400 font-mono">sources.yml</span>:
            </p>
            <div className="rounded-xl bg-[#0c0a08] border border-orange-900/20 p-5 font-mono text-sm text-orange-300/80 mb-6 overflow-x-auto">
              <pre>{`dbt run-operation generate_source_yaml \\
  --args '{"database": "MIJN_DB", "schemas": ["RAW", "LANDING"]}'`}</pre>
            </div>

            <h3 className="text-[#f5f0eb] font-semibold mb-2 text-sm">2. Stagingmodellen genereren</h3>
            <p className="text-[#9a8f85] text-sm mb-3">
              Genereer voor elke tabel een SQL stagingbestand. Het pad staat als commentaar in de output:
            </p>
            <div className="rounded-xl bg-[#0c0a08] border border-orange-900/20 p-5 font-mono text-sm text-orange-300/80 mb-6 overflow-x-auto">
              <pre>{`dbt run-operation generate_staging_models \\
  --args '{"database": "MIJN_DB"}'

-- Output voorbeeld:
-- models/staging/raw/stg_raw__klanten.sql
select * from {{ source('raw', 'klanten') }}`}</pre>
            </div>

            <h3 className="text-[#f5f0eb] font-semibold mb-2 text-sm">3. dbt_project.yml snippet genereren</h3>
            <p className="text-[#9a8f85] text-sm mb-3">
              Genereer de bijbehorende projectconfiguratie, klaar om in <span className="text-orange-400 font-mono">dbt_project.yml</span> te plakken:
            </p>
            <div className="rounded-xl bg-[#0c0a08] border border-orange-900/20 p-5 font-mono text-sm text-orange-300/80 overflow-x-auto">
              <pre>{`dbt run-operation generate_dbt_project_snippet \\
  --args '{"database": "MIJN_DB"}'

-- Output voorbeeld:
models:
  mijn_project:
    staging:
      raw:
        +schema: raw
        +enabled: false`}</pre>
            </div>
          </section>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-orange-900/20">
            <a
              href="https://github.com/Steef-Datamodder/datamodder_utils/tree/main/macros/generate_sources"
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
