// js/main.js — basic interactivity for portfolio
document.addEventListener("DOMContentLoaded", () => {
  console.log("Portfolio page loaded successfully.");
  
  // Example: smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth"
      });
    });
  });
});
