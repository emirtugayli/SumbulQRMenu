/**
 * Sümbül Cafe — görsel üretim prompt kataloğu
 *
 * Tüm görseller kafenin gerçek ortamında çekilmiş gibi görünsün diye ortak bir
 * "sahne" (SCENE) ve ortak bir "kamera" (CAMERA) tarifi paylaşır:
 * beyaz mermer görünümlü kare masa, rattan hasır sandalye, krem şemsiye altında
 * açık gün ışığı, arkada yeşillik bokeh'i.
 *
 * Her ürünün kendi `subject` alanı sadece yemeğin/içeceğin ne olduğunu anlatır.
 */

/**
 * Kafenin gerçek terası — tüm karelerde aynı masa ve aynı ışık.
 * Referans fotoğraf (BosMasa.jpeg) her isteğe girdi olarak eklenir; bu metin de
 * o sahneyi sözle pekiştirir.
 */
export const SCENE = `Shot on location on the outdoor terrace of a neighbourhood Istanbul cafe, on that cafe's own table shown in the reference photograph: a square cream-ivory travertine-look stone tabletop with a thick layered pale stone edge, on a slim honey bamboo-look pedestal base. Around it are the same classic French bistro chairs with honey-coloured bamboo-look frames and cream woven cane mesh backs. Softly out-of-focus behind: the sunlit park terrace with green shrubs, grass, a small potted pine, a black wrought-iron railing and grey-pink paving stones. Bright sunny summer daylight exactly as in the reference photo, slightly softened, warm and inviting. Keep the tabletop clean — no ashtray, no table-number card, no clutter.`;

/**
 * Ortak ışık/lens dili — menüde hepsi aynı çekimden gelmiş gibi dursun.
 * Kadraj bilinçli olarak YAKIN: kartlarda görsel 120×120 px görünüyor, yemek
 * kareyi doldurmazsa küçük telefonlarda okunmuyor.
 */
export const CAMERA = `Professional appetizing close-up food photography for a cafe menu. 50mm lens at f/2.8, shallow depth of field, tack-sharp focus on the food, bright natural sunny daylight with soft warm shadows across the pale stone tabletop, rich saturated appetizing colors, freshly-served look with visible steam or condensation where natural. CRITICAL FRAMING: the camera stands much closer to the food than in the reference photograph — a tight hero close-up in which the plate or glass is centred and fills roughly 75 percent of the frame, cropping the plate rim at the edges if needed. Only a narrow band of tabletop and a softly blurred hint of the cane chair and sunlit greenery remain visible around it; the terrace is background texture, not the subject. Absolutely no text, no letters, no numbers, no logos, no watermarks, no brand labels, no packaging graphics, no people, no hands, no menus, no phones, no ashtrays. CUTLERY RULE: never duplicate utensils — at most one spoon or one fork in the whole frame, placed naturally on the plate or table; never two spoons, never a spoon in the dish and another one beside it, no floating or repeated cutlery.`;

/**
 * Açı çeşitliliği — masa ve ışık sabit kalırken kareler birbirinin kopyası olmasın.
 * Script her ürüne id'sine göre sabit (deterministik) bir açı atar.
 * Hepsi yakın çekim; sadece bakış açısı değişir.
 */
export const ANGLES = [
  `Close 45-degree three-quarter angle from just above the table, subject filling the frame.`,
  `Very low close-up at plate level, straight-on hero angle, front of the dish large in the frame and the terrace melting into bokeh behind it.`,
  `Close high angle looking down at about 70 degrees over the dish, tabletop filling the background.`,
  `Intimate 30-degree low three-quarter close-up, so close the food feels within arm's reach and the plate rim runs out of frame.`,
  `Tight overhead 90-degree flat-lay straight down, the plate almost touching all four edges of the frame with the pale stone tabletop as background.`,
  `Close 45-degree side angle, subject slightly off-centre and large in the frame, sunlit tabletop falling away into soft focus.`
];

/**
 * Markalı içecekler için kamera tarifi (kullanıcı tercihi: "markalı ürün gibi").
 * CAMERA'daki "yazı/logo olmasın" kuralı burada kaldırılır; bunun yerine
 * ambalajın doğru ve okunaklı çıkması istenir.
 */
