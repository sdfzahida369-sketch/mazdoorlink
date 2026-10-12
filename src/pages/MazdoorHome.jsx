import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { fetchAllSites, updateSiteStatus, deleteSite } from '../services/siteService';
import SiteCard from '../components/SiteCard';
import { Search, Filter, HardHat, RefreshCw, AlertCircle, Building2, MapPin, Banknote } from 'lucide-react';

export default function MazdoorHome({ onEditSite }) {
  const { t, lang } = useLanguage();
  
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWorkType, setSelectedWorkType] = useState('all');
  const [minWage, setMinWage] = useState(0);

  const loadSites = async () => {
    setLoading(true);
    const data = await fetchAllSites();
    setSites(data);
    setLoading(false);
  };

  useEffect(() => {
    loadSites();
  }, []);

  const handleMarkFilled = async (siteId, isFilled) => {
    const updated = await updateSiteStatus(siteId, isFilled);
    setSites(updated);
  };

  const handleDelete = async (siteId) => {
    if (window.confirm(t.confirmDelete)) {
      const updated = await deleteSite(siteId);
      setSites(updated);
    }
  };

  // Filter logic
  const filteredSites = sites.filter((site) => {
    // Hide filled posts for workers by default
    if (site.isFilled) return false;

    // Search query matching city, area, or site name
    const matchesSearch = 
      !searchQuery || 
      (site.siteName && site.siteName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (site.city && site.city.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (site.area && site.area.toLowerCase().includes(searchQuery.toLowerCase()));

    // Work type filter
    const matchesWorkType = selectedWorkType === 'all' || site.workType === selectedWorkType;

    // Min wage filter
    const matchesWage = Number(site.dailyWage || 0) >= Number(minWage);

    return matchesSearch && matchesWorkType && matchesWage;
  });

  return (
    <div className="space-y-6 pb-20">
      {/* Top Banner & Search Section */}
      <div className="bg-dark-card border border-gold/30 rounded-3xl p-5 sm:p-6 shadow-[0_0_25px_rgba(0,0,0,0.8)] relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold gold-text-gradient flex items-center gap-2">
              <HardHat className="w-7 h-7 text-gold inline" />
              {t.availableSites}
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 mt-1">
              {lang === 'ur' 
                ? 'اپنے قریب جاری سائٹ پر روزانہ کی دیہاڑی تلاش کریں' 
                : 'Browse active construction sites and daily wage opportunities near you'}
            </p>
          </div>

          <button
            onClick={loadSites}
            className="p-2.5 bg-dark-bg hover:bg-dark-border border border-gold/40 text-gold rounded-xl transition-all"
            title="Refresh Sites"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Filter Controls Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* City / Area Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-gold absolute left-3 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full bg-dark-bg border border-dark-border rounded-xl pl-9 pr-3 py-2.5 text-sm text-gray-100 focus:border-gold"
            />
          </div>

          {/* Work Type Select */}
          <div className="relative">
            <Filter className="w-4 h-4 text-gold absolute left-3 top-3.5" />
            <select
              value={selectedWorkType}
              onChange={(e) => setSelectedWorkType(e.target.value)}
              className="w-full bg-dark-bg border border-dark-border rounded-xl pl-9 pr-3 py-2.5 text-sm text-gray-100 focus:border-gold"
            >
              <option value="all">{t.skills.all}</option>
              <option value="mistri">{t.skills.mistri}</option>
              <option value="mazdoor">{t.skills.mazdoor}</option>
              <option value="painter">{t.skills.painter}</option>
              <option value="electrician">{t.skills.electrician}</option>
              <option value="plumber">{t.skills.plumber}</option>
              <option value="carpenter">{t.skills.carpenter}</option>
            </select>
          </div>

          {/* Min Wage Select */}
          <div className="relative">
            <Banknote className="w-4 h-4 text-gold absolute left-3 top-3.5" />
            <select
              value={minWage}
              onChange={(e) => setMinWage(Number(e.target.value))}
              className="w-full bg-dark-bg border border-dark-border rounded-xl pl-9 pr-3 py-2.5 text-sm text-gray-100 focus:border-gold"
            >
              <option value={0}>{t.minWage}: All Wager Range</option>
              <option value={1800}>Min PKR 1,800 / day</option>
              <option value={2000}>Min PKR 2,000 / day</option>
              <option value={2500}>Min PKR 2,500 / day</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active Sites Count Indicator */}
      <div className="flex items-center justify-between text-xs font-semibold text-gray-400 px-1">
        <span>
          {lang === 'ur' ? 'دستیاب سائٹس:' : 'Active Sites Found:'} <strong className="text-gold text-sm ml-1">{filteredSites.length}</strong>
        </span>
        {minWage > 0 || selectedWorkType !== 'all' || searchQuery ? (
          <button 
            onClick={() => { setSearchQuery(''); setSelectedWorkType('all'); setMinWage(0); }}
            className="text-gold hover:underline text-[11px]"
          >
            {lang === 'ur' ? 'تمام فلٹر ختم کریں' : 'Reset Filters'}
          </button>
        ) : null}
      </div>

      {/* Feed List */}
      {loading ? (
        <div className="text-center py-16 text-gold">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-2" />
          <p className="text-sm font-semibold">{t.loading}</p>
        </div>
      ) : filteredSites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredSites.map((site) => (
            <SiteCard
              key={site.id}
              site={site}
              onMarkFilled={handleMarkFilled}
              onDelete={handleDelete}
              onEdit={onEditSite}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-dark-card border border-dark-border rounded-3xl p-10 text-center text-gray-400">
          <AlertCircle className="w-12 h-12 text-gold/60 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-gray-200 mb-1">{t.noSitesFound}</h3>
          <p className="text-xs text-gray-400 max-w-xs mx-auto">
            {lang === 'ur' 
              ? 'کسی اور شہر یا ہنر کا انتخاب کر کے دوبارہ کوشش کریں۔' 
              : 'Try clearing your search query or adjusting the work type filter.'}
          </p>
        </div>
      )}
    </div>
  );
}
