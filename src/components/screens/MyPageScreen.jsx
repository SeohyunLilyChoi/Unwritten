import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLanguage } from '../../contexts/LanguageContext'
import { translations } from '../../data/translations'

export default function MyPageScreen() {
  const { lang, setLang } = useLanguage()
  const t = translations[lang].myPage
  const lt = translations[lang].langModal
  const [showLangModal, setShowLangModal] = useState(false)

  const MENU_ITEMS = [
    { key: 'myPosts',       label: t.menu.myPosts,       icon: '📝' },
    { key: 'savedContent',  label: t.menu.savedContent,  icon: '🔖' },
    { key: 'pointHistory',  label: t.menu.pointHistory,  icon: '💰' },
    { key: 'notifications', label: t.menu.notifications, icon: '🔔' },
    { key: 'appInfo',       label: t.menu.appInfo,       icon: 'ℹ️' },
    { key: 'language',      label: t.menu.language,      icon: '🌐', isLanguage: true },
    { key: 'logout',        label: t.menu.logout,        icon: '🚪', danger: true },
  ]

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="px-5 pt-14 pb-5">
        <h1 className="text-xl font-bold text-gray-900">{t.title}</h1>
      </div>

      {/* Profile */}
      <div className="mx-5 bg-gray-50 rounded-2xl p-4 flex items-center justify-between mb-5">
        <div>
          <p className="text-base font-bold text-gray-900">{t.profile.role}</p>
          <p className="text-sm text-gray-400 mt-0.5">lily_choi7@snu.ac.kr</p>
        </div>
        <button className="text-xs font-medium text-brand-blue bg-brand-blue-light px-3 py-1.5 rounded-full">
          {t.profile.editBtn}
        </button>
      </div>

      {/* Activity summary */}
      <div className="mx-5 grid grid-cols-3 gap-3 mb-5">
        {[
          { label: t.stats.points, value: '1,240' },
          { label: t.stats.posts, value: '12' },
          { label: t.stats.bestAnswer, value: '3' },
        ].map(({ label, value }) => (
          <div key={label} className="bg-white border border-gray-100 rounded-2xl p-3 text-center shadow-sm">
            <p className="text-lg font-bold text-gray-900">{value}</p>
            <p className="text-xs text-gray-400 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Insight card */}
      <div className="mx-5 bg-brand-blue-light rounded-2xl px-4 py-3 mb-5">
        <p className="text-xs font-semibold text-brand-blue mb-1">{t.insight.label}</p>
        <p
          className="text-sm text-gray-700"
          dangerouslySetInnerHTML={{ __html: t.insight.body }}
        />
      </div>

      {/* Menu */}
      <div className="mx-5 bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
        {MENU_ITEMS.map(({ key, label, icon, danger, isLanguage }) => (
          <button
            key={key}
            onClick={isLanguage ? () => setShowLangModal(true) : undefined}
            className={`w-full flex items-center justify-between px-4 py-4 text-sm font-medium border-b last:border-b-0 border-gray-50 hover:bg-gray-50 active:bg-gray-100 ${
              danger ? 'text-red-400' : 'text-gray-700'
            }`}
          >
            <span className="flex items-center gap-3">
              <span>{icon}</span>
              {label}
            </span>
            {!danger && (
              <svg className="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
          </button>
        ))}
      </div>

      <div className="h-10" />

      {/* Language selection bottom sheet */}
      <AnimatePresence>
        {showLangModal && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLangModal(false)}
            />
            <motion.div
              className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50 bg-white rounded-t-2xl pb-8 pt-5 px-5"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="w-9 h-1 bg-gray-200 rounded-full mx-auto mb-5" />
              <p className="text-base font-bold text-gray-900 mb-4">{lt.title}</p>
              {[
                { value: 'en', label: lt.en, flag: '🇺🇸' },
                { value: 'ko', label: lt.ko, flag: '🇰🇷' },
              ].map(({ value, label, flag }) => (
                <button
                  key={value}
                  onClick={() => { setLang(value); setShowLangModal(false) }}
                  className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl mb-2 border text-sm font-semibold transition-colors ${
                    lang === value
                      ? 'border-brand-blue bg-brand-blue-light text-brand-blue'
                      : 'border-gray-100 bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className="text-base">{flag}</span>
                    {label}
                  </span>
                  {lang === value && (
                    <svg className="w-4 h-4 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
