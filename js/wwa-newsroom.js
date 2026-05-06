$(window).on("load", function () {
  var $newsroomTabs = $("[data-newsroom-tabs]");

  if (!$newsroomTabs.length) return;

  $newsroomTabs.each(function () {
    var $component = $(this);
    var $tabs = $component.find("[data-newsroom-tab]");
    var $panels = $component.find("[data-newsroom-panel]");

    if (!$tabs.length || !$panels.length) return;

    function activateTab(categoryId) {
      $tabs.each(function () {
        var $tab = $(this);
        var isActive = $tab.attr("data-newsroom-tab") === categoryId;

        $tab
          .toggleClass("is-active", isActive)
          .attr("aria-selected", isActive ? "true" : "false")
          .attr("tabindex", isActive ? "0" : "-1");
      });

      $panels.each(function () {
        var $panel = $(this);
        var isActive = $panel.attr("data-newsroom-panel") === categoryId;

        $panel.prop("hidden", !isActive);
      });
    }

    $tabs.on("click", function () {
      activateTab($(this).attr("data-newsroom-tab"));
    });

    $tabs.on("keydown", function (event) {
      var currentIndex = $tabs.index(this);
      var nextIndex = null;

      if (event.key === "ArrowRight") {
        nextIndex = currentIndex + 1 >= $tabs.length ? 0 : currentIndex + 1;
      }

      if (event.key === "ArrowLeft") {
        nextIndex = currentIndex - 1 < 0 ? $tabs.length - 1 : currentIndex - 1;
      }

      if (event.key === "Home") {
        nextIndex = 0;
      }

      if (event.key === "End") {
        nextIndex = $tabs.length - 1;
      }

      if (nextIndex !== null) {
        event.preventDefault();

        var $nextTab = $tabs.eq(nextIndex);
        var nextCategoryId = $nextTab.attr("data-newsroom-tab");

        activateTab(nextCategoryId);
        $nextTab.focus();
      }
    });

    activateTab($tabs.first().attr("data-newsroom-tab"));
  });
});