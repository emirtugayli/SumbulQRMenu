import React from 'react';
import { Type } from 'lucide-react';
import { CAFE_INFO } from '../data/menuData';

interface HeaderProps {
  largeText: boolean;
  onToggleLargeText: () => void;
}

export const Header: React.FC<HeaderProps> = ({ largeText, onToggleLargeText }) => {
  return (
    <header className="header">
      <a href="#hero" className="header-brand">
        <img
          src="/SumbulLogo.png"
          alt="Sümbül Cafe Logo"
          className="header-logo"
        />
        <div className="header-title-box">
          <span className="header-title">{CAFE_INFO.name}</span>
          <span className="header-subtitle">{CAFE_INFO.district}</span>
        </div>
      </a>

      <div className="header-actions">
        <button
          onClick={onToggleLargeText}
          className={`text-size-btn ${largeText ? 'active' : ''}`}
          title="Yazı Boyutunu Değiştir"
          aria-label="Yazı Boyutunu Değiştir"
        >
          <Type size={16} />
          <span>{largeText ? 'Normal' : 'A+ Büyük'}</span>
        </button>
      </div>
    </header>
  );
};
