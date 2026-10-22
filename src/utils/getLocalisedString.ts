import enMessages from '../_locales/en/messages.json'
import esMessages from '../_locales/es/messages.json'
import frMessages from '../_locales/fr/messages.json'
import itMessages from '../_locales/it/messages.json'
import deMessages from '../_locales/de/messages.json'
import ptPTMessages from '../_locales/pt_PT/messages.json'
import plMessages from '../_locales/pl/messages.json'
import csMessages from '../_locales/cs/messages.json'
import skMessages from '../_locales/sk/messages.json'
import elMessages from '../_locales/el/messages.json'
import trMessages from '../_locales/tr/messages.json'
import ukMessages from '../_locales/uk/messages.json'
import arMessages from '../_locales/ar/messages.json'
import faMessages from '../_locales/fa/messages.json'
import hiMessages from '../_locales/hi/messages.json'
import idMessages from '../_locales/id/messages.json'
import viMessages from '../_locales/vi/messages.json'
import jaMessages from '../_locales/ja/messages.json'
import koMessages from '../_locales/ko/messages.json'
import zhCNMessages from '../_locales/zh_CN/messages.json'
import zhTWMessages from '../_locales/zh_TW/messages.json'

type MessageKeys = keyof typeof enMessages

const localeMessages = {
  en: enMessages,
  es: esMessages,
  fr: frMessages,
  it: itMessages,
  de: deMessages,
  pt_PT: ptPTMessages,
  pl: plMessages,
  cs: csMessages,
  sk: skMessages,
  el: elMessages,
  tr: trMessages,
  uk: ukMessages,
  ar: arMessages,
  fa: faMessages,
  hi: hiMessages,
  id: idMessages,
  vi: viMessages,
  ja: jaMessages,
  ko: koMessages,
  zh_CN: zhCNMessages,
  zh_TW: zhTWMessages,
} as const

export type SupportedLocales = keyof typeof localeMessages
export type SupportedLocaleOptions = SupportedLocales | 'system'

export const supportedLocaleOptions: SupportedLocaleOptions[] = [
  'it',
  'es',
  'fr',
  'de',
  'en',
  'system',
]

export const localeNativeLabels: Record<SupportedLocales, string> = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  it: 'Italiano',
  de: 'Deutsch',
  pt_PT: 'Português',
  pl: 'Polski',
  cs: 'Čeština',
  sk: 'Slovenčina',
  el: 'Ελληνικά',
  tr: 'Türkçe',
  uk: 'Українська',
  ar: 'العربية',
  fa: 'فارسی',
  hi: 'हिन्दी',
  id: 'Bahasa Indonesia',
  vi: 'Tiếng Việt',
  ja: '日本語',
  ko: '한국어',
  zh_CN: '中文 (简体)',
  zh_TW: '中文 (繁體)',
}

export const normalizeLocaleCode = (locale: string): SupportedLocales => {
  const normalizedLocale = locale.replace('-', '_') as SupportedLocales
  if (localeMessages[normalizedLocale]) {
    return normalizedLocale
  }

  const baseLocale = locale.split(/[-_]/)[0] as SupportedLocales
  if (localeMessages[baseLocale]) {
    return baseLocale
  }

  return 'en'
}

export const getLocalizedMessage = (
  key: MessageKeys,
  preferredLocale?: SupportedLocales,
  substitutions?: Record<string, string | number>,
): string => {
  const fallbackLocale = normalizeLocaleCode(chrome.i18n.getUILanguage() ?? 'en')
  const selectedLocale = preferredLocale || fallbackLocale

  let message =
    (localeMessages[selectedLocale] as Record<string, { message: string }>)?.[key]?.message ||
    chrome.i18n.getMessage(key)

  if (substitutions) {
    for (const [placeholder, value] of Object.entries(substitutions)) {
      message = message.replace(new RegExp(`\\$${placeholder}\\$`, 'g'), String(value))
    }
  }
  return message
}
