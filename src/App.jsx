import { useState } from 'react'
import TabBar from './components/common/TabBar'
import HomeScreen from './components/screens/HomeScreen'
import ContentScreen from './components/screens/ContentScreen'
import CommunityScreen from './components/screens/CommunityScreen'
import MyPageScreen from './components/screens/MyPageScreen'

export default function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [prefillText, setPrefillText] = useState('')

  const handleAskAI = (text) => {
    setPrefillText(text)
    setActiveTab('home')
  }

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomeScreen
            prefillText={prefillText}
            onClearPrefill={() => setPrefillText('')}
          />
        )
      case 'content':
        return <ContentScreen onAskAI={handleAskAI} />
      case 'community':
        return <CommunityScreen onAskAI={handleAskAI} />
      case 'mypage':
        return <MyPageScreen />
    }
  }

  return (
    <div className="flex justify-center bg-gray-100 min-h-screen">
      <div className="relative w-full max-w-[430px] bg-white h-screen flex flex-col shadow-xl overflow-hidden">
        <main className="flex-1 min-h-0 overflow-y-auto pb-16">
          {renderScreen()}
        </main>
        <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  )
}
