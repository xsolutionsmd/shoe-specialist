import '@fontsource-variable/cormorant-garamond/wght.css';
import '@fontsource-variable/cormorant-garamond/wght-italic.css';
import '@fontsource-variable/instrument-sans/wght.css';
import './styles.css';

const root = document.documentElement;

// Hero entrance: run on the next frame so the initial state paints first.
requestAnimationFrame(() => requestAnimationFrame(() => root.classList.add('is-loaded')));

const year = document.querySelector('[data-year]');
if (year) year.textContent = String(new Date().getFullYear());

// Header hairline appears once the page scrolls.
const header = document.querySelector('[data-header]');
if (header) {
  let ticking = false;
  const update = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 40);
    ticking = false;
  };
  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true }
  );
  update();
}

// Entrances replay when a section returns to view. Siblings get a short stagger.
const revealables = document.querySelectorAll('.reveal');
revealables.forEach((el) => {
  const siblings = [...el.parentElement.children].filter((c) => c.classList.contains('reveal'));
  const index = Math.min(siblings.indexOf(el), 4);
  el.style.transitionDelay = `${index * 80}ms`;
});

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
        } else if (entry.boundingClientRect.top > 0) {
          // Only reset items below the viewport, so scrolling back up never hides content above.
          entry.target.classList.remove('is-in');
        }
      }
    },
    { rootMargin: '0px 0px -6% 0px', threshold: 0.01 }
  );
  revealables.forEach((el) => observer.observe(el));
} else {
  revealables.forEach((el) => el.classList.add('is-in'));
}

// Compact-screen menu: native button disclosure with Escape and outside-click closing.
const toggle = document.querySelector('[data-menu-toggle]');
const nav = document.querySelector('[data-nav]');

if (toggle && nav) {
  const isOpen = () => toggle.getAttribute('aria-expanded') === 'true';
  // Keep the open panel within the viewport; it scrolls internally when taller than the space left.
  const fitMenu = () => {
    if (header) nav.style.setProperty('--menu-top', `${Math.max(0, header.getBoundingClientRect().bottom)}px`);
  };
  const setOpen = (open, { focusToggle = false } = {}) => {
    if (open) fitMenu();
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
    if (!open && focusToggle) toggle.focus();
  };

  toggle.addEventListener('click', () => setOpen(!isOpen()));

  nav.addEventListener('click', (event) => {
    if (event.target.closest('a')) setOpen(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isOpen()) setOpen(false, { focusToggle: true });
  });

  document.addEventListener('click', (event) => {
    if (isOpen() && !nav.contains(event.target) && !toggle.contains(event.target)) setOpen(false);
  });

  // Close when keyboard focus leaves the open menu.
  nav.addEventListener('focusout', (event) => {
    if (isOpen() && event.relatedTarget && !nav.contains(event.relatedTarget) && event.relatedTarget !== toggle) {
      setOpen(false);
    }
  });

  // The header switches layout on its own width (container query), so check the toggle itself.
  window.addEventListener('resize', () => {
    if (!isOpen()) return;
    if (getComputedStyle(toggle).display === 'none') setOpen(false);
    else fitMenu();
  });

  let fitting = false;
  window.addEventListener(
    'scroll',
    () => {
      if (isOpen() && !fitting) {
        fitting = true;
        requestAnimationFrame(() => {
          fitMenu();
          fitting = false;
        });
      }
    },
    { passive: true }
  );
}
