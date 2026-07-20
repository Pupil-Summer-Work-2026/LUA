import React, { createContext, useContext, useEffect, useState } from 'react'

const translations = {
  lv: {
    header: {
      home: 'Uz sākumlapu',
      openMenu: 'Atvērt izvēlni',
      closeMenu: 'Aizvērt izvēlni',
      navigation: 'Galvenā navigācija',
      language: 'Valoda',
    },
    navigation: {
      about: 'Par mums',
      news: 'Jaunumi',
      members: 'Biedri',
      contacts: 'Kontakti',
      join: 'Kļūt par biedru',
    },
    footer: {
      navigation: 'Navigācija',
      description: 'Latvijas Ugunsdrošības asociācija - par vienotu ugunsdrošības pārstāvniecību jau kopš 2002. gada.',
      details: 'Rekvizīti:',
      copyright: '© 2026 Latvijas Ugunsdrošības asociācija. Visas tiesības aizsargātas.',
    },
    loading: { page: 'Lapas ielāde' },
    home: {
      title: 'Latvijas Ugunsdrošības asociācija',
      description: 'Latvijas Ugunsdrošības asociācija',
      heroHeading: 'LATVIJAS\nUGUNSDROŠĪBAS\nASOCIĀCIJA',
      heroDescription: 'Latvijas Ugunsdrošības asociācija apvieno ugunsdrošības jomas uzņēmumus un speciālistus, veicinot drošu vidi visā valstī.',
      apply: 'Piesakieties',
      statistics: 'Asociācijas rādītāji',
      statisticsLabels: ['BIEDRI', 'SADARBĪBAS PARTNERI'],
      aboutEyebrow: 'PAR ASOCIĀCIJU',
      aboutHeading: 'DROŠĀKA\nLATVIJA\nKOPĀ',
      aboutText: 'Latvijas Ugunsdrošības asociācija (LUA) ir dibināta 2002. gadā un apvieno Latvijas ugunsdrošības jomas uzņēmumus, organizācijas un speciālistus. Mēs sekmējam nozares profesionalitāti, drošību un ilgtspēju. Asociācija aktīvi sadarbojas ar valsts iestādēm, lai veidotu efektīvu ugunsdrošības politiku Latvijā.',
      learnMore: 'Uzzināt vairāk',
      extinguisherAlt: 'Ugunsdzēšamie aparāti',
      services: [
        ['Standartu izstrāde', 'Kā svarīgāko uzdevumu asociācija uzskata ugunsdrošības standartu izstrādi un to ieviešanu, lai nodrošinātu augstus drošības standartus visā valstī.'],
        ['Izglītība un apmācības', 'Asociācijas biedriem ir iespēja piedalīties dažādos izglītības un apmācību pasākumos, kas palīdz uzlabot zināšanas un prasmes ugunsdrošības jomā.'],
        ['Ugunsaizsardzība', 'Mūsu asociācija nodrošina ugunsdrošības pasākumus un ugunsdzēsības aprīkojumu, lai aizsargātu cilvēkus un īpašumu.'],
      ],
      newsEyebrow: 'JAUNUMI',
      newsHeading: 'ATKLĀJIET JAUNĀKĀS IZMAIŅAS',
      loadingNews: 'Jaunumi tiek ielādēti...',
      newsError: 'Jaunumus pašlaik nevar ielādēt.',
      noNews: 'Pašlaik nav pieejamu jaunumu.',
      communityEyebrow: 'BIEDRI UN PARTNERI',
      communityHeading: 'MŪSU NOZARES\nKOPIENA',
      memberCompanies: 'BIEDRU UZŅĒMUMI',
      partners: 'SADARBĪBAS PARTNERI',
      memberLogos: 'Biedru uzņēmumu logo',
      logoSuffix: 'logotips',
      joinHeading: 'KĻŪSTIET PAR LUA BIEDRU',
      joinText: 'Pievienojieties vairāk nekā 30 uzņēmumiem, kas veido drošāku Latviju.',
    },
    about: {
      title: 'Par mums',
      pageTitle: 'Par mums | Latvijas Ugunsdrošības asociācija',
      meta: 'Latvijas Ugunsdrošības asociācija apvieno ugunsdrošības nozares uzņēmumus un speciālistus.',
      years: 'Latvijas Ugunsdrošības asociācijai ir {years} gadi',
      associationEyebrow: 'PAR ASOCIĀCIJU',
      heading: 'KAS IR ',
      intro: [
        'Biedrības mērķis ir Latvijas Republikas ugunsdzēsības un ugunsdrošības servisa uzņēmumu un darbinieku apvienošana kopīgam radošam darbam un to interešu aizsardzība.',
        'Pēc savas darbības un organizatoriskās uzbūves “Latvijas Ugunsdrošības asociācija” ir brīvprātīga, profesionāla biedrība, kuras pamatmērķis ir sekmēt tās biedru savstarpējo sadarbību un profesionālo izaugsmi, aizstāvēt savu biedru saimnieciskās, ekonomiskās un tiesiskās intereses, kā arī aktīva darbība Latvijas ugunsdzēsības un ugunsdrošības pakalpojumu sniegšanas tirgū un savu biedru pārstāvniecība pašvaldību un valsts institūcijās. “Latvijas Ugunsdrošības asociācija” ir vienīgā šāda profila sabiedriska organizācija Latvijā.',
        'Kā svarīgāko uzdevumu savai darbībai Biedrība izvirza iedzīvotāju ugunsdrošības nodrošināšanu valstī un uzskata, ka to var panākt ar vienotu darbību likumdošanas un normatīvās bāzes pilnveidošanā, kvalitatīvu ugunsdrošības pakalpojumu sniegšanu, profesionālu speciālistu sagatavošanu un efektīvu sabiedrības informēšanu jautājumos par ugunsdrošību. Īpaša uzmanība šo jautājumu risināšanā un aktualizēšanā sabiedrībā ir jāveltī sadarbībai ar masu informācijas līdzekļiem.',
        '“Latvijas Ugunsdrošības asociācija” dibināta 2002. gadā un uz pašreizējo brīdi apvieno ap 30 Latvijas un starptautiskos vadošos ugunsdzēsības un ugunsdrošības servisa uzņēmumus. Biedrība sadarbojas ar citām sabiedriskām organizācijām. No 2008. gada “Latvijas Ugunsdrošības asociācija” ir Iekšlietu Ministrijas sabiedrības Konsultatīvās drošības padomes biedrs un vada darba grupu “Ugunsdrošība un civilā aizsardzība”. “Latvijas Ugunsdrošības asociācija” ir “Latvijas Darba Devēju Konfederācijas” biedrs.',
      ],
      activityEyebrow: 'PAR NODARBOŠANOS',
      roleHeading: 'MŪSU LOMA UGUNSDROŠĪBĀ',
      roleText: 'Asociācijas ikdienas un radošais darbs tiek plānots un norisinās pa vairākām darba grupām:',
      workGroups: ['Ugunsdzēsības aparāti un to apkalpošana.', 'Ugunsdzēsības automātika un signalizācijas sistēmas, to projektēšana, uzstādīšana un apkalpošana.', 'Būvtehniskā ugunsaizsardzība.', 'Dūmvadi, ventilācija. To uzstādīšana un apkalpošana.', 'Ugunsdrošības speciālistu apmācība.'],
      matchAlt: 'Aizdegta sērkociņa liesma',
      offerEyebrow: 'PIEDĀVĀJUMI UN PAKALPOJUMI',
      offerHeading: 'MŪSU BIEDRU PIEDĀVĀTIE PAKALPOJUMI',
      sectors: ['Visa veida ugunsdzēsības aparātu tirdzniecība, apkope un uzpildīšana', 'Visa veida ugunsdzēsības inventāra, tehnikas un speciālā aprīkojuma tirdzniecība', 'Individuālo un speciālo drošības un aizsardzības līdzekļu un aprīkojuma tirdzniecība', 'Būvkonstrukciju apstrāde ar ugunsaizsardzības pārklājumiem, to tirdzniecība. Komunikācijas eju ugunsaizsardzība', 'Ugunsdrošo durvju un vārtu tirdzniecība', 'Ugunsdrošās stikla-alumīnija konstrukcijas (logi, durvis, starpsienas, virsgaismas, fasādes utt.), to tirdzniecība', 'Elektrotehniskie mērījumi. Zibens novadītāju projektēšana un uzstādīšana', 'Ugunsdzēsības signalizācijas, ugunsgrēka izziņošanas un apsardzes signalizācijas uzstādīšana', 'Automātisko ugunsdzēsības sistēmu projektēšana, montāža, testēšana, apkalpošana un materiālu/iekārtu tirdzniecība', 'Ūdensapgādes, kanalizācijas, sprinkleru, siltumapgādes un ventilācijas sistēmu projektēšana, montāža, apkalpošana un ūdensvada spiediena pārbaudes', 'Dūmvadu izgatavošana un uzstādīšana, dūmu novadīšanas un aizsardzības risinājumi, ugunsdrošības konsultācijas, instruktāžas un evakuācijas plānu izstrāde', 'Ugunsdrošības un aizsardzības apmācība pēc 20 un 160 stundu programmām. Pirmās medicīniskās palīdzības apmācība. Civilās aizsardzības apmācība'],
    },
    news: { title: 'Jaunumi', pageTitle: 'Jaunumi | Latvijas Ugunsdrošības asociācija', meta: 'Latvijas Ugunsdrošības asociācijas jaunumi.', all: 'Visi jaunumi', loading: 'Ielādē jaunumus...', error: 'Jaunumus pašlaik nevar ielādēt.', retry: 'Mēģināt vēlreiz', uncategorized: 'Bez kategorijas', noResults: 'Neviens jaunums neatbilst izvēlētajiem filtriem.', clear: 'Notīrīt filtrus', search: 'Meklēt', searchNews: 'Meklēt jaunumus', categories: 'JAUNUMU KATEGORIJAS', maintenance: 'VAI JŪSU APARĀTI IR APKOPTI?', maintenanceAlt: 'Daudzi ugunsdzēšamie aparāti rindās' },
    article: { title: 'Jaunums', meta: 'Latvijas Ugunsdrošības asociācijas jaunums.', back: 'Atpakaļ', loading: 'Ielādē jaunumu...', error: 'Jaunumu pašlaik nevar ielādēt.', missing: 'Šis jaunums vairs nav pieejams.' },
    contacts: { title: 'Kontakti', pageTitle: 'Kontakti | Latvijas Ugunsdrošības asociācija', meta: 'Latvijas Ugunsdrošības asociācijas kontaktinformācija un nozares resursi.', map: 'Latvijas Ugunsdrošības asociācijas atrašanās vietas karte Rīgā', association: 'PAR ASOCIĀCIJU', details: 'Rekvizīti:', contact: 'SAZINIETIES', name: 'Vārds, Uzvārds', namePlaceholder: 'Ievadiet savu vārdu un uzvārdu', email: 'E-pasts', emailPlaceholder: 'Ievadiet savu e-pastu', message: 'Ziņa', messagePlaceholder: 'Ievadiet savu ziņu', send: 'Sūtīt', sent: 'Paldies! Jūsu ziņa ir nosūtīta.', error: 'Radās kļūda. Mēģiniet vēlreiz.', resourcesHeading: 'NODERĪGAS SAITES', resources: ['Valsts ugunsdzēsības un glābšanas dienests', 'Valsts institūciju mājas lapas', 'Normatīvo aktu krājums internetā', 'LR Uzņēmumu reģistrs'] },
    members: { title: 'Biedri', pageTitle: 'Biedri | Latvijas Ugunsdrošības asociācija', meta: 'Latvijas Ugunsdrošības asociācijas biedru uzņēmumi.', heading: 'LATVIJAS UGUNSDROŠĪBAS ASOCIĀCIJAS BIEDRI', honoraryHeading: 'GODA BIEDRI', logoSuffix: 'logotips', visit: 'Apmeklēt vietni', joinHeading: 'KĻŪSTIET PAR LUA BIEDRU', joinText: 'Pievienojies vairāk nekā 30 uzņēmumiem, kas veido drošāku Latviju.', apply: 'Piesakieties' },
    join: { title: 'Iestāšanās', pageTitle: 'Iestāšanās | Latvijas Ugunsdrošības asociācija', meta: 'Informācija par iestāšanos Latvijas Ugunsdrošības asociācijā.', heading: 'KĻŪSTI PAR BIEDRU!', intro: 'Kļūt par biedru ir vienkārši. Pievienojieties profesionāļiem, kuri kopā veido drošāku Latviju.', eligibility: 'Jebkura Latvijas Republikā reģistrēta juridiska persona vai tiesībspējīga personālsabiedrība, kas nodarbojas ar ugunsdzēsību vai ugunsdzēsības servisu, vai ir tieši saistīta ar to, un atbalsta Biedrības mērķus, kā arī apņemas ievērot tās statūtus.', years: 'Latvijas Ugunsdrošības asociācijai ir {years} gadi', application: 'Piesakiet savu uzņēmumu', company: 'Uzņēmuma nosaukums', position: 'Amats uzņēmumā', name: 'Vārds un uzvārds', email: 'E-pasts', phone: 'Tālrunis', description: 'Īss uzņēmuma apraksts', send: 'Nosūtīt pieteikumu', sent: 'Paldies! Jūsu pieteikums ir nosūtīts.', error: 'Radās kļūda. Mēģiniet vēlreiz.', notice: 'Lēmumu par biedra uzņemšanu Biedrībā pieņem valde. Valdei pieteicēja lūgums ir jāizskata tuvākās sēdes laikā, taču ne ilgāk kā divu nedēļu laikā no visu nepieciešamo dokumentu saņemšanas brīža. Uz valdes sēdi, kurā izskata pieteicēja lūgumu, ir jāuzaicina pats pieteicējs un jādod viņam vārds sava viedokļa paušanai. Pieteicēja neierašanās nav šķērslis valdes lēmuma pieņemšanai. Valdei motivēts lēmums rakstveidā jāpaziņo pieteicējam nedēļas laikā no tā pieņemšanas brīža.' },
    registrs: { title: 'Reģistrs', pageTitle: 'Reģistrs | Latvijas Ugunsdrošības asociācija', meta: 'Reģistrs Latvijas Ugunsdrošības asociācijas biedriem.', heading: 'REĢISTRĒJIET<br /><em>SAVU UZŅĒMUMU</em>', intro: 'Aizpildiet reģistra forumu, lai atbilstu jaunajām valsts prasībām.', name: 'Vārds, Uzvārds', email: 'E-pasts', company: 'Uzņēmums', send: 'Iesniegt informāciju reģistrā', sent: 'Paldies! Jūsu iesniegtā informācija ir nosūtīta.', error: 'Radās kļūda. Mēģiniet vēlreiz.' },
    notFound: { heading: 'UPS! LAPA NETIKA ATRASTA', alt: '404 Lapa nav atrasta', message: 'PIEDODIET, BET PIEPRASĪTĀ LAPA NETIKA ATRASTA' },
  },
  en: {
    header: {
      home: 'Go to homepage',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      navigation: 'Main navigation',
      language: 'Language',
    },
    navigation: {
      about: 'About us',
      news: 'News',
      members: 'Members',
      contacts: 'Contacts',
      join: 'Become a member',
    },
    footer: {
      navigation: 'Navigation',
      description: 'Latvian Fire Safety Association - representing fire-safety professionals together since 2002.',
      details: 'Company details:',
      copyright: '© 2026 Latvian Fire Safety Association. All rights reserved.',
    },
    loading: { page: 'Page loading' },
    home: {
      title: 'Latvian Fire Safety Association', description: 'Latvian Fire Safety Association', heroHeading: 'LATVIAN\nFIRE SAFETY\nASSOCIATION', heroDescription: 'The Latvian Fire Safety Association brings together fire-safety companies and specialists to promote a safer environment across the country.', apply: 'Apply now', statistics: 'Association statistics', statisticsLabels: ['MEMBERS', 'PARTNERS'], aboutEyebrow: 'ABOUT THE ASSOCIATION', aboutHeading: 'A SAFER\nLATVIA\nTOGETHER', aboutText: 'Founded in 2002, the Latvian Fire Safety Association (LUA) brings together Latvian fire-safety companies, organisations, and specialists. We foster professionalism, safety, and sustainability in the industry. The Association actively works with public institutions to shape effective fire-safety policy in Latvia.', learnMore: 'Learn more', extinguisherAlt: 'Fire extinguishers', services: [['Standards development', 'The Association considers developing and implementing fire-safety standards its most important task, helping ensure high safety standards throughout the country.'], ['Education and training', 'Association members can participate in education and training events that build knowledge and skills in the field of fire safety.'], ['Fire protection', 'Our Association provides fire-safety measures and firefighting equipment to protect people and property.']], newsEyebrow: 'NEWS', newsHeading: 'DISCOVER THE LATEST UPDATES', loadingNews: 'Loading news...', newsError: 'News cannot be loaded right now.', noNews: 'There is currently no news available.', communityEyebrow: 'MEMBERS AND PARTNERS', communityHeading: 'OUR INDUSTRY\nCOMMUNITY', memberCompanies: 'MEMBER COMPANIES', partners: 'PARTNERS', memberLogos: 'Member company logos', logoSuffix: 'logo', joinHeading: 'BECOME A LUA MEMBER', joinText: 'Join more than 30 companies creating a safer Latvia.'
    },
    about: {
      title: 'About us', pageTitle: 'About us | Latvian Fire Safety Association', meta: 'The Latvian Fire Safety Association brings together fire-safety companies and specialists.', years: 'The Latvian Fire Safety Association is {years} years old', associationEyebrow: 'ABOUT THE ASSOCIATION', heading: 'WHAT IS ', intro: ['The Association aims to bring together companies and employees in the Republic of Latvia working in fire-fighting and fire-safety services for shared constructive work and protection of their interests.', 'By its activities and organisational structure, the Latvian Fire Safety Association is a voluntary professional association. Its fundamental purpose is to promote cooperation and professional growth among its members, defend their business, economic and legal interests, and actively represent its members in the Latvian fire-fighting and fire-safety services market and before municipal and state institutions. The Latvian Fire Safety Association is the only public organisation of this type in Latvia.', 'The Association regards ensuring public fire safety in the country as its most important task. This can be achieved through coordinated work to improve legislation and regulations, high-quality fire-safety services, professional training, and effective public information on fire safety. Special attention should be paid to working with mass media when resolving and raising awareness of these issues.', 'Founded in 2002, the Latvian Fire Safety Association currently brings together about 30 leading Latvian and international fire-fighting and fire-safety service companies. It cooperates with other public organisations. Since 2008, it has been a member of the Ministry of the Interior Public Consultative Safety Council and leads the Fire Safety and Civil Protection working group. The Association is also a member of the Latvian Employers Confederation.'], activityEyebrow: 'OUR ACTIVITIES', roleHeading: 'OUR ROLE IN FIRE SAFETY', roleText: 'The Association’s day-to-day and creative work is planned and carried out through several working groups:', workGroups: ['Fire extinguishers and their maintenance.', 'Fire-fighting automation and alarm systems: design, installation and maintenance.', 'Structural fire protection.', 'Chimneys and ventilation: installation and maintenance.', 'Training for fire-safety specialists.'], matchAlt: 'Flame from a lit match', offerEyebrow: 'OFFERS AND SERVICES', offerHeading: 'OUR MEMBER\'S OFFERED SERVICES', sectors: ['Sale, maintenance and refilling of all types of fire extinguishers', 'Sale of all types of fire-fighting inventory, equipment and specialist gear', 'Sale of personal and specialist safety and protective equipment', 'Treatment of building structures with fire-protection coatings and their sale; fire protection for service penetrations', 'Sale of fire-rated doors and gates', 'Fire-rated glass-aluminium structures (windows, doors, partitions, skylights, facades, etc.) and their sale', 'Electrical measurements; lightning protection design and installation', 'Installation of fire alarms, fire notification and security alarm systems', 'Design, installation, testing and maintenance of automatic fire-extinguishing systems, plus sale of materials and equipment', 'Design, installation and maintenance of water supply, sewerage, sprinkler, heating and ventilation systems, and water-pressure testing', 'Chimney manufacture and installation, smoke extraction and protection solutions, fire-safety consulting, briefings and evacuation-plan development', 'Fire safety and protection training under 20- and 160-hour programmes; first-aid training; civil-protection training']
    },
    news: { title: 'News', pageTitle: 'News | Latvian Fire Safety Association', meta: 'News from the Latvian Fire Safety Association.', all: 'All news', loading: 'Loading news...', error: 'News cannot be loaded right now.', retry: 'Try again', uncategorized: 'Uncategorized', noResults: 'No news matches the selected filters.', clear: 'Clear filters', search: 'Search', searchNews: 'Search news', categories: 'NEWS CATEGORIES', maintenance: 'ARE YOUR EXTINGUISHERS MAINTAINED?', maintenanceAlt: 'Several fire extinguishers in a row' },
    article: { title: 'News article', meta: 'A news article from the Latvian Fire Safety Association.', back: 'Back', loading: 'Loading article...', error: 'The article cannot be loaded right now.', missing: 'This article is no longer available.' },
    contacts: { title: 'Contacts', pageTitle: 'Contacts | Latvian Fire Safety Association', meta: 'Contact information and industry resources from the Latvian Fire Safety Association.', map: 'Map of the Latvian Fire Safety Association location in Riga', association: 'ABOUT THE ASSOCIATION', details: 'Company details:', contact: 'GET IN TOUCH', name: 'Full name', namePlaceholder: 'Enter your full name', email: 'Email', emailPlaceholder: 'Enter your email address', message: 'Message', messagePlaceholder: 'Enter your message', send: 'Send', sent: 'Thank you! Your message has been sent.', error: 'An error occurred. Please try again.', resourcesHeading: 'USEFUL LINKS', resources: ['State Fire and Rescue Service', 'State institution websites', 'Collection of legislation online', 'Enterprise Register of Latvia'] },
    members: { title: 'Members', pageTitle: 'Members | Latvian Fire Safety Association', meta: 'Member companies of the Latvian Fire Safety Association.', heading: 'MEMBERS OF THE LATVIAN FIRE SAFETY ASSOCIATION', honoraryHeading: 'HONORARY MEMBERS', logoSuffix: 'logo', visit: 'Visit website', joinHeading: 'BECOME A LUA MEMBER', joinText: 'Join more than 30 companies creating a safer Latvia.', apply: 'Apply now' },
    join: { title: 'Join', pageTitle: 'Join | Latvian Fire Safety Association', meta: 'Information about joining the Latvian Fire Safety Association.', heading: 'BECOME A MEMBER!', intro: 'Becoming a member is simple. Join professionals working together to create a safer Latvia.', eligibility: 'Any legal entity or partnership registered in the Republic of Latvia that works in fire-fighting or fire-fighting services, or is directly related to them, supports the Association’s aims, and undertakes to comply with its statutes may apply.', years: 'The Latvian Fire Safety Association is {years} years old', application: 'Apply with your company', company: 'Company name', position: 'Position at company', name: 'Full name', email: 'Email', phone: 'Phone', description: 'Brief company description', send: 'Submit application', sent: 'Thank you! Your application has been sent.', error: 'An error occurred. Please try again.', notice: 'The Board decides on the admission of a member. The Board must consider the applicant’s request at its next meeting, but no later than two weeks after receiving all necessary documents. The applicant must be invited to the Board meeting that considers the request and given an opportunity to express their view. The applicant’s absence does not prevent the Board from making its decision. The Board must notify the applicant in writing of its reasoned decision within one week after it is made.' },
    registrs: { title: 'Registry', pageTitle: 'Registry | Latvian Fire Safety Association', meta: 'Registry for members of the Latvian Fire Safety Association.', heading: 'REGISTER<br /><em>YOUR COMPANY</em>', intro: 'Fill out the registry forum to adapt to the Latvian law changes', name: 'Name, Surname', email: 'Email', company: 'Company', send: 'Submit to registr', sent: 'Thank you! Your information has been sent.', error: 'An error occurred. Please try again.' },
    notFound: { heading: 'OOPS! PAGE NOT FOUND', alt: '404 Page not found', message: 'SORRY, THE PAGE YOU REQUESTED COULD NOT BE FOUND' },
  },
}

const LanguageContext = createContext(null)

function readTranslation(language, key) {
  return key.split('.').reduce((value, part) => value?.[part], translations[language])
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => window.localStorage.getItem('lua-language') || 'lv')

  useEffect(() => {
    document.documentElement.lang = language
    window.localStorage.setItem('lua-language', language)
  }, [language])

  const t = (key, values = {}) => {
    const translation = readTranslation(language, key)

    if (typeof translation !== 'string') return translation || key

    return translation.replace(/\{(\w+)\}/g, (placeholder, name) => values[name] ?? placeholder)
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)

  if (!context) throw new Error('useLanguage must be used within a LanguageProvider')

  return context
}
