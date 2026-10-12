import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import SplashScreen from './components/SplashScreen';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import AuthPage from './pages/AuthPage';
import MazdoorHome from './pages/MazdoorHome';
import ContractorDashboard from './pages/ContractorDashboard';
import ProfilePage from './pages/ProfilePage';

function MainApp() {
  const { currentUser, userProfile, loading } = useAuth();
  const [currentTab, setCurrentTab] = useState('home'); // 'home' | 'my-sites' | 'profile'
  const [editingSite, setEditingSite] = useState(null);
  const [showSplash, setShowSplash] = useState(true);

  // If contractor edits site from home feed, switch tab automatically
  const handleEditSite = (site) => {
    setEditingSite(site);
    setCurrentTab('my-sites');
  };

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-bg text-gold flex items-center justify-center font-bold">
        <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!currentUser) {
    return <AuthPage />;
  }

  const isContractor = userProfile?.role === 'contractor';

  return (
    <div className="min-h-screen bg-dark-bg text-gray-100 flex flex-col font-sans selection:bg-gold selection:text-black">
      {/* Top Header */}
      <Header currentTab={currentTab} setCurrentTab={setCurrentTab} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6">
        {currentTab === 'home' && (
          <MazdoorHome onEditSite={handleEditSite} />
        )}

        {currentTab === 'my-sites' && (
          /* Role Guard: If non-contractor accesses my-sites tab, render dashboard */
          <ContractorDashboard editingSite={editingSite} setEditingSite={setEditingSite} />
        )}

        {currentTab === 'profile' && (
          <ProfilePage />
        )}
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNav currentTab={currentTab} setCurrentTab={setCurrentTab} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
