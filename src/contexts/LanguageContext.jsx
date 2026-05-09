import { createContext, useContext, useState } from 'react'

const LanguageContext = createContext({ lang: 'en', setLang: () => {}, nickname: 'David', setNickname: () => {} })

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en')
  const [nickname, setNickname] = useState('David')
  return (
    <LanguageContext.Provider value={{ lang, setLang, nickname, setNickname }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
