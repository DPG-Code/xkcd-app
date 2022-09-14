import { createContext, useCallback, useContext } from "react"
import { useRouter } from "next/router"
import en from '../translations/en.json'
import es from '../translations/es.json'

const I18Ncontext = createContext()
const languages = { en, es }

function I18NProvider({ children }) {
  const { locale } = useRouter()

  const t = useCallback((key, ...args) => {
    let translation = languages[locale][key]
    if(args.length === 0) return translation

    args.forEach((value, index) => {
      translation = translation.replace(`\${${index + 1}}`, value)
    })
    return translation
  }, [locale])

  return(
    <I18Ncontext.Provider value={{t}}>
      { children }
    </I18Ncontext.Provider>
  )
}

function useI18N() {
  const context = useContext(I18Ncontext)
  if(context === undefined) {
    throw new Error('useI18N must be used withing a I18NProvider')
  }
  return context
}

export { I18NProvider, useI18N }