import React from 'react';
import { MenuCategory, getCategoryImage } from '../data/menuData';
import { MenuImage } from './MenuImage';

interface CategoryGridProps {
  categories: MenuCategory[];
  onSelectCategory: (categoryId: string) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  categories,
  onSelectCategory
}) => {
  return (
    <div className="category-grid-section">
      <h2 className="category-grid-heading">Kategoriler</h2>
      <div className="category-grid">
        {categories.map((cat, index) => (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className="category-grid-card"
            aria-label={`${cat.name} kategorisini aç`}
          >
            <MenuImage
              sources={getCategoryImage(cat)}
              alt={cat.name}
              className="category-grid-img"
              eager={index < 2}
            />
            <div className="category-grid-overlay">
              <span className="category-grid-title">{cat.name}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
