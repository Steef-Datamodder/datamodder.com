import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CalendarDays, ExternalLink } from "lucide-react";
import { dict } from "@/lib/i18n";
import type { Lang } from "@/lib/i18n";

type PageProps = { params: Promise<{ lang: string }> };

const content = {
  nl: {
    meta: { title: "Generate Date Dimension — Utils — Datamodder", description: "dbt macro die automatisch een volledige datumdimensie genereert voor Snowflake, inclusief fiscale periodes en Nederlandse feestdagen." },
    lead: "Genereer een complete datumdimensie voor Snowflake, inclusief fiscale periodes en Nederlandse feestdagen.",
    goalP1: "Een datumdimensie is de ruggengraat van elk data warehouse. Met deze macro genereer je in één stap een volledige",
    goalP1b: "tabel voor Snowflake, met alle kalender- en fiscale attributen die je nodig hebt voor tijdgebaseerde analyses. Geen handmatig SQL meer, geen ontbrekende feestdagen.",
    goalP2: "De macro berekent Nederlandse feestdagen automatisch, inclusief beweeglijke feestdagen zoals Pasen en Pinksteren (via het Computus-algoritme) en houdt rekening met de zondagsuitwijkregel voor Koningsdag.",
    paramsLabel: "Parameters", paramHeader: "Parameter", defaultHeader: "Standaard", descHeader: "Beschrijving",
    params: [
      ["start_date", "'2000-01-01'", "Begindatum van de dimensie"],
      ["end_date", "'2030-12-31'", "Einddatum van de dimensie"],
      ["fiscal_year_start_month", "1", "Startmaand van het fiscale jaar (1–12)"],
      ["dim_datum_taal", "'nl'", "Taal voor namen: 'nl' of 'en'"],
      ["schoolvakanties", "none", "Optionele tabel met schoolvakantiedata (van_datum, tot_datum, vakantie_naam, land, regio)."],
      ["schoolvakantie_land", "none", "Filter op land, bijv. 'NL'. Vereist schoolvakanties."],
      ["schoolvakantie_regio", "none", "Filter op regio, bijv. 'Noord'. Vereist schoolvakanties."],
    ],
    colGroupsIntro: "De gegenereerde tabel bevat kolommen over vijf dimensies:",
    colGroups: [
      { group: "Dag", cols: ["dag_nummer", "dag_van_het_jaar", "dag_van_de_week", "naam_van_de_dag", "weekend_vlag", "werkdag_vlag"] },
      { group: "Week", cols: ["kalenderweek", "iso_week_nummer", "iso_week_jaar", "iso_week_label"] },
      { group: "Maand", cols: ["maandnummer", "maandnaam", "maandafkorting", "maand_label"] },
      { group: "Kwartaal & Jaar", cols: ["kwartaal", "kwartaal_label", "kalenderjaar", "fiscaal_jaar", "fiscale_maand", "fiscaal_kwartaal"] },
      { group: "Feestdagen", cols: ["is_feestdag", "naam_feestdag"] },
      { group: "Schoolvakanties (optioneel)", cols: ["is_schoolvakantie", "schoolvakantie_naam"] },
    ],
    step1: "1. Maak een dbt model aan",
    step1Body: "Maak een bestand",
    step1Body2: "aan in je dbt models-map en roep de macro daarin aan:",
    step2: "2. Fiscaal jaar instellen",
    step2Body: "Begint jouw fiscale jaar in april? Geef de startmaand mee:",
    step3: "3. Schoolvakanties koppelen",
    step3Body: "Koppel een tabel met schoolvakantiedata en filter optioneel op land en regio. De macro voegt",
    step3Body2: "en",
    step3Body3: "toe aan de output:",
    vacColHeader: "Kolom", vacTypeHeader: "Type", vacDescHeader: "Beschrijving",
    vacCols: [
      ["van_datum", "DATE", "Eerste dag van de vakantie"],
      ["tot_datum", "DATE", "Laatste dag van de vakantie"],
      ["vakantie_naam", "TEXT", "Naam, bijv. \"Zomervakantie\""],
      ["land", "TEXT", "Landcode, bijv. 'NL'"],
      ["regio", "TEXT", "Regio of null voor heel het land"],
    ],
    countriesLabel: "Ondersteunde landen en databronnen:",
    countryHeader: "Land", regionHeader: "Regio's", sourceHeader: "Bron",
    step4: "4. Taal configureren",
    step4Body: "Stel de taal in via een dbt variabele in",
    step4Body2: ":",
  },
  en: {
    meta: { title: "Generate Date Dimension — Utils — Datamodder", description: "dbt macro that automatically generates a complete date dimension for Snowflake, including fiscal periods and Dutch public holidays." },
    lead: "Generate a complete date dimension for Snowflake, including fiscal periods and Dutch public holidays.",
    goalP1: "A date dimension is the backbone of every data warehouse. This macro generates a complete",
    goalP1b: "table for Snowflake in one step, with all calendar and fiscal attributes you need for time-based analyses. No more manual SQL, no missing holidays.",
    goalP2: "The macro calculates Dutch public holidays automatically, including moveable holidays like Easter and Pentecost (via the Computus algorithm), and accounts for the Sunday shift rule for King's Day.",
    paramsLabel: "Parameters", paramHeader: "Parameter", defaultHeader: "Default", descHeader: "Description",
    params: [
      ["start_date", "'2000-01-01'", "Start date of the dimension"],
      ["end_date", "'2030-12-31'", "End date of the dimension"],
      ["fiscal_year_start_month", "1", "Start month of the fiscal year (1–12)"],
      ["dim_datum_taal", "'nl'", "Language for names: 'nl' or 'en'"],
      ["schoolvakanties", "none", "Optional table with school holiday data (van_datum, tot_datum, vakantie_naam, land, regio)."],
      ["schoolvakantie_land", "none", "Filter by country, e.g. 'NL'. Requires schoolvakanties."],
      ["schoolvakantie_regio", "none", "Filter by region, e.g. 'Noord'. Requires schoolvakanties."],
    ],
    colGroupsIntro: "The generated table contains columns across five dimensions:",
    colGroups: [
      { group: "Day", cols: ["dag_nummer", "dag_van_het_jaar", "dag_van_de_week", "naam_van_de_dag", "weekend_vlag", "werkdag_vlag"] },
      { group: "Week", cols: ["kalenderweek", "iso_week_nummer", "iso_week_jaar", "iso_week_label"] },
      { group: "Month", cols: ["maandnummer", "maandnaam", "maandafkorting", "maand_label"] },
      { group: "Quarter & Year", cols: ["kwartaal", "kwartaal_label", "kalenderjaar", "fiscaal_jaar", "fiscale_maand", "fiscaal_kwartaal"] },
      { group: "Holidays", cols: ["is_feestdag", "naam_feestdag"] },
      { group: "School holidays (optional)", cols: ["is_schoolvakantie", "schoolvakantie_naam"] },
    ],
    step1: "1. Create a dbt model",
    step1Body: "Create a file called",
    step1Body2: "in your dbt models folder and call the macro in it:",
    step2: "2. Set fiscal year",
    step2Body: "Does your fiscal year start in April? Pass the start month:",
    step3: "3. Add school holidays",
    step3Body: "Connect a table with school holiday data and optionally filter by country and region. The macro adds",
    step3Body2: "and",
    step3Body3: "to the output:",
    vacColHeader: "Column", vacTypeHeader: "Type", vacDescHeader: "Description",
    vacCols: [
      ["van_datum", "DATE", "First day of the holiday"],
      ["tot_datum", "DATE", "Last day of the holiday"],
      ["vakantie_naam", "TEXT", "Name, e.g. \"Summer holiday\""],
      ["land", "TEXT", "Country code, e.g. 'NL'"],
      ["regio", "TEXT", "Region or null for the whole country"],
    ],
    countriesLabel: "Supported countries and data sources:",
    countryHeader: "Country", regionHeader: "Regions", sourceHeader: "Source",
    step4: "4. Configure language",
    step4Body: "Set the language via a dbt variable in",
    step4Body2: ":",
  },
  de: {
    meta: { title: "Generate Date Dimension — Utils — Datamodder", description: "dbt-Makro, das automatisch eine vollständige Datumsdimension für Snowflake generiert, einschließlich Fiskalperioden und niederländischer Feiertage." },
    lead: "Generieren Sie eine vollständige Datumsdimension für Snowflake, einschließlich Fiskalperioden und niederländischer Feiertage.",
    goalP1: "Eine Datumsdimension ist das Rückgrat jedes Data Warehouses. Dieses Makro generiert in einem Schritt eine vollständige",
    goalP1b: "Tabelle für Snowflake mit allen Kalender- und Fiskalattributen, die Sie für zeitbasierte Analysen benötigen. Kein manuelles SQL mehr, keine fehlenden Feiertage.",
    goalP2: "Das Makro berechnet niederländische Feiertage automatisch, einschließlich beweglicher Feiertage wie Ostern und Pfingsten (über den Computus-Algorithmus), und berücksichtigt die Sonntagsausweichregel für den Königstag.",
    paramsLabel: "Parameter", paramHeader: "Parameter", defaultHeader: "Standard", descHeader: "Beschreibung",
    params: [
      ["start_date", "'2000-01-01'", "Startdatum der Dimension"],
      ["end_date", "'2030-12-31'", "Enddatum der Dimension"],
      ["fiscal_year_start_month", "1", "Startmonat des Geschäftsjahres (1–12)"],
      ["dim_datum_taal", "'nl'", "Sprache für Namen: 'nl' oder 'en'"],
      ["schoolvakanties", "none", "Optionale Tabelle mit Schulferiendata (van_datum, tot_datum, vakantie_naam, land, regio)."],
      ["schoolvakantie_land", "none", "Filter nach Land, z. B. 'NL'. Erfordert schoolvakanties."],
      ["schoolvakantie_regio", "none", "Filter nach Region, z. B. 'Noord'. Erfordert schoolvakanties."],
    ],
    colGroupsIntro: "Die generierte Tabelle enthält Spalten über fünf Dimensionen:",
    colGroups: [
      { group: "Tag", cols: ["dag_nummer", "dag_van_het_jaar", "dag_van_de_week", "naam_van_de_dag", "weekend_vlag", "werkdag_vlag"] },
      { group: "Woche", cols: ["kalenderweek", "iso_week_nummer", "iso_week_jaar", "iso_week_label"] },
      { group: "Monat", cols: ["maandnummer", "maandnaam", "maandafkorting", "maand_label"] },
      { group: "Quartal & Jahr", cols: ["kwartaal", "kwartaal_label", "kalenderjaar", "fiscaal_jaar", "fiscale_maand", "fiscaal_kwartaal"] },
      { group: "Feiertage", cols: ["is_feestdag", "naam_feestdag"] },
      { group: "Schulferien (optional)", cols: ["is_schoolvakantie", "schoolvakantie_naam"] },
    ],
    step1: "1. Ein dbt-Modell anlegen",
    step1Body: "Erstellen Sie eine Datei",
    step1Body2: "in Ihrem dbt-Models-Ordner und rufen Sie das Makro darin auf:",
    step2: "2. Geschäftsjahr festlegen",
    step2Body: "Beginnt Ihr Geschäftsjahr im April? Übergeben Sie den Startmonat:",
    step3: "3. Schulferien hinzufügen",
    step3Body: "Verbinden Sie eine Tabelle mit Schulferiendata und filtern Sie optional nach Land und Region. Das Makro fügt",
    step3Body2: "und",
    step3Body3: "zur Ausgabe hinzu:",
    vacColHeader: "Spalte", vacTypeHeader: "Typ", vacDescHeader: "Beschreibung",
    vacCols: [
      ["van_datum", "DATE", "Erster Tag der Ferien"],
      ["tot_datum", "DATE", "Letzter Tag der Ferien"],
      ["vakantie_naam", "TEXT", "Name, z. B. \"Sommerferien\""],
      ["land", "TEXT", "Ländercode, z. B. 'NL'"],
      ["regio", "TEXT", "Region oder null für das gesamte Land"],
    ],
    countriesLabel: "Unterstützte Länder und Datenquellen:",
    countryHeader: "Land", regionHeader: "Regionen", sourceHeader: "Quelle",
    step4: "4. Sprache konfigurieren",
    step4Body: "Legen Sie die Sprache über eine dbt-Variable in",
    step4Body2: "fest:",
  },
};