export const CAMERA_BRANDED = `Professional appetizing close-up product photography for a cafe menu. 50mm lens at f/2.8, shallow depth of field, tack-sharp focus on the drink, bright natural sunny daylight with soft warm shadows across the pale stone tabletop, rich saturated colors, ice-cold freshly-served look with heavy condensation. CRITICAL FRAMING: the camera stands much closer to the drink than in the reference photograph — a tight hero close-up in which the drink is centred and fills roughly 75 percent of the frame height. Only a narrow band of tabletop and a softly blurred hint of the cane chair and sunlit greenery remain visible around it. The commercial packaging must look authentic and be rendered cleanly: label sharp, upright, correctly proportioned and facing the camera, brand wording crisp and correctly spelled, never warped, doubled or misspelled. No watermarks, no price tags, no people, no hands, no menus, no phones, no ashtrays, no duplicated utensils.`;

/** Kategori banner'ları için üstten geniş çekim. */
export const CAMERA_BANNER = `Professional appetizing food photography for a cafe menu banner. Wide horizontal establishing shot, 35mm lens at f/3.5, slight overhead 60-degree angle, bright airy natural daylight, rich appetizing colors, balanced editorial composition with the food grouped in the middle of the frame. Absolutely no text, no letters, no numbers, no logos, no watermarks, no brand labels, no people, no hands.`;

/**
 * Ürün görselleri — menuData.ts içindeki item.id ile birebir aynı sırada/isimde.
 * Çıktı: public/images/products/<id>.webp + .jpg (1:1)
 */
