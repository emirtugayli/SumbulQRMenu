import React from 'react';
import { Search, X } from 'lucide-react';

interface MenuSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  resultsCount: number | null;
}

export const MenuSearch: React.FC<MenuSearchProps> = ({
  searchTerm,
  onSearchChange,
  resultsCount
}) => {
  return (
    <div className="search-container">
      <div className="search-input-wrapper">
        <Search className="search-icon-left" />
        <input
          type="text"
          className="search-input"
          placeholder="Menüde ara... (Örn: Çay, Tost, Gözleme)"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Menüde arama yapın"
        />
        {searchTerm && (
          <button
            className="search-clear-btn"
            onClick={() => onSearchChange('')}
            aria-label="Aramayı temizle"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {searchTerm.trim() !== '' && (
        <div className="search-results-info">
          {resultsCount !== null && resultsCount > 0
            ? `"${searchTerm}" için ${resultsCount} ürün bulundu`
            : `"${searchTerm}" için sonuç bulunamadı`}
        </div>
      )}
    </div>
  );
};
