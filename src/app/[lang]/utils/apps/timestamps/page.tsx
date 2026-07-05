import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Timer, ExternalLink } from "lucide-react";
import { dict } from "@/lib/i18n";
import type { Lang } from "@/lib/i18n";

type PageProps = { params: Promise<{ lang: string }> };

const formatGroups = [
  ["ISO", "2024-04-12T14:30:00Z"],
  ["European", "12-04-2024, 12/04/2024"],
  ["US", "04/12/2024"],
  ["Compact", "20240412"],
  ["Oracle / MSSQL / PostgreSQL / MySQL / SAP", "Database-specific formats"],
  ["Month names", "12 april 2024, April 12 2024"],
];

const content = {
  nl: {
    meta: { title: "Timestamp Tester App — Utils — Datamodder", description: "Streamlit app die timestampstrings test tegen Snowflake-parseerfuncties om het juiste formaatpatroon te vinden." },
    lead: "Test timestampstrings rechtstreeks in Snowflake om te achterhalen welk formaatpatroon overeenkomt — inclusief ondersteuning voor alle formaatgroepen uit de Timestamps macro.",
    goalP1: "Bij het onboarden van een nieuwe databron weet je vaak niet in welk formaat datumstrings zijn opgeslagen. De Timestamp Tester stuurt je invoer als één query naar Snowflake, test elke waarde tegen alle geselecteerde formaatgroepen en toont direct welk patroon matcht — en welke waarden onparseerbaar zijn.",
    goalP2: "De resultaten worden kleurgecodeerd weergegeven: groen voor een match, rood voor een mislukking. Niet-matchende waarden worden apart opgelijst.",
    formatGroupsLabel: "Ondersteunde formaatgroepen",
    groupHeader: "Groep", exampleHeader: "Voorbeelden",
    note: "Compact-formaten worden altijd als eerste getest om verkeerde interpretatie te voorkomen. ISO-waarden met T-scheidingsteken of afsluitende Z krijgen een fallback-test.",
    step1: "1. Start de app",
    step2: "2. Verbind met Snowflake",
    step2Body: "Vul je Snowflake-accountgegevens in de zijbalk in. De app slaat je inloggegevens lokaal op via Windows Credential Manager.",
    step3: "3. Voer timestampstrings in",
    step3Body: "Plak één of meerdere waarden in het invoerveld (één per regel) en kies welke formaatgroepen je wil testen:",
    step4: "4. Bekijk resultaten",
    step4Body: "De tabel toont per waarde het origineel, het matchende formaatpatroon en de geparseerde timestamp. Niet-matchende waarden worden rood gemarkeerd en apart opgelijst.",
  },
  en: {
    meta: { title: "Timestamp Tester App — Utils — Datamodder", description: "Streamlit app that tests timestamp strings against Snowflake parse functions to find the correct format pattern." },
    lead: "Test timestamp strings directly in Snowflake to find out which format pattern matches — including support for all format groups from the Timestamps macro.",
    goalP1: "When onboarding a new data source you often don't know in which format date strings are stored. The Timestamp Tester sends your input as one query to Snowflake, tests each value against all selected format groups and immediately shows which pattern matches — and which values are unparseable.",
    goalP2: "Results are displayed colour-coded: green for a match, red for a failure. Non-matching values are listed separately.",
    formatGroupsLabel: "Supported format groups",
    groupHeader: "Group", exampleHeader: "Examples",
    note: "Compact formats are always tested first to prevent misinterpretation. ISO values with a T separator or trailing Z receive a fallback test.",
    step1: "1. Start the app",
    step2: "2. Connect to Snowflake",
    step2Body: "Enter your Snowflake account credentials in the sidebar. The app stores your credentials locally via Windows Credential Manager.",
    step3: "3. Enter timestamp strings",
    step3Body: "Paste one or more values in the input field (one per line) and choose which format groups you want to test:",
    step4: "4. View results",
    step4Body: "The table shows per value the original, the matching format pattern and the parsed timestamp. Non-matching values are highlighted in red and listed separately.",
  },
  de: {
    meta: { title: "Timestamp Tester App — Utils — Datamodder", description: "Streamlit-App, die Timestamp-Strings gegen Snowflake-Parse-Funktionen testet, um das richtige Formatmuster zu finden." },
    lead: "Testen Sie Timestamp-Strings direkt in Snowflake, um herauszufinden, welches Formatmuster übereinstimmt — mit Unterstützung aller Formatgruppen aus dem Timestamps-Makro.",
    goalP1: "Beim Onboarding einer neuen Datenquelle wissen Sie oft nicht, in welchem Format Datums-Strings gespeichert sind. Der Timestamp Tester sendet Ihre Eingabe als eine Abfrage an Snowflake, testet jeden Wert gegen alle ausgewählten Formatgruppen und zeigt sofort, welches Muster übereinstimmt — und welche Werte nicht parsierbar sind.",
    goalP2: "Ergebnisse werden farbkodiert angezeigt: Grün für eine Übereinstimmung, Rot für einen Fehler. Nicht übereinstimmende Werte werden separat aufgelistet.",
    formatGroupsLabel: "Unterstützte Formatgruppen",
    groupHeader: "Gruppe", exampleHeader: "Beispiele",
    note: "Kompakt-Formate werden immer zuerst getestet, um Fehlinterpretationen zu verhindern. ISO-Werte mit T-Trennzeichen oder abschließendem Z erhalten einen Fallback-Test.",
    step1: "1. App starten",
    step2: "2. Mit Snowflake verbinden",
    step2Body: "Geben Sie Ihre Snowflake-Kontodaten in der Seitenleiste ein. Die App speichert Ihre Anmeldedaten lokal über Windows Credential Manager.",
    step3: "3. Timestamp-Strings eingeben",
    step3Body: "Fügen Sie einen oder mehrere Werte in das Eingabefeld ein (einen pro Zeile) und wählen Sie, welche Formatgruppen Sie testen möchten:",
    step4: "4. Ergebnisse anzeigen",
    step4Body: "Die Tabelle zeigt pro Wert das Original, das übereinstimmende Formatmuster und den geparsten Timestamp. Nicht übereinstimmende Werte werden rot markiert und separat aufgelistet.",
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  return content[(lang as Lang)]?.meta ?? content.nl.meta;
}

export default async function TimestampsAppPage({ params }: PageProps) {
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
            <Timer size={24} />
          </div>
          <div>
            <p className="text-orange-500/70 text-xs font-semibold uppercase tracking-widest mb-0.5">Streamlit app</p>
            <h1 className="text-3xl font-black text-[#f5f0eb]">Timestamp Tester</h1>
          </div>
        </div>
        <p className="text-[#9a8f85] text-lg leading-relaxed mb-8">{t.lead}</p>

        <div className="mb-12 rounded-xl overflow-hidden border border-orange-900/20">
          <img src="/images/tiemstamp-app.png" alt="Timestamp Tester Streamlit app" className="w-full" />
        </div>

        <section className="mb-12">
          <h2 className="text-xl font-black text-[#f5f0eb] mb-4">{u.goal}</h2>
          <p className="text-[#9a8f85] leading-relaxed mb-4">{t.goalP1}</p>
          <p className="text-[#9a8f85] leading-relaxed">{t.goalP2}</p>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-black text-[#f5f0eb] mb-4">{t.formatGroupsLabel}</h2>
          <div className="rounded-xl bg-[#1a1612] border border-orange-900/20 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-orange-900/20">
                  <th className="text-left px-5 py-3 text-orange-400 font-semibold text-xs uppercase tracking-widest">{t.groupHeader}</th>
                  <th className="text-left px-5 py-3 text-orange-400 font-semibold text-xs uppercase tracking-widest">{t.exampleHeader}</th>
                </tr>
              </thead>
              <tbody className="text-[#9a8f85]">
                {formatGroups.map(([group, example]) => (
                  <tr key={group} className="border-b border-orange-900/10 last:border-0">
                    <td className="px-5 py-3 font-mono text-orange-300/70 text-xs">{group}</td>
                    <td className="px-5 py-3 text-xs">{example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[#9a8f85] text-xs mt-3">{t.note}</p>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-black text-[#f5f0eb] mb-4">{u.usage}</h2>

          <h3 className="text-[#f5f0eb] font-semibold mb-2 text-sm">{t.step1}</h3>
          <div className="rounded-xl bg-[#0c0a08] border border-orange-900/20 p-5 font-mono text-sm text-orange-300/80 mb-6 overflow-x-auto">
            <pre>{`streamlit\\timestamps\\start.cmd`}</pre>
          </div>

          <h3 className="text-[#f5f0eb] font-semibold mb-2 text-sm">{t.step2}</h3>
          <p className="text-[#9a8f85] text-sm mb-6">{t.step2Body}</p>

          <h3 className="text-[#f5f0eb] font-semibold mb-2 text-sm">{t.step3}</h3>
          <p className="text-[#9a8f85] text-sm mb-3">{t.step3Body}</p>
          <div className="rounded-xl bg-[#0c0a08] border border-orange-900/20 p-5 font-mono text-sm text-orange-300/80 mb-6 overflow-x-auto">
            <pre>{`2024-04-12T14:30:00Z
12-04-2024
April 12 2024
20240412`}</pre>
          </div>

          <h3 className="text-[#f5f0eb] font-semibold mb-2 text-sm">{t.step4}</h3>
          <p className="text-[#9a8f85] text-sm">{t.step4Body}</p>
        </section>

        <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-orange-900/20">
          <a href="https://github.com/Steef-Datamodder/datamodder_utils/tree/main/streamlit/timestamps" target="_blank" rel="noopener noreferrer"
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
