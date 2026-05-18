import { useState } from 'react'
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
    <div className="flex justify-center bg-gray-100 min-h-screen">
      <div className="relative w-full max-w-[430px] bg-white h-screen flex flex-col shadow-xl overflow-hidden">
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
