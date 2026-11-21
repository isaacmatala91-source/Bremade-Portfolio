const BREMADE_WHATSAPP = "260760503672";
const BREMADE_EMAIL = "Bremadeatelier91@gmail.com";

const projects = [
  // === ALARMY INNOVATIONS (NUM 1 -> NUM 3) ===
  {
    title: "Alarmy Innovations — Social Media Designs",
    category: "social",
    categoryLabel: "Social & Print",
    image: "images/Alarmy Social media designsnum1.png",
    description: "Social media campaign graphics crafted for Alarmy Innovations."
  },
  {
    title: "Alarmy Innovations — Visual Showcase",
    category: "product",
    categoryLabel: "Product & Packaging",
    image: "images/alarmy num2.png",
    description: "Commercial product and brand showcase visual for Alarmy Innovations."
  },
  {
    title: "Alarmy Innovations — Services Poster",
    category: "social",
    categoryLabel: "Social & Print",
    image: "images/Alarmy SERVICES POSTER num3.png",
    description: "Informational services poster designed for Alarmy Innovations."
  },

  // === CASH FIRST ===
  {
    title: "Cash First — Dual Logo Concepts",
    category: "branding",
    categoryLabel: "Brand Identity",
    image: "images/cash first two logo.png",
    description: "Primary and secondary brand mark explorations crafted for Cash First."
  },
  {
    title: "Cash First — Primary Logo Mark",
    category: "branding",
    categoryLabel: "Brand Identity",
    image: "images/cash logo1.png",
    description: "Clean geometric brand emblem designed for strong recall across digital and print."
  },
  {
    title: "Cash First — Color System",
    category: "branding",
    categoryLabel: "Brand Identity",
    image: "images/cash fist color palette.png",
    description: "Curated brand color palette establishing contrast, hierarchy, and visual consistency."
  },
  {
    title: "Cash First — Typography System",
    category: "branding",
    categoryLabel: "Brand Identity",
    image: "images/cash fist font use.png",
    description: "Type pairing and usage rules applied across headings, UI, and brand touchpoints."
  },
  {
    title: "Cash First — Promotional Flyer",
    category: "social",
    categoryLabel: "Social & Print",
    image: "images/CASH fist flyer.png",
    description: "High-impact campaign flyer designed to communicate key offers clearly."
  }
];

const grid = document.getElementById("portfolio-grid");
const filterBtns = document.querySelectorAll(".nav-btn");
const navLinks = document.querySelectorAll(".nav-link");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("sidebar-overlay");
const menuToggle = document.getElementById("menu-toggle");
const sidebarClose = document.getElementById("sidebar-close");

function toggleSidebar(forceState) {
  if (!sidebar || !overlay) return;
  const shouldOpen = typeof forceState === "boolean" ? forceState : !sidebar.classList.contains("open");
  sidebar.classList.toggle("open", shouldOpen);
  overlay.classList.toggle("open", shouldOpen);
}

if (menuToggle) menuToggle.addEventListener("click", () => toggleSidebar(true));
if (sidebarClose) sidebarClose.addEventListener("click", () => toggleSidebar(false));
if (overlay) overlay.addEventListener("click", () => toggleSidebar(false));

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navLinks.forEach(l => l.classList.remove("active"));
    link.classList.add("active");
    toggleSidebar(false);
  });
});

const sidebarHireBtn = document.querySelector(".sidebar-hire-btn");
if (sidebarHireBtn) {
  sidebarHireBtn.addEventListener("click", () => toggleSidebar(false));
}

function renderProjects(filter = "all") {
  if (!grid) return;
  grid.innerHTML = "";
  const filtered = filter === "all" ? projects : projects.filter(p => p.category === filter);

  filtered.forEach(project => {
    const safeSrc = encodeURI(project.image);
    const card = document.createElement("article");
    card.className = "project-card";
    card.innerHTML = `
      <img src="${safeSrc}" alt="${project.title}" loading="lazy" />
      <div class="card-body">
        <span class="badge">${project.categoryLabel}</span>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
      </div>
    `;
    card.addEventListener("click", () => openModal({ ...project, image: safeSrc }));
    grid.appendChild(card);
  });
}

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderProjects(btn.dataset.filter);
    toggleSidebar(false);
    const workEl = document.getElementById("work");
    if (workEl) workEl.scrollIntoView({ behavior: "smooth" });
  });
});

// Theme Toggle (Light Mode Default -> Dark Mode Blue Palette)
const themeToggleBtn = document.getElementById("theme-toggle");
const sunIcon = document.querySelector(".sun-icon");
const moonIcon = document.querySelector(".moon-icon");
const themeText = document.getElementById("theme-text");

if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", () => {
    const isLight = document.body.classList.contains("light-theme");
    if (isLight) {
      document.body.classList.remove("light-theme");
      document.body.classList.add("dark-theme");
      if (moonIcon) moonIcon.style.display = "none";
      if (sunIcon) sunIcon.style.display = "inline-block";
      if (themeText) themeText.textContent = "Light Mode";
    } else {
      document.body.classList.remove("dark-theme");
      document.body.classList.add("light-theme");
      if (sunIcon) sunIcon.style.display = "none";
      if (moonIcon) moonIcon.style.display = "inline-block";
      if (themeText) themeText.textContent = "Dark Mode";
    }
  });
}

// Modal Preview
const modal = document.getElementById("project-modal");
function openModal(project) {
  if (!modal) return;
  document.getElementById("modal-img").src = project.image;
  document.getElementById("modal-category").textContent = project.categoryLabel;
  document.getElementById("modal-title").textContent = project.title;
  document.getElementById("modal-desc").textContent = project.description;
  modal.classList.add("open");
}

const closeModalBtn = document.getElementById("close-modal");
if (closeModalBtn) closeModalBtn.addEventListener("click", () => modal.classList.remove("open"));
if (modal) modal.addEventListener("click", e => { if (e.target === modal) modal.classList.remove("open"); });

// WhatsApp & Email Brief Actions
function buildBriefMessage() {
  const service = document.getElementById("service-select").value;
  const name = document.getElementById("client-name").value.trim() || "A prospective client";
  const brief = document.getElementById("project-brief").value.trim() || "I would like to discuss a design project.";
  return `Hi Bremade! My name is ${name}.\n\n*Service:* ${service}\n*Brief:* ${brief}`;
}

const sendWhatsappBtn = document.getElementById("send-whatsapp");
if (sendWhatsappBtn) {
  sendWhatsappBtn.addEventListener("click", () => {
    const text = encodeURIComponent(buildBriefMessage());
    window.open(`https://wa.me/${BREMADE_WHATSAPP}?text=${text}`, "_blank");
  });
}

const sendEmailBtn = document.getElementById("send-email");
if (sendEmailBtn) {
  sendEmailBtn.addEventListener("click", () => {
    const service = document.getElementById("service-select").value;
    const subject = encodeURIComponent(`Bremade Project Inquiry: ${service}`);
    const body = encodeURIComponent(buildBriefMessage());
    window.location.href = `mailto:${BREMADE_EMAIL}?subject=${subject}&body=${body}`;
  });
}

// Deter casual right-click saving on images
document.addEventListener("contextmenu", (e) => {
  if (e.target && e.target.tagName === "IMG") {
    e.preventDefault();
  }
});

renderProjects();
