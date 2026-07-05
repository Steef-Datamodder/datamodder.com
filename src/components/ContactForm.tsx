"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { Send, CheckCircle } from "lucide-react";
import { useParams } from "next/navigation";
import type { Lang } from "@/lib/i18n";

const formDict: Record<Lang, {
  title: string; naam: string; bedrijf: string; email: string; onderwerp: string;
  bericht: string; selectSubject: string; subjects: string[]; namePlaceholder: string;
  companyPlaceholder: string; emailPlaceholder: string; messagePlaceholder: string;
  send: string; successTitle: string; successBody: string; sendAnother: string;
}> = {
  nl: {
    title: 'Stuur een bericht',
    naam: 'Naam *', bedrijf: 'Bedrijf', email: 'E-mailadres *',
    onderwerp: 'Onderwerp', bericht: 'Bericht *',
    selectSubject: 'Selecteer een onderwerp',
    subjects: ['Technisch', 'Administratief', 'Sales'],
    namePlaceholder: 'Jouw naam', companyPlaceholder: 'Jouw bedrijf',
    emailPlaceholder: 'jouw@email.nl',
    messagePlaceholder: 'Vertel ons over jouw data-uitdaging...',
    send: 'Verstuur bericht',
    successTitle: 'Bericht verzonden!',
    successBody: 'Bedankt voor je bericht. Wij nemen zo snel mogelijk contact met je op.',
    sendAnother: 'Nog een bericht sturen',
  },
  en: {
    title: 'Send a message',
    naam: 'Name *', bedrijf: 'Company', email: 'Email address *',
    onderwerp: 'Subject', bericht: 'Message *',
    selectSubject: 'Select a subject',
    subjects: ['Technical', 'Administrative', 'Sales'],
    namePlaceholder: 'Your name', companyPlaceholder: 'Your company',
    emailPlaceholder: 'your@email.com',
    messagePlaceholder: 'Tell us about your data challenge...',
    send: 'Send message',
    successTitle: 'Message sent!',
    successBody: 'Thank you for your message. We will get back to you as soon as possible.',
    sendAnother: 'Send another message',
  },
  de: {
    title: 'Nachricht senden',
    naam: 'Name *', bedrijf: 'Unternehmen', email: 'E-Mail-Adresse *',
    onderwerp: 'Betreff', bericht: 'Nachricht *',
    selectSubject: 'Betreff auswählen',
    subjects: ['Technisch', 'Administrativ', 'Vertrieb'],
    namePlaceholder: 'Ihr Name', companyPlaceholder: 'Ihr Unternehmen',
    emailPlaceholder: 'ihre@email.de',
    messagePlaceholder: 'Erzählen Sie uns von Ihrer Daten-Herausforderung...',
    send: 'Nachricht abschicken',
    successTitle: 'Nachricht gesendet!',
    successBody: 'Danke für Ihre Nachricht. Wir werden uns so schnell wie möglich bei Ihnen melden.',
    sendAnother: 'Weitere Nachricht senden',
  },
};

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const lang = ((params?.lang as string) || "nl") as Lang;
  const t = formDict[lang] ?? formDict.nl;

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1200);
  }

  if (sent) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center py-12 gap-4">
        <div className="w-16 h-16 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-400">
          <CheckCircle size={36} />
        </div>
        <h2 className="text-2xl font-black text-[#f5f0eb]">{t.successTitle}</h2>
        <p className="text-[#9a8f85] max-w-xs">{t.successBody}</p>
        <button onClick={() => setSent(false)} className="mt-4 text-sm text-orange-400 hover:text-orange-300 transition-colors">
          {t.sendAnother}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-black text-[#f5f0eb] mb-6">{t.title}</h2>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-[#9a8f85] uppercase tracking-wide mb-2">{t.naam}</label>
          <input type="text" required placeholder={t.namePlaceholder}
            className="w-full px-4 py-3 rounded-xl bg-[#0c0a08] border border-orange-900/20 text-[#f5f0eb] placeholder-[#9a8f85]/50 text-sm focus:outline-none focus:border-orange-500/50 transition-colors" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#9a8f85] uppercase tracking-wide mb-2">{t.bedrijf}</label>
          <input type="text" placeholder={t.companyPlaceholder}
            className="w-full px-4 py-3 rounded-xl bg-[#0c0a08] border border-orange-900/20 text-[#f5f0eb] placeholder-[#9a8f85]/50 text-sm focus:outline-none focus:border-orange-500/50 transition-colors" />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-[#9a8f85] uppercase tracking-wide mb-2">{t.email}</label>
        <input type="email" required placeholder={t.emailPlaceholder}
          className="w-full px-4 py-3 rounded-xl bg-[#0c0a08] border border-orange-900/20 text-[#f5f0eb] placeholder-[#9a8f85]/50 text-sm focus:outline-none focus:border-orange-500/50 transition-colors" />
      </div>

      <div>
        <label className="block text-xs font-semibold text-[#9a8f85] uppercase tracking-wide mb-2">{t.onderwerp}</label>
        <select className="w-full px-4 py-3 rounded-xl bg-[#0c0a08] border border-orange-900/20 text-[#9a8f85] text-sm focus:outline-none focus:border-orange-500/50 transition-colors appearance-none">
          <option value="">{t.selectSubject}</option>
          {t.subjects.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold text-[#9a8f85] uppercase tracking-wide mb-2">{t.bericht}</label>
        <textarea required rows={5} placeholder={t.messagePlaceholder}
          className="w-full px-4 py-3 rounded-xl bg-[#0c0a08] border border-orange-900/20 text-[#f5f0eb] placeholder-[#9a8f85]/50 text-sm focus:outline-none focus:border-orange-500/50 transition-colors resize-none" />
      </div>

      <button type="submit" disabled={loading}
        className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-400 transition-all duration-200 glow-orange disabled:opacity-60 disabled:cursor-not-allowed">
        {loading ? (
          <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <>{t.send} <Send size={16} /></>
        )}
      </button>
    </form>
  );
}
