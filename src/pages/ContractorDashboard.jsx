import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { createSite, fetchAllSites, updateSiteStatus, updateSiteDetails, deleteSite } from '../services/siteService';
import SiteCard from '../components/SiteCard';
import { PlusCircle, Building2, MapPin, HardHat, Users, Banknote, Calendar, Phone, FileText, Check, AlertCircle, X } from 'lucide-react';

export default function ContractorDashboard({ editingSite, setEditingSite }) {
  const { t, lang } = useLanguage();
  const { currentUser, userProfile } = useAuth();

  const [mySites, setMySites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Form Fields
  const [siteName, setSiteName] = useState('');
  const [city, setCity] = useState('Lahore');
  const [area, setArea] = useState('');
  const [workType, setWorkType] = useState('mistri');
  const [workersNeeded, setWorkersNeeded] = useState(4);
  const [dailyWage, setDailyWage] = useState(2500);
  const [durationDays, setDurationDays] = useState(7);
  const [phone, setPhone] = useState(userProfile?.phone || '');
  const [note, setNote] = useState('');

  // Pre-fill form when editing a site
  useEffect(() => {
    if (editingSite) {
      setSiteName(editingSite.siteName || '');
      setCity(editingSite.city || 'Lahore');
      setArea(editingSite.area || '');
      setWorkType(editingSite.workType || 'mistri');
      setWorkersNeeded(editingSite.workersNeeded || 1);
      setDailyWage(editingSite.dailyWage || 2000);
      setDurationDays(editingSite.durationDays || 5);
      setPhone(editingSite.phone || '');
      setNote(editingSite.note || '');
    }
  }, [editingSite]);

  const loadMySites = async () => {
    setLoading(true);
    const all = await fetchAllSites();
    // Filter sites owned by contractor
    const filtered = all.filter(
      (s) => s.contractorId === currentUser?.uid || userProfile?.role === 'contractor'
    );
    setMySites(filtered.length > 0 ? filtered : all.slice(0, 3));
    setLoading(false);
  };

  useEffect(() => {
    loadMySites();
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMessage('');

    const siteData = {
      siteName,
      city,
      area,
      workType,
      workersNeeded: Number(workersNeeded),
      dailyWage: Number(dailyWage),
      durationDays: Number(durationDays),
      phone,
      note
    };

    if (editingSite) {
      // Update existing site
      await updateSiteDetails(editingSite.id, siteData);
      setSuccessMessage(lang === 'ur' ? 'سائٹ کامیابی سے اپ ڈیٹ ہو گئی!' : 'Site updated successfully!');
      setEditingSite(null);
    } else {
      // Post new site
      await createSite(siteData, currentUser, userProfile);
      setSuccessMessage(lang === 'ur' ? 'نئی سائٹ کامیابی سے شائع ہو گئی!' : 'New site posted successfully!');
    }

    // Reset Form
    setSiteName('');
    setArea('');
    setNote('');
    setSubmitting(false);
    loadMySites();

    setTimeout(() => setSuccessMessage(''), 4000);
  };

  const handleMarkFilled = async (siteId, isFilled) => {
    const updated = await updateSiteStatus(siteId, isFilled);
    setMySites(updated);
  };

  const handleDelete = async (siteId) => {
    if (window.confirm(t.confirmDelete)) {
      const updated = await deleteSite(siteId);
      setMySites(updated);
    }
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Top Header */}
      <div className="bg-dark-card border border-gold/30 rounded-3xl p-6 shadow-[0_0_25px_rgba(0,0,0,0.8)] flex items-center justify-between">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold gold-text-gradient flex items-center gap-2">
            <Building2 className="w-7 h-7 text-gold" />
            {editingSite ? (lang === 'ur' ? 'سائٹ میں ترمیم کریں' : 'Edit Construction Site') : t.postSiteTitle}
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 mt-1">
            {lang === 'ur' 
              ? 'مطلوبہ کاریگروں اور دیہاڑی کی تفصیل درج کریں' 
              : 'Fill in details below to notify available construction workers near your site'}
          </p>
        </div>

        {editingSite && (
          <button
            onClick={() => setEditingSite(null)}
            className="p-2 text-gray-400 hover:text-white bg-dark-bg border border-dark-border rounded-xl"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Success Banner */}
      {successMessage && (
        <div className="bg-emerald-950/90 border border-emerald-600 text-emerald-200 text-sm p-4 rounded-2xl flex items-center gap-2">
          <Check className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="font-bold">{successMessage}</span>
        </div>
      )}

      {/* Form Container */}
      <form onSubmit={handleSubmit} className="bg-dark-card border border-gold/30 rounded-3xl p-6 space-y-4 shadow-xl">
        
        {/* Site Name & City */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">{t.siteName} *</label>
            <div className="relative">
              <Building2 className="w-4 h-4 text-gold absolute left-3 top-3.5" />
              <input
                type="text"
                required
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                placeholder={lang === 'ur' ? 'مثلاً: گلبرگ فلیٹس پلازہ' : 'e.g. Gulberg Commercial Plaza'}
                className="w-full bg-dark-bg border border-dark-border rounded-xl pl-9 pr-3 py-2.5 text-sm text-gray-100 focus:border-gold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">{t.city} *</label>
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
        </div>

        {/* Area & Work Type */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">{t.area} *</label>
            <input
              type="text"
              required
              value={area}
              onChange={(e) => setArea(e.target.value)}
              placeholder={lang === 'ur' ? 'مثلاً: بلاک B، فیز 5' : 'e.g. Phase 5, Main Boulevard'}
              className="w-full bg-dark-bg border border-dark-border rounded-xl px-3 py-2.5 text-sm text-gray-100 focus:border-gold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">{t.workType} *</label>
            <div className="relative">
              <HardHat className="w-4 h-4 text-gold absolute left-3 top-3.5" />
              <select
                value={workType}
                onChange={(e) => setWorkType(e.target.value)}
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
        </div>

        {/* Workers Needed, Daily Wage, Duration Days */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">{t.workersNeeded} *</label>
            <div className="relative">
              <Users className="w-4 h-4 text-gold absolute left-3 top-3.5" />
              <input
                type="number"
                min="1"
                max="50"
                required
                value={workersNeeded}
                onChange={(e) => setWorkersNeeded(e.target.value)}
                className="w-full bg-dark-bg border border-dark-border rounded-xl pl-9 pr-3 py-2.5 text-sm text-gray-100 focus:border-gold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">{t.dailyWage} *</label>
            <div className="relative">
              <Banknote className="w-4 h-4 text-gold absolute left-3 top-3.5" />
              <input
                type="number"
                min="500"
                step="100"
                required
                value={dailyWage}
                onChange={(e) => setDailyWage(e.target.value)}
                className="w-full bg-dark-bg border border-dark-border rounded-xl pl-9 pr-3 py-2.5 text-sm text-gray-100 focus:border-gold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">{t.durationDays} *</label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-gold absolute left-3 top-3.5" />
              <input
                type="number"
                min="1"
                max="365"
                required
                value={durationDays}
                onChange={(e) => setDurationDays(e.target.value)}
                className="w-full bg-dark-bg border border-dark-border rounded-xl pl-9 pr-3 py-2.5 text-sm text-gray-100 focus:border-gold"
              />
            </div>
          </div>
        </div>

        {/* Phone / WhatsApp & Note */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">{t.whatsappPhone} *</label>
            <div className="relative">
              <Phone className="w-4 h-4 text-gold absolute left-3 top-3.5" />
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
            <label className="block text-xs font-bold text-gray-300 mb-1">{t.noteOptional}</label>
            <div className="relative">
              <FileText className="w-4 h-4 text-gold absolute left-3 top-3.5" />
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder={lang === 'ur' ? 'مثلاً: لنٹر ڈالنے کا کام ہے' : 'e.g. Plaster work starting tomorrow'}
                className="w-full bg-dark-bg border border-dark-border rounded-xl pl-9 pr-3 py-2.5 text-sm text-gray-100 focus:border-gold"
              />
            </div>
          </div>
        </div>

        {/* Form Submit Button */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-gold-gradient hover:brightness-110 text-black font-bold py-3.5 px-4 rounded-xl text-base shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all active:scale-95 disabled:opacity-50"
        >
          {submitting ? t.loading : (editingSite ? t.edit : t.postButton)}
        </button>
      </form>

      {/* My Posted Sites List */}
      <div>
        <h3 className="text-xl font-bold text-gold mb-4 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-gold" />
          {t.mySitesTitle} ({mySites.length})
        </h3>

        {mySites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mySites.map((site) => (
              <SiteCard
                key={site.id}
                site={site}
                onMarkFilled={handleMarkFilled}
                onDelete={handleDelete}
                onEdit={(siteToEdit) => setEditingSite(siteToEdit)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-dark-card border border-dark-border rounded-2xl p-8 text-center text-gray-400">
            <p className="text-sm">{t.noMySites}</p>
          </div>
        )}
      </div>
    </div>
  );
}
