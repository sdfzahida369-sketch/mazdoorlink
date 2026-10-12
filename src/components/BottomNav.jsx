import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { Home, PlusCircle, ListFilter, User, LogOut } from 'lucide-react';

export default function BottomNav({ currentTab, setCurrentTab }) {
  const { t } = useLanguage();
  const { currentUser, userProfile, logout } = useAuth();

  if (!currentUser) return null;

  const isContractor = userProfile?.role === 'contractor';

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-dark-card/95 backdrop-blur-lg border-t border-gold/30 shadow-[0_-4px_20px_rgba(0,0,0,0.8)]">
      <div className="max-w-md mx-auto flex items-center justify-around py-2 px-3">
        {/* Home Feed */}
        <button
          onClick={() => setCurrentTab('home')}
          className={`flex flex-col items-center py-1 px-3 rounded-xl transition-all ${
            currentTab === 'home'
              ? 'text-gold font-bold scale-105 drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[11px]">{t.home}</span>
        </button>

        {/* Contractor specific button: Post Site / My Sites */}
        {isContractor ? (
          <button
            onClick={() => setCurrentTab('my-sites')}
            className={`flex flex-col items-center py-1 px-3 rounded-xl transition-all ${
              currentTab === 'my-sites'
                ? 'text-gold font-bold scale-105 drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <PlusCircle className="w-5 h-5 mb-0.5 text-gold" />
            <span className="text-[11px]">{t.myPosts}</span>
          </button>
        ) : null}

        {/* Profile */}
        <button
          onClick={() => setCurrentTab('profile')}
          className={`flex flex-col items-center py-1 px-3 rounded-xl transition-all ${
            currentTab === 'profile'
              ? 'text-gold font-bold scale-105 drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <User className="w-5 h-5 mb-0.5" />
          <span className="text-[11px]">{t.profileNav}</span>
        </button>

        {/* Quick Logout button on bottom nav */}
        <button
          onClick={logout}
          className="flex flex-col items-center py-1 px-3 text-red-400 hover:text-red-300 transition-all"
          title={t.logout}
        >
          <LogOut className="w-5 h-5 mb-0.5" />
          <span className="text-[11px]">{t.logout}</span>
        </button>
      </div>
    </nav>
  );
}
