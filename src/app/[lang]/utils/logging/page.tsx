import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ScrollText, ExternalLink } from "lucide-react";
import { dict } from "@/lib/i18n";
import type { Lang } from "@/lib/i18n";

type PageProps = { params: Promise<{ lang: string }> };

const content = {
  nl: {
    meta: { title: "Logging — Utils — Datamodder", description: "dbt run logging macro voor Snowflake. Houd bij wanneer een dbt run start en eindigt." },
    lead: "Houd automatisch bij wanneer een dbt run start en klaar is, direct in Snowflake.",
    goalBody: "In productie-omgevingen wil je weten wanneer een dbt run is gestart, hoe lang hij duurde en of hij succesvol was. De Logging macro schrijft deze informatie automatisch weg naar een tabel in Snowflake via de dbt hook-mechanismen. Zo bouw je een volledige audittrail op van al je dbt-runs, zonder extra tooling.",
    tableIntro: "Na elke dbt run wordt een rij toegevoegd aan een logtabel in Snowflake met de volgende velden:",
    colHeader: "Kolom", typeHeader: "Type", descHeader: "Beschrijving",
    cols: [
      ["invocation_id", "TEXT", "Unieke id van de dbt run"],
      ["project_name", "TEXT", "Naam van het dbt project"],
      ["target_name", "TEXT", "dbt target (bijv. dev of prod)"],
      ["run_started_at", "TIMESTAMP_TZ", "Starttijdstip van de run"],
      ["run_ended_at", "TIMESTAMP_TZ", "Eindtijdstip van de run"],
      ["stat", "TEXT", "Status (bijv. success of error)"],
    ],
    step1: "1. Voeg de hooks toe aan dbt_project.yml",
    step1Body: "De macros worden aangeroepen via de",
    step1Body2: "hooks van dbt:",
    step2: "2. Maak de logtabel aan in Snowflake",
    step2Body: "De macro schrijft naar een tabel die je eerst aanmaakt. Standaard wordt",
    step2Body2: "gebruikt:",
    step3: "3. Optioneel: schema en tabel aanpassen",
    step3Body: "Gebruik variabelen in",
    step3Body2: "om de locatie te wijzigen:",
  },
  en: {
    meta: { title: "Logging — Utils — Datamodder", description: "dbt run logging macro for Snowflake. Track when a dbt run starts and ends." },
    lead: "Automatically track when a dbt run starts and finishes, directly in Snowflake.",
    goalBody: "In production environments you want to know when a dbt run started, how long it took and whether it succeeded. The Logging macro automatically writes this information to a table in Snowflake via dbt's hook mechanisms. This way you build a complete audit trail of all your dbt runs, without extra tooling.",
    tableIntro: "After every dbt run, a row is added to a log table in Snowflake with the following fields:",
    colHeader: "Column", typeHeader: "Type", descHeader: "Description",
    cols: [
      ["invocation_id", "TEXT", "Unique id of the dbt run"],
      ["project_name", "TEXT", "Name of the dbt project"],
      ["target_name", "TEXT", "dbt target (e.g. dev or prod)"],
      ["run_started_at", "TIMESTAMP_TZ", "Start timestamp of the run"],
      ["run_ended_at", "TIMESTAMP_TZ", "End timestamp of the run"],
      ["stat", "TEXT", "Status (e.g. success or error)"],
    ],
    step1: "1. Add hooks to dbt_project.yml",
    step1Body: "The macros are called via the",
    step1Body2: "hooks of dbt:",
    step2: "2. Create the log table in Snowflake",
    step2Body: "The macro writes to a table you create first. By default",
    step2Body2: "is used:",
    step3: "3. Optional: change schema and table",
    step3Body: "Use variables in",
    step3Body2: "to change the location:",
  },
  de: {
    meta: { title: "Logging — Utils — Datamodder", description: "dbt-Run-Logging-Makro für Snowflake. Verfolgen Sie, wann ein dbt-Run startet und endet." },
    lead: "Verfolgen Sie automatisch, wann ein dbt-Run startet und endet — direkt in Snowflake.",
    goalBody: "In Produktionsumgebungen möchten Sie wissen, wann ein dbt-Run gestartet wurde, wie lange er gedauert hat und ob er erfolgreich war. Das Logging-Makro schreibt diese Informationen automatisch über die dbt-Hook-Mechanismen in eine Tabelle in Snowflake. So bauen Sie einen vollständigen Audit-Trail aller Ihrer dbt-Runs auf — ohne zusätzliche Tools.",
    tableIntro: "Nach jedem dbt-Run wird eine Zeile zu einer Log-Tabelle in Snowflake mit folgenden Feldern hinzugefügt:",
    colHeader: "Spalte", typeHeader: "Typ", descHeader: "Beschreibung",
    cols: [
      ["invocation_id", "TEXT", "Eindeutige ID des dbt-Runs"],
      ["project_name", "TEXT", "Name des dbt-Projekts"],
      ["target_name", "TEXT", "dbt-Target (z. B. dev oder prod)"],
      ["run_started_at", "TIMESTAMP_TZ", "Startzeitpunkt des Runs"],
      ["run_ended_at", "TIMESTAMP_TZ", "Endzeitpunkt des Runs"],
      ["stat", "TEXT", "Status (z. B. success oder error)"],
    ],
    step1: "1. Hooks zu dbt_project.yml hinzufügen",
    step1Body: "Die Makros werden über die",
    step1Body2: "Hooks von dbt aufgerufen:",
    step2: "2. Log-Tabelle in Snowflake anlegen",
    step2Body: "Das Makro schreibt in eine Tabelle, die Sie zuerst anlegen. Standardmäßig wird",
    step2Body2: "verwendet:",
    step3: "3. Optional: Schema und Tabelle anpassen",
    step3Body: "Verwenden Sie Variablen in",
    step3Body2: "um den Speicherort zu ändern:",
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  return content[(lang as Lang)]?.meta ?? content.nl.meta;
}

export default async function LoggingPage({ params }: PageProps) {
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
            <ScrollText size={24} />
          </div>
          <div>
            <p className="text-orange-500/70 text-xs font-semibold uppercase tracking-widest mb-0.5">dbt macro</p>
            <h1 className="text-3xl font-black text-[#f5f0eb]">Logging</h1>
          </div>
        </div>
        <p className="text-[#9a8f85] text-lg leading-relaxed mb-12">{t.lead}</p>

        <section className="mb-12">
          <h2 className="text-xl font-black text-[#f5f0eb] mb-4">{u.goal}</h2>
          <p className="text-[#9a8f85] leading-relaxed">{t.goalBody}</p>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-black text-[#f5f0eb] mb-4">{u.whatToExpect}</h2>
          <p className="text-[#9a8f85] leading-relaxed mb-6">{t.tableIntro}</p>
          <div className="rounded-xl bg-[#1a1612] border border-orange-900/20 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-orange-900/20">
                  <th className="text-left px-5 py-3 text-orange-400 font-semibold font-mono text-xs">{t.colHeader}</th>
                  <th className="text-left px-5 py-3 text-orange-400 font-semibold text-xs uppercase tracking-widest">{t.typeHeader}</th>
                  <th className="text-left px-5 py-3 text-orange-400 font-semibold text-xs uppercase tracking-widest">{t.descHeader}</th>
                </tr>
              </thead>
              <tbody className="text-[#9a8f85]">
                {t.cols.map(([col, type, desc]) => (
                  <tr key={col} className="border-b border-orange-900/10 last:border-0">
                    <td className="px-5 py-3 font-mono text-orange-300/70 text-xs">{col}</td>
                    <td className="px-5 py-3 font-mono text-xs">{type}</td>
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
          <p className="text-[#9a8f85] text-sm mb-3">
            {t.step1Body} <span className="text-orange-400 font-mono">on-run-start</span> {lang === 'nl' ? 'en' : lang === 'de' ? 'und' : 'and'} <span className="text-orange-400 font-mono">on-run-end</span> {t.step1Body2}
          </p>
          <div className="rounded-xl bg-[#0c0a08] border border-orange-900/20 p-5 font-mono text-sm text-orange-300/80 mb-6 overflow-x-auto">
            <pre>{`on-run-start:
  - "{{ log_dbt_start() }}"

on-run-end:
  - "{{ log_dbt_end() }}"`}</pre>
          </div>

          <h3 className="text-[#f5f0eb] font-semibold mb-2 text-sm">{t.step2}</h3>
          <p className="text-[#9a8f85] text-sm mb-3">
            {t.step2Body} <span className="text-orange-400 font-mono">datamodder.runtimes</span> {t.step2Body2}
          </p>
          <div className="rounded-xl bg-[#0c0a08] border border-orange-900/20 p-5 font-mono text-sm text-orange-300/80 mb-6 overflow-x-auto">
            <pre>{`CREATE TABLE <database>.datamodder.runtimes (
  invocation_id  TEXT,
  project_name   TEXT,
  target_name    TEXT,
  run_started_at TIMESTAMP_TZ,
  run_ended_at   TIMESTAMP_TZ,
  stat           TEXT
);`}</pre>
          </div>

          <h3 className="text-[#f5f0eb] font-semibold mb-2 text-sm">{t.step3}</h3>
          <p className="text-[#9a8f85] text-sm mb-3">
            {t.step3Body} <span className="text-orange-400 font-mono">dbt_project.yml</span> {t.step3Body2}
          </p>
          <div className="rounded-xl bg-[#0c0a08] border border-orange-900/20 p-5 font-mono text-sm text-orange-300/80 overflow-x-auto">
            <pre>{`vars:
  management_config:
    schema: datamodder
    table:  runtimes`}</pre>
          </div>
        </section>

        <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-orange-900/20">
          <a href="https://github.com/Steef-Datamodder/datamodder_utils/tree/main/macros/logging" target="_blank" rel="noopener noreferrer"
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
