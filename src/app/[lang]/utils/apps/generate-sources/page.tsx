import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, AppWindow, ExternalLink } from "lucide-react";
import { dict } from "@/lib/i18n";
import type { Lang } from "@/lib/i18n";

type PageProps = { params: Promise<{ lang: string }> };

const content = {
  nl: {
    meta: { title: "Generate Sources App — Utils — Datamodder", description: "Streamlit app die automatisch dbt sources, stagingmodellen en projectconfiguratie genereert vanuit Snowflake." },
    lead: "Genereer automatisch dbt sources, stagingmodellen en projectconfiguratie vanuit Snowflake — via een lokale app met een grafische interface.",
    goalP1: "De",
    goalP1b: "dbt-macro werkt prima in de terminal, maar deze Streamlit-app maakt het proces visueel: je kiest je database en schema's via dropdowns, ziet de gegenereerde code direct in syntaxkleuring, en schrijft de bestanden met één klik weg naar je dbt-project.",
    goalP2: "Handig bij het onboarden van nieuwe databronnen waarbij je snel een werkende staginglaag wil opzetten zonder handmatig YAML of SQL te schrijven.",
    featuresLabel: "Functies",
    features: [
      { title: "Snowflake-verbinding", desc: "Sla je accountgegevens en wachtwoord lokaal op via keyring. De app onthoudt je vorige instellingen zodat je niet elke keer opnieuw hoeft in te loggen." },
      { title: "Database & schema selectie", desc: "Kies een database en filter op één of meerdere schema's. De app haalt tabel- en kolommetadata op via het Snowflake information schema." },
      { title: "Gegenereerde output", desc: "Bekijk de gegenereerde bestanden per tab met syntaxkleuring voordat je ze wegschrijft. Kies voor één gecombineerde sources.yml of een apart bestand per schema." },
      { title: "Bestanden wegschrijven", desc: "De app schrijft de gegenereerde bestanden direct naar je dbt-projectmap onder models/staging/ — inclusief de juiste mapstructuur." },
    ],
    outputsLabel: "Gegenereerde bestanden",
    fileHeader: "Bestand", contentHeader: "Inhoud",
    outputs: [
      ["sources.yml", "Source-definities met kolommetadata, per schema of gecombineerd."],
      ["stg_*.sql", "Stagingmodellen met select * from source() per tabel."],
      ["dbt_project.yml snippet", "Configuratieblok voor de models-sectie, georganiseerd per schema."],
    ],
    step1: "1. Installeer de vereisten",
    step2: "2. Start de app",
    step3: "3. Verbind met Snowflake",
    step3Body: "Vul in de zijbalk je Snowflake-accountgegevens in. De app slaat deze lokaal op via keyring zodat je ze de volgende keer niet opnieuw hoeft in te voeren.",
    step4: "4. Genereer en schrijf weg",
    step4Body: "Selecteer een database en schema's, bekijk de gegenereerde code per tab, en klik op wegschrijven. De bestanden worden direct aangemaakt in de opgegeven dbt-projectmap.",
  },
  en: {
    meta: { title: "Generate Sources App — Utils — Datamodder", description: "Streamlit app that automatically generates dbt sources, staging models and project configuration from Snowflake." },
    lead: "Automatically generate dbt sources, staging models and project configuration from Snowflake — via a local app with a graphical interface.",
    goalP1: "The",
    goalP1b: "dbt macro works fine in the terminal, but this Streamlit app makes the process visual: you choose your database and schemas via dropdowns, see the generated code directly with syntax highlighting, and write the files to your dbt project with a single click.",
    goalP2: "Useful when onboarding new data sources where you want to quickly set up a working staging layer without writing YAML or SQL manually.",
    featuresLabel: "Features",
    features: [
      { title: "Snowflake connection", desc: "Store your account credentials and password locally via keyring. The app remembers your previous settings so you don't have to log in again each time." },
      { title: "Database & schema selection", desc: "Select a database and filter by one or more schemas. The app retrieves table and column metadata via the Snowflake information schema." },
      { title: "Generated output", desc: "View the generated files per tab with syntax highlighting before writing them. Choose between one combined sources.yml or a separate file per schema." },
      { title: "Write files", desc: "The app writes the generated files directly to your dbt project folder under models/staging/ — including the correct directory structure." },
    ],
    outputsLabel: "Generated files",
    fileHeader: "File", contentHeader: "Content",
    outputs: [
      ["sources.yml", "Source definitions with column metadata, per schema or combined."],
      ["stg_*.sql", "Staging models with select * from source() per table."],
      ["dbt_project.yml snippet", "Configuration block for the models section, organised per schema."],
    ],
    step1: "1. Install requirements",
    step2: "2. Start the app",
    step3: "3. Connect to Snowflake",
    step3Body: "Fill in your Snowflake account credentials in the sidebar. The app stores these locally via keyring so you don't have to enter them again next time.",
    step4: "4. Generate and write",
    step4Body: "Select a database and schemas, view the generated code per tab, and click write. The files are created directly in the specified dbt project folder.",
  },
  de: {
    meta: { title: "Generate Sources App — Utils — Datamodder", description: "Streamlit-App, die automatisch dbt-Sources, Staging-Modelle und Projektkonfiguration aus Snowflake generiert." },
    lead: "Generieren Sie automatisch dbt-Sources, Staging-Modelle und Projektkonfiguration aus Snowflake — über eine lokale App mit grafischer Oberfläche.",
    goalP1: "Das",
    goalP1b: "dbt-Makro funktioniert gut im Terminal, aber diese Streamlit-App macht den Prozess visuell: Sie wählen Datenbank und Schemas über Dropdowns aus, sehen den generierten Code direkt mit Syntaxhervorhebung und schreiben die Dateien mit einem Klick in Ihr dbt-Projekt.",
    goalP2: "Nützlich beim Onboarding neuer Datenquellen, wenn Sie schnell eine funktionierende Staging-Schicht einrichten möchten, ohne manuell YAML oder SQL zu schreiben.",
    featuresLabel: "Funktionen",
    features: [
      { title: "Snowflake-Verbindung", desc: "Speichern Sie Ihre Kontodaten und Ihr Passwort lokal über keyring. Die App merkt sich Ihre vorherigen Einstellungen, sodass Sie sich nicht jedes Mal erneut anmelden müssen." },
      { title: "Datenbank- und Schemaauswahl", desc: "Wählen Sie eine Datenbank aus und filtern Sie nach einem oder mehreren Schemas. Die App ruft Tabellen- und Spaltenmetadaten über das Snowflake Information Schema ab." },
      { title: "Generierte Ausgabe", desc: "Sehen Sie sich die generierten Dateien pro Tab mit Syntaxhervorhebung an, bevor Sie sie schreiben. Wählen Sie zwischen einer kombinierten sources.yml oder einer separaten Datei pro Schema." },
      { title: "Dateien schreiben", desc: "Die App schreibt die generierten Dateien direkt in Ihren dbt-Projektordner unter models/staging/ — einschließlich der korrekten Verzeichnisstruktur." },
    ],
    outputsLabel: "Generierte Dateien",
    fileHeader: "Datei", contentHeader: "Inhalt",
    outputs: [
      ["sources.yml", "Source-Definitionen mit Spaltenmetadaten, pro Schema oder kombiniert."],
      ["stg_*.sql", "Staging-Modelle mit select * from source() pro Tabelle."],
      ["dbt_project.yml Snippet", "Konfigurationsblock für den Modelle-Abschnitt, pro Schema organisiert."],
    ],
    step1: "1. Anforderungen installieren",
    step2: "2. App starten",
    step3: "3. Mit Snowflake verbinden",
    step3Body: "Geben Sie Ihre Snowflake-Kontodaten in der Seitenleiste ein. Die App speichert diese lokal über keyring, sodass Sie sie beim nächsten Mal nicht erneut eingeben müssen.",
    step4: "4. Generieren und schreiben",
    step4Body: "Wählen Sie eine Datenbank und Schemas aus, sehen Sie den generierten Code pro Tab und klicken Sie auf Schreiben. Die Dateien werden direkt im angegebenen dbt-Projektordner erstellt.",
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  return content[(lang as Lang)]?.meta ?? content.nl.meta;
}

export default async function GenerateSourcesAppPage({ params }: PageProps) {
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
            <AppWindow size={24} />
          </div>
          <div>
            <p className="text-orange-500/70 text-xs font-semibold uppercase tracking-widest mb-0.5">Streamlit app</p>
            <h1 className="text-3xl font-black text-[#f5f0eb]">Generate Sources</h1>
          </div>
        </div>
        <p className="text-[#9a8f85] text-lg leading-relaxed mb-8">{t.lead}</p>

        <div className="mb-12 rounded-xl overflow-hidden border border-orange-900/20">
          <img src="/images/generate_sources-app.png" alt="Generate Sources Streamlit app" className="w-full" />
        </div>

        <section className="mb-12">
          <h2 className="text-xl font-black text-[#f5f0eb] mb-4">{u.goal}</h2>
          <p className="text-[#9a8f85] leading-relaxed mb-4">
            {t.goalP1} <span className="text-orange-400 font-mono text-sm">generate_sources</span> {t.goalP1b}
          </p>
          <p className="text-[#9a8f85] leading-relaxed">{t.goalP2}</p>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-black text-[#f5f0eb] mb-4">{t.featuresLabel}</h2>
          <div className="space-y-3">
            {t.features.map(({ title, desc }) => (
              <div key={title} className="p-5 rounded-xl bg-[#1a1612] border border-orange-900/20">
                <p className="text-[#f5f0eb] font-semibold text-sm mb-1">{title}</p>
                <p className="text-[#9a8f85] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-black text-[#f5f0eb] mb-4">{t.outputsLabel}</h2>
          <div className="rounded-xl bg-[#1a1612] border border-orange-900/20 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-orange-900/20">
                  <th className="text-left px-5 py-3 text-orange-400 font-semibold font-mono text-xs">{t.fileHeader}</th>
                  <th className="text-left px-5 py-3 text-orange-400 font-semibold text-xs uppercase tracking-widest">{t.contentHeader}</th>
                </tr>
              </thead>
              <tbody className="text-[#9a8f85]">
                {t.outputs.map(([file, desc]) => (
                  <tr key={file} className="border-b border-orange-900/10 last:border-0">
                    <td className="px-5 py-3 font-mono text-orange-300/70 text-xs">{file}</td>
                    <td className="px-5 py-3 text-xs">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-black text-[#f5f0eb] mb-4">{u.usage}</h2>

          <h3 className="text-[#f5f0eb] font-semibold mb-2 text-sm">{t.step1}</h3>
          <div className="rounded-xl bg-[#0c0a08] border border-orange-900/20 p-5 font-mono text-sm text-orange-300/80 mb-6 overflow-x-auto">
            <pre>{`pip install -r streamlit/generate_sources/requirements.txt`}</pre>
          </div>

          <h3 className="text-[#f5f0eb] font-semibold mb-2 text-sm">{t.step2}</h3>
          <div className="rounded-xl bg-[#0c0a08] border border-orange-900/20 p-5 font-mono text-sm text-orange-300/80 mb-6 overflow-x-auto">
            <pre>{`streamlit run streamlit/generate_sources/app.py`}</pre>
          </div>

          <h3 className="text-[#f5f0eb] font-semibold mb-2 text-sm">{t.step3}</h3>
          <p className="text-[#9a8f85] text-sm mb-6">{t.step3Body}</p>

          <h3 className="text-[#f5f0eb] font-semibold mb-2 text-sm">{t.step4}</h3>
          <p className="text-[#9a8f85] text-sm">{t.step4Body}</p>
        </section>

        <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-orange-900/20">
          <a href="https://github.com/Steef-Datamodder/datamodder_utils/tree/main/streamlit/generate_sources" target="_blank" rel="noopener noreferrer"
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
