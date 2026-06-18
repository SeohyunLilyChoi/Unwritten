import { useState, useEffect } from 'react'
import TabBar from './components/common/TabBar'
import HomeScreen from './components/screens/HomeScreen'
import ContentScreen from './components/screens/ContentScreen'
import CommunityScreen from './components/screens/CommunityScreen'
import MyPageScreen from './components/screens/MyPageScreen'
import { LanguageProvider, useLanguage } from './contexts/LanguageContext'

function AppScreens() {
  const initTab = new URLSearchParams(location.hash.slice(1)).get('tab') || 'home'
  const [activeTab, setActiveTab] = useState(initTab)
  const [prefillContent, setPrefillContent] = useState(null)
  const { lang } = useLanguage()

  // Fixed device frame (390 x 844). Scale down to fit the viewport with a
  // fixed top/bottom margin so the whole frame (incl. nav bar) is always visible.
  const FRAME_W = 390
  const FRAME_H = 844
  const MARGIN = 24
  const [scale, setScale] = useState(1)
  useEffect(() => {
    const update = () => {
      const next = Math.min(
        1,
        (window.innerHeight - MARGIN * 2) / FRAME_H,
        (window.innerWidth - MARGIN * 2) / FRAME_W,
      )
      setScale(next > 0 ? next : 1)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const handleAskAI = (content) => {
    setPrefillContent(content)
    setActiveTab('home')
  }

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomeScreen
            key={lang}
            prefillContent={prefillContent}
            onClearPrefill={() => setPrefillContent(null)}
          />
        )
      case 'content':
        return <ContentScreen key={lang} onAskAI={handleAskAI} />
      case 'community':
        return <CommunityScreen key={lang} onAskAI={handleAskAI} />
      case 'mypage':
        return <MyPageScreen />
    }
  }

  return (
    <div className="flex items-center justify-center bg-gray-100 h-screen overflow-hidden">
      <div
        className="relative w-[390px] h-[844px] bg-white flex flex-col shadow-xl overflow-hidden"
        style={{ transform: `scale(${scale})`, transformOrigin: 'center center' }}
      >
        <main
          className="flex-1 min-h-0 overflow-y-auto pb-16"
          style={lang === 'en' ? { letterSpacing: '0.012em' } : undefined}
        >
          {renderScreen()}
        </main>
        <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <AppScreens />
    </LanguageProvider>
  )
}
