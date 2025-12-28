document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".sidebar .nav-link");
  const path  = location.pathname;

  links.forEach(link => {
    if (link.getAttribute("href") && path.startsWith(link.getAttribute("href"))) {
      links.forEach(l => l.classList.remove("active")); // remove old active
      link.classList.add("active"); // set new active
    }
  });
});