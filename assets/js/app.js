const POSTS_PER_PAGE = 7;

function getPageNum() {
  const m = window.location.pathname.match(/\/page\/([1-5])\/?$/);
  if (m) return parseInt(m[1], 10);
  const qp = parseInt(new URLSearchParams(window.location.search).get("page") || "1", 10);
  return (qp >= 1 && qp <= 5) ? qp : 1;
}

function setMetaDescription(text) {
  let meta = document.querySelector('meta[name="description"]');
  if (!meta) {
    meta = document.createElement("meta");
    meta.name = "description";
    document.head.appendChild(meta);
  }
  meta.content = text;
}

function injectTechArticleSchema(post) {
  let el = document.getElementById("dynamicTechArticleLd");
  if (!el) {
    el = document.createElement("script");
    el.id = "dynamicTechArticleLd";
    el.type = "application/ld+json";
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": post.title,
    "description": post.summary,
    "datePublished": post.date,
    "articleSection": post.category,
    "keywords": (post.tags || []).join(", "),
    "author": {
      "@type": "Person",
      "name": "MD. Juwel Rana"
    }
  });
}

function inlineVisualHtml(post, compact = true) {
  return `
    <div class="${compact ? "w-full sm:w-48 h-28" : "w-full max-w-xl h-44"} rounded-md bg-slate-950 text-white p-3.5 border border-slate-800 flex flex-col justify-between shrink-0 shadow-sm">
      <div class="flex items-center justify-between gap-2">
        <span class="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-red-600/20 text-red-300 border border-red-500/60">
          ${post.kind || "Guide"}
        </span>
        <span class="text-[10px] font-mono text-slate-400 truncate">${post.category || ""}</span>
      </div>
      <div class="text-xs ${compact ? "" : "sm:text-sm"} font-bold leading-snug text-white line-clamp-2">
        ${post.title}
      </div>
      <div class="text-[10px] font-mono text-red-200 bg-red-950/70 border-l-2 border-red-500 px-2 py-1 rounded-r truncate">
        ${post.redCallout || "RED MARK: Key attribution & implementation highlight"}
      </div>
    </div>
  `;
}

function postCardHtml(post) {
  const detailUrl = `?post=${encodeURIComponent(post.id)}`;
  return `
    <article class="flex flex-col sm:flex-row gap-5 items-start">
      <a href="${detailUrl}" class="block w-full sm:w-48 shrink-0 hover:opacity-95 transition">
        ${inlineVisualHtml(post, true)}
      </a>
      <div class="min-w-0 flex-1">
        <h2 class="text-xl sm:text-2xl font-bold leading-snug text-slate-900 dark:text-white hover:text-purple-700 dark:hover:text-purple-400">
          <a href="${detailUrl}">${post.title}</a>
        </h2>
        <p class="mt-1 text-xs text-slate-400 dark:text-slate-500">
          ${post.date} in <button type="button" onclick="setCategory('${post.category}')" class="text-purple-700 dark:text-purple-400 hover:underline">${post.category}</button>
        </p>
        <p class="mt-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          ${post.summary}
        </p>
        <a href="${detailUrl}" class="mt-2 inline-block text-xs font-semibold text-purple-700 dark:text-purple-400 hover:underline">
          Continue reading
        </a>
      </div>
    </article>
  `;
}

