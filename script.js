// Scroll animations
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.15 });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// Mobile nav
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navOverlay = document.getElementById('nav-overlay');

function setNavOpen(open) {
  navMenu.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  navOverlay.hidden = !open;
  navOverlay.setAttribute('aria-hidden', open ? 'false' : 'true');
  document.body.classList.toggle('nav-open', open);
}

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => setNavOpen(!navMenu.classList.contains('open')));
  navOverlay.addEventListener('click', () => setNavOpen(false));
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setNavOpen(false));
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 639) setNavOpen(false);
  });
}

// Nav active link
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const navHeight = () => parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'), 10) || 60;

window.addEventListener('scroll', () => {
  let current = '';
  const offset = navHeight() + 16;
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - offset) current = s.id; });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}, { passive: true });

// ─── Reviews carousel ───
const REVIEW_IMAGES = [
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
];

function initReviewsCarousel() {
  const track = document.getElementById('reviews-track');
  const dotsContainer = document.getElementById('reviews-dots');
  const currentEl = document.getElementById('reviews-current');
  const totalEl = document.getElementById('reviews-total');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  const lightbox = document.getElementById('review-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.querySelector('.lightbox-close');

  if (!track || !REVIEW_IMAGES.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let current = 0;
  let autoplayTimer = null;
  let touchStartX = 0;
  let touchDeltaX = 0;

  totalEl.textContent = REVIEW_IMAGES.length;

  REVIEW_IMAGES.forEach((filename, i) => {
    const slide = document.createElement('figure');
    slide.className = 'carousel-slide';
    slide.setAttribute('role', 'group');
    slide.setAttribute('aria-roledescription', 'slide');
    slide.setAttribute('aria-label', `Review ${i + 1} of ${REVIEW_IMAGES.length}`);

    const img = document.createElement('img');
    img.src = `reviews/${filename}`;
    img.alt = `Customer review screenshot ${i + 1}`;
    img.loading = i === 0 ? 'eager' : 'lazy';
    img.draggable = false;
    slide.appendChild(img);
    track.appendChild(slide);

    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `Go to review ${i + 1}`);
    dot.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);

    img.addEventListener('click', () => openLightbox(img.src));
  });

  const dots = dotsContainer.querySelectorAll('.carousel-dot');

  function goTo(index) {
    current = (index + REVIEW_IMAGES.length) % REVIEW_IMAGES.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    currentEl.textContent = current + 1;
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === current);
      dot.setAttribute('aria-selected', i === current ? 'true' : 'false');
    });
    resetAutoplay();
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  prevBtn.addEventListener('click', prev);
  nextBtn.addEventListener('click', next);

  function resetAutoplay() {
    clearInterval(autoplayTimer);
    if (!prefersReducedMotion) {
      autoplayTimer = setInterval(next, 5000);
    }
  }

  // Touch / swipe
  const viewport = document.querySelector('.carousel-viewport');
  viewport.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
    touchDeltaX = 0;
    clearInterval(autoplayTimer);
  }, { passive: true });

  viewport.addEventListener('touchmove', e => {
    touchDeltaX = e.changedTouches[0].screenX - touchStartX;
  }, { passive: true });

  viewport.addEventListener('touchend', () => {
    if (Math.abs(touchDeltaX) > 50) {
      touchDeltaX < 0 ? next() : prev();
    } else {
      resetAutoplay();
    }
  }, { passive: true });

  // Keyboard navigation when carousel is in view
  document.addEventListener('keydown', e => {
    const reviewsSection = document.getElementById('reviews');
    const rect = reviewsSection.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (!inView) return;

    if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
    if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
    if (e.key === 'Escape' && !lightbox.hidden) closeLightbox();
  });

  // Lightbox
  function openLightbox(src) {
    lightboxImg.src = src;
    lightbox.hidden = false;
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    clearInterval(autoplayTimer);
  }

  function closeLightbox() {
    lightbox.hidden = true;
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImg.src = '';
    document.body.style.overflow = '';
    resetAutoplay();
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });

  // Pause autoplay when tab is hidden
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) clearInterval(autoplayTimer);
    else resetAutoplay();
  });

  resetAutoplay();
}

initReviewsCarousel();
