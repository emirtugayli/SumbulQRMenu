import React, { useState, useEffect, useMemo } from 'react';
import { ChevronLeft } from 'lucide-react';
import { Hero } from './components/Hero';
import { TopBar } from './components/TopBar';
import { QuickActions } from './components/QuickActions';
import { MenuSearch } from './components/MenuSearch';
import { CategoryGrid } from './components/CategoryGrid';
import { MenuItemCard } from './components/MenuItemCard';
import { MenuImage } from './components/MenuImage';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { MENU_CATEGORIES, MenuItem, getCategoryImage } from './data/menuData';

/**
 * Müşteri akışı üç ekrandan oluşur:
 *   home       → büyük logo + "Menüye Devam Et"
 *   categories → kategori kartları (ve arama)
 *   category   → seçilen kategorinin ürünleri
 */
type View = 'home' | 'categories' | 'category';

export const App: React.FC = () => {
  const [largeText, setLargeText] = useState<boolean>(false);
  const [view, setView] = useState<View>('home');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);

  const toggleLargeText = () => setLargeText((prev) => !prev);

  useEffect(() => {
    document.body.classList.toggle('large-text-mode', largeText);
  }, [largeText]);

  // Ekran değiştiğinde müşteri her zaman sayfanın başından başlasın.
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [view, activeCategoryId]);

  /**
   * Üstte sabit duran şeridin ve arama alanının gerçek yüksekliğini ölçüp CSS
   * değişkenlerine yazar; büyük yazı modunda katmanlar üst üste binmesin.
   */
  useEffect(() => {
    const measureStickyLayers = () => {
      const topBar = document.querySelector<HTMLElement>('.top-bar');
      const search = document.querySelector<HTMLElement>('.search-container');

      const topBarHeight = topBar?.offsetHeight ?? 0;
      const searchHeight = search?.offsetHeight ?? 0;

      const style = document.documentElement.style;
      style.setProperty('--sticky-search-top', `${topBarHeight}px`);
      style.setProperty('--sticky-total', `${topBarHeight + searchHeight}px`);
    };

    measureStickyLayers();

    const observer = new ResizeObserver(measureStickyLayers);
    document
      .querySelectorAll('.top-bar, .search-container')
      .forEach((el) => observer.observe(el));
    window.addEventListener('resize', measureStickyLayers);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measureStickyLayers);
    };
  }, [largeText, view, searchTerm]);

  // Arama sonuçları: eşleşen ürünler kategori kategori gruplanır.
  const searchResults = useMemo(() => {
    const term = searchTerm.trim().toLocaleLowerCase('tr-TR');
    if (!term) return [];

    return MENU_CATEGORIES.map((category) => ({
      ...category,
      items: category.items.filter(
        (item) =>
          item.name.toLocaleLowerCase('tr-TR').includes(term) ||
          (item.description && item.description.toLocaleLowerCase('tr-TR').includes(term))
      )
    })).filter((category) => category.items.length > 0);
  }, [searchTerm]);

  const resultsCount = useMemo(() => {
    if (!searchTerm.trim()) return null;
    return searchResults.reduce((total, category) => total + category.items.length, 0);
  }, [searchTerm, searchResults]);

  const activeCategory = useMemo(
    () => MENU_CATEGORIES.find((category) => category.id === activeCategoryId) ?? null,
    [activeCategoryId]
  );

  const goHome = () => {
    setSearchTerm('');
    setActiveCategoryId(null);
    setView('home');
  };

  const openCategories = () => {
    setSearchTerm('');
    setActiveCategoryId(null);
    setView('categories');
  };

  const openCategory = (categoryId: string) => {
    setActiveCategoryId(categoryId);
    setView('category');
  };

  /* ------------------------------------------------------------ açılış ekranı */

  if (view === 'home') {
    return (
      <div className="app-container">
        <main>
          <Hero
            onContinue={openCategories}
            largeText={largeText}
            onToggleLargeText={toggleLargeText}
          />
          <QuickActions onOpenMenu={openCategories} />
          <LocationSection />
        </main>
        <Footer onGoHome={goHome} />
      </div>
    );
  }

  /* ------------------------------------------------------- kategori listesi */

  if (view === 'categories') {
    const isSearching = searchTerm.trim() !== '';

    return (
      <div className="app-container">
        <TopBar
          title="Menü"
          backLabel="Başa Dön"
          onBack={goHome}
          largeText={largeText}
          onToggleLargeText={toggleLargeText}
        />

        <main>
          <MenuSearch
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            resultsCount={resultsCount}
          />

          {!isSearching ? (
            <CategoryGrid categories={MENU_CATEGORIES} onSelectCategory={openCategory} />
          ) : (
            <div className="menu-container">
              {searchResults.length === 0 ? (
                <div className="empty-search">
                  <h3 className="empty-search-title">Aradığınız Ürün Bulunamadı</h3>
                  <p className="empty-search-text">
                    Lütfen arama kelimenizi kontrol edin veya kategorilerden seçim yapın.
                  </p>
                </div>
              ) : (
                searchResults.map((category) => (
                  <section key={category.id} className="menu-section">
                    <button
                      className="search-group-heading"
                      onClick={() => openCategory(category.id)}
                    >
                      {category.name}
                    </button>

                    <div className="menu-items-grid">
                      {category.items.map((item: MenuItem) => (
                        <MenuItemCard key={item.id} item={item} />
                      ))}
                    </div>
                  </section>
                ))
              )}
            </div>
          )}
        </main>

        <Footer onGoHome={goHome} />
      </div>
    );
  }

  /* --------------------------------------------------------- tek kategori */

  return (
    <div className="app-container">
      <TopBar
        title={activeCategory?.name ?? 'Menü'}
        backLabel="Kategoriler"
        onBack={openCategories}
        largeText={largeText}
        onToggleLargeText={toggleLargeText}
      />

      <main>
        {activeCategory && (
          <div className="menu-container">
            <section id={activeCategory.id} className="menu-section">
              <div className="category-header-card">
                <MenuImage
                  sources={getCategoryImage(activeCategory)}
                  alt={activeCategory.name}
                  className="category-header-image"
                  eager
                />
                <div className="category-header-text">
                  <h2 className="category-title">
                    <span>✦</span>
                    <span>{activeCategory.name}</span>
                    <span>✦</span>
                  </h2>
                </div>
              </div>

              <div className="menu-items-grid">
                {activeCategory.items.map((item: MenuItem) => (
                  <MenuItemCard key={item.id} item={item} />
                ))}
              </div>
            </section>

            <button className="back-to-categories" onClick={openCategories}>
              <ChevronLeft size={22} />
              <span>Diğer Kategoriler</span>
            </button>
          </div>
        )}
      </main>

      <Footer onGoHome={goHome} />
    </div>
  );
};

export default App;
