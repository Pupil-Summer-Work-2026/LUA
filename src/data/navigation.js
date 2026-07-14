const navigationItems = {
  about: { label: 'Par mums', path: '/about-us' },
  news: { label: 'Jaunumi', path: '/jaunumi' },
  members: { label: 'Biedri', path: '/biedri' },
  contacts: { label: 'Kontakti', path: '/contacts' },
  join: { label: 'Kļūsti par biedru', path: '/ktparbiedru' },
}

export const headerNavigation = Object.values(navigationItems)

export const footerNavigationColumns = [
  [navigationItems.about, navigationItems.news, navigationItems.members, navigationItems.contacts, navigationItems.join],
  [navigationItems.news, navigationItems.members, navigationItems.contacts],
]