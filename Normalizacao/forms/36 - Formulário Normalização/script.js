
const changeThemeBtn = document.querySelector("#change-theme");
function toggleDarkMode() {
  document.body.classList.toggle("dark");
}
// Load light or dark mode
function loadTheme() {
  const darkMode = localStorage.getItem("dark");

  if (darkMode) {
    toggleDarkMode();
  }
}
loadTheme();




