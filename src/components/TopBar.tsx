import React from 'react';
import { ChevronLeft, Type } from 'lucide-react';

interface TopBarProps {
  title: string;
  backLabel: string;
  onBack: () => void;
  largeText: boolean;
  onToggleLargeText: () => void;
}

/**
 * Kategori ve ürün ekranlarındaki ince üst şerit.
 * Sadece iki işi var: geri dönmek ve yazı boyutunu değiştirmek.
 */
export const TopBar: React.FC<TopBarProps> = ({
  title,
  backLabel,
  onBack,
  largeText,
  onToggleLargeText
}) => (
  <div className="top-bar">
    <button className="top-bar-back" onClick={onBack} aria-label={backLabel}>
      <ChevronLeft size={24} />
      <span>{backLabel}</span>
    </button>

    <span className="top-bar-title">{title}</span>

    <button
      onClick={onToggleLargeText}
      className={`text-size-btn ${largeText ? 'active' : ''}`}
      aria-label="Yazı boyutunu değiştir"
    >
      <Type size={18} />
      <span>{largeText ? 'Normal' : 'A+'}</span>
    </button>
  </div>
);
