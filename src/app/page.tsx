"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, GitBranch, Layers, Shield, GitMerge, Code2, BarChart3, Zap, Lock, Wrench } from "lucide-react";

function MudBubbles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const bubbles = Array.from({ length: 30 }, () => ({
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * 200,
      r: 4 + Math.random() * 20,
      speed: 0.3 + Math.random() * 0.8,
      opacity: 0.1 + Math.random() * 0.4,
    }));

    let animId: number;
    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const b of bubbles) {
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(249,115,22,${b.opacity})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        b.y -= b.speed;
        b.x += Math.sin(b.y * 0.01) * 0.5;
        if (b.y + b.r < 0) {
          b.y = canvas.height + b.r;
          b.x = Math.random() * canvas.width;
        }
      }
      animId = requestAnimationFrame(animate);
    }
    animate();

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

const services = [
  {
    icon: <GitBranch size={28} />,
    title: "Data Engineering",
    desc: "Robuuste datapipelines en ETL/ELT-processen die jouw data betrouwbaar en schaalbaar verplaatsen.",
  },
  {
    icon: <Layers size={28} />,
    title: "Data Architectuur",
    desc: "Van data lakes tot lakehouses, wij ontwerpen een solide architectuur die aansluit bij jouw organisatie.",
  },
  {
    icon: <Shield size={28} />,
    title: "Data Governance",
    desc: "Datakwaliteit, lineage, privacy (AVG/GDPR) en toegangsbeheer, wij zorgen dat het op orde is.",
  },
  {
    icon: <GitMerge size={28} />,
    title: "Data Vault",
    desc: "Robuuste Data Vault 2.0 modellering voor enterprise data warehouses, flexibel, historisch en auditeerbaar.",
  },
  {
    icon: <Code2 size={28} />,
    title: "Software Ontwikkeling",
    desc: "Maatwerk applicaties, API-koppelingen en interne tooling, robuuste code die aansluit op jouw data-omgeving.",
  },
  {
    icon: <BarChart3 size={28} />,
    title: "Business Intelligence",
    desc: "Power BI, Tableau, Looker, intuïtieve dashboards en rapportages waarmee jouw team betere beslissingen neemt.",
  },
  {
    icon: <Zap size={28} />,
    title: "Performance Optimalisatie",
    desc: "Trage queries, overbelaste pipelines, hoge cloudkosten? Wij zoeken het knelpunt en lossen het op.",
  },
  {
    icon: <Lock size={28} />,
    title: "IT Security",
    desc: "Beveiliging van data-omgevingen, toegangsbeheer en security reviews van jouw dataplatform.",
  },
  {
    icon: <Wrench size={28} />,
    title: "Tool selectie",
    desc: "Onafhankelijk advies bij de keuze van tools, platformen en technologieën die passen bij jouw situatie.",
  },
];

function yearsActive() {
  const founded = new Date(2017, 5, 1); // juni 2017
  const now = new Date();
  const years = now.getFullYear() - founded.getFullYear() -
    (now < new Date(now.getFullYear(), 5, 1) ? 1 : 0);
  return `${years}+`;
}

