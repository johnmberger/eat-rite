$('#signIn').on('click', (e) => {
  e.preventDefault();
  const email = $('#email').val();
  const password = $('#password').val();
  const payload = {
    email: email,
    password: password
  };
  $.ajax({
    url: '/signIn',
    method: 'POST',
    data: payload
  }).done((data) => {
    if (data.message) {
      if (document.referrer.includes('newuser')) {
        window.location.href = '/';
      } else {
        window.location.href = document.referrer;
      }
    } else {
      $('#password').val('');
      $('#error').html(`<div>${data.error}</div>`);
    }
  });
});
