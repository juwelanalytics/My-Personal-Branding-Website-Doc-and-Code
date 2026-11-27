window.POSTS = [
  {
    id: "cloudflare-sgtm-ga4-capi",
    kind: "Guide",
    title: "First-Party sGTM Architecture for GA4 Schemas, Meta CAPI & SHA-256",
    date: "November 22, 2026",
    category: "sGTM & Ad Tracking",
    tags: ["Cloudflare", "GA4", "CAPI", "SHA-256"],
    comments: 12,
    thumbBg: "from-fuchsia-700 via-purple-800 to-indigo-950",
    thumbBadge: "FIRST-PARTY sGTM",
    thumbTitle: "GA4 / CAPI / SHA-256",
    summary: "Route first-party tracking through custom server-side GTM across Cloudflare, Stape, or GCP with clean GA4 recommended event schemas, Meta CAPI deduplication and high EMQ, and SHA-256 hashed customer parameters for Google Ads Enhanced Conversions.",
    body: `
      <h1 class="text-2xl font-bold text-slate-900 dark:text-white">First-Party sGTM Architecture for GA4 Schemas, Meta CAPI &amp; SHA-256</h1>
      <p>Custom server-side GTM setups give full control over event schemas, first-party cookies, deduplication keys, and normalized SHA-256 user parameters (<code>em</code>, <code>ph</code>, <code>fn</code>, <code>ln</code>) without third-party logic lock-in.</p>
      <pre class="p-4 rounded bg-slate-900 text-purple-200 font-mono text-xs overflow-x-auto">Browser / DataLayer --&gt; First-Party Endpoint (Cloudflare / Stape / GCP sGTM)
  |--&gt; GA4 (Recommended Events + Custom Parameter Schema)
  |--&gt; Meta Pixel + CAPI (event_id Deduplication + High EMQ)
  +--&gt; Google Ads (Enhanced Conversions + SHA-256 Hashing)</pre>
    `
  },
  {
    id: "crm-oct-ghl-hubspot-zoho",
    kind: "Tips",
    title: "#OCTtips: CRM Offline Conversion Tracking via Webhook, JS & Apps Script",
    date: "November 14, 2026",
    category: "CRM & Offline OCT",
    tags: ["GoHighLevel", "HubSpot", "Apps Script", "gclid"],
    comments: 8,
    thumbBg: "from-slate-800 via-slate-900 to-zinc-950",
    thumbBadge: "CRM OCT",
    thumbTitle: "GHL • HubSpot • Zoho",
    summary: "Send qualified lead and closed-won stage updates back to Meta and Google Ads OCT from GoHighLevel, HubSpot, Zoho, or Pipedrive using first-party gclid, fbclid, _ga, and UTM capture with webhooks, JavaScript, sGTM, or Google Apps Script.",
    body: `
      <h1 class="text-2xl font-bold text-slate-900 dark:text-white">#OCTtips: Custom CRM Offline Conversion Tracking</h1>
      <p>Capture <code>gclid</code>, <code>fbclid</code>, <code>_ga</code>, and UTM values at form or booking submission, persist them in CRM custom fields, and send stage transitions via webhook, sGTM, or Google Apps Script.</p>
    `
  },
  {
    id: "discrepancy-consent-bigquery-ai",
    kind: "Tips",
    title: "#AuditTips: Fixing Data Mismatches + Consent Mode v2 & BigQuery SQL",
    date: "November 05, 2026",
    category: "Data Discrepancy",
    tags: ["BigQuery", "GA4", "Looker Studio"],
    comments: 6,
    thumbBg: "from-sky-800 via-blue-900 to-slate-950",
    thumbBadge: "DATA AUDIT",
    thumbTitle: "Consent v2 + SQL",
    summary: "Audit workflow to reconcile ad platforms, CRM, and GA4—covering DataLayer/GTM mismatches, Google Consent Mode v2 (Cookiebot, CookieYes, OneTrust), BigQuery SQL joins, and Looker Studio performance reporting.",
    body: `
      <h1 class="text-2xl font-bold text-slate-900 dark:text-white">#AuditTips: Reconciling Ad Dashboards, CRM &amp; GA4</h1>
      <p>Diagnose attribution gaps across consent states, event firing order, and CRM stage timestamps, then model clean reporting tables in BigQuery SQL and Looker Studio.</p>
    `
  },
  {
    id: "tip-iframe-click-ids",
    kind: "Tips",
    title: "#TrackingTips: Persisting gclid, fbclid, _ga & UTMs Across Iframes",
    date: "October 26, 2026",
    category: "Data Discrepancy",
    tags: ["gclid", "GA4", "CAPI"],
    comments: 3,
    thumbBg: "from-indigo-800 via-violet-900 to-slate-950",
    thumbBadge: "ATTRIBUTION",
    thumbTitle: "gclid / fbclid / _ga",
    summary: "Prevent click IDs and UTM parameters from dropping when visitors move through embedded booking iframes, cross-domain steps, or call tracking flows.",
    body: `
      <h1 class="text-2xl font-bold text-slate-900 dark:text-white">#TrackingTips: Persisting Parameters Across Iframes</h1>
      <p>Read and store first-party attribution parameters on entry and pass them cleanly into embedded widgets, checkout/booking iframes, and hidden CRM inputs.</p>
    `
  },
  {
    id: "ga4-custom-reporting-looker",
    kind: "Guide",
    title: "GA4 Custom Reporting & Looker Studio Executive Dashboards",
    date: "October 18, 2026",
    category: "SQL, BI & AI Agents",
    tags: ["GA4", "Looker Studio", "BigQuery"],
    comments: 5,
    thumbBg: "from-emerald-800 via-teal-900 to-slate-950",
    thumbBadge: "REPORTING",
    thumbTitle: "GA4 + Looker Studio",
    summary: "Structure custom dimensions, funnel explorations, and blended Looker Studio views so agencies and service brands track real lead quality and revenue instead of vanity metrics.",
    body: `
      <h1 class="text-2xl font-bold text-slate-900 dark:text-white">GA4 Custom Reporting &amp; Looker Studio Executive Dashboards</h1>
      <p>Align event parameters with custom dimensions and blend ad spend, GA4, and CRM outcomes in Looker Studio for reliable decision-making.</p>
    `
  },
  {
    id: "consent-mode-v2-cmp-qa",
    kind: "Guide",
    title: "Google Consent Mode v2 QA with Cookiebot, CookieYes & OneTrust",
    date: "October 09, 2026",
    category: "Consent Mode v2",
    tags: ["GA4", "Cloudflare", "CAPI"],
    comments: 4,
    thumbBg: "from-amber-800 via-orange-900 to-slate-950",
    thumbBadge: "CONSENT v2",
    thumbTitle: "GDPR / CCPA QA",
    summary: "Verify default and update consent signals (ad_storage, analytics_storage, ad_user_data, ad_personalization) so tags respect user choice without breaking attribution.",
    body: `
      <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Google Consent Mode v2 QA with CMPs</h1>
      <p>Test default states before banner interaction and confirm clean state updates across browser and server-side tags.</p>
    `
  },
  {
    id: "single-sgtm-multi-domain-routing",
    kind: "Guide",
    title: "Routing Multiple Regional Domains Through a Single sGTM Container",
    date: "September 29, 2026",
    category: "sGTM & Ad Tracking",
    tags: ["Cloudflare", "GA4", "SHA-256"],
    comments: 7,
    thumbBg: "from-cyan-800 via-sky-900 to-slate-950",
    thumbBadge: "MULTI-DOMAIN",
    thumbTitle: "page_hostname Routing",
    summary: "Use lookup tables and hostname-aware routing rules to keep multi-region sites organized on a single server-side container without cross-brand data mixups.",
    body: `
      <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Routing Multiple Regional Domains Through a Single sGTM Container</h1>
      <p>Map measurement IDs, CAPI tokens, and cookie domains dynamically using <code>page_hostname</code> lookup logic.</p>
    `
  }
];
