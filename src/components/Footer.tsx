import React from 'react';
import { CAFE_INFO, LOGO_IMAGE } from '../data/menuData';
import { MenuImage } from './MenuImage';

interface FooterProps {
  onGoHome: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onGoHome }) => {
  return (
    <footer className="footer">
      <MenuImage
        sources={LOGO_IMAGE}
        alt={`${CAFE_INFO.name} logosu`}
        className="footer-logo"
      />
      <h3 className="footer-title">{CAFE_INFO.name}</h3>
      <p className="footer-sub">{CAFE_INFO.district}</p>

      <div className="footer-links">
        <button type="button" onClick={onGoHome} className="footer-link">Başa Dön</button>
        <a href={CAFE_INFO.mapsLink} target="_blank" rel="noopener noreferrer" className="footer-link">Harita</a>
        <a href={CAFE_INFO.instagram} target="_blank" rel="noopener noreferrer" className="footer-link">Instagram</a>
      </div>

      <div className="footer-copy">
        © {new Date().getFullYear()} Sümbül Cafe — Fatih Kocamustafapaşa. Tüm hakları saklıdır.
      </div>
    </footer>
  );
};
