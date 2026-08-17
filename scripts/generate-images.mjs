/**
 * Sümbül Cafe — Gemini ile ürün görseli üretici
 *
 * Kullanım:
 *   node scripts/generate-images.mjs                     # eksik olan tüm görselleri üret
 *   node scripts/generate-images.mjs --force             # var olanları da yeniden üret
 *   node scripts/generate-images.mjs --only=cay,espresso # sadece belirli id'ler
 *   node scripts/generate-images.mjs --products          # sadece ürünler
 *   node scripts/generate-images.mjs --categories        # sadece kategori banner'ları
 *   node scripts/generate-images.mjs --model=gemini-3-pro-image
 *   node scripts/generate-images.mjs --concurrency=4
 *   node scripts/generate-images.mjs --list              # üretmeden listele
 *
 * API anahtarı .env içindeki GEMINI_API_KEY'den okunur.
 * Referans fotoğraf (kafenin gerçek masası) her isteğe girdi olarak eklenir:
 *   BosMasa.jpeg  →  masanın malzemesi/rengi ve mekân için; açı KOPYALANMAZ.
 */

import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import {
  SCENE,
  CAMERA,
  CAMERA_BRANDED,
  CAMERA_BANNER,
  ANGLES,
  PRODUCT_PROMPTS,
  CATEGORY_PROMPTS
} from './imagePrompts.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');

/* ------------------------------------------------------------------ ayarlar */

const MODEL = 'gemini-3.1-flash-image';
const FALLBACK_MODEL = 'gemini-3-pro-image';
const MAX_ATTEMPTS = 3;

/** Kafenin gerçek masası — sahne referansı olarak her isteğe eklenir. */
const REFERENCE_CANDIDATES = ['BosMasa.jpeg', 'BosMasa.jpg', 'BosMasa.png'];

const TARGETS = {
  product: {
    dir: path.join(ROOT, 'public', 'images', 'products'),
    aspectRatio: '1:1',
    resize: { width: 640, height: 640 },
    camera: CAMERA
  },
  category: {
    dir: path.join(ROOT, 'public', 'images', 'categories'),
    aspectRatio: '3:2',
    resize: { width: 1200, height: 800 },
    camera: CAMERA_BANNER
  }
};

const RAW_DIR = path.join(ROOT, 'scripts', '.raw');
const WEBP_QUALITY = 78;
const JPEG_QUALITY = 82;

/* -------------------------------------------------------------------- setup */

const argv = process.argv.slice(2);
const hasFlag = (name) => argv.includes(`--${name}`);
const getFlag = (name, fallback) => {
  const hit = argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.slice(name.length + 3) : fallback;
};

const FORCE = hasFlag('force');
const LIST_ONLY = hasFlag('list');
const DRY_RUN = hasFlag('dry-run');
const ONLY = (getFlag('only', '') || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);
const CONCURRENCY = Number(getFlag('concurrency', '5'));
const MODEL_OVERRIDE = getFlag('model', '');

