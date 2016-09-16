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
  });
});