const stats = [
  { value: "30+", label: "Projecten afgerond" },
  { value: "20+", label: "Tevreden klanten" },
  { value: yearsActive(), label: "Jaar ervaring" },
  { value: "100%", label: "Klantfocus" },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/images/modderpoel.jpg')`,
            filter: "brightness(0.35) saturate(0.7)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a08] via-[#0c0a08]/20 to-transparent" />
        <MudBubbles />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-orange-600/10 blur-3xl rounded-full" />

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-sm font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
            Data Engineering in Nederland én Duitsland!
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-none tracking-tight mb-6">
            <span className="block text-[#f5f0eb]">Wij waden</span>
            <span className="block text-gradient">door jouw data</span>
          </h1>

          <p className="text-lg md:text-xl text-[#9a8f85] max-w-2xl mx-auto leading-relaxed mb-10">
            Datamodder is jouw partner in data engineering en -architectuur.
            Wij duiken in de diepste krochten van jouw data en maken er iets moois van.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/diensten"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-orange-500 text-white font-semibold text-base hover:bg-orange-400 transition-all duration-200 glow-orange"
            >
              Bekijk onze diensten
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-orange-500/40 text-[#f5f0eb] font-semibold text-base hover:border-orange-500 hover:bg-orange-500/10 transition-all duration-200"
            >
              Neem contact op
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#9a8f85] text-xs">
          <span>Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-orange-500/60 to-transparent" />
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 border-y border-orange-900/20 bg-[#0a0806]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-4xl md:text-5xl font-black text-gradient mb-1">{value}</div>
                <div className="text-sm text-[#9a8f85]">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIENSTEN */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-[#f5f0eb] leading-tight">Onze diensten</h2>
            <p className="mt-4 text-[#9a8f85] max-w-xl mx-auto">
              Van ruwe data tot bruikbare inzichten, wij begeleiden het hele traject.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(({ icon, title, desc }) => (
              <div
                key={title}
                className="group p-6 rounded-2xl bg-[#1a1612] border border-orange-900/20 hover:border-orange-500/40 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 mb-5 group-hover:bg-orange-500/20 transition-colors">
                  {icon}
                </div>
                <h3 className="text-[#f5f0eb] font-bold text-lg mb-2">{title}</h3>
                <p className="text-[#9a8f85] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/diensten" className="inline-flex items-center gap-2 text-orange-400 font-medium hover:text-orange-300 transition-colors">
              Alle diensten bekijken <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* HOE WIJ WERKEN */}
      <section className="py-24 px-6 bg-[#0a0806]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-orange-500 text-sm font-semibold uppercase tracking-widest mb-3">Onze aanpak</p>
              <h2 className="text-4xl md:text-5xl font-black text-[#f5f0eb] leading-tight mb-6">
                Pragmatisch. <br />Technisch. <br />
                <span className="text-gradient">Resultaatgericht.</span>
              </h2>
              <p className="text-[#9a8f85] leading-relaxed mb-6">
                Wij geloven niet in overengineering of buzzwords. Datamodder kijkt naar wat jouw
                organisatie nodig heeft en bouwt een oplossing die werkt, nu en in de toekomst.
              </p>
              <Link
                href="/over-ons"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-orange-500/40 text-[#f5f0eb] font-medium hover:border-orange-500 hover:bg-orange-500/10 transition-all duration-200"
              >
                Over Datamodder <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { step: "01", title: "Intake & analyse", desc: "Begrijpen van jouw data-landschap en uitdagingen" },
                { step: "02", title: "Architectuur", desc: "Ontwerp van de optimale data-architectuur" },
                { step: "03", title: "Implementatie", desc: "Bouwen en testen van pipelines en oplossingen" },
                { step: "04", title: "Beheer & groei", desc: "Doorontwikkeling en kennisoverdracht" },
              ].map(({ step, title, desc }) => (
                <div key={step} className="p-5 rounded-2xl bg-[#1a1612] border border-orange-900/20">
                  <div className="text-orange-500/40 text-xs font-black mb-2">{step}</div>
                  <div className="text-[#f5f0eb] font-bold text-sm mb-1">{title}</div>
                  <div className="text-[#9a8f85] text-xs leading-relaxed">{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url('/images/modderpoel.jpg')`,
            backgroundPosition: "bottom",
            filter: "brightness(0.3) saturate(0.7)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0a08] via-[#0c0a08]/30 to-[#0c0a08]/60" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-black text-[#f5f0eb] leading-tight mb-6">
            Zin om <span className="text-gradient">datavraagstukken</span> aan te pakken?
          </h2>
          <p className="text-[#9a8f85] text-lg mb-10">
            Neem contact met ons op en ontdek hoe we jouw organisatie een boost kunnen geven.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full bg-orange-500 text-white font-bold text-lg hover:bg-orange-400 transition-all duration-200 glow-orange animate-pulse-glow"
          >
            Start het gesprek <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </>
  );
}
