import React from 'react';
import { MenuItem, getMenuItemImage } from '../data/menuData';
import { MenuImage } from './MenuImage';

interface MenuItemCardProps {
  item: MenuItem;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({ item }) => {
  const image = getMenuItemImage(item);

  return (
    <div className="product-item-card">
      <div className="product-item-image-wrapper">
        <MenuImage sources={image} alt={item.name} className="product-item-image" />
      </div>

      <div className="product-item-details">
        <div className="product-item-header">
          <h3 className="product-item-name">{item.name}</h3>
          {item.popular && <span className="product-popular-badge">Popüler</span>}
        </div>

        {item.description ? (
          <p className="product-item-desc">{item.description}</p>
        ) : null}

        <div className="product-item-price">
          {item.price} TL
        </div>
      </div>
    </div>
  );
};
