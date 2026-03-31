$(window).on('load', function () {
  console.log("Core JavaScript is Firing");

  // Custom Dynamic Copywrite Date JS
  var footerCopyRight = document.getElementById('copyright-year');
  if (footerCopyRight) {
    var date = new Date();
    var year = date.getFullYear();

    footerCopyRight.innerHTML = year;
  }
  // Custom Footer JS Ends

  // Custom Site-wide HTML 5 Video JS
  // Autoplay videos start at halfway visible instead of touching the bottom of the browser
  window.addEventListener('load', videoScroll);
  window.addEventListener('scroll', videoScroll);

  function videoScroll() {
    if (document.querySelectorAll('video[autoplay]').length > 0) {
      var windowHeight = window.innerHeight,
        videoEl = document.querySelectorAll('video[autoplay]');

      for (var i = 0; i < videoEl.length; i++) {
        var thisVideoEl = videoEl[i],
          videoHeight = thisVideoEl.clientHeight,
          videoClientRect = thisVideoEl.getBoundingClientRect().top;

        if (videoClientRect <= windowHeight - videoHeight * 0.5 && videoClientRect >= 0 - videoHeight * 0.5) {
          thisVideoEl.play();
        } else {
          thisVideoEl.pause();
        }
      }
    }
  }
  // If embedded video is set to autoplay, this also adds playsinline for safari
  if (document.querySelectorAll('video[autoplay]').length > 0) {
    videoAutoP = document.querySelectorAll('video[autoplay]');

    for (var vidAP = 0; vidAP < videoAutoP.length; vidAP++) {
      var thisVidAP = videoAutoP[vidAP];
      thisVidAP.setAttribute('playsinline', '');
    }
  }

  $('.modal').on('show.bs.modal', function (e) {
    var $vPlay = $(e.delegateTarget).find('video');
    if ($vPlay.length == 1) {
      $vPlay[0].play(); // use [0] because jQuery returns a list
    }
  });

  $('.modal').on('hide.bs.modal', function (e) {
    var $vPause = $(e.delegateTarget).find('video');
    if ($vPause.length == 1) {
      $vPause[0].pause(); // use [0] because jQuery returns a list
    }
  });
});