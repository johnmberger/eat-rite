$(document).on('click', '#delete-restaurant', function() {

  const answer = confirm('Are you sure? This can\'t be undone');

  if (answer) {
    const restaurantID = $(this).attr('data-id');
    // delete restaurant
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
