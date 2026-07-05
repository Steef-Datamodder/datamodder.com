"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { Menu, X } from "lucide-react";
import { dict, type Lang } from "@/lib/i18n";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const params = useParams();
  const lang = ((params?.lang as string) || "nl") as Lang;
  const t = dict[lang]?.nav ?? dict.nl.nav;

  const navLinks = [
    { href: `/${lang}/diensten`, label: t.diensten },
    { href: `/${lang}/utils`, label: t.utils },
    { href: `/${lang}/artikelen`, label: t.artikelen },
    { href: `/${lang}/over-ons`, label: t.overOns },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0c0a08]/95 backdrop-blur-md border-b border-orange-900/30 shadow-lg shadow-black/50"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href={`/${lang}`} className="flex items-center gap-2 group">
          <span className="text-2xl font-bold tracking-tight">
            <span className="text-gradient">Data</span>
            <span className="text-[#f5f0eb]">modder</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`text-base font-medium transition-colors duration-200 hover:text-orange-400 ${
                  pathname === href || pathname.startsWith(href + "/")
                    ? "text-orange-400"
                    : "text-[#f5f0eb]"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA button */}
        <Link
          href={`/${lang}/contact`}
          className="hidden md:inline-flex items-center px-5 py-2 rounded-full text-sm font-semibold bg-orange-500 text-white hover:bg-orange-400 transition-all duration-200 glow-orange"
        >
          {t.contact}
        </Link>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-[#f5f0eb] p-1"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#0c0a08]/98 backdrop-blur-md border-t border-orange-900/20 px-6 py-4">
          <ul className="flex flex-col gap-4">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`block text-base font-medium transition-colors hover:text-orange-400 ${
                    pathname === href ? "text-orange-400" : "text-[#f5f0eb]"
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href={`/${lang}/contact`}
                className="inline-flex items-center px-5 py-2 rounded-full text-sm font-semibold bg-orange-500 text-white"
              >
                {t.contact}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
