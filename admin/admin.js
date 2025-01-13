document.addEventListener("DOMContentLoaded", function () {
  const searchForm = document.querySelector(".search-form");
  const searchInput = searchForm.querySelector("input");
  const tableBody = document.querySelector("tbody");

  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const user = JSON.parse(localStorage.getItem("admin"));

  if (user) {
    displayTasks(tasks.filter((task) => task.adminEmail === user.adminEmail));
  } else {
    window.location.href = "../user_login/login.html";
  }

  searchForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const query = searchInput.value.trim().toLowerCase();
    const filteredTasks = tasks.filter(
      (task) =>
        task.adminEmail === user.adminEmail &&
        task.title.toLowerCase().includes(query)
    );
    displayTasks(filteredTasks);
  });

  function displayTasks(filteredTasks) {
    tableBody.innerHTML = "";
    filteredTasks.forEach((task, index) => {
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
            <button class="reject-btn">Reject</button>
            <button class="approve-btn">Accept</button>
          </td>
        `;
      tableBody.appendChild(row);
    });

    addApproval();
  }

  function addApproval() {
    const acceptBtns = document.querySelectorAll(".approve-btn");
    const rejectBtns = document.querySelectorAll(".reject-btn");

    acceptBtns.forEach((button, index) => {
      button.addEventListener("click", function () {
        updateTaskStatus(index, "Accepted");
        showToast("success", "Approval granted successfully");
      });
    });

    rejectBtns.forEach((button, index) => {
      button.addEventListener("click", function () {
        updateTaskStatus(index, "Rejected");
        showToast("success", "Approval rejected successfully");
      });
    });
  }

  function updateTaskStatus(index, status) {
    tasks[index].status = status;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks(tasks.filter((task) => task.adminEmail === user.adminEmail));
  }
});
