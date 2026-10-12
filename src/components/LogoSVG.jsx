import React from 'react';

export default function LogoSVG({ size = 64, animated = false, className = '' }) {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {/* Background Soft Glow */}
      <div 
        className="absolute inset-0 rounded-full bg-gold/20 blur-xl animate-pulse-glow"
        style={{ width: size, height: size }}
      />
      
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 120 120" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 drop-shadow-[0_0_12px_rgba(212,175,55,0.4)]"
      >
        <defs>
          <linearGradient id="goldGradientMain" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF2B2" />
            <stop offset="45%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#AA820A" />
          </linearGradient>
          
          <linearGradient id="goldGlowGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#AA820A" />
            <stop offset="50%" stopColor="#F3E5AB" />
            <stop offset="100%" stopColor="#D4AF37" />
          </linearGradient>

          <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Decorative Gold Circle Frame */}
        <circle 
          cx="60" 
          cy="60" 
          r="54" 
          stroke="url(#goldGradientMain)" 
          strokeWidth="2.5" 
          strokeDasharray="339"
          strokeDashoffset={animated ? "0" : "0"}
          className={animated ? "animate-stroke-draw opacity-60" : "opacity-60"}
        />

        {/* Building / Structure Silhouette behind Hardhat */}
        <path 
          d="M38 60V38H48V60M55 60V30H65V60M72 60V42H82V60" 
          stroke="url(#goldGradientMain)" 
          strokeWidth="2" 
          strokeLinecap="round"
          className="opacity-40"
        />

        {/* Construction Hard-Hat Dome */}
        <path 
          d="M60 22C42 22 27 36 27 54H93C93 36 78 22 60 22Z" 
          fill="url(#goldGradientMain)" 
          stroke="#F3E5AB" 
          strokeWidth="1.5"
          filter="url(#goldGlow)"
        />
        {/* Hard-Hat Brim */}
        <rect 
          x="22" 
          y="54" 
          width="76" 
          height="7" 
          rx="3.5" 
          fill="url(#goldGlowGrad)" 
          stroke="#D4AF37"
          strokeWidth="1"
        />
        {/* Center Ridge on Helmet */}
        <rect 
          x="57" 
          y="22" 
          width="6" 
          height="14" 
          rx="3" 
          fill="#FFF2B2" 
        />

        {/* Two Joined Hands / Arch of Trust */}
        <path 
          d="M35 78C42 70 52 68 60 72C68 68 78 70 85 78" 
          stroke="url(#goldGradientMain)" 
          strokeWidth="4.5" 
          strokeLinecap="round"
        />
        {/* Handshake Clasp Center */}
        <path 
          d="M50 86L60 94L70 86" 
          stroke="#FFF2B2" 
          strokeWidth="4" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
        {/* Bottom Base Support Line */}
        <path 
          d="M32 98H88" 
          stroke="url(#goldGradientMain)" 
          strokeWidth="2.5" 
          strokeLinecap="round"
          className="opacity-80"
        />
      </svg>
    </div>
  );
}
