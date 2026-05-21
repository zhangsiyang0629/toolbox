import { ref, watch } from 'vue'
import { zhCN } from '@/locales/zh-CN'
import { en } from '@/locales/en'

type Locale = 'zh-CN' | 'en'

const messages: Record<Locale, Record<string, string>> = { 'zh-CN': zhCN, en }

function detect(): Locale {
  if (typeof localStorage === 'undefined') return 'zh-CN'
  const saved = localStorage.getItem('toolbox_locale') as Locale | null
  if (saved && messages[saved]) return saved
  if (typeof navigator === 'undefined') return 'zh-CN'
  const lang = navigator.language
  return lang.startsWith('zh') ? 'zh-CN' : 'en'
}

const locale = ref<Locale>(detect())

watch(locale, (val) => {
  if (typeof localStorage !== 'undefined') localStorage.setItem('toolbox_locale', val)
  if (typeof document !== 'undefined') document.documentElement.lang = val === 'zh-CN' ? 'zh' : 'en'
})

// Standalone t() for use in converters (outside Vue components)
export function t(key: string): string {
  return messages[locale.value]?.[key] ?? key
}

export function useLocale() {
  function toggle() {
    locale.value = locale.value === 'zh-CN' ? 'en' : 'zh-CN'
  }
  return { t, locale, toggle }
}
