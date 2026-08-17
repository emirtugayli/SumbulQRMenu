import React from 'react';
import { CAFE_INFO } from '../data/menuData';

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="hero">
      <img
        src="/SumbulLogo.png"
        alt="Sümbül Cafe Logo"
        className="hero-logo-large"
      />
      <h1 className="hero-title">{CAFE_INFO.name}</h1>
      <div className="hero-badge">Fatih · Kocamustafapaşa</div>
      <p className="hero-tagline">“Mahallenizin sıcak buluşma noktası.”</p>
    </section>
  );
};
