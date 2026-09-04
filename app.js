/* RepoForge — catalog app (vanilla JS, no build step) */
"use strict";

let REPOS = [];
let TAXONOMY = null;

/* ---------- data ---------- */
async function loadData() {
  const [reposRes, taxRes] = await Promise.all([
    fetch("data/repos.json"),
    fetch("data/taxonomy.json"),
  ]);
  REPOS = await reposRes.json();
  TAXONOMY = await taxRes.json();

  document.getElementById("stat-repos").textContent = REPOS.length;
  document.getElementById("stat-niches").textContent = TAXONOMY.total_niches;
  document.getElementById("stat-fields").textContent = TAXONOMY.fields.length;
  document.getElementById("stat-ideas").textContent = (REPOS.length * 3) + "+";
  document.getElementById("footer-count").textContent = REPOS.length;

  // populate field filter
  const fieldSel = document.getElementById("filter-field");
  const fields = [...new Set(REPOS.map((r) => r.field))].sort();
  fields.forEach((f) => {
    const o = document.createElement("option");
    o.value = f;
    o.textContent = f;
    fieldSel.appendChild(o);
  });

  renderGrid(REPOS);
  renderNicheMap();
}

/* ---------- formatting ---------- */
const fmtStars = (n) => (n >= 1000 ? (n / 1000).toFixed(n >= 10000 ? 0 : 1) + "k ⭐" : n + " ⭐");

/* ---------- grid ---------- */
function repoCard(r) {
  const lic = r.license_safe
    ? '<span class="badge badge-safe">🟢 ' + esc(r.license.slice(0, 22)) + "</span>"
    : '<span class="badge badge-caution">🔴 ' + esc(r.license.slice(0, 22)) + "</span>";
  return (
    '<div class="card" data-name="' + esc(r.name) + '">' +
      '<div class="card-top"><div class="card-name">' + esc(r.name) + "</div>" +
      '<div class="card-stars">' + fmtStars(r.stars) + "</div></div>" +
      '<div class="card-badges">' +
        '<span class="badge badge-field">' + esc(r.field) + "</span>" +
        lic +
        '<span class="badge">' + esc(r.difficulty) + "</span>" +
      "</div>" +
      '<div class="card-desc">' + esc(r.description) + "</div>" +
      '<div class="card-cta">View Step-by-Step Guide →</div>' +
    "</div>"
  );
}

function renderGrid(list) {
  document.getElementById("count-shown").textContent = list.length;
  const grid = document.getElementById("grid");
  grid.innerHTML = list.map(repoCard).join("");
  document.getElementById("empty").hidden = list.length > 0;
}

