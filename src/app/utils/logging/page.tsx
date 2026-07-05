import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ScrollText, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Logging — Utils — Datamodder",
  description: "dbt run logging macro voor Snowflake. Houd bij wanneer een dbt run start en eindigt.",
};

export default function LoggingPage() {
  return (
    <>
      <div className="pt-28 pb-24 px-6">
        <div className="max-w-3xl mx-auto">

          {/* Breadcrumb */}
          <Link href="/utils" className="inline-flex items-center gap-2 text-[#9a8f85] text-sm hover:text-orange-400 transition-colors mb-10">
            <ArrowLeft size={14} /> Terug naar Utils
          </Link>

          {/* Title */}
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 flex-shrink-0">
              <ScrollText size={24} />
            </div>
            <div>
              <p className="text-orange-500/70 text-xs font-semibold uppercase tracking-widest mb-0.5">dbt macro</p>
              <h1 className="text-3xl font-black text-[#f5f0eb]">Logging</h1>
            </div>
          </div>
          <p className="text-[#9a8f85] text-lg leading-relaxed mb-12">
            Houd automatisch bij wanneer een dbt run start en klaar is, direct in Snowflake.
          </p>

          {/* Doel */}
          <section className="mb-12">
            <h2 className="text-xl font-black text-[#f5f0eb] mb-4">Doel</h2>
            <p className="text-[#9a8f85] leading-relaxed">
              In productie-omgevingen wil je weten wanneer een dbt run is gestart, hoe lang hij duurde en of hij succesvol was. De Logging macro schrijft deze informatie automatisch weg naar een tabel in Snowflake via de dbt hook-mechanismen. Zo bouw je een volledige audittrail op van al je dbt-runs, zonder extra tooling.
            </p>
          </section>

          {/* Wat je kunt verwachten */}
          <section className="mb-12">
            <h2 className="text-xl font-black text-[#f5f0eb] mb-4">Wat je kunt verwachten</h2>
            <p className="text-[#9a8f85] leading-relaxed mb-6">
              Na elke dbt run wordt een rij toegevoegd aan een logtabel in Snowflake met de volgende velden:
            </p>
            <div className="rounded-xl bg-[#1a1612] border border-orange-900/20 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-orange-900/20">
                    <th className="text-left px-5 py-3 text-orange-400 font-semibold font-mono text-xs">Kolom</th>
                    <th className="text-left px-5 py-3 text-orange-400 font-semibold text-xs uppercase tracking-widest">Type</th>
                    <th className="text-left px-5 py-3 text-orange-400 font-semibold text-xs uppercase tracking-widest">Beschrijving</th>
                  </tr>
                </thead>
                <tbody className="text-[#9a8f85]">
                  {[
                    ["invocation_id", "TEXT", "Unieke id van de dbt run"],
                    ["project_name", "TEXT", "Naam van het dbt project"],
                    ["target_name", "TEXT", "dbt target (bijv. dev of prod)"],
                    ["run_started_at", "TIMESTAMP_TZ", "Starttijdstip van de run"],
                    ["run_ended_at", "TIMESTAMP_TZ", "Eindtijdstip van de run"],
                    ["stat", "TEXT", "Status (bijv. success of error)"],
                  ].map(([col, type, desc]) => (
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

          {/* Gebruik */}
          <section className="mb-12">
            <h2 className="text-xl font-black text-[#f5f0eb] mb-4">Gebruik</h2>

            <h3 className="text-[#f5f0eb] font-semibold mb-2 text-sm">1. Voeg de hooks toe aan dbt_project.yml</h3>
            <p className="text-[#9a8f85] text-sm mb-3">
              De macros worden aangeroepen via de <span className="text-orange-400 font-mono">on-run-start</span> en <span className="text-orange-400 font-mono">on-run-end</span> hooks van dbt:
            </p>
            <div className="rounded-xl bg-[#0c0a08] border border-orange-900/20 p-5 font-mono text-sm text-orange-300/80 mb-6 overflow-x-auto">
              <pre>{`on-run-start:
  - "{{ log_dbt_start() }}"

on-run-end:
  - "{{ log_dbt_end() }}"`}</pre>
            </div>

            <h3 className="text-[#f5f0eb] font-semibold mb-2 text-sm">2. Maak de logtabel aan in Snowflake</h3>
            <p className="text-[#9a8f85] text-sm mb-3">
              De macro schrijft naar een tabel die je eerst aanmaakt. Standaard wordt <span className="text-orange-400 font-mono">datamodder.runtimes</span> gebruikt:
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

            <h3 className="text-[#f5f0eb] font-semibold mb-2 text-sm">3. Optioneel: schema en tabel aanpassen</h3>
            <p className="text-[#9a8f85] text-sm mb-3">
              Gebruik variabelen in <span className="text-orange-400 font-mono">dbt_project.yml</span> om de locatie te wijzigen:
            </p>
            <div className="rounded-xl bg-[#0c0a08] border border-orange-900/20 p-5 font-mono text-sm text-orange-300/80 overflow-x-auto">
              <pre>{`vars:
  management_config:
    schema: datamodder   # standaard
    table:  runtimes     # standaard`}</pre>
            </div>
          </section>

          {/* Links */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-orange-900/20">
            <a
              href="https://github.com/Steef-Datamodder/datamodder_utils/tree/main/macros/logging"
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
