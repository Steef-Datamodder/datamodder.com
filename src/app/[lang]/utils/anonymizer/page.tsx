import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, ExternalLink } from "lucide-react";
import { dict } from "@/lib/i18n";
import type { Lang } from "@/lib/i18n";

type PageProps = { params: Promise<{ lang: string }> };

const content = {
  nl: {
    meta: { title: "Anonymizer — Utils — Datamodder", description: "Snowflake stored procedure om persoonsgegevens te anonimiseren voor test- en ontwikkelomgevingen." },
    lead: "Anonimiseer persoonsgegevens in Snowflake voor veilig gebruik in test- en ontwikkelomgevingen.",
    goalP1: "Testomgevingen draaien idealiter met productiewaardige data, maar mogen geen echte persoonsgegevens bevatten. De Anonymizer lost dit op: hij verwerkt een kopie van je productietabel zodat de dataverdeling en statistieken bewaard blijven, maar de waarden niet meer herleidbaar zijn naar individuen.",
    goalP2: "Per kolom kies je de anonimiseringsmethode die het beste past bij het datatype en het doel van de testomgeving.",
    methodsLabel: "De stored procedure biedt zes anonimiseringsmethodes:",
    methods: [
      { name: "shuffle", desc: "Herverdeelt bestaande kolomwaarden willekeurig over de rijen. De data blijft realistisch, maar is niet meer herleidbaar naar een individu." },
      { name: "shuffle_name", desc: "Vermengt voor- en achternamen slim door ze afzonderlijk te shuffelen, inclusief tussenvoegsels. Zo blijft de naamstructuur intact." },
      { name: "shuffle_phone", desc: "Herverdeelt telefoonprefixen en -suffixen onafhankelijk per lengtegroep, zodat nummers realistisch blijven." },
      { name: "shift_housenumber", desc: "Wijzigt huisnummers met ±2 of ±4, zodat adressen plausibel maar niet correct zijn." },
      { name: "random_string", desc: "Genereert willekeurige strings op basis van een patroon. Gebruik 'a' voor een letter en '#' voor een cijfer, bijv. 'aa##aa' voor een postcode." },
      { name: "random_lookup", desc: "Vult rijen met willekeurige waarden uit een andere tabelkolom. Handig voor realistische testdata uit een referentielijst." },
    ],
    step1: "1. Eenmalige setup",
    step1Body: "Voer eerst de globale",
    step1Body2: "uit als accountadmin. Daarna maak je de stored procedure aan:",
    step2: "2. Procedure aanroepen",
    step2Body: "Roep de procedure aan met de doeltabel en een kolom-configuratie. Per kolom geef je de methode op:",
    step3: "3. Controleren met de testscripts",
    step3Body: "Het meegeleverde",
    step3Body2: "maakt voorbeelddata aan, voert de procedure uit en toont een voor-en-na vergelijking.",
  },
  en: {
    meta: { title: "Anonymizer — Utils — Datamodder", description: "Snowflake stored procedure to anonymise personal data for test and development environments." },
    lead: "Anonymise personal data in Snowflake for safe use in test and development environments.",
    goalP1: "Test environments ideally run with production-quality data, but must not contain real personal data. The Anonymizer solves this: it processes a copy of your production table so that data distribution and statistics are preserved, but values can no longer be traced back to individuals.",
    goalP2: "Per column you choose the anonymisation method that best fits the data type and purpose of the test environment.",
    methodsLabel: "The stored procedure offers six anonymisation methods:",
    methods: [
      { name: "shuffle", desc: "Redistributes existing column values randomly across rows. The data remains realistic but is no longer traceable to an individual." },
      { name: "shuffle_name", desc: "Intelligently mixes first and last names by shuffling them separately, including infixes. The name structure remains intact." },
      { name: "shuffle_phone", desc: "Redistributes phone prefixes and suffixes independently per length group, so numbers remain realistic." },
      { name: "shift_housenumber", desc: "Changes house numbers by ±2 or ±4, so addresses are plausible but not correct." },
      { name: "random_string", desc: "Generates random strings based on a pattern. Use 'a' for a letter and '#' for a digit, e.g. 'aa##aa' for a postcode." },
      { name: "random_lookup", desc: "Fills rows with random values from another table column. Useful for realistic test data from a reference list." },
    ],
    step1: "1. One-time setup",
    step1Body: "First run the global",
    step1Body2: "as accountadmin. Then create the stored procedure:",
    step2: "2. Call the procedure",
    step2Body: "Call the procedure with the target table and a column configuration. Per column you specify the method:",
    step3: "3. Verify with test scripts",
    step3Body: "The included",
    step3Body2: "creates sample data, runs the procedure and shows a before-and-after comparison.",
  },
  de: {
    meta: { title: "Anonymizer — Utils — Datamodder", description: "Snowflake Stored Procedure zur Anonymisierung personenbezogener Daten für Test- und Entwicklungsumgebungen." },
    lead: "Anonymisieren Sie personenbezogene Daten in Snowflake für die sichere Verwendung in Test- und Entwicklungsumgebungen.",
    goalP1: "Testumgebungen laufen idealerweise mit produktionsnahen Daten, dürfen aber keine echten personenbezogenen Daten enthalten. Der Anonymizer löst dieses Problem: Er verarbeitet eine Kopie Ihrer Produktionstabelle, sodass Datenverteilung und Statistiken erhalten bleiben, die Werte aber nicht mehr auf Einzelpersonen zurückgeführt werden können.",
    goalP2: "Pro Spalte wählen Sie die Anonymisierungsmethode, die am besten zum Datentyp und Zweck der Testumgebung passt.",
    methodsLabel: "Die Stored Procedure bietet sechs Anonymisierungsmethoden:",
    methods: [
      { name: "shuffle", desc: "Verteilt bestehende Spaltenwerte zufällig auf die Zeilen um. Die Daten bleiben realistisch, sind aber nicht mehr auf Einzelpersonen zurückführbar." },
      { name: "shuffle_name", desc: "Mischt Vor- und Nachnamen intelligent, indem sie separat geshuffelt werden, einschließlich Infixe. Die Namensstruktur bleibt erhalten." },
      { name: "shuffle_phone", desc: "Verteilt Telefonpräfixe und -suffixe unabhängig pro Längengruppe um, sodass Nummern realistisch bleiben." },
      { name: "shift_housenumber", desc: "Ändert Hausnummern um ±2 oder ±4, sodass Adressen plausibel, aber nicht korrekt sind." },
      { name: "random_string", desc: "Generiert zufällige Strings basierend auf einem Muster. Verwenden Sie 'a' für einen Buchstaben und '#' für eine Ziffer, z. B. 'aa##aa' für eine Postleitzahl." },
      { name: "random_lookup", desc: "Füllt Zeilen mit zufälligen Werten aus einer anderen Tabellenspalte. Nützlich für realistische Testdaten aus einer Referenzliste." },
    ],
    step1: "1. Einmalige Einrichtung",
    step1Body: "Führen Sie zuerst das globale",
    step1Body2: "als accountadmin aus. Erstellen Sie dann die Stored Procedure:",
    step2: "2. Prozedur aufrufen",
    step2Body: "Rufen Sie die Prozedur mit der Zieltabelle und einer Spaltenkonfiguration auf. Pro Spalte geben Sie die Methode an:",
    step3: "3. Mit Testskripten überprüfen",
    step3Body: "Das mitgelieferte",
    step3Body2: "erstellt Beispieldaten, führt die Prozedur aus und zeigt einen Vorher-Nachher-Vergleich.",
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  return content[(lang as Lang)]?.meta ?? content.nl.meta;
}

export default async function AnonymizerPage({ params }: PageProps) {
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
            <ShieldCheck size={24} />
          </div>
          <div>
            <p className="text-orange-500/70 text-xs font-semibold uppercase tracking-widest mb-0.5">Stored Procedure</p>
            <h1 className="text-3xl font-black text-[#f5f0eb]">Anonymizer</h1>
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
          <p className="text-[#9a8f85] leading-relaxed mb-6">{t.methodsLabel}</p>
          <div className="space-y-3">
            {t.methods.map(({ name, desc }) => (
              <div key={name} className="p-5 rounded-xl bg-[#1a1612] border border-orange-900/20">
                <p className="font-mono text-orange-300/80 text-sm mb-1">{name}</p>
                <p className="text-[#9a8f85] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-black text-[#f5f0eb] mb-4">{u.usage}</h2>

          <h3 className="text-[#f5f0eb] font-semibold mb-2 text-sm">{t.step1}</h3>
          <p className="text-[#9a8f85] text-sm mb-3">
            {t.step1Body} <span className="text-orange-400 font-mono">setup.sql</span> {t.step1Body2}
          </p>
          <div className="rounded-xl bg-[#0c0a08] border border-orange-900/20 p-5 font-mono text-sm text-orange-300/80 mb-6 overflow-x-auto">
            <pre>{`-- Adjust variables at the top of the script:
-- MY_DATABASE, MY_WAREHOUSE

-- Then run:
execute immediate $$ ... $$;`}</pre>
          </div>

          <h3 className="text-[#f5f0eb] font-semibold mb-2 text-sm">{t.step2}</h3>
          <p className="text-[#9a8f85] text-sm mb-3">{t.step2Body}</p>
          <div className="rounded-xl bg-[#0c0a08] border border-orange-900/20 p-5 font-mono text-sm text-orange-300/80 mb-6 overflow-x-auto">
            <pre>{`CALL datamodder.anonymize(
  'MY_DB.MY_SCHEMA.CUSTOMERS',
  ARRAY_CONSTRUCT(
    OBJECT_CONSTRUCT('column', 'NAME',    'method', 'shuffle_name'),
    OBJECT_CONSTRUCT('column', 'EMAIL',   'method', 'random_string',
                     'pattern', 'aaaa####@test.com'),
    OBJECT_CONSTRUCT('column', 'PHONE',   'method', 'shuffle_phone'),
    OBJECT_CONSTRUCT('column', 'ADDRESS', 'method', 'shift_housenumber')
  )
);`}</pre>
          </div>

          <h3 className="text-[#f5f0eb] font-semibold mb-2 text-sm">{t.step3}</h3>
          <p className="text-[#9a8f85] text-sm">
            {t.step3Body} <span className="text-orange-400 font-mono">test_anonymize_sp.sql</span> {t.step3Body2}
          </p>
        </section>

        <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-orange-900/20">
          <a href="https://github.com/Steef-Datamodder/datamodder_utils/tree/main/Stored%20Procedure/Anonymize" target="_blank" rel="noopener noreferrer"
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
