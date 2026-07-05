import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Heart, Target, Lightbulb } from "lucide-react";
import MudSparkles from "@/components/MudSparkles";
import type { Lang } from "@/lib/i18n";

type PageProps = { params: Promise<{ lang: string }> };

const content = {
  nl: {
    meta: { title: "Over Ons — Datamodder", description: "Leer meer over Datamodder, ons team en onze missie in data engineering." },
    h1a: "Over", h1b: "Datamodder",
    headerSub: "Een gedreven data engineering bureau uit Nederland en Duitsland, gespecialiseerd in het bouwen van dataplatforms die echt werken.",
    storyLabel: "Ons verhaal", storyH2a: "Waarom", storyH2b: "Datamodder?",
    story1: "Data engineering is complex. Organisaties waden door een zee van tools, platformen en buzzwords, zonder altijd te weten welke keuze de juiste is. Datamodder is opgericht om daarin helderheid te brengen.",
    story2: "De naam zegt het al: wij zijn niet bang om door de modder te waden. We duiken in complexe data-vraagstukken, legacy systemen en rommelige datasets, en we komen er aan de andere kant uit met een oplossing die werkt.",
    quote: '"Data is onze modder. Engineering is ons ambacht."',
    founded: "Gevestigd in Nederland en Duitsland",
    foundedYear: "Opgericht",
    valuesLabel: "Waar wij voor staan", valuesH2: "Onze waarden",
    values: [
      { title: "Resultaatgericht", desc: "Wij meten ons succes aan het succes van jouw project. Geen mooie praatjes, maar concrete resultaten." },
      { title: "Pragmatisch", desc: "De best mogelijke oplossing is niet altijd de leukste voor ons. Maar wij kiezen voor wat het beste past, niet voor wat we zelf leuk vinden." },
      { title: "Passie voor data", desc: "Data engineering is geen baan voor ons, het is een passie. En dat zie je terug in ons werk; met liefde gemaakt!" },
    ],
    ctaH2: "Samen met data aan de slag?",
    ctaBody: "Wij werken graag samen met organisaties die data serieus nemen. Neem contact op voor een vrijblijvend gesprek.",
    ctaBtn: "Maak kennis",
  },
  en: {
    meta: { title: "About — Datamodder", description: "Learn more about Datamodder, our team and our mission in data engineering." },
    h1a: "About", h1b: "Datamodder",
    headerSub: "A driven data engineering agency from the Netherlands and Germany, specialised in building data platforms that actually work.",
    storyLabel: "Our story", storyH2a: "Why", storyH2b: "Datamodder?",
    story1: "Data engineering is complex. Organisations wade through a sea of tools, platforms and buzzwords, without always knowing which choice is the right one. Datamodder was founded to bring clarity to that.",
    story2: "The name says it all: we are not afraid to wade through the mud. We dive into complex data challenges, legacy systems and messy datasets — and we come out the other side with a solution that works.",
    quote: '"Data is our mud. Engineering is our craft."',
    founded: "Based in the Netherlands and Germany",
    foundedYear: "Founded",
    valuesLabel: "What we stand for", valuesH2: "Our values",
    values: [
      { title: "Results-focused", desc: "We measure our success by the success of your project. No empty promises — concrete results." },
      { title: "Pragmatic", desc: "The best possible solution is not always the most exciting one for us. But we choose what fits best, not what we personally prefer." },
      { title: "Passion for data", desc: "Data engineering is not a job for us — it is a passion. And you can see that in our work; made with love!" },
    ],
    ctaH2: "Ready to work with data together?",
    ctaBody: "We love working with organisations that take data seriously. Get in touch for a no-obligation conversation.",
    ctaBtn: "Get acquainted",
  },
  de: {
    meta: { title: "Über uns — Datamodder", description: "Erfahren Sie mehr über Datamodder, unser Team und unsere Mission im Data Engineering." },
    h1a: "Über", h1b: "Datamodder",
    headerSub: "Ein engagiertes Data-Engineering-Büro aus den Niederlanden und Deutschland, spezialisiert auf den Aufbau von Datenplattformen, die wirklich funktionieren.",
    storyLabel: "Unsere Geschichte", storyH2a: "Warum", storyH2b: "Datamodder?",
    story1: "Data Engineering ist komplex. Organisationen waten durch ein Meer von Tools, Plattformen und Buzzwords, ohne immer zu wissen, welche Wahl die richtige ist. Datamodder wurde gegründet, um darin Klarheit zu bringen.",
    story2: "Der Name sagt es schon: Wir scheuen uns nicht, durch den Schlamm zu waten. Wir tauchen in komplexe Daten-Herausforderungen, Legacy-Systeme und unordentliche Datensätze ein — und kommen auf der anderen Seite mit einer Lösung heraus, die funktioniert.",
    quote: '"Daten sind unser Schlamm. Engineering ist unser Handwerk."',
    founded: "Mit Sitz in den Niederlanden und Deutschland",
    foundedYear: "Gegründet",
    valuesLabel: "Wofür wir stehen", valuesH2: "Unsere Werte",
    values: [
      { title: "Ergebnisorientiert", desc: "Wir messen unseren Erfolg am Erfolg Ihres Projekts. Keine leeren Versprechen — konkrete Ergebnisse." },
      { title: "Pragmatisch", desc: "Die bestmögliche Lösung ist nicht immer die aufregendste für uns. Aber wir wählen, was am besten passt, nicht was wir persönlich bevorzugen." },
      { title: "Leidenschaft für Daten", desc: "Data Engineering ist für uns kein Job — es ist eine Leidenschaft. Und das sieht man unserer Arbeit an; mit Liebe gemacht!" },
    ],
    ctaH2: "Gemeinsam mit Daten loslegen?",
    ctaBody: "Wir arbeiten gerne mit Organisationen zusammen, die Daten ernst nehmen. Nehmen Sie für ein unverbindliches Gespräch Kontakt auf.",
    ctaBtn: "Kennenlernen",
  },
};

