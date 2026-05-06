(function () {
  var newsroomData = {
    categories: [
      {
        id: "in-the-news",
        name: "In The News",
        articles: [
          {
            image: "https://raw.githubusercontent.com/FellowesInc/fellowesbrands-website/refs/heads/main/img/wwa-newsroom/article-placeholder-img.jpg",
            imageAlt: "Placeholder image for article",
            title: "In The News Article One",
            description: "Short description for this newsroom article.",
            postedOn: "May 1, 2026",
            url: "#",
            buttonText: "Learn More"
          },
          {
            image: "https://raw.githubusercontent.com/FellowesInc/fellowesbrands-website/refs/heads/main/img/wwa-newsroom/article-placeholder-img.jpg",
            imageAlt: "Placeholder image for article",
            title: "In The News Article Two",
            description: "Short description for this newsroom article.",
            postedOn: "April 24, 2026",
            url: "#",
            buttonText: "Learn More"
          },
          {
            image: "https://raw.githubusercontent.com/FellowesInc/fellowesbrands-website/refs/heads/main/img/wwa-newsroom/article-placeholder-img.jpg",
            imageAlt: "Placeholder image for article",
            title: "In The News Article Three",
            description: "Short description for this newsroom article.",
            postedOn: "April 15, 2026",
            url: "#",
            buttonText: "Learn More"
          },
          {
            image: "https://raw.githubusercontent.com/FellowesInc/fellowesbrands-website/refs/heads/main/img/wwa-newsroom/article-placeholder-img.jpg",
            imageAlt: "Placeholder image for article",
            title: "In The News Article Four",
            description: "Short description for this newsroom article.",
            postedOn: "April 2, 2026",
            url: "#",
            buttonText: "Learn More"
          }
        ]
      },
      {
        id: "press-room",
        name: "Press Room",
        articles: [
          {
            image: "https://raw.githubusercontent.com/FellowesInc/fellowesbrands-website/refs/heads/main/img/wwa-newsroom/article-placeholder-img.jpg",
            imageAlt: "Placeholder image for article",
            title: "Press Room Article One",
            description: "Short description for this press room article.",
            postedOn: "May 3, 2026",
            url: "#",
            buttonText: "Learn More"
          },
          {
            image: "https://raw.githubusercontent.com/FellowesInc/fellowesbrands-website/refs/heads/main/img/wwa-newsroom/article-placeholder-img.jpg",
            imageAlt: "Placeholder image for article",
            title: "Press Room Article Two",
            description: "Short description for this press room article.",
            postedOn: "April 28, 2026",
            url: "#",
            buttonText: "Learn More"
          },
          {
            image: "https://raw.githubusercontent.com/FellowesInc/fellowesbrands-website/refs/heads/main/img/wwa-newsroom/article-placeholder-img.jpg",
            imageAlt: "Placeholder image for article",
            title: "Press Room Article Three",
            description: "Short description for this press room article.",
            postedOn: "April 18, 2026",
            url: "#",
            buttonText: "Learn More"
          },
          {
            image: "https://raw.githubusercontent.com/FellowesInc/fellowesbrands-website/refs/heads/main/img/wwa-newsroom/article-placeholder-img.jpg",
            imageAlt: "Placeholder image for article",
            title: "Press Room Article Four",
            description: "Short description for this press room article.",
            postedOn: "April 8, 2026",
            url: "#",
            buttonText: "Learn More"
          }
        ]
      }
    ]
  };

  function NewsroomViewModel(data) {
    this.categories = ko.observableArray(data.categories);
  }

  $(function () {
    var newsroomEl = document.querySelector(".newsroom-template");

    if (newsroomEl) {
      ko.applyBindings(new NewsroomViewModel(newsroomData), newsroomEl);
    }
  });
})();