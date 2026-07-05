import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, EyeOff, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Masking — Utils — Datamodder",
  description: "Tag-gebaseerde data masking voor Snowflake. AVG/GDPR-proof persoonsgegevens afschermen op kolomniveau.",
};

const tagTypes = [
  { tag: "pii_name", voorbeeld: "Jan de Vries", gemaskeerd: "*** *******" },
  { tag: "pii_email", voorbeeld: "jan@example.com", gemaskeerd: "*****@*****.***" },
  { tag: "pii_phone", voorbeeld: "+31612345678", gemaskeerd: "+***********" },
  { tag: "pii_address", voorbeeld: "Hoofdstraat 1", gemaskeerd: "***** *" },
  { tag: "pii_date", voorbeeld: "1985-04-12", gemaskeerd: "****-**-**" },
  { tag: "pii", voorbeeld: "Vrije tekst", gemaskeerd: "*****" },
];

export default function MaskingPage() {
  return (
    <>
      <div className="pt-28 pb-24 px-6">
        <div className="max-w-3xl mx-auto">

          <Link href="/utils" className="inline-flex items-center gap-2 text-[#9a8f85] text-sm hover:text-orange-400 transition-colors mb-10">
            <ArrowLeft size={14} /> Terug naar Utils
          </Link>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 flex-shrink-0">
              <EyeOff size={24} />
            </div>
            <div>
              <p className="text-orange-500/70 text-xs font-semibold uppercase tracking-widest mb-0.5">dbt macro</p>
              <h1 className="text-3xl font-black text-[#f5f0eb]">Masking</h1>
            </div>
          </div>
          <p className="text-[#9a8f85] text-lg leading-relaxed mb-12">
            Bescherm persoonsgegevens in Snowflake automatisch op kolomniveau, zonder de brondata te wijzigen.
          </p>

          {/* Doel */}
          <section className="mb-12">
            <h2 className="text-xl font-black text-[#f5f0eb] mb-4">Doel</h2>
            <p className="text-[#9a8f85] leading-relaxed mb-4">
              Tag-based masking is de Snowflake-native manier om persoonsgegevens te beschermen conform de AVG/GDPR. Kolommen die een PII-tag hebben gekregen worden automatisch gemaskeerd bij queries van rollen zonder toegang. De onderliggende data blijft ongewijzigd; alleen de weergave verschilt per rol.
            </p>
            <div className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/20 text-sm text-orange-300/80">
              <strong className="text-orange-400">Let op:</strong> Tag-based masking is alleen beschikbaar op Snowflake Enterprise edition of hoger.
            </div>
          </section>

          {/* Wat je kunt verwachten */}
          <section className="mb-12">
            <h2 className="text-xl font-black text-[#f5f0eb] mb-4">Wat je kunt verwachten</h2>
            <p className="text-[#9a8f85] leading-relaxed mb-6">
              De setup maakt zes tag-types aan in het <span className="text-orange-400 font-mono text-sm">datamodder</span> schema, elk met een bijpassend maskeringsbeleid. Standaard ziet alleen SYSADMIN de werkelijke waarden; dit is configureerbaar.
            </p>
            <div className="rounded-xl bg-[#1a1612] border border-orange-900/20 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-orange-900/20">
                    <th className="text-left px-5 py-3 text-orange-400 font-semibold font-mono text-xs">Tag</th>
                    <th className="text-left px-5 py-3 text-orange-400 font-semibold text-xs uppercase tracking-widest">Voorbeeld</th>
                    <th className="text-left px-5 py-3 text-orange-400 font-semibold text-xs uppercase tracking-widest">Gemaskeerd</th>
                  </tr>
                </thead>
                <tbody className="text-[#9a8f85]">
                  {tagTypes.map(({ tag, voorbeeld, gemaskeerd }) => (
                    <tr key={tag} className="border-b border-orange-900/10 last:border-0">
                      <td className="px-5 py-3 font-mono text-orange-300/70 text-xs">{tag}</td>
                      <td className="px-5 py-3 text-xs">{voorbeeld}</td>
                      <td className="px-5 py-3 font-mono text-xs text-[#9a8f85]/60">{gemaskeerd}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Gebruik */}
          <section className="mb-12">
            <h2 className="text-xl font-black text-[#f5f0eb] mb-4">Gebruik</h2>

            <h3 className="text-[#f5f0eb] font-semibold mb-2 text-sm">1. Eenmalige setup uitvoeren</h3>
            <p className="text-[#9a8f85] text-sm mb-3">
              Voer eerst <span className="text-orange-400 font-mono">setup.sql</span> uit als accountadmin, daarna <span className="text-orange-400 font-mono">create_masking_setup</span>:
            </p>
            <div className="rounded-xl bg-[#0c0a08] border border-orange-900/20 p-5 font-mono text-sm text-orange-300/80 mb-6 overflow-x-auto">
              <pre>{`{{ create_masking_setup() }}`}</pre>
            </div>
            <p className="text-[#9a8f85] text-xs mb-6">
              De macro is idempotent (veilig om meerdere keren uit te voeren, gebruikt <span className="font-mono">IF NOT EXISTS</span>).
            </p>

            <h3 className="text-[#f5f0eb] font-semibold mb-2 text-sm">2. Tag toepassen op een kolom</h3>
            <p className="text-[#9a8f85] text-sm mb-3">
              Gebruik <span className="text-orange-400 font-mono">apply_masking_tag</span> om een tag aan een kolom te hangen:
            </p>
            <div className="rounded-xl bg-[#0c0a08] border border-orange-900/20 p-5 font-mono text-sm text-orange-300/80 mb-6 overflow-x-auto">
              <pre>{`{{ apply_masking_tag(
    database = 'MIJN_DB',
    schema   = 'MIJN_SCHEMA',
    table    = 'KLANTEN',
    column   = 'EMAIL',
    tag      = 'pii_email'
) }}`}</pre>
            </div>

            <h3 className="text-[#f5f0eb] font-semibold mb-2 text-sm">3. Toegangsrol aanpassen (optioneel)</h3>
            <p className="text-[#9a8f85] text-sm mb-3">
              Stel in welke rol ongemaskeerde data mag zien via de projectvariabelen:
            </p>
            <div className="rounded-xl bg-[#0c0a08] border border-orange-900/20 p-5 font-mono text-sm text-orange-300/80 overflow-x-auto">
              <pre>{`vars:
  masking_config:
    unmasked_role: SYSADMIN  # standaard`}</pre>
            </div>
          </section>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-orange-900/20">
            <a
              href="https://github.com/Steef-Datamodder/datamodder_utils/tree/main/macros/masking"
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
