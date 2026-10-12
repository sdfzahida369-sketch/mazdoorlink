import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { 
  Phone, 
  MessageSquare, 
  MapPin, 
  Users, 
  Calendar, 
  Banknote, 
  HardHat, 
  CheckCircle, 
  Trash2, 
  Edit3, 
  Clock 
} from 'lucide-react';

export default function SiteCard({ 
  site, 
  onMarkFilled, 
  onDelete, 
  onEdit 
}) {
  const { t, lang } = useLanguage();
  const { currentUser, userProfile } = useAuth();

  const isOwner = currentUser && (
    site.contractorId === currentUser.uid || 
    userProfile?.role === 'contractor'
  );

  // Skill title localized
  const getSkillLabel = (skillKey) => {
    return t.skills[skillKey] || skillKey || t.skills.mazdoor;
  };

  // Format WhatsApp number cleanly for Pakistan (+92)
  const formatWhatsAppNumber = (phone) => {
    let clean = (phone || '').replace(/[^0-9]/g, '');
    if (clean.startsWith('0')) {
      clean = '92' + clean.slice(1);
    }
    if (!clean.startsWith('92') && clean.length === 10) {
      clean = '92' + clean;
    }
    return clean;
  };

  const whatsappMessage = lang === 'ur'
    ? `السلام علیکم! میں نے مزدور لنک ایپ پر آپ کی سائٹ "${site.siteName}" دیکھی ہے۔ کیا کام کے لیے مزدور کی ضرورت باقی ہے؟`
    : `Assalam-o-Alaikum! I saw your post for "${site.siteName}" on MazdoorLink. Are worker positions still open?`;

  const whatsappUrl = `https://wa.me/${formatWhatsAppNumber(site.phone)}?text=${encodeURIComponent(whatsappMessage)}`;
  const callUrl = `tel:${site.phone}`;

  return (
    <div 
      className={`relative bg-dark-card rounded-2xl p-5 border transition-all duration-300 shadow-md ${
        site.isFilled 
          ? 'border-gray-800 opacity-70' 
          : 'border-gold/30 hover:border-gold hover:shadow-[0_0_20px_rgba(212,175,55,0.2)]'
      }`}
    >
      {/* Top Banner: Status badge & City */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="flex items-center gap-1.5 bg-gold/15 text-gold border border-gold/40 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          <HardHat className="w-3.5 h-3.5" />
          {getSkillLabel(site.workType)}
        </span>

        {site.isFilled ? (
          <span className="bg-red-950/80 text-red-400 border border-red-800 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5" />
            {t.isFilled}
          </span>
        ) : (
          <span className="bg-emerald-950/80 text-emerald-400 border border-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 animate-pulse">
            ● Active Site
          </span>
        )}
      </div>

      {/* Site Name */}
      <h3 className="text-xl font-bold text-gray-100 mb-2 leading-snug">
        {site.siteName}
      </h3>

      {/* Location */}
      <div className="flex items-center gap-1.5 text-sm text-gray-300 mb-4">
        <MapPin className="w-4 h-4 text-gold shrink-0" />
        <span className="font-semibold">{site.city}</span>
        {site.area && <span className="text-gray-400">({site.area})</span>}
      </div>

      {/* Key Metric Pills: Daily Wage, Workers Needed, Days */}
      <div className="grid grid-cols-3 gap-2 bg-dark-bg p-3 rounded-xl border border-dark-border mb-4">
        <div className="flex flex-col items-center justify-center text-center">
          <span className="text-[11px] text-gray-400 flex items-center gap-1">
            <Banknote className="w-3 h-3 text-gold" />
            {t.dailyWage.split(' ')[0]}
          </span>
          <span className="text-base sm:text-lg font-extrabold text-gold">
            Rs. {Number(site.dailyWage).toLocaleString()}
          </span>
          <span className="text-[10px] text-gray-400">{t.perDay}</span>
        </div>

        <div className="flex flex-col items-center justify-center text-center border-x border-dark-border px-1">
          <span className="text-[11px] text-gray-400 flex items-center gap-1">
            <Users className="w-3 h-3 text-gold" />
            {t.neededUnit}
          </span>
          <span className="text-base sm:text-lg font-extrabold text-white">
            {site.workersNeeded}
          </span>
          <span className="text-[10px] text-gray-400">{t.roleMazdoor.split('/')[0]}</span>
        </div>

        <div className="flex flex-col items-center justify-center text-center">
          <span className="text-[11px] text-gray-400 flex items-center gap-1">
            <Calendar className="w-3 h-3 text-gold" />
            {t.durationDays.split(' ')[0]}
          </span>
          <span className="text-base sm:text-lg font-extrabold text-white">
            {site.durationDays}
          </span>
          <span className="text-[10px] text-gray-400">{t.daysUnit}</span>
        </div>
      </div>

      {/* Short Note if present */}
      {site.note && (
        <div className="bg-dark-border/40 p-3 rounded-xl text-xs text-gray-300 italic mb-4 border border-dark-border">
          "{site.note}"
        </div>
      )}

      {/* Posted Info */}
      <div className="flex items-center justify-between text-xs text-gray-400 mb-4 pb-2 border-b border-dark-border">
        <span>{t.postedBy}: <strong className="text-gray-200">{site.contractorName || 'Contractor'}</strong></span>
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3 text-gold" />
          {new Date(site.createdAt).toLocaleDateString()}
        </span>
      </div>

      {/* Action Buttons for Workers: Call & WhatsApp */}
      {!site.isFilled ? (
        <div className="grid grid-cols-2 gap-3">
          {/* Call Button */}
          <a
            href={callUrl}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold py-3 px-4 rounded-xl text-sm sm:text-base shadow-lg transition-all active:scale-95"
          >
            <Phone className="w-5 h-5 fill-current" />
            <span>{t.callNow}</span>
          </a>

          {/* WhatsApp Button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-500 hover:to-emerald-600 text-white font-bold py-3 px-4 rounded-xl text-sm sm:text-base shadow-lg transition-all active:scale-95"
          >
            <MessageSquare className="w-5 h-5 fill-current" />
            <span>{t.whatsappNow}</span>
          </a>
        </div>
      ) : (
        <div className="text-center py-2 bg-dark-bg rounded-xl border border-dark-border text-xs text-gray-400 font-semibold">
          {t.isFilled}
        </div>
      )}

      {/* Owner Management Bar (For Contractors) */}
      {isOwner && (
        <div className="mt-4 pt-3 border-t border-gold/20 flex items-center justify-between gap-2">
          {/* Mark as Filled Toggle */}
          <button
            onClick={() => onMarkFilled && onMarkFilled(site.id, !site.isFilled)}
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${
              site.isFilled 
                ? 'bg-emerald-950/60 border-emerald-700 text-emerald-400 hover:bg-emerald-900/60' 
                : 'bg-gold/20 border-gold/50 text-gold hover:bg-gold/30'
            }`}
          >
            <CheckCircle className="w-3.5 h-3.5" />
            <span>{site.isFilled ? 'Re-open Site' : t.markFilled}</span>
          </button>

          <div className="flex items-center gap-2">
            {/* Edit */}
            {onEdit && (
              <button
                onClick={() => onEdit(site)}
                className="p-1.5 text-gray-400 hover:text-gold bg-dark-bg hover:bg-dark-border rounded-lg border border-dark-border transition-all"
                title={t.edit}
              >
                <Edit3 className="w-4 h-4" />
              </button>
            )}

            {/* Delete */}
            {onDelete && (
              <button
                onClick={() => onDelete(site.id)}
                className="p-1.5 text-red-400 hover:text-red-300 bg-red-950/40 hover:bg-red-900/60 rounded-lg border border-red-800/60 transition-all"
                title={t.delete}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
