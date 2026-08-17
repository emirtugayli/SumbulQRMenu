import React from 'react';
import { BookOpen, MapPin, Phone, Instagram } from 'lucide-react';
import { CAFE_INFO } from '../data/menuData';

export const QuickActions: React.FC = () => {
  const scrollToMenu = () => {
    const el = document.getElementById('menu-content');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="quick-actions">
      <button onClick={scrollToMenu} className="quick-action-btn" aria-label="Menüye Git">
        <BookOpen />
        <span>Menü</span>
      </button>

      <a
        href={CAFE_INFO.mapsLink}
        target="_blank"
        rel="noopener noreferrer"
        className="quick-action-btn"
        aria-label="Yol Tarifi Al"
      >
        <MapPin />
        <span>Yol Tarifi</span>
      </a>

      <a href={`tel:${CAFE_INFO.phone}`} className="quick-action-btn" aria-label="Kafeyi Ara">
        <Phone />
        <span>Ara</span>
      </a>

      <a
        href={CAFE_INFO.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="quick-action-btn"
        aria-label="Instagram Profili"
      >
        <Instagram />
        <span>Instagram</span>
      </a>
    </div>
  );
};
