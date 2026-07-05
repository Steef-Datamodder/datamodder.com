"use client";

import Link from "next/link";
import { MapPin, ExternalLink, Mail } from "lucide-react";
import { usePathname, useParams } from "next/navigation";
import { dict, type Lang, langs } from "@/lib/i18n";

const flags: Record<Lang, string> = { nl: "🇳🇱", en: "🇬🇧", de: "🇩🇪" };

export default function Footer() {
  const pathname = usePathname();
  const params = useParams();
  const lang = ((params?.lang as string) || "nl") as Lang;
  const t = dict[lang]?.footer ?? dict.nl.footer;

  function switchLang(newLang: Lang) {
    const segments = pathname.split("/");
    segments[1] = newLang;
    return segments.join("/");
  }

  return (
    <footer className="bg-[#0a0806] border-t border-orange-900/20 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <span className="text-2xl font-bold">
              <span className="text-gradient">Data</span>
              <span className="text-[#f5f0eb]">modder</span>
            </span>
            <p className="mt-4 text-[#9a8f85] text-sm leading-relaxed max-w-xs">
              {t.tagline}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-orange-500 mb-4">
              {t.navTitle}
            </h3>
            <ul className="space-y-3">
              {[
                { href: `/${lang}/diensten`, label: t.services },
                { href: `/${lang}/utils`, label: t.utils },
                { href: `/${lang}/artikelen`, label: t.artikelen },
                { href: `/${lang}/over-ons`, label: t.about },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-[#9a8f85] hover:text-orange-400 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Language */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-orange-500 mb-4">
              {t.contactTitle}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href={`/${lang}/contact`}
                  className="flex items-center gap-2 text-sm text-[#9a8f85] hover:text-orange-400 transition-colors"
                >
                  <Mail size={14} />
                  {t.contactForm}
                </Link>
              </li>
              <li>
                <a
                  href="https://linkedin.com/company/datamodder"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-[#9a8f85] hover:text-orange-400 transition-colors"
                >
                  <ExternalLink size={14} />
                  LinkedIn
                </a>
              </li>
              <li>
                <span className="flex items-center gap-2 text-sm text-[#9a8f85]">
                  <MapPin size={14} />
                  {t.location}
                </span>
              </li>
            </ul>

            {/* Language switcher */}
            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-orange-500 mb-3">
                {t.langLabel}
              </p>
              <div className="flex gap-3">
                {langs.map((l) => (
                  <Link
                    key={l}
                    href={switchLang(l)}
                    className={`text-xl transition-opacity ${
                      l === lang ? "opacity-100" : "opacity-35 hover:opacity-70"
                    }`}
                    title={l.toUpperCase()}
                  >
                    {flags[l]}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
