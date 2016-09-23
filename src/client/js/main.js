$.fn.stars = function() {
  return $(this).each(function() {
    var val = parseFloat($(this).html());
    val = Math.round(val * 4) / 4;
    var size = Math.max(0, (Math.min(5, val))) * 16;
    var $span = $('<span />').width(size);
    $(this).html($span);
  });
};

$(document).ready(function () {
  $('.navbar-toggle').on('click', function () {
    $(this).toggleClass('active');
  });
});

(function() {
  $('span.stars').stars();
})();

$('#signOut').on('click', (e) => {
  e.preventDefault();
  $.ajax({
    url: '/signOut',
    method: 'GET'
  }).done((data) => {
    window.location.replace('/');
  });
});

$(document).on('click', '#delete-restaurant', function() {

  const answer = confirm('Are you sure? This can\'t be undone');

  if (answer) {
    const restaurantID = $(this).attr('data-id');
    $.ajax({
      type: 'DELETE',
      url: `/restaurant/${restaurantID}/delete`
    })
    .done((data) => {
      window.location.href = '/restaurants';
    })
    .fail((err) => {
      console.log(err);
    });
  }
});

$(document).on('click', '#delete-employee', function() {
  const answer = confirm('Are you sure? This can\'t be undone');
  if (answer) {
    const employeeID = $(this).attr('data-id');
    $.ajax({
      type: 'DELETE',
      url: `/restaurant/delete-employee/${employeeID}`
    })
    .done((data) => {
      window.location.reload();
    })
    .fail((err) => {
      console.log(err);
    });
  }
});