const valueIcons = [<Target key="t" size={24} />, <Lightbulb key="l" size={24} />, <Heart key="h" size={24} />];

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  return content[(lang as Lang)]?.meta ?? content.nl.meta;
}

export default async function OverOnsPage({ params }: PageProps) {
  const { lang } = await params;
  const t = content[(lang as Lang)] ?? content.nl;

  return (
    <>
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/images/modderpoel.jpg')`, filter: "brightness(0.25) saturate(0.7)" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0a08]/40 via-transparent to-[#0c0a08]" />
        <MudSparkles />
        <div className="max-w-4xl mx-auto text-center relative z-20">
          <h1 className="text-5xl md:text-6xl font-black text-[#f5f0eb] leading-tight mb-6">
            {t.h1a} <span className="text-gradient">{t.h1b}</span>
          </h1>
          <p className="text-[#9a8f85] text-lg max-w-2xl mx-auto leading-relaxed">{t.headerSub}</p>
        </div>
      </section>

      <section className="pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-orange-500 text-sm font-semibold uppercase tracking-widest mb-3">{t.storyLabel}</p>
              <h2 className="text-4xl font-black text-[#f5f0eb] leading-tight mb-6">
                {t.storyH2a} <span className="text-gradient">{t.storyH2b}</span>?
              </h2>
              <div className="space-y-4 text-[#9a8f85] leading-relaxed">
                <p>{t.story1}</p>
                <p>{t.story2}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-[#1a1612] border border-orange-900/20 col-span-2">
                <div className="text-5xl font-black text-gradient mb-2">Datamodder</div>
                <p className="text-[#9a8f85] text-sm">{t.quote}</p>
              </div>
              <div className="p-6 rounded-2xl bg-[#1a1612] border border-orange-900/20">
                <div className="text-3xl font-black text-gradient mb-1">NL</div>
                <div className="text-[#9a8f85] text-xs">{t.founded}</div>
              </div>
              <div className="p-6 rounded-2xl bg-[#1a1612] border border-orange-900/20">
                <div className="text-3xl font-black text-gradient mb-1">2017</div>
                <div className="text-[#9a8f85] text-xs">{t.foundedYear}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-[#0a0806]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-orange-500 text-sm font-semibold uppercase tracking-widest mb-3">{t.valuesLabel}</p>
            <h2 className="text-4xl font-black text-[#f5f0eb]">{t.valuesH2}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.values.map(({ title, desc }, i) => (
              <div key={title} className="p-8 rounded-2xl bg-[#1a1612] border border-orange-900/20 text-center">
                <div className="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-400 mb-6 mx-auto">
                  {valueIcons[i]}
                </div>
                <h3 className="text-[#f5f0eb] font-bold text-xl mb-3">{title}</h3>
                <p className="text-[#9a8f85] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-[#0a0806]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black text-[#f5f0eb] mb-4">{t.ctaH2}</h2>
          <p className="text-[#9a8f85] mb-8">{t.ctaBody}</p>
          <Link href={`/${lang}/contact`}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-400 transition-all duration-200 glow-orange">
            {t.ctaBtn} <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
