$('#updateEmployee').on('click', (e) => {
  e.preventDefault();
  const $restID = $('#restID').val();
  const first_name = $('#firstName').val();
  const last_name = $('#lastName').val();
  const role = $('#role').val();
  const id = $('#id').val();
  const payload = {
    id,
    first_name,
    last_name,
    role
  };
  $.ajax({
    url: `/restaurant/${$restID}/edit-employee/${id}`,
    method: 'PUT',
    data: payload
  }).done(() => {
    window.location.href = document.referrer;
  });
});
