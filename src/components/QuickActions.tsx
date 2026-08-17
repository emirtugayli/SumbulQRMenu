import React from 'react';
import { BookOpen, MapPin, Phone, Instagram } from 'lucide-react';
import { CAFE_INFO } from '../data/menuData';

interface QuickActionsProps {
  onOpenMenu: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ onOpenMenu }) => {
  return (
    <div className="quick-actions">
      <button onClick={onOpenMenu} className="quick-action-btn" aria-label="Menüyü Aç">
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
