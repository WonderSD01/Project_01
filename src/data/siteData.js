// Public-folder paths — reliable in dev and production
const asset = (path) => `/${path.replace(/ /g, '%20')}`;

export const LOGO = asset('download.png');
export const BG_TEXTURE = asset('lechon/bg-tile.webp');

export const MAPS_URL = 'https://maps.app.goo.gl/qLsP7hAX2Byi8UyW9';

export const PRICES = [
  { size: 'De Leche', liveWeight: '7–9', pax: 10, price: 7000, featured: false },
  { size: 'Small 1', liveWeight: '10–11', pax: 15, price: 8000, featured: false },
  { size: 'Small 2', liveWeight: '12–13', pax: 18, price: 8300, featured: false },
  { size: 'Regular', liveWeight: '14–16', pax: 25, price: 9000, featured: false },
  { size: 'Medium 1', liveWeight: '17–19', pax: 30, price: 9400, featured: false },
  { size: 'Medium 2', liveWeight: '20–21', pax: 35, price: 10000, featured: false },
  { size: 'Large 1', liveWeight: '22–23', pax: 40, price: 10500, featured: false },
  { size: 'Large 2', liveWeight: '24–26', pax: 50, price: 11500, featured: false },
  { size: 'Xtra Large', liveWeight: '27–29', pax: 60, price: 12500, featured: false },
  { size: 'Jumbo 1', liveWeight: '30–32', pax: 70, price: 13500, featured: false },
  { size: 'Jumbo 2', liveWeight: '33–35', pax: 80, price: 14500, featured: false },
  { size: 'Fiesta 1', liveWeight: '36–38', pax: 90, price: 15500, featured: false },
  { size: 'Fiesta 2', liveWeight: '39–40', pax: 100, price: 16500, featured: true },
];

const LECHON_IMAGES = [
  '474131947_1172379714461387_3146045806033734417_n.jpg',
  '474505015_1173288324370526_5323710664454947870_n.jpg',
  '480142836_651704460757026_3616925184819909092_n.jpg',
  '480438938_651704527423686_194395341870054605_n.jpg',
  '480740443_651704680757004_8283077934209874498_n.jpg',
  '481692615_665399819387490_6825367062903201783_n.jpg',
  '481784191_665396256054513_8668396699942435463_n.jpg',
  '481944002_666053845988754_2621315149209642743_n.jpg',
  '482019344_666053939322078_6218074537323391433_n.jpg',
  '482057442_665392826054856_5530151939591560375_n.jpg',
  '482216646_666041695989969_7093567185241790847_n.jpg',
  '482249096_666054052655400_7965097659664388541_n.jpg',
  'aff1ce1d-85de-40d1-9007-7bfbda54522a.jpg',
  'IMG_3258_Original.JPG',
  'IMG_3395_Original.JPG',
  'IMG_4149_Original.JPG',
  'IMG_4161_Original.JPG',
  'IMG_4164_Original.JPG',
  'IMG_4174_Original.JPG',
  'IMG_4301_Original.JPG',
];

const GALLERY_TAGS = [
  'Crispy Skin',
  'Juicy Meat',
  'Fiesta Ready',
  'Fresh Roast',
  'Party Size',
  'Hot & Ready',
  'Golden Brown',
  'Family Feast',
  'Roasted Fresh',
  "Lorenzo's Best",
];

const lechon = (file) => asset(`lechon/${file}`);

export const FEATURES = [
  {
    title: 'Crispy Skin, Always',
    text: 'Slow-roasted over charcoal for that signature shatter-crisp balat every single time.',
    image: lechon(LECHON_IMAGES[15]),
    alt: 'Whole roasted lechon with crispy golden skin',
  },
  {
    title: 'Fresh & Clean',
    text: 'Only fresh, well-cleaned pigs — juicy, tender meat your guests will keep talking about.',
    image: lechon(LECHON_IMAGES[14]),
    alt: 'Sliced lechon showing juicy tender meat',
  },
  {
    title: 'Delivery in Lipa',
    text: 'We bring your lechon hot and ready straight to your celebration around Lipa City.',
    image: lechon(LECHON_IMAGES[16]),
    alt: 'Lechon served at a Filipino fiesta',
  },
  {
    title: 'Sulit na Presyo',
    text: 'Honest, affordable pricing by live weight — premium lechon without the premium markup.',
    image: lechon(LECHON_IMAGES[12]),
    alt: 'Lechon freshly roasted over coals',
  },
];

export const GALLERY = LECHON_IMAGES.map((file, i) => ({
  src: lechon(file),
  alt: `Lorenzo's Lechon — ${GALLERY_TAGS[i % GALLERY_TAGS.length]}`,
  tag: GALLERY_TAGS[i % GALLERY_TAGS.length],
}));

export const STATS = [
  { value: 4, suffix: '', label: 'Years Roasting' },
  { value: 100, suffix: '%', label: 'Served & Delivered Fresh' },
];

// Smaller social JPGs only — faster hero carousel load
export const HERO_CAROUSEL = [
  LECHON_IMAGES[4],
  LECHON_IMAGES[0],
  LECHON_IMAGES[6],
  LECHON_IMAGES[9],
  LECHON_IMAGES[11],
].map(lechon);

export const STEPS = [
  {
    n: 1,
    title: 'Choose Your Size',
    text: 'Pick the lechon size that fits your headcount from the price list above.',
    icon: 'list',
  },
  {
    n: 2,
    title: 'Reserve Your Date',
    text: 'Message or call us to book — pre-order ahead so we can secure your celebration.',
    icon: 'calendar',
  },
  {
    n: 3,
    title: 'Enjoy the Feast',
    text: 'We deliver it hot, crispy, and fiesta-ready. Lutong-handa na ang lechon mo!',
    icon: 'party',
  },
];

export const NAV_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#menu', label: 'Menu' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#contact', label: 'Order' },
];

export const HERO_IMAGE = lechon(LECHON_IMAGES[15]);
export const ABOUT_IMAGE = lechon(LECHON_IMAGES[17]);

export const REVIEW_IMAGES = [
  '481655799_665384366055702_751848824675598624_n.jpg',
  '481711641_665399436054195_5773579391317457323_n.jpg',
  '481767742_665384482722357_8917426660460996334_n.jpg',
  '481982230_665384409389031_7657815845223972769_n.jpg',
  '481990896_665384332722372_8415886688875669250_n.jpg',
  '482003198_665384309389041_7159458115714028666_n.jpg',
  '482191300_665384202722385_8445131946745072982_n.jpg',
  '482191889_665390302721775_3099103937250748887_n.jpg',
  '482205623_665384262722379_881833062048237970_n.jpg',
  '482210602_665384242722381_2159686767659918086_n.jpg',
  '482221878_665384469389025_3150318609378314661_n.jpg',
  '482224149_665384349389037_5520799473103894569_n.jpg',
  '482243270_665384396055699_1058849029186982483_n.jpg',
].map((file) => asset(`reviews/${file}`));

export const formatPrice = (amount) =>
  `₱${amount.toLocaleString('en-PH')}`;
