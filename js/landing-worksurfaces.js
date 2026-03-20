document.addEventListener('DOMContentLoaded', function () {
  const switchers = document.querySelectorAll('[data-switcher]');
  const sliders = document.querySelectorAll('[data-card-slider]');
  const detailTabGroups = document.querySelectorAll('[data-detail-tabs]');
  const breakpoint = 992;

  switchers.forEach((switcher) => {
    const items = switcher.querySelectorAll('.surface-switcher__item');
    const desktopPanels = switcher.querySelectorAll('.surface-switcher__desktop-panel');

    function getTabId(item) {
      const trigger = item.querySelector('.surface-switcher__trigger');
      return trigger ? trigger.getAttribute('data-tab') : null;
    }

    function setActive(targetItem) {
      const targetTabId = getTabId(targetItem);

      items.forEach((item) => {
        const trigger = item.querySelector('.surface-switcher__trigger');
        const isActive = item === targetItem;

        item.classList.toggle('is-active', isActive);

        if (trigger) {
          trigger.setAttribute('aria-expanded', isActive ? 'true' : 'false');
          trigger.setAttribute('aria-selected', isActive ? 'true' : 'false');
        }
      });

      desktopPanels.forEach((panel) => {
        const isMatch = panel.getAttribute('data-desktop-panel') === targetTabId;
        panel.hidden = !isMatch;
      });
    }

    function clearActive() {
      items.forEach((item) => {
        const trigger = item.querySelector('.surface-switcher__trigger');

        item.classList.remove('is-active');

        if (trigger) {
          trigger.setAttribute('aria-expanded', 'false');
          trigger.setAttribute('aria-selected', 'false');
        }
      });

      desktopPanels.forEach((panel) => {
        panel.hidden = true;
      });
    }

    items.forEach((item) => {
      const trigger = item.querySelector('.surface-switcher__trigger');
      if (!trigger) return;

      trigger.addEventListener('click', function () {
        const isMobile = window.innerWidth < breakpoint;
        const isActive = item.classList.contains('is-active');

        if (isMobile) {
          if (isActive) {
            clearActive();
          } else {
            setActive(item);
          }
          return;
        }

        setActive(item);
      });
    });

    function syncOnLoadOrResize() {
      const isDesktop = window.innerWidth >= breakpoint;
      const activeItem = switcher.querySelector('.surface-switcher__item.is-active');

      if (isDesktop) {
        if (activeItem) {
          setActive(activeItem);
        } else if (items.length) {
          setActive(items[0]);
        }
      } else {
        clearActive();
      }
    }

    syncOnLoadOrResize();
    window.addEventListener('resize', syncOnLoadOrResize);
  });

  sliders.forEach(function (slider) {
    const viewport = slider.querySelector('[data-slider-viewport]');
    const slides = Array.from(slider.querySelectorAll('.mobile-card-slider__slide'));
    const prevBtn = slider.querySelector('[data-slider-prev]');
    const nextBtn = slider.querySelector('[data-slider-next]');

    if (!viewport || !slides.length) return;

    let currentIndex = 0;
    let scrollTimer = null;

    function getViewportPaddingLeft() {
      return parseFloat(window.getComputedStyle(viewport).paddingLeft) || 0;
    }

    function getSlideOffset(index) {
      return slides[index].offsetLeft - getViewportPaddingLeft();
    }

    function goToSlide(index, smooth) {
      currentIndex = Math.max(0, Math.min(index, slides.length - 1));

      viewport.scrollTo({
        left: getSlideOffset(currentIndex),
        behavior: smooth === false ? 'auto' : 'smooth'
      });

      updateButtons();
    }

    function updateButtons() {
      if (prevBtn) prevBtn.disabled = currentIndex === 0;
      if (nextBtn) nextBtn.disabled = currentIndex === slides.length - 1;
    }

    function updateIndexFromScroll() {
      let closestIndex = 0;
      let smallestDistance = Infinity;
      const currentScroll = viewport.scrollLeft;

      slides.forEach(function (slide, index) {
        const target = getSlideOffset(index);
        const distance = Math.abs(currentScroll - target);

        if (distance < smallestDistance) {
          smallestDistance = distance;
          closestIndex = index;
        }
      });

      currentIndex = closestIndex;
      updateButtons();
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        if (currentIndex > 0) {
          goToSlide(currentIndex - 1);
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        if (currentIndex < slides.length - 1) {
          goToSlide(currentIndex + 1);
        }
      });
    }

    viewport.addEventListener('scroll', function () {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(function () {
        updateIndexFromScroll();
      }, 60);
    });

    window.addEventListener('resize', function () {
      goToSlide(currentIndex, false);
    });

    goToSlide(0, false);
  });

  detailTabGroups.forEach(function (group) {
    const triggers = Array.from(group.querySelectorAll('.surface-detail-tabs__trigger'));
    const panels = Array.from(group.querySelectorAll('.surface-detail-tabs__panel'));

    if (!triggers.length || !panels.length) return;

    function setActive(tabId) {
      triggers.forEach(function (trigger) {
        const isActive = trigger.getAttribute('data-detail-tab') === tabId;
        trigger.classList.toggle('is-active', isActive);
        trigger.setAttribute('aria-selected', isActive ? 'true' : 'false');
        trigger.setAttribute('aria-expanded', isActive ? 'true' : 'false');
        trigger.setAttribute('tabindex', isActive ? '0' : '-1');
      });

      panels.forEach(function (panel) {
        const isActive = panel.getAttribute('data-detail-panel') === tabId;
        panel.classList.toggle('is-active', isActive);
        panel.hidden = !isActive;
      });
    }

    triggers.forEach(function (trigger, index) {
      trigger.addEventListener('click', function () {
        if (window.innerWidth < breakpoint) return;
        setActive(trigger.getAttribute('data-detail-tab'));
      });

      trigger.addEventListener('keydown', function (e) {
        if (window.innerWidth < breakpoint) return;

        let nextIndex = index;

        if (e.key === 'ArrowRight') {
          nextIndex = (index + 1) % triggers.length;
        } else if (e.key === 'ArrowLeft') {
          nextIndex = (index - 1 + triggers.length) % triggers.length;
        } else if (e.key === 'Home') {
          nextIndex = 0;
        } else if (e.key === 'End') {
          nextIndex = triggers.length - 1;
        } else {
          return;
        }

        e.preventDefault();
        triggers[nextIndex].focus();
        setActive(triggers[nextIndex].getAttribute('data-detail-tab'));
      });
    });

    function syncDesktopState() {
      if (window.innerWidth < breakpoint) return;

      const activeTrigger = group.querySelector('.surface-detail-tabs__trigger.is-active');
      if (activeTrigger) {
        setActive(activeTrigger.getAttribute('data-detail-tab'));
      } else {
        setActive(triggers[0].getAttribute('data-detail-tab'));
      }
    }

    syncDesktopState();
    window.addEventListener('resize', syncDesktopState);
  });
});