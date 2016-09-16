$(document).on('submit', '#rest-update', function(e) {
    e.preventDefault();

    const $updatedName = $('#name').val();
    const $updatedCuisine = $('#rest-cuisine').val();
    const $updatedDescription = $('#rest-description').val();
    const $updatedStreet = $('#line_1').val();
    const $updatedCity = $('#city').val();
    const $updatedState = $('#state').val();
    const $updatedZip = $('#zip').val();

    const Restaurant = {
      name: $updatedName,
      rest_cuisine: $updatedCuisine,
      rest_description: $updatedDescription
    };

    const Address = {
      line_1: $updatedStreet,
      city: $updatedCity,
      state: $updatedState,
      zip: $updatedZip
    };

    var id = window.location.pathname.split('/')[2];

    $.ajax({
      type: 'PUT',
      url: `/restaurants/${parseInt(id)}/edit-restaurant`,
      data: Restaurant, Address
    })
    .done((data) => {
      window.location.href = '/restaurants';
      location.reload();
    })
    .fail((err) => {
      console.log(err);
    });
  });
