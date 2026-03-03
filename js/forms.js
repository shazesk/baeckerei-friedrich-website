/* ==========================================================================
   Form Validation + Mailto Submission
   ========================================================================== */
(function () {
  'use strict';

  var EMAIL_TO = 'mail@baeckereifriedrich.de';

  function validateEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

  function clearErrors(form) {
    form.querySelectorAll('.form-group').forEach(function (g) { g.classList.remove('has-error'); });
  }

  function showError(input) {
    var g = input.closest('.form-group');
    if (g) g.classList.add('has-error');
  }

  function validate(form) {
    clearErrors(form);
    var ok = true;
    form.querySelectorAll('[required]').forEach(function (el) {
      if (el.type === 'email') {
        if (!validateEmail(el.value.trim())) { showError(el); ok = false; }
      } else if (!el.value.trim()) { showError(el); ok = false; }
    });
    return ok;
  }

  // Eis Lisel inquiry form
  var eisForm = document.getElementById('eis-form');
  if (eisForm) {
    eisForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate(eisForm)) return;

      var name = eisForm.querySelector('[name="name"]').value.trim();
      var email = eisForm.querySelector('[name="email"]').value.trim();
      var event = eisForm.querySelector('[name="event"]').value;
      var date = eisForm.querySelector('[name="date"]').value;
      var guests = eisForm.querySelector('[name="guests"]').value;
      var msg = eisForm.querySelector('[name="message"]').value.trim();

      var subject = 'Eis Lisel Event-Anfrage von ' + name;
      var body = 'Name: ' + name + '\n'
        + 'E-Mail: ' + email + '\n'
        + 'Veranstaltung: ' + (event || 'Nicht angegeben') + '\n'
        + 'Datum: ' + (date || 'Nicht angegeben') + '\n'
        + 'Gäste: ' + (guests || 'Nicht angegeben') + '\n\n'
        + 'Nachricht:\n' + (msg || 'Keine Nachricht');

      window.location.href = 'mailto:' + EMAIL_TO
        + '?subject=' + encodeURIComponent(subject)
        + '&body=' + encodeURIComponent(body);
    });
  }

  // Contact form
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate(contactForm)) return;

      var fn = contactForm.querySelector('[name="firstname"]').value.trim();
      var ln = contactForm.querySelector('[name="lastname"]').value.trim();
      var email = contactForm.querySelector('[name="email"]').value.trim();
      var msg = contactForm.querySelector('[name="message"]').value.trim();

      var subject = 'Kontaktanfrage von ' + fn + ' ' + ln;
      var body = 'Name: ' + fn + ' ' + ln + '\n'
        + 'E-Mail: ' + email + '\n\n'
        + 'Nachricht:\n' + msg;

      window.location.href = 'mailto:' + EMAIL_TO
        + '?subject=' + encodeURIComponent(subject)
        + '&body=' + encodeURIComponent(body);
    });
  }
})();
