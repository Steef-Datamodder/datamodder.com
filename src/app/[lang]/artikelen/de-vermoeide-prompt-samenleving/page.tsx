import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { type Lang } from '@/lib/i18n'

type PageProps = { params: Promise<{ lang: string }> }

const note: Partial<Record<Lang, string>> = {
  en: 'This article is only available in Dutch. Philosophical writing depends on precise rhetoric, automated translation would lose too much in the process.',
  de: 'Dieser Artikel ist nur auf Niederländisch verfügbar. Philosophische Texte leben von präziser Rhetorik, eine automatische Übersetzung würde zu viel verlieren.',
}

const backLabel: Record<Lang, string> = {
  nl: 'Terug naar Artikelen',
  en: 'Back to Articles',
  de: 'Zurück zu Artikeln',
}

export default async function DeVermoeidePromptSamenlevingPage({ params }: PageProps) {
  const { lang } = await params
  const typedLang = (lang as Lang)
  const back = backLabel[typedLang] ?? backLabel.nl
  const langNote = note[typedLang] ?? null

  return (
    <main className="min-h-screen bg-[#0a0806] pt-24 pb-32">
      <div className="max-w-4xl mx-auto px-6">

        <Link
          href={`/${lang}/artikelen`}
          className="inline-flex items-center gap-2 text-sm text-[#9a8f85] hover:text-orange-400 transition-colors mb-10"
        >
          <ArrowLeft size={14} /> {back}
        </Link>

        {langNote && (
          <div className="mb-10 border border-orange-900/30 rounded-xl bg-orange-950/10 px-6 py-4 text-[#9a8f85] text-sm leading-relaxed">
            {langNote}
          </div>
        )}

        <h1 className="text-3xl md:text-4xl font-bold text-[#f5f0eb] leading-tight mb-4">
          De vermoeide prompt-samenleving: waarom kunstmatige intelligentie ons niet rustiger maakt, maar vermoeider
        </h1>

        <p className="text-[#9a8f85] text-sm mb-12">3 juli 2026</p>

        <article className="space-y-6 text-[#c8bfb5] leading-relaxed text-[1.05rem]">

          <p>
            Elke grote technologie wordt verkocht met dezelfde belofte: ze zal ons werk uit handen nemen. En eerlijk is eerlijk, die belofte is vaak ingelost. De wasmachine gaf huisvrouwen de tijd om te gaan werken of meer aandacht aan de opvoeding van hun kinderen te besteden. De computer verloste de kantoorklerk van het handmatig optellen van urenlijstjes en het eindeloos overtypen en kopiëren van stukken, zodat er ruimte kwam voor serieuzer werk. En de werkweek kromp in een eeuw van zes lange dagen naar, zeker in Nederland, een van de kortste ter wereld. Wie beweert dat techniek ons nooit iets heeft opgeleverd, heeft nooit met de hand een was gedaan. Maar juist daarom is er iets vreemds aan de hand met de nieuwste belofte. Kunstmatige intelligentie zou ons verlossen van het saaie, herhalende deel van ons werk. Het werk gaat er ook aantoonbaar sneller van, maar rustiger lijkt er niemand van te worden: de agenda&apos;s blijven vol en &apos;s avonds om elf uur zit er nog altijd iemand met een chatbot een presentatie te herschrijven. Er is blijkbaar iets in de verhouding tussen mens en techniek dat de winst deze keer opslokt voordat ze rust kan worden. En er is één filosoof die dat mechanisme scherper heeft beschreven dan wie ook.
          </p>

          <h2 className="text-xl font-bold text-[#f5f0eb] pt-6">De samenleving van het kunnen</h2>

          <p>
            Byung-Chul Han, in 1959 geboren in Seoul en al decennia werkzaam in Duitsland, brak in 2010 door met een boekje van nog geen zestig pagina&apos;s: <em>De vermoeide samenleving</em>. Zijn stelling was even eenvoudig als ontregelend. De samenleving van de twintigste eeuw was een disciplinemaatschappij, een wereld van fabrieken, kazernes en kantoren waarin macht werkte via het verbod: gij zult niet. De samenleving van nu is een prestatiemaatschappij, die werkt via iets veel slimmers dan het verbod, namelijk de aanmoediging: jij kunt. Niets moet meer, alles kan. En juist daarom komt er nooit meer rust, want waar een verbod een grens trekt waar je tegenaan kunt duwen, trekt het kunnen helemaal geen grens. Wie faalt in de disciplinemaatschappij is ongehoorzaam. Wie faalt in de prestatiemaatschappij heeft het aan zichzelf te danken, want hij had toch alles gekund?
          </p>

          <p>
            Het gevolg, schrijft Han, is dat de uitbuiting niet is verdwenen maar van adres is veranderd. We worden niet meer uitgebuit door een baas met een zweep, we buiten onszelf uit, vrijwillig en met enthousiasme, in naam van zelfontplooiing, groei en potentieel. En omdat uitbuiter en uitgebuite in dezelfde persoon wonen, is er niemand meer om tegen in opstand te komen. De ziekte van dit tijdperk is dan ook geen ziekte van het verbod, zoals de hysterie of de neurose, maar een ziekte van het teveel aan mogelijkheid: de burn-out, de uitputting van een zelf dat nooit klaar is met zichzelf.
          </p>

          <h2 className="text-xl font-bold text-[#f5f0eb] pt-6">De machine die &quot;jij kunt&quot; zegt</h2>

          <p>
            Toen Han dit schreef bestond ChatGPT nog niet. Maar het is moeilijk een technologie te bedenken die zuiverder samenvalt met zijn diagnose dan het grote taalmodel. Want wat zegt deze techniek in essentie tegen haar gebruiker? Precies dat: jij kunt. Je kunt nu programmeren zonder ooit te hebben leren programmeren, ontwerpen zonder ontwerper te zijn, in een middag een rapport schrijven waar vroeger een week voor stond. Elke drempel die vroeger een deel van het werk bij anderen legde, bij een collega, een vormgever, een vertaler, is verlaagd tot de hoogte van een tekstvak.
          </p>

          <p>
            Dat klinkt als bevrijding. En op het niveau van de losse taak is het dat ook. Maar Han leert ons naar het andere niveau te kijken: wat het kunnen doet met het moeten. Want in een prestatiemaatschappij blijft een mogelijkheid nooit lang vrijblijvend. Zodra iedereen met deze systemen tien keer zo veel kan produceren, wordt tien keer zo veel de norm. En wie die norm niet haalt, heeft geen technisch probleem maar een persoonlijk tekort. De verwachting groeit mee met het gereedschap, meestal zelfs harder. Het rapport dat vroeger een week kostte moet er nu morgen liggen. En omdat het er morgen kan liggen, is er geen reden meer waarom het er niet morgen zou liggen.
          </p>

          <h2 className="text-xl font-bold text-[#f5f0eb] pt-6">Wat de cijfers laten zien</h2>

          <p>
            De eerste generatie onderzoeken naar kunstmatige intelligentie op de werkvloer leek de belofte te bevestigen. Een veel aangehaalde studie onder klantenservicemedewerkers vond dat zij met een AI-assistent ongeveer veertien procent productiever werden. En een experiment van GitHub liet programmeurs met hulp van Copilot een taak ruim de helft sneller afronden. Winst dus, meetbaar en echt. Maar productiviteitswinst is niet hetzelfde als verlichting, dat verschil is precies waar het om draait.
          </p>

          <p>
            Want waar bleef die gewonnen tijd? Niet in rust, voor zover de cijfers reiken. In Nederland meldt al jaren ongeveer een op de vijf werknemers burn-outklachten. Dat aandeel daalt niet nu de AI-hulpmiddelen massaal het kantoor zijn binnengekomen, terwijl iedereen die om zich heen kijkt eerder werk ziet bijkomen dan verdwijnen. De econoom kent dit verschijnsel al lang onder een andere naam: de paradox van Jevons, die in de negentiende eeuw opmerkte dat zuinigere stoommachines niet leidden tot minder steenkoolverbruik maar tot meer, omdat alles wat goedkoper wordt, vaker wordt gedaan. Denkwerk is nu goedkoper geworden. Dus wordt er meer gedacht, meer geschreven, meer vergaderd, meer gerapporteerd. En aan het einde van al die stromen zit nog steeds dezelfde mens, die het allemaal moet lezen.
          </p>

          <h2 className="text-xl font-bold text-[#f5f0eb] pt-6">Het einde van de leegte</h2>

          <p>
            Er is nog een tweede, stillere manier waarop deze techniek vermoeit. En ook die heeft Han al beschreven voordat ze bestond. In <em>De vermoeide samenleving</em> wijdt hij een paar bladzijden aan wat hij de diepe verveling noemt: de lege, trage tijd waarin niets gebeurt en niets hoeft, die volgens hem geen verspilling is maar de bron van elke werkelijke gedachte. Cultuur, schrijft hij, is ontstaan uit momenten van diepe aandacht. En diepe aandacht ontstaat alleen waar ruimte is voor leegte.
          </p>

          <p>
            Precies die leegte is aan het verdwijnen. Elk gat in de dag kan nu gevuld worden, niet alleen met het scrollen dat we al kenden, maar met productie. De trein is een kantoor geworden, de wachtkamer een schrijfplek. En zelfs het denken hoeft niet meer leeg te beginnen, want er staat altijd een systeem klaar dat binnen een seconde een eerste versie levert. Dat lijkt behulpzaam, vaak is het dat ook. Maar wie nooit meer voor een leeg vel zit, ontneemt zichzelf het moment waarop een eigen gedachte de kans krijgt om op te komen, dat trage, ongemakkelijke moment waarin nog niets er is. De machine vult de stilte sneller dan de mens haar kan gebruiken.
          </p>

          <p>
            De grootste zorg ligt daarbij misschien niet eens bij onszelf, maar bij de generatie die nu opgroeit. Wie vandaag twaalf is, heeft nooit hoeven wachten: elke lege minuut, achter in de auto, in de rij bij de supermarkt, op een verjaardag die te lang duurt, wordt gevuld door een scherm dat altijd iets te bieden heeft. Verveling is voor deze kinderen geen wekelijkse ervaring meer maar een zeldzaamheid. En dat is niet onschuldig, want juist in de verveling leert een kind wat concentratie is: de aandacht ergens bij houden terwijl er niets is dat haar vasthoudt. Onderzoekers die zich met verveling bezighouden wijzen er al langer op dat kinderen die zich vervelen hun eigen spel gaan verzinnen, hun eigen verhalen, hun eigen oplossingen. Een generatie die de leegte nooit meer meemaakt, oefent al die dingen niet. De rekening daarvan krijgen we misschien pas over twintig jaar gepresenteerd, in volwassenen die alles kunnen opzoeken maar weinig meer kunnen verzinnen.
          </p>

          <h2 className="text-xl font-bold text-[#f5f0eb] pt-6">Rust is geen restproduct</h2>

          <p>
            Het zou gemakkelijk zijn om hier een pleidooi tegen de techniek van te maken, maar dat zou zowel Han als de techniek tekortdoen. Het probleem zit niet in het gereedschap, het zit in de samenleving die elk gereedschap onmiddellijk omsmeedt tot een hogere norm. Een hamer maakt niemand moe, de verwachting dat er nu elke dag een huis staat wel.
          </p>

          <p>
            Wie iets wil doen met de diagnose van Han, moet dan ook niet beginnen bij zijn abonnementen maar bij zijn definities. Zolang de gewonnen tijd wordt gedefinieerd als ruimte voor meer productie, zal elke volgende generatie hulpmiddelen de vermoeidheid vergroten, hoe goed ze ook worden. De enige uitweg is de gewonnen tijd te behandelen als wat ze zou kunnen zijn: tijd. Tijd om één ding langzaam te doen in plaats van tien dingen snel, tijd om te lezen wat je produceert, tijd om af en toe niets te produceren en te merken wat er dan gebeurt. Dat is geen romantiek, het is onderhoud, van precies dat ene onderdeel in de hele keten dat niet elke maand sneller wordt.
          </p>

          <p>
            De econoom John Maynard Keynes voorspelde in 1930 dat zijn kleinkinderen dankzij de techniek genoeg zouden hebben aan een werkweek van vijftien uur. Hij kreeg voor een flink deel gelijk: de gemiddelde werkweek is sindsdien bijna gehalveerd. En nergens is ze korter dan hier. Maar de laatste stap, van korter werken naar werkelijk rusten, heeft geen enkele machine voor ons kunnen zetten, omdat wij van elk nieuw kunnen steeds opnieuw een moeten maken. De taalmodellen gaan dat niet voor ons oplossen. Ze gaan de som alleen sneller uitrekenen.
          </p>

          <p className="italic text-[#9a8f85]">
            En vermoeidheid, daar is geen prompt tegen.
          </p>

        </article>
      </div>
    </main>
  )
}
