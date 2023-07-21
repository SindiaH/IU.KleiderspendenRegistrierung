import { LanguageInfo } from '../translation.service';


export const locale: LanguageInfo = {
  lang: 'de',
  name: 'Deutsch',
  isRTL: false,
  flag: '🇩🇪',
  data: {
    'WELCOME': 'Willkommen',
    'TITLE': 'Kleiderspende',
    'DONATION': {
      'TITLE': 'Spende'
    },
    'ADMIN': {
      'TITLE': 'Spendenübersicht',
    },
    'AUTH': {
      'LOGIN': {
        'TITLE': 'Login',
        'EMAIL': 'Email',
        'PASSWORD': 'Passwort',
        'BUTTON': 'Login',
      },
      'REGISTER': {
        'TITLE': 'Registrieren',
        'EMAIL': 'Email',
        'PASSWORD': 'Passwort',
        'BUTTON': 'Registrieren',
      },
      'LOGOUT': {
        'TITLE': 'Logout',
      },
      'PROFILE': {
        'TITLE': 'Profil',
      },
    }
  }
}
