import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Heart, Target, Lightbulb } from "lucide-react";
import MudSparkles from "@/components/MudSparkles";

export const metadata: Metadata = {
  title: "Over Ons — Datamodder",
  description: "Leer meer over Datamodder, ons team en onze missie in data engineering.",
};

const values = [
  {
    icon: <Target size={24} />,
    title: "Resultaatgericht",
    desc: "Wij meten ons succes aan het succes van jouw project. Geen mooie praatjes, maar concrete resultaten.",
  },
  {
    icon: <Lightbulb size={24} />,
    title: "Pragmatisch",
    desc: "De best mogelijke oplossing is niet altijd de leukste voor ons. Maar wij kiezen voor wat het beste past, niet voor wat we zelf leuk vinden.",
  },
  {
    icon: <Heart size={24} />,
    title: "Passie voor data",
    desc: "Data engineering is geen baan voor ons, het is een passie. En dat zie je terug in ons werk; met liefde gemaakt!",
  },
];


export default function OverOnsPage() {
  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/images/modderpoel.jpg')`,
            filter: "brightness(0.25) saturate(0.7)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0a08]/40 via-transparent to-[#0c0a08]" />
        <MudSparkles />
        <div className="max-w-4xl mx-auto text-center relative z-20">
          <h1 className="text-5xl md:text-6xl font-black text-[#f5f0eb] leading-tight mb-6">
            Over <span className="text-gradient">Datamodder</span>
          </h1>
          <p className="text-[#9a8f85] text-lg max-w-2xl mx-auto leading-relaxed">
            Een gedreven data engineering bureau uit Nederland en Duitsland, gespecialiseerd in het bouwen van dataplatforms die echt werken.
          </p>
        </div>
      </section>

      {/* Verhaal */}
      <section className="pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-orange-500 text-sm font-semibold uppercase tracking-widest mb-3">Ons verhaal</p>
              <h2 className="text-4xl font-black text-[#f5f0eb] leading-tight mb-6">
                Waarom <span className="text-gradient">Datamodder</span>?
              </h2>
              <div className="space-y-4 text-[#9a8f85] leading-relaxed">
                <p>
                  Data engineering is complex. Organisaties waden door een zee van tools, platformen
                  en buzzwords, zonder altijd te weten welke keuze de juiste is. Datamodder is
                  opgericht om daarin helderheid te brengen.
                </p>
                <p>
                  De naam zegt het al: wij zijn niet bang om door de modder te waden. We duiken in
                  complexe data-vraagstukken, legacy systemen en rommelige datasets, en we komen
                  er aan de andere kant uit met een oplossing die werkt.
                </p>
              </div>
            </div>

            {/* Decorative grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-[#1a1612] border border-orange-900/20 col-span-2">
                <div className="text-5xl font-black text-gradient mb-2">Datamodder</div>
                <p className="text-[#9a8f85] text-sm">
                  &ldquo;Data is onze modder. Engineering is ons ambacht.&rdquo;
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-[#1a1612] border border-orange-900/20">
                <div className="text-3xl font-black text-gradient mb-1">NL</div>
                <div className="text-[#9a8f85] text-xs">Gevestigd in Nederland en Duitsland</div>
              </div>
              <div className="p-6 rounded-2xl bg-[#1a1612] border border-orange-900/20">
                <div className="text-3xl font-black text-gradient mb-1">2017</div>
                <div className="text-[#9a8f85] text-xs">Opgericht</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Waarden */}
      <section className="py-24 px-6 bg-[#0a0806]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-orange-500 text-sm font-semibold uppercase tracking-widest mb-3">Waar wij voor staan</p>
            <h2 className="text-4xl font-black text-[#f5f0eb]">Onze waarden</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map(({ icon, title, desc }) => (
              <div key={title} className="p-8 rounded-2xl bg-[#1a1612] border border-orange-900/20 text-center">
                <div className="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-400 mb-6 mx-auto">
                  {icon}
                </div>
                <h3 className="text-[#f5f0eb] font-bold text-xl mb-3">{title}</h3>
                <p className="text-[#9a8f85] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-[#0a0806]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black text-[#f5f0eb] mb-4">
            Samen met data aan de slag?
          </h2>
          <p className="text-[#9a8f85] mb-8">
            Wij werken graag samen met organisaties die data serieus nemen. Neem contact op voor een vrijblijvend gesprek.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-400 transition-all duration-200 glow-orange"
          >
            Maak kennis <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
