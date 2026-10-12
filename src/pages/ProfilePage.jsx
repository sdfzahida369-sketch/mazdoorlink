import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { User, Phone, MapPin, HardHat, Building2, Briefcase, CheckCircle, Save, AlertCircle } from 'lucide-react';

export default function ProfilePage() {
  const { t, lang } = useLanguage();
  const { userProfile, updateProfileData } = useAuth();

  const isMazdoor = userProfile?.role === 'mazdoor';

  // State
  const [fullName, setFullName] = useState(userProfile?.fullName || '');
  const [phone, setPhone] = useState(userProfile?.phone || '');
  const [city, setCity] = useState(userProfile?.city || 'Lahore');
  const [skill, setSkill] = useState(userProfile?.skill || 'mistri');
  const [experienceYears, setExperienceYears] = useState(userProfile?.experienceYears || 3);
  const [availability, setAvailability] = useState(userProfile?.availability || 'available');
  const [companyName, setCompanyName] = useState(userProfile?.companyName || '');

  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);

    const updated = {
      fullName,
      phone,
      city,
      skill,
      experienceYears: Number(experienceYears),
      availability,
      companyName
    };

    await updateProfileData(updated);
    setSaving(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3500);
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 pb-20">
      {/* Title */}
      <div className="bg-dark-card border border-gold/30 rounded-3xl p-6 shadow-xl text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gold-glow pointer-events-none opacity-30" />

        <div className="w-20 h-20 rounded-full bg-gold/15 border-2 border-gold flex items-center justify-center mx-auto mb-3 shadow-[0_0_20px_rgba(212,175,55,0.4)]">
          {isMazdoor ? (
            <HardHat className="w-10 h-10 text-gold" />
          ) : (
            <Building2 className="w-10 h-10 text-gold" />
          )}
        </div>

        <h2 className="text-2xl font-bold gold-text-gradient">
          {userProfile?.fullName || 'User Profile'}
        </h2>

        <div className="mt-2 inline-block bg-gold/20 border border-gold/40 text-gold text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          {isMazdoor ? t.roleMazdoor : t.roleContractor}
        </div>
      </div>

      {/* Success Banner */}
      {success && (
        <div className="bg-emerald-950/90 border border-emerald-600 text-emerald-200 text-sm p-4 rounded-2xl flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="font-bold">{t.profileUpdated}</span>
        </div>
      )}

      {/* Edit Form */}
      <form onSubmit={handleSave} className="bg-dark-card border border-gold/30 rounded-3xl p-6 space-y-4 shadow-xl">
        
        {/* Full Name */}
        <div>
          <label className="block text-xs font-bold text-gray-300 mb-1">{t.fullName}</label>
          <div className="relative">
            <User className="w-4 h-4 text-gold absolute left-3 top-3.5" />
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-dark-bg border border-dark-border rounded-xl pl-9 pr-3 py-2.5 text-sm text-gray-100 focus:border-gold"
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-bold text-gray-300 mb-1">{t.phone}</label>
          <div className="relative">
            <Phone className="w-4 h-4 text-gold absolute left-3 top-3.5" />
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-dark-bg border border-dark-border rounded-xl pl-9 pr-3 py-2.5 text-sm text-gray-100 focus:border-gold"
            />
          </div>
        </div>

        {/* City */}
        <div>
          <label className="block text-xs font-bold text-gray-300 mb-1">{t.city}</label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-gold absolute left-3 top-3.5" />
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

        {/* Mazdoor Specific Fields */}
        {isMazdoor ? (
          <>
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">{t.skillsLabel}</label>
              <div className="relative">
                <HardHat className="w-4 h-4 text-gold absolute left-3 top-3.5" />
                <select
                  value={skill}
                  onChange={(e) => setSkill(e.target.value)}
                  className="w-full bg-dark-bg border border-dark-border rounded-xl pl-9 pr-3 py-2.5 text-sm text-gray-100 focus:border-gold"
                >
                  <option value="mistri">{t.skills.mistri}</option>
                  <option value="mazdoor">{t.skills.mazdoor}</option>
                  <option value="painter">{t.skills.painter}</option>
                  <option value="electrician">{t.skills.electrician}</option>
                  <option value="plumber">{t.skills.plumber}</option>
                  <option value="carpenter">{t.skills.carpenter}</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">{t.experienceYears}</label>
                <input
                  type="number"
                  min="0"
                  max="50"
                  value={experienceYears}
                  onChange={(e) => setExperienceYears(e.target.value)}
                  className="w-full bg-dark-bg border border-dark-border rounded-xl px-3 py-2.5 text-sm text-gray-100 focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">{t.availabilityStatus}</label>
                <select
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                  className="w-full bg-dark-bg border border-dark-border rounded-xl px-3 py-2.5 text-sm text-gray-100 focus:border-gold"
                >
                  <option value="available">🟢 {t.available}</option>
                  <option value="busy">🔴 {t.busy}</option>
                </select>
              </div>
            </div>
          </>
        ) : (
          /* Contractor Specific Field */
          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">{t.companyName}</label>
            <div className="relative">
              <Building2 className="w-4 h-4 text-gold absolute left-3 top-3.5" />
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. Al-Rehman Construction Co."
                className="w-full bg-dark-bg border border-dark-border rounded-xl pl-9 pr-3 py-2.5 text-sm text-gray-100 focus:border-gold"
              />
            </div>
          </div>
        )}

        {/* Save Button */}
        <button
          type="submit"
          disabled={saving}
          className="w-full bg-gold-gradient hover:brightness-110 text-black font-bold py-3.5 px-4 rounded-xl text-base shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <Save className="w-5 h-5" />
          <span>{saving ? t.loading : t.saveProfile}</span>
        </button>
      </form>
    </div>
  );
}
