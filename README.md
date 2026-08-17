# Sümbül Cafe — QR Menü

Fatih / Kocamustafapaşa'daki Sümbül Cafe için mobil öncelikli dijital QR menü.
React + TypeScript + Vite ile yazıldı; ürün fotoğrafları Google Gemini ile üretildi.

## Çalıştırma

```bash
npm install
npm run dev      # http://localhost:3000 (telefondan test için ağ adresi de yazdırılır)
npm run build    # dist/ klasörüne production çıktısı
npm run preview  # build çıktısını yerelde sunar
```

## Menü içeriği

Tüm kategoriler, ürünler, açıklamalar ve fiyatlar tek dosyada:
[`src/data/menuData.ts`](src/data/menuData.ts)

Bir ürünün görseli, `id` alanından otomatik türetilir:

| id | görsel |
| --- | --- |
| `kasarli-gozleme` | `public/images/products/kasarli-gozleme.webp` + `.jpg` |
| kategori `tatlilar` | `public/images/categories/tatlilar.webp` + `.jpg` |

Her görselin `webp` (modern tarayıcılar) ve `jpg` (eski cihazlar) sürümü vardır;
`<picture>` etiketi doğru olanı seçer.

## Görsel üretimi (Gemini)

Fotoğraflar kafenin **gerçek masasında** çekilmiş gibi görünsün diye
[`BosMasa.jpeg`](BosMasa.jpeg) her isteğe referans olarak eklenir: krem travertin
masa, hasır bistro sandalyeler, park terası ve gün ışığı aynı kalır; açı ve
kadraj ürüne göre değişir.

```bash
cp .env.example .env          # GEMINI_API_KEY değerini girin

node scripts/generate-images.mjs                  # eksik görselleri üret
node scripts/generate-images.mjs --force          # hepsini yeniden üret
node scripts/generate-images.mjs --only=cay,manti # tek tek üret
node scripts/generate-images.mjs --model=gemini-3-pro-image   # daha güçlü model
node scripts/generate-images.mjs --list           # üretmeden listele

node scripts/verify-images.mjs                    # eksik/bozuk görsel kontrolü
```

- Ürün tarifleri: [`scripts/imagePrompts.mjs`](scripts/imagePrompts.mjs)
- Ham çıktılar `scripts/.raw/` altında saklanır (repoya girmez), optimize
  sürümler `public/images/` altına yazılır.
- Menüye yeni ürün eklerken `menuData.ts` içine ürünü, `imagePrompts.mjs` içine
  aynı `id` ile bir tarif ekleyip üretim komutunu çalıştırmak yeterlidir.

### Not: markalı içecekler

Kola, Fanta, Sprite, Cappy, Fuse Tea, Red Bull ve Nescafe görselleri kafe
tercihi doğrultusunda markalı ambalajla üretilmiştir. Bu görseller yapay zekâ
ile oluşturulmuş temsili görsellerdir; marka kullanımına ilişkin sorumluluk
işletmeye aittir. Logosuz sürüme dönmek isterseniz `imagePrompts.mjs` içindeki
ilgili tariflerden `branded: true` satırını kaldırmanız yeterlidir.

## Erişilebilirlik

Menü orta yaş ve üzeri kullanıcılar düşünülerek tasarlandı:

- 19 px temel yazı boyutu, başlıkta tek dokunuşla açılan büyük yazı modu (23 px)
- En az 48 px dokunma hedefleri
- Yüksek kontrastlı fiyat ve ürün adları, 132 px ürün fotoğrafları
- Sabit üst katmanların yükseklikleri çalışma anında ölçülür; yazı büyütülünce
  arama ve kategori çubuğu üst üste binmez
