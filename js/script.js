const projects = [
  {
    addClass: "php",
    title: "Online Discussion Forum",
    img: "./img/od1.png",
    githubLink: "https://github.com/codebyaarif",
    desc: `It was 
  developed using PHP in which registered 
  users can ask questions or post answers to 
  existing questions and also live chat with 
  the team of experts to clear doubts`,
  },
  {
    addClass: "javascript",
    title: "Todo App",
    img: "./img/Todo.png",
    githubLink: "https://codebyaarif.github.io/todo.github.io/",
    desc: `TODO List is the list that we generally
   use to maintain our day-to-day. 
  It is helpful in planning our daily schedules.
   We can add tasks at any time and delete a task that is completed. `,
  },
  {
    addClass: "ui",
    title: "eShop",
    img: "./img/eShop.png",
    githubLink: "https://codebyaarif.github.io/ecommerce.github.io/",
    desc: `Electronic Commerce or E-commerce is a platform for buying or selling products over the Internet.`,
  },
  {
    addClass: "php",
    title: "Library Management System",
    img: "./img/sl1.png",
    githubLink: "https://github.com/codebyaarif",
    desc: `A library 
  management system is designed & 
  developed to manage all the in-house 
  functions of a library.`,
  },
  {
    addClass: "javascript",
    title: "Calculator",
    img: "./img/Calc.png",
    githubLink: "https://github.com/codebyaarif",
    desc: `A simple calculator with HTML, CSS and JavaScript
  to perform basic math operations.`,
  },
  {
    addClass: "ui",
    title: "Starbucks",
    img: "./img/Starbucks.png",
    githubLink: "https://github.com/codebyaarif",
    desc: `A simple Starbucks Landing page built using HTML, CSS, and JavaScript.`,
  },
  ,
  {
    addClass: "ui",
    title: "Times of India",
    img: "./img/toi.png",
    githubLink: "https://github.com/codebyaarif",
    desc: `A simple Times of India clone built using HTML, CSS, and JavaScript.`,
  },
];

window.addEventListener("load", () => {
  const loader = document.getElementById("page-loader");

  if (!loader) return;

  loader.classList.add("loaded");

  setTimeout(() => {
    loader.remove();
  }, 800);
});

// ========================================
// NAVBAR ELEMENTS
// ========================================

const bar = document.getElementById("bar");
const nav = document.getElementById("nav");
const closeBar = document.getElementById("closeBar");

// ========================================
// DARK MODE
// Dark mode is ON by default
// ========================================

const dark = document.getElementById("dark");
const darkIcon = dark ? dark.querySelector("i") : null;

// Set dark mode on page load
document.body.classList.add("toggle");

if (darkIcon) {
  darkIcon.classList.remove("fa-moon");
  darkIcon.classList.add("fa-sun");
}

// Toggle dark/light mode
if (dark) {
  dark.addEventListener("click", () => {
    const isDark = document.body.classList.contains("toggle");

    if (isDark) {
      // Dark → Light
      document.body.classList.remove("toggle");

      if (darkIcon) {
        darkIcon.classList.remove("fa-sun");
        darkIcon.classList.add("fa-moon");
      }
    } else {
      // Light → Dark
      document.body.classList.add("toggle");

      if (darkIcon) {
        darkIcon.classList.remove("fa-moon");
        darkIcon.classList.add("fa-sun");
      }
    }
  });
}

// ========================================
// MOBILE NAVBAR
// ========================================

const navbar = document.getElementById("navbar");

// Open menu
if (bar && nav && navbar) {
  bar.addEventListener("click", () => {
    nav.classList.add("active");
    navbar.classList.add("menu-open");

    // Prevent page scrolling behind menu
    document.body.style.overflow = "hidden";
  });
}

// Close menu
if (closeBar && nav && navbar) {
  closeBar.addEventListener("click", () => {
    nav.classList.remove("active");
    navbar.classList.remove("menu-open");

    // Restore page scrolling
    document.body.style.overflow = "";
  });
}

