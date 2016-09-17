$.fn.stars = function() {
  return $(this).each(function() {
    var val = parseFloat($(this).html());
    val = Math.round(val * 4) / 4;
    var size = Math.max(0, (Math.min(5, val))) * 16;
    var $span = $('<span />').width(size);
    $(this).html($span);
  });
};

$('#signOut').on('click', (e) => {
  e.preventDefault();
  $.ajax({
    url: '/signOut',
    method: 'GET'
  }).done((data) => {
    window.location.replace('/');
  });
});

(function() {
  $('span.stars').stars();
})();
