document.addEventListener("DOMContentLoaded", function () {
  const allInputFields = document.querySelectorAll("input");
  let submitButton = document.querySelector(
    "form#updateTaskForm button[type='submit']"
  );
  const selectedFields = document.querySelectorAll("select");
  const textArea = document.querySelector("textarea");

  const urlParams = new URLSearchParams(window.location.search);
  const taskId = urlParams.get("taskId");
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  console.log("task id", taskId);

  if (taskId !== null) {
    populateUpdateForm(taskId);
  }

  function populateUpdateForm(taskId) {
    const task = tasks.find((task) => task.taskId === taskId);
    if (task) {
      document.querySelector("input[name='title']").value = task.title;
      document.querySelector("textarea[name='description']").value =
        task.description;
      document.querySelector("input[name='assignee']").value = task.assignee;
      document.querySelector("input[name='createDate']").value =
        task.createDate;
      document.querySelector("input[name='dueDate']").value = task.dueDate;
      document.querySelector("select[name='priority']").value = task.priority;
      document.querySelector("select[name='status']").value = task.status;
    }
  }

  submitButton.addEventListener("click", function (e) {
    e.preventDefault();

    const formData = {};
    const user = JSON.parse(localStorage.getItem("registeredUser"));

    if (!user) {
      showToast("error", "User not logged in");
      return;
    }

    allInputFields.forEach((field) => {
      formData[field.name] = field.value.trim();
    });

    selectedFields.forEach((field) => {
      formData[field.name] = field.value.trim();
    });

    formData["description"] = textArea.value.trim();
    formData["userEmail"] = user.email;

    if (taskId !== null) {
      const taskIndex = tasks.findIndex((task) => task.taskId === taskId);
      if (taskIndex !== -1) {
        tasks[taskIndex] = { ...tasks[taskIndex], ...formData };
        showToast("success", "Task updated successfully");
      }
    } else {
      formData["taskId"] = Math.random().toString(36).slice(2, 10);
      tasks.push(formData);
      showToast("success", "Task added successfully");
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));
    window.location.href = "../index.html";
  });
});