// Close menu when navigation link is clicked
const navLinks = document.querySelectorAll("#nav a");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("active");
    navbar.classList.remove("menu-open");

    document.body.style.overflow = "";
  });
});

// ========================================
// PROJECT FILTER
// ========================================

const allProjects = document.querySelector("#projects");
const projectLink = document.querySelectorAll(".projectLink");
let filterChangeId = 0;

function setProjectFilter(filter) {
  const changeId = ++filterChangeId;
  const projectCards = document.querySelectorAll(".projectCard");

  projectLink.forEach((link) => {
    const isActive = link.dataset.filter === filter;
    link.classList.toggle("project-filter__item--active", isActive);
    link.setAttribute("aria-pressed", String(isActive));
  });

  projectCards.forEach((card) => {
    const isVisible = filter === "all" || card.classList.contains(filter);

    if (isVisible) {
      card.hidden = false;
      card.classList.remove("is-visible");
      window.setTimeout(
        () => {
          if (changeId !== filterChangeId) return;

          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              if (changeId === filterChangeId) {
                card.classList.add("is-visible");
              }
            });
          });
        },
        Array.from(projectCards).indexOf(card) * 45,
      );
      return;
    }

    card.classList.remove("is-visible");
    window.setTimeout(() => {
      if (changeId === filterChangeId) card.hidden = true;
    }, 350);
  });
}

projectLink.forEach((element) => {
  element.addEventListener("click", (e) => {
    setProjectFilter(e.currentTarget.dataset.filter);
  });
});

// ========================================
// GENERATE PROJECT CARDS
// ========================================

if (allProjects && typeof projects !== "undefined") {
  const fragment = document.createDocumentFragment();

  projects.forEach((element) => {
    const card = document.createElement("div");
    card.className = `projectCard ${element.addClass || ""}`;

    const imgDiv = document.createElement("div");
    imgDiv.className = "imgDiv";

    const img = document.createElement("img");
    img.src = element.img || "";
    img.alt = element.title || "";
    img.className = "img-fluid";
    imgDiv.appendChild(img);

    const descDiv = document.createElement("div");
    descDiv.className = "description";

    const h2 = document.createElement("h2");
    h2.className = "text-center";
    h2.textContent = element.title;

    const p = document.createElement("p");
    p.textContent = element.desc;

    const link = document.createElement("a");

    // Ensure link starts with http:// or https:// before assigning
    const rawLink = element.githubLink || "";
    const isSafeUrl = /^https?:\/\//i.test(rawLink);

    link.href = isSafeUrl ? rawLink : "#";
    link.className = "btn btn-secondary fs-5 px-5";
    link.textContent = "view";
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    descDiv.append(h2, p, link);
    card.append(imgDiv, descDiv);
    fragment.appendChild(card);
  });

  allProjects.innerHTML = ""; // Clear existing content
  allProjects.appendChild(fragment);
  setProjectFilter("all");
}

// ========================================
// SCROLL TO TOP BUTTON
// ========================================

const slideTop = document.querySelector(".top a");

if (slideTop) {
  slideTop.addEventListener("click", (e) => {
    e.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// ========================================
// SHOW / HIDE TOP BUTTON
// ========================================

const topButton = document.querySelector(".top");

if (topButton) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 700) {
      topButton.style.display = "block";
    } else {
      topButton.style.display = "none";
    }
  });
}

// ========================================
// MOUSE GRADIENT
// ========================================

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let currentX = mouseX;
let currentY = mouseY;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateMouseGradient() {
  const ease = 0.08;

  currentX += (mouseX - currentX) * ease;
  currentY += (mouseY - currentY) * ease;

  document.documentElement.style.setProperty("--mouseX", `${currentX}px`);

  document.documentElement.style.setProperty("--mouseY", `${currentY}px`);

  requestAnimationFrame(animateMouseGradient);
}

animateMouseGradient();

// ========================================
// AOS ANIMATION
// ========================================

AOS.init({
  duration: 1000,
});
