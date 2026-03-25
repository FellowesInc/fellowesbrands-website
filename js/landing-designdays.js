const peekSwiper = new Swiper('.peekSwiper', {
    loop: true,
    centeredSlides: true,
    grabCursor: true,
    speed: 600,
    spaceBetween: 16,
    slideToClickedSlide: true,
    watchSlidesProgress: true,

    navigation: {
      nextEl: '.peek-slider__nav--next',
      prevEl: '.peek-slider__nav--prev'
    },

    keyboard: {
      enabled: true
    },

    breakpoints: {
      0: {
        slidesPerView: 1.4,   // active slide + skinny side previews
        spaceBetween: 8
      },
      768: {
        slidesPerView: 1.44,
        spaceBetween: 16
      }
    }
  });