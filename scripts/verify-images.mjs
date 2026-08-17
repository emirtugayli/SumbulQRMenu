/**
 * Sümbül Cafe — görsel bütünlük kontrolü
 *
 * Kullanım: node scripts/verify-images.mjs
 *
 * Kontrol ettiği şeyler:
 *  - Menüdeki her ürün ve kategori için webp + jpg dosyası var mı
 *  - Ölçüler ve dosya boyutları beklenen aralıkta mı
 *  - Menüde karşılığı olmayan artık (orphan) görsel var mı
 *  - Kenarları tek renk olan kareler (stüdyo/çerçeve hatası) var mı
 */

import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');

const EXPECTED = {
  products: { dir: 'public/images/products', width: 640, height: 640 },
  categories: { dir: 'public/images/categories', width: 1200, height: 800 }
};

const MIN_KB = 8;

/** menuData.ts içindeki id'leri okur (TS derlemeye gerek kalmadan). */
const readMenuIds = () => {
  const src = fs.readFileSync(path.join(ROOT, 'src', 'data', 'menuData.ts'), 'utf8');
  const menuBody = src.slice(src.indexOf('MENU_CATEGORIES'), src.indexOf('export interface ImageSources'));

  const categories = [];
  const products = [];

  for (const line of menuBody.split(/\r?\n/)) {
    const match = line.match(/id: '([^']+)'/);
    if (!match) continue;
    // Kategori id'leri 4 boşluk girintili, ürün id'leri daha derin.
    const indent = line.match(/^\s*/)[0].length;
    if (indent <= 4) categories.push(match[1]);
    else products.push(match[1]);
  }

  return { categories, products };
};

/** Kenar bandı tek renk mi? (çerçeveli/stüdyo çıkan kareleri yakalar) */
const borderLooksFlat = async (file) => {
  const meta = await sharp(file).metadata();
  const band = Math.max(4, Math.round(meta.width * 0.02));
  const strip = await sharp(file)
    .extract({ left: 0, top: 0, width: meta.width, height: band })
    .stats();
  const deviation = strip.channels.reduce((acc, c) => acc + c.stdev, 0) / strip.channels.length;
  const brightness = strip.channels.reduce((acc, c) => acc + c.mean, 0) / strip.channels.length;
  return deviation < 4 && brightness > 200;
};

const problems = [];
const notes = [];

const { categories, products } = readMenuIds();
const expectedIds = { products, categories };

for (const [kind, config] of Object.entries(EXPECTED)) {
  const dir = path.join(ROOT, config.dir);
  const ids = expectedIds[kind];

  if (!fs.existsSync(dir)) {
    problems.push(`${config.dir} klasörü yok`);
    continue;
  }

  for (const id of ids) {
    for (const ext of ['webp', 'jpg']) {
      const file = path.join(dir, `${id}.${ext}`);
      if (!fs.existsSync(file)) {
        problems.push(`eksik: ${config.dir}/${id}.${ext}`);
        continue;
      }

      const kb = fs.statSync(file).size / 1024;
      if (kb < MIN_KB) problems.push(`çok küçük (${kb.toFixed(0)}KB): ${id}.${ext}`);

      if (ext === 'webp') {
        const meta = await sharp(file).metadata();
        if (meta.width !== config.width || meta.height !== config.height) {
          problems.push(`ölçü hatalı (${meta.width}x${meta.height}): ${id}.webp`);
        }
        if (await borderLooksFlat(file)) {
          notes.push(`kenarları tek renk, gözle kontrol edin: ${id}`);
        }
      }
    }
  }

  const known = new Set(ids.flatMap((id) => [`${id}.webp`, `${id}.jpg`]));
  for (const file of fs.readdirSync(dir)) {
    if (!known.has(file)) notes.push(`menüde karşılığı yok (artık dosya): ${config.dir}/${file}`);
  }
}

console.log(`Menü: ${categories.length} kategori, ${products.length} ürün`);
console.log(`Beklenen dosya sayısı: ${(categories.length + products.length) * 2}`);

if (notes.length) {
  console.log(`\nUyarılar (${notes.length}):`);
  notes.forEach((n) => console.log(`  • ${n}`));
}

if (problems.length) {
  console.log(`\nHatalar (${problems.length}):`);
  problems.forEach((p) => console.log(`  ✗ ${p}`));
  process.exitCode = 1;
} else {
  console.log('\n✓ Tüm görseller yerinde ve ölçüleri doğru.');
}
