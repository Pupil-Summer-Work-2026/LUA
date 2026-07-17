const navigationItems = {
  about: { label: 'Par mums', path: '/par-mums' },
  news: { label: 'Jaunumi', path: '/jaunumi' },
  members: { label: 'Biedri', path: '/biedri' },
  contacts: { label: 'Kontakti', path: '/kontakti' },
  join: { label: 'Kļūsti par biedru', path: '/klut-par-biedru' },
}

export const headerNavigation = [
  navigationItems.about,
  navigationItems.news,
  navigationItems.members,
  navigationItems.contacts,
]

export const footerNavigationColumns = [
  [navigationItems.about, navigationItems.news, navigationItems.members, navigationItems.contacts, navigationItems.join],
  [navigationItems.news, navigationItems.members, navigationItems.contacts],
]