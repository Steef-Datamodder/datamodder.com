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

export default async function DeStilleOvernmePage({ params }: PageProps) {
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
          De stille overname: waarom de achterstand van Europa op het gebied van AI gevaarlijker is dan hij lijkt
        </h1>

        <p className="text-[#9a8f85] text-sm mb-12">24 mei 2026</p>

        <article className="space-y-6 text-[#c8bfb5] leading-relaxed text-[1.05rem]">

          <p>
            Er is iets verontrustends aan de manier waarop Europa de opkomst van kunstmatige intelligentie beschouwt. Niet omdat Europa achterblijft, dat doet het, maar omdat de manier waarop men dat achterblijven duidt, zelf al deel uitmaakt van het probleem. Er bestaat een oud mechanisme in de menselijke geest: wanneer iets dreigend is maar niet onmiddellijk, vertalen we het gevaar om in een vorm die behapbaar voelt. We spreken van &quot;kansen en risico&apos;s&quot;, van &quot;verantwoorde inzet&quot;, van &quot;een eigen Europese weg&quot;. We framen het als een beleidsuitdaging, als een kwestie van regelgeving en investering. En daarmee, precies daarmee, ontnemen we onszelf het zicht op wat er werkelijk op het spel staat.
          </p>

          <h2 className="text-xl font-bold text-[#f5f0eb] pt-6">De stilte die geen stilte is</h2>

          <p>
            Het is verleidelijk om de Europese positie in de AI-race te beschrijven als een bewuste keuze. Als zou Europa, in haar wijsheid, hebben besloten de technologie te laten rijpen voordat ze haar omarmt. Als zou voorzichtigheid een deugd zijn die zich uiteindelijk uitbetaalt. Maar deze lezing mist een cruciaal element: de keuze is voor een groot deel niet bewust gemaakt. Ze is het resultaat van een samenloop van factoren, versnipperde markten, risicomijdend kapitaal, een academische cultuur die publiceren verkiest boven bouwen, en regulatoire reflexen die eerder remmen dan richting geven.
          </p>

          <p>
            De stilte van Europa is geen doordachte pauze. Het is de stilte van iemand die niet weet wat hij moet zeggen.
          </p>

          <p>
            Ondertussen produceren Amerikaanse en Chinese laboratories modellen die elke maand opnieuw de lat verschuiven. GPT-5, Gemini Ultra, Claude&apos;s nieuwste iteraties, de Chinese equivalenten die snel in kwaliteit groeien, ze zijn niet slechts technologische artefacten. Ze zijn de dragers van een infrastructuur die zich in hoog tempo weeft door de vitale systemen van moderne samenlevingen: onderwijs, gezondheidszorg, defensie, rechtspraak, mediaproductie, wetenschappelijk onderzoek. Wie de infrastructuur beheert, beheert het gesprek. En Europa is geen gesprekspartner meer, het is een consument.
          </p>

          <h2 className="text-xl font-bold text-[#f5f0eb] pt-6">De categoriefout in het Europese debat</h2>

          <p>
            De meest hardnekkige misvatting in het Europese AI-debat is dat het primair een economisch vraagstuk is. Dat de achterstand gepaard gaat met verlies aan banen, aan exportpotentieel, aan startup-ecosystemen. Dit is niet onjuist, maar het is onvolledig op een manier die misleidend is. Het economische frame suggereert dat het in principe herstelbaar is, dat meer subsidies, meer durfkapitaal, meer publiek-private samenwerking, de kloof zou kunnen dichten.
          </p>

          <p>
            Maar AI is niet zomaar een productiefactor. Het is een cognitief gereedschap dat de grondstof van kennis zelf transformeert. Wie de meest geavanceerde AI-systemen bouwt en beheert, bepaalt mede welke vragen als legitiem worden beschouwd, welke antwoorden als betrouwbaar gelden, welke talen en culturele referentiekaders zijn ingebakken in de fundamenten van kennisverwerving. Dit is geen abstracte bezorgdheid. Het is al zichtbaar in de bias-patronen van grote taalmodellen, in de overwegend Angelsaksische kenniscorpora waarop ze zijn getraind, in de commerciële en geopolitieke belangen van de bedrijven die ze ontwikkelen.
          </p>

          <p>
            De achterstand van Europa is dan ook niet alleen een economische achterstand. Het is een epistemische achterstand. Europa verliest langzamerhand de controle over de vraag: wat geldt als kennis?
          </p>

          <h2 className="text-xl font-bold text-[#f5f0eb] pt-6">Soevereiniteit als anachronisme</h2>

          <p>
            Er is de afgelopen jaren veel gesproken over &quot;digitale soevereiniteit&quot; als Europees antwoord op de dominantie van Amerikaanse techbedrijven. De gedachte is begrijpelijk: als Europa zijn data, zijn infrastructuur, zijn digitale processen niet zelf beheert, is het kwetsbaar voor buitenlandse invloed, spionage en economische afhankelijkheid. De European Cloud Initiative, de GAIA-X architectuur, de AI Act, ze zijn allemaal uitingen van dit verlangen naar soevereiniteit.
          </p>

          <p>
            Maar er schuilt een paradox in dit soevereiniteitsdenken. Soevereiniteit veronderstelt dat er iets is dat beschermd kan worden, een eigenheid, een capaciteit, een kennisdomein dat bedreigd wordt van buitenaf. In de wereld van de eerste industriële revolutie was dat inderdaad mogelijk: je kon staalfabrieken bouwen, spoorwegen aanleggen, technologische kennis verwerven en beschermen. Maar in de wereld van grote taalmodellen en foundation models is de situatie structureel anders.
          </p>

          <p>
            De meest geavanceerde AI-systemen zijn geen producten die je kunt kopiëren of inhalen met voldoende investering. Ze zijn het resultaat van een cumulatief leerproces waarbij data, rekenkracht, talent en feedbacklussen over jaren samenkomen in een vliegwieleffect dat nauwelijks te doorbreken is van buitenaf. Wie nu niet aan de frontlinie ontwikkelt, verliest niet alleen de strijd om marktaandeel, hij verliest de mogelijkheid om überhaupt te begrijpen wat de frontlinie inhoudt. De kloof is niet lineair maar exponentieel, en daarmee onvergelijkbaar met eerdere technologische achterstanden.
          </p>

          <p>
            Digitale soevereiniteit, in de zin die Europese beleidsmakers eraan geven, is daarmee deels een anachronisme. Niet omdat het idee fout is, maar omdat het berust op een verouderd model van hoe technologische macht functioneert.
          </p>

          <h2 className="text-xl font-bold text-[#f5f0eb] pt-6">De gevaarlijkste achterstand is de die je niet ziet</h2>

          <p>
            Waarom is de achterstand van Europa gevaarlijker dan hij lijkt? Niet alleen vanwege de omvang ervan, maar vanwege de onzichtbaarheid ervan in het dagelijks leven.
          </p>

          <p>
            Wanneer een land militair overweldigd wordt, is het verlies evident en onmiddellijk. Wanneer een economie instort, is de pijn direct voelbaar. Maar wanneer een continent zijn epistemische soevereiniteit verliest, wanneer de kennis die zijn burgers raadplegen, de aanbevelingen die zijn artsen ontvangen, de teksten die zijn studenten schrijven, de code die zijn ingenieurs genereren, allemaal worden gefilterd door systemen die zijn gebouwd in Californië of Shenzhen op basis van waarden, belangen en kennisstructuren die niet de Europese zijn, dan is dat verlies initieel onzichtbaar.
          </p>

          <p>
            Het manifesteert zich niet als een politieke crisis maar als een stille normering. De manier waarop vragen worden gesteld verandert. Wat als vanzelfsprekend geldt verandert. De grenzen van het denkbare schuiven op, subtiel maar onophoudelijk. En dit proces is, eenmaal begonnen, buitengewoon moeilijk te keren, niet omdat er een vijand is die het actief in stand houdt, maar omdat het simpelweg de neerslag is van wie de meest gebruikte systemen heeft gebouwd en wat die systemen hebben geleerd.
          </p>

          <p>
            Dit is wat ik bedoel met &quot;de stille overname&quot;. Geen coup, geen invasie, geen bewuste machtsgreep. Maar een geleidelijke, nauwelijks zichtbare verschuiving in wie de kennisinfrastructuur van de moderne wereld beheert, en daarmee, wie bepaalt wat als denken, weten en begrijpen geldt.
          </p>

          <h2 className="text-xl font-bold text-[#f5f0eb] pt-6">Is er een uitweg?</h2>

          <p>
            Ik wil hier niet eindigen met de gebruikelijke litanie van aanbevelingen, meer investering, meer samenwerking, een betere regulering van de markt. Niet omdat deze maatregelen irrelevant zijn, maar omdat ze de schaal van het probleem miskennen. Ze zijn het equivalent van het versterken van de muren van een stad terwijl de vijand al binnen de poorten is.
          </p>

          <p>
            Wat Europa nodig heeft, is iets fundamenteler: een herwaardering van wat het op het spel vindt staan. Zolang het AI-vraagstuk primair wordt benaderd als een economisch of regulatoir probleem, zullen de antwoorden te klein zijn. De werkelijke inzet is die van epistemische autonomie, het vermogen om, als cultuur en als politieke gemeenschap, de eigen vragen te blijven stellen en de eigen antwoorden te blijven formuleren.
          </p>

          <p>
            Dit vereist ten eerste een eerlijke diagnose. Europa moet ophouden zijn achterstand te rationaliseren als een keuze en erkennen dat het voor een deel het resultaat is van structurele zwakheden die urgent moeten worden aangepakt. Dat betekent niet dat de Europese aanpak, meer nadruk op veiligheid, grondrechten en publiek belang, verkeerd is. Het betekent dat die aanpak gepaard moet gaan met serieuze capaciteitsopbouw aan de frontier, niet alleen met regulering van wat anderen hebben gebouwd.
          </p>

          <p>
            Ten tweede vereist het een bereidheid om te accepteren dat sommige vormen van soevereiniteit niet meer individueel te realiseren zijn. Geen enkel Europees land, niet Duitsland, niet Frankrijk, zeker niet Nederland, is in staat om op eigen kracht frontier AI-systemen te ontwikkelen. Alleen Europese schaal biedt een kans. Dit betekent echte integratie van onderzoekscapaciteit, datamarkten en rekeninfrastructuur, niet de huidige lappendeken van nationale initiatieven en symbolische Europese vlaggetjes op projecten die te klein zijn om het verschil te maken.
          </p>

          <p>
            Ten derde, en dit is misschien het moeilijkst, vereist het een culturele verschuiving in de houding tegenover technologisch ondernemerschap en risico. De Europese neiging om gevestigde belangen te beschermen, regulatoire zekerheid te zoeken voordat er wordt geïnvesteerd, en mislukkingen te behandelen als schandalen in plaats van als leermomenten, is geen onveranderlijke culturele wet. Maar het veranderen ervan vereist politieke moed en een langetermijnvisie die moeilijk te vinden is in systemen die worden gedomineerd door electorale cycli van vier jaar.
          </p>

          <h2 className="text-xl font-bold text-[#f5f0eb] pt-6">De ernst van het heden</h2>

          <p>
            Ik schrijf dit niet vanuit een pessimistisch determinisme. Ik geloof niet dat de uitkomst vastligt, of dat Europa gedoemd is tot een permanente rol als technologisch wingewest. Maar ik geloof wel dat de ernst van de situatie nog onvoldoende is doorgedrongen in het publieke en politieke bewustzijn.
          </p>

          <p>
            De AI-revolutie is geen technologische trend die zich in een comfortabel tempo ontvouwt en die met de juiste beleidsresponsen op zijn beloop kan worden gelaten. Het is een fundamentele herschikking van hoe kennis wordt geproduceerd, gedistribueerd en geconsumeerd, van wie de macht heeft om de werkelijkheid te framen. En in die herschikking speelt Europa tot nu toe de rol van toeschouwer.
          </p>

          <p>
            De gevaarlijkste achterstand is niet de achterstand die je ziet en erkent. Het is de achterstand die je omschrijft als een bewuste keuze, als een strategische positie, als een teken van verstandige voorzichtigheid. Zolang Europa zichzelf blijft vertellen dat het zijn eigen weg gaat, terwijl het in werkelijkheid terrein verliest op een van de meest bepalende technologische ontwikkelingen van onze tijd, is het niet bezig met zelfbehoud. Het is bezig met zelfbedrog.
          </p>

          <p>
            En zelfbedrog, hoe comfortabel ook, is nooit een overlevingsstrategie geweest.
          </p>

        </article>
      </div>
    </main>
  )
}
