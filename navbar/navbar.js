document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");
  const logout = document.getElementById("logout");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  logout.addEventListener("click", () => {
    localStorage.removeItem("loginUser");
    window.location.href = "../user_login/login.html";
  });
});
