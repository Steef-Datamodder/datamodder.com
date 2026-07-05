import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Timer, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Timestamp Tester App — Utils — Datamodder",
  description: "Streamlit app die timestampstrings test tegen Snowflake-parseerfuncties om het juiste formaatpatroon te vinden.",
};

const formatGroups = [
  ["ISO", "2024-04-12T14:30:00Z"],
  ["European", "12-04-2024, 12/04/2024"],
  ["US", "04/12/2024"],
  ["Compact", "20240412"],
  ["Oracle / MSSQL / PostgreSQL / MySQL / SAP", "Databasespecifieke formaten"],
  ["Maandnamen", "12 april 2024, April 12 2024"],
];

export default function TimestampsAppPage() {
  return (
    <>
      <div className="pt-28 pb-24 px-6">
        <div className="max-w-3xl mx-auto">

          <Link href="/utils" className="inline-flex items-center gap-2 text-[#9a8f85] text-sm hover:text-orange-400 transition-colors mb-10">
            <ArrowLeft size={14} /> Terug naar Utils
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
          <p className="text-[#9a8f85] text-lg leading-relaxed mb-12">
            Test timestampstrings rechtstreeks in Snowflake om te achterhalen welk formaatpatroon overeenkomt — inclusief ondersteuning voor alle formaatgroepen uit de Timestamps macro.
          </p>

          {/* Doel */}
          <section className="mb-12">
            <h2 className="text-xl font-black text-[#f5f0eb] mb-4">Doel</h2>
            <p className="text-[#9a8f85] leading-relaxed mb-4">
              Bij het onboarden van een nieuwe databron weet je vaak niet in welk formaat datumstrings zijn opgeslagen. De Timestamp Tester stuurt je invoer als één query naar Snowflake, test elke waarde tegen alle geselecteerde formaatgroepen en toont direct welk patroon matcht — en welke waarden onparseerbaar zijn.
            </p>
            <p className="text-[#9a8f85] leading-relaxed">
              De resultaten worden kleurgecodeerd weergegeven: groen voor een match, rood voor een mislukking. Niet-matchende waarden worden apart opgelijst.
            </p>
          </section>

          {/* Formaatgroepen */}
          <section className="mb-12">
            <h2 className="text-xl font-black text-[#f5f0eb] mb-4">Ondersteunde formaatgroepen</h2>
            <div className="rounded-xl bg-[#1a1612] border border-orange-900/20 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-orange-900/20">
                    <th className="text-left px-5 py-3 text-orange-400 font-semibold text-xs uppercase tracking-widest">Groep</th>
                    <th className="text-left px-5 py-3 text-orange-400 font-semibold text-xs uppercase tracking-widest">Voorbeelden</th>
                  </tr>
                </thead>
                <tbody className="text-[#9a8f85]">
                  {formatGroups.map(([groep, voorbeeld]) => (
                    <tr key={groep} className="border-b border-orange-900/10 last:border-0">
                      <td className="px-5 py-3 font-mono text-orange-300/70 text-xs">{groep}</td>
                      <td className="px-5 py-3 text-xs">{voorbeeld}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[#9a8f85] text-xs mt-3">
              Compact-formaten worden altijd als eerste getest om verkeerde interpretatie te voorkomen. ISO-waarden met T-scheidingsteken of afsluitende Z krijgen een fallback-test.
            </p>
          </section>

          {/* Gebruik */}
          <section className="mb-12">
            <h2 className="text-xl font-black text-[#f5f0eb] mb-4">Gebruik</h2>

            <h3 className="text-[#f5f0eb] font-semibold mb-2 text-sm">1. Start de app</h3>
            <div className="rounded-xl bg-[#0c0a08] border border-orange-900/20 p-5 font-mono text-sm text-orange-300/80 mb-6 overflow-x-auto">
              <pre>{`streamlit\\timestamps\\start.cmd`}</pre>
            </div>

            <h3 className="text-[#f5f0eb] font-semibold mb-2 text-sm">2. Verbind met Snowflake</h3>
            <p className="text-[#9a8f85] text-sm mb-6">
              Vul je Snowflake-accountgegevens in de zijbalk in. De app slaat je inloggegevens lokaal op via Windows Credential Manager.
            </p>

            <h3 className="text-[#f5f0eb] font-semibold mb-2 text-sm">3. Voer timestampstrings in</h3>
            <p className="text-[#9a8f85] text-sm mb-3">
              Plak één of meerdere waarden in het invoerveld (één per regel) en kies welke formaatgroepen je wil testen:
            </p>
            <div className="rounded-xl bg-[#0c0a08] border border-orange-900/20 p-5 font-mono text-sm text-orange-300/80 mb-6 overflow-x-auto">
              <pre>{`2024-04-12T14:30:00Z
12-04-2024
April 12 2024
20240412`}</pre>
            </div>

            <h3 className="text-[#f5f0eb] font-semibold mb-2 text-sm">4. Bekijk resultaten</h3>
            <p className="text-[#9a8f85] text-sm">
              De tabel toont per waarde het origineel, het matchende formaatpatroon en de geparseerde timestamp. Niet-matchende waarden worden rood gemarkeerd en apart opgelijst.
            </p>
          </section>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-orange-900/20">
            <a
              href="https://github.com/Steef-Datamodder/datamodder_utils/tree/main/streamlit/timestamps"
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
