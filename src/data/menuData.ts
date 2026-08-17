export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  popular?: boolean;
  /** Uzantısız görsel yolu (örn. '/images/products/cay'). Boşsa id'den türetilir. */
  image?: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  iconName: string;
  /** Uzantısız banner yolu. Boşsa id'den türetilir. */
  image?: string;
  items: MenuItem[];
}

export const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: 'gozleme',
    name: 'Gözleme',
    iconName: 'UtensilsCrossed',
    items: [
      {
        id: 'patatesli-gozleme',
        name: 'Patatesli Gözleme',
        description: 'Patates dolgulu sac gözleme.',
        price: 250
      },
      {
        id: 'beyaz-peynirli-gozleme',
        name: 'Beyaz Peynirli Gözleme',
        description: 'Beyaz peynir dolgulu sac gözleme.',
        price: 250
      },
      {
        id: 'kasarli-gozleme',
        name: 'Kaşarlı Gözleme',
        description: 'Kaşar peyniri dolgulu sac gözleme.',
        price: 250,
        popular: true
      },
      {
        id: 'sucuk-kasarli-gozleme',
        name: 'Sucuk Kaşarlı Gözleme',
        description: 'Sucuk ve kaşar peyniri dolgulu sac gözleme.',
        price: 270
      },
      {
        id: 'kavurma-kasarli-gozleme',
        name: 'Kavurma Kaşarlı Gözleme',
        description: 'Kavurma ve kaşar peyniri dolgulu sac gözleme.',
        price: 350,
        popular: true
      }
    ]
  },
  {
    id: 'kofte-ana-yemekler',
    name: 'Köfte & Ana Yemekler',
    iconName: 'Beef',
    items: [
      {
        id: 'kasap-kofte-yarim-ekmek',
        name: 'Kasap Köfte Yarım Ekmek',
        description: 'Izgara kasap köfte, yarım ekmek içerisinde servis edilir.',
        price: 250
      },
      {
        id: 'porsiyon-kasap-kofte',
        name: 'Porsiyon Kasap Köfte',
        description: 'Izgara kasap köfte; patates kızartması, salata ve pilav ile servis edilir.',
        price: 400,
        popular: true
      },
      {
        id: 'hamburger',
        name: 'Hamburger',
        description: 'Klasik hamburger.',
        price: 300
      },
      {
        id: 'tantuni',
        name: 'Tantuni',
        description: '',
        price: 250
      },
      {
        id: 'kori-soslu-makarna',
        name: 'Köri Soslu Makarna',
        description: '',
        price: 270
      },
      {
        id: 'kremali-makarna',
        name: 'Kremalı Makarna',
        description: '',
        price: 250
      },
      {
        id: 'kori-soslu-tavuklu-makarna',
        name: 'Köri Soslu Tavuklu Makarna',
        description: 'Tavuk ve köri sos ile hazırlanan makarna.',
        price: 300,
        popular: true
      },
      {
        id: 'kremali-mantarli-makarna',
        name: 'Kremalı Mantarlı Makarna',
        description: 'Krema ve mantar ile hazırlanan makarna.',
        price: 280
      },
      {
        id: 'manti',
        name: 'Mantı',
        description: '',
        price: 300
      }
    ]
  },
  {
    id: 'atistirmaliklar',
    name: 'Atıştırmalıklar',
    iconName: 'Cookie',
    items: [
      {
        id: 'patates-kizartmasi',
        name: 'Patates Kızartması',
        price: 150
      },
      {
        id: 'sigara-boregi',
        name: 'Sigara Böreği',
        price: 150
      }
    ]
  },
  {
    id: 'tostlar',
    name: 'Tost Çeşitleri',
    iconName: 'Sandwich',
    items: [
      {
        id: 'kasarli-tost',
        name: 'Kaşarlı Tost',
        description: 'Kaşar peynirli tost, patates kızartması ile servis edilir.',
        price: 170
      },
      {
        id: 'beyaz-peynirli-tost',
        name: 'Beyaz Peynirli Tost',
        description: 'Beyaz peynirli tost, patates kızartması ile servis edilir.',
        price: 170
      },
      {
        id: 'sucuklu-tost',
        name: 'Sucuklu Tost',
        description: 'Sucuklu tost, patates kızartması ile servis edilir.',
        price: 180
      },
      {
        id: 'kavurma-kasar-tost',
        name: 'Kavurma Kaşar Tost',
        description: 'Kavurma ve kaşar peynirli tost, patates kızartması ile servis edilir.',
        price: 280,
        popular: true
      },
      {
        id: 'sucuk-kasar-tost',
        name: 'Sucuk Kaşar Tost',
        description: 'Sucuk ve kaşar peynirli tost, patates kızartması ile servis edilir.',
        price: 200
      }
    ]
  },
  {
    id: 'kahvalti',
    name: 'Kahvaltı',
    iconName: 'Egg',
    items: [
      {
        id: 'serpme-kahvalti',
        name: 'Serpme Kahvaltı',
        description: 'Bal kaymak, tahin pekmez, reçel, acuka, siyah ve yeşil zeytin, peynir tabağı, domates, salatalık, sahanda yumurta, sucuk, menemen ve patates.',
        price: 900,
        popular: true
      },
      {
        id: 'menemen',
        name: 'Menemen',
        description: 'Domates, biber ve yumurta ile hazırlanan geleneksel menemen.',
        price: 250,
        popular: true
      },
      {
        id: 'kahvalti-tabagi',
        name: 'Kahvaltı Tabağı',
        price: 400
      },
      {
        id: 'sade-omlet',
        name: 'Sade Omlet',
        price: 125
      },
      {
        id: 'karisik-omlet',
        name: 'Karışık Omlet',
        price: 150
      }
    ]
  },
  {
    id: 'tatlilar',
    name: 'Tatlılar',
    iconName: 'Cake',
    items: [
      {
        id: 'frambuazli-cheesecake',
        name: 'Frambuazlı Cheesecake',
        price: 150
      },
      {
        id: 'limonlu-cheesecake',
        name: 'Limonlu Cheesecake',
        price: 150
      },
      {
        id: 'mozaik-pasta',
        name: 'Mozaik Pasta',
        price: 150
      },
      {
        id: 'tiramisu',
        name: 'Tiramisu',
        price: 150
      }
    ]
  },
  {
    id: 'soguk-icecekler',
    name: 'Soğuk İçecekler',
    iconName: 'CupSoda',
    items: [
      { id: 'su', name: 'Su', price: 20 },
      { id: 'sade-soda', name: 'Sade Soda', price: 40 },
      { id: 'meyveli-soda', name: 'Meyveli Soda', price: 50 },
      { id: 'sise-cola', name: 'Şişe Cola', price: 70 },
      { id: 'kutu-cola', name: 'Kutu Cola', price: 80 },
      { id: 'kutu-fanta', name: 'Kutu Fanta', price: 80 },
      { id: 'kutu-sprite', name: 'Kutu Sprite', price: 80 },
      { id: 'cappy-karisik', name: 'Cappy Karışık', price: 80 },
      { id: 'cappy-kayisi', name: 'Cappy Kayısı', price: 80 },
      { id: 'cappy-visne', name: 'Cappy Vişne', price: 80 },
      { id: 'cappy-seftali', name: 'Cappy Şeftali', price: 80 },
      { id: 'fuse-tea-seftali', name: 'Fuse Tea Şeftali', price: 80 },
      { id: 'fuse-tea-limon', name: 'Fuse Tea Limon', price: 80 },
      { id: 'fuse-tea-mango', name: 'Fuse Tea Mango', price: 80 },
      { id: 'fuse-tea-karpuz', name: 'Fuse Tea Karpuz', price: 80 },
      { id: 'ice-caramel-latte', name: 'Ice Caramel Latte', price: 160, popular: true },
      { id: 'ice-latte', name: 'Ice Latte', price: 150 },
      { id: 'ice-americano', name: 'Ice Americano', price: 140 },
      { id: 'nescafe-original', name: 'Nescafe Original', price: 120 },
      { id: 'red-bull', name: 'Red Bull', price: 125 }
    ]
  },
  {
    id: 'sicak-icecekler',
    name: 'Sıcak İçecekler',
    iconName: 'Coffee',
    items: [
      { id: 'cay', name: 'Çay', price: 30, popular: true },
      { id: 'fincan-cay', name: 'Fincan Çay', price: 50 },
      { id: 'turk-kahvesi', name: 'Türk Kahvesi', price: 90, popular: true },
      { id: 'oralet-cesitleri', name: 'Oralet Çeşitleri', price: 35 },
      { id: 'bitki-caylari', name: 'Bitki Çayları', price: 75 },
      { id: 'americano', name: 'Americano', price: 100 },
      { id: 'sutlu-kahve', name: 'Sütlü Kahve', price: 120 },
      { id: 'cappuccino', name: 'Cappuccino', price: 120 },
      { id: 'caffe-latte', name: 'Caffe Latte', price: 150 },
      { id: 'espresso', name: 'Espresso', price: 90 },
      { id: 'salep', name: 'Salep', price: 120 },
      { id: 'sicak-sut', name: 'Sıcak Süt', price: 80 },
      { id: 'karton-bardak-cay', name: 'Karton Bardak Çay', price: 40 },
      { id: 'sicak-cikolata', name: 'Sıcak Çikolata', price: 120 }
    ]
  }
];

