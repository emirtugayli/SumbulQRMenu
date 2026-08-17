import React from 'react';
import { MapPin, Navigation, Clock } from 'lucide-react';
import { CAFE_INFO } from '../data/menuData';

export const LocationSection: React.FC = () => {
  return (
    <section className="location-section" id="location">
      <div className="location-card">
        <h2 className="location-heading">Paşa’da Görüşmek Üzere</h2>

        <p className="location-address">
          <MapPin size={18} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px', color: '#6E3048' }} />
          {CAFE_INFO.fullLocation}
        </p>

        <p className="location-hours">
          <Clock size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />
          {CAFE_INFO.workingHours}
        </p>

        <a
          href={CAFE_INFO.mapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="directions-btn"
        >
          <Navigation size={20} />
          <span>Yol Tarifi Al (Google Maps)</span>
        </a>
      </div>
    </section>
  );
};
