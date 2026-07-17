const navigationItems = {
  about: { labelKey: 'navigation.about', path: '/par-mums' },
  news: { labelKey: 'navigation.news', path: '/jaunumi' },
  members: { labelKey: 'navigation.members', path: '/biedri' },
  contacts: { labelKey: 'navigation.contacts', path: '/kontakti' },
  join: { labelKey: 'navigation.join', path: '/klut-par-biedru' },
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