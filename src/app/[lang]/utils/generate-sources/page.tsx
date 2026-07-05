import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Wand2, ExternalLink } from "lucide-react";
import { dict } from "@/lib/i18n";
import type { Lang } from "@/lib/i18n";

type PageProps = { params: Promise<{ lang: string }> };

const content = {
  nl: {
    meta: { title: "Generate Sources — Utils — Datamodder", description: "code generator macro die automatisch sources.yml, stagingmodellen en dbt_project.yml snippets genereert vanuit Snowflake metadata." },
    lead: "Genereer automatisch dbt sources, stagingmodellen en projectconfiguratie rechtstreeks vanuit je Snowflake database.",
    goalP1: "Bij het onboarden van een nieuwe databron in dbt moet je handmatig sources.yml bijhouden, stagingmodellen aanmaken en dbt_project.yml uitbreiden. Bij tientallen tabellen is dat tijdrovend en foutgevoelig. Generate Sources legt die boilerplate weg door de Snowflake information schema te bevragen en de benodigde bestanden voor je te genereren.",
    goalP2: "Je roept de macro aan in een dbt-sessie, kopieert de output naar de juiste bestanden en hebt direct een werkende basis voor je staginglaag.",
    macrosLabel: "De macro bestaat uit drie onderdelen die je los of in combinatie gebruikt:",
    macros: [
      { name: "generate_source_yaml", params: "database, schemas?, split?", desc: "Genereert een kant-en-klare sources.yml op basis van de tabellen en kolommen die in Snowflake staan. Met split: true wordt de output per schema gesplitst." },
      { name: "generate_staging_models", params: "database, schemas?", desc: "Genereert voor elke tabel een eenvoudig SQL stagingmodel met een select * from source(). De bestandsnaam en het pad worden als commentaar bovenaan meegegeven." },
      { name: "generate_dbt_project_snippet", params: "database, schemas?", desc: "Genereert het staging-blok voor dbt_project.yml, georganiseerd per schema in submappen. Alle modellen staan standaard op disabled: true." },
    ],
    step1: "1. Sources YAML genereren",
    step1Body: "Roep de macro aan via",
    step1Body2: "De output is direct kopieerbaar als",
    step2: "2. Stagingmodellen genereren",
    step2Body: "Genereer voor elke tabel een SQL stagingbestand. Het pad staat als commentaar in de output:",
    step3: "3. dbt_project.yml snippet genereren",
    step3Body: "Genereer de bijbehorende projectconfiguratie, klaar om in",
    step3Body2: "te plakken:",
  },
  en: {
    meta: { title: "Generate Sources — Utils — Datamodder", description: "Code generator macro that automatically generates sources.yml, staging models and dbt_project.yml snippets from Snowflake metadata." },
    lead: "Automatically generate dbt sources, staging models and project configuration directly from your Snowflake database.",
    goalP1: "When onboarding a new data source in dbt you have to manually maintain sources.yml, create staging models and extend dbt_project.yml. With dozens of tables that is time-consuming and error-prone. Generate Sources removes that boilerplate by querying the Snowflake information schema and generating the required files for you.",
    goalP2: "You call the macro in a dbt session, copy the output to the right files and immediately have a working base for your staging layer.",
    macrosLabel: "The macro consists of three parts that you use separately or in combination:",
    macros: [
      { name: "generate_source_yaml", params: "database, schemas?, split?", desc: "Generates a ready-to-use sources.yml based on the tables and columns in Snowflake. With split: true the output is split per schema." },
      { name: "generate_staging_models", params: "database, schemas?", desc: "Generates a simple SQL staging model with a select * from source() for each table. The file name and path are given as comments at the top." },
      { name: "generate_dbt_project_snippet", params: "database, schemas?", desc: "Generates the staging block for dbt_project.yml, organised per schema in subdirectories. All models default to disabled: true." },
    ],
    step1: "1. Generate sources YAML",
    step1Body: "Call the macro via",
    step1Body2: "The output is directly copyable as",
    step2: "2. Generate staging models",
    step2Body: "Generate a SQL staging file for each table. The path is given as a comment in the output:",
    step3: "3. Generate dbt_project.yml snippet",
    step3Body: "Generate the corresponding project configuration, ready to paste into",
    step3Body2: ":",
  },
  de: {
    meta: { title: "Generate Sources — Utils — Datamodder", description: "Code-Generator-Makro, das automatisch sources.yml, Staging-Modelle und dbt_project.yml-Snippets aus Snowflake-Metadaten generiert." },
    lead: "Generieren Sie automatisch dbt-Sources, Staging-Modelle und Projektkonfiguration direkt aus Ihrer Snowflake-Datenbank.",
    goalP1: "Beim Onboarding einer neuen Datenquelle in dbt müssen Sie sources.yml manuell pflegen, Staging-Modelle anlegen und dbt_project.yml erweitern. Bei Dutzenden von Tabellen ist das zeitaufwändig und fehleranfällig. Generate Sources beseitigt diesen Boilerplate, indem es das Snowflake Information Schema abfragt und die benötigten Dateien für Sie generiert.",
    goalP2: "Sie rufen das Makro in einer dbt-Sitzung auf, kopieren die Ausgabe in die richtigen Dateien und haben sofort eine funktionsfähige Basis für Ihre Staging-Schicht.",
    macrosLabel: "Das Makro besteht aus drei Teilen, die Sie einzeln oder in Kombination verwenden:",
    macros: [
      { name: "generate_source_yaml", params: "database, schemas?, split?", desc: "Generiert eine sofort einsatzbereite sources.yml basierend auf den Tabellen und Spalten in Snowflake. Mit split: true wird die Ausgabe pro Schema aufgeteilt." },
      { name: "generate_staging_models", params: "database, schemas?", desc: "Generiert für jede Tabelle ein einfaches SQL-Staging-Modell mit einem select * from source(). Dateiname und Pfad werden als Kommentar oben angegeben." },
      { name: "generate_dbt_project_snippet", params: "database, schemas?", desc: "Generiert den Staging-Block für dbt_project.yml, organisiert pro Schema in Unterordnern. Alle Modelle sind standardmäßig auf disabled: true gesetzt." },
    ],
    step1: "1. Sources-YAML generieren",
    step1Body: "Rufen Sie das Makro über",
    step1Body2: "auf. Die Ausgabe ist direkt kopierbar als",
    step2: "2. Staging-Modelle generieren",
    step2Body: "Generieren Sie für jede Tabelle eine SQL-Staging-Datei. Der Pfad steht als Kommentar in der Ausgabe:",
    step3: "3. dbt_project.yml-Snippet generieren",
    step3Body: "Generieren Sie die zugehörige Projektkonfiguration, bereit zum Einfügen in",
    step3Body2: ":",
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  return content[(lang as Lang)]?.meta ?? content.nl.meta;
}

export default async function GenerateSourcesPage({ params }: PageProps) {
  const { lang } = await params;
  const t = content[(lang as Lang)] ?? content.nl;
  const u = dict[(lang as Lang)]?.utils ?? dict.nl.utils;

  return (
    <div className="pt-28 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href={`/${lang}/utils`} className="inline-flex items-center gap-2 text-[#9a8f85] text-sm hover:text-orange-400 transition-colors mb-10">
          <ArrowLeft size={14} /> {u.back}
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
        <p className="text-[#9a8f85] text-lg leading-relaxed mb-12">{t.lead}</p>

        <section className="mb-12">
          <h2 className="text-xl font-black text-[#f5f0eb] mb-4">{u.goal}</h2>
          <p className="text-[#9a8f85] leading-relaxed mb-4">{t.goalP1}</p>
          <p className="text-[#9a8f85] leading-relaxed">{t.goalP2}</p>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-black text-[#f5f0eb] mb-4">{u.whatToExpect}</h2>
          <p className="text-[#9a8f85] leading-relaxed mb-6">{t.macrosLabel}</p>
          <div className="space-y-4">
            {t.macros.map(({ name, params: p, desc }) => (
              <div key={name} className="p-5 rounded-xl bg-[#1a1612] border border-orange-900/20">
                <div className="flex flex-wrap items-baseline gap-2 mb-2">
                  <p className="font-mono text-orange-300/80 text-sm">{name}</p>
                  <p className="font-mono text-[#9a8f85]/50 text-xs">({p})</p>
                </div>
                <p className="text-[#9a8f85] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-black text-[#f5f0eb] mb-4">{u.usage}</h2>

          <h3 className="text-[#f5f0eb] font-semibold mb-2 text-sm">{t.step1}</h3>
          <p className="text-[#9a8f85] text-sm mb-3">
            {t.step1Body} <span className="text-orange-400 font-mono">dbt run-operation</span>. {t.step1Body2} <span className="text-orange-400 font-mono">sources.yml</span>:
          </p>
          <div className="rounded-xl bg-[#0c0a08] border border-orange-900/20 p-5 font-mono text-sm text-orange-300/80 mb-6 overflow-x-auto">
            <pre>{`dbt run-operation generate_source_yaml \\
  --args '{"database": "MY_DB", "schemas": ["RAW", "LANDING"]}'`}</pre>
          </div>

          <h3 className="text-[#f5f0eb] font-semibold mb-2 text-sm">{t.step2}</h3>
          <p className="text-[#9a8f85] text-sm mb-3">{t.step2Body}</p>
          <div className="rounded-xl bg-[#0c0a08] border border-orange-900/20 p-5 font-mono text-sm text-orange-300/80 mb-6 overflow-x-auto">
            <pre>{`dbt run-operation generate_staging_models \\
  --args '{"database": "MY_DB"}'

-- Example output:
-- models/staging/raw/stg_raw__customers.sql
select * from {{ source('raw', 'customers') }}`}</pre>
          </div>

          <h3 className="text-[#f5f0eb] font-semibold mb-2 text-sm">{t.step3}</h3>
          <p className="text-[#9a8f85] text-sm mb-3">
            {t.step3Body} <span className="text-orange-400 font-mono">dbt_project.yml</span>{t.step3Body2}
          </p>
          <div className="rounded-xl bg-[#0c0a08] border border-orange-900/20 p-5 font-mono text-sm text-orange-300/80 overflow-x-auto">
            <pre>{`dbt run-operation generate_dbt_project_snippet \\
  --args '{"database": "MY_DB"}'

-- Example output:
models:
  my_project:
    staging:
      raw:
        +schema: raw
        +enabled: false`}</pre>
          </div>
        </section>

        <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-orange-900/20">
          <a href="https://github.com/Steef-Datamodder/datamodder_utils/tree/main/macros/generate_sources" target="_blank" rel="noopener noreferrer"
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
