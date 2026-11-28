(function () {
  const body = document.body;
  const currentPage = parseInt(body.getAttribute("data-page") || "1", 10);
  const perPage = parseInt(body.getAttribute("data-per-page") || "7", 10);
  const posts = Array.isArray(window.POSTS) ? window.POSTS : [];

  const listView = document.getElementById("postListView");
  const detailView = document.getElementById("postDetailView");
  const searchBox = document.getElementById("searchBox");
  const clearSearch = document.getElementById("clearSearch");
  const filterBanner = document.getElementById("filterBanner");
  const filterStatusText = document.getElementById("filterStatusText");

  let activeCat = "All";
  let activeQuery = "";
  let activeType = "";

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderCardVisual(post) {
    const v = post.visual || {};
    const mode = v.mode || (post.kind === "Tips" ? "tip" : "flow");
    const header = escapeHtml(v.header || (post.kind === "Tips" ? "#TrackingTips • Field Note" : post.thumbBadge || "LAB ARCHITECTURE"));
    const mainBox = escapeHtml(v.mainBox || post.thumbTitle || "sGTM / GA4 Pipeline");
    const subCode = escapeHtml(v.subCode || "event_id: matched • 200 OK");
    const statusText = escapeHtml(v.statusText || (mode === "problem" ? "??? MISMATCH" : mode === "dashboard" ? "KPI +38% ROAS" : "VERIFIED 200"));
    const footerNote = escapeHtml(v.footerNote || post.thumbTitle || "First-Party Attribution");

    let badgeClass = "bg-emerald-500/20 text-emerald-300 border-emerald-400/40";
    let accentBorder = "border-sky-400/35";
    let pointerColor = "#38bdf8";

    if (mode === "problem") {
      badgeClass = "bg-rose-500/25 text-rose-200 border-rose-400/60";
      accentBorder = "border-rose-400/60";
      pointerColor = "#fb7185";
    } else if (mode === "tip") {
      badgeClass = "bg-amber-400/20 text-amber-200 border-amber-300/50";
      accentBorder = "border-amber-300/45";
      pointerColor = "#f43f5e";
    } else if (mode === "dashboard") {
      badgeClass = "bg-indigo-400/25 text-indigo-200 border-indigo-300/50";
      accentBorder = "border-indigo-300/45";
      pointerColor = "#818cf8";
    }

    const isLightLab = mode === "tip" || mode === "problem";

    if (isLightLab) {
      return `
        <div class="relative w-full sm:w-64 h-36 sm:h-40 rounded-lg overflow-hidden shrink-0 border border-slate-300/80 dark:border-slate-700 bg-slate-100 shadow-sm flex flex-col justify-between select-none">
          <!-- Top Navy Header Bar like Field Tip -->
          <div class="bg-[#163a63] text-white px-2.5 py-1.5 flex items-center justify-between gap-1.5">
            <span class="font-mono text-[9.5px] font-bold tracking-tight truncate">${header}</span>
            <span class="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0"></span>
          </div>

          <!-- Center UI Snapshot Box with Red Annotation Arrow -->
          <div class="px-2.5 py-1.5 flex-1 flex flex-col justify-center bg-gradient-to-b from-white to-slate-100">
            <div class="bg-white border ${mode === "problem" ? "border-rose-400 ring-1 ring-rose-300/60" : "border-slate-300"} rounded px-2 py-1.5 shadow-xs relative">
              <div class="flex items-center justify-between gap-1 text-[9px] font-mono text-slate-500 border-b border-slate-100 pb-0.5 mb-1">
                <span class="truncate font-semibold text-slate-700">${mainBox}</span>
                <span class="px-1 rounded text-[8px] font-bold ${mode === "problem" ? "bg-rose-100 text-rose-700" : "bg-emerald-100 text-emerald-700"}">${statusText}</span>
              </div>
              <div class="flex items-center justify-between gap-1">
                <code class="text-[9.5px] font-mono font-semibold ${mode === "problem" ? "text-rose-600" : "text-slate-800"} truncate">${subCode}</code>
                <svg class="w-6 h-3.5 shrink-0" viewBox="0 0 28 14" fill="none">
                  <path d="M26 7H4M4 7L9 2.5M4 7L9 11.5" stroke="${pointerColor}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
          </div>

          <!-- Bottom Lab Takeaway Strip -->
          <div class="bg-white/95 border-t border-slate-200 px-2.5 py-1 flex items-center justify-between gap-1.5">
            <span class="text-[9.5px] font-semibold text-slate-700 truncate">${footerNote}</span>
            <span class="text-[8px] font-mono font-bold uppercase px-1.5 py-0.5 rounded bg-slate-900 text-white shrink-0">LAB</span>
          </div>
        </div>
      `;
    }

    return `
      <div class="relative w-full sm:w-64 h-36 sm:h-40 rounded-lg bg-gradient-to-br ${escapeHtml(post.thumbBg)} p-3 flex flex-col justify-between text-white shrink-0 overflow-hidden shadow-sm border border-white/10 select-none">
        <!-- Top Window Chrome + Tool Badge -->
        <div class="flex items-center justify-between gap-1.5">
          <div class="flex items-center gap-1">
            <span class="w-1.5 h-1.5 rounded-full bg-rose-400/90"></span>
            <span class="w-1.5 h-1.5 rounded-full bg-amber-300/90"></span>
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400/90"></span>
            <span class="ml-1 font-mono text-[9px] tracking-wider uppercase text-white/80 truncate">${header}</span>
          </div>
          <span class="font-mono text-[8px] px-1.5 py-0.5 rounded border ${badgeClass} shrink-0">${statusText}</span>
        </div>

        <!-- Middle Interactive Pipeline / Dashboard Snapshot -->
        <div class="my-auto bg-slate-950/55 backdrop-blur-xs border ${accentBorder} rounded-md p-2 space-y-1">
          <div class="flex items-center justify-between gap-1 text-[9.5px] font-mono text-sky-200">
            <span class="truncate font-semibold">${mainBox}</span>
            <svg class="w-5 h-3 shrink-0" viewBox="0 0 24 12" fill="none">
              <path d="M2 6H20M20 6L15 2M20 6L15 10" stroke="${pointerColor}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="font-mono text-[9px] text-slate-300 bg-black/35 rounded px-1.5 py-0.5 truncate border border-white/5">
            ${subCode}
          </div>
        </div>

        <!-- Bottom Experiment Caption -->
        <div class="flex items-center justify-between gap-2 text-[10.5px] font-semibold text-white/95 leading-tight">
          <span class="truncate">${footerNote}</span>
          <span class="font-mono text-[8.5px] text-white/65 shrink-0">sGTM•BI</span>
        </div>
      </div>
    `;
  }

  function getPageUrl(pageNum) {
    return pageNum <= 1 ? "/" : `/page/${pageNum}/`;
  }

  function getFilteredPosts() {
    return posts.filter((p) => {
      const matchCat = activeCat === "All" || p.category === activeCat;
      const matchType = !activeType || p.kind === activeType;
      const q = activeQuery.trim().toLowerCase();
      const matchQ =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.tags || []).some((t) => t.toLowerCase().includes(q));
      return matchCat && matchType && matchQ;
    });
  }

  function renderPostList() {
    if (!listView) return;
    const isFiltering =
      activeCat !== "All" || activeQuery.trim() !== "" || activeType !== "";
    const filtered = getFilteredPosts();

    let visiblePosts = [];
    let totalPages = Math.max(1, Math.ceil(posts.length / perPage));

    if (isFiltering) {
      visiblePosts = filtered;
      if (filterBanner && filterStatusText) {
        filterBanner.classList.remove("hidden");
        const parts = [];
        if (activeCat !== "All") parts.push(`Category: ${activeCat}`);
        if (activeType) parts.push(`Type: ${activeType}`);
        if (activeQuery.trim()) parts.push(`Search: "${activeQuery.trim()}"`);
        filterStatusText.textContent = `Showing ${filtered.length} matching post(s) across all pages (${parts.join(" • ")})`;
      }
    } else {
      if (filterBanner) filterBanner.classList.add("hidden");
      const start = (currentPage - 1) * perPage;
      visiblePosts = posts.slice(start, start + perPage);
    }

    const cardsHtml = visiblePosts.length
      ? visiblePosts
          .map(
            (post) => `
          <article class="py-7 first:pt-2 border-b border-slate-200/80 dark:border-slate-800 group">
            <a href="?post=${encodeURIComponent(post.id)}" data-post-id="${escapeHtml(post.id)}" class="post-link flex flex-col sm:flex-row gap-5 items-start">
              ${renderCardVisual(post)}
              <div class="flex-1 min-w-0">
                <div class="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400 dark:text-slate-500 mb-1.5">
                  <span>${escapeHtml(post.date)}</span>
                  <span>•</span>
                  <span class="text-brand-600 dark:text-brand-400 font-medium">${escapeHtml(post.category)}</span>
                </div>
                <h2 class="text-lg sm:text-[19px] font-bold text-slate-800 dark:text-slate-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors leading-snug mb-2">
                  ${escapeHtml(post.title)}
                </h2>
                <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2 mb-3">
                  ${escapeHtml(post.summary)}
                </p>
                <div class="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 dark:text-slate-500 font-mono">
                  <div class="flex flex-wrap gap-1.5">
                    ${(post.tags || []).map((t) => `<span>#${escapeHtml(t)}</span>`).join(" ")}
                  </div>
                  <span class="text-brand-600 dark:text-brand-400 group-hover:translate-x-0.5 transition-transform">Read more →</span>
                </div>
              </div>
            </a>
          </article>
        `
          )
          .join("")
      : `<div class="py-12 text-center text-sm text-slate-500 border border-slate-200 dark:border-slate-800 rounded-xl">No matching posts found.</div>`;

    const prevPage = currentPage - 1;
    const nextPage = currentPage + 1;
    const hasPrev = currentPage > 1;
    const hasNext = currentPage < totalPages;

    const paginationHtml = isFiltering
      ? ""
      : `
      <nav aria-label="Pagination" class="pt-8 pb-4 flex items-center justify-between gap-4 font-mono text-xs">
        <div class="flex items-center gap-3">
          ${
            hasPrev
              ? `<a href="${getPageUrl(prevPage)}" class="px-4 py-2.5 rounded border border-slate-300 dark:border-slate-700 text-brand-600 dark:text-brand-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition">‹ NEWER POSTS</a>`
              : `<span class="px-4 py-2.5 rounded border border-slate-200 dark:border-slate-800 text-slate-300 dark:text-slate-700 cursor-not-allowed select-none">‹ NEWER POSTS</span>`
          }
          ${
            hasNext
              ? `<a href="${getPageUrl(nextPage)}" class="px-4 py-2.5 rounded border border-slate-300 dark:border-slate-700 text-brand-600 dark:text-brand-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition">OLDER POSTS ›</a>`
              : `<span class="px-4 py-2.5 rounded border border-slate-200 dark:border-slate-800 text-slate-300 dark:text-slate-700 cursor-not-allowed select-none">OLDER POSTS ›</span>`
          }
        </div>
        <div class="text-slate-500 dark:text-slate-400">
          page ${currentPage} of ${totalPages}
        </div>
      </nav>
    `;

    listView.innerHTML = cardsHtml + paginationHtml;

    listView.querySelectorAll(".post-link").forEach((el) => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        const id = el.getAttribute("data-post-id");
        openPostDetail(id, true);
      });
    });
  }

  function openPostDetail(postId, pushState) {
    const post = posts.find((p) => p.id === postId);
    if (!post || !detailView || !listView) return;

    if (pushState) {
      const url = new URL(window.location.href);
      url.searchParams.set("post", post.id);
      window.history.pushState({ post: post.id }, "", url.toString());
    }

    listView.classList.add("hidden");
    detailView.classList.remove("hidden");

    detailView.innerHTML = `
      <div class="mb-6">
        <button id="backToListBtn" type="button" class="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition">
          ← Back to Page ${currentPage}
        </button>
      </div>
      <div class="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400 dark:text-slate-500 mb-3">
        <span>${escapeHtml(post.date)}</span>
        <span>•</span>
        <span class="text-brand-600 dark:text-brand-400 font-semibold">${escapeHtml(post.category)}</span>
        <span>•</span>
        <span>${escapeHtml(post.kind)}</span>
      </div>
      <div class="prose-content text-slate-700 dark:text-slate-300 leading-relaxed space-y-4 text-[15px]">
        ${post.body}
      </div>
      <div class="mt-8 pt-5 border-t border-slate-200 dark:border-slate-800 flex flex-wrap gap-2">
        ${(post.tags || [])
          .map(
            (t) =>
              `<span class="text-xs font-mono px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">#${escapeHtml(t)}</span>`
          )
          .join("")}
      </div>
    `;

    document.getElementById("backToListBtn").addEventListener("click", () => {
      closePostDetail(true);
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function closePostDetail(pushState) {
    if (!detailView || !listView) return;
    detailView.classList.add("hidden");
    listView.classList.remove("hidden");
    if (pushState) {
      window.history.pushState({}, "", getPageUrl(currentPage));
    }
  }

  if (searchBox) {
    searchBox.addEventListener("input", (e) => {
      activeQuery = e.target.value;
      if (clearSearch) {
        clearSearch.classList.toggle("hidden", !activeQuery.trim());
      }
      closePostDetail(false);
      renderPostList();
    });
  }

  if (clearSearch) {
    clearSearch.addEventListener("click", () => {
      activeQuery = "";
      if (searchBox) searchBox.value = "";
      clearSearch.classList.add("hidden");
      renderPostList();
    });
  }

  document.querySelectorAll("[data-cat]").forEach((btn) => {
    btn.addEventListener("click", () => {
      activeCat = btn.getAttribute("data-cat") || "All";
      activeType = "";
      document.querySelectorAll("[data-cat]").forEach((b) => {
        b.classList.remove("active-pill", "bg-brand-600", "text-white");
      });
      btn.classList.add("active-pill", "bg-brand-600", "text-white");
      closePostDetail(false);
      renderPostList();
    });
  });

  document.querySelectorAll("[data-filter-type]").forEach((btn) => {
    btn.addEventListener("click", () => {
      activeType = btn.getAttribute("data-filter-type") || "";
      activeCat = "All";
      closePostDetail(false);
      renderPostList();
    });
  });

  const resetAllFiltersBtn = document.getElementById("resetAllFilters");
  if (resetAllFiltersBtn) {
    resetAllFiltersBtn.addEventListener("click", () => {
      activeCat = "All";
      activeQuery = "";
      activeType = "";
      if (searchBox) searchBox.value = "";
      if (clearSearch) clearSearch.classList.add("hidden");
      closePostDetail(false);
      renderPostList();
    });
  }

  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isDark = document.documentElement.classList.toggle("dark");
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
  }

  const newsletterForm = document.getElementById("newsletterForm");
  const newsletterMsg = document.getElementById("newsletterMsg");
  if (newsletterForm && newsletterMsg) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      newsletterMsg.textContent = "Subscribed! You will receive new field notes.";
      newsletterMsg.classList.remove("hidden");
      newsletterForm.reset();
    });
  }

  const closeHeroBtn = document.getElementById("closeHeroBtn");
  const heroBox = document.getElementById("heroBox");
  if (closeHeroBtn && heroBox) {
    closeHeroBtn.addEventListener("click", () => {
      heroBox.classList.add("hidden");
    });
  }

  window.addEventListener("popstate", () => {
    const params = new URLSearchParams(window.location.search);
    const p = params.get("post");
    if (p) {
      openPostDetail(p, false);
    } else {
      closePostDetail(false);
      renderPostList();
    }
  });

  const initialParams = new URLSearchParams(window.location.search);
  const initialPost = initialParams.get("post");
  renderPostList();
  if (initialPost) {
    openPostDetail(initialPost, false);
  }
})();
