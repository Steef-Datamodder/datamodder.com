import type { Metadata } from "next";
import { ExternalLink, MapPin } from "lucide-react";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact — Datamodder",
  description: "Neem contact op met Datamodder voor data engineering en architectuur projecten.",
};

export default function ContactPage() {
  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(249,115,22,0.06)_0%,_transparent_60%)]" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <p className="text-orange-500 text-sm font-semibold uppercase tracking-widest mb-3">Kom in contact</p>
          <h1 className="text-5xl md:text-6xl font-black text-[#f5f0eb] leading-tight mb-6">
            Laten we <span className="text-gradient">praten</span>
          </h1>
        </div>
      </section>

      {/* Contact section */}
      <section className="pb-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Form */}
          <div className="p-8 rounded-3xl bg-[#1a1612] border border-orange-900/20">
            <ContactForm />
          </div>

          {/* Contact info */}
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="text-2xl font-black text-[#f5f0eb] mb-6">Directe contactgegevens</h2>
              <div className="space-y-4">
                <a
                  href="https://linkedin.com/company/datamodder"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-[#1a1612] border border-orange-900/20 hover:border-orange-500/40 transition-all group"
                >
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
                    <div className="text-xs text-[#9a8f85] mb-0.5">Locatie</div>
                    <div className="text-[#f5f0eb] font-medium">Nederland en Duitsland</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#1a1612] border border-orange-900/20">
              <h3 className="text-[#f5f0eb] font-bold mb-2">Reactietijd</h3>
              <p className="text-[#9a8f85] text-sm leading-relaxed">
                Wij streven ernaar om binnen <strong className="text-orange-400">één werkdag</strong> te
                reageren. Bij urgente vragen raden wij aan om ons direct te mailen.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-orange-500/20 bg-orange-500/5">
              <p className="text-[#9a8f85] text-sm leading-relaxed italic">
                &ldquo;Het eerste gesprek is altijd vrijblijvend. Wij luisteren naar jouw uitdaging
                en denken mee, zonder verplichtingen.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
