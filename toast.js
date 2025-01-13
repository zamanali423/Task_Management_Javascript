document.addEventListener("DOMContentLoaded", () => {
  const notifications = document.querySelector(".notifications");

  const toastIcons = {
    success: "fa-circle-check",
    error: "fa-circle-xmark",
    warning: "fa-triangle-exclamation",
    info: "fa-circle-info",
  };

  const createToast = (type, message) => {
    const iconClass = toastIcons[type] || "fa-info-circle";
    const toast = document.createElement("li");
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <div class="column">
        <i class="fa-solid ${iconClass}"></i>
        <span>${message}</span>
      </div>
      <i class="fa-solid fa-xmark" onclick="removeToast(this.parentElement)"></i>`;
    notifications.appendChild(toast);
    setTimeout(() => removeToast(toast), 3000);
  };

  window.showToast = (type, message) => {
    createToast(type, message);
  };

  window.removeToast = (toast) => {
    toast.classList.add("hide");
    setTimeout(() => toast.remove(), 500);
  };
});
