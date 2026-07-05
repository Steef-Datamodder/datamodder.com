import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, EyeOff, ExternalLink } from "lucide-react";
import { dict } from "@/lib/i18n";
import type { Lang } from "@/lib/i18n";

type PageProps = { params: Promise<{ lang: string }> };

const tagTypes = [
  { tag: "pii_name", nl: "Jan de Vries", en: "Jan Smith", de: "Max Mustermann", masked: "*** *******" },
  { tag: "pii_email", nl: "jan@example.com", en: "john@example.com", de: "max@example.com", masked: "*****@*****.***" },
  { tag: "pii_phone", nl: "+31612345678", en: "+447911123456", de: "+49151234567", masked: "+***********" },
  { tag: "pii_address", nl: "Hoofdstraat 1", en: "High Street 1", de: "Hauptstraße 1", masked: "***** *" },
  { tag: "pii_date", nl: "1985-04-12", en: "1985-04-12", de: "1985-04-12", masked: "****-**-**" },
  { tag: "pii", nl: "Vrije tekst", en: "Free text", de: "Freier Text", masked: "*****" },
];

const content = {
  nl: {
    meta: { title: "Masking — Utils — Datamodder", description: "Tag-gebaseerde data masking voor Snowflake. AVG/GDPR-proof persoonsgegevens afschermen op kolomniveau." },
    lead: "Bescherm persoonsgegevens in Snowflake automatisch op kolomniveau, zonder de brondata te wijzigen.",
    goalBody: "Tag-based masking is de Snowflake-native manier om persoonsgegevens te beschermen conform de AVG/GDPR. Kolommen die een PII-tag hebben gekregen worden automatisch gemaskeerd bij queries van rollen zonder toegang. De onderliggende data blijft ongewijzigd; alleen de weergave verschilt per rol.",
    notice: "Tag-based masking is alleen beschikbaar op Snowflake Enterprise edition of hoger.",
    tableIntro: "De setup maakt zes tag-types aan in het",
    tableIntro2: "schema, elk met een bijpassend maskeringsbeleid. Standaard ziet alleen SYSADMIN de werkelijke waarden; dit is configureerbaar.",
    tagHeader: "Tag", exampleHeader: "Voorbeeld", maskedHeader: "Gemaskeerd",
    step1: "1. Eenmalige setup uitvoeren",
    step1Body: "Voer eerst",
    step1Body2: "uit als accountadmin, daarna",
    step1Note: "De macro is idempotent (veilig om meerdere keren uit te voeren, gebruikt",
    step1Note2: ").",
    step2: "2. Tag toepassen op een kolom",
    step2Body: "Gebruik",
    step2Body2: "om een tag aan een kolom te hangen:",
    step3: "3. Toegangsrol aanpassen (optioneel)",
    step3Body: "Stel in welke rol ongemaskeerde data mag zien via de projectvariabelen:",
  },
  en: {
    meta: { title: "Masking — Utils — Datamodder", description: "Tag-based data masking for Snowflake. GDPR-proof personal data protection at column level." },
    lead: "Automatically protect personal data in Snowflake at column level, without modifying the source data.",
    goalBody: "Tag-based masking is the Snowflake-native way to protect personal data in accordance with GDPR. Columns that have received a PII tag are automatically masked when queried by roles without access. The underlying data remains unchanged; only the display differs per role.",
    notice: "Tag-based masking is only available on Snowflake Enterprise edition or higher.",
    tableIntro: "The setup creates six tag types in the",
    tableIntro2: "schema, each with a matching masking policy. By default only SYSADMIN sees the actual values; this is configurable.",
    tagHeader: "Tag", exampleHeader: "Example", maskedHeader: "Masked",
    step1: "1. Run one-time setup",
    step1Body: "First run",
    step1Body2: "as accountadmin, then",
    step1Note: "The macro is idempotent (safe to run multiple times, uses",
    step1Note2: ").",
    step2: "2. Apply tag to a column",
    step2Body: "Use",
    step2Body2: "to attach a tag to a column:",
    step3: "3. Adjust access role (optional)",
    step3Body: "Set which role may see unmasked data via project variables:",
  },
  de: {
    meta: { title: "Masking — Utils — Datamodder", description: "Tag-basierte Datenmaskierung für Snowflake. DSGVO-konforme Absicherung von personenbezogenen Daten auf Spaltenebene." },
    lead: "Schützen Sie personenbezogene Daten in Snowflake automatisch auf Spaltenebene, ohne die Quelldaten zu ändern.",
    goalBody: "Tag-basiertes Masking ist die Snowflake-native Methode zum Schutz personenbezogener Daten gemäß DSGVO. Spalten mit einem PII-Tag werden bei Abfragen von Rollen ohne Zugang automatisch maskiert. Die zugrunde liegenden Daten bleiben unverändert; nur die Anzeige unterscheidet sich je nach Rolle.",
    notice: "Tag-basiertes Masking ist nur in der Snowflake Enterprise Edition oder höher verfügbar.",
    tableIntro: "Das Setup erstellt sechs Tag-Typen im",
    tableIntro2: "Schema, jeder mit einer passenden Maskierungsrichtlinie. Standardmäßig sieht nur SYSADMIN die echten Werte; dies ist konfigurierbar.",
    tagHeader: "Tag", exampleHeader: "Beispiel", maskedHeader: "Maskiert",
    step1: "1. Einmalige Einrichtung ausführen",
    step1Body: "Führen Sie zuerst",
    step1Body2: "als accountadmin aus, dann",
    step1Note: "Das Makro ist idempotent (sicher, mehrmals auszuführen, verwendet",
    step1Note2: ").",
    step2: "2. Tag auf eine Spalte anwenden",
    step2Body: "Verwenden Sie",
    step2Body2: "um einen Tag an eine Spalte zu hängen:",
    step3: "3. Zugriffsrolle anpassen (optional)",
    step3Body: "Legen Sie fest, welche Rolle unmaskierte Daten sehen darf, über Projektvariablen:",
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  return content[(lang as Lang)]?.meta ?? content.nl.meta;
}

export default async function MaskingPage({ params }: PageProps) {
  const { lang } = await params;
  const t = content[(lang as Lang)] ?? content.nl;
  const u = dict[(lang as Lang)]?.utils ?? dict.nl.utils;
  const exKey = lang === 'en' ? 'en' : lang === 'de' ? 'de' : 'nl';

  return (
    <div className="pt-28 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href={`/${lang}/utils`} className="inline-flex items-center gap-2 text-[#9a8f85] text-sm hover:text-orange-400 transition-colors mb-10">
          <ArrowLeft size={14} /> {u.back}
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
        <p className="text-[#9a8f85] text-lg leading-relaxed mb-12">{t.lead}</p>

        <section className="mb-12">
          <h2 className="text-xl font-black text-[#f5f0eb] mb-4">{u.goal}</h2>
          <p className="text-[#9a8f85] leading-relaxed mb-4">{t.goalBody}</p>
          <div className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/20 text-sm text-orange-300/80">
            <strong className="text-orange-400">{lang === 'de' ? 'Hinweis:' : lang === 'en' ? 'Note:' : 'Let op:'}</strong> {t.notice}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-black text-[#f5f0eb] mb-4">{u.whatToExpect}</h2>
          <p className="text-[#9a8f85] leading-relaxed mb-6">
            {t.tableIntro} <span className="text-orange-400 font-mono text-sm">datamodder</span> {t.tableIntro2}
          </p>
          <div className="rounded-xl bg-[#1a1612] border border-orange-900/20 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-orange-900/20">
                  <th className="text-left px-5 py-3 text-orange-400 font-semibold font-mono text-xs">{t.tagHeader}</th>
                  <th className="text-left px-5 py-3 text-orange-400 font-semibold text-xs uppercase tracking-widest">{t.exampleHeader}</th>
                  <th className="text-left px-5 py-3 text-orange-400 font-semibold text-xs uppercase tracking-widest">{t.maskedHeader}</th>
                </tr>
              </thead>
              <tbody className="text-[#9a8f85]">
                {tagTypes.map(({ tag, masked, ...examples }) => (
                  <tr key={tag} className="border-b border-orange-900/10 last:border-0">
                    <td className="px-5 py-3 font-mono text-orange-300/70 text-xs">{tag}</td>
                    <td className="px-5 py-3 text-xs">{examples[exKey as keyof typeof examples]}</td>
                    <td className="px-5 py-3 font-mono text-xs text-[#9a8f85]/60">{masked}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-black text-[#f5f0eb] mb-4">{u.usage}</h2>

          <h3 className="text-[#f5f0eb] font-semibold mb-2 text-sm">{t.step1}</h3>
          <p className="text-[#9a8f85] text-sm mb-3">
            {t.step1Body} <span className="text-orange-400 font-mono">setup.sql</span> {t.step1Body2} <span className="text-orange-400 font-mono">create_masking_setup</span>:
          </p>
          <div className="rounded-xl bg-[#0c0a08] border border-orange-900/20 p-5 font-mono text-sm text-orange-300/80 mb-6 overflow-x-auto">
            <pre>{`{{ create_masking_setup() }}`}</pre>
          </div>
          <p className="text-[#9a8f85] text-xs mb-6">
            {t.step1Note} <span className="font-mono">IF NOT EXISTS</span>{t.step1Note2}
          </p>

          <h3 className="text-[#f5f0eb] font-semibold mb-2 text-sm">{t.step2}</h3>
          <p className="text-[#9a8f85] text-sm mb-3">
            {t.step2Body} <span className="text-orange-400 font-mono">apply_masking_tag</span> {t.step2Body2}
          </p>
          <div className="rounded-xl bg-[#0c0a08] border border-orange-900/20 p-5 font-mono text-sm text-orange-300/80 mb-6 overflow-x-auto">
            <pre>{`{{ apply_masking_tag(
    database = 'MY_DB',
    schema   = 'MY_SCHEMA',
    table    = 'CUSTOMERS',
    column   = 'EMAIL',
    tag      = 'pii_email'
) }}`}</pre>
          </div>

          <h3 className="text-[#f5f0eb] font-semibold mb-2 text-sm">{t.step3}</h3>
          <p className="text-[#9a8f85] text-sm mb-3">{t.step3Body}</p>
          <div className="rounded-xl bg-[#0c0a08] border border-orange-900/20 p-5 font-mono text-sm text-orange-300/80 overflow-x-auto">
            <pre>{`vars:
  masking_config:
    unmasked_role: SYSADMIN`}</pre>
          </div>
        </section>

        <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-orange-900/20">
          <a href="https://github.com/Steef-Datamodder/datamodder_utils/tree/main/macros/masking" target="_blank" rel="noopener noreferrer"
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