const schoollandenRows = [
  ["NL", "Noord, Midden, Zuid", "rijksoverheid.nl"],
  ["BE", "NL, FR, DE gemeenschappen", "onderwijs.vlaanderen.be / enseignement.be"],
  ["DE", "16 Bundesländer", "kmk.org"],
  ["GB", "Per local authority", "gov.uk"],
  ["FR", "Zones A, B, C", "education.gouv.fr"],
  ["US", "School district niveau", "Geen centrale bron"],
];

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  return content[(lang as Lang)]?.meta ?? content.nl.meta;
}

export default async function GenerateDateDimensionPage({ params }: PageProps) {
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
            <CalendarDays size={24} />
          </div>
          <div>
            <p className="text-orange-500/70 text-xs font-semibold uppercase tracking-widest mb-0.5">dbt macro</p>
            <h1 className="text-3xl font-black text-[#f5f0eb]">Generate Date Dimension</h1>
          </div>
        </div>
        <p className="text-[#9a8f85] text-lg leading-relaxed mb-12">{t.lead}</p>

        <section className="mb-12">
          <h2 className="text-xl font-black text-[#f5f0eb] mb-4">{u.goal}</h2>
          <p className="text-[#9a8f85] leading-relaxed mb-4">
            {t.goalP1} <span className="text-orange-400 font-mono text-sm">dim_datum</span> {t.goalP1b}
          </p>
          <p className="text-[#9a8f85] leading-relaxed">{t.goalP2}</p>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-black text-[#f5f0eb] mb-4">{t.paramsLabel}</h2>
          <div className="rounded-xl bg-[#1a1612] border border-orange-900/20 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-orange-900/20">
                  <th className="text-left px-5 py-3 text-orange-400 font-semibold font-mono text-xs">{t.paramHeader}</th>
                  <th className="text-left px-5 py-3 text-orange-400 font-semibold text-xs uppercase tracking-widest">{t.defaultHeader}</th>
                  <th className="text-left px-5 py-3 text-orange-400 font-semibold text-xs uppercase tracking-widest">{t.descHeader}</th>
                </tr>
              </thead>
              <tbody className="text-[#9a8f85]">
                {t.params.map(([param, def, desc]) => (
                  <tr key={param} className="border-b border-orange-900/10 last:border-0">
                    <td className="px-5 py-3 font-mono text-orange-300/70 text-xs">{param}</td>
                    <td className="px-5 py-3 font-mono text-xs">{def}</td>
                    <td className="px-5 py-3 text-xs">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-black text-[#f5f0eb] mb-4">{u.whatToExpect}</h2>
          <p className="text-[#9a8f85] leading-relaxed mb-6">{t.colGroupsIntro}</p>
          <div className="space-y-3">
            {t.colGroups.map(({ group, cols }) => (
              <div key={group} className="p-5 rounded-xl bg-[#1a1612] border border-orange-900/20">
                <p className="text-[#f5f0eb] font-semibold text-sm mb-3">{group}</p>
                <div className="flex flex-wrap gap-2">
                  {cols.map((col) => (
                    <span key={col} className="px-2.5 py-1 rounded-lg bg-[#0c0a08] border border-orange-900/20 text-[#9a8f85] text-xs font-mono">{col}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-black text-[#f5f0eb] mb-4">{u.usage}</h2>

          <h3 className="text-[#f5f0eb] font-semibold mb-2 text-sm">{t.step1}</h3>
          <p className="text-[#9a8f85] text-sm mb-3">
            {t.step1Body} <span className="text-orange-400 font-mono">dim_datum.sql</span> {t.step1Body2}
          </p>
          <div className="rounded-xl bg-[#0c0a08] border border-orange-900/20 p-5 font-mono text-sm text-orange-300/80 mb-6 overflow-x-auto">
            <pre>{`{{ generate_date_dimension(
    start_date = '2000-01-01',
    end_date   = '2035-12-31'
) }}`}</pre>
          </div>

          <h3 className="text-[#f5f0eb] font-semibold mb-2 text-sm">{t.step2}</h3>
          <p className="text-[#9a8f85] text-sm mb-3">{t.step2Body}</p>
          <div className="rounded-xl bg-[#0c0a08] border border-orange-900/20 p-5 font-mono text-sm text-orange-300/80 mb-6 overflow-x-auto">
            <pre>{`{{ generate_date_dimension(
    fiscal_year_start_month = 4
) }}`}</pre>
          </div>

          <h3 className="text-[#f5f0eb] font-semibold mb-2 text-sm">{t.step3}</h3>
          <p className="text-[#9a8f85] text-sm mb-3">
            {t.step3Body} <span className="text-orange-400 font-mono">is_schoolvakantie</span> {t.step3Body2} <span className="text-orange-400 font-mono">schoolvakantie_naam</span> {t.step3Body3}
          </p>
          <div className="rounded-xl bg-[#0c0a08] border border-orange-900/20 p-5 font-mono text-sm text-orange-300/80 mb-6 overflow-x-auto">
            <pre>{`{{ generate_date_dimension(
    schoolvakanties      = ref('schoolvakanties'),
    schoolvakantie_land  = 'NL',
    schoolvakantie_regio = 'Noord'
) }}`}</pre>
          </div>

          <div className="rounded-xl bg-[#1a1612] border border-orange-900/20 overflow-hidden mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-orange-900/20">
                  <th className="text-left px-5 py-3 text-orange-400 font-semibold font-mono text-xs">{t.vacColHeader}</th>
                  <th className="text-left px-5 py-3 text-orange-400 font-semibold text-xs uppercase tracking-widest">{t.vacTypeHeader}</th>
                  <th className="text-left px-5 py-3 text-orange-400 font-semibold text-xs uppercase tracking-widest">{t.vacDescHeader}</th>
                </tr>
              </thead>
              <tbody className="text-[#9a8f85]">
                {t.vacCols.map(([col, type, desc]) => (
                  <tr key={col} className="border-b border-orange-900/10 last:border-0">
                    <td className="px-5 py-3 font-mono text-orange-300/70 text-xs">{col}</td>
                    <td className="px-5 py-3 font-mono text-xs">{type}</td>
                    <td className="px-5 py-3 text-xs">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-[#9a8f85] text-sm mb-3">{t.countriesLabel}</p>
          <div className="rounded-xl bg-[#1a1612] border border-orange-900/20 overflow-hidden mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-orange-900/20">
                  <th className="text-left px-5 py-3 text-orange-400 font-semibold text-xs uppercase tracking-widest">{t.countryHeader}</th>
                  <th className="text-left px-5 py-3 text-orange-400 font-semibold text-xs uppercase tracking-widest">{t.regionHeader}</th>
                  <th className="text-left px-5 py-3 text-orange-400 font-semibold text-xs uppercase tracking-widest">{t.sourceHeader}</th>
                </tr>
              </thead>
              <tbody className="text-[#9a8f85]">
                {schoollandenRows.map(([land, regio, bron]) => (
                  <tr key={land} className="border-b border-orange-900/10 last:border-0">
                    <td className="px-5 py-3 font-mono text-xs text-orange-300/70">{land}</td>
                    <td className="px-5 py-3 text-xs">{regio}</td>
                    <td className="px-5 py-3 font-mono text-xs">{bron}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="text-[#f5f0eb] font-semibold mb-2 text-sm">{t.step4}</h3>
          <p className="text-[#9a8f85] text-sm mb-3">
            {t.step4Body} <span className="text-orange-400 font-mono">dbt_project.yml</span>{t.step4Body2}
          </p>
          <div className="rounded-xl bg-[#0c0a08] border border-orange-900/20 p-5 font-mono text-sm text-orange-300/80 overflow-x-auto">
            <pre>{`vars:
  dim_datum_taal: 'nl'   # or 'en' for English column values`}</pre>
          </div>
        </section>

        <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-orange-900/20">
          <a href="https://github.com/Steef-Datamodder/datamodder_utils/tree/main/macros/date_dimension" target="_blank" rel="noopener noreferrer"
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
