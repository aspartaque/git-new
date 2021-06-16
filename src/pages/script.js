$(document).ready(function($) {
    var $window = $(window), $element = $('.block__ads-row');

    function resize() {
      if ($window.width() < 414) {
        return $element.addClass('owl-carousel').removeClass('block__ads-row');
      }
      $element.removeClass('owl-carousel');
    }

    $window.resize(resize).trigger('resize');
});
$(document).ready(function($) {
    var $window = $(window), $element = $('.block__ads-card');

    function resize() {
      if ($window.width() < 414) {
        return $element.addClass('item').removeClass('block__ads-card');
      }
      $element.removeClass('item');
    }

    $window.resize(resize).trigger('resize');
});
