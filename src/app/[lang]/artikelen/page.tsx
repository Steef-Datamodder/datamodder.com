import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { type Lang } from '@/lib/i18n'

type PageProps = { params: Promise<{ lang: string }> }

const content: Record<Lang, {
  heading: string
  subheading: string
  dutchOnlyNote: string | null
  readMore: string
  category: string
}> = {
  nl: {
    heading: 'Essays',
    subheading: 'Mijn filosofische beschouwingen over data en AI...',
    dutchOnlyNote: null,
    readMore: 'Lees artikel',
    category: 'Essay',
  },
  en: {
    heading: 'Essays',
    subheading: 'My philosophical reflections on data and AI...',
    dutchOnlyNote:
      'Articles on this website are currently only available in Dutch. Philosophical writing depends on precise rhetoric — automated translation would lose too much in the process.',
    readMore: 'Read article',
    category: 'Essay',
  },
  de: {
    heading: 'Essays',
    subheading: 'Meine philosophischen Betrachtungen über Daten und KI...',
    dutchOnlyNote:
      'Artikel auf dieser Website sind derzeit nur auf Niederländisch verfügbar. Philosophische Texte leben von präziser Rhetorik — eine automatische Übersetzung würde zu viel verlieren.',
    readMore: 'Artikel lesen',
    category: 'Essay',
  },
}

export default async function ArtikelenPage({ params }: PageProps) {
  const { lang } = await params
  const t = content[(lang as Lang)] ?? content.nl

  return (
    <main className="min-h-screen bg-[#0a0806] pt-24 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-[#f5f0eb] mb-4">{t.heading}</h1>
        <p className="text-[#9a8f85] text-lg mb-12">{t.subheading}</p>

        {t.dutchOnlyNote && (
          <div className="mb-10 border border-orange-900/30 rounded-xl bg-orange-950/10 px-6 py-4 text-[#9a8f85] text-sm leading-relaxed">
            {t.dutchOnlyNote}
          </div>
        )}

        <div className="space-y-4">
          <Link
            href={`/${lang}/artikelen/de-vermoeide-prompt-samenleving`}
            className="group block border border-orange-900/30 rounded-xl bg-[#0f0d0b] hover:border-orange-700/50 hover:bg-[#130e0a] transition-all duration-200 p-6"
          >

            <h2 className="leading-snug mb-2">
              <span className="block text-2xl font-bold text-[#f5f0eb]">De vermoeide prompt-samenleving</span>
              <span className="block text-base font-normal text-[#9a8f85] mt-1">waarom kunstmatige intelligentie ons niet rustiger maakt, maar vermoeider</span>
            </h2>
            <p className="text-[#9a8f85] text-sm mb-4">3 juli 2026</p>
            <span className="inline-flex items-center gap-1 text-sm text-orange-400 font-medium group-hover:gap-2 transition-all">
              {t.readMore} <ArrowRight size={14} />
            </span>
          </Link>

          <Link
            href={`/${lang}/artikelen/de-stille-overname`}
            className="group block border border-orange-900/30 rounded-xl bg-[#0f0d0b] hover:border-orange-700/50 hover:bg-[#130e0a] transition-all duration-200 p-6"
          >

            <h2 className="leading-snug mb-2">
              <span className="block text-2xl font-bold text-[#f5f0eb]">De stille overname</span>
              <span className="block text-base font-normal text-[#9a8f85] mt-1">waarom de achterstand van Europa op het gebied van AI gevaarlijker is dan hij lijkt</span>
            </h2>
            <p className="text-[#9a8f85] text-sm mb-4">24 mei 2026</p>
            <span className="inline-flex items-center gap-1 text-sm text-orange-400 font-medium group-hover:gap-2 transition-all">
              {t.readMore} <ArrowRight size={14} />
            </span>
          </Link>
        </div>
      </div>
    </main>
  )
}
