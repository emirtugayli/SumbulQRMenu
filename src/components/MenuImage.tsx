import React from 'react';
import { ImageSources } from '../data/menuData';

interface MenuImageProps {
  sources: ImageSources;
  alt: string;
  className?: string;
  /** Ekranın üstünde görünen görseller için lazy yükleme kapatılır. */
  eager?: boolean;
}

/**
 * Menü görselleri için <picture> sarmalayıcı.
 * Modern tarayıcılar webp'i, eski cihazlar jpg'yi alır.
 */
export const MenuImage: React.FC<MenuImageProps> = ({ sources, alt, className, eager = false }) => (
  <picture>
    <source srcSet={sources.webp} type="image/webp" />
    <img
      src={sources.jpg}
      alt={alt}
      className={className}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
    />
  </picture>
);
