

/*

USAGE:

$("#scroggle").valtech_scroggle({
  scrollSpeed: 700,
  scrollDelay: 20,
  animationDuration: 700,
  triggerElements: 'h2',
  targetElements: 'p',
  visibleOnStart: false
});

*/


(function($) {

  $.valtech = {};

  $.valtech.scroggle = function(el, options) {

    var base = this;
    base.$el = $(el);
    base.el = el;

    base.$el.data("valtech.scroggle", base);

    base.init = function() {

      base.options = $.extend({}, $.valtech.scroggle.defaultOptions, options);
      base.$targetElements = $(base.options.targetElements);
      base.$triggerElements = $(base.options.triggerElements);

      if (base.options.visibleOnStart) {
        base.showElements(false);
        base.assignInitialPositions();
      } else {
        base.assignInitialPositions();
        base.hideElements(false);
      }

      base.bindUi();

    };

    base.bindUi = function() {

      base.$triggerElements.on('click', function(e) {
        e.preventDefault();

        if (base.contentIsVisible)  {
          base.assignInitialPositions();
          base.hideElements(true);
          base.scrollUp();
        } else {
          base.$targetElements.show(false);
          base.assignInitialPositions();
          base.$targetElements.hide(false);
          base.showElements(true);
          base.scrollToElement($(this));
        }
      });

    }

    base.showElements = function(_isAnimated) {

      if (_isAnimated) {
        base.$targetElements.velocity(
          "slideDown", {
            display: "block",
            duration: base.options.animationDuration,
            easing: [.84,.22,.19,.8]
          });
      } else {
        base.$targetElements.show();
      }

      base.$el
        .removeClass('scroggle-closed')
        .addClass('scroggle-open');

      base.contentIsVisible = true;
    }

    base.hideElements = function(_isAnimated) {

      if (_isAnimated) {
        base.$targetElements.velocity(
          "slideUp", {
            display: "none",
            duration: base.options.animationDuration,
            easing: [.84,.22,.19,.8]
          });
      } else {
        base.$targetElements.hide();
      }

      base.$el
        .addClass('scroggle-closed')
        .removeClass('scroggle-open');

      base.contentIsVisible = false;
    }

    base.assignInitialPositions = function() {
      base.$triggerElements.each(function(index) {
        this.initialPosition = parseInt($(this).position().top);
      });
    }

    base.scrollToElement = function(_element) {
      $('html, body').delay(base.options.scrollDelay).animate({
        'scrollTop': $(_element)[0].initialPosition
      }, base.options.scrollSpeed);
    }

    base.scrollUp = function() {
      $('html, body').delay(base.options.scrollDelay).animate({
        'scrollTop': 0
      }, base.options.scrollSpeed);
    }

    base.init();

  };

  $.valtech.scroggle.defaultOptions = {
    scrollSpeed: 1000,
    scrollDelay: 500,
    animationDuration: 500,
    triggerElements: '.scroggle-headline',
    targetElements: '.scroggle-content',
    visibleOnStart: true,
  };

  $.fn.valtech_scroggle = function(options) {
    return this.each(function() {
      (new $.valtech.scroggle(this, options));
    });
  };

})(jQuery);

