import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, AppWindow, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Generate Sources App — Utils — Datamodder",
  description: "Streamlit app die automatisch dbt sources, stagingmodellen en projectconfiguratie genereert vanuit Snowflake.",
};

const features = [
  {
    titel: "Snowflake-verbinding",
    desc: "Sla je accountgegevens en wachtwoord lokaal op via keyring. De app onthoudt je vorige instellingen zodat je niet elke keer opnieuw hoeft in te loggen.",
  },
  {
    titel: "Database & schema selectie",
    desc: "Kies een database en filter op één of meerdere schema's. De app haalt tabel- en kolommetadata op via het Snowflake information schema.",
  },
  {
    titel: "Gegenereerde output",
    desc: "Bekijk de gegenereerde bestanden per tab met syntaxkleuring voordat je ze wegschrijft. Kies voor één gecombineerde sources.yml of een apart bestand per schema.",
  },
  {
    titel: "Bestanden wegschrijven",
    desc: "De app schrijft de gegenereerde bestanden direct naar je dbt-projectmap onder models/staging/ — inclusief de juiste mapstructuur.",
  },
];

const outputs = [
  ["sources.yml", "Source-definities met kolommetadata, per schema of gecombineerd."],
  ["stg_*.sql", "Stagingmodellen met select * from source() per tabel."],
  ["dbt_project.yml snippet", "Configuratieblok voor de models-sectie, georganiseerd per schema."],
];

export default function GenerateSourcesAppPage() {
  return (
    <>
      <div className="pt-28 pb-24 px-6">
        <div className="max-w-3xl mx-auto">

          <Link href="/utils" className="inline-flex items-center gap-2 text-[#9a8f85] text-sm hover:text-orange-400 transition-colors mb-10">
            <ArrowLeft size={14} /> Terug naar Utils
          </Link>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 flex-shrink-0">
              <AppWindow size={24} />
            </div>
            <div>
              <p className="text-orange-500/70 text-xs font-semibold uppercase tracking-widest mb-0.5">Streamlit app</p>
              <h1 className="text-3xl font-black text-[#f5f0eb]">Generate Sources</h1>
            </div>
          </div>
          <p className="text-[#9a8f85] text-lg leading-relaxed mb-12">
            Genereer automatisch dbt sources, stagingmodellen en projectconfiguratie vanuit Snowflake — via een lokale app met een grafische interface.
          </p>

          {/* Doel */}
          <section className="mb-12">
            <h2 className="text-xl font-black text-[#f5f0eb] mb-4">Doel</h2>
            <p className="text-[#9a8f85] leading-relaxed mb-4">
              De <span className="text-orange-400 font-mono text-sm">generate_sources</span> dbt-macro werkt prima in de terminal, maar deze Streamlit-app maakt het proces visueel: je kiest je database en schema's via dropdowns, ziet de gegenereerde code direct in syntaxkleuring, en schrijft de bestanden met één klik weg naar je dbt-project.
            </p>
            <p className="text-[#9a8f85] leading-relaxed">
              Handig bij het onboarden van nieuwe databronnen waarbij je snel een werkende staginglaag wil opzetten zonder handmatig YAML of SQL te schrijven.
            </p>
          </section>

          {/* Functies */}
          <section className="mb-12">
            <h2 className="text-xl font-black text-[#f5f0eb] mb-4">Functies</h2>
            <div className="space-y-3">
              {features.map(({ titel, desc }) => (
                <div key={titel} className="p-5 rounded-xl bg-[#1a1612] border border-orange-900/20">
                  <p className="text-[#f5f0eb] font-semibold text-sm mb-1">{titel}</p>
                  <p className="text-[#9a8f85] text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Output */}
          <section className="mb-12">
            <h2 className="text-xl font-black text-[#f5f0eb] mb-4">Gegenereerde bestanden</h2>
            <div className="rounded-xl bg-[#1a1612] border border-orange-900/20 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-orange-900/20">
                    <th className="text-left px-5 py-3 text-orange-400 font-semibold font-mono text-xs">Bestand</th>
                    <th className="text-left px-5 py-3 text-orange-400 font-semibold text-xs uppercase tracking-widest">Inhoud</th>
                  </tr>
                </thead>
                <tbody className="text-[#9a8f85]">
                  {outputs.map(([bestand, inhoud]) => (
                    <tr key={bestand} className="border-b border-orange-900/10 last:border-0">
                      <td className="px-5 py-3 font-mono text-orange-300/70 text-xs">{bestand}</td>
                      <td className="px-5 py-3 text-xs">{inhoud}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Gebruik */}
          <section className="mb-12">
            <h2 className="text-xl font-black text-[#f5f0eb] mb-4">Gebruik</h2>

            <h3 className="text-[#f5f0eb] font-semibold mb-2 text-sm">1. Installeer de vereisten</h3>
            <div className="rounded-xl bg-[#0c0a08] border border-orange-900/20 p-5 font-mono text-sm text-orange-300/80 mb-6 overflow-x-auto">
              <pre>{`pip install -r streamlit/generate_sources/requirements.txt`}</pre>
            </div>

            <h3 className="text-[#f5f0eb] font-semibold mb-2 text-sm">2. Start de app</h3>
            <div className="rounded-xl bg-[#0c0a08] border border-orange-900/20 p-5 font-mono text-sm text-orange-300/80 mb-6 overflow-x-auto">
              <pre>{`streamlit run streamlit/generate_sources/app.py`}</pre>
            </div>

            <h3 className="text-[#f5f0eb] font-semibold mb-2 text-sm">3. Verbind met Snowflake</h3>
            <p className="text-[#9a8f85] text-sm mb-3">
              Vul in de zijbalk je Snowflake-accountgegevens in. De app slaat deze lokaal op via keyring zodat je ze de volgende keer niet opnieuw hoeft in te voeren.
            </p>

            <h3 className="text-[#f5f0eb] font-semibold mb-2 text-sm">4. Genereer en schrijf weg</h3>
            <p className="text-[#9a8f85] text-sm">
              Selecteer een database en schema's, bekijk de gegenereerde code per tab, en klik op wegschrijven. De bestanden worden direct aangemaakt in de opgegeven dbt-projectmap.
            </p>
          </section>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-orange-900/20">
            <a
              href="https://github.com/Steef-Datamodder/datamodder_utils/tree/main/streamlit/generate_sources"
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
