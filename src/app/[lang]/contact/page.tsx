import type { Metadata } from "next";
import { ExternalLink, MapPin } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import type { Lang } from "@/lib/i18n";

type PageProps = { params: Promise<{ lang: string }> };

const content = {
  nl: {
    meta: { title: "Contact — Datamodder", description: "Neem contact op met Datamodder voor data engineering en architectuur projecten." },
    badge: "Kom in contact", h1a: "Laten we", h1b: "praten",
    directContact: "Directe contactgegevens",
    locationLabel: "Locatie", location: "Nederland en Duitsland",
    responseTitle: "Reactietijd",
    responseBody: "Wij streven ernaar om binnen één werkdag te reageren. Bij urgente vragen raden wij aan om ons direct te mailen.",
    responseHighlight: "één werkdag",
    quote: "Het eerste gesprek is altijd vrijblijvend. Wij luisteren naar jouw uitdaging en denken mee, zonder verplichtingen.",
  },
  en: {
    meta: { title: "Contact — Datamodder", description: "Get in touch with Datamodder for data engineering and architecture projects." },
    badge: "Get in touch", h1a: "Let's", h1b: "talk",
    directContact: "Direct contact details",
    locationLabel: "Location", location: "Netherlands and Germany",
    responseTitle: "Response time",
    responseBody: "We aim to respond within one business day. For urgent matters, we recommend contacting us directly by email.",
    responseHighlight: "one business day",
    quote: "The first conversation is always without obligation. We listen to your challenge and think along, with no strings attached.",
  },
  de: {
    meta: { title: "Kontakt — Datamodder", description: "Nehmen Sie Kontakt mit Datamodder auf für Data-Engineering- und Architekturprojekte." },
    badge: "Kontakt aufnehmen", h1a: "Lass uns", h1b: "reden",
    directContact: "Direkte Kontaktdaten",
    locationLabel: "Standort", location: "Niederlande und Deutschland",
    responseTitle: "Reaktionszeit",
    responseBody: "Wir bemühen uns, innerhalb eines Werktages zu antworten. Bei dringenden Fragen empfehlen wir, uns direkt per E-Mail zu kontaktieren.",
    responseHighlight: "eines Werktages",
    quote: "Das erste Gespräch ist immer unverbindlich. Wir hören uns Ihre Herausforderung an und denken mit, ohne Verpflichtungen.",
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  return content[(lang as Lang)]?.meta ?? content.nl.meta;
}

export default async function ContactPage({ params }: PageProps) {
  const { lang } = await params;
  const t = content[(lang as Lang)] ?? content.nl;

  return (
    <>
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(249,115,22,0.06)_0%,_transparent_60%)]" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <p className="text-orange-500 text-sm font-semibold uppercase tracking-widest mb-3">{t.badge}</p>
          <h1 className="text-5xl md:text-6xl font-black text-[#f5f0eb] leading-tight mb-6">
            {t.h1a} <span className="text-gradient">{t.h1b}</span>
          </h1>
        </div>
      </section>

      <section className="pb-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          <div className="p-8 rounded-3xl bg-[#1a1612] border border-orange-900/20">
            <ContactForm />
          </div>

          <div className="flex flex-col gap-8">
            <div>
              <h2 className="text-2xl font-black text-[#f5f0eb] mb-6">{t.directContact}</h2>
              <div className="space-y-4">
                <a href="https://linkedin.com/company/datamodder" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-[#1a1612] border border-orange-900/20 hover:border-orange-500/40 transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 group-hover:bg-orange-500/20 transition-colors">
                    <ExternalLink size={20} />
                  </div>
                  <div>
                    <div className="text-xs text-[#9a8f85] mb-0.5">LinkedIn</div>
                    <div className="text-[#f5f0eb] font-medium">Datamodder</div>
                  </div>
                </a>
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#1a1612] border border-orange-900/20">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div className="text-xs text-[#9a8f85] mb-0.5">{t.locationLabel}</div>
                    <div className="text-[#f5f0eb] font-medium">{t.location}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#1a1612] border border-orange-900/20">
              <h3 className="text-[#f5f0eb] font-bold mb-2">{t.responseTitle}</h3>
              <p className="text-[#9a8f85] text-sm leading-relaxed">
                {t.responseBody.split(t.responseHighlight)[0]}
                <strong className="text-orange-400">{t.responseHighlight}</strong>
                {t.responseBody.split(t.responseHighlight)[1]}
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-orange-500/20 bg-orange-500/5">
              <p className="text-[#9a8f85] text-sm leading-relaxed italic">&ldquo;{t.quote}&rdquo;</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