const readApiKey = () => {
  if (process.env.GEMINI_API_KEY) return process.env.GEMINI_API_KEY.trim();
  const envPath = path.join(ROOT, '.env');
  if (!fs.existsSync(envPath)) return '';
  const line = fs
    .readFileSync(envPath, 'utf8')
    .split(/\r?\n/)
    .find((l) => l.trim().startsWith('GEMINI_API_KEY='));
  return line ? line.split('=').slice(1).join('=').trim().replace(/^["']|["']$/g, '') : '';
};

const API_KEY = readApiKey();
if (!API_KEY && !LIST_ONLY) {
  console.error('HATA: GEMINI_API_KEY bulunamadı (.env dosyasına ekleyin).');
  process.exit(1);
}

/* ---------------------------------------------------------------- referans */

/**
 * Referans fotoğrafı küçültüp base64'e çevirir (girdi maliyetini düşürmek için).
 * Bulunamazsa null döner; üretim yalnızca metin tarifiyle devam eder.
 */
const loadReference = async () => {
  const file = REFERENCE_CANDIDATES.map((f) => path.join(ROOT, f)).find((p) => fs.existsSync(p));
  if (!file) return null;
  const buf = await sharp(file)
    .rotate()
    .resize({ width: 900, height: 900, fit: 'inside' })
    .jpeg({ quality: 82 })
    .toBuffer();
  return {
    name: path.basename(file),
    part: { inlineData: { mimeType: 'image/jpeg', data: buf.toString('base64') } }
  };
};

/* ------------------------------------------------------------------ prompt */

/** id'den deterministik açı seçer — aynı ürün her çalıştırmada aynı açıyı alır. */
const angleFor = (id) => {
  let h = 0;
  for (let i = 0; i < id.length; i += 1) h = (h * 31 + id.charCodeAt(i)) % 100000;
  return ANGLES[h % ANGLES.length];
};

const buildPrompt = (entry, kind, withReference) => {
  // Markalı içeceklerde logo/yazı yasağı olmayan kamera tarifi kullanılır.
  const camera = entry.camera || (entry.branded ? CAMERA_BRANDED : TARGETS[kind].camera);
  const parts = [];

  if (withReference) {
    parts.push(
      `The attached photograph shows the real table of this cafe. Use it ONLY as a material and setting reference: reproduce that same cream-ivory travertine-look square stone tabletop with its thick layered pale edge, the same honey bamboo-look woven-cane bistro chairs and the same sunny park terrace surroundings. Do NOT copy the reference photo's camera angle, framing or crop, and do not include the ashtray, the table-number card or any clutter from it. Create a brand-new photograph.`
    );
  }

  parts.push(`SUBJECT: ${entry.subject}`);
  parts.push(`SETTING: ${SCENE}`);
  parts.push(`CAMERA: ${camera}`);
  if (!entry.camera) parts.push(`ANGLE: ${angleFor(entry.id)}`);

  return parts.join('\n\n');
};

/* --------------------------------------------------------------------- API */

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const callGemini = async (model, prompt, referencePart, aspectRatio) => {
  const parts = referencePart ? [referencePart, { text: prompt }] : [{ text: prompt }];
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts }],
        generationConfig: {
          responseModalities: ['Image'],
          imageConfig: { aspectRatio }
        }
      })
    }
  );

  const json = await res.json().catch(() => ({}));

  if (!res.ok) {
    const msg = json?.error?.message || `HTTP ${res.status}`;
    const retryable = res.status === 429 || res.status === 500 || res.status === 503;
    throw Object.assign(new Error(msg), { retryable, status: res.status });
  }

  const candidate = json?.candidates?.[0];
  const image = (candidate?.content?.parts || []).find((p) => p.inlineData);
  if (!image) {
    const reason = candidate?.finishReason || json?.promptFeedback?.blockReason || 'görsel yok';
    throw Object.assign(new Error(`görsel dönmedi (${reason})`), { retryable: true });
  }

  return {
    buffer: Buffer.from(image.inlineData.data, 'base64'),
    mimeType: image.inlineData.mimeType || 'image/jpeg'
  };
};

/* ------------------------------------------------------------------- çıktı */

/** Ham görseli menüye uygun webp + jpg olarak yazar. */
const writeOptimized = async (buffer, kind, id) => {
  const { dir, resize } = TARGETS[kind];
  fs.mkdirSync(dir, { recursive: true });

  const base = sharp(buffer).resize({ ...resize, fit: 'cover', position: 'centre' });

  const webpPath = path.join(dir, `${id}.webp`);
  const jpgPath = path.join(dir, `${id}.jpg`);

  await base.clone().webp({ quality: WEBP_QUALITY }).toFile(webpPath);
  await base.clone().jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toFile(jpgPath);

  return {
    webpKB: Math.round(fs.statSync(webpPath).size / 1024),
    jpgKB: Math.round(fs.statSync(jpgPath).size / 1024)
  };
};

const outputExists = (kind, id) => fs.existsSync(path.join(TARGETS[kind].dir, `${id}.webp`));

/* ------------------------------------------------------------------- akış */

