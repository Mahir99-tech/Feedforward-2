window.addEventListener('DOMContentLoaded', function () {
  var signupForms = document.querySelectorAll('#donor-signup-form, #foodbank-signup-form');
  var loginForms = document.querySelectorAll('.login-form');

  signupForms.forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      var passwordField = form.querySelector('input[name="new-password"]');
      var confirmField = form.querySelector('input[name="confirm-password"]');

      if (passwordField && confirmField && passwordField.value !== confirmField.value) {
        alert('Passwords do not match. Please try again.');
        return;
      }

      alert('Account created in the prototype. In the full version, this data would be saved in the database.');
      form.reset();
    });
  });

  loginForms.forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      alert('Login clicked. This prototype does not connect to a real database yet.');
      form.reset();
    });
  });
});