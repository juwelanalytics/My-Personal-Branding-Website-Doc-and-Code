(function () {
  const posts = Array.isArray(window.POSTS) ? window.POSTS : [];
  const page = Math.max(1, parseInt(document.body.dataset.page || "1", 10));
  const perPage = Math.max(1, parseInt(document.body.dataset.perPage || "7", 10));

  const topSlot = document.getElementById("topPostSlot");
  const restSlot = document.getElementById("restPostsSlot");
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

  function hasActiveFilter() {
    return activeCat !== "All" || activeQuery.trim() !== "" || activeType !== "";
  }

  function renderCard(post) {
    const postUrl = `?post=${encodeURIComponent(post.id)}`;
    const tagsHtml = (post.tags || [])
      .map(t => `<button type="button" onclick="filterQuery('${escapeHtml(t)}')" class="hover:text-purple-700 dark:hover:text-purple-400">#${escapeHtml(t.replace(/\s+/g, ""))}</button>`)
      .join(" ");

    return `
      <article class="pb-8 border-b border-slate-200 dark:border-slate-800">
        <div class="flex flex-col sm:flex-row gap-5 items-start">
          <a href="${postUrl}" class="w-full sm:w-56 h-36 rounded-lg bg-gradient-to-br ${escapeHtml(post.thumbBg || "from-slate-800 to-slate-950")} text-white p-4 flex flex-col justify-between shrink-0 shadow-sm hover:opacity-95 transition">
            <span class="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-white/15 w-fit">${escapeHtml(post.thumbBadge || post.kind || "NOTE")}</span>
            <span class="text-sm font-bold leading-snug">${escapeHtml(post.thumbTitle || post.title)}</span>
          </a>

          <div class="flex-1 min-w-0 space-y-2">
            <div class="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400">
              <span>${escapeHtml(post.date)}</span>
              <span>&bull;</span>
              <button type="button" onclick="filterCategory('${escapeHtml(post.category)}')" class="text-purple-700 dark:text-purple-400 hover:underline">${escapeHtml(post.category)}</button>
            </div>

            <h2 class="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug">
              <a href="${postUrl}" class="hover:text-purple-700 dark:text-purple-400 transition">${escapeHtml(post.title)}</a>
            </h2>

            <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              ${escapeHtml(post.summary)}
            </p>

            <div class="pt-1 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
              <div class="flex flex-wrap items-center gap-2.5">${tagsHtml}</div>
              <a href="${postUrl}" class="text-purple-700 dark:text-purple-400 font-semibold hover:underline">Read more &rarr;</a>
            </div>
          </div>
        </div>
      </article>
    `;
  }

  function getFilteredPosts() {
    const q = activeQuery.trim().toLowerCase();
    return posts.filter(p => {
      const catOk = activeCat === "All" || p.category === activeCat;
      const typeOk = !activeType || (p.kind || "").toLowerCase() === activeType.toLowerCase();
      const hay = `${p.title} ${p.summary} ${p.category} ${(p.tags || []).join(" ")}`.toLowerCase();
      const qOk = !q || hay.includes(q);
      return catOk && typeOk && qOk;
    });
  }

  function updateFilterBanner(totalMatched) {
    const filtered = hasActiveFilter();
    if (filterBanner && filterStatusText) {
      if (!filtered) {
        filterBanner.classList.add("hidden");
        filterBanner.classList.remove("flex");
      } else {
        const parts = [];
        if (activeCat !== "All") parts.push(`Category: ${activeCat}`);
        if (activeType) parts.push(`Type: ${activeType}`);
        if (activeQuery.trim()) parts.push(`Query: "${activeQuery.trim()}"`);
        filterStatusText.textContent = `${parts.join(" | ")} — ${totalMatched} post(s) matched`;
        filterBanner.classList.remove("hidden");
        filterBanner.classList.add("flex");
      }
    }

    const paginationBar = document.querySelector("#homeSection > div.mt-10.pt-5.border-t");
    if (paginationBar) {
      paginationBar.classList.toggle("hidden", filtered);
    }
  }

  function renderStream() {
    if (!topSlot || !restSlot) return;

    const filteredMode = hasActiveFilter();
    const filtered = getFilteredPosts();
    updateFilterBanner(filtered.length);

    const slice = filteredMode
      ? filtered
      : posts.slice((page - 1) * perPage, page * perPage);

    if (!slice.length) {
      topSlot.innerHTML = "";
      restSlot.innerHTML = `
        <div class="p-6 rounded-lg border border-slate-200 dark:border-slate-800 text-center text-sm text-slate-500">
          No matching posts found.
        </div>
      `;
      return;
    }

    topSlot.innerHTML = renderCard(slice[0]);
    restSlot.innerHTML = slice.slice(1).map(renderCard).join("");
  }

  function checkPostDetail() {
    if (!detailView) return;
    const params = new URLSearchParams(window.location.search);
    const postId = params.get("post");
    if (!postId) {
      detailView.classList.add("hidden");
      detailView.innerHTML = "";
      return;
    }

    const post = posts.find(p => p.id === postId);
    if (!post) {
      detailView.innerHTML = `
        <div class="p-5 rounded-lg border border-slate-200 dark:border-slate-800 space-y-2">
          <p class="text-sm text-slate-600 dark:text-slate-400">Post not found.</p>
          <a href="/" class="text-xs font-mono text-purple-700 dark:text-purple-400 hover:underline">&larr; Back to posts</a>
        </div>
      `;
      detailView.classList.remove("hidden");
      return;
    }

    detailView.innerHTML = `
      <article class="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-[#161B22]/60 space-y-4">
        <div class="flex items-center justify-between text-xs font-mono text-slate-500">
          <span>${escapeHtml(post.date)} &bull; ${escapeHtml(post.category)}</span>
          <a href="/" class="text-purple-700 dark:text-purple-400 hover:underline">&larr; All posts</a>
        </div>
        <div class="space-y-3 text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          ${post.body || `<h1 class="text-2xl font-bold text-slate-900 dark:text-white">${escapeHtml(post.title)}</h1><p>${escapeHtml(post.summary)}</p>`}
        </div>
      </article>
    `;
    detailView.classList.remove("hidden");
  }

  window.filterCategory = function (cat) {
    activeCat = cat || "All";
    document.querySelectorAll(".cat-pill").forEach(btn => {
      const isMatch = btn.dataset.cat === activeCat;
      btn.classList.toggle("bg-purple-700", isMatch);
      btn.classList.toggle("text-white", isMatch);
      btn.classList.toggle("font-medium", isMatch);
    });
    renderStream();
  };

  window.filterQuery = function (q) {
    activeQuery = q || "";
    if (searchBox) searchBox.value = activeQuery;
    if (clearSearch) clearSearch.classList.toggle("hidden", !activeQuery.trim());
    renderStream();
  };

  window.filterType = function (kind) {
    activeType = kind || "";
    renderStream();
  };

  window.resetAll = function () {
    activeCat = "All";
    activeQuery = "";
    activeType = "";
    if (searchBox) searchBox.value = "";
    if (clearSearch) clearSearch.classList.add("hidden");
    document.querySelectorAll(".cat-pill").forEach(btn => {
      const isAll = btn.dataset.cat === "All";
      btn.classList.toggle("bg-purple-700", isAll);
      btn.classList.toggle("text-white", isAll);
      btn.classList.toggle("font-medium", isAll);
    });
    renderStream();
  };

  searchBox?.addEventListener("input", e => {
    activeQuery = e.target.value;
    clearSearch?.classList.toggle("hidden", !activeQuery.trim());
    renderStream();
  });

  clearSearch?.addEventListener("click", () => {
    activeQuery = "";
    if (searchBox) searchBox.value = "";
    clearSearch.classList.add("hidden");
    renderStream();
  });

  document.querySelectorAll(".cat-pill").forEach(btn => {
    btn.addEventListener("click", () => window.filterCategory(btn.dataset.cat));
  });

  checkPostDetail();
  renderStream();
})();
