import { LanguageInfo } from '../translation.service';

export const locale: LanguageInfo = {
  lang: 'en',
  name: 'English',
  isRTL: false,
  flag: '🇺🇸',
  data: {
    'WELCOME': 'Welcome',
    'TITLE': 'Clothing donation',
    'DONATION': {
      'TITLE': 'Donation'
    },
    'ADMIN': {
      'TITLE': 'Donation overview',
    },
    'AUTH': {
      'LOGIN': {
        'TITLE': 'Login',
        'EMAIL': 'Email',
        'PASSWORD': 'Password',
        'BUTTON': 'Login',
      },
      'REGISTER': {
        'TITLE': 'Register',
        'EMAIL': 'Email',
        'PASSWORD': 'Password',
        'BUTTON': 'Register',
      },
      'LOGOUT': {
        'TITLE': 'Logout',
      },
      'PROFILE': {
        'TITLE': 'Profile',
      },
    }
  }
}
