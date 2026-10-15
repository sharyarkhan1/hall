(function () {
  var form = document.querySelector("[data-contact-form]");
  if (!form) return;

  var success = form.querySelector(".contact-premium__success");
  var fields = form.querySelectorAll("input, select, textarea");

  function markInvalid(el) {
    el.classList.toggle("is-invalid", !el.checkValidity());
  }

  fields.forEach(function (el) {
    el.addEventListener("blur", function () {
      if (el.value || el.classList.contains("is-invalid")) markInvalid(el);
    });
    el.addEventListener("input", function () {
      if (el.classList.contains("is-invalid")) markInvalid(el);
    });
    el.addEventListener("change", function () {
      if (el.classList.contains("is-invalid")) markInvalid(el);
    });
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var valid = true;

    fields.forEach(function (el) {
      markInvalid(el);
      if (!el.checkValidity()) valid = false;
    });

    if (!valid) {
      var first = form.querySelector(".is-invalid");
      if (first) first.focus();
      return;
    }

    form.classList.add("is-sent");
    if (success) {
      success.hidden = false;
      success.focus();
    }
  });
})();