/* ---------- filter + search ---------- */
function currentFilter() {
  const q = document.getElementById("search").value.trim().toLowerCase();
  const field = document.getElementById("filter-field").value;
  const license = document.getElementById("filter-license").value;
  const difficulty = document.getElementById("filter-difficulty").value;
  const sort = document.getElementById("sort").value;

  let list = REPOS.filter((r) => {
    if (field && r.field !== field) return false;
    if (license === "safe" && !r.license_safe) return false;
    if (license === "caution" && r.license_safe) return false;
    if (difficulty && r.difficulty !== difficulty) return false;
    if (q) {
      const hay = (r.name + " " + r.field + " " + r.category + " " + r.description + " " + r.buyer_idea + " " + r.first_idea).toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  list.sort((a, b) => (sort === "name" ? a.name.localeCompare(b.name) : b.stars - a.stars));
  renderGrid(list);
}

/* ---------- niche map ---------- */
function renderNicheMap() {
  const covered = new Set(REPOS.map((r) => r.category.toLowerCase()));
  const wrap = document.getElementById("fields-grid");
  wrap.innerHTML = TAXONOMY.fields
    .map((f) => {
      const niches = f.niches
        .map((n) => {
          const isCov = covered.has(n.niche.toLowerCase());
          return '<span class="niche ' + (isCov ? "niche-covered" : "niche-todo") + '">' + esc(n.niche) + "</span>";
        })
        .join("");
      const done = f.niches.filter((n) => covered.has(n.niche.toLowerCase())).length;
      return (
        '<div class="field-card">' +
          '<div class="field-head"><div class="field-name">' + esc(f.field) + "</div>" +
          '<div class="field-count">' + done + "/" + f.count + " covered</div></div>" +
          '<div class="field-niches">' + niches + "</div>" +
        "</div>"
      );
    })
    .join("");
}

/* ---------- markdown-lite renderer ---------- */
function esc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function inline(s) {
  return s
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+?)`/g, "<code>$1</code>");
}

function renderGuide(md) {
  const lines = md.split("\n");
  let html = "", inCode = false, inList = null;
  for (let line of lines) {
    if (line.trim().startsWith("```")) {
      if (inCode) { html += "</code></pre>"; inCode = false; }
      else { html += "<pre><code>"; inCode = true; }
      continue;
    }
    if (inCode) { html += esc(line) + "\n"; continue; }
    const t = line.trim();
    if (!t) { if (inList) { html += "</" + inList + ">"; inList = null; } continue; }
    if (t.startsWith("### ")) { if (inList) { html += "</" + inList + ">"; inList = null; } html += "<h3>" + inline(esc(t.slice(4))) + "</h3>"; continue; }
    if (t.startsWith("## ")) { if (inList) { html += "</" + inList + ">"; inList = null; } html += "<h2>" + inline(esc(t.slice(3))) + "</h2>"; continue; }
    if (t.startsWith("# ")) { if (inList) { html += "</" + inList + ">"; inList = null; } html += "<h1>" + inline(esc(t.slice(2))) + "</h1>"; continue; }
    if (t === "---") { if (inList) { html += "</" + inList + ">"; inList = null; } html += "<hr/>"; continue; }
    if (t.startsWith("|")) { if (inList) { html += "</" + inList + ">"; inList = null; }
      const cells = t.split("|").slice(1, -1).map((c) => c.trim());
      if (cells.every((c) => /^-+$/.test(c.replace(/ /g, "")))) continue;
      const isHead = t.toLowerCase().includes("| item |") || t.toLowerCase().includes("| tool |");
      const tag = isHead ? "th" : "td";
      html += "<tr>" + cells.map((c) => "<" + tag + ">" + inline(esc(c)) + "</" + tag + ">").join("") + "</tr>";
      continue; }
    if (/^\d+\.\s/.test(t)) {
      if (inList !== "ol") { if (inList) html += "</" + inList + ">"; html += "<ol>"; inList = "ol"; }
      html += "<li>" + inline(esc(t.replace(/^\d+\.\s/, ""))) + "</li>"; continue;
    }
    if (t.startsWith("- ")) {
      if (inList !== "ul") { if (inList) html += "</" + inList + ">"; html += "<ul>"; inList = "ul"; }
      html += "<li>" + inline(esc(t.slice(2))) + "</li>"; continue;
    }
    if (inList) { html += "</" + inList + ">"; inList = null; }
    html += "<p>" + inline(esc(t)) + "</p>";
  }
  if (inList) html += "</" + inList + ">";
  if (inCode) html += "</code></pre>";
  // wrap orphan table rows
  html = html.replace(/(<tr>.*?<\/tr>)(?!.*?<table>)/s, (m) => m);
  html = html.replace(/((?:<tr>.*?<\/tr>\s*)+)/gs, "<table>$1</table>");
  return html;
}

/* ---------- modal ---------- */
function openRepo(name) {
  const r = REPOS.find((x) => x.name === name);
  if (!r) return;
  const lic = r.license_safe
    ? '<span class="badge badge-safe">🟢 ' + esc(r.license) + " — safe to sell</span>"
    : '<span class="badge badge-caution">🔴 ' + esc(r.license) + " — check license</span>";
  document.getElementById("modal-body").innerHTML =
    '<div class="guide">' +
      "<h1>" + esc(r.name) + "</h1>" +
      '<div class="guide-meta">' +
        '<span class="badge badge-field">' + esc(r.field) + "</span>" +
        lic +
        '<span class="badge">' + esc(r.difficulty) + "</span>" +
        '<span class="badge">' + fmtStars(r.stars) + "</span>" +
      "</div>" +
      renderGuide(r.step_by_step_guide) +
      '<p><a class="guide-gh" href="' + esc(r.github_url) + '" target="_blank" rel="noopener">Open on GitHub → ' + esc(r.github_url) + "</a></p>" +
    "</div>";
  document.getElementById("modal-backdrop").hidden = false;
  document.body.style.overflow = "hidden";
}

function closeModal() {
  document.getElementById("modal-backdrop").hidden = true;
  document.body.style.overflow = "";
}

/* ---------- events ---------- */
["search", "filter-field", "filter-license", "filter-difficulty", "sort"].forEach((id) => {
  document.getElementById(id).addEventListener("input", currentFilter);
  document.getElementById(id).addEventListener("change", currentFilter);
});
document.getElementById("grid").addEventListener("click", (e) => {
  const card = e.target.closest(".card");
  if (card) openRepo(card.dataset.name);
});
document.getElementById("modal-close").addEventListener("click", closeModal);
document.getElementById("modal-backdrop").addEventListener("click", (e) => {
  if (e.target.id === "modal-backdrop") closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

loadData().catch((err) => {
  document.getElementById("grid").innerHTML =
    '<div class="empty">Failed to load data. If you opened index.html directly from disk, run a local server instead: <code>python3 -m http.server</code></div>';
  console.error(err);
});