const buildQueue = () => {
  const wantProducts = hasFlag('products') || !hasFlag('categories');
  const wantCategories = hasFlag('categories') || !hasFlag('products');

  const queue = [];
  if (wantProducts) PRODUCT_PROMPTS.forEach((e) => queue.push({ ...e, kind: 'product' }));
  if (wantCategories) CATEGORY_PROMPTS.forEach((e) => queue.push({ ...e, kind: 'category' }));

  return queue
    .filter((e) => (ONLY.length ? ONLY.includes(e.id) : true))
    .filter((e) => (FORCE ? true : !outputExists(e.kind, e.id)));
};

const runOne = async (entry, reference) => {
  const prompt = buildPrompt(entry, entry.kind, Boolean(reference));
  const { aspectRatio } = TARGETS[entry.kind];

  let lastError;
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    // Son denemede daha güçlü modele geç.
    const model = MODEL_OVERRIDE || (attempt === MAX_ATTEMPTS ? FALLBACK_MODEL : MODEL);
    try {
      const { buffer } = await callGemini(model, prompt, reference?.part, aspectRatio);

      fs.mkdirSync(RAW_DIR, { recursive: true });
      fs.writeFileSync(path.join(RAW_DIR, `${entry.id}.jpg`), buffer);

      const sizes = await writeOptimized(buffer, entry.kind, entry.id);
      return { ...entry, ok: true, model, attempt, ...sizes };
    } catch (err) {
      lastError = err;
      if (attempt < MAX_ATTEMPTS && err.retryable !== false) {
        await sleep(1500 * attempt);
        continue;
      }
      if (attempt < MAX_ATTEMPTS) continue;
    }
  }
  return { ...entry, ok: false, error: lastError?.message || 'bilinmeyen hata' };
};

/** Sınırlı eşzamanlılıkla kuyruğu işler. */
const runPool = async (queue, reference, limit) => {
  const results = [];
  let cursor = 0;
  let done = 0;

  const worker = async () => {
    while (cursor < queue.length) {
      const index = cursor;
      cursor += 1;
      const entry = queue[index];
      const started = Date.now();
      const result = await runOne(entry, reference);
      done += 1;

      const secs = ((Date.now() - started) / 1000).toFixed(1);
      const tag = `[${String(done).padStart(2, ' ')}/${queue.length}]`;
      if (result.ok) {
        console.log(
          `${tag} ✓ ${entry.kind === 'category' ? 'kategori' : 'ürün'} ${entry.id} ` +
            `— ${result.webpKB}KB webp / ${result.jpgKB}KB jpg (${result.model}, ${secs}s)`
        );
      } else {
        console.log(`${tag} ✗ ${entry.id} — ${result.error} (${secs}s)`);
      }
      results.push(result);
    }
  };

  await Promise.all(Array.from({ length: Math.max(1, limit) }, worker));
  return results;
};

const main = async () => {
  const queue = buildQueue();

  if (LIST_ONLY || DRY_RUN) {
    console.log(`${queue.length} görsel üretilecek:`);
    queue.forEach((e) => console.log(`  - [${e.kind}] ${e.id}`));
    return;
  }

  if (!queue.length) {
    console.log('Üretilecek yeni görsel yok. Yeniden üretmek için --force kullanın.');
    return;
  }

  const reference = await loadReference();
  console.log(
    `Model: ${MODEL_OVERRIDE || MODEL} · Referans: ${reference ? reference.name : 'yok (sadece metin)'} · ` +
      `Eşzamanlı: ${CONCURRENCY} · Kuyruk: ${queue.length}\n`
  );

  const started = Date.now();
  const results = await runPool(queue, reference, CONCURRENCY);
  const failed = results.filter((r) => !r.ok);

  console.log(
    `\nBitti: ${results.length - failed.length}/${results.length} başarılı · ` +
      `${((Date.now() - started) / 1000 / 60).toFixed(1)} dk`
  );

  if (failed.length) {
    console.log(`Başarısız (${failed.length}): ${failed.map((f) => f.id).join(', ')}`);
    console.log(`Tekrar denemek için: node scripts/generate-images.mjs --only=${failed.map((f) => f.id).join(',')}`);
    process.exitCode = 1;
  }
};

main().catch((err) => {
  console.error('Beklenmeyen hata:', err);
  process.exit(1);
});
