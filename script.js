document.addEventListener("DOMContentLoaded", function () {
  const searchForm = document.querySelector(".search-form");
  const searchInput = searchForm.querySelector("input");
  const tableBody = document.querySelector("tbody");
  const undoBtn = document.getElementById("undo-button");
  const redoBtn = document.getElementById("redo-button");

  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const user = JSON.parse(localStorage.getItem("loginUser"));
  const admin = JSON.parse(localStorage.getItem("admin"));

  if (!user) {
    window.location.href = "../user_login/login.html";
    return;
  }

  displayTasks(tasks.filter((task) => task.userEmail === user.email));

  searchForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const query = searchInput.value.trim().toLowerCase();
    const filteredTasks = tasks.filter(
      (task) =>
        task.userEmail === user.email &&
        task.title.toLowerCase().includes(query)
    );
    displayTasks(filteredTasks);
  });

  function displayTasks(filteredTasks) {
    tableBody.innerHTML = "";
    filteredTasks.forEach((task, index) => {
      if (task.status === "Accepted") {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${index + 1}</td>
        <td>${task.title}</td>
        <td>${task.description}</td>
        <td>${task.assignee}</td>
        <td>${task.createDate}</td>
        <td>${task.dueDate}</td>
        <td>${task.priority}</td>
        <td>${task.status}</td>
        <td>
           <a href="./tasks/update_task.html?taskId=${
             task.taskId
           }"><i class="fa-solid fa-pen-to-square"></i></a>
             <i class="fa-solid fa-trash delete-btn" data-index="${index}"></i>
        </td>
      `;
        tableBody.appendChild(row);
      } else if (task.status === "Rejected") {
        const p = document.createElement("p");
        p.textContent = "Pending Task";
        tableBody.appendChild(p);
      }
    });

    const deleteButtons = document.querySelectorAll(".delete-btn");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const index = this.getAttribute("data-index");
        deleteTask(index);
      });
    });
  }

  function deleteTask(index) {
    const userTasks = tasks.filter((task) => task.userEmail === user.email);
    userTasks.splice(index, 1);

    // Update the main tasks array by removing the specific task
    const updatedTasks = tasks
      .filter((task) => task.userEmail !== user.email)
      .concat(userTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    displayTasks(userTasks);
    window.location.reload();
  }

  undoBtn.addEventListener("click", function () {
    window.history.back();
    showToast("success", "Activity Undo successfully");
  });
  redoBtn.addEventListener("click", function () {
    window.history.forward();
    showToast("success", "Activity restored successfully");
  });
});
