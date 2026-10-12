import React, { useEffect, useState } from 'react';
import LogoSVG from './LogoSVG';
import { useLanguage } from '../context/LanguageContext';

export default function SplashScreen({ onFinish }) {
  const { t, lang } = useLanguage();
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadingOut(true);
      const finishTimer = setTimeout(() => {
        if (onFinish) onFinish();
      }, 600);
      return () => clearTimeout(finishTimer);
    }, 2800);

    return () => clearTimeout(timer);
  }, [onFinish]);

  const handleSkip = () => {
    setFadingOut(true);
    setTimeout(() => {
      if (onFinish) onFinish();
    }, 300);
  };

  return (
    <div 
      onClick={handleSkip}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-dark-bg cursor-pointer transition-opacity duration-700 select-none ${
        fadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Radial Gold Glow */}
      <div className="absolute w-[350px] h-[350px] rounded-full bg-gold-glow pointer-events-none blur-3xl opacity-60 animate-pulse" />

      {/* Main Container */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Animated Logo */}
        <div className="mb-6 transform transition-transform hover:scale-105 duration-300">
          <LogoSVG size={110} animated={true} />
        </div>

        {/* Brand Name */}
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-wide mb-2 gold-text-gradient drop-shadow-[0_2px_10px_rgba(212,175,55,0.3)]">
          {t.appName}
        </h1>

        {/* Subtitle / Tagline */}
        <p className="text-sm sm:text-base text-gray-300 font-medium max-w-xs sm:max-w-md mt-1 animate-fade-in">
          {t.tagline}
        </p>

        {/* Loader Bar */}
        <div className="w-48 h-1 bg-dark-border rounded-full mt-8 overflow-hidden">
          <div className="h-full bg-gold-gradient rounded-full animate-[pulseGlow_1.5s_infinite_alternate] w-full transform origin-left animate-fade-in" />
        </div>

        <span className="text-xs text-gray-500 mt-4 tracking-widest uppercase">
          {lang === 'ur' ? 'شروع ہو رہا ہے...' : 'Tap anywhere to skip'}
        </span>
      </div>
    </div>
  );
}
