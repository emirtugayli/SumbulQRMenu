import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { QuickActions } from './components/QuickActions';
import { MenuSearch } from './components/MenuSearch';
import { CategoryNav } from './components/CategoryNav';
import { CategoryGrid } from './components/CategoryGrid';
import { MenuItemCard } from './components/MenuItemCard';
import { MenuImage } from './components/MenuImage';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { MENU_CATEGORIES, MenuItem, getCategoryImage } from './data/menuData';

export const App: React.FC = () => {
  const [largeText, setLargeText] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeCategoryId, setActiveCategoryId] = useState<string>(MENU_CATEGORIES[0].id);

  // Toggle large text accessibility mode
  const toggleLargeText = () => {
    setLargeText((prev) => !prev);
  };

  useEffect(() => {
    if (largeText) {
      document.body.classList.add('large-text-mode');
    } else {
      document.body.classList.remove('large-text-mode');
    }
  }, [largeText]);

  // Filter items based on search term
  const filteredCategories = useMemo(() => {
    if (!searchTerm.trim()) return MENU_CATEGORIES;

    const term = searchTerm.toLocaleLowerCase('tr-TR');
    return MENU_CATEGORIES.map((cat) => {
      const matchingItems = cat.items.filter(
        (item) =>
          item.name.toLocaleLowerCase('tr-TR').includes(term) ||
          (item.description && item.description.toLocaleLowerCase('tr-TR').includes(term))
      );
      return {
        ...cat,
        items: matchingItems
      };
    }).filter((cat) => cat.items.length > 0);
  }, [searchTerm]);

  const totalResultsCount = useMemo(() => {
    if (!searchTerm.trim()) return null;
    return filteredCategories.reduce((acc, cat) => acc + cat.items.length, 0);
  }, [searchTerm, filteredCategories]);

  /**
   * Üstte sabit duran katmanların (başlık + arama + kategori çubuğu) gerçek
   * yüksekliğini ölçüp CSS değişkenlerine yazar. Yazı boyutu büyütüldüğünde
   * katmanlar büyüdüğü için sabit px değerleri yetmiyor.
   */
  useEffect(() => {
    const measureStickyLayers = () => {
      const header = document.querySelector<HTMLElement>('.header');
      const search = document.querySelector<HTMLElement>('.search-container');
      const nav = document.querySelector<HTMLElement>('.category-nav-wrapper');

      const headerHeight = header?.offsetHeight ?? 0;
      const searchHeight = search?.offsetHeight ?? 0;
      const navHeight = nav?.offsetHeight ?? 0;

      const style = document.documentElement.style;
      style.setProperty('--sticky-search-top', `${headerHeight}px`);
      style.setProperty('--sticky-nav-top', `${headerHeight + searchHeight}px`);
      style.setProperty('--sticky-total', `${headerHeight + searchHeight + navHeight}px`);
    };

    measureStickyLayers();

    const observer = new ResizeObserver(measureStickyLayers);
    document
      .querySelectorAll('.header, .search-container, .category-nav-wrapper')
      .forEach((el) => observer.observe(el));
    window.addEventListener('resize', measureStickyLayers);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measureStickyLayers);
    };
  }, [largeText, searchTerm]);

  // Handle category selection (smooth scroll into category section)
  const handleSelectCategory = (categoryId: string) => {
    setActiveCategoryId(categoryId);
    const element = document.getElementById(categoryId);
    if (element) {
      const stickyTotal = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue('--sticky-total')
      ) || 205;
      const y = element.getBoundingClientRect().top + window.pageYOffset - (stickyTotal + 14);
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Observe active category on scroll
  useEffect(() => {
    if (searchTerm.trim()) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveCategoryId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0.1
      }
    );

    MENU_CATEGORIES.forEach((cat) => {
      const el = document.getElementById(cat.id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [searchTerm]);

  return (
    <div className="app-container">
      <Header largeText={largeText} onToggleLargeText={toggleLargeText} />

      <main id="menu-content">
        <Hero />
        <QuickActions />

        <MenuSearch
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          resultsCount={totalResultsCount}
        />

        {!searchTerm.trim() && (
          <>
            {/* Visual Category Tile Grid (Reference Image 1) */}
            <CategoryGrid
              categories={MENU_CATEGORIES}
              onSelectCategory={handleSelectCategory}
            />

            {/* Sticky Horizontal Category Nav Bar */}
            <CategoryNav
              categories={MENU_CATEGORIES}
              activeCategoryId={activeCategoryId}
              onSelectCategory={handleSelectCategory}
            />
          </>
        )}

        {/* Product Items List (Reference Image 2) */}
        <div className="menu-container">
          {filteredCategories.length === 0 ? (
            <div className="empty-search">
              <h3 className="empty-search-title">Aradığınız Ürün Bulunamadı</h3>
              <p className="empty-search-text">
                Lütfen arama kelimenizi kontrol edin veya kategorilerden seçim yapın.
              </p>
            </div>
          ) : (
            filteredCategories.map((category) => (
              <section
                key={category.id}
                id={category.id}
                className="menu-section"
              >
                <div className="category-header-card">
                  <MenuImage
                    sources={getCategoryImage(category)}
                    alt={category.name}
                    className="category-header-image"
                  />
                  <div className="category-header-text">
                    <h2 className="category-title">
                      <span>✦</span>
                      <span>{category.name}</span>
                      <span>✦</span>
                    </h2>
                  </div>
                </div>

                <div className="menu-items-grid">
                  {category.items.map((item: MenuItem) => (
                    <MenuItemCard key={item.id} item={item} />
                  ))}
                </div>
              </section>
            ))
          )}
        </div>

        <LocationSection />
      </main>

      <Footer />
    </div>
  );
};

export default App;