export const PRODUCT_PROMPTS = [
  // ---------------------------------------------------------------- GÖZLEME
  {
    id: 'patatesli-gozleme',
    subject: `Turkish "patatesli gözleme": a thin hand-rolled flatbread cooked on a sac griddle, folded into a long rectangle and cut into three pieces, filled with soft seasoned mashed potato with parsley. Golden-brown toasted blisters on the crisp thin dough, one piece tilted up so the creamy potato filling shows. Served on a simple white ceramic plate, brushed with butter, a small pinch of chili flakes beside it.`
  },
  {
    id: 'beyaz-peynirli-gozleme',
    subject: `Turkish "beyaz peynirli gözleme": thin sac-griddle flatbread folded into a rectangle and cut into pieces, filled with crumbled white brined feta-style cheese and chopped fresh parsley. Crisp golden blistered dough, filling visible in the cut cross-section. On a simple white ceramic plate with a few sprigs of parsley.`
  },
  {
    id: 'kasarli-gozleme',
    subject: `Turkish "kaşarlı gözleme": thin sac-griddle flatbread folded and cut into pieces, filled with molten yellow kasar cheese. One piece lifted slightly so a long stretchy melted cheese pull is visible, golden toasted spots on the thin dough, glossy butter sheen. On a simple white ceramic plate.`
  },
  {
    id: 'sucuk-kasarli-gozleme',
    subject: `Turkish "sucuk kaşarlı gözleme": thin sac-griddle flatbread folded and cut into pieces, filled with melted yellow kasar cheese and slices of spicy Turkish sucuk sausage. Deep red sucuk coins and stretchy melted cheese visible in the open cut, crisp blistered golden dough. On a simple white ceramic plate.`
  },
  {
    id: 'kavurma-kasarli-gozleme',
    subject: `Turkish "kavurma kaşarlı gözleme": thin sac-griddle flatbread folded and cut into pieces, generously filled with tender slow-cooked shredded beef kavurma and melted yellow kasar cheese. Juicy dark-brown meat and stretchy cheese spilling from the cut edge, crisp golden blistered dough. On a simple white ceramic plate.`
  },

  // ------------------------------------------------- KÖFTE & ANA YEMEKLER
  {
    id: 'kasap-kofte-yarim-ekmek',
    subject: `Turkish "kasap köfte yarım ekmek": four charcoal-grilled flattened butcher-style beef meatballs with dark grill marks tucked into a crusty half loaf of Turkish white bread, with sliced tomato, thin onion rings with parsley and a green pointed pepper. The sandwich is cut and held open on a simple white ceramic plate so the juicy grilled meat shows.`
  },
  {
    id: 'porsiyon-kasap-kofte',
    // Menü açıklamasıyla birebir: köfte + patates kızartması + salata + pilav.
    subject: `Turkish "porsiyon kasap köfte": a generous portion plate of six charcoal-grilled flattened butcher-style beef meatballs with dark grill marks, served with exactly three side items and nothing else — golden French fries, a mound of buttery rice pilaf, and a small fresh salad of chopped tomato, onion and parsley. On a large white oval ceramic plate.`
  },
  {
    id: 'hamburger',
    subject: `A classic cafe hamburger: toasted sesame brioche bun, thick juicy chargrilled beef patty, melted cheddar slice dripping down the side, crisp lettuce, tomato slice, red onion ring and pickles. Stacked tall and held together with a wooden skewer, golden French fries beside it on a simple white ceramic plate.`
  },
  {
    id: 'tantuni',
    subject: `Turkish "tantuni" wrap: finely chopped beef sautéed on a hot plate with tomato, onion, parsley and sumac, rolled in a very thin soft lavash flatbread, cut in half and standing on the cut ends so the juicy meat filling is visible. Sliced tomato, onion salad with sumac and a green pointed pepper beside it on a simple white ceramic plate.`
  },
  {
    id: 'kori-soslu-makarna',
    subject: `A bowl of pasta in creamy golden curry sauce: penne pasta fully coated in a silky warm-yellow curry cream sauce, glossy and steaming, finished with cracked black pepper and a few fresh parsley leaves. Served in a wide shallow white ceramic bowl with a fork resting on the rim.`
  },
  {
    id: 'kremali-makarna',
    subject: `A bowl of creamy white sauce pasta: penne pasta coated in a silky béchamel-style cream sauce, glossy and steaming, sprinkled with grated cheese, cracked black pepper and fresh parsley. Served in a wide shallow white ceramic bowl with a fork resting on the rim.`
  },
  {
    id: 'kori-soslu-tavuklu-makarna',
    subject: `A bowl of chicken curry pasta: penne pasta in a creamy golden curry sauce with plenty of tender golden-seared chicken breast strips, glossy sauce, steaming, garnished with fresh parsley and cracked black pepper. Served in a wide shallow white ceramic bowl.`
  },
  {
    id: 'kremali-mantarli-makarna',
    subject: `A bowl of creamy mushroom pasta: penne pasta in a silky white cream sauce with many golden sautéed sliced button mushrooms, glossy and steaming, sprinkled with grated cheese, cracked black pepper and fresh parsley. Served in a wide shallow white ceramic bowl.`
  },
  {
    id: 'manti',
    subject: `Turkish "mantı": a plate of tiny hand-folded beef dumplings topped with thick garlic yogurt, drizzled generously with melted butter infused with red pepper, dusted with dried mint and sumac. Steaming hot, served in a shallow white ceramic bowl, one spoon resting beside it.`
  },

  // -------------------------------------------------------- ATIŞTIRMALIKLAR
  {
    id: 'patates-kizartmasi',
    subject: `A portion of golden crispy French fries piled high, lightly salted, freshly fried and steaming, served in a white ceramic bowl with a small ramekin of ketchup and a small ramekin of mayonnaise beside it.`
  },
  {
    id: 'sigara-boregi',
    subject: `Turkish "sigara böreği": six slim cigar-shaped deep-fried yufka pastry rolls filled with white cheese and parsley, crisp blistered golden-brown shells, arranged in a neat fan on a simple white ceramic plate, one broken open to show the melted cheese inside, a few parsley sprigs and a lemon wedge beside them.`
  },

  // ------------------------------------------------------- TOST ÇEŞİTLERİ
  {
    id: 'kasarli-tost',
    subject: `Turkish grill-pressed "kaşarlı tost": a toasted sandwich of Turkish bread with deep golden ridged grill marks, cut diagonally in half and stacked so the long stretchy melted yellow kasar cheese pull between the halves is clearly visible. Served with golden French fries on a simple white ceramic plate.`
  },
  {
    id: 'beyaz-peynirli-tost',
    subject: `Turkish grill-pressed "beyaz peynirli tost": a toasted sandwich of Turkish bread with golden ridged grill marks, cut diagonally and stacked so the soft melted white brined feta-style cheese filling with parsley shows. Served with golden French fries on a simple white ceramic plate.`
  },
  {
    id: 'sucuklu-tost',
    subject: `Turkish grill-pressed "sucuklu tost": a toasted sandwich of Turkish bread with golden ridged grill marks, cut diagonally and stacked so the filling of pan-seared spicy red Turkish sucuk sausage slices with a little melted cheese shows. Served with golden French fries on a simple white ceramic plate.`
  },
  {
    id: 'kavurma-kasar-tost',
    subject: `Turkish grill-pressed "kavurma kaşar tost": a toasted sandwich of Turkish bread with deep golden ridged grill marks, cut diagonally and stacked, generously filled with tender shredded slow-cooked beef kavurma and stretchy melted yellow kasar cheese spilling out of the cut edge. Served with golden French fries on a simple white ceramic plate.`
  },
  {
    id: 'sucuk-kasar-tost',
    subject: `Turkish grill-pressed "sucuk kaşar tost": a toasted sandwich of Turkish bread with golden ridged grill marks, cut diagonally and stacked, filled with spicy red Turkish sucuk sausage slices and stretchy melted yellow kasar cheese pulling between the halves. Served with golden French fries on a simple white ceramic plate.`
  },

  // ---------------------------------------------------------------- KAHVALTI
  {
    id: 'serpme-kahvalti',
    camera: `Professional appetizing food photography for a cafe menu. Overhead 90-degree flat-lay shot from directly above, 35mm lens, bright airy natural daylight, rich appetizing colors, the many small plates arranged edge to edge filling the whole frame in a balanced generous spread. Absolutely no text, no letters, no numbers, no logos, no watermarks, no brand labels, no people, no hands.`,
    subject: `A Turkish "serpme kahvaltı" spread generously laid out for two people. The spread contains EXACTLY these thirteen items, each in its own separate small white dish, each item appearing ONE single time, arranged in a neat spaced grid across the tabletop: (1) one shallow dish of honey with a spoonful of thick clotted cream kaymak on it, (2) one shallow dish of tahini swirled with dark grape molasses, (3) one small bowl of red strawberry jam, (4) one small bowl of dark red spicy acuka paste, (5) one small bowl of black olives, (6) one small bowl of green olives, (7) one oval plate of cheese holding white brined cheese slices together with yellow kasar cheese slices, (8) one small plate of sliced ripe tomatoes, (9) one small plate of sliced cucumber, (10) one small copper pan with two sunny-side-up fried eggs, (11) one small plate of pan-seared spicy red sucuk sausage slices, (12) one small copper pan of menemen (tomato and green pepper scrambled eggs), (13) one small plate of golden sautéed potato cubes. Alongside them just one wicker basket of sliced fresh Turkish bread and two slim tulip glasses of red Turkish tea. STRICTLY THIRTEEN DISHES IN TOTAL AND NO DUPLICATES: count them before composing — exactly one honey-with-kaymak dish, one tahini-with-molasses dish, one jam bowl, one acuka bowl, one black olive bowl, one green olive bowl, one cheese plate, one tomato plate, one cucumber plate, one egg pan, one sucuk plate, one menemen pan, one potato plate. Never repeat any dish to fill empty space, never a second honey dish, never a second menemen or egg pan. Nothing else on the table: no potted plant, no bonsai, no ashtray, no extra dishes.`
  },
  {
    id: 'menemen',
    subject: `Turkish "menemen": soft creamy scrambled eggs cooked with diced tomatoes and green peppers, still glossy and steaming, served bubbling in a small two-handled copper pan, sprinkled with chili flakes and fresh parsley, with a few slices of fresh Turkish bread beside the pan.`
  },
  {
    id: 'kahvalti-tabagi',
    // İçerik kafeden alındı: domates, salatalık, 1 yumurta, 1 sigara böreği,
    // 1 patates böreği, kaşar, beyaz peynir, bal, tereyağı, zeytin.
    subject: `A single-serving Turkish breakfast plate ("kahvaltı tabağı") holding EXACTLY these ten items, each appearing one single time, neatly arranged side by side on one large round white plate: sliced ripe tomato, sliced cucumber, one sunny-side-up fried egg, one slim cigar-shaped golden fried sigara böreği pastry roll, one small golden fried potato-filled börek pastry, one wedge of yellow kasar cheese, one wedge of white brined feta-style cheese, a small portion of honey, a small pat of butter, and a few black olives. A few slices of fresh Turkish bread rest on the table beside the plate. No duplicated items, no extra bowls, no jam, no menemen, nothing beyond this list.`
  },
  {
    id: 'sade-omlet',
    subject: `A plain omelette: a soft pale-golden folded three-egg omelette, tender and glossy, lightly seasoned, served on a simple white ceramic plate with a sprig of parsley and two slices of fresh Turkish bread beside it.`
  },
  {
    id: 'karisik-omlet',
    subject: `A mixed omelette: a soft golden folded omelette generously filled with melted yellow kasar cheese, diced green pepper, tomato and slices of spicy Turkish sucuk sausage, the filling spilling from the open fold, garnished with parsley. Served on a simple white ceramic plate with slices of fresh Turkish bread.`
  },

  // ---------------------------------------------------------------- TATLILAR
  {
    id: 'frambuazli-cheesecake',
    subject: `A slice of raspberry cheesecake: a tall creamy white baked cheesecake slice on a golden biscuit base, topped with a glossy bright red raspberry coulis dripping down the side and three fresh raspberries with a mint leaf. Served on a small white dessert plate with a dessert fork.`
  },
  {
    id: 'limonlu-cheesecake',
    subject: `A slice of lemon cheesecake: a tall creamy pale-yellow cheesecake slice on a golden biscuit base, topped with a glossy lemon curd glaze, a thin lemon twist and a mint leaf, a light dusting of crumbs. Served on a small white dessert plate with a dessert fork.`
  },
  {
    id: 'mozaik-pasta',
    subject: `Turkish "mozaik pasta": two thick slices of no-bake chocolate biscuit mosaic cake, dark glossy chocolate set with visible pale broken biscuit pieces in a mosaic pattern, dusted lightly with cocoa powder. Served on a small white dessert plate with a mint leaf and a dessert fork.`
  },
  {
    id: 'tiramisu',
    subject: `A single-serving tiramisu: creamy layered mascarpone and coffee-soaked ladyfinger dessert in a small clear glass dish, generously dusted with dark cocoa powder on top, the soft cream and coffee-soaked biscuit layers clearly visible through the glass. Served on a small white dessert plate with exactly one dessert spoon resting on the plate beside the glass.`
  },

  // --------------------------------------------------------- SOĞUK İÇECEKLER
  {
    id: 'su',
    subject: `A tall clear glass of ice-cold still water with beads of condensation running down the outside, filled to the top, a plain unlabelled clear glass water bottle standing behind it. Crisp, clean and refreshing.`
  },
  {
    id: 'sade-soda',
    subject: `A tall clear glass of plain sparkling mineral water, densely filled with rising bubbles, ice cubes and heavy condensation on the glass, a plain unlabelled clear glass soda bottle beside it. Crisp and refreshing.`
  },
  {
    id: 'meyveli-soda',
    subject: `A tall clear glass of fruit-flavoured sparkling soda: pale pink-peach fizzy drink full of rising bubbles with ice cubes, a slice of orange and a few berries on the rim, condensation on the glass, a plain unlabelled clear glass bottle beside it.`
  },
  {
    id: 'sise-cola',
    branded: true,
    subject: `An ice-cold classic Coca-Cola contour glass bottle, deep red label with the white Coca-Cola script, cap off, beaded with condensation and standing on the table beside a tall glass of dark cola poured over ice cubes with a lemon slice and fizzing bubbles rising.`
  },
  {
    id: 'kutu-cola',
    branded: true,
    subject: `An ice-cold classic Coca-Cola aluminium can, bright red with the white Coca-Cola script, frosted with condensation, standing upright beside a tall glass of dark cola poured over ice cubes with fizzing bubbles and a lemon slice.`
  },
  {
    id: 'kutu-fanta',
    branded: true,
    subject: `An ice-cold Fanta Orange aluminium can, vivid orange with the blue Fanta wordmark, frosted with condensation, standing upright beside a tall glass of bright orange fizzy orange soda poured over ice cubes with bubbles rising and an orange slice on the rim.`
  },
  {
    id: 'kutu-sprite',
    branded: true,
    subject: `An ice-cold Sprite aluminium can, green and silver with the Sprite wordmark, frosted with condensation, standing upright beside a tall glass of clear sparkling lemon-lime soda poured over ice cubes with bubbles rising, a lime wedge and a mint sprig on the rim.`
  },
  {
    id: 'cappy-karisik',
    branded: true,
    subject: `A chilled Cappy mixed fruit juice single-serve carton pack with its red Cappy logo and mixed fruit artwork, standing upright with a straw, beside a tall glass of thick opaque golden-orange mixed fruit juice; an orange half, an apricot and a few cherries on the table.`
  },
  {
    id: 'cappy-kayisi',
    branded: true,
    subject: `A chilled Cappy apricot juice single-serve carton pack with its red Cappy logo and apricot artwork, standing upright with a straw, beside a tall glass of thick opaque soft-orange apricot nectar; two fresh whole apricots and one halved apricot on the table.`
  },
  {
    id: 'cappy-visne',
    branded: true,
    subject: `A chilled Cappy sour cherry juice single-serve carton pack with its red Cappy logo and sour cherry artwork, standing upright with a straw, beside a tall glass of deep ruby-red sour cherry juice over ice; a small cluster of fresh dark sour cherries with stems on the table.`
  },
  {
    id: 'cappy-seftali',
    branded: true,
    subject: `A chilled Cappy peach juice single-serve carton pack with its red Cappy logo and peach artwork, standing upright with a straw, beside a tall glass of thick opaque pale-orange peach nectar; a fresh whole peach and a peach half on the table.`
  },
  {
    id: 'fuse-tea-seftali',
    branded: true,
    subject: `A chilled Fuse Tea peach iced tea bottle with its dark blue label and white Fuse Tea wordmark, heavy condensation on the glass, standing beside a tall glass of amber-golden iced tea filled with ice cubes, a peach slice and a mint sprig on the rim; fresh peach halves on the table.`
  },
  {
    id: 'fuse-tea-limon',
    branded: true,
    subject: `A chilled Fuse Tea lemon iced tea bottle with its dark blue label and white Fuse Tea wordmark, heavy condensation on the glass, standing beside a tall glass of pale golden iced tea filled with ice cubes and lemon slices, a mint sprig on the rim; fresh lemon halves on the table.`
  },
  {
    id: 'fuse-tea-mango',
    branded: true,
    subject: `A chilled Fuse Tea mango iced tea bottle with its dark blue label and white Fuse Tea wordmark, heavy condensation on the glass, standing beside a tall glass of bright warm-yellow iced tea filled with ice cubes, a mango slice and a mint sprig on the rim; fresh mango cheeks on the table.`
  },
  {
    id: 'fuse-tea-karpuz',
    branded: true,
    subject: `A chilled Fuse Tea watermelon iced tea bottle with its dark blue label and white Fuse Tea wordmark, heavy condensation on the glass, standing beside a tall glass of rosy pink-red iced tea filled with ice cubes, a small watermelon wedge and a mint sprig on the rim; fresh watermelon cubes on the table.`
  },
  {
    id: 'ice-caramel-latte',
    subject: `An iced caramel latte in a tall clear glass: layers of ice cubes, cold milk and dark espresso with golden caramel sauce drizzled down the inside walls of the glass, topped with a swirl of whipped cream and a caramel drizzle, a straw, condensation on the glass.`
  },
  {
    id: 'ice-latte',
    subject: `An iced latte in a tall clear glass: ice cubes and cold milk with a dark espresso shot cascading through it in beautiful marbled layers, a straw, heavy condensation running down the glass.`
  },
  {
    id: 'ice-americano',
    subject: `An iced americano in a tall clear glass: clear ice cubes in deep dark-brown black coffee with a thin pale crema foam layer on top, a straw, heavy condensation running down the glass.`
  },
  {
    id: 'nescafe-original',
    branded: true,
    // Kafede satılan ürün sıcak kahve değil, soğuk Nescafé Xpress kutu kahve.
    reference: 'referans/nescafe-xpress.jpg',
    subject: `An ice-cold Nescafé Xpress Original ready-to-drink iced coffee can: a tall slim 250 ml aluminium can with a vivid orange body, the red and white NESCAFÉ logo block at the top, the bold black "Xpress" script across the middle and a red oval "ORIGINAL" badge below it, silver rim and pull tab. The can stands upright, frosted with heavy condensation and a few water droplets running down, beside a tall clear glass of milky iced coffee poured over ice cubes with a creamy pale head.`
  },
  {
    id: 'red-bull',
    branded: true,
    subject: `An ice-cold Red Bull energy drink slim can, silver and blue chequered design with the red twin-bulls logo, frosted with condensation, standing upright beside a small glass of pale amber energy drink poured over ice cubes with bubbles rising.`
  },

  // --------------------------------------------------------- SICAK İÇECEKLER
  {
    id: 'cay',
    subject: `Turkish black tea served the traditional way: a slim-waisted tulip-shaped clear glass on a small white saucer, filled with deep amber-crimson tea, gentle steam rising, two white sugar cubes and a tiny tea spoon on the saucer.`
  },
  {
    id: 'fincan-cay',
    subject: `Turkish black tea served in a plain white porcelain cup on a white saucer: deep amber-crimson tea filled to the top, gentle steam rising, a small spoon and two white sugar cubes on the saucer.`
  },
  {
    id: 'turk-kahvesi',
    subject: `Turkish coffee: a small plain white porcelain cup on a saucer filled with dark coffee under a thick creamy tan foam layer, a long-handled hammered copper cezve pot standing behind it, a piece of Turkish delight and a small glass of water beside it, gentle steam.`
  },
  {
    id: 'oralet-cesitleri',
    subject: `A hot fruit-flavoured instant drink Turkish style: a slim-waisted tulip-shaped clear tea glass on a white saucer filled with a hot bright orange fruit drink, steam rising gently, a small spoon on the saucer, a slice of orange beside it.`
  },
  {
    id: 'bitki-caylari',
    subject: `Herbal tea: a clear glass teacup on a white saucer filled with pale golden herbal infusion with a whole dried linden blossom and chamomile flowers floating in it, gentle steam rising, a small pile of dried chamomile flowers and a thin slice of lemon on the table beside it, a tiny honey spoon.`
  },
  {
    id: 'americano',
    subject: `An americano: a plain white porcelain cup on a white saucer filled with deep dark-brown black coffee topped with a thin ring of pale crema, gentle steam rising, a small spoon on the saucer.`
  },
  {
    id: 'sutlu-kahve',
    subject: `A coffee with milk: a plain white porcelain cup on a white saucer filled with light caramel-brown milky coffee with a smooth pale foam surface, gentle steam rising, a small white milk jug beside it and a spoon on the saucer.`
  },
  {
    id: 'cappuccino',
    subject: `A cappuccino: a plain white porcelain cup on a white saucer, thick velvety microfoam surface with a delicate white rosetta latte-art leaf pattern on light caramel crema, a light dusting of cocoa on one side, gentle steam rising, a spoon on the saucer.`
  },
  {
    id: 'caffe-latte',
    subject: `A caffe latte in a tall clear glass: beautiful distinct layers of dark espresso and steamed milk with a thick creamy white foam cap and a small latte-art heart on top, gentle steam rising, standing on a small white saucer with a long spoon.`
  },
  {
    id: 'espresso',
    subject: `A single espresso: a small white porcelain demitasse cup on a white saucer filled with dark espresso under a thick glossy hazelnut-brown crema, gentle steam rising, a tiny spoon and a white sugar cube on the saucer, a few roasted coffee beans on the table.`
  },
  {
    id: 'salep',
    subject: `Turkish "salep": a hot thick creamy milky white drink in a clear glass cup on a white saucer, generously dusted with ground cinnamon on top and a cinnamon stick resting in it, gentle steam rising.`
  },
  {
    id: 'sicak-sut',
    subject: `A glass of hot milk: a clear glass cup on a white saucer filled with steaming hot creamy white milk with a soft foam layer on top, gentle steam rising, a small white milk jug in the soft background.`
  },
  {
    id: 'karton-bardak-cay',
    subject: `Takeaway Turkish tea: a plain blank white paper takeaway cup with a corrugated kraft cardboard sleeve and no printing of any kind, lid off and resting beside it, filled with deep amber-crimson hot tea, gentle steam rising, two white sugar cubes on the table.`
  },
  {
    id: 'sicak-cikolata',
    subject: `Hot chocolate: a plain white porcelain mug on a white saucer filled with thick glossy dark hot chocolate, topped with a swirl of whipped cream, grated dark chocolate shavings and a dusting of cocoa, gentle steam rising, a few chocolate pieces on the table beside it.`
  }
];

