import React from 'react';
import LogoSVG from './LogoSVG';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { Globe, LogOut, UserCheck, HardHat, Building2 } from 'lucide-react';

export default function Header({ currentTab, setCurrentTab }) {
  const { t, lang, toggleLanguage } = useLanguage();
  const { currentUser, userProfile, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 bg-dark-bg/95 backdrop-blur-md border-b border-dark-border shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo & App Name */}
        <div 
          onClick={() => setCurrentTab && setCurrentTab('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <LogoSVG size={38} />
          <div>
            <h1 className="text-xl sm:text-2xl font-bold gold-text-gradient tracking-wide group-hover:brightness-110 transition-all">
              {t.appName}
            </h1>
            <p className="text-[10px] text-gold/80 font-semibold tracking-wider hidden sm:block">
              {lang === 'ur' ? 'پاکستان کی تعمیری مارکیٹ' : 'Construction Labour Network'}
            </p>
          </div>
        </div>

        {/* Right Section: Role badge, Language Toggle, Auth Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* User Profile Badge (if logged in) */}
          {currentUser && userProfile && (
            <div className="hidden md:flex items-center gap-2 bg-dark-card border border-gold/30 rounded-full px-3 py-1 text-xs">
              {userProfile.role === 'contractor' ? (
                <Building2 className="w-3.5 h-3.5 text-gold" />
              ) : (
                <HardHat className="w-3.5 h-3.5 text-gold" />
              )}
              <span className="font-semibold text-gray-200">
                {userProfile.fullName || userProfile.email}
              </span>
              <span className="bg-gold/20 text-gold text-[10px] px-2 py-0.5 rounded-full font-bold uppercase border border-gold/40">
                {userProfile.role === 'contractor' ? t.roleContractor.split('/')[0] : t.roleMazdoor.split('/')[0]}
              </span>
            </div>
          )}

          {/* Language Toggle Button */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 bg-dark-card hover:bg-dark-border border border-gold/40 text-gold hover:text-white px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all shadow-sm active:scale-95"
            title="Switch Language / زبان تبدیل کریں"
          >
            <Globe className="w-4 h-4 text-gold animate-spin-slow" />
            <span>{t.langToggle}</span>
          </button>

          {/* Logout Button (if logged in) */}
          {currentUser && (
            <button
              onClick={logout}
              className="flex items-center gap-1 bg-red-950/40 hover:bg-red-900/60 border border-red-700/50 text-red-300 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all active:scale-95"
              title={t.logout}
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.logout}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
