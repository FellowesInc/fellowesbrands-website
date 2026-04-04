document.addEventListener('DOMContentLoaded', function () {
  const html = document.documentElement;
  const body = document.body;
  const nav = document.getElementById('fullscreen-nav');
  const headerToggle = document.querySelector('.site-header .nav-toggle');
  const overlayToggle = document.querySelector('.nav-toggle--overlay');
  const navItems = document.querySelectorAll('.nav-item.menu-item-has-children');
  const desktopMQ = window.matchMedia('(min-width: 992px)');

  let closeTimeout;
  let mobileScrollY = 0;

  function updateScrollbarState() {
    const hasVerticalScrollbar = html.scrollHeight > window.innerHeight;
    html.classList.toggle('has-scrollbar', hasVerticalScrollbar && desktopMQ.matches);
  }

  function lockBodyScroll() {
    if (desktopMQ.matches) {
      body.classList.add('nav-open');
      body.style.overflow = 'hidden';
      body.style.paddingRight = '';
      body.style.top = '';
      body.style.width = '';
      body.classList.remove('nav-locked-mobile');
    } else {
      mobileScrollY = window.scrollY || window.pageYOffset || 0;
      body.classList.add('nav-open', 'nav-locked-mobile');
      body.style.top = `-${mobileScrollY}px`;
      body.style.overflow = '';
      body.style.paddingRight = '';
      body.style.width = '100%';
    }
  }

  function unlockBodyScroll() {
    if (body.classList.contains('nav-locked-mobile')) {
      const scrollY = Math.abs(parseInt(body.style.top || '0', 10)) || 0;

      body.classList.remove('nav-locked-mobile');
      body.classList.remove('nav-open');
      body.style.top = '';
      body.style.width = '';
      body.style.overflow = '';
      body.style.paddingRight = '';

      window.scrollTo(0, scrollY);
    } else {
      body.classList.remove('nav-open');
      body.style.overflow = '';
      body.style.paddingRight = '';
      body.style.top = '';
      body.style.width = '';
    }
  }

  function openNav() {
    updateScrollbarState();
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
    updateScrollbarState();

    navItems.forEach((item) => {
      item.classList.remove('is-open', 'is-active');
      const trigger = item.querySelector('.nav-link--trigger');
      if (trigger) {
        trigger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  updateScrollbarState();
  window.addEventListener('resize', updateScrollbarState);
  window.addEventListener('load', updateScrollbarState);

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
    }, 120);
  }

  navItems.forEach((item) => {
    const trigger = item.querySelector('.nav-link--trigger');
    const submenu = item.querySelector('.nav-submenu');
    if (!trigger || !submenu) return;

    trigger.addEventListener('click', function (e) {
      if (!desktopMQ.matches) {
        e.preventDefault();
        handleMobileClick(item, trigger);
      }
    });

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

    trigger.addEventListener('focus', function () {
      if (desktopMQ.matches) {
        openItem(item);
      }
    });
  });

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

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      closeNav();
    }
  });

  desktopMQ.addEventListener('change', function () {
    updateScrollbarState();

    navItems.forEach((item) => {
      item.classList.remove('is-open', 'is-active');
      const trigger = item.querySelector('.nav-link--trigger');
      if (trigger) {
        trigger.setAttribute('aria-expanded', 'false');
      }
    });

    if (!nav.classList.contains('is-open')) {
      unlockBodyScroll();
    }
  });
});