function renderDetailView(post, pageNum) {
  document.title = `${post.title} | MD. Juwel`;
  setMetaDescription(post.summary);
  injectTechArticleSchema(post);

  document.getElementById("newsletterBanner")?.classList.add("hidden");
  document.getElementById("paginationBar")?.classList.add("hidden");

  const backHref = pageNum > 1 ? `/page/${pageNum}/` : "/";
  document.getElementById("topPostSlot").innerHTML = `
    <article class="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#161B22] p-6 sm:p-8 space-y-5">
      <div class="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
        <span>${post.date} &bull; ${post.category}</span>
        <a href="${backHref}" class="text-purple-700 dark:text-purple-400 hover:underline">&larr; Back to Page ${pageNum}</a>
      </div>
      ${inlineVisualHtml(post, false)}
      <div class="space-y-4 text-sm sm:text-[15px] leading-relaxed text-slate-700 dark:text-slate-300">
        ${post.body}
      </div>
      <div class="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div class="flex flex-wrap gap-1.5 font-mono">
          ${(post.tags || []).map(t => `<span class="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800">#${t}</span>`).join("")}
        </div>
        <a href="${backHref}" class="font-mono text-purple-700 dark:text-purple-400 hover:underline">&larr; Back to posts</a>
      </div>
    </article>
  `;
  document.getElementById("restPostsSlot").innerHTML = "";
}

function renderFilteredFeed(items, labelText) {
  const banner = document.getElementById("filterBanner");
  if (banner) {
    banner.classList.remove("hidden");
    banner.classList.add("flex");
    document.getElementById("filterStatusText").textContent = labelText;
  }
  if (!items.length) {
    document.getElementById("topPostSlot").innerHTML = `<p class="py-8 text-sm text-slate-500">No matching posts. <button type="button" onclick="resetAll()" class="text-purple-700 underline">Reset</button></p>`;
    document.getElementById("restPostsSlot").innerHTML = "";
    return;
  }
  document.getElementById("topPostSlot").innerHTML = postCardHtml(items[0]);
  document.getElementById("restPostsSlot").innerHTML = items.slice(1).map(postCardHtml).join("");
}

function renderPaginatedFeed(pageNum) {
  if (typeof BLOG_POSTS === "undefined") return;

  const banner = document.getElementById("filterBanner");
  if (banner) {
    banner.classList.add("hidden");
    banner.classList.remove("flex");
  }

  const totalPages = Math.ceil(BLOG_POSTS.length / POSTS_PER_PAGE);
  const start = (pageNum - 1) * POSTS_PER_PAGE;
  const pageItems = BLOG_POSTS.slice(start, start + POSTS_PER_PAGE);

  document.title = pageNum === 1
    ? "MD. Juwel — First-Party Data Architect, sGTM, GA4, Meta CAPI & CRM OCT"
    : `Page ${pageNum} — MD. Juwel`;

  document.getElementById("topPostSlot").innerHTML = pageItems[0] ? postCardHtml(pageItems[0]) : "";
  document.getElementById("restPostsSlot").innerHTML = pageItems.slice(1).map(postCardHtml).join("");

  const olderLink = document.getElementById("olderPostsLink");
  const pageStatus = document.getElementById("pageStatusText");

  if (pageStatus) {
    pageStatus.textContent = `page ${pageNum} of ${totalPages} (${pageItems.length} of ${BLOG_POSTS.length} posts)`;
  }

  if (olderLink) {
    if (pageNum < totalPages) {
      olderLink.href = `/page/${pageNum + 1}/`;
      olderLink.textContent = "OLDER POSTS >";
      olderLink.classList.remove("hidden");
    } else {
      olderLink.href = "/";
      olderLink.textContent = "< BACK TO PAGE 1";
      olderLink.classList.remove("hidden");
    }
  }
}

function setActiveNav(btn) {
  document.querySelectorAll(".nav-item").forEach(el => el.classList.remove("active"));
  if (btn) btn.classList.add("active");
}

function togglePanel(id) {
  document.getElementById(id)?.classList.toggle("hidden");
}

function setCategory(cat) {
  showSection("home");
  document.querySelectorAll(".cat-pill").forEach(b => {
    b.className = b.dataset.cat === cat
      ? "cat-pill px-2.5 py-1 text-xs rounded bg-purple-700 text-white font-medium"
      : "cat-pill px-2.5 py-1 text-xs rounded bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300";
  });
  if (cat === "All") {
    renderPaginatedFeed(getPageNum());
    return;
  }
  const matches = (BLOG_POSTS || []).filter(p => p.category === cat);
  renderFilteredFeed(matches, `Category: ${cat} (${matches.length})`);
}

function filterType(kind) {
  showSection("home");
  const matches = (BLOG_POSTS || []).filter(p => p.kind === kind);
  renderFilteredFeed(matches, `Type: ${kind} (${matches.length})`);
}

function filterQuery(term) {
  showSection("home");
  const q = term.trim().toLowerCase();
  const box = document.getElementById("searchBox");
  if (box) box.value = term;
  document.getElementById("clearSearch")?.classList.toggle("hidden", !q);
  if (!q) {
    renderPaginatedFeed(getPageNum());
    return;
  }
  const matches = (BLOG_POSTS || []).filter(p =>
    p.title.toLowerCase().includes(q) ||
    p.summary.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    (p.tags || []).some(t => t.toLowerCase().includes(q))
  );
  renderFilteredFeed(matches, `Search: "${term}" (${matches.length})`);
}

function resetAll() {
  const box = document.getElementById("searchBox");
  if (box) box.value = "";
  document.getElementById("clearSearch")?.classList.add("hidden");
  document.querySelectorAll(".cat-pill").forEach(b => {
    b.className = b.dataset.cat === "All"
      ? "cat-pill px-2.5 py-1 text-xs rounded bg-purple-700 text-white font-medium"
      : "cat-pill px-2.5 py-1 text-xs rounded bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300";
  });
  renderPaginatedFeed(getPageNum());
}

function showSection(name) {
  document.getElementById("homeSection")?.classList.toggle("hidden", name !== "home");
  document.getElementById("toolsSection")?.classList.toggle("hidden", name !== "tools");
  document.getElementById("aboutSection")?.classList.toggle("hidden", name !== "about");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function toggleTheme() {
  const dark = document.documentElement.classList.toggle("dark");
  localStorage.setItem("theme", dark ? "dark" : "light");
}

function handleBannerJoin(e) {
  e.preventDefault();
  const email = document.getElementById("bannerEmail")?.value.trim() || "";
  const st = document.getElementById("bannerStatus");
  if (st) {
    st.textContent = `Registered ${email} for attribution field notes.`;
    st.classList.remove("hidden");
  }
  e.target.reset();
}

function copyEmail(btn) {
  navigator.clipboard?.writeText("digitrackerbd@gmail.com");
  const prev = btn.textContent;
  btn.textContent = "Copied!";
  setTimeout(() => { btn.textContent = prev; }, 1400);
}

function copyEl(id, btn) {
  const text = document.getElementById(id)?.textContent || "";
  navigator.clipboard?.writeText(text);
  const prev = btn.textContent;
  btn.textContent = "Copied";
  setTimeout(() => { btn.textContent = prev; }, 1400);
}

async function runSha256() {
  const raw = document.getElementById("shaInput")?.value || "";
  const t = document.getElementById("shaType")?.value || "email";
  if (!raw.trim()) {
    document.getElementById("shaNorm").textContent = "—";
    document.getElementById("shaHex").textContent = "—";
    return;
  }
  let norm = raw.trim().toLowerCase();
  if (t === "phone") norm = norm.replace(/[^0-9]/g, "");
  document.getElementById("shaNorm").textContent = norm;
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(norm));
  document.getElementById("shaHex").textContent = Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
}

function buildUrl() {
  try {
    const url = new URL(document.getElementById("uBase")?.value.trim() || "https://mdjuwel.com/");
    const pairs = {
      utm_source: document.getElementById("uSource")?.value.trim(),
      utm_medium: document.getElementById("uMedium")?.value.trim(),
      utm_campaign: document.getElementById("uCampaign")?.value.trim(),
      gclid: document.getElementById("uGclid")?.value.trim(),
      fbclid: document.getElementById("uFbclid")?.value.trim()
    };
    Object.entries(pairs).forEach(([k, v]) => { if (v) url.searchParams.set(k, v); });
    document.getElementById("uOut").textContent = url.toString();
  } catch {
    document.getElementById("uOut").textContent = "Invalid URL";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".cat-pill").forEach(b => b.addEventListener("click", () => setCategory(b.dataset.cat)));
  document.getElementById("searchBox")?.addEventListener("input", e => filterQuery(e.target.value));
  document.getElementById("clearSearch")?.addEventListener("click", resetAll);
  document.getElementById("themeToggleDesktop")?.addEventListener("click", toggleTheme);
  document.getElementById("themeToggleMobile")?.addEventListener("click", toggleTheme);
  document.getElementById("mobileDrawerBtn")?.addEventListener("click", () => {
    const sb = document.getElementById("leftSidebar");
    sb?.classList.toggle("hidden");
    sb?.classList.toggle("fixed");
    sb?.classList.toggle("inset-y-0");
    sb?.classList.toggle("left-0");
    sb?.classList.toggle("w-72");
  });

  const pageNum = getPageNum();
  const postId = new URLSearchParams(window.location.search).get("post");

  if (postId && typeof BLOG_POSTS !== "undefined") {
    const post = BLOG_POSTS.find(item => item.id === postId);
    if (post) {
      renderDetailView(post, pageNum);
      return;
    }
  }

  renderPaginatedFeed(pageNum);
});
