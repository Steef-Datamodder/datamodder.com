import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Search, ExternalLink } from "lucide-react";
import { dict } from "@/lib/i18n";
import type { Lang } from "@/lib/i18n";

type PageProps = { params: Promise<{ lang: string }> };

const content = {
  nl: {
    meta: { title: "Analyzer — Utils — Datamodder", description: "Snowflake stored procedure voor automatische datakwaliteitsanalyse en profieling van tabellen." },
    lead: "Automatische datakwaliteitsprofieling van Snowflake tabellen, via point-in-time snapshots en statistieken.",
    goalP1: "Bij het onboarden van een nieuwe databron wil je snel weten wat er in zit: hoeveel nulls, welke ranges, hoe uniek zijn de waarden? De Analyzer bouwt een systematisch kwaliteitsprofiel op door tabellen als snapshot vast te leggen en daar geautomatiseerd statistieken over te berekenen, zonder dat je handmatig queries hoeft te schrijven.",
    goalP2: "Door snapshots in de tijd te vergelijken kun je ook veranderingen in de datakwaliteit signaleren: zijn er plotseling meer nulls? Is een kolom uit zijn range gelopen?",
    procsLabel: "De Analyzer bestaat uit drie stored procedures die je in volgorde aanroept:",
    procs: [
      { name: "create_pit()", desc: "Maakt een point-in-time snapshot van een brontabel door een kloon aan te maken met een tijdstempel in de naam (bijv. KLANTEN_20240412_143000)." },
      { name: "register_pits()", desc: "Registreert nieuwe snapshots in een statistiekenregister. Haalt tabel- en kolommetadata op en koppelt de tijdstempel uit de tabelnaam." },
      { name: "update_statistics()", desc: "Berekent datakwaliteitsmetrieken over alle geregistreerde snapshots: null-tellingen, distinct waarden, min- en maxwaarden, en drempeloverschrijdingen." },
    ],
    metricsLabel: "Berekende statistieken per kolom:",
    metricHeader: "Metriek", descHeader: "Beschrijving",
    metrics: [
      { metric: "Null count", desc: "Aantal lege waarden per kolom" },
      { metric: "Distinct count", desc: "Aantal unieke waarden per kolom" },
      { metric: "Min / Max", desc: "Laagste en hoogste waarde" },
      { metric: "Tekstlengte", desc: "Overschrijdingen van configureerbare maximale lengte" },
      { metric: "Numerieke range", desc: "Waarden buiten een configureerbaar bereik" },
      { metric: "Datumrange", desc: "Datums buiten verwachte periode" },
    ],
    step1: "1. Setup uitvoeren",
    step1Body: "Voer",
    step1Body2: "uit om de benodigde schema's en registratietabellen aan te maken, daarna",
    step1Body3: "om de procedures te installeren.",
    step2: "2. Snapshot aanmaken",
    step3: "3. Snapshot registreren en analyseren",
  },
  en: {
    meta: { title: "Analyzer — Utils — Datamodder", description: "Snowflake stored procedure for automatic data quality analysis and profiling of tables." },
    lead: "Automatic data quality profiling of Snowflake tables via point-in-time snapshots and statistics.",
    goalP1: "When onboarding a new data source you want to quickly know what's in it: how many nulls, which ranges, how unique are the values? The Analyzer builds a systematic quality profile by capturing tables as snapshots and automatically calculating statistics over them — without writing manual queries.",
    goalP2: "By comparing snapshots over time you can also detect changes in data quality: are there suddenly more nulls? Has a column exceeded its expected range?",
    procsLabel: "The Analyzer consists of three stored procedures that you call in sequence:",
    procs: [
      { name: "create_pit()", desc: "Creates a point-in-time snapshot of a source table by cloning it with a timestamp in the name (e.g. CUSTOMERS_20240412_143000)." },
      { name: "register_pits()", desc: "Registers new snapshots in a statistics register. Retrieves table and column metadata and links the timestamp from the table name." },
      { name: "update_statistics()", desc: "Calculates data quality metrics over all registered snapshots: null counts, distinct values, min and max values, and threshold breaches." },
    ],
    metricsLabel: "Calculated statistics per column:",
    metricHeader: "Metric", descHeader: "Description",
    metrics: [
      { metric: "Null count", desc: "Number of empty values per column" },
      { metric: "Distinct count", desc: "Number of unique values per column" },
      { metric: "Min / Max", desc: "Lowest and highest value" },
      { metric: "Text length", desc: "Breaches of configurable maximum length" },
      { metric: "Numeric range", desc: "Values outside a configurable range" },
      { metric: "Date range", desc: "Dates outside the expected period" },
    ],
    step1: "1. Run setup",
    step1Body: "Run",
    step1Body2: "to create the required schemas and registration tables, then",
    step1Body3: "to install the procedures.",
    step2: "2. Create snapshot",
    step3: "3. Register snapshot and analyse",
  },
  de: {
    meta: { title: "Analyzer — Utils — Datamodder", description: "Snowflake Stored Procedure für automatische Datenqualitätsanalyse und Profilerstellung von Tabellen." },
    lead: "Automatische Datenqualitätsprofilierung von Snowflake-Tabellen über Point-in-Time-Snapshots und Statistiken.",
    goalP1: "Beim Onboarding einer neuen Datenquelle möchten Sie schnell wissen, was darin steckt: Wie viele Nullwerte, welche Bereiche, wie eindeutig sind die Werte? Der Analyzer erstellt ein systematisches Qualitätsprofil, indem er Tabellen als Snapshots erfasst und automatisch Statistiken darüber berechnet — ohne manuelle Abfragen schreiben zu müssen.",
    goalP2: "Durch den Vergleich von Snapshots über die Zeit können Sie auch Veränderungen in der Datenqualität erkennen: Gibt es plötzlich mehr Nullwerte? Hat eine Spalte ihren erwarteten Bereich überschritten?",
    procsLabel: "Der Analyzer besteht aus drei Stored Procedures, die Sie der Reihe nach aufrufen:",
    procs: [
      { name: "create_pit()", desc: "Erstellt einen Point-in-Time-Snapshot einer Quelltabelle durch Klonen mit einem Zeitstempel im Namen (z. B. CUSTOMERS_20240412_143000)." },
      { name: "register_pits()", desc: "Registriert neue Snapshots in einem Statistikregister. Ruft Tabellen- und Spaltenmetadaten ab und verknüpft den Zeitstempel aus dem Tabellennamen." },
      { name: "update_statistics()", desc: "Berechnet Datenqualitätsmetriken über alle registrierten Snapshots: Null-Anzahlen, eindeutige Werte, Min- und Maxwerte sowie Schwellenwertüberschreitungen." },
    ],
    metricsLabel: "Berechnete Statistiken pro Spalte:",
    metricHeader: "Metrik", descHeader: "Beschreibung",
    metrics: [
      { metric: "Null count", desc: "Anzahl leerer Werte pro Spalte" },
      { metric: "Distinct count", desc: "Anzahl eindeutiger Werte pro Spalte" },
      { metric: "Min / Max", desc: "Niedrigster und höchster Wert" },
      { metric: "Textlänge", desc: "Überschreitungen der konfigurierbaren Maximallänge" },
      { metric: "Numerischer Bereich", desc: "Werte außerhalb eines konfigurierbaren Bereichs" },
      { metric: "Datumsbereich", desc: "Datumsangaben außerhalb des erwarteten Zeitraums" },
    ],
    step1: "1. Einrichtung ausführen",
    step1Body: "Führen Sie",
    step1Body2: "aus, um die erforderlichen Schemas und Registrierungstabellen zu erstellen, dann",
    step1Body3: "um die Prozeduren zu installieren.",
    step2: "2. Snapshot erstellen",
    step3: "3. Snapshot registrieren und analysieren",
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  return content[(lang as Lang)]?.meta ?? content.nl.meta;
}

export default async function AnalyzerPage({ params }: PageProps) {
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
            <Search size={24} />
          </div>
          <div>
            <p className="text-orange-500/70 text-xs font-semibold uppercase tracking-widest mb-0.5">Stored Procedure</p>
            <h1 className="text-3xl font-black text-[#f5f0eb]">Analyzer</h1>
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
          <p className="text-[#9a8f85] leading-relaxed mb-6">{t.procsLabel}</p>
          <div className="space-y-3 mb-8">
            {t.procs.map(({ name, desc }) => (
              <div key={name} className="p-5 rounded-xl bg-[#1a1612] border border-orange-900/20">
                <p className="font-mono text-orange-300/80 text-sm mb-1">{name}</p>
                <p className="text-[#9a8f85] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <p className="text-[#9a8f85] text-sm mb-4">{t.metricsLabel}</p>
          <div className="rounded-xl bg-[#1a1612] border border-orange-900/20 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-orange-900/20">
                  <th className="text-left px-5 py-3 text-orange-400 font-semibold text-xs uppercase tracking-widest">{t.metricHeader}</th>
                  <th className="text-left px-5 py-3 text-orange-400 font-semibold text-xs uppercase tracking-widest">{t.descHeader}</th>
                </tr>
              </thead>
              <tbody className="text-[#9a8f85]">
                {t.metrics.map(({ metric, desc }) => (
                  <tr key={metric} className="border-b border-orange-900/10 last:border-0">
                    <td className="px-5 py-3 text-xs font-semibold text-[#f5f0eb]/70">{metric}</td>
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
            {t.step1Body} <span className="text-orange-400 font-mono">setup.sql</span> {t.step1Body2} <span className="text-orange-400 font-mono">create_analyze_sp.sql</span> {t.step1Body3}
          </p>

          <h3 className="text-[#f5f0eb] font-semibold mb-2 text-sm">{t.step2}</h3>
          <div className="rounded-xl bg-[#0c0a08] border border-orange-900/20 p-5 font-mono text-sm text-orange-300/80 mb-6 overflow-x-auto">
            <pre>{`CALL datamodder.create_pit(
  source_db  => 'MY_DB',
  source_sch => 'RAW',
  source_tbl => 'CUSTOMERS'
);
-- Creates: MY_DB.RAW.CUSTOMERS_20240412_143000`}</pre>
          </div>

          <h3 className="text-[#f5f0eb] font-semibold mb-2 text-sm">{t.step3}</h3>
          <div className="rounded-xl bg-[#0c0a08] border border-orange-900/20 p-5 font-mono text-sm text-orange-300/80 overflow-x-auto">
            <pre>{`CALL datamodder.register_pits();
CALL datamodder.update_statistics();

-- View results:
SELECT * FROM datamodder.statistics
ORDER BY snapshot_ts DESC;`}</pre>
          </div>
        </section>

        <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-orange-900/20">
          <a href="https://github.com/Steef-Datamodder/datamodder_utils/tree/main/Stored%20Procedure/analyze" target="_blank" rel="noopener noreferrer"
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
