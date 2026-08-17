import React from 'react';
import {
  UtensilsCrossed,
  Beef,
  Cookie,
  Sandwich,
  Egg,
  Cake,
  CupSoda,
  Coffee
} from 'lucide-react';
import { MenuCategory } from '../data/menuData';

interface CategoryNavProps {
  categories: MenuCategory[];
  activeCategoryId: string;
  onSelectCategory: (categoryId: string) => void;
}

const getCategoryIcon = (iconName: string) => {
  switch (iconName) {
    case 'UtensilsCrossed':
      return <UtensilsCrossed size={18} />;
    case 'Beef':
      return <Beef size={18} />;
    case 'Cookie':
      return <Cookie size={18} />;
    case 'Sandwich':
      return <Sandwich size={18} />;
    case 'Egg':
      return <Egg size={18} />;
    case 'Cake':
      return <Cake size={18} />;
    case 'CupSoda':
      return <CupSoda size={18} />;
    case 'Coffee':
      return <Coffee size={18} />;
    default:
      return <UtensilsCrossed size={18} />;
  }
};

export const CategoryNav: React.FC<CategoryNavProps> = ({
  categories,
  activeCategoryId,
  onSelectCategory
}) => {
  return (
    <div className="category-nav-wrapper">
      <nav className="category-nav" aria-label="Menü Kategorileri">
        {categories.map((cat) => {
          const isActive = cat.id === activeCategoryId;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`category-tab ${isActive ? 'active' : ''}`}
              aria-current={isActive ? 'true' : 'false'}
            >
              {getCategoryIcon(cat.iconName)}
              <span>{cat.name}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
