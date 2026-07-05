import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FileCode2, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "SQL Formatter — Utils — Datamodder",
  description: "Notepad++ plugin om SQL automatisch op te maken. Formatteer een selectie of het hele document met Ctrl+Alt+F.",
};

export default function SqlFormatterPage() {
  return (
    <>
      <div className="pt-28 pb-24 px-6">
        <div className="max-w-3xl mx-auto">

          <Link href="/utils" className="inline-flex items-center gap-2 text-[#9a8f85] text-sm hover:text-orange-400 transition-colors mb-10">
            <ArrowLeft size={14} /> Terug naar Utils
          </Link>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 flex-shrink-0">
              <FileCode2 size={24} />
            </div>
            <div>
              <p className="text-orange-500/70 text-xs font-semibold uppercase tracking-widest mb-0.5">Notepad++ plugin</p>
              <h1 className="text-3xl font-black text-[#f5f0eb]">SQL Formatter</h1>
            </div>
          </div>
          <p className="text-[#9a8f85] text-lg leading-relaxed mb-12">
            Formatteer SQL direct vanuit Notepad++ met één toetscombinatie, op een selectie of het hele document.
          </p>

          {/* Doel */}
          <section className="mb-12">
            <h2 className="text-xl font-black text-[#f5f0eb] mb-4">Doel</h2>
            <p className="text-[#9a8f85] leading-relaxed mb-4">
              SQL schrijven gaat snel, maar netjes houden kost tijd. De SQL Formatter plugin voegt een formaatknop toe aan Notepad++ die je SQL automatisch indenteert en structureert. Of je nu een losse query netjes wil maken of een heel script in één keer wil opruimen: één toetscombinatie doet het werk.
            </p>
            <p className="text-[#9a8f85] leading-relaxed">
              De plugin is geschreven in C# en werkt als brug naar een Python-gebaseerde formatter. De DLL en het uitvoerbare formatter-bestand werken samen in de Notepad++ plugin-map.
            </p>
          </section>

          {/* Wat je kunt verwachten */}
          <section className="mb-12">
            <h2 className="text-xl font-black text-[#f5f0eb] mb-4">Wat je kunt verwachten</h2>
            <div className="space-y-3">
              <div className="p-5 rounded-xl bg-[#1a1612] border border-orange-900/20">
                <p className="text-[#f5f0eb] font-semibold text-sm mb-1">Selectiebewust</p>
                <p className="text-[#9a8f85] text-sm leading-relaxed">
                  Is er tekst geselecteerd? Dan wordt alleen die selectie geformatteerd. Geen selectie? Dan wordt het hele document aangepakt. Zo kun je een losse subquery opschonen zonder de rest van het bestand te raken.
                </p>
              </div>
              <div className="p-5 rounded-xl bg-[#1a1612] border border-orange-900/20">
                <p className="text-[#f5f0eb] font-semibold text-sm mb-1">Sneltoets Ctrl+Alt+F</p>
                <p className="text-[#9a8f85] text-sm leading-relaxed">
                  De formatter is direct beschikbaar via het Notepad++ pluginmenu én via de sneltoets Ctrl+Alt+F. Formatteren kost je geen muisklikken meer.
                </p>
              </div>
              <div className="p-5 rounded-xl bg-[#1a1612] border border-orange-900/20">
                <p className="text-[#f5f0eb] font-semibold text-sm mb-1">UTF-8 uitvoer</p>
                <p className="text-[#9a8f85] text-sm leading-relaxed">
                  De output is altijd UTF-8 gecodeerd, zodat speciale tekens en internationale kolomnamen correct bewaard blijven.
                </p>
              </div>
            </div>
          </section>

          {/* Gebruik */}
          <section className="mb-12">
            <h2 className="text-xl font-black text-[#f5f0eb] mb-4">Gebruik</h2>

            <h3 className="text-[#f5f0eb] font-semibold mb-2 text-sm">1. Installatie</h3>
            <p className="text-[#9a8f85] text-sm mb-3">
              Kopieer de plugin-DLL én <span className="text-orange-400 font-mono">sql_formatter.exe</span> naar de Notepad++ plugin-map. De twee bestanden moeten in dezelfde map staan:
            </p>
            <div className="rounded-xl bg-[#0c0a08] border border-orange-900/20 p-5 font-mono text-sm text-orange-300/80 mb-6 overflow-x-auto">
              <pre>{`C:\\Program Files\\Notepad++\\plugins\\
  SqlFormatter\\
    SqlFormatter.dll
    sql_formatter.exe`}</pre>
            </div>

            <h3 className="text-[#f5f0eb] font-semibold mb-2 text-sm">2. Plugin activeren</h3>
            <p className="text-[#9a8f85] text-sm mb-3">
              Start Notepad++ opnieuw op. De plugin verschijnt automatisch onder <span className="text-orange-400 font-mono">Plugins → SQL Formatter</span>.
            </p>

            <h3 className="text-[#f5f0eb] font-semibold mb-2 text-sm">3. SQL formatteren</h3>
            <p className="text-[#9a8f85] text-sm mb-3">
              Open een SQL-bestand of plak een query in een nieuw tabblad. Druk op <span className="text-orange-400 font-mono">Ctrl+Alt+F</span> of ga via het menu:
            </p>
            <div className="rounded-xl bg-[#0c0a08] border border-orange-900/20 p-5 font-mono text-sm text-orange-300/80 overflow-x-auto">
              <pre>{`Plugins → SQL Formatter → Format SQL`}</pre>
            </div>
          </section>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-orange-900/20">
            <a
              href="https://github.com/Steef-Datamodder/datamodder_utils/tree/main/plugins/npp_sqlformatter"
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
