'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Monitor, Moon, Sun } from 'lucide-react'
import { english } from '@/lib/translations'

export type Language = 'id' | 'en'
export type Theme = 'light' | 'dark' | 'system'

const PreferencesContext = createContext<{
  language: Language
  setLanguage: (language: Language) => void
  theme: Theme
  setTheme: (theme: Theme) => void
} | null>(null)

const originalText = new WeakMap<Node, string>()
const originalAttributes = new WeakMap<Element, Map<string, string>>()

export function usePreferences() {
  const value = useContext(PreferencesContext)
  if (!value) throw new Error('PreferencesProvider is missing')
  return value
}

export function PreferencesProvider({ children, initialLanguage }: { children: React.ReactNode; initialLanguage: Language }) {
  const router = useRouter()
  const [language, updateLanguage] = useState<Language>(initialLanguage)
  const [theme, updateTheme] = useState<Theme>('system')

  useEffect(() => {
    const saved = localStorage.getItem('tugasreen-theme')
    if (saved === 'light' || saved === 'dark' || saved === 'system') {
      const frame = requestAnimationFrame(() => updateTheme(saved))
      return () => cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    const saved = document.cookie.split('; ').find((part) => part.startsWith('app-language='))?.split('=')[1]
    if (saved === 'en') {
      const frame = requestAnimationFrame(() => {
        updateLanguage('en')
        document.documentElement.lang = 'en'
      })
      return () => cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const sync = () => document.documentElement.classList.toggle('dark', theme === 'dark' || (theme === 'system' && media.matches))
    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [theme])

  useEffect(() => {
    let translating = false

    const translate = () => {
      if (translating) return
      translating = true
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
      while (walker.nextNode()) {
        const node = walker.currentNode
        if (node.parentElement?.closest('script, style, svg, [data-no-translate]')) continue
        const current = node.textContent ?? ''
        const original = originalText.get(node) ?? current
        if (!originalText.has(node)) originalText.set(node, original)
        const match = original.match(/^(\s*)([\s\S]*?)(\s*)$/)
        if (!match) continue
        const translated = language === 'en' ? english[match[2]] : undefined
        const next = match[1] + (translated ?? match[2]) + match[3]
        if (current !== next) node.textContent = next
      }

      document.querySelectorAll('[placeholder], [aria-label], [title]').forEach((element) => {
        let stored = originalAttributes.get(element)
        if (!stored) { stored = new Map(); originalAttributes.set(element, stored) }
        for (const name of ['placeholder', 'aria-label', 'title']) {
          const current = element.getAttribute(name)
          if (current === null) continue
          if (!stored.has(name)) stored.set(name, current)
          const original = stored.get(name) ?? current
          const next = language === 'en' ? english[original] ?? original : original
          if (current !== next) element.setAttribute(name, next)
        }
      })
      translating = false
    }

    translate()
    const observer = new MutationObserver(translate)
    observer.observe(document.body, { childList: true, characterData: true, subtree: true })
    return () => observer.disconnect()
  }, [language])

  function setLanguage(next: Language) {
    updateLanguage(next)
    document.cookie = `app-language=${next}; path=/; max-age=31536000; samesite=lax`
    document.documentElement.lang = next
    router.refresh()
  }

  function setTheme(next: Theme) {
    updateTheme(next)
    localStorage.setItem('tugasreen-theme', next)
  }

  return <PreferencesContext.Provider value={{ language, setLanguage, theme, setTheme }}>{children}</PreferencesContext.Provider>
}

export function PreferencesControls({ compact = false }: { compact?: boolean }) {
  const { language, setLanguage, theme, setTheme } = usePreferences()
  const themeOptions: { value: Theme; icon: typeof Sun; id: string; en: string }[] = [
    { value: 'light', icon: Sun, id: 'Terang', en: 'Light' },
    { value: 'dark', icon: Moon, id: 'Gelap', en: 'Dark' },
    { value: 'system', icon: Monitor, id: 'Sistem', en: 'System' },
  ]

  return <div className={`flex items-center gap-2 ${compact ? 'flex-wrap' : ''}`}>
    <div className="inline-flex rounded-lg border border-emerald-700/20 bg-emerald-50 p-1 dark:border-white/15 dark:bg-white/10" role="radiogroup" aria-label={language === 'id' ? 'Bahasa' : 'Language'}>
      {(['id', 'en'] as const).map((option) => <button key={option} type="button" role="radio" aria-checked={language === option} onClick={() => setLanguage(option)} className={`min-h-9 min-w-10 rounded-md px-2 text-xs font-semibold focus-visible:ring-2 focus-visible:ring-emerald-500 ${language === option ? 'bg-emerald-700 text-white' : 'text-emerald-900 hover:bg-white dark:text-emerald-100 dark:hover:bg-white/10'}`}>{option.toUpperCase()}</button>)}
    </div>
    <div className="inline-flex rounded-lg border border-emerald-700/20 bg-emerald-50 p-1 dark:border-white/15 dark:bg-white/10" role="radiogroup" aria-label={language === 'id' ? 'Tema' : 'Theme'}>
      {themeOptions.map(({ value, icon: Icon, id, en }) => <button key={value} type="button" role="radio" aria-checked={theme === value} aria-label={language === 'id' ? id : en} title={language === 'id' ? id : en} onClick={() => setTheme(value)} className={`grid min-h-9 min-w-9 place-items-center rounded-md focus-visible:ring-2 focus-visible:ring-emerald-500 ${theme === value ? 'bg-emerald-700 text-white' : 'text-emerald-900 hover:bg-white dark:text-emerald-100 dark:hover:bg-white/10'}`}><Icon className="size-4" /></button>)}
    </div>
  </div>
}
