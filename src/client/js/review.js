(function() {
  'use strict';
  var id = $('.prev-rating').attr('rating');

  $(`#star${id}`).click();
  $('#rev-update').on('submit', function(e) {
      e.preventDefault();
      const $updatedRev = $('#updated-review').val();
      const $updatedRating = $('input[name=rating]:checked').val();

      const review = {
        content: $updatedRev,
        rating: $updatedRating
      };

      $.ajax({
        type: 'PUT',
        url: `/review/edit-review`,
        data: review
      })
      .done((data) => {
        let num = window.location.pathname.split('/')[4];
        window.location.href = `/restaurant/${num}`;
        // location.reload();
      })
      .fail((err) => {
        console.log(err);
      });
    });

}());
