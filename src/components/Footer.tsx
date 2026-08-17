import React from 'react';
import { CAFE_INFO } from '../data/menuData';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <img
        src="/SumbulLogo.png"
        alt="Sümbül Cafe Logo"
        className="footer-logo"
      />
      <h3 className="footer-title">{CAFE_INFO.name}</h3>
      <p className="footer-sub">{CAFE_INFO.district}</p>

      <div className="footer-links">
        <a href="#hero" className="footer-link">Başa Dön</a>
        <a href={CAFE_INFO.mapsLink} target="_blank" rel="noopener noreferrer" className="footer-link">Harita</a>
        <a href={CAFE_INFO.instagram} target="_blank" rel="noopener noreferrer" className="footer-link">Instagram</a>
      </div>

      <div className="footer-copy">
        © {new Date().getFullYear()} Sümbül Cafe — Fatih Kocamustafapaşa. Tüm hakları saklıdır.
      </div>
    </footer>
  );
};
