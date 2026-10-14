(() => {
  const menuToggle = document.querySelector('#menu-toggle');
  const primaryNav = document.querySelector('#primary-nav');
  const dropdownButtons = document.querySelectorAll('.dropdown-toggle');

  if (menuToggle && primaryNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = primaryNav.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.querySelector('.menu-icon').textContent = isOpen ? '✕' : '☰';
    });
  }

  dropdownButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const parent = button.closest('.nav-item');
      const willOpen = !parent.classList.contains('open');
      document.querySelectorAll('.nav-item.open').forEach((item) => {
        item.classList.remove('open');
        item.querySelector('.dropdown-toggle')?.setAttribute('aria-expanded', 'false');
      });
      if (willOpen) {
        parent.classList.add('open');
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.nav-item')) {
      document.querySelectorAll('.nav-item.open').forEach((item) => {
        item.classList.remove('open');
        item.querySelector('.dropdown-toggle')?.setAttribute('aria-expanded', 'false');
      });
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      document.querySelectorAll('.nav-item.open').forEach((item) => {
        item.classList.remove('open');
        item.querySelector('.dropdown-toggle')?.setAttribute('aria-expanded', 'false');
      });
      primaryNav?.classList.remove('is-open');
      menuToggle?.setAttribute('aria-expanded', 'false');
    }
  });

  const root = document.documentElement;
  let textScale = 1;
  document.querySelector('#increase-text')?.addEventListener('click', () => {
    textScale = Math.min(1.2, +(textScale + 0.05).toFixed(2));
    root.style.setProperty('--text-scale', textScale);
  });
  document.querySelector('#decrease-text')?.addEventListener('click', () => {
    textScale = Math.max(0.9, +(textScale - 0.05).toFixed(2));
    root.style.setProperty('--text-scale', textScale);
  });
  document.querySelector('#reset-text')?.addEventListener('click', () => {
    textScale = 1;
    root.style.setProperty('--text-scale', textScale);
  });

  const searchForm = document.querySelector('#site-search');
  searchForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const input = document.querySelector('#search-input');
    const query = input.value.trim().toLowerCase();
    if (!query) {
      input.focus();
      return;
    }
    const searchable = [...document.querySelectorAll('main h1, main h2, main h3, main p, main a')];
    const match = searchable.find((element) => element.textContent.toLowerCase().includes(query));
    if (match) {
      match.scrollIntoView({ behavior: 'smooth', block: 'center' });
      match.setAttribute('tabindex', '-1');
      match.focus({ preventScroll: true });
    } else {
      input.setCustomValidity('No matching content found. Try “mission”, “student”, or “space”.');
      input.reportValidity();
      input.addEventListener('input', () => input.setCustomValidity(''), { once: true });
    }
  });

  document.querySelector('#current-year').textContent = new Date().getFullYear();
})();
