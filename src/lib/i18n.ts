export type Lang = 'nl' | 'en' | 'de'
export const langs: Lang[] = ['nl', 'en', 'de']
export const hasLocale = (locale: string): locale is Lang => langs.includes(locale as Lang)

export const dict = {
  nl: {
    nav: {
      diensten: 'Diensten',
      utils: 'Utils',
      artikelen: 'Artikelen',
      overOns: 'Over Ons',
      contact: 'Neem contact op',
    },
    footer: {
      tagline: 'Wij waden door jouw data. Datamodder is dé data engineering partner voor organisaties die het maximale uit hun data willen halen.',
      navTitle: 'Navigatie',
      contactTitle: 'Contact',
      contactForm: 'Contactformulier',
      location: 'Nederland en Duitsland',
      services: 'Diensten',
      utils: 'Utils',
      artikelen: 'Artikelen',
      about: 'Over Ons',
      langLabel: 'Taal',
    },
    utils: {
      back: 'Terug naar Utils',
      github: 'Bekijk op GitHub',
      allUtils: 'Alle utils',
      goal: 'Doel',
      whatToExpect: 'Wat je kunt verwachten',
      usage: 'Gebruik',
    },
  },
  en: {
    nav: {
      diensten: 'Services',
      utils: 'Utils',
      artikelen: 'Articles',
      overOns: 'About',
      contact: 'Get in touch',
    },
    footer: {
      tagline: 'We wade through your data. Datamodder is the data engineering partner for organisations that want to get the most out of their data.',
      navTitle: 'Navigation',
      contactTitle: 'Contact',
      contactForm: 'Contact form',
      location: 'Netherlands and Germany',
      services: 'Services',
      utils: 'Utils',
      artikelen: 'Articles',
      about: 'About',
      langLabel: 'Language',
    },
    utils: {
      back: 'Back to Utils',
      github: 'View on GitHub',
      allUtils: 'All utils',
      goal: 'Goal',
      whatToExpect: 'What to expect',
      usage: 'Usage',
    },
  },
  de: {
    nav: {
      diensten: 'Leistungen',
      utils: 'Utils',
      artikelen: 'Artikel',
      overOns: 'Über uns',
      contact: 'Kontakt aufnehmen',
    },
    footer: {
      tagline: 'Wir waten durch Ihre Daten. Datamodder ist der Data-Engineering-Partner für Organisationen, die das Beste aus ihren Daten herausholen möchten.',
      navTitle: 'Navigation',
      contactTitle: 'Kontakt',
      contactForm: 'Kontaktformular',
      location: 'Niederlande und Deutschland',
      services: 'Leistungen',
      utils: 'Utils',
      artikelen: 'Artikel',
      about: 'Über uns',
      langLabel: 'Sprache',
    },
    utils: {
      back: 'Zurück zu Utils',
      github: 'Auf GitHub ansehen',
      allUtils: 'Alle Utils',
      goal: 'Ziel',
      whatToExpect: 'Was Sie erwarten können',
      usage: 'Verwendung',
    },
  },
} satisfies Record<Lang, { nav: Record<string, string>; footer: Record<string, string>; utils: Record<string, string> }>
