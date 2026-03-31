document.addEventListener('DOMContentLoaded', function () {
  const body = document.body;
  const nav = document.getElementById('fullscreen-nav');
  const headerToggle = document.querySelector('.site-header .nav-toggle');
  const overlayToggle = document.querySelector('.nav-toggle--overlay');
  const navItems = document.querySelectorAll('.nav-item.menu-item-has-children');
  const desktopMQ = window.matchMedia('(min-width: 992px)');

  let closeTimeout;

  /* ---------------------------
     Scroll Lock (unchanged)
  --------------------------- */
  function lockBodyScroll() {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    body.classList.add('nav-open');
    body.style.overflow = 'hidden';

    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }
  }

  function unlockBodyScroll() {
    body.classList.remove('nav-open');
    body.style.overflow = '';
    body.style.paddingRight = '';
  }

  /* ---------------------------
     Open / Close Nav
  --------------------------- */
  function openNav() {
    nav.classList.add('is-open');
    nav.setAttribute('aria-hidden', 'false');
    headerToggle.setAttribute('aria-expanded', 'true');
    overlayToggle.setAttribute('aria-expanded', 'true');
    lockBodyScroll();
  }

  function closeNav() {
    nav.classList.remove('is-open');
    nav.setAttribute('aria-hidden', 'true');
    headerToggle.setAttribute('aria-expanded', 'false');
    overlayToggle.setAttribute('aria-expanded', 'false');
    unlockBodyScroll();

    navItems.forEach((item) => {
      item.classList.remove('is-open', 'is-active');
      const trigger = item.querySelector('.nav-link--trigger');
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
    });
  }

  /* ---------------------------
     Mobile Behavior (unchanged)
  --------------------------- */
  function handleMobileClick(item, trigger) {
    const isOpen = item.classList.contains('is-open');

    navItems.forEach((otherItem) => {
      if (otherItem !== item) {
        otherItem.classList.remove('is-open');
        const otherTrigger = otherItem.querySelector('.nav-link--trigger');
        if (otherTrigger) {
          otherTrigger.setAttribute('aria-expanded', 'false');
        }
      }
    });

    item.classList.toggle('is-open', !isOpen);
    trigger.setAttribute('aria-expanded', String(!isOpen));
  }

  /* ---------------------------
     Desktop Behavior (UPDATED)
  --------------------------- */
  function openItem(item) {
    clearTimeout(closeTimeout);

    navItems.forEach((otherItem) => {
      if (otherItem !== item) {
        otherItem.classList.remove('is-active');
      }
    });

    item.classList.add('is-active');
  }

  function scheduleClose(item) {
    closeTimeout = setTimeout(() => {
      item.classList.remove('is-active');
    }, 120); // small delay = smoother UX
  }

  navItems.forEach((item) => {
    const trigger = item.querySelector('.nav-link--trigger');
    const submenu = item.querySelector('.nav-submenu');
    if (!trigger || !submenu) return;

    /* Mobile click */
    trigger.addEventListener('click', function (e) {
      if (!desktopMQ.matches) {
        e.preventDefault();
        handleMobileClick(item, trigger);
      }
    });

    /* Desktop hover logic */
    item.addEventListener('mouseenter', function () {
      if (desktopMQ.matches) {
        openItem(item);
      }
    });

    item.addEventListener('mouseleave', function () {
      if (desktopMQ.matches) {
        scheduleClose(item);
      }
    });

    /* 🔥 KEY ADDITION: keep open when hovering submenu */
    submenu.addEventListener('mouseenter', function () {
      if (desktopMQ.matches) {
        clearTimeout(closeTimeout);
        openItem(item);
      }
    });

    submenu.addEventListener('mouseleave', function () {
      if (desktopMQ.matches) {
        scheduleClose(item);
      }
    });

    /* Accessibility */
    trigger.addEventListener('focus', function () {
      if (desktopMQ.matches) {
        openItem(item);
      }
    });
  });

  /* ---------------------------
     Toggle buttons
  --------------------------- */
  headerToggle.addEventListener('click', function () {
    if (nav.classList.contains('is-open')) {
      closeNav();
    } else {
      openNav();
    }
  });

  overlayToggle.addEventListener('click', function () {
    closeNav();
  });

  /* ESC close */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      closeNav();
    }
  });

  /* Reset on breakpoint change */
  desktopMQ.addEventListener('change', function () {
    navItems.forEach((item) => {
      item.classList.remove('is-open', 'is-active');
      const trigger = item.querySelector('.nav-link--trigger');
      if (trigger) {
        trigger.setAttribute('aria-expanded', 'false');
      }
    });
  });
});