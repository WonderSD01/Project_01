const img = (path) => new URL(`../../${path}`, import.meta.url).href;

export const LOGO = img('download.png');
export const BG_TEXTURE = img('lechon/Untitled design (1).png');

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

export const FEATURES = [
  {
    title: 'Crispy Skin, Always',
    text: 'Slow-roasted over charcoal for that signature shatter-crisp balat every single time.',
    image: img('lechon/474131947_1172379714461387_3146045806033734417_n.jpg'),
    alt: 'Whole roasted lechon with crispy golden skin',
  },
  {
    title: 'Fresh & Clean',
    text: 'Only fresh, well-cleaned pigs — juicy, tender meat your guests will keep talking about.',
    image: img('lechon/474505015_1173288324370526_5323710664454947870_n.jpg'),
    alt: 'Sliced lechon showing juicy tender meat',
  },
  {
    title: 'Delivery in Lipa',
    text: 'We bring your lechon hot and ready straight to your celebration around Lipa City.',
    image: img('lechon/480438938_651704527423686_194395341870054605_n.jpg'),
    alt: 'Lechon served at a Filipino fiesta',
  },
  {
    title: 'Sulit na Presyo',
    text: 'Honest, affordable pricing by live weight — premium lechon without the premium markup.',
    image: img('lechon/480740443_651704680757004_8283077934209874498_n.jpg'),
    alt: 'Lechon freshly roasted over coals',
  },
];

export const GALLERY = [
  {
    src: img('lechon/474131947_1172379714461387_3146045806033734417_n.jpg'),
    alt: 'Whole roasted lechon baboy with crispy golden skin',
    tag: 'Crispy Skin',
    wide: true,
  },
  {
    src: img('lechon/474505015_1173288324370526_5323710664454947870_n.jpg'),
    alt: 'Sliced lechon showing juicy tender meat',
    tag: 'Juicy Meat',
    wide: false,
  },
  {
    src: img('lechon/480438938_651704527423686_194395341870054605_n.jpg'),
    alt: 'Lechon served at a Filipino fiesta celebration',
    tag: 'Fiesta Ready',
    wide: false,
  },
  {
    src: img('lechon/481692615_665399819387490_6825367062903201783_n.jpg'),
    alt: 'Golden roasted lechon on display',
    tag: 'Fresh Roast',
    wide: false,
  },
  {
    src: img('lechon/481784191_665396256054513_8668396699942435463_n.jpg'),
    alt: 'Whole lechon ready for serving',
    tag: 'Party Size',
    wide: true,
  },
  {
    src: img('lechon/481944002_666053845988754_2621315149209642743_n.jpg'),
    alt: 'Crispy lechon belly close-up',
    tag: 'Crispy Belly',
    wide: false,
  },
  {
    src: img('lechon/482019344_666053939322078_6218074537323391433_n.jpg'),
    alt: 'Lechon prepared for delivery',
    tag: 'Ready to Go',
    wide: false,
  },
  {
    src: img('lechon/482057442_665392826054856_5530151939591560375_n.jpg'),
    alt: 'Roasted lechon with glistening skin',
    tag: 'Glistening Skin',
    wide: false,
  },
  {
    src: img('lechon/482216646_666041695989969_7093567185241790847_n.jpg'),
    alt: 'Lechon feast spread',
    tag: 'Feast Time',
    wide: true,
  },
  {
    src: img('lechon/482249096_666054052655400_7965097659664388541_n.jpg'),
    alt: 'Whole lechon baboy roasted to perfection',
    tag: 'Perfection',
    wide: false,
  },
  {
    src: img('lechon/480740443_651704680757004_8283077934209874498_n.jpg'),
    alt: 'Lechon freshly roasted over coals',
    tag: 'Over Coals',
    wide: false,
  },
];

export const STATS = [
  { value: 4, suffix: '', label: 'Years Roasting' },
  { value: 100, suffix: '%', label: 'Served & Delivered Fresh' },
  { text: 'Pick Up & Delivery', label: 'Open For' },
];

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

export const HERO_IMAGE = img(
  'lechon/480740443_651704680757004_8283077934209874498_n.jpg'
);

export const ABOUT_IMAGE = HERO_IMAGE;

const reviewModules = import.meta.glob('../../reviews/*.{jpg,jpeg,png}', {
  eager: true,
  query: '?url',
  import: 'default',
});

export const REVIEW_IMAGES = Object.values(reviewModules);

export const formatPrice = (amount) =>
  `₱${amount.toLocaleString('en-PH')}`;
