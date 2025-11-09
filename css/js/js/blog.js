// js/blog.js — render blog posts dynamically
document.addEventListener("DOMContentLoaded", () => {
  const blogContainer = document.getElementById("blog-posts");
  if (!blogContainer) return;

  const posts = [
    {
      title: "Healthy Living for Busy Doctors",
      date: "Nov 2025",
      image: "assets/images/blog1.jpg",
      content: "Quick daily practices to balance your clinical and personal wellbeing."
    },
    {
      title: "Research, Patients, and Purpose",
      date: "Oct 2025",
      image: "assets/images/blog2.jpg",
      content: "Reflections from my time at Mayo Clinic on patient-centered innovation."
    }
  ];

  blogContainer.innerHTML = posts.map(post => `
    <div class="blog-card">
      <img src="${post.image}" alt="${post.title}">
      <div class="blog-info">
        <h3>${post.title}</h3>
        <p class="date">${post.date}</p>
        <p>${post.content}</p>
      </div>
    </div>
  `).join("");
});
