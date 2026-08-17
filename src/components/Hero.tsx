import React from 'react';
import { Clock, Type, UtensilsCrossed } from 'lucide-react';
import { CAFE_INFO, LOGO_IMAGE } from '../data/menuData';
import { MenuImage } from './MenuImage';

interface HeroProps {
  onContinue: () => void;
  largeText: boolean;
  onToggleLargeText: () => void;
}

/**
 * Açılış ekranı: büyük logo ve tek bir net eylem — "Menüye Devam Et".
 * Kafe adı logonun üzerinde okunduğu için ayrıca başlık yazılmıyor.
 */
export const Hero: React.FC<HeroProps> = ({ onContinue, largeText, onToggleLargeText }) => (
  <section id="hero" className="hero">
    <div className="hero-toolbar">
      <button
        onClick={onToggleLargeText}
        className={`text-size-btn ${largeText ? 'active' : ''}`}
        aria-label="Yazı boyutunu değiştir"
      >
        <Type size={18} />
        <span>{largeText ? 'Normal Yazı' : 'A+ Büyük Yazı'}</span>
      </button>
    </div>

    <MenuImage
      sources={LOGO_IMAGE}
      alt={`${CAFE_INFO.name} logosu`}
      className="hero-logo-large"
      eager
    />

    <div className="hero-badge">{CAFE_INFO.district}</div>
    <p className="hero-tagline">“{CAFE_INFO.tagline}”</p>

    <p className="hero-hours">
      <Clock size={18} />
      <span>{CAFE_INFO.workingHours}</span>
    </p>

    <button className="hero-cta" onClick={onContinue}>
      <UtensilsCrossed size={24} />
      <span>Menüye Devam Et</span>
    </button>
  </section>
);
