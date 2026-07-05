import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FileCode2, ExternalLink } from "lucide-react";
import { dict } from "@/lib/i18n";
import type { Lang } from "@/lib/i18n";

type PageProps = { params: Promise<{ lang: string }> };

const content = {
  nl: {
    meta: { title: "SQL Formatter — Utils — Datamodder", description: "Notepad++ plugin om SQL automatisch op te maken. Formatteer een selectie of het hele document met Ctrl+Alt+F." },
    lead: "Formatteer SQL direct vanuit Notepad++ met één toetscombinatie, op een selectie of het hele document.",
    goalP1: "SQL schrijven gaat snel, maar netjes houden kost tijd. De SQL Formatter plugin voegt een formaatknop toe aan Notepad++ die je SQL automatisch indenteert en structureert. Of je nu een losse query netjes wil maken of een heel script in één keer wil opruimen: één toetscombinatie doet het werk.",
    goalP2: "De plugin is geschreven in C# en werkt als brug naar een Python-gebaseerde formatter. De DLL en het uitvoerbare formatter-bestand werken samen in de Notepad++ plugin-map.",
    features: [
      { title: "Selectiebewust", desc: "Is er tekst geselecteerd? Dan wordt alleen die selectie geformatteerd. Geen selectie? Dan wordt het hele document aangepakt. Zo kun je een losse subquery opschonen zonder de rest van het bestand te raken." },
      { title: "Sneltoets Ctrl+Alt+F", desc: "De formatter is direct beschikbaar via het Notepad++ pluginmenu én via de sneltoets Ctrl+Alt+F. Formatteren kost je geen muisklikken meer." },
      { title: "UTF-8 uitvoer", desc: "De output is altijd UTF-8 gecodeerd, zodat speciale tekens en internationale kolomnamen correct bewaard blijven." },
    ],
    step1: "1. Installatie",
    step1Body: "Kopieer de plugin-DLL én",
    step1Body2: "naar de Notepad++ plugin-map. De twee bestanden moeten in dezelfde map staan:",
    step2: "2. Plugin activeren",
    step2Body: "Start Notepad++ opnieuw op. De plugin verschijnt automatisch onder",
    step3: "3. SQL formatteren",
    step3Body: "Open een SQL-bestand of plak een query in een nieuw tabblad. Druk op",
    step3Body2: "of ga via het menu:",
  },
  en: {
    meta: { title: "SQL Formatter — Utils — Datamodder", description: "Notepad++ plugin to automatically format SQL. Format a selection or the whole document with Ctrl+Alt+F." },
    lead: "Format SQL directly from Notepad++ with one keyboard shortcut, on a selection or the whole document.",
    goalP1: "Writing SQL is fast, but keeping it tidy takes time. The SQL Formatter plugin adds a format button to Notepad++ that automatically indents and structures your SQL. Whether you want to tidy up a single query or clean up an entire script at once: one keyboard shortcut does the job.",
    goalP2: "The plugin is written in C# and acts as a bridge to a Python-based formatter. The DLL and the formatter executable work together in the Notepad++ plugin folder.",
    features: [
      { title: "Selection-aware", desc: "Is text selected? Only that selection is formatted. No selection? The entire document is processed. This way you can clean up a single subquery without touching the rest of the file." },
      { title: "Shortcut Ctrl+Alt+F", desc: "The formatter is directly available via the Notepad++ plugin menu and via the keyboard shortcut Ctrl+Alt+F. Formatting no longer requires mouse clicks." },
      { title: "UTF-8 output", desc: "The output is always UTF-8 encoded, so special characters and international column names are preserved correctly." },
    ],
    step1: "1. Installation",
    step1Body: "Copy the plugin DLL and",
    step1Body2: "to the Notepad++ plugin folder. The two files must be in the same folder:",
    step2: "2. Activate plugin",
    step2Body: "Restart Notepad++. The plugin appears automatically under",
    step3: "3. Format SQL",
    step3Body: "Open a SQL file or paste a query into a new tab. Press",
    step3Body2: "or go via the menu:",
  },
  de: {
    meta: { title: "SQL Formatter — Utils — Datamodder", description: "Notepad++-Plugin zum automatischen Formatieren von SQL. Formatieren Sie eine Auswahl oder das gesamte Dokument mit Strg+Alt+F." },
    lead: "Formatieren Sie SQL direkt aus Notepad++ mit einer Tastenkombination, auf einer Auswahl oder dem gesamten Dokument.",
    goalP1: "SQL schreiben geht schnell, aber ordentlich halten kostet Zeit. Das SQL Formatter Plugin fügt Notepad++ eine Formatierungsschaltfläche hinzu, die Ihr SQL automatisch einrückt und strukturiert. Ob Sie eine einzelne Abfrage aufräumen oder ein ganzes Skript auf einmal bereinigen möchten: Eine Tastenkombination erledigt die Arbeit.",
    goalP2: "Das Plugin ist in C# geschrieben und dient als Brücke zu einem Python-basierten Formatierer. Die DLL und die ausführbare Formatter-Datei arbeiten zusammen im Notepad++-Plugin-Ordner.",
    features: [
      { title: "Auswahlbewusst", desc: "Ist Text ausgewählt? Nur diese Auswahl wird formatiert. Keine Auswahl? Das gesamte Dokument wird verarbeitet. So können Sie eine einzelne Unterabfrage bereinigen, ohne den Rest der Datei zu berühren." },
      { title: "Tastenkürzel Strg+Alt+F", desc: "Der Formatierer ist direkt über das Notepad++-Plugin-Menü und über das Tastenkürzel Strg+Alt+F verfügbar. Formatieren erfordert keine Mausklicks mehr." },
      { title: "UTF-8-Ausgabe", desc: "Die Ausgabe ist immer UTF-8-kodiert, sodass Sonderzeichen und internationale Spaltennamen korrekt erhalten bleiben." },
    ],
    step1: "1. Installation",
    step1Body: "Kopieren Sie die Plugin-DLL und",
    step1Body2: "in den Notepad++-Plugin-Ordner. Die beiden Dateien müssen sich im selben Ordner befinden:",
    step2: "2. Plugin aktivieren",
    step2Body: "Starten Sie Notepad++ neu. Das Plugin erscheint automatisch unter",
    step3: "3. SQL formatieren",
    step3Body: "Öffnen Sie eine SQL-Datei oder fügen Sie eine Abfrage in ein neues Tab ein. Drücken Sie",
    step3Body2: "oder gehen Sie über das Menü:",
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  return content[(lang as Lang)]?.meta ?? content.nl.meta;
}

export default async function SqlFormatterPage({ params }: PageProps) {
  const { lang } = await params;
  const t = content[(lang as Lang)] ?? content.nl;
  const u = dict[(lang as Lang)]?.utils ?? dict.nl.utils;
  const shortcut = lang === 'de' ? 'Strg+Alt+F' : 'Ctrl+Alt+F';

  return (
    <div className="pt-28 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href={`/${lang}/utils`} className="inline-flex items-center gap-2 text-[#9a8f85] text-sm hover:text-orange-400 transition-colors mb-10">
          <ArrowLeft size={14} /> {u.back}
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
        <p className="text-[#9a8f85] text-lg leading-relaxed mb-12">{t.lead}</p>

        <section className="mb-12">
          <h2 className="text-xl font-black text-[#f5f0eb] mb-4">{u.goal}</h2>
          <p className="text-[#9a8f85] leading-relaxed mb-4">{t.goalP1}</p>
          <p className="text-[#9a8f85] leading-relaxed">{t.goalP2}</p>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-black text-[#f5f0eb] mb-4">{u.whatToExpect}</h2>
          <div className="space-y-3">
            {t.features.map(({ title, desc }) => (
              <div key={title} className="p-5 rounded-xl bg-[#1a1612] border border-orange-900/20">
                <p className="text-[#f5f0eb] font-semibold text-sm mb-1">{title}</p>
                <p className="text-[#9a8f85] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-black text-[#f5f0eb] mb-4">{u.usage}</h2>

          <h3 className="text-[#f5f0eb] font-semibold mb-2 text-sm">{t.step1}</h3>
          <p className="text-[#9a8f85] text-sm mb-3">
            {t.step1Body} <span className="text-orange-400 font-mono">sql_formatter.exe</span> {t.step1Body2}
          </p>
          <div className="rounded-xl bg-[#0c0a08] border border-orange-900/20 p-5 font-mono text-sm text-orange-300/80 mb-6 overflow-x-auto">
            <pre>{`C:\\Program Files\\Notepad++\\plugins\\
  SqlFormatter\\
    SqlFormatter.dll
    sql_formatter.exe`}</pre>
          </div>

          <h3 className="text-[#f5f0eb] font-semibold mb-2 text-sm">{t.step2}</h3>
          <p className="text-[#9a8f85] text-sm mb-3">
            {t.step2Body} <span className="text-orange-400 font-mono">Plugins → SQL Formatter</span>.
          </p>

          <h3 className="text-[#f5f0eb] font-semibold mb-2 text-sm">{t.step3}</h3>
          <p className="text-[#9a8f85] text-sm mb-3">
            {t.step3Body} <span className="text-orange-400 font-mono">{shortcut}</span> {t.step3Body2}
          </p>
          <div className="rounded-xl bg-[#0c0a08] border border-orange-900/20 p-5 font-mono text-sm text-orange-300/80 overflow-x-auto">
            <pre>{`Plugins → SQL Formatter → Format SQL`}</pre>
          </div>
        </section>

        <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-orange-900/20">
          <a href="https://github.com/Steef-Datamodder/datamodder_utils/tree/main/plugins/npp_sqlformatter" target="_blank" rel="noopener noreferrer"
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
