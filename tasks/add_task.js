document.addEventListener("DOMContentLoaded", function () {
  const allInputFields = document.querySelectorAll("input");
  let submitButton = document.querySelector(
    "form#addTaskForm button[type='submit']"
  );
  const selectedFields = document.querySelectorAll("select");
  const textArea = document.querySelector("textarea");

  submitButton.addEventListener("click", function (e) {
    e.preventDefault();

    const formData = {};
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const user = JSON.parse(localStorage.getItem("registeredUser"));

    if (!user) {
      showToast("error", "User not logged in");
      return;
    }

    for (const field of allInputFields) {
      if (field.value.trim() === "") {
        showToast("error", "Please fill all the fields");
        return;
      }
    }

    allInputFields.forEach((field) => {
      formData[field.name] = field.value.trim();
    });

    selectedFields.forEach((field) => {
      formData[field.name] = field.value.trim();
    });

    formData["description"] = textArea.value.trim();
    formData["userEmail"] = user.email;
    formData["adminEmail"] = "admin@gmail.com";
    formData["status"] = "Rejected";
    formData["taskId"] = Math.random().toString(36).slice(2, 10);

    tasks.push(formData);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    window.location.href = "../index.html";
    showToast("success", "Task added successfully");
  });
});