/**
 * Görseller `scripts/generate-images.mjs` ile Gemini üzerinden üretilir ve
 * ürün/kategori id'siyle aynı isimde kaydedilir. Her görselin modern webp ve
 * geniş uyumluluk için jpg sürümü vardır.
 */
export interface ImageSources {
  webp: string;
  jpg: string;
}

const withExtensions = (basePath: string): ImageSources => ({
  webp: `${basePath}.webp`,
  jpg: `${basePath}.jpg`
});

export const getMenuItemImage = (item: MenuItem): ImageSources =>
  withExtensions(item.image || `/images/products/${item.id}`);

export const getCategoryImage = (category: MenuCategory): ImageSources =>
  withExtensions(category.image || `/images/categories/${category.id}`);

export const CAFE_INFO = {
  name: 'Sümbül Cafe',
  tagline: 'Mahallenizin Sıcak Buluşma Noktası',
  district: 'Fatih · Kocamustafapaşa',
  fullLocation: 'Kocamustafapaşa, Fatih / İstanbul',
  workingHours: 'Her Gün: 08:00 – 23:00',
  phone: '0 (212) 555 00 00', // Placeholder
  instagram: 'https://instagram.com/sumbulcafe',
  mapsLink: 'https://maps.google.com/?q=Kocamustafapasa+Fatih+Istanbul'
};


