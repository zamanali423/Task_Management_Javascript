document.addEventListener("DOMContentLoaded", function () {
  const allFields = document.querySelectorAll("input");
  let submitButton = document.querySelector(
    "form#loginForm button[type='submit']"
  );

  submitButton.addEventListener("click", function (e) {
    e.preventDefault();

    const formData = {};
    let email = "";
    let password = "";
    let adminEmail = "admin@gmail.com";
    let adminPassword = "admin";

    const user = JSON.parse(localStorage.getItem("registeredUser"));

    for (const field of allFields) {
      if (field.value.trim() === "") {
        showToast("error", "Please fill all the fields");
        return;
      }

      if (field.name === "email") {
        email = field.value.trim();
      } else if (field.name === "password") {
        password = field.value.trim();
      }

      formData[field.name] = field.value.trim();
    }

    if (email === adminEmail.trim() && password === adminPassword.trim()) {
      localStorage.setItem(
        "admin",
        JSON.stringify({ adminEmail, adminPassword })
      );
      showToast("success", "Login successful!");
      window.location.href = "../admin/admin.html";
      return;
    }

    if (email === user.email && password === user.password) {
      localStorage.setItem("loginUser", JSON.stringify(user));
      window.location.href = "../index.html";
      showToast("success", "Login successful!");
      console.log(formData);
    } else if (email !== user.email || password !== user.password) {
      showToast("error", "Incorrect email or password");
    } else {
      showToast("error", "Please register first");
    }
  });
});
