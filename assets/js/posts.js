window.POSTS = [
  // ================= PAGE 1 (Posts 1–7) =================
  {
    id: "cloudflare-sgtm-ga4-capi",
    kind: "Guide",
    title: "Single-Container sGTM on Cloudflare Workers with GA4 & Meta CAPI",
    date: "November 22, 2026",
    category: "sGTM & Ad Tracking",
    tags: ["Cloudflare", "GA4", "CAPI", "SHA-256"],
    comments: 14,
    thumbBg: "from-sky-800 via-blue-900 to-slate-950",
    thumbBadge: "CLOUDFLARE sGTM",
    thumbTitle: "First-Party Edge Routing",
    summary: "Route first-party tracking requests through Cloudflare Workers to server-side GTM, forward clean GA4 events, and dispatch deduplicated Meta CAPI conversions with normalized SHA-256 matching.",
    body: `
      <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Single-Container sGTM on Cloudflare Workers with GA4 &amp; Meta CAPI</h1>
      <p>Routing browser telemetry through a first-party endpoint helps reduce signal loss from third-party cookie restrictions and client-side blockers while keeping payload schemas consistent across GA4 and Meta CAPI.</p>
      <h2 class="text-xl font-semibold text-slate-900 dark:text-white">Core Architecture Steps</h2>
      <ul class="list-disc pl-6 space-y-1.5">
        <li>Configure a custom first-party subdomain or edge route pointing to your server-side GTM container.</li>
        <li>Standardize <code>event_name</code>, <code>event_id</code>, and currency/value fields before dispatching tags.</li>
        <li>Normalize email and phone values before SHA-256 hashing so browser Pixel and server CAPI deduplicate cleanly.</li>
      </ul>
    `
  },
  {
    id: "crm-oct-ghl-hubspot-zoho",
    kind: "Guide",
    title: "CRM Offline Conversion Pipelines for GoHighLevel, HubSpot & Zoho",
    date: "November 14, 2026",
    category: "CRM & Offline OCT",
    tags: ["GoHighLevel", "HubSpot", "gclid", "Apps Script"],
    comments: 19,
    thumbBg: "from-indigo-800 via-purple-900 to-slate-950",
    thumbBadge: "CRM ATTRIBUTION",
    thumbTitle: "Lead to Closed-Won OCT",
    summary: "Capture gclid, fbclid, and UTM parameters at lead capture and push qualified or closed-won CRM stage changes back to ad platforms without paid SaaS lock-in.",
    body: `
      <h1 class="text-2xl font-bold text-slate-900 dark:text-white">CRM Offline Conversion Pipelines for GoHighLevel, HubSpot &amp; Zoho</h1>
      <p>Top-of-funnel form fills rarely reflect real revenue quality. Syncing downstream CRM milestones—such as Qualified Lead, Appointment Booked, or Closed-Won—trains bidding algorithms on actual business outcomes.</p>
      <ul class="list-disc pl-6 space-y-1.5">
        <li>Persist <code>gclid</code>, <code>fbclid</code>, and UTM fields in hidden inputs and CRM custom properties.</li>
        <li>Use lightweight webhooks, Google Apps Script, or automation flows to send stage updates with timestamps.</li>
      </ul>
    `
  },
  {
    id: "discrepancy-consent-bigquery-ai",
    kind: "Guide",
    title: "Fixing Ad Platform Discrepancies, Consent Mode v2 & BigQuery Reporting",
    date: "November 05, 2026",
    category: "Data Discrepancy",
    tags: ["GA4", "BigQuery", "Looker Studio"],
    comments: 11,
    thumbBg: "from-emerald-800 via-teal-900 to-slate-950",
    thumbBadge: "DATA AUDIT & BI",
    thumbTitle: "Discrepancy to Looker Studio",
    summary: "Diagnose attribution gaps across GA4, Meta, and Google Ads, validate Consent Mode v2 states, and model clean tables in BigQuery for Looker Studio reporting.",
    body: `
      <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Fixing Ad Platform Discrepancies, Consent Mode v2 &amp; BigQuery Reporting</h1>
      <p>Attribution models differ by design—click-through vs. view-through windows, deduplication rules, and consent states all shift reported counts. A structured audit separates expected model differences from broken tracking.</p>
      <ul class="list-disc pl-6 space-y-1.5">
        <li>Verify Consent Mode default and update signals before marketing tags fire.</li>
        <li>Export raw GA4 events to BigQuery and join with CRM/order tables for single-source reporting.</li>
      </ul>
    `
  },
  {
    id: "sgtm-multi-domain-hostname-routing",
    kind: "Tips",
    title: "#TrackingTips: Multi-Domain Routing in a Single sGTM Container",
    date: "October 28, 2026",
    category: "sGTM & Ad Tracking",
    tags: ["Cloudflare", "GA4", "CAPI"],
    comments: 8,
    thumbBg: "from-cyan-800 via-sky-900 to-slate-950",
    thumbBadge: "sGTM ARCHITECTURE",
    thumbTitle: "page_hostname Lookup",
    summary: "Use lookup tables on incoming event hostnames to route regional storefronts or client properties cleanly inside one server-side GTM container.",
    body: `
      <h1 class="text-2xl font-bold text-slate-900 dark:text-white">#TrackingTips: Multi-Domain Routing in a Single sGTM Container</h1>
      <p>Instead of duplicating server containers for every brand or regional domain, map measurement IDs, pixel IDs, and endpoints dynamically via lookup tables.</p>
    `
  },
  {
    id: "offline-call-tracking-callrail-twilio-ghl",
    kind: "Guide",
    title: "Offline Call Conversion Tracking: CallRail, Twilio & GoHighLevel",
    date: "October 19, 2026",
    category: "CRM & Offline OCT",
    tags: ["GoHighLevel", "gclid"],
    comments: 12,
    thumbBg: "from-violet-800 via-indigo-900 to-slate-950",
    thumbBadge: "CALL ATTRIBUTION",
    thumbTitle: "Phone Leads to Google Ads",
    summary: "Connect call tracking logs and qualifying call durations back to Google Ads offline conversions so high-intent phone leads are properly valued.",
    body: `
      <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Offline Call Conversion Tracking: CallRail, Twilio &amp; GoHighLevel</h1>
      <p>For service businesses and agencies, phone calls often drive the highest-margin deals. Match call timestamps, caller/click identifiers, and qualification rules to upload accurate call conversions.</p>
    `
  },
  {
    id: "ga4-looker-studio-custom-reporting",
    kind: "Guide",
    title: "Building Decision-Ready GA4 & Looker Studio Performance Reports",
    date: "October 10, 2026",
    category: "SQL, BI & AI Agents",
    tags: ["GA4", "BigQuery", "Looker Studio"],
    comments: 6,
    thumbBg: "from-amber-800 via-orange-900 to-slate-950",
    thumbBadge: "LOOKER STUDIO",
    thumbTitle: "Custom Performance Views",
    summary: "Structure GA4 custom dimensions, calculated metrics, and BigQuery tables into clear Looker Studio views focused on lead quality, CAC, and revenue.",
    body: `
      <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Building Decision-Ready GA4 &amp; Looker Studio Performance Reports</h1>
      <p>Good reporting separates channel volume from downstream conversion quality so stakeholders can make fast, data-backed budget decisions.</p>
    `
  },
  {
    id: "sha256-pii-hashing-best-practices",
    kind: "Tips",
    title: "#TrackingTips: Normalizing Email & Phone Before SHA-256 Hashing",
    date: "October 02, 2026",
    category: "sGTM & Ad Tracking",
    tags: ["SHA-256", "CAPI", "gclid"],
    comments: 9,
    thumbBg: "from-rose-800 via-pink-900 to-slate-950",
    thumbBadge: "MATCH QUALITY",
    thumbTitle: "Clean SHA-256 Normalization",
    summary: "Trim whitespace, lowercase emails, format phone numbers consistently, and verify hash output length before sending customer match parameters.",
    body: `
      <h1 class="text-2xl font-bold text-slate-900 dark:text-white">#TrackingTips: Normalizing Email &amp; Phone Before SHA-256 Hashing</h1>
      <p>Hashing raw, unnormalized strings produces mismatched hashes and lowers Event Match Quality. Always normalize first, then hash in lowercase hex format.</p>
    `
  },

  // ================= PAGE 2 (Posts 8–14) =================
  {
    id: "meta-capi-event-match-quality-guide",
    kind: "Guide",
    title: "Improving Meta CAPI Event Match Quality (EMQ) Without Over-Sending PII",
    date: "September 20, 2026",
    category: "sGTM & Ad Tracking",
    tags: ["CAPI", "SHA-256", "Cloudflare"],
    comments: 5,
    thumbBg: "from-fuchsia-800 via-purple-900 to-slate-950",
    thumbBadge: "META CAPI",
    thumbTitle: "EMQ & Deduplication",
    summary: "Normalize email, phone, and click IDs properly before SHA-256 hashing and align browser Pixel and server CAPI event_id values for clean attribution.",
    body: `
      <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Improving Meta CAPI Event Match Quality (EMQ)</h1>
      <p>Consistent <code>event_name</code>, <code>event_id</code>, and properly normalized hashed customer parameters help Meta match server events without inflating duplicate counts.</p>
    `
  },
  {
    id: "hubspot-apps-script-meta-oct",
    kind: "Tips",
    title: "#OCTtips: Zero-Subscription HubSpot to Meta Offline Conversions via Apps Script",
    date: "September 12, 2026",
    category: "CRM & Offline OCT",
    tags: ["HubSpot", "Apps Script", "CAPI"],
    comments: 9,
    thumbBg: "from-rose-800 via-red-900 to-slate-950",
    thumbBadge: "CRM OCT",
    thumbTitle: "HubSpot + Apps Script",
    summary: "Bridge HubSpot lifecycle stage updates, Google Sheets, and Google Apps Script to dispatch qualified lead and closed-won events without recurring middleware costs.",
    body: `
      <h1 class="text-2xl font-bold text-slate-900 dark:text-white">#OCTtips: HubSpot to Meta OCT with Apps Script</h1>
      <p>Use clean stage timestamps, idempotency keys, and SHA-256 hashed fields when sending offline lifecycle events from CRM workflows.</p>
    `
  },
  {
    id: "ga4-ecommerce-items-array-audit",
    kind: "Tips",
    title: "#AuditTips: Fixing Broken GA4 E-Commerce Items Arrays & Purchase Values",
    date: "September 03, 2026",
    category: "Data Discrepancy",
    tags: ["GA4", "BigQuery"],
    comments: 4,
    thumbBg: "from-blue-800 via-indigo-900 to-slate-950",
    thumbBadge: "DATA AUDIT",
    thumbTitle: "GA4 Items Schema",
    summary: "Catch missing item_id, currency mismatches, or duplicate transaction_id fires before they distort GA4 revenue and BigQuery export tables.",
    body: `
      <h1 class="text-2xl font-bold text-slate-900 dark:text-white">#AuditTips: GA4 E-Commerce Schema Audit</h1>
      <p>Validate <code>transaction_id</code> uniqueness, currency formatting, and <code>items</code> array consistency across checkout and thank-you states.</p>
    `
  },
  {
    id: "google-ads-enhanced-conversions-qa",
    kind: "Guide",
    title: "Google Ads Enhanced Conversions for Leads & Web QA Checklist",
    date: "August 25, 2026",
    category: "sGTM & Ad Tracking",
    tags: ["SHA-256", "gclid", "GA4"],
    comments: 6,
    thumbBg: "from-teal-800 via-emerald-900 to-slate-950",
    thumbBadge: "GOOGLE ADS",
    thumbTitle: "Enhanced Conversions",
    summary: "Verify user data normalization, field mapping, and conversion action diagnostics so Google Ads receives reliable first-party signals.",
    body: `
      <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Google Ads Enhanced Conversions QA Checklist</h1>
      <p>Check lowercase trimming, E.164/digit phone normalization, and tag firing timing on lead capture and checkout completion.</p>
    `
  },
  {
    id: "gohighlevel-attribution-pipeline",
    kind: "Guide",
    title: "GoHighLevel Lead & Opportunity Attribution Pipeline for Agencies",
    date: "August 16, 2026",
    category: "CRM & Offline OCT",
    tags: ["GoHighLevel", "gclid", "CAPI"],
    comments: 11,
    thumbBg: "from-purple-800 via-violet-900 to-slate-950",
    thumbBadge: "GOHIGHLEVEL",
    thumbTitle: "Pipeline Attribution",
    summary: "Capture landing UTMs, fbclid, and gclid into custom contact fields and trigger offline conversion feedback when pipeline stages advance.",
    body: `
      <h1 class="text-2xl font-bold text-slate-900 dark:text-white">GoHighLevel Lead &amp; Opportunity Attribution</h1>
      <p>Keep attribution fields intact from initial form or calendar booking through appointment booked, show, and closed-won stages.</p>
    `
  },
  {
    id: "bigquery-ga4-session-attribution-sql",
    kind: "Guide",
    title: "BigQuery SQL: Joining GA4 Export Events with CRM Conversion Stages",
    date: "August 07, 2026",
    category: "SQL, BI & AI Agents",
    tags: ["BigQuery", "GA4", "Looker Studio"],
    comments: 7,
    thumbBg: "from-slate-800 via-blue-950 to-slate-950",
    thumbBadge: "BIGQUERY SQL",
    thumbTitle: "GA4 + CRM Join",
    summary: "Query partitioned GA4 BigQuery exports cleanly and join lead identifiers or UTM touchpoints with downstream CRM outcomes.",
    body: `
      <h1 class="text-2xl font-bold text-slate-900 dark:text-white">BigQuery SQL: GA4 &amp; CRM Attribution Joins</h1>
      <p>Filter date partitions explicitly and deduplicate conversion keys before feeding tables into Looker Studio dashboards.</p>
    `
  },
  {
    id: "cookieyes-cookiebot-consent-v2",
    kind: "Tips",
    title: "#TrackingTips: Preventing Tag Firing Before Consent Mode v2 Defaults",
    date: "July 29, 2026",
    category: "Consent Mode v2",
    tags: ["GA4", "Cloudflare"],
    comments: 4,
    thumbBg: "from-amber-800 via-yellow-900 to-slate-950",
    thumbBadge: "CONSENT v2",
    thumbTitle: "Default Before Tags",
    summary: "Ensure Consent Mode default commands execute ahead of CMP initialization and marketing tags across regional traffic.",
    body: `
      <h1 class="text-2xl font-bold text-slate-900 dark:text-white">#TrackingTips: Consent Mode v2 Execution Order</h1>
      <p>Sequence default consent states before tag triggers so regional privacy rules and modeling signals stay aligned.</p>
    `
  },

  // ================= PAGE 3 (Posts 15–21) =================
  {
    id: "sgtm-hosting-cloudflare-vs-managed",
    kind: "Guide",
    title: "Server-Side GTM Hosting: Cloudflare Workers vs. Managed & Cloud Setups",
    date: "July 19, 2026",
    category: "sGTM & Ad Tracking",
    tags: ["Cloudflare", "GA4", "CAPI"],
    comments: 10,
    thumbBg: "from-sky-900 via-indigo-950 to-slate-950",
    thumbBadge: "sGTM HOSTING",
    thumbTitle: "Edge vs. Server Instances",
    summary: "Compare architectural trade-offs across Cloudflare Workers, Stape, and Google Cloud setups based on traffic scale, latency, and cost control.",
    body: `
      <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Server-Side GTM Hosting Trade-Offs</h1>
      <p>Choose edge routing or dedicated server instances based on throughput needs, debugging requirements, and predictable monthly cost.</p>
    `
  },
  {
    id: "wordpress-datalayer-2-standard",
    kind: "Guide",
    title: "Designing a Clean WordPress DataLayer 2.0 Schema for Leads & WooCommerce",
    date: "July 10, 2026",
    category: "sGTM & Ad Tracking",
    tags: ["GA4", "CAPI", "SHA-256"],
    comments: 7,
    thumbBg: "from-blue-900 via-sky-900 to-slate-950",
    thumbBadge: "DATALAYER 2.0",
    thumbTitle: "WordPress Event Schema",
    summary: "Standardize page, form, and e-commerce dataLayer pushes so GTM variables and tags stay resilient across theme or plugin updates.",
    body: `
      <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Designing a Clean WordPress DataLayer 2.0 Schema</h1>
      <p>Push structured objects with consistent key names rather than relying on fragile CSS selectors alone.</p>
    `
  },
  {
    id: "crm-oct-salesforce-pipedrive-capsule",
    kind: "Guide",
    title: "Syncing Salesforce, Pipedrive & Capsule CRM Deal Stages to Ad Platforms",
    date: "July 01, 2026",
    category: "CRM & Offline OCT",
    tags: ["gclid", "CAPI", "Apps Script"],
    comments: 6,
    thumbBg: "from-indigo-900 via-purple-950 to-slate-950",
    thumbBadge: "CRM SYNC",
    thumbTitle: "Deal Stage Feedback",
    summary: "Map CRM opportunity stages to conversion actions with strict deduplication so sales pipeline velocity informs ad optimization.",
    body: `
      <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Syncing CRM Deal Stages to Ad Platforms</h1>
      <p>Include conversion timestamp, currency, deal value, and unique order/lead IDs to prevent replay or out-of-order updates.</p>
    `
  },
  {
    id: "product-analytics-mixpanel-posthog-segment",
    kind: "Tips",
    title: "#TrackingTips: Event Naming Hygiene Across Mixpanel, PostHog & Segment",
    date: "June 22, 2026",
    category: "SQL, BI & AI Agents",
    tags: ["GA4", "BigQuery"],
    comments: 5,
    thumbBg: "from-purple-900 via-fuchsia-950 to-slate-950",
    thumbBadge: "EVENT TAXONOMY",
    thumbTitle: "Clean Event Naming",
    summary: "Avoid messy duplicate event names like signup_v1, SignUp, and form_submit by enforcing a clear object-action naming convention.",
    body: `
      <h1 class="text-2xl font-bold text-slate-900 dark:text-white">#TrackingTips: Event Naming Hygiene</h1>
      <p>Keep event names lowercase snake_case and pass variations as properties instead of creating separate event types.</p>
    `
  },
  {
    id: "attribution-platforms-triple-whale-redtrack-anytrack",
    kind: "Guide",
    title: "Attribution & Tracking Platforms: Triple Whale, RedTrack & AnyTrack Notes",
    date: "June 12, 2026",
    category: "Data Discrepancy",
    tags: ["CAPI", "gclid", "Looker Studio"],
    comments: 8,
    thumbBg: "from-teal-900 via-cyan-950 to-slate-950",
    thumbBadge: "ATTRIBUTION",
    thumbTitle: "Multi-Touch & Click IDs",
    summary: "Understand how click tracking, server events, and attribution windows align or diverge when auditing ad channel performance.",
    body: `
      <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Attribution &amp; Tracking Platforms: Practical Notes</h1>
      <p>Always reconcile platform-reported conversions against backend orders or CRM revenue before making major budget shifts.</p>
    `
  },
  {
    id: "first-party-cookie-persistence-guide",
    kind: "Tips",
    title: "#TrackingTips: Preserving First-Party Attribution Cookies Across Sessions",
    date: "June 03, 2026",
    category: "Consent Mode v2",
    tags: ["Cloudflare", "gclid", "GA4"],
    comments: 6,
    thumbBg: "from-amber-900 via-orange-950 to-slate-950",
    thumbBadge: "FIRST-PARTY DATA",
    thumbTitle: "Cookie & Storage Hygiene",
    summary: "Store landing UTMs and click IDs cleanly with appropriate expiration and domain attributes while respecting user consent choices.",
    body: `
      <h1 class="text-2xl font-bold text-slate-900 dark:text-white">#TrackingTips: Preserving First-Party Attribution Cookies</h1>
      <p>Ensure cookie attributes match root domain scope when traffic moves between www, subdomains, or landing pages.</p>
    `
  },
  {
    id: "matomo-self-hosted-analytics-overview",
    kind: "Tips",
    title: "#TrackingTips: When to Pair Matomo with GA4 & BigQuery",
    date: "May 25, 2026",
    category: "SQL, BI & AI Agents",
    tags: ["GA4", "Looker Studio"],
    comments: 4,
    thumbBg: "from-emerald-900 via-green-950 to-slate-950",
    thumbBadge: "WEB ANALYTICS",
    thumbTitle: "Matomo & GA4 Comparison",
    summary: "Compare data ownership, raw hit access, and reporting workflows when teams evaluate Matomo alongside GA4 and warehouse exports.",
    body: `
      <h1 class="text-2xl font-bold text-slate-900 dark:text-white">#TrackingTips: Pairing Matomo with GA4 &amp; BigQuery</h1>
      <p>Define your governance, privacy, and BI requirements first so the analytics stack matches how your team actually analyzes data.</p>
    `
  },

  // ================= PAGE 4 (Posts 22–28) =================
  {
    id: "custom-js-fetch-listener-forms",
    kind: "Guide",
    title: "Custom JavaScript Listeners & Fetch/Webhook Pipelines for Forms",
    date: "May 15, 2026",
    category: "CRM & Offline OCT",
    tags: ["Apps Script", "GoHighLevel", "HubSpot"],
    comments: 9,
    thumbBg: "from-rose-900 via-pink-950 to-slate-950",
    thumbBadge: "CUSTOM LISTENERS",
    thumbTitle: "Form & Webhook Capture",
    summary: "Capture AJAX/Fetch form submissions reliably and forward attribution metadata to webhooks, sheets, or CRM endpoints without bloated plugins.",
    body: `
      <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Custom JavaScript Listeners &amp; Webhook Pipelines</h1>
      <p>Attach clean listeners on verified submission responses rather than raw button clicks to avoid counting incomplete or invalid forms.</p>
    `
  },
  {
    id: "utm-gclid-fbclid-redirect-preservation",
    kind: "Tips",
    title: "#TrackingTips: Stopping Redirects & Subdomains from Wiping UTM & Click IDs",
    date: "May 06, 2026",
    category: "Data Discrepancy",
    tags: ["gclid", "GA4"],
    comments: 7,
    thumbBg: "from-blue-900 via-indigo-950 to-slate-950",
    thumbBadge: "PARAM PRESERVATION",
    thumbTitle: "UTM, gclid & fbclid",
    summary: "Catch URL parameters immediately on entry before trailing-slash redirects, geo-redirects, or cross-domain hops strip query strings.",
    body: `
      <h1 class="text-2xl font-bold text-slate-900 dark:text-white">#TrackingTips: Preserving UTM &amp; Click IDs Across Redirects</h1>
      <p>Snapshot landing query parameters on initial load and re-attach or persist them as first-party attribution values.</p>
    `
  },
  {
    id: "preventing-duplicate-conversions-ga4-meta",
    kind: "Tips",
    title: "#AuditTips: Eliminating Duplicate Purchase & Lead Events Across GTM",
    date: "April 27, 2026",
    category: "Data Discrepancy",
    tags: ["GA4", "CAPI"],
    comments: 8,
    thumbBg: "from-red-900 via-rose-950 to-slate-950",
    thumbBadge: "DEDUPLICATION",
    thumbTitle: "Stop Double Counting",
    summary: "Audit page reloads, multiple triggers, and overlapping tag templates that cause duplicate conversions in GA4, Meta, and Google Ads.",
    body: `
      <h1 class="text-2xl font-bold text-slate-900 dark:text-white">#AuditTips: Eliminating Duplicate Conversions</h1>
      <p>Check firing triggers in GTM Preview mode and verify transaction/event IDs across thank-you pages and server endpoints.</p>
    `
  },
  {
    id: "looker-studio-blended-roas-crm-view",
    kind: "Guide",
    title: "Blended Ad Spend, Lead Volume & CRM Revenue in Looker Studio",
    date: "April 18, 2026",
    category: "SQL, BI & AI Agents",
    tags: ["Looker Studio", "BigQuery"],
    comments: 6,
    thumbBg: "from-violet-900 via-purple-950 to-slate-950",
    thumbBadge: "BI DASHBOARDS",
    thumbTitle: "Blended ROAS & Pipeline",
    summary: "Combine ad channel costs with CRM pipeline and closed-won metrics so teams track true return rather than vanity cost-per-lead.",
    body: `
      <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Blended Ad Spend &amp; CRM Revenue in Looker Studio</h1>
      <p>Align date grains and currency fields before blending tables so daily and weekly trend charts stay accurate.</p>
    `
  },
  {
    id: "consent-mode-v2-diagnostics-checklist",
    kind: "Guide",
    title: "Consent Mode v2 Diagnostics: ad_user_data & ad_personalization",
    date: "April 09, 2026",
    category: "Consent Mode v2",
    tags: ["GA4", "gclid", "CAPI"],
    comments: 5,
    thumbBg: "from-amber-900 via-yellow-950 to-slate-950",
    thumbBadge: "CONSENT DIAGNOSTICS",
    thumbTitle: "v2 Signal Verification",
    summary: "Inspect consent state parameters on initial load and after user interaction across desktop and mobile browsers.",
    body: `
      <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Consent Mode v2 Diagnostics Checklist</h1>
      <p>Verify <code>ad_storage</code>, <code>analytics_storage</code>, <code>ad_user_data</code>, and <code>ad_personalization</code> transitions in Tag Assistant and network logs.</p>
    `
  },
  {
    id: "n8n-make-zapier-crm-attribution-routing",
    kind: "Tips",
    title: "#OCTtips: Structuring Webhook Payloads for CRM & Ad Conversion Flows",
    date: "March 30, 2026",
    category: "CRM & Offline OCT",
    tags: ["GoHighLevel", "HubSpot", "Apps Script"],
    comments: 7,
    thumbBg: "from-teal-900 via-emerald-950 to-slate-950",
    thumbBadge: "WEBHOOK PIPELINES",
    thumbTitle: "Clean CRM Payloads",
    summary: "Include consistent IDs, ISO timestamps, and fallback match fields in webhook payloads so downstream workflows don't fail silently.",
    body: `
      <h1 class="text-2xl font-bold text-slate-900 dark:text-white">#OCTtips: Structuring Webhook Payloads</h1>
      <p>Validate required fields early and log failed deliveries so no high-value conversion event goes missing.</p>
    `
  },
  {
    id: "custom-cdp-event-schema-design",
    kind: "Guide",
    title: "Lightweight First-Party Event Schema Design Without Heavy CDP Costs",
    date: "March 20, 2026",
    category: "SQL, BI & AI Agents",
    tags: ["Cloudflare", "BigQuery", "GA4"],
    comments: 5,
    thumbBg: "from-slate-900 via-blue-950 to-slate-950",
    thumbBadge: "FIRST-PARTY CDP",
    thumbTitle: "Lean Event Architecture",
    summary: "Build a practical event contract across web, server, and warehouse layers tailored for lean teams and agencies.",
    body: `
      <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Lightweight First-Party Event Schema Design</h1>
      <p>Document event names, required parameters, and owner responsibilities so tracking scales cleanly as new campaigns launch.</p>
    `
  },

  // ================= PAGE 5 (Posts 29–35) =================
  {
    id: "new-client-tracking-audit-framework",
    kind: "Guide",
    title: "How to Run a Fast Tracking & Attribution Audit on a New Client Account",
    date: "March 11, 2026",
    category: "Data Discrepancy",
    tags: ["GA4", "CAPI", "gclid"],
    comments: 10,
    thumbBg: "from-sky-900 via-blue-950 to-slate-950",
    thumbBadge: "AUDIT FRAMEWORK",
    thumbTitle: "Client Account Triage",
    summary: "Start with business goals and revenue definitions, then inspect GTM containers, consent states, CRM handoffs, and reporting discrepancies in order.",
    body: `
      <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Fast Tracking &amp; Attribution Audit Framework</h1>
      <p>Prioritize fixes by revenue impact—broken purchase/lead events and lost click IDs come first before cosmetic reporting tweaks.</p>
    `
  },
  {
    id: "debugging-event-id-mismatch-capi",
    kind: "Tips",
    title: "#TrackingTips: Spotting event_id Mismatches Between Pixel & Server CAPI",
    date: "March 02, 2026",
    category: "sGTM & Ad Tracking",
    tags: ["CAPI", "Cloudflare"],
    comments: 6,
    thumbBg: "from-fuchsia-900 via-purple-950 to-slate-950",
    thumbBadge: "DEDUP DEBUG",
    thumbTitle: "event_id Alignment",
    summary: "Generate a single unique event_id per user action and pass that exact value to both browser and server tags.",
    body: `
      <h1 class="text-2xl font-bold text-slate-900 dark:text-white">#TrackingTips: Spotting event_id Mismatches</h1>
      <p>If browser and server generate separate IDs independently, deduplication fails and conversions can be overcounted.</p>
    `
  },
  {
    id: "browser-restrictions-signal-recovery",
    kind: "Guide",
    title: "Recovering Attribution Signals Under Modern Browser & Privacy Controls",
    date: "February 20, 2026",
    category: "Data Discrepancy",
    tags: ["Cloudflare", "GA4", "CAPI", "gclid"],
    comments: 8,
    thumbBg: "from-indigo-900 via-slate-900 to-slate-950",
    thumbBadge: "SIGNAL RECOVERY",
    thumbTitle: "Resilient Measurement",
    summary: "Combine first-party endpoints, server-side tagging, consent-aware modeling, and CRM conversion syncs to keep measurement durable.",
    body: `
      <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Recovering Attribution Signals Under Privacy Controls</h1>
      <p>No single tactic solves everything alone; pairing clean client capture with server-side forwarding and CRM feedback gives the clearest picture.</p>
    `
  },
  {
    id: "crm-lifecycle-stage-mapping-oct",
    kind: "Tips",
    title: "#OCTtips: Mapping CRM Pipeline Stages to Ad Optimization Goals",
    date: "February 11, 2026",
    category: "CRM & Offline OCT",
    tags: ["GoHighLevel", "HubSpot", "gclid"],
    comments: 5,
    thumbBg: "from-rose-900 via-red-950 to-slate-950",
    thumbBadge: "STAGE MAPPING",
    thumbTitle: "Quality Over Volume",
    summary: "Choose conversion milestones that have enough volume for learning while filtering out spam or unqualified inquiries.",
    body: `
      <h1 class="text-2xl font-bold text-slate-900 dark:text-white">#OCTtips: Mapping CRM Pipeline Stages</h1>
      <p>Align stage triggers with sales qualification criteria so ad platforms optimize toward real pipeline value.</p>
    `
  },
  {
    id: "bigquery-cost-control-ga4-exports",
    kind: "Tips",
    title: "#AuditTips: Keeping BigQuery GA4 Queries Fast & Cost-Predictable",
    date: "February 02, 2026",
    category: "SQL, BI & AI Agents",
    tags: ["BigQuery", "GA4", "Looker Studio"],
    comments: 6,
    thumbBg: "from-slate-800 via-indigo-950 to-slate-950",
    thumbBadge: "BIGQUERY COST",
    thumbTitle: "Partition & Column Pruning",
    summary: "Avoid wildcard scans over huge date ranges when unnecessary, select only required fields, and materialize summary tables for dashboards.",
    body: `
      <h1 class="text-2xl font-bold text-slate-900 dark:text-white">#AuditTips: Keeping BigQuery Queries Fast &amp; Predictable</h1>
      <p>Use <code>_TABLE_SUFFIX</code> or partition filters and pre-aggregate daily metrics for fast Looker Studio loading.</p>
    `
  },
  {
    id: "looker-studio-executive-vs-ops-dashboards",
    kind: "Guide",
    title: "Designing Separate Executive & Operational Views in Looker Studio",
    date: "January 23, 2026",
    category: "SQL, BI & AI Agents",
    tags: ["Looker Studio", "GA4"],
    comments: 4,
    thumbBg: "from-amber-900 via-orange-950 to-slate-950",
    thumbBadge: "REPORTING UX",
    thumbTitle: "Audience-Tailored BI",
    summary: "Keep executive summaries concise around spend, leads, pipeline, and ROAS while placing granular channel/event diagnostics in dedicated tabs.",
    body: `
      <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Executive vs. Operational Looker Studio Views</h1>
      <p>Clear hierarchy prevents dashboard clutter and helps every stakeholder find the exact metric they need without confusion.</p>
    `
  },
  {
    id: "tracking-qa-launch-checklist",
    kind: "Tips",
    title: "#TrackingTips: Pre-Launch & Post-Go-Live Tracking QA Checklist",
    date: "January 14, 2026",
    category: "Data Discrepancy",
    tags: ["GA4", "CAPI", "gclid", "Looker Studio"],
    comments: 9,
    thumbBg: "from-emerald-900 via-teal-950 to-slate-950",
    thumbBadge: "LAUNCH QA",
    thumbTitle: "Before You Scale Spend",
    summary: "Test real form fills, checkout flows, consent toggles, and live platform diagnostics before scaling ad budgets.",
    body: `
      <h1 class="text-2xl font-bold text-slate-900 dark:text-white">#TrackingTips: Pre-Launch &amp; Post-Go-Live QA Checklist</h1>
      <p>A 15-minute end-to-end test after every site, CRM, or GTM change saves days of attribution guesswork later.</p>
    `
  }
];
