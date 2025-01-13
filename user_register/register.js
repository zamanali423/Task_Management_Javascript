document.addEventListener("DOMContentLoaded", function () {
  let allFields = document.querySelectorAll("input");
  let submitButton = document.querySelector(
    "form#registerForm button[type='submit']"
  );

  submitButton.addEventListener("click", function (e) {
    e.preventDefault();

    let formData = {};
    let password = "";
    let confirmPassword = "";

    for (let field of allFields) {
      if (field.value.trim() === "") {
        showToast("error", "Please fill all the fields");
        return;
      }

      if (field.name === "password") {
        password = field.value;
      } else if (field.name === "confirm_password") {
        confirmPassword = field.value;
      }

      formData[field.name] = field.value;
    }

    if (password !== confirmPassword) {
      showToast("error", "Passwords do not match");
      return;
    }

    localStorage.setItem("registeredUser", JSON.stringify(formData));
    window.location.href = "../user_login/login.html";
    showToast("success", "Registration successful!");
  });
});
