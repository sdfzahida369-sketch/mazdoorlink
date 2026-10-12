import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import LogoSVG from '../components/LogoSVG';
import { HardHat, Building2, Lock, Mail, User, Phone, MapPin, Sparkles, AlertCircle } from 'lucide-react';

export default function AuthPage() {
  const { t, lang } = useLanguage();
  const { login, signup, quickDemoLogin, resetPassword } = useAuth();

  const [isSignUp, setIsSignUp] = useState(false);
  const [role, setRole] = useState('mazdoor'); // 'mazdoor' or 'contractor'
  
  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Lahore');
  const [companyName, setCompanyName] = useState('');

  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!email || !password) {
      setError(lang === 'ur' ? 'برائے مہربانی تمام خانے پر کریں' : 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      if (isSignUp) {
        if (!fullName || !phone) {
          setError(lang === 'ur' ? 'نام اور فون نمبر درج کرنا لازمی ہے' : 'Name and phone are required');
          setLoading(false);
          return;
        }
        await signup(email, password, {
          fullName,
          phone,
          city,
          role,
          companyName: role === 'contractor' ? companyName : ''
        });
      } else {
        await login(email, password);
      }
    } catch (err) {
      console.error(err);
      setError(err.message || (lang === 'ur' ? 'لاگ ان کرنے میں ناکامی' : 'Authentication failed'));
    }
    setLoading(false);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!resetEmail) return;
    try {
      await resetPassword(resetEmail);
      setMessage(t.resetEmailSent);
      setShowForgotModal(false);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg text-gray-100 flex flex-col justify-center items-center px-4 py-8 relative overflow-hidden">
      {/* Background Subtle Gold Glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-gold-glow pointer-events-none blur-3xl opacity-40 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="w-full max-w-md bg-dark-card border border-gold/30 rounded-3xl p-6 sm:p-8 shadow-[0_0_40px_rgba(0,0,0,0.9)] relative z-10">
        
        {/* App Logo & Header */}
        <div className="text-center mb-6">
          <LogoSVG size={70} className="mx-auto mb-3" />
          <h2 className="text-3xl font-extrabold gold-text-gradient tracking-wide">
            {t.appName}
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            {isSignUp ? t.signUp : t.login}
          </p>
        </div>

        {/* Quick Demo Login Bar (1-Click for Evaluators) */}
        <div className="bg-dark-bg p-3 rounded-2xl border border-gold/20 mb-6 text-center">
          <span className="text-[11px] text-gold font-bold flex items-center justify-center gap-1 mb-2 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            {lang === 'ur' ? 'فوری ڈیمو لاگ ان (ایک کلک)' : 'Quick Demo Login (1-Click)'}
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => quickDemoLogin('mazdoor')}
              className="bg-gold/10 hover:bg-gold/25 text-gold border border-gold/40 text-xs font-bold py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 active:scale-95"
            >
              <HardHat className="w-4 h-4" />
              <span>{t.roleMazdoor.split('/')[0]}</span>
            </button>

            <button
              type="button"
              onClick={() => quickDemoLogin('contractor')}
              className="bg-gold/10 hover:bg-gold/25 text-gold border border-gold/40 text-xs font-bold py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 active:scale-95"
            >
              <Building2 className="w-4 h-4" />
              <span>{t.roleContractor.split('/')[0]}</span>
            </button>
          </div>
        </div>

        {/* Error / Success Notifications */}
        {error && (
          <div className="mb-4 bg-red-950/80 border border-red-700 text-red-200 text-xs p-3 rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}
        {message && (
          <div className="mb-4 bg-emerald-950/80 border border-emerald-700 text-emerald-200 text-xs p-3 rounded-xl">
            {message}
          </div>
        )}

        {/* Role Selection Cards (When Sign Up) */}
        {isSignUp && (
          <div className="mb-6">
            <label className="block text-xs font-bold text-gray-300 mb-2">
              {t.selectRole}
            </label>
            <div className="grid grid-cols-2 gap-3">
              {/* Mazdoor Card */}
              <div
                onClick={() => setRole('mazdoor')}
                className={`cursor-pointer p-4 rounded-2xl border text-center transition-all ${
                  role === 'mazdoor'
                    ? 'bg-gold/15 border-gold shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                    : 'bg-dark-bg border-dark-border hover:border-gray-600'
                }`}
              >
                <HardHat className={`w-8 h-8 mx-auto mb-2 ${role === 'mazdoor' ? 'text-gold' : 'text-gray-400'}`} />
                <h4 className="text-sm font-bold text-gray-100">{t.roleMazdoor}</h4>
                <p className="text-[10px] text-gray-400 mt-1 leading-tight">{t.roleMazdoorDesc}</p>
              </div>

              {/* Contractor Card */}
              <div
                onClick={() => setRole('contractor')}
                className={`cursor-pointer p-4 rounded-2xl border text-center transition-all ${
                  role === 'contractor'
                    ? 'bg-gold/15 border-gold shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                    : 'bg-dark-bg border-dark-border hover:border-gray-600'
                }`}
              >
                <Building2 className={`w-8 h-8 mx-auto mb-2 ${role === 'contractor' ? 'text-gold' : 'text-gray-400'}`} />
                <h4 className="text-sm font-bold text-gray-100">{t.roleContractor}</h4>
                <p className="text-[10px] text-gray-400 mt-1 leading-tight">{t.roleContractorDesc}</p>
              </div>
            </div>
          </div>
        )}

        {/* Main Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Sign Up Extra Fields */}
          {isSignUp && (
            <>
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">{t.fullName}</label>
                <div className="relative">
                  <User className="w-4 h-4 text-gold absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={lang === 'ur' ? 'مثلاً: کاشف علی' : 'e.g. Kashif Ali'}
                    className="w-full bg-dark-bg border border-dark-border rounded-xl pl-9 pr-3 py-2.5 text-sm text-gray-100 focus:border-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">{t.phone}</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-gold absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="03001234567"
                    className="w-full bg-dark-bg border border-dark-border rounded-xl pl-9 pr-3 py-2.5 text-sm text-gray-100 focus:border-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">{t.city}</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-gold absolute left-3 top-3" />
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-dark-bg border border-dark-border rounded-xl pl-9 pr-3 py-2.5 text-sm text-gray-100 focus:border-gold"
                  >
                    <option value="Lahore">Lahore (لاہور)</option>
                    <option value="Karachi">Karachi (کراچی)</option>
                    <option value="Islamabad">Islamabad (اسلام آباد)</option>
                    <option value="Rawalpindi">Rawalpindi (راولپنڈی)</option>
                    <option value="Faisalabad">Faisalabad (فیصل آباد)</option>
                    <option value="Multan">Multan (ملتان)</option>
                    <option value="Peshawar">Peshawar (پشاور)</option>
                    <option value="Gujranwala">Gujranwala (گوجرانوالہ)</option>
                  </select>
                </div>
              </div>

              {role === 'contractor' && (
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">{t.companyName}</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder={lang === 'ur' ? 'مثلاً: چوہدری کنسٹرکشن' : 'e.g. Chaudhry Builders'}
                    className="w-full bg-dark-bg border border-dark-border rounded-xl px-3 py-2.5 text-sm text-gray-100 focus:border-gold"
                  />
                </div>
              )}
            </>
          )}

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">{t.email}</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gold absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@example.com"
                className="w-full bg-dark-bg border border-dark-border rounded-xl pl-9 pr-3 py-2.5 text-sm text-gray-100 focus:border-gold"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">{t.password}</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gold absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-dark-bg border border-dark-border rounded-xl pl-9 pr-3 py-2.5 text-sm text-gray-100 focus:border-gold"
              />
            </div>
          </div>

          {/* Forgot Password Link */}
          {!isSignUp && (
            <div className="text-right">
              <button
                type="button"
                onClick={() => setShowForgotModal(true)}
                className="text-xs text-gold hover:underline font-semibold"
              >
                {t.forgotPassword}
              </button>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold-gradient hover:brightness-110 text-black font-bold py-3.5 px-4 rounded-xl text-base shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? t.loading : (isSignUp ? t.signUp : t.login)}
          </button>
        </form>

        {/* Toggle Login / Sign Up */}
        <div className="mt-6 text-center border-t border-dark-border pt-4">
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError('');
              setMessage('');
            }}
            className="text-sm font-semibold text-gray-300 hover:text-gold transition-colors"
          >
            {isSignUp ? t.alreadyHaveAccount : t.noAccount}
          </button>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-dark-card border border-gold/40 rounded-2xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-bold text-gold mb-2">{t.forgotPassword}</h3>
            <p className="text-xs text-gray-300 mb-4">
              {lang === 'ur' 
                ? 'اپنا ای میل ایڈریس درج کریں، ہم آپ کو ری سیٹ کرنے کی لنک بھیجیں گے:' 
                : 'Enter your email address to receive a password reset link:'}
            </p>
            <input
              type="email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              placeholder="user@example.com"
              className="w-full bg-dark-bg border border-dark-border rounded-xl px-3 py-2 text-sm mb-4 text-gray-100"
            />
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setShowForgotModal(false)}
                className="px-3 py-1.5 text-xs text-gray-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleResetPassword}
                className="bg-gold text-black font-bold px-4 py-1.5 rounded-lg text-xs"
              >
                {t.sendResetLink}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
