import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowLeftRight, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Uniform Datatypes — Utils — Datamodder",
  description: "dbt macro die alle kolommen van een brontabel automatisch cast naar uniforme Snowflake datatypes.",
};

const typeMapping = [
  { bron: "VARCHAR, CHAR, TEXT, STRING, …", doel: "TEXT" },
  { bron: "NUMBER, DECIMAL, FLOAT, INT, …", doel: "DECIMAL(voor_komma, na_komma)" },
  { bron: "DATE, DATETIME, TIMESTAMP_*", doel: "TIMESTAMP_TZ" },
  { bron: "TIME", doel: "TIMESTAMP_TZ (ankerdatum 2000-01-01)" },
  { bron: "BOOLEAN, VARIANT, ARRAY, OBJECT", doel: "Ongewijzigd" },
];

const params = [
  ["relatie", "—", "Verplicht. Verwijzing naar de brontabel via ref() of source()."],
  ["voor_komma", "18", "Aantal cijfers vóór de komma bij DECIMAL casting."],
  ["na_komma", "4", "Aantal cijfers ná de komma bij DECIMAL casting."],
  ["kolommen_uitsluiten", "[]", "Lijst met kolomnamen die niet worden getransformeerd."],
];

export default function UniformDatatypesPage() {
  return (
    <>
      <div className="pt-28 pb-24 px-6">
        <div className="max-w-3xl mx-auto">

          <Link href="/utils" className="inline-flex items-center gap-2 text-[#9a8f85] text-sm hover:text-orange-400 transition-colors mb-10">
            <ArrowLeft size={14} /> Terug naar Utils
          </Link>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 flex-shrink-0">
              <ArrowLeftRight size={24} />
            </div>
            <div>
              <p className="text-orange-500/70 text-xs font-semibold uppercase tracking-widest mb-0.5">dbt macro</p>
              <h1 className="text-3xl font-black text-[#f5f0eb]">Uniform Datatypes</h1>
            </div>
          </div>
          <p className="text-[#9a8f85] text-lg leading-relaxed mb-12">
            Cast alle kolommen van een brontabel automatisch naar uniforme Snowflake datatypes, zonder handmatig elke kolom te hoeven specificeren.
          </p>

          {/* Doel */}
          <section className="mb-12">
            <h2 className="text-xl font-black text-[#f5f0eb] mb-4">Doel</h2>
            <p className="text-[#9a8f85] leading-relaxed mb-4">
              Brondata bevat vaak een wirwar aan datatypes: <span className="text-orange-400 font-mono text-sm">VARCHAR(255)</span>, <span className="text-orange-400 font-mono text-sm">CHAR(1)</span>, <span className="text-orange-400 font-mono text-sm">NUMBER(10,0)</span>, <span className="text-orange-400 font-mono text-sm">FLOAT</span> — afhankelijk van het bronsysteem. <span className="font-mono text-orange-300/80 text-sm">uniform_datatypes</span> inspecteert de metadata van een tabel en genereert automatisch een <span className="text-orange-400 font-mono text-sm">SELECT</span>-statement waarbij elke kolom naar een consistent doeltype wordt gecast.
            </p>
            <p className="text-[#9a8f85] leading-relaxed">
              Ongeldige waarden worden via <span className="text-orange-400 font-mono text-sm">TRY_TO_*</span>-functies afgehandeld: in plaats van een fout te geven, worden ze omgezet naar <span className="text-orange-400 font-mono text-sm">NULL</span>. Zo breekt een enkel vervuild getal je hele staginglaag niet meer.
            </p>
          </section>

          {/* Type mapping */}
          <section className="mb-12">
            <h2 className="text-xl font-black text-[#f5f0eb] mb-4">Type-mapping</h2>
            <div className="rounded-xl bg-[#1a1612] border border-orange-900/20 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-orange-900/20">
                    <th className="text-left px-5 py-3 text-orange-400 font-semibold text-xs uppercase tracking-widest">Brontype</th>
                    <th className="text-left px-5 py-3 text-orange-400 font-semibold text-xs uppercase tracking-widest">Doeltype</th>
                  </tr>
                </thead>
                <tbody className="text-[#9a8f85]">
                  {typeMapping.map(({ bron, doel }) => (
                    <tr key={bron} className="border-b border-orange-900/10 last:border-0">
                      <td className="px-5 py-3 font-mono text-orange-300/70 text-xs">{bron}</td>
                      <td className="px-5 py-3 font-mono text-xs">{doel}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Parameters */}
          <section className="mb-12">
            <h2 className="text-xl font-black text-[#f5f0eb] mb-4">Parameters</h2>
            <div className="rounded-xl bg-[#1a1612] border border-orange-900/20 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-orange-900/20">
                    <th className="text-left px-5 py-3 text-orange-400 font-semibold font-mono text-xs">Parameter</th>
                    <th className="text-left px-5 py-3 text-orange-400 font-semibold text-xs uppercase tracking-widest">Standaard</th>
                    <th className="text-left px-5 py-3 text-orange-400 font-semibold text-xs uppercase tracking-widest">Beschrijving</th>
                  </tr>
                </thead>
                <tbody className="text-[#9a8f85]">
                  {params.map(([param, def, desc]) => (
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

          {/* Gebruik */}
          <section className="mb-12">
            <h2 className="text-xl font-black text-[#f5f0eb] mb-4">Gebruik</h2>

            <h3 className="text-[#f5f0eb] font-semibold mb-2 text-sm">1. Aanroepen in een dbt model</h3>
            <p className="text-[#9a8f85] text-sm mb-3">
              Gebruik de macro als volledige body van een stagingmodel:
            </p>
            <div className="rounded-xl bg-[#0c0a08] border border-orange-900/20 p-5 font-mono text-sm text-orange-300/80 mb-6 overflow-x-auto">
              <pre>{`{{ uniform_datatypes(ref('mijn_brontabel')) }}`}</pre>
            </div>

            <h3 className="text-[#f5f0eb] font-semibold mb-2 text-sm">2. Precisie aanpassen</h3>
            <p className="text-[#9a8f85] text-sm mb-3">
              Stel de gewenste precisie in voor numerieke kolommen:
            </p>
            <div className="rounded-xl bg-[#0c0a08] border border-orange-900/20 p-5 font-mono text-sm text-orange-300/80 mb-6 overflow-x-auto">
              <pre>{`{{ uniform_datatypes(
    source('raw', 'orders'),
    voor_komma = 15,
    na_komma   = 2
) }}`}</pre>
            </div>

            <h3 className="text-[#f5f0eb] font-semibold mb-2 text-sm">3. Kolommen uitsluiten</h3>
            <p className="text-[#9a8f85] text-sm mb-3">
              Geef een lijst mee van kolommen die je ongewijzigd wil laten:
            </p>
            <div className="rounded-xl bg-[#0c0a08] border border-orange-900/20 p-5 font-mono text-sm text-orange-300/80 overflow-x-auto">
              <pre>{`{{ uniform_datatypes(
    ref('mijn_brontabel'),
    kolommen_uitsluiten = ['_loaded_at', '_row_hash']
) }}`}</pre>
            </div>
          </section>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-orange-900/20">
            <a
              href="https://github.com/Steef-Datamodder/datamodder_utils/tree/main/macros/datatypes"
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
