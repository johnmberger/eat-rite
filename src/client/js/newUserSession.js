
window.onload = function() {
    console.log('on the new user session js page!!!!');
    // If sessionStorage is storing default values (ex. name), exit the function and do not restore data
    if (sessionStorage.getItem('name') === 'name') {
      return;
    }

    // If values are not blank, restore them to the fields
    var firstName = sessionStorage.getItem('first_name');
    if (firstName !== null) $('.first_name').val(firstName);

    var lastName = sessionStorage.getItem('last_name');
    if (lastName !== null) $('.last_name').val(lastName);

    var email = sessionStorage.getItem('email');
    if (email !== null) $('.email').val(email);
  };

// Before refreshing the page, save the form data to sessionStorage
window.onbeforeunload = function() {
      sessionStorage.setItem('first_name', $('.first_name').val());
      sessionStorage.setItem('last_name', $('.last_name').val());
      sessionStorage.setItem('email', $('.email').val());
    };
