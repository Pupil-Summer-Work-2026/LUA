import React, { createContext, useContext, useEffect, useState } from 'react'

const biznesa_gadi = '/Images/biznesa-gadi.svg'
const business_years = '/Images/business-years.svg'
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
      registry: 'Reģistrs',
      join: 'Kļūt par biedru',
    },
    footer: {
      navigation: 'Navigācija',
      description: 'Latvijas Ugunsdrošības asociācija - par vienotu ugunsdrošības pārstāvniecību jau kopš 2002. gada.',
      details: 'Rekvizīti:',
      regNr: 'Reģ. Nr: 40008066462',
      bank: 'Banka: AS Swedbank',
      swift: 'SWIFT BIC:HABALV22',
      account: 'Konts: LV24HABA0551044104806',
      copyright: '© 2026 Latvijas Ugunsdrošības asociācija. Visas tiesības aizsargātas.',
      privacy: 'Privātuma politika',
      statutes: 'Biedrības statūti',
      preferences: 'Privātuma izvēles',
    },
    loading: { page: 'Lapas ielāde' },
    externalContent: {
      preferencesTitle: 'Privātuma izvēles',
      preferencesDescription: 'Izvēlieties, vai kontaktu lapā drīkst ielādēt Google Maps. Šo izvēli var mainīt jebkurā laikā.',
      optionalCookies: 'Izvēles sīkdatnes un pakalpojumi',
      mapsTitle: 'Google Maps',
      mapsDescription: 'Ielādējot karti, Google saņem jūsu IP adresi un var apstrādāt datus saskaņā ar savu privātuma politiku.',
      save: 'Saglabāt izvēli',
      settings: 'Iestatījumi',
      close: 'Aizvērt privātuma izvēles',
      mapHeading: 'Atrašanās vietas karte',
      mapDescription: 'Karte tiek nodrošināta ar Google Maps un netiek ielādēta, kamēr to neizvēlaties.',
      mapLoad: 'Ielādēt Google Maps',
      mapExternal: 'Atvērt karti Google Maps',
      mapPrivacy: 'Lasīt privātuma politiku',
    },
    formErrors: { rateLimited: 'Pārāk daudz iesniegumu. Lūdzu, mēģiniet vēlreiz vēlāk.', retryAfterCountdown: 'Mēģiniet vēlreiz pēc {seconds} s.', captcha: 'Captcha pārbaude neizdevās. Lūdzu, mēģiniet vēlreiz.', invalidFields: 'Pārbaudiet, vai visi lauki ir aizpildīti pareizi.', server: 'Veidlapu pašlaik nevar nosūtīt. Lūdzu, mēģiniet vēlāk.', network: 'Neizdevās savienoties ar serveri. Pārbaudiet interneta savienojumu un mēģiniet vēlreiz.', unknown: 'Radās neparedzēta kļūda. Lūdzu, mēģiniet vēlreiz.' },
    formPrivacy: { contact: 'Visi lauki ir obligāti, lai nosūtītu ziņu. Datus apstrādājam, pamatojoties uz leģitīmajām interesēm atbildēt un aizsargāt veidlapu ar Cloudflare Turnstile.', membership: 'Visi lauki ir obligāti pieteikuma izvērtēšanai. Datus apstrādājam, pamatojoties uz leģitīmajām interesēm pārvaldīt dalības pieteikumus un aizsargāt veidlapu ar Cloudflare Turnstile.', registry: 'Visi lauki ir obligāti reģistra pieteikuma izvērtēšanai. Datus apstrādājam, pamatojoties uz leģitīmajām interesēm pārvaldīt pieteikumus un aizsargāt veidlapu ar Cloudflare Turnstile.', link: 'Pilna informācija privātuma politikā.' },
    serviceDialog: { close: 'Aizvērt pakalpojumu sarakstu', loading: 'Ielādē uzņēmumus...', error: 'Uzņēmumu sarakstu pašlaik nevar ielādēt.', empty: 'Šim pakalpojumam vēl nav pievienots neviens uzņēmums.' },
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
      joinText: 'Pievienojieties vairākiem uzņēmumiem, kas veido drošāku Latviju.',
    },
    about: {
      title: 'Par mums',
      pageTitle: 'Par mums | Latvijas Ugunsdrošības asociācija',
      meta: 'Latvijas Ugunsdrošības asociācija apvieno ugunsdrošības nozares uzņēmumus un speciālistus.',
      years: 'Latvijas Ugunsdrošības asociācijai ir {years} gadi',
      associationEyebrow: 'PAR ASOCIĀCIJU',
      heading: 'KAS IR ',
      biznesaGadi: biznesa_gadi,
      intro: [
        'Biedrības mērķis ir Latvijas Republikas ugunsdzēsības un ugunsdrošības servisa uzņēmumu un darbinieku apvienošana kopīgam radošam darbam un to interešu aizsardzība.',
        'Pēc savas darbības un organizatoriskās uzbūves “Latvijas Ugunsdrošības asociācija” ir brīvprātīga, profesionāla biedrība, kuras pamatmērķis ir sekmēt tās biedru savstarpējo sadarbību un profesionālo izaugsmi, aizstāvēt savu biedru saimnieciskās, ekonomiskās un tiesiskās intereses, kā arī aktīva darbība Latvijas ugunsdzēsības un ugunsdrošības pakalpojumu sniegšanas tirgū un savu biedru pārstāvniecība pašvaldību un valsts institūcijās. “Latvijas Ugunsdrošības asociācija” ir vienīgā šāda profila sabiedriska organizācija Latvijā.',
        'Kā svarīgāko uzdevumu savai darbībai Biedrība izvirza iedzīvotāju ugunsdrošības nodrošināšanu valstī un uzskata, ka to var panākt ar vienotu darbību likumdošanas un normatīvās bāzes pilnveidošanā, kvalitatīvu ugunsdrošības pakalpojumu sniegšanu, profesionālu speciālistu sagatavošanu un efektīvu sabiedrības informēšanu jautājumos par ugunsdrošību. Īpaša uzmanība šo jautājumu risināšanā un aktualizēšanā sabiedrībā ir jāveltī sadarbībai ar masu informācijas līdzekļiem.',
        '“Latvijas Ugunsdrošības asociācija” dibināta 2002. gadā un uz pašreizējo brīdi apvieno vairākus Latvijas un starptautiskos vadošos ugunsdzēsības un ugunsdrošības servisa uzņēmumus. Biedrība sadarbojas ar citām sabiedriskām organizācijām. “Latvijas Ugunsdrošības asociācija” ir “Latvijas Darba Devēju Konfederācijas” biedrs.',
      ],
      activityEyebrow: 'PAR NODARBOŠANOS',
      roleHeading: 'MŪSU LOMA UGUNSDROŠĪBĀ',
      roleText: 'Asociācijas ikdienas un radošais darbs tiek plānots un norisinās pa vairākām darba grupām:',
      workGroups: ['Ugunsdzēsības aparāti un to apkalpošana.', 'Ugunsdzēsības automātika un signalizācijas sistēmas, to projektēšana, uzstādīšana un apkalpošana.', 'Būvtehniskā ugunsaizsardzība.', 'Dūmvadi, ventilācija. To uzstādīšana un apkalpošana.', 'Ugunsdrošības speciālistu apmācība.'],
      matchAlt: 'Aizdegta sērkociņa liesma',
      offerEyebrow: 'PIEDĀVĀJUMI UN PAKALPOJUMI',
      offerHeading: 'MŪSU BIEDRU PIEDĀVĀTIE PAKALPOJUMI',
      sectors: ['Visa veida ugunsdzēsības aparātu tirdzniecība, apkope un uzpildīšana', 'Visa veida ugunsdzēsības inventāra, tehnikas un speciālā aprīkojuma tirdzniecība', 'Individuālo un speciālo drošības un aizsardzības līdzekļu un aprīkojuma tirdzniecība', 'Būvkonstrukciju apstrāde ar ugunsaizsardzības pārklājumiem, to tirdzniecība. Inženieru komunikācijas ugunsdrošība', 'Ugunsdrošo durvju un vārtu tirdzniecība', 'Ugunsdrošās stikla-alumīnija konstrukcijas (logi, durvis, starpsienas, virsgaismas, fasādes utt.), to tirdzniecība', 'Elektrotehniskie mērījumi. Zibens novadītāju projektēšana un uzstādīšana', 'Ugunsdzēsības signalizācijas, ugunsgrēka izziņošanas un apsardzes signalizācijas uzstādīšana', 'Automātisko ugunsdzēsības sistēmu projektēšana, montāža, testēšana, apkalpošana un materiālu/iekārtu tirdzniecība', 'Ūdensapgādes, kanalizācijas, sprinkleru, siltumapgādes un ventilācijas sistēmu projektēšana, montāža, apkalpošana un ūdensvada spiediena pārbaudes', 'Dūmvadu izgatavošana un uzstādīšana, dūmu novadīšanas un aizsardzības risinājumi, ugunsdrošības konsultācijas, instruktāžas un evakuācijas plānu izstrāde', 'Ugunsdrošības un aizsardzības apmācība pēc 20 un 160 stundu programmām. Pirmās medicīniskās palīdzības apmācība. Civilās aizsardzības apmācība'],
    },
    news: { title: 'Jaunumi', pageTitle: 'Jaunumi | Latvijas Ugunsdrošības asociācija', meta: 'Latvijas Ugunsdrošības asociācijas jaunumi.', all: 'Visi jaunumi', loading: 'Ielādē jaunumus...', error: 'Jaunumus pašlaik nevar ielādēt.', retry: 'Mēģināt vēlreiz', uncategorized: 'Bez kategorijas', noResults: 'Neviens jaunums neatbilst izvēlētajiem filtriem.', clear: 'Notīrīt filtrus', search: 'Meklēt', searchNews: 'Meklēt jaunumus', categories: 'JAUNUMU KATEGORIJAS', maintenance: 'VAI JŪSU APARĀTI IR APKOPTI?', maintenanceAlt: 'Daudzi ugunsdzēšamie aparāti rindās' },
    article: { title: 'Jaunums', meta: 'Latvijas Ugunsdrošības asociācijas jaunums.', back: 'Atpakaļ', loading: 'Ielādē jaunumu...', error: 'Jaunumu pašlaik nevar ielādēt.', missing: 'Šis jaunums vairs nav pieejams.' },
    contacts: { title: 'Kontakti', pageTitle: 'Kontakti | Latvijas Ugunsdrošības asociācija', meta: 'Latvijas Ugunsdrošības asociācijas kontaktinformācija un nozares resursi.', map: 'Latvijas Ugunsdrošības asociācijas atrašanās vietas karte Rīgā', association: 'PAR ASOCIĀCIJU', details: 'Rekvizīti:', contact: 'SAZINIETIES', name: 'Vārds, Uzvārds', namePlaceholder: 'Ievadiet savu vārdu un uzvārdu', email: 'E-pasts', emailPlaceholder: 'Ievadiet savu e-pastu', message: 'Ziņa', messagePlaceholder: 'Ievadiet savu ziņu', send: 'Sūtīt', sent: 'Paldies! Jūsu ziņa ir nosūtīta.', error: 'Radās kļūda. Mēģiniet vēlreiz.', resourcesHeading: 'NODERĪGAS SAITES', otherResourcesHeading: 'CITAS SAITES', resources: ['Valsts ugunsdzēsības un glābšanas dienests', 'Valsts institūciju mājas lapas', 'Normatīvo aktu krājums internetā', 'LR Uzņēmumu reģistrs'] },
    members: { title: 'Biedri', pageTitle: 'Biedri | Latvijas Ugunsdrošības asociācija', meta: 'Latvijas Ugunsdrošības asociācijas biedru uzņēmumi.', heading: 'LATVIJAS UGUNSDROŠĪBAS ASOCIĀCIJAS BIEDRI', logoSuffix: 'logotips', visit: 'Apmeklēt vietni', loading: 'Ielādē biedrus...', error: 'Biedrus pašlaik nevar ielādēt.', empty: 'Biedri pašlaik nav pievienoti.', joinHeading: 'KĻŪSTIET PAR LUA BIEDRU', joinText: 'Pievienojies vairākiem uzņēmumiem, kas veido drošāku Latviju.', apply: 'Piesakieties', honoraryHeading: 'GODA BIEDRI', honoraryLoading: 'Ielādē goda biedrus...', honoraryError: 'Goda biedrus pašlaik nevar ielādēt.', honoraryEmpty: 'Goda biedri pašlaik nav pievienoti.' },
    join: { title: 'Iestāšanās', pageTitle: 'Iestāšanās | Latvijas Ugunsdrošības asociācija', meta: 'Informācija par iestāšanos Latvijas Ugunsdrošības asociācijā.', heading: 'KĻŪSTI PAR BIEDRU!', biznesaGadi: biznesa_gadi, intro: 'Kļūt par biedru ir vienkārši. Pievienojieties profesionāļiem, kuri kopā veido drošāku Latviju.', eligibility: 'Par Biedrības biedru var kļūt jebkura juridiska persona, kas darbojas ugunsdrošības vai ugunsdrošības servisa jomā vai ir tieši saistīta ar šo nozari, atbalsta Biedrības mērķus un apņemas ievērot tās statūtus.', years: 'Latvijas Ugunsdrošības asociācijai ir {years} gadi', application: 'Piesakiet savu uzņēmumu', company: 'Uzņēmuma nosaukums', position: 'Amats uzņēmumā', name: 'Vārds un uzvārds', email: 'E-pasts', phone: 'Tālrunis', description: 'Īss uzņēmuma apraksts', dutiesHeading: 'Biedra pienākumi', duties: ['Ievērot biedrības statūtus un valdes lēmumus.', 'Piedalīties biedrības darbībā un atbalstīt tās mērķus.', 'Savlaicīgi maksāt biedra naudu.'], dutiesAccepted: 'Apliecinu, ka esmu iepazinies/-usies ar biedra pienākumiem un tiem piekrītu.', send: 'Nosūtīt pieteikumu', sent: 'Paldies! Jūsu pieteikums ir nosūtīts.', error: 'Radās kļūda. Mēģiniet vēlreiz.', notice: 'Lēmumu par biedra uzņemšanu Biedrībā pieņem valde. Valdei pieteicēja lūgums ir jāizskata tuvākās sēdes laikā, taču ne ilgāk kā divu nedēļu laikā no visu nepieciešamo dokumentu saņemšanas brīža. Uz valdes sēdi, kurā izskata pieteicēja lūgumu, ir jāuzaicina pats pieteicējs un jādod viņam vārds sava viedokļa paušanai. Pieteicēja neierašanās nav šķērslis valdes lēmuma pieņemšanai. Valdei motivēts lēmums rakstveidā jāpaziņo pieteicējam nedēļas laikā no tā pieņemšanas brīža.' },
    registrs: { title: 'Reģistrs', pageTitle: 'Reģistrs | Latvijas Ugunsdrošības asociācija', meta: 'Reģistrs Latvijas Ugunsdrošības asociācijas biedriem.', heading: 'REĢISTRĒJIET<br /><em>SAVU UZŅĒMUMU</em>', intro: 'Aizpildiet reģistra forumu, lai atbilstu jaunajām valsts prasībām.', name: 'Vārds, Uzvārds', email: 'E-pasts', company: 'Uzņēmums', send: 'Iesniegt informāciju reģistrā', sent: 'Paldies! Jūsu iesniegtā informācija ir nosūtīta.', error: 'Radās kļūda. Mēģiniet vēlreiz.' },
    privacy: {
      title: 'Privātuma politika',
      pageTitle: 'Privātuma politika | Latvijas Ugunsdrošības asociācija',
      meta: 'Informācija par personas datu apstrādi Latvijas Ugunsdrošības asociācijas tīmekļa vietnē.',
      intro: 'Šī politika skaidro, kā Latvijas Ugunsdrošības asociācija apstrādā personas datus, kad apmeklējat šo vietni vai iesniedzat veidlapu.',
      summary: 'Lūdzu, nesūtiet veselības datus, politiskos uzskatus vai citus īpašu kategoriju personas datus, kā arī nevajadzīgus trešo personu datus. Ja šāda informācija nav nepieciešama pieprasījuma izskatīšanai, mēs to dzēsīsim.',
      sections: [
        { title: 'Pārzinis', paragraphs: ['Personas datu pārzinis ir Latvijas Ugunsdrošības asociācija BIEDRĪBA, reģ. Nr. 40008066462, juridiskā adrese: Vijciema iela 1A, Rīga, LV-1006. Privātuma jautājumu e-pasta adrese ir norādīta šīs politikas beigās.'] },
        { title: 'Datu avoti un kategorijas', items: ['Apmeklējot vietni: IP adrese, pieprasījuma datums un laiks, pieprasītā adrese, pārlūkprogrammas vai ierīces tehniskā informācija, drošības pārbaudes rezultāts un kļūdu vai korelācijas identifikatori. Šos datus saņemam no jūsu ierīces un infrastruktūras pakalpojumu sniedzējiem.', 'Kontaktu veidlapā: jūsu vārds, e-pasta adrese un ziņas saturs.', 'Biedra pieteikumā: uzņēmuma nosaukums, jūsu amats, vārds, e-pasta adrese, tālruņa numurs, uzņēmuma apraksts un apliecinājums par biedra pienākumu pieņemšanu.', 'Reģistra veidlapā: jūsu vārds, e-pasta adrese un uzņēmuma nosaukums.', 'Vietnes izvēlēm: izvēlētā valoda un Google Maps ielādes izvēle.', 'Ja ar jūsu piekrišanu publicējam goda biedra vārdu, tas kļūst publiski pieejams vietnes apmeklētājiem.'] },
        { title: 'Mērķi un tiesiskais pamats', paragraphs: ['Kontaktu datus apstrādājam, lai izskatītu ziņu un atbildētu uz to. Pamats ir GDPR 6. panta 1. punkta f) apakšpunkts: mūsu leģitīmā interese uzturēt saziņu par Asociācijas darbību.', 'Biedra un reģistra pieteikuma datus apstrādājam, lai pārbaudītu pieteikumu, sazinātos ar iesniedzēju un pārvaldītu attiecīgo procesu. Pamats ir GDPR 6. panta 1. punkta f) apakšpunkts: mūsu un pieteicēja leģitīmā interese pārvaldīt dalības un reģistra pieteikumus.', 'IP adresi un citus tehniskos datus apstrādājam, lai piegādātu un aizsargātu vietni, novērstu krāpšanu, ierobežotu automatizētus iesniegumus un diagnosticētu kļūdas. Pamats ir GDPR 6. panta 1. punkta f) apakšpunkts: mūsu leģitīmā interese nodrošināt drošu un pieejamu vietni.', 'Izvēlēto valodu saglabājam, lai nodrošinātu jūsu pieprasīto vietnes funkciju. Google Maps ielādējam un goda biedra vārdu publicējam tikai ar piekrišanu saskaņā ar GDPR 6. panta 1. punkta a) apakšpunktu.'] },
        { title: 'Vai dati ir jāsniedz', paragraphs: ['Veidlapās visi atzīmētie lauki un Cloudflare Turnstile pārbaude ir obligāti. Bez tiem nevaram droši saņemt un izskatīt iesniegumu. Jūs neesat tiesiski vai līgumiski spiests izmantot veidlapu un varat sazināties ar Asociāciju citā norādītā veidā. Brīvā teksta laukos sniedziet tikai pieprasījuma izskatīšanai nepieciešamo informāciju.'] },
        { title: 'Saņēmēji', paragraphs: ['Datiem pēc nepieciešamības piekļūst pilnvaroti Asociācijas valdes locekļi vai darbinieki un apstrādātāji, kas nodrošina servera mitināšanu, e-pasta piegādi, rezerves kopijas un tehnisko uzturēšanu. Piegādātājiem piešķiram tikai pakalpojumam nepieciešamo piekļuvi un, ja tie ir apstrādātāji, noslēdzam GDPR 28. pantam atbilstošu līgumu.', 'Cloudflare, Inc. nodrošina Turnstile drošības pārbaudi un saņem IP adresi, pārlūkprogrammas vai ierīces signālus, pārbaudes marķieri un rezultātu. Google LLC saņem tehniskos datus tikai tad, ja izvēlaties ielādēt Google Maps. Publicēts goda biedra vārds ir pieejams ikvienam vietnes apmeklētājam. Personas datus nepārdodam.'] },
        { title: 'Datu nosūtīšana ārpus EEZ', paragraphs: ['Cloudflare un Google var apstrādāt datus Amerikas Savienotajās Valstīs vai citās valstīs ārpus Eiropas Ekonomikas zonas. Atkarībā no saņēmēja un apstrādes izmantojam Eiropas Komisijas lēmumu par adekvātu aizsardzību, tostarp ES un ASV datu privātuma regulējumu sertificētiem saņēmējiem, vai Eiropas Komisijas standarta līguma klauzulas saskaņā ar GDPR 46. panta 2. punkta c) apakšpunktu un vajadzīgos papildu aizsardzības pasākumus. Informāciju vai piemērojamo garantiju kopiju var pieprasīt, izmantojot šīs politikas beigās norādīto e-pastu.'] },
        { title: 'Glabāšanas termiņi', items: ['Saziņas pieprasījumus, reģistra pieteikumus un noraidītus vai atsauktus biedra pieteikumus, tostarp e-pasta kopijas, dzēšam ne vēlāk kā 12 mēnešus pēc procesa pabeigšanas, ja vien dati nav vajadzīgi strīda izskatīšanai.', 'Apstiprināta biedra un tā kontaktpersonas datus glabājam dalības laikā. Pēc dalības beigām saglabājam tikai tos datus un tik ilgi, cik nepieciešams juridisku prasību aizsardzībai vai konkrētam normatīvajam pienākumam; termiņu dokumentējam datu apstrādes reģistrā.', 'Pseidonimizētie ātruma ierobežošanas skaitītāji automātiski beidzas attiecīgā ierobežojuma perioda beigās, bet ne vēlāk kā pēc 24 stundām. Turnstile marķieri Asociācija pēc pārbaudes neglabā.', 'Parastos tehniskos žurnālus regulāri rotējam un glabājam tikai tik ilgi, cik nepieciešams drošības un kļūdu diagnostikai. Ar incidentu saistītu ierakstu varam nodalīt līdz izmeklēšanas vai juridiskas prasības pabeigšanai, pēc tam nepieciešamību pārskatām.'] },
        { title: 'Pārlūkprogrammas krātuve un ārējais saturs', paragraphs: ['Vietne neizmanto analītikas vai reklāmas sīkdatnes. Pārlūkprogrammas localStorage saglabājam valodu ar atslēgu lua-language un Google Maps izvēli ar atslēgu lua-google-maps-enabled. Turnstile var izmantot krāpšanas novēršanai nepieciešamus pārlūkprogrammas datus vai krātuvi.', 'Google Maps pēc noklusējuma ir izslēgts. Piekrišanu varat jebkurā laikā atsaukt kājenes sadaļā “Privātuma izvēles”; karte tad vairs netiks ielādēta. Atsaukšana neietekmē pirms tās veiktās apstrādes likumību. Valodas un kartes izvēles var izdzēst arī pārlūkprogrammas vietnes datu iestatījumos.'] },
        { title: 'Jūsu tiesības', items: ['Pieprasīt piekļuvi datiem un to kopiju, datu labošanu, dzēšanu vai apstrādes ierobežošanu, ja ir izpildīti GDPR nosacījumi.', 'Jebkurā laikā iebilst pret apstrādi, kas balstīta uz leģitīmajām interesēm. Tad apstrādi pārtrauksim, ja vien nepierādīsim pārliecinošus leģitīmus iemeslus vai dati nebūs vajadzīgi juridisku prasību celšanai, īstenošanai vai aizstāvībai.', 'Atsaukt piekrišanu un saņemt datu pārnesamību, ja attiecīgajai apstrādei šīs tiesības ir piemērojamas.', 'Atbildēsim bez nepamatotas kavēšanās un parasti viena mēneša laikā. Lai neizpaustu datus citai personai, varam lūgt samērīgu identitātes apstiprinājumu.'] },
        { title: 'Sūdzība uzraudzības iestādei', paragraphs: ['Jums ir tiesības iesniegt sūdzību Datu valsts inspekcijā, Elijas ielā 17, Rīgā, LV-1050, vai tīmekļvietnē www.dvi.gov.lv. Pirms tam aicinām sazināties ar mums, lai varam jautājumu atrisināt.'] },
        { title: 'Automatizēta lēmumu pieņemšana', paragraphs: ['Asociācija neizmanto pilnībā automatizētu lēmumu pieņemšanu vai profilēšanu, kas jums radītu juridiskas vai līdzīgi būtiskas sekas. Turnstile automātiski novērtē ļaunprātīgas izmantošanas risku, taču neveic šāda veida lēmumu par jums; neveiksmīgu pārbaudi varat atkārtot vai sazināties ar mums citā veidā.'] },
      ],
      contact: { title: 'Privātuma un politikas jautājumi', body: 'Lai izmantotu savas tiesības vai uzdotu jautājumu par šo politiku, sazinieties ar Asociāciju, izmantojot šo e-pasta adresi:' },
      updated: 'Pēdējoreiz atjaunināts: 2026. gada 27. jūlijā. Par būtiskām izmaiņām informēsim šajā lapā un atjaunināsim datumu.',
    },
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
      registry: 'Registry',
      join: 'Become a member',
    },
    footer: {
      navigation: 'Navigation',
      description: 'Latvian Fire Safety Association - representing fire-safety professionals together since 2002.',
      details: 'Company details:',
      regNr: 'Reg. Nr: 40008066462',
      bank: 'Bank: AS Swedbank',
      swift: 'SWIFT BIC:HABALV22',
      account: 'Account: LV24HABA0551044104806',
      copyright: '© 2026 Latvian Fire Safety Association. All rights reserved.',
      privacy: 'Privacy policy',
      statutes: 'Association statutes',
      legal: 'Legal information',
      preferences: 'Privacy choices',
    },
    loading: { page: 'Page loading' },
    externalContent: {
      preferencesTitle: 'Privacy choices',
      preferencesDescription: 'Choose whether Google Maps may load on the contacts page. You can change this choice at any time.',
      optionalCookies: 'Optional cookies and services',
      mapsTitle: 'Google Maps',
      mapsDescription: 'Loading the map lets Google receive your IP address and process data under its privacy policy.',
      save: 'Save choice',
      settings: 'Settings',
      close: 'Close privacy choices',
      mapHeading: 'Location map',
      mapDescription: 'The map is provided by Google Maps and is not loaded until you choose to load it.',
      mapLoad: 'Load Google Maps',
      mapExternal: 'Open in Google Maps',
      mapPrivacy: 'Read the privacy policy',
    },
    formErrors: { rateLimited: 'Too many submissions. Please try again later.', retryAfterCountdown: 'Try again in {seconds} s.', captcha: 'Captcha verification failed. Please try again.', invalidFields: 'Please check that all fields are filled in correctly.', server: 'The form cannot be sent right now. Please try again later.', network: 'Unable to connect to the server. Check your internet connection and try again.', unknown: 'An unexpected error occurred. Please try again.' },
    formPrivacy: { contact: 'All fields are required to send a message. We process the data for our legitimate interests in replying and protecting the form with Cloudflare Turnstile.', membership: 'All fields are required to assess the application. We process the data for our legitimate interests in managing membership applications and protecting the form with Cloudflare Turnstile.', registry: 'All fields are required to assess the registry application. We process the data for our legitimate interests in managing applications and protecting the form with Cloudflare Turnstile.', link: 'Full details in the privacy policy.' },
    serviceDialog: { close: 'Close service list', loading: 'Loading companies...', error: 'The company list cannot be loaded right now.', empty: 'No companies have been assigned this service yet.' },
    home: {
      title: 'Latvian Fire Safety Association', description: 'Latvian Fire Safety Association', heroHeading: 'LATVIAN\nFIRE SAFETY\nASSOCIATION', heroDescription: 'The Latvian Fire Safety Association brings together fire-safety companies and specialists to promote a safer environment across the country.', apply: 'Apply now', statistics: 'Association statistics', statisticsLabels: ['MEMBERS', 'PARTNERS'], aboutEyebrow: 'ABOUT THE ASSOCIATION', aboutHeading: 'A SAFER\nLATVIA\nTOGETHER', aboutText: 'Founded in 2002, the Latvian Fire Safety Association (LUA) brings together Latvian fire-safety companies, organisations, and specialists. We foster professionalism, safety, and sustainability in the industry. The Association actively works with public institutions to shape effective fire-safety policy in Latvia.', learnMore: 'Learn more', extinguisherAlt: 'Fire extinguishers', services: [['Standards development', 'The Association considers developing and implementing fire-safety standards its most important task, helping ensure high safety standards throughout the country.'], ['Education and training', 'Association members can participate in education and training events that build knowledge and skills in the field of fire safety.'], ['Fire protection', 'Our Association provides fire-safety measures and firefighting equipment to protect people and property.']], newsEyebrow: 'NEWS', newsHeading: 'DISCOVER THE LATEST UPDATES', loadingNews: 'Loading news...', newsError: 'News cannot be loaded right now.', noNews: 'There is currently no news available.', communityEyebrow: 'MEMBERS AND PARTNERS', communityHeading: 'OUR INDUSTRY\nCOMMUNITY', memberCompanies: 'MEMBER COMPANIES', partners: 'PARTNERS', memberLogos: 'Member company logos', logoSuffix: 'logo', joinHeading: 'BECOME A LUA MEMBER', joinText: 'Join multiple members creating a safer Latvia.'
    },
    about: {
      title: 'About us', pageTitle: 'About us | Latvian Fire Safety Association', meta: 'The Latvian Fire Safety Association brings together fire-safety companies and specialists.', years: 'The Latvian Fire Safety Association is {years} years old', associationEyebrow: 'ABOUT THE ASSOCIATION', biznesaGadi: business_years, heading: 'WHAT IS ', intro: ['The Association aims to bring together companies and employees in the Republic of Latvia working in fire-fighting and fire-safety services for shared constructive work and protection of their interests.', 'By its activities and organisational structure, the Latvian Fire Safety Association is a voluntary professional association. Its fundamental purpose is to promote cooperation and professional growth among its members, defend their business, economic and legal interests, and actively represent its members in the Latvian fire-fighting and fire-safety services market and before municipal and state institutions. The Latvian Fire Safety Association is the only public organisation of this type in Latvia.', 'The Association regards ensuring public fire safety in the country as its most important task. This can be achieved through coordinated work to improve legislation and regulations, high-quality fire-safety services, professional training, and effective public information on fire safety. Special attention should be paid to working with mass media when resolving and raising awareness of these issues.', 'Founded in 2002, the Latvian Fire Safety Association currently brings together multiple leading Latvian and international fire-fighting and fire-safety service companies. It cooperates with other public organisations. The Association is also a member of the Latvian Employers Confederation.'], activityEyebrow: 'OUR ACTIVITIES', roleHeading: 'OUR ROLE IN FIRE SAFETY', roleText: 'The Association’s day-to-day and creative work is planned and carried out through several working groups:', workGroups: ['Fire extinguishers and their maintenance.', 'Fire-fighting automation and alarm systems: design, installation and maintenance.', 'Structural fire protection.', 'Chimneys and ventilation: installation and maintenance.', 'Training for fire-safety specialists.'], matchAlt: 'Flame from a lit match', offerEyebrow: 'OFFERS AND SERVICES', offerHeading: 'OUR MEMBER\'S OFFERED SERVICES', sectors: ['Sale, maintenance and refilling of all types of fire extinguishers', 'Sale of all types of fire-fighting inventory, equipment and specialist gear', 'Sale of personal and specialist safety and protective equipment', 'Treatment of building structures with fire-protection coatings and their sale; engineer fire safety comunication', 'Sale of fire-rated doors and gates', 'Fire-rated glass-aluminium structures (windows, doors, partitions, skylights, facades, etc.) and their sale', 'Electrical measurements; lightning protection design and installation', 'Installation of fire alarms, fire notification and security alarm systems', 'Design, installation, testing and maintenance of automatic fire-extinguishing systems, plus sale of materials and equipment', 'Design, installation and maintenance of water supply, sewerage, sprinkler, heating and ventilation systems, and water-pressure testing', 'Chimney manufacture and installation, smoke extraction and protection solutions, fire-safety consulting, briefings and evacuation-plan development', 'Fire safety and protection training under 20- and 160-hour programmes; first-aid training; civil-protection training']
    },
    news: { title: 'News', pageTitle: 'News | Latvian Fire Safety Association', meta: 'News from the Latvian Fire Safety Association.', all: 'All news', loading: 'Loading news...', error: 'News cannot be loaded right now.', retry: 'Try again', uncategorized: 'Uncategorized', noResults: 'No news matches the selected filters.', clear: 'Clear filters', search: 'Search', searchNews: 'Search news', categories: 'NEWS CATEGORIES', maintenance: 'ARE YOUR EXTINGUISHERS MAINTAINED?', maintenanceAlt: 'Several fire extinguishers in a row' },
    article: { title: 'News article', meta: 'A news article from the Latvian Fire Safety Association.', back: 'Back', loading: 'Loading article...', error: 'The article cannot be loaded right now.', missing: 'This article is no longer available.' },
    contacts: { title: 'Contacts', pageTitle: 'Contacts | Latvian Fire Safety Association', meta: 'Contact information and industry resources from the Latvian Fire Safety Association.', map: 'Map of the Latvian Fire Safety Association location in Riga', association: 'ABOUT THE ASSOCIATION', details: 'Company details:', contact: 'GET IN TOUCH', name: 'Full name', namePlaceholder: 'Enter your full name', email: 'Email', emailPlaceholder: 'Enter your email address', message: 'Message', messagePlaceholder: 'Enter your message', send: 'Send', sent: 'Thank you! Your message has been sent.', error: 'An error occurred. Please try again.', resourcesHeading: 'USEFUL LINKS', otherResourcesHeading: 'OTHER LINKS', resources: ['State Fire and Rescue Service', 'State institution websites', 'Collection of legislation online', 'Enterprise Register of Latvia'] },
    members: { title: 'Members', pageTitle: 'Members | Latvian Fire Safety Association', meta: 'Member companies of the Latvian Fire Safety Association.', heading: 'MEMBERS OF THE LATVIAN FIRE SAFETY ASSOCIATION', logoSuffix: 'logo', visit: 'Visit website', loading: 'Loading members...', error: 'Members cannot be loaded right now.', empty: 'There are no members to display yet.', joinHeading: 'BECOME A LUA MEMBER', joinText: 'Join multiple companies creating a safer Latvia.', apply: 'Apply now', honoraryHeading: "HONORARY MEMBERS", honoraryLoading: 'Loading honorary members...', honoraryError: 'Honorable members cannot be loaded right now.', honoraryEmpty: 'There are no honorable members to display yet.' },
    join: { title: 'Join', pageTitle: 'Join | Latvian Fire Safety Association', meta: 'Information about joining the Latvian Fire Safety Association.',biznesaGadi: business_years, heading: 'BECOME A MEMBER!', intro: 'Becoming a member is simple. Join professionals working together to create a safer Latvia.', eligibility: 'Any legal entity operating in the field of fire safety or fire safety services, or directly related to this sector, may become a member of the Association, provided it supports the Association’s objectives and undertakes to comply with its statutes.', years: 'The Latvian Fire Safety Association is {years} years old', application: 'Admit your company', company: 'Company name', position: 'Position at company', name: 'Full name', email: 'Email', phone: 'Phone', description: 'Brief company description', dutiesHeading: 'Member responsibilities', duties: ['Comply with the Association statutes and Board decisions.', 'Participate in the Association’s work and support its aims.', 'Pay membership fees on time.'], dutiesAccepted: 'I confirm that I have read and accept the member responsibilities.', send: 'Submit application', sent: 'Thank you! Your application has been sent.', error: 'An error occurred. Please try again.', notice: 'The Board decides on the admission of a member. The Board must consider the applicant’s request at its next meeting, but no later than two weeks after receiving all necessary documents. The applicant must be invited to the Board meeting that considers the request and given an opportunity to express their view. The applicant’s absence does not prevent the Board from making its decision. The Board must notify the applicant in writing of its reasoned decision within one week after it is made.' },
    registrs: { title: 'Registry', pageTitle: 'Registry | Latvian Fire Safety Association', meta: 'Registry for members of the Latvian Fire Safety Association.', heading: 'REGISTER<br /><em>YOUR COMPANY</em>', intro: 'Fill out the registry forum to adapt to the Latvian law changes', name: 'Name, Surname', email: 'Email', company: 'Company', send: 'Submit to registr', sent: 'Thank you! Your information has been sent.', error: 'An error occurred. Please try again.' },
    privacy: {
      title: 'Privacy policy',
      pageTitle: 'Privacy policy | Latvian Fire Safety Association',
      meta: 'Information about personal data processing on the Latvian Fire Safety Association website.',
      
      intro: 'This policy explains how the Latvian Fire Safety Association processes personal data when you visit this website or submit a form.',
      summary: 'Please do not send health data, political opinions, or other special-category data, or unnecessary data about other people. If such information is not needed to handle your request, we will delete it.',
      sections: [
        { title: 'Controller', paragraphs: ['The controller is Latvijas Ugunsdrošības asociācija BIEDRĪBA, registration No. 40008066462, registered address: Vijciema iela 1A, Riga, LV-1006, Latvia. The email address for privacy matters appears at the end of this policy.'] },
        { title: 'Data sources and categories', items: ['When you visit: IP address, request date and time, requested address, browser or device technical information, security-check result, and error or correlation identifiers. We receive this data from your device and infrastructure providers.', 'Contact form: your name, email address, and message content.', 'Membership application: company name, your position, name, email address, phone number, company description, and confirmation that you accept the membership duties.', 'Registry form: your name, email address, and company name.', 'Website choices: selected language and Google Maps loading preference.', 'If we publish an honorary member’s name with their consent, it becomes publicly available to website visitors.'] },
        { title: 'Purposes and legal bases', paragraphs: ['We process contact data to handle and answer your message. The basis is Article 6(1)(f) GDPR: our legitimate interest in maintaining communication about the Association’s work.', 'We process membership and registry application data to check the application, communicate with the applicant, and manage the relevant process. The basis is Article 6(1)(f) GDPR: our and the applicant’s legitimate interests in administering membership and registry applications.', 'We process IP addresses and other technical data to deliver and protect the website, prevent fraud, limit automated submissions, and diagnose errors. The basis is Article 6(1)(f) GDPR: our legitimate interest in providing a secure and available website.', 'We store the selected language to provide the website function you requested. We load Google Maps and publish an honorary member’s name only with consent under Article 6(1)(a) GDPR.'] },
        { title: 'Whether you must provide data', paragraphs: ['All marked form fields and the Cloudflare Turnstile check are required. Without them, we cannot securely receive and assess the submission. You are not legally or contractually required to use a form and may contact the Association through another published channel. Include only information needed to handle your request in free-text fields.'] },
        { title: 'Recipients', paragraphs: ['Where necessary, data is accessed by authorised Association board members or staff and processors providing server hosting, email delivery, backups, and technical support. We limit provider access to what the service requires and, where a provider is a processor, use a contract meeting Article 28 GDPR.', 'Cloudflare, Inc. provides the Turnstile security check and receives the IP address, browser or device signals, verification token, and result. Google LLC receives technical data only if you choose to load Google Maps. A published honorary member’s name is available to every website visitor. We do not sell personal data.'] },
        { title: 'Transfers outside the EEA', paragraphs: ['Cloudflare and Google may process data in the United States or other countries outside the European Economic Area. Depending on the recipient and processing, we use a European Commission adequacy decision, including the EU-US Data Privacy Framework for certified recipients, or European Commission standard contractual clauses under Article 46(2)(c) GDPR with necessary supplementary safeguards. Request information or a copy of the applicable safeguards through the email address at the end of this policy.'] },
        { title: 'Retention periods', items: ['We delete contact requests, registry applications, and rejected or withdrawn membership applications, including email copies, no later than 12 months after the process ends unless the data is needed for a dispute.', 'We retain an accepted member’s and contact person’s data during membership. After membership ends, we keep only data needed for legal claims or a specific statutory duty and document the period in our record of processing activities.', 'Pseudonymised rate-limit counters expire automatically at the end of the configured limit window and no later than 24 hours. The Association does not retain Turnstile tokens after verification.', 'We rotate routine technical logs and keep them only as long as needed for security and error diagnosis. We may isolate incident records until an investigation or legal claim ends and then review whether they remain necessary.'] },
        { title: 'Browser storage and external content', paragraphs: ['The website does not use analytics or advertising cookies. We use the localStorage key lua-language for the language and lua-google-maps-enabled for the Google Maps choice. Turnstile may use browser data or storage necessary for fraud prevention.', 'Google Maps is off by default. You can withdraw consent at any time through “Privacy choices” in the footer; the map will then stop loading. Withdrawal does not affect processing that occurred before it. You can also remove the language and map choices through your browser’s site-data settings.'] },
        { title: 'Your rights', items: ['Request access to and a copy of your data, rectification, erasure, or restriction where the GDPR conditions are met.', 'Object at any time to processing based on legitimate interests. We will then stop unless we demonstrate compelling legitimate grounds or need the data to establish, exercise, or defend legal claims.', 'Withdraw consent and receive data portability where those rights apply to the relevant processing.', 'We will respond without undue delay and normally within one month. We may request proportionate identity verification to avoid disclosing data to someone else.'] },
        { title: 'Complaint to the supervisory authority', paragraphs: ['You may complain to the Latvian Data State Inspectorate at Elijas iela 17, Riga, LV-1050, Latvia, or through www.dvi.gov.lv. We invite you to contact us first so that we can try to resolve the matter.'] },
        { title: 'Automated decision-making', paragraphs: ['The Association does not use fully automated decision-making or profiling that produces legal or similarly significant effects for you. Turnstile automatically assesses abuse risk, but it does not make such a decision about you; you may retry a failed check or contact us through another channel.'] },
      ],
      contact: { title: 'Privacy contact', body: 'To exercise your rights or ask a question about this policy, contact the Association using this email address:' },
      updated: 'Last updated: 27 July 2026. We will publish material changes on this page and update the date.',
    },
    legal: {
      title: 'Legal information',
      pageTitle: 'Legal information | Latvian Fire Safety Association',
      meta: 'Legal information for the Latvian Fire Safety Association website.',
      intro: 'This section identifies the website operator and the basic terms for using this website.',
      sections: [
        { title: 'Website operator', paragraphs: ['Latvijas Ugunsdrošības asociācija BIEDRĪBA', 'Registration No. 40008066462', 'Vijciema iela 1A, Riga, LV-1006'] },
        { title: 'Website content', paragraphs: ['Website content is provided for information purposes. The Association aims to keep it current, but does not guarantee that every published item is always complete or error-free. Before making a decision based on website content, consider the relevant legal requirements and consult a qualified professional where appropriate.'] },
        { title: 'Copyright and links', paragraphs: ['Unless stated otherwise, the website text, design, and images owned by the Association are protected. Reuse requires the Association’s permission or another applicable legal basis.', 'The website may link to third-party websites. The Association does not control their content, availability, or privacy practices and is not responsible for using them.'] },
      ],
      privacy: { title: 'Privacy', body: 'See the privacy policy for information about personal data processing and your rights. Use the email address below for data-processing questions.', link: 'Open the privacy policy' },
    },
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
