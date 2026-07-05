import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Anonymizer — Utils — Datamodder",
  description: "Snowflake stored procedure om persoonsgegevens te anonimiseren voor test- en ontwikkelomgevingen.",
};

const methods = [
  {
    name: "shuffle",
    desc: "Herverdeelt bestaande kolomwaarden willekeurig over de rijen. De data blijft realistisch, maar is niet meer herleidbaar naar een individu.",
  },
  {
    name: "shuffle_name",
    desc: "Vermengt voor- en achternamen slim door ze afzonderlijk te shuffelen, inclusief tussenvoegsels. Zo blijft de naamstructuur intact.",
  },
  {
    name: "shuffle_phone",
    desc: "Herverdeelt telefoonprefixen en -suffixen onafhankelijk per lengtegroep, zodat nummers realistisch blijven.",
  },
  {
    name: "shift_housenumber",
    desc: "Wijzigt huisnummers met ±2 of ±4, zodat adressen plausibel maar niet correct zijn.",
  },
  {
    name: "random_string",
    desc: "Genereert willekeurige strings op basis van een patroon. Gebruik 'a' voor een letter en '#' voor een cijfer, bijv. 'aa##aa' voor een postcode.",
  },
  {
    name: "random_lookup",
    desc: "Vult rijen met willekeurige waarden uit een andere tabelkolom. Handig voor realistische testdata uit een referentielijst.",
  },
];

export default function AnonymizerPage() {
  return (
    <>
      <div className="pt-28 pb-24 px-6">
        <div className="max-w-3xl mx-auto">

          <Link href="/utils" className="inline-flex items-center gap-2 text-[#9a8f85] text-sm hover:text-orange-400 transition-colors mb-10">
            <ArrowLeft size={14} /> Terug naar Utils
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
          <p className="text-[#9a8f85] text-lg leading-relaxed mb-12">
            Anonimiseer persoonsgegevens in Snowflake voor veilig gebruik in test- en ontwikkelomgevingen.
          </p>

          {/* Doel */}
          <section className="mb-12">
            <h2 className="text-xl font-black text-[#f5f0eb] mb-4">Doel</h2>
            <p className="text-[#9a8f85] leading-relaxed mb-4">
              Testomgevingen draaien idealiter met productiewaardige data, maar mogen geen echte persoonsgegevens bevatten. De Anonymizer lost dit op: hij verwerkt een kopie van je productietabel zodat de dataverdeling en statistieken bewaard blijven, maar de waarden niet meer herleidbaar zijn naar individuen.
            </p>
            <p className="text-[#9a8f85] leading-relaxed">
              Per kolom kies je de anonimiseringsmethode die het beste past bij het datatype en het doel van de testomgeving.
            </p>
          </section>

          {/* Methodes */}
          <section className="mb-12">
            <h2 className="text-xl font-black text-[#f5f0eb] mb-4">Wat je kunt verwachten</h2>
            <p className="text-[#9a8f85] leading-relaxed mb-6">
              De stored procedure biedt zes anonimiseringsmethodes:
            </p>
            <div className="space-y-3">
              {methods.map(({ name, desc }) => (
                <div key={name} className="p-5 rounded-xl bg-[#1a1612] border border-orange-900/20">
                  <p className="font-mono text-orange-300/80 text-sm mb-1">{name}</p>
                  <p className="text-[#9a8f85] text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Gebruik */}
          <section className="mb-12">
            <h2 className="text-xl font-black text-[#f5f0eb] mb-4">Gebruik</h2>

            <h3 className="text-[#f5f0eb] font-semibold mb-2 text-sm">1. Eenmalige setup</h3>
            <p className="text-[#9a8f85] text-sm mb-3">
              Voer eerst de globale <span className="text-orange-400 font-mono">setup.sql</span> uit als accountadmin. Daarna maak je de stored procedure aan:
            </p>
            <div className="rounded-xl bg-[#0c0a08] border border-orange-900/20 p-5 font-mono text-sm text-orange-300/80 mb-6 overflow-x-auto">
              <pre>{`-- Pas de variabelen bovenaan het script aan:
-- MY_DATABASE, MY_WAREHOUSE

-- Voer daarna uit:
execute immediate $$ ... $$;`}</pre>
            </div>

            <h3 className="text-[#f5f0eb] font-semibold mb-2 text-sm">2. Procedure aanroepen</h3>
            <p className="text-[#9a8f85] text-sm mb-3">
              Roep de procedure aan met de doeltabel en een kolom-configuratie. Per kolom geef je de methode op:
            </p>
            <div className="rounded-xl bg-[#0c0a08] border border-orange-900/20 p-5 font-mono text-sm text-orange-300/80 mb-6 overflow-x-auto">
              <pre>{`CALL datamodder.anonymize(
  'MIJN_DB.MIJN_SCHEMA.KLANTEN',
  ARRAY_CONSTRUCT(
    OBJECT_CONSTRUCT('column', 'NAAM',    'method', 'shuffle_name'),
    OBJECT_CONSTRUCT('column', 'EMAIL',   'method', 'random_string',
                     'pattern', 'aaaa####@test.nl'),
    OBJECT_CONSTRUCT('column', 'TELEFOON','method', 'shuffle_phone'),
    OBJECT_CONSTRUCT('column', 'ADRES',   'method', 'shift_housenumber')
  )
);`}</pre>
            </div>

            <h3 className="text-[#f5f0eb] font-semibold mb-2 text-sm">3. Controleren met de testscripts</h3>
            <p className="text-[#9a8f85] text-sm">
              Het meegeleverde <span className="text-orange-400 font-mono">test_anonymize_sp.sql</span> maakt voorbeelddata aan, voert de procedure uit en toont een voor-en-na vergelijking zodat je de output kunt valideren.
            </p>
          </section>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-orange-900/20">
            <a
              href="https://github.com/Steef-Datamodder/datamodder_utils/tree/main/Stored%20Procedure/Anonymize"
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