/**
 * Kategori banner görselleri — menuData.ts içindeki category.id ile aynı.
 * Çıktı: public/images/categories/<id>.webp + .jpg (3:2)
 */
export const CATEGORY_PROMPTS = [
  {
    id: 'gozleme',
    subject: `An inviting spread of Turkish gözleme: three long thin sac-griddle flatbreads folded and cut into pieces on rustic white ceramic platters — one filled with molten yellow kasar cheese showing a cheese pull, one with white cheese and parsley, one with spiced potato — golden blistered dough, a small bowl of chili flakes, a tulip glass of Turkish tea to one side.`
  },
  {
    id: 'kofte-ana-yemekler',
    subject: `An inviting spread of Turkish main courses: a large plate of charcoal-grilled butcher-style beef köfte with grill marks, French fries, rice pilaf and grilled peppers, next to a bowl of creamy pasta and a bowl of mantı dumplings with garlic yogurt and red butter, fresh bread and a tomato-onion salad around them.`
  },
  {
    id: 'atistirmaliklar',
    subject: `An inviting snack spread: a white bowl piled with golden crispy French fries and a white platter of slim golden deep-fried cigar-shaped sigara böreği pastry rolls arranged in a fan, small ramekins of ketchup and mayonnaise, a lemon wedge and parsley sprigs.`
  },
  {
    id: 'tostlar',
    subject: `An inviting spread of Turkish grill-pressed toasted sandwiches: three plates of tost with deep golden ridged grill marks cut diagonally and stacked — one showing a long stretchy melted kasar cheese pull, one with spicy red sucuk slices, one with shredded beef kavurma — golden French fries alongside and a tulip glass of Turkish tea.`
  },
  {
    id: 'kahvalti',
    camera: `Professional appetizing food photography for a cafe menu banner. Wide horizontal overhead flat-lay shot from directly above, 35mm lens, bright airy natural daylight, rich appetizing colors, many small plates arranged edge to edge filling the frame in a balanced generous spread. Absolutely no text, no letters, no numbers, no logos, no watermarks, no brand labels, no people, no hands.`,
    subject: `A Turkish breakfast spread matching this cafe's menu exactly, each dish appearing ONE single time in its own small white dish: honey with clotted cream kaymak, tahini with grape molasses, strawberry jam, spicy acuka paste, black olives, green olives, one cheese plate with white brined cheese and yellow kasar slices, sliced tomatoes, sliced cucumber, one small copper pan of two sunny-side-up eggs, pan-seared sucuk slices, one small copper pan of menemen, and golden sautéed potato cubes — plus one basket of fresh Turkish bread and two tulip glasses of red Turkish tea. STRICTLY NO DUPLICATED DISHES: never two menemen pans, never repeated potato or honey plates. No potted plant, no ashtray, no clutter on the table.`
  },
  {
    id: 'tatlilar',
    subject: `An inviting dessert spread: a slice of raspberry cheesecake with red coulis, a slice of lemon cheesecake, two slices of dark chocolate biscuit mosaic cake and a glass of cocoa-dusted tiramisu, arranged on small white dessert plates with fresh raspberries, mint leaves and dessert forks.`
  },
  {
    id: 'soguk-icecekler',
    subject: `An inviting row of cold drinks in tall clear glasses beaded with heavy condensation: iced lemon tea with lemon slices, ruby sour cherry juice, orange apricot nectar, an iced latte with marbled milk and espresso layers, a fizzy cola over ice with bubbles rising — ice cubes, mint sprigs and fresh fruit scattered on the table between them.`
  },
  {
    id: 'sicak-icecekler',
    subject: `An inviting arrangement of hot drinks: a slim-waisted tulip glass of amber Turkish tea on a saucer, a hammered copper cezve with a small white cup of foamy Turkish coffee, a cappuccino with white rosetta latte art, a tall glass caffe latte with layered milk and a mug of hot chocolate with whipped cream — gentle steam rising from all of them, white sugar cubes and coffee beans on the table.`
  }
];
