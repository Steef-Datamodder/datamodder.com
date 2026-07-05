import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BarChart2, ExternalLink } from "lucide-react";
import { dict } from "@/lib/i18n";
import type { Lang } from "@/lib/i18n";

type PageProps = { params: Promise<{ lang: string }> };

const content = {
  nl: {
    meta: { title: "Analyze App — Utils — Datamodder", description: "Streamlit app voor het aanmaken en beheren van point-in-time snapshots en kolomstatistieken in Snowflake." },
    lead: "Grafische frontend voor de Analyzer stored procedures — maak point-in-time snapshots van brontabellen en bekijk kolomstatistieken direct in de browser.",
    goalP1: "De Analyzer stored procedures zijn krachtig maar vergen handmatige SQL-aanroepen met sessievariabelen. Deze app maakt dat proces visueel: je selecteert een tabel, klikt op een knop, en de app roept de juiste procedure aan met de correcte variabelen — inclusief overzicht van alle snapshots en hun statistieken.",
    goalP2: "Statistieken worden weergegeven met voorwaardelijke opmaak: kolommen met nulls krijgen een gele achtergrond, kolommen buiten de verwachte range een rode.",
    actionsLabel: "Acties",
    btnHeader: "Knop", procHeader: "Procedure", descHeader: "Beschrijving",
    actions: [
      ["Create PIT", "create_pit(db, schema, table)", "Maakt een snapshottabel aan met naam {TABEL}_{YYYYMMDD}_{HH24MISS} in het PIT-schema."],
      ["Register PITs", "register_pits()", "Scant het PIT-schema en registreert alle snapshottabellen in de metadata."],
      ["Update statistics", "update_statistics()", "Berekent kolomstatistieken voor alle geregistreerde PITs."],
    ],
    configLabel: "Configuratie",
    configIntro: "Standaardwaarden komen overeen met de datamodder_utils setup:",
    fieldHeader: "Veld", defaultHeader: "Standaard",
    fields: [
      ["Database", "datamodder", "Snowflake-database waar de analyze-schema's in staan."],
      ["PIT schema", "analyze", "Schema waar de snapshottabellen worden aangemaakt."],
      ["Agg schema", "analyzer_agg", "Schema waar de statistics-aggregatietabel staat."],
    ],
    step1: "1. Start de app",
    step2: "2. Verbind met Snowflake",
    step2Body: "Vul account, gebruikersnaam en wachtwoord in de zijbalk in. De app slaat account en gebruikersnaam op in",
    step2Body2: "en het wachtwoord via Windows Credential Manager.",
    step3: "3. Selecteer bron en voer acties uit",
    step3Body: "Kies database, schema en tabel. Gebruik de knoppen om een PIT aan te maken, te registreren of statistieken bij te werken. Selecteer daarna een PIT uit de lijst om de kolomstatistieken te bekijken.",
  },
  en: {
    meta: { title: "Analyze App — Utils — Datamodder", description: "Streamlit app for creating and managing point-in-time snapshots and column statistics in Snowflake." },
    lead: "Graphical frontend for the Analyzer stored procedures — create point-in-time snapshots of source tables and view column statistics directly in the browser.",
    goalP1: "The Analyzer stored procedures are powerful but require manual SQL calls with session variables. This app makes that process visual: you select a table, click a button, and the app calls the right procedure with the correct variables — including an overview of all snapshots and their statistics.",
    goalP2: "Statistics are displayed with conditional formatting: columns with nulls get a yellow background, columns outside the expected range get a red one.",
    actionsLabel: "Actions",
    btnHeader: "Button", procHeader: "Procedure", descHeader: "Description",
    actions: [
      ["Create PIT", "create_pit(db, schema, table)", "Creates a snapshot table named {TABLE}_{YYYYMMDD}_{HH24MISS} in the PIT schema."],
      ["Register PITs", "register_pits()", "Scans the PIT schema and registers all snapshot tables in the metadata."],
      ["Update statistics", "update_statistics()", "Calculates column statistics for all registered PITs."],
    ],
    configLabel: "Configuration",
    configIntro: "Default values match the datamodder_utils setup:",
    fieldHeader: "Field", defaultHeader: "Default",
    fields: [
      ["Database", "datamodder", "Snowflake database where the analyze schemas are located."],
      ["PIT schema", "analyze", "Schema where snapshot tables are created."],
      ["Agg schema", "analyzer_agg", "Schema where the statistics aggregation table is located."],
    ],
    step1: "1. Start the app",
    step2: "2. Connect to Snowflake",
    step2Body: "Enter your account, username and password in the sidebar. The app stores account and username in",
    step2Body2: "and the password via Windows Credential Manager.",
    step3: "3. Select source and run actions",
    step3Body: "Choose database, schema and table. Use the buttons to create a PIT, register it or update statistics. Then select a PIT from the list to view the column statistics.",
  },
  de: {
    meta: { title: "Analyze App — Utils — Datamodder", description: "Streamlit-App zum Erstellen und Verwalten von Point-in-Time-Snapshots und Spaltenstatistiken in Snowflake." },
    lead: "Grafisches Frontend für die Analyzer Stored Procedures — erstellen Sie Point-in-Time-Snapshots von Quelltabellen und sehen Sie Spaltenstatistiken direkt im Browser.",
    goalP1: "Die Analyzer Stored Procedures sind leistungsstark, erfordern aber manuelle SQL-Aufrufe mit Sitzungsvariablen. Diese App macht diesen Prozess visuell: Sie wählen eine Tabelle aus, klicken auf eine Schaltfläche, und die App ruft die richtige Prozedur mit den korrekten Variablen auf — einschließlich einer Übersicht aller Snapshots und ihrer Statistiken.",
    goalP2: "Statistiken werden mit bedingter Formatierung angezeigt: Spalten mit Nullwerten erhalten einen gelben Hintergrund, Spalten außerhalb des erwarteten Bereichs einen roten.",
    actionsLabel: "Aktionen",
    btnHeader: "Schaltfläche", procHeader: "Prozedur", descHeader: "Beschreibung",
    actions: [
      ["Create PIT", "create_pit(db, schema, table)", "Erstellt eine Snapshot-Tabelle mit dem Namen {TABELLE}_{YYYYMMDD}_{HH24MISS} im PIT-Schema."],
      ["Register PITs", "register_pits()", "Scannt das PIT-Schema und registriert alle Snapshot-Tabellen in den Metadaten."],
      ["Update statistics", "update_statistics()", "Berechnet Spaltenstatistiken für alle registrierten PITs."],
    ],
    configLabel: "Konfiguration",
    configIntro: "Standardwerte entsprechen der datamodder_utils-Einrichtung:",
    fieldHeader: "Feld", defaultHeader: "Standard",
    fields: [
      ["Database", "datamodder", "Snowflake-Datenbank, in der die Analyze-Schemas gespeichert sind."],
      ["PIT schema", "analyze", "Schema, in dem Snapshot-Tabellen erstellt werden."],
      ["Agg schema", "analyzer_agg", "Schema, in dem die Statistik-Aggregationstabelle gespeichert ist."],
    ],
    step1: "1. App starten",
    step2: "2. Mit Snowflake verbinden",
    step2Body: "Geben Sie Konto, Benutzername und Passwort in der Seitenleiste ein. Die App speichert Konto und Benutzername in",
    step2Body2: "und das Passwort über Windows Credential Manager.",
    step3: "3. Quelle auswählen und Aktionen ausführen",
    step3Body: "Wählen Sie Datenbank, Schema und Tabelle. Verwenden Sie die Schaltflächen, um einen PIT zu erstellen, zu registrieren oder Statistiken zu aktualisieren. Wählen Sie dann einen PIT aus der Liste, um die Spaltenstatistiken anzuzeigen.",
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  return content[(lang as Lang)]?.meta ?? content.nl.meta;
}

export default async function AnalyzeAppPage({ params }: PageProps) {
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
            <BarChart2 size={24} />
          </div>
          <div>
            <p className="text-orange-500/70 text-xs font-semibold uppercase tracking-widest mb-0.5">Streamlit app</p>
            <h1 className="text-3xl font-black text-[#f5f0eb]">Analyze</h1>
          </div>
        </div>
        <p className="text-[#9a8f85] text-lg leading-relaxed mb-8">{t.lead}</p>

        <div className="mb-12 rounded-xl overflow-hidden border border-orange-900/20">
          <img src="/images/analyze-app.png" alt="Analyze Streamlit app" className="w-full" />
        </div>

        <section className="mb-12">
          <h2 className="text-xl font-black text-[#f5f0eb] mb-4">{u.goal}</h2>
          <p className="text-[#9a8f85] leading-relaxed mb-4">{t.goalP1}</p>
          <p className="text-[#9a8f85] leading-relaxed">{t.goalP2}</p>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-black text-[#f5f0eb] mb-4">{t.actionsLabel}</h2>
          <div className="rounded-xl bg-[#1a1612] border border-orange-900/20 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-orange-900/20">
                  <th className="text-left px-5 py-3 text-orange-400 font-semibold text-xs uppercase tracking-widest">{t.btnHeader}</th>
                  <th className="text-left px-5 py-3 text-orange-400 font-semibold font-mono text-xs">{t.procHeader}</th>
                  <th className="text-left px-5 py-3 text-orange-400 font-semibold text-xs uppercase tracking-widest">{t.descHeader}</th>
                </tr>
              </thead>
              <tbody className="text-[#9a8f85]">
                {t.actions.map(([btn, proc, desc]) => (
                  <tr key={btn} className="border-b border-orange-900/10 last:border-0">
                    <td className="px-5 py-3 text-xs font-semibold text-[#f5f0eb]">{btn}</td>
                    <td className="px-5 py-3 font-mono text-orange-300/70 text-xs">{proc}</td>
                    <td className="px-5 py-3 text-xs">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-black text-[#f5f0eb] mb-4">{t.configLabel}</h2>
          <p className="text-[#9a8f85] text-sm mb-4">{t.configIntro}</p>
          <div className="rounded-xl bg-[#1a1612] border border-orange-900/20 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-orange-900/20">
                  <th className="text-left px-5 py-3 text-orange-400 font-semibold text-xs uppercase tracking-widest">{t.fieldHeader}</th>
                  <th className="text-left px-5 py-3 text-orange-400 font-semibold text-xs uppercase tracking-widest">{t.defaultHeader}</th>
                  <th className="text-left px-5 py-3 text-orange-400 font-semibold text-xs uppercase tracking-widest">{t.descHeader}</th>
                </tr>
              </thead>
              <tbody className="text-[#9a8f85]">
                {t.fields.map(([field, def, desc]) => (
                  <tr key={field} className="border-b border-orange-900/10 last:border-0">
                    <td className="px-5 py-3 text-xs font-semibold text-[#f5f0eb]">{field}</td>
                    <td className="px-5 py-3 font-mono text-orange-300/70 text-xs">{def}</td>
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
            <pre>{`streamlit\\analyze\\start.cmd`}</pre>
          </div>

          <h3 className="text-[#f5f0eb] font-semibold mb-2 text-sm">{t.step2}</h3>
          <p className="text-[#9a8f85] text-sm mb-6">
            {t.step2Body} <span className="text-orange-400 font-mono">~/.streamlit_sources.json</span> {t.step2Body2}
          </p>

          <h3 className="text-[#f5f0eb] font-semibold mb-2 text-sm">{t.step3}</h3>
          <p className="text-[#9a8f85] text-sm">{t.step3Body}</p>
        </section>

        <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-orange-900/20">
          <a href="https://github.com/Steef-Datamodder/datamodder_utils/tree/main/streamlit/analyze" target="_blank" rel="noopener noreferrer"
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
