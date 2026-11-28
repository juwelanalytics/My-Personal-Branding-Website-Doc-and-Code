window.POSTS = [
  {
    id: "cloudflare-sgtm-ga4-capi",
    kind: "Guide",
    title: "Single-Container sGTM on Cloudflare Workers with GA4 & Meta CAPI",
    date: "November 22, 2026",
    category: "sGTM & Ad Tracking",
    tags: ["Cloudflare", "GA4", "CAPI", "SHA-256"],
    comments: 14,
    thumbBg: "from-sky-900 via-blue-950 to-slate-950",
    thumbBadge: "CLOUDFLARE sGTM",
    thumbTitle: "First-Party Edge Routing",
    visual: {
      mode: "flow",
      header: "CLOUDFLARE WORKER &rarr; sGTM",
      mainBox: "metrics.domain.com/g/collect",
      subCode: "GA4 + Meta CAPI &bull; event_id: deduplicated",
      statusText: "200 OK",
      footerNote: "First-Party Edge Routing"
    },
    summary: "Route first-party tracking requests through Cloudflare Workers to server-side GTM, forward clean GA4 events, and dispatch deduplicated Meta CAPI conversions with normalized SHA-256 matching.",
    body: `
      <h1 class="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white leading-tight">Single-Container sGTM on Cloudflare Workers with GA4 &amp; Meta CAPI</h1>
      <p>Browser tracking restrictions and script blockers continue to weaken client-only measurement. When a conversion event relies solely on a browser pixel, network interruptions or privacy controls can drop key signals before they reach GA4 or Meta.</p>
      <p>Routing requests through a first-party edge path into a single server-side Google Tag Manager (sGTM) container gives you predictable request handling, unified event validation, and cleaner server-to-platform forwarding.</p>

      <h2 class="text-xl font-bold text-slate-900 dark:text-white pt-2">Why Consolidate into One sGTM Container?</h2>
      <p>Running separate containers for every platform often creates drift in event names, currency values, and deduplication keys. A single sGTM container lets you receive incoming telemetry once and route clean payloads downstream.</p>
      <ul class="list-disc pl-6 space-y-1.5">
        <li><strong>Single source of payload rules:</strong> Validate event names, values, and user match fields before tags fire.</li>
        <li><strong>Consistent deduplication:</strong> Keep browser Pixel and server CAPI aligned on <code>event_name</code> and <code>event_id</code>.</li>
        <li><strong>Clearer debugging:</strong> Inspect incoming server requests and tag responses in one Preview stream.</li>
      </ul>

      <h2 class="text-xl font-bold text-slate-900 dark:text-white pt-2">Practical Implementation Flow</h2>
      <ol class="list-decimal pl-6 space-y-2">
        <li><strong>Configure first-party routing:</strong> Point your custom tracking endpoint/worker to your sGTM container URL.</li>
        <li><strong>Send aligned client events:</strong> Emit structured browser events with a unique <code>event_id</code> per conversion action.</li>
        <li><strong>Forward GA4 and CAPI cleanly:</strong> Map event parameters, transaction or lead values, and normalized customer fields in server tags.</li>
      </ol>

      <h2 class="text-xl font-bold text-slate-900 dark:text-white pt-2">Common Edge Cases &amp; Verification</h2>
      <p>Most tracking bugs come from small mismatches: generating different <code>event_id</code> values on client vs. server, forgetting currency codes, or firing conversion tags on thank-you page reloads. Always verify in sGTM Preview, GA4 DebugView, and Meta Events Manager before scaling spend.</p>
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
    thumbBg: "from-indigo-900 via-purple-950 to-slate-950",
    thumbBadge: "CRM ATTRIBUTION",
    thumbTitle: "Lead to Closed-Won OCT",
    visual: {
      mode: "flow",
      header: "GHL &bull; HUBSPOT &bull; ZOHO OCT",
      mainBox: "Stage: Closed-Won ($2,400)",
      subCode: "gclid + fbclid &rarr; Google/Meta Offline API",
      statusText: "SYNCED",
      footerNote: "Lead to Closed-Won Pipeline"
    },
    summary: "Capture gclid, fbclid, and UTM parameters at lead capture and push qualified or closed-won CRM stage changes back to ad platforms without paid SaaS lock-in.",
    body: `
      <h1 class="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white leading-tight">CRM Offline Conversion Pipelines for GoHighLevel, HubSpot &amp; Zoho</h1>
      <p>Ad platforms optimize toward whatever signal you feed them. If a campaign is trained only on raw form submissions, algorithms can easily over-reward low-quality or unqualified leads while starving campaigns that generate high-margin deals.</p>
      <p>By capturing attribution identifiers at lead entry and sending verified CRM stage milestones back to ad conversion APIs, you connect ad spend directly to real sales progression.</p>

      <h2 class="text-xl font-bold text-slate-900 dark:text-white pt-2">1. Capture Attribution at the Point of Entry</h2>
      <p>Before a visitor submits a form or books a calendar slot, store campaign context and click identifiers in first-party storage or hidden fields so they travel into the CRM contact or deal record.</p>
      <ul class="list-disc pl-6 space-y-1.5">
        <li>Capture <code>gclid</code>, <code>fbclid</code>, and core UTM parameters on landing.</li>
        <li>Persist them across multi-step forms, redirects, and thank-you transitions.</li>
        <li>Keep normalized contact details (email and phone) ready for downstream matching.</li>
      </ul>

      <h2 class="text-xl font-bold text-slate-900 dark:text-white pt-2">2. Trigger Syncs on Meaningful CRM Stages</h2>
      <p>Whether you operate in GoHighLevel, HubSpot, or Zoho CRM, fire offline conversion updates only when a lead reaches a validated stage—such as <em>Qualified Lead</em>, <em>Discovery Completed</em>, or <em>Closed-Won</em>—along with an accurate timestamp, currency, and deal value.</p>

      <h2 class="text-xl font-bold text-slate-900 dark:text-white pt-2">Guardrails Against Bad Feedback</h2>
      <p>Prevent duplicate uploads when deals move backward and forward between stages, avoid sending test leads into live conversion streams, and keep error logs so failed webhook or API calls can be inspected and replayed cleanly.</p>
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
    thumbBg: "from-emerald-900 via-teal-950 to-slate-950",
    thumbBadge: "DATA AUDIT & BI",
    thumbTitle: "Discrepancy to Looker Studio",
    visual: {
      mode: "problem",
      header: "#DataAudit &bull; Platform Gap Check",
      mainBox: "Meta: 142 Leads vs GA4: 98 Leads",
      subCode: "Fix: Consent Mode v2 + BigQuery Join",
      statusText: "??? -31% GAP",
      footerNote: "Reconcile GA4, Ads & BigQuery"
    },
    summary: "Diagnose attribution gaps across GA4, Meta, and Google Ads, validate Consent Mode v2 states, and model clean tables in BigQuery for Looker Studio reporting.",
    body: `
      <h1 class="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white leading-tight">Fixing Ad Platform Discrepancies, Consent Mode v2 &amp; BigQuery Reporting</h1>
      <p>Seeing different conversion counts in Meta Ads, Google Ads, and GA4 is normal to a degree—each platform uses its own attribution window, modeling rules, and identity matching. The real problem starts when you cannot tell whether a gap is expected methodology or a broken tag.</p>

      <h2 class="text-xl font-bold text-slate-900 dark:text-white pt-2">How to Separate Expected Variance from Real Bugs</h2>
      <ul class="list-disc pl-6 space-y-1.5">
        <li><strong>Check attribution windows:</strong> Compare click-through vs. view-through windows and lookback periods across platforms.</li>
        <li><strong>Audit Consent Mode v2 timing:</strong> Confirm default and update signals fire in the right order so consent states are accurate.</li>
        <li><strong>Inspect duplicate or blocked tags:</strong> Check whether triggers fire twice, fail on redirects, or miss key parameters.</li>
      </ul>

      <h2 class="text-xl font-bold text-slate-900 dark:text-white pt-2">Using BigQuery as a Calm Reconciliation Layer</h2>
      <p>Exporting GA4 event data to BigQuery and joining it with CRM or order records lets you inspect raw timestamps, user/event keys, and revenue outcomes without relying solely on high-level UI summaries. From there, build clean Looker Studio views that teams can trust.</p>
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
    thumbBg: "from-cyan-900 via-sky-950 to-slate-950",
    thumbBadge: "sGTM ARCHITECTURE",
    thumbTitle: "page_hostname Lookup",
    visual: {
      mode: "tip",
      header: "#TrackingTips &bull; Multi-Domain sGTM",
      mainBox: "Lookup Table: {{Page Hostname}}",
      subCode: "us.brand.com &rarr; G-US01 | uk.brand.com &rarr; G-UK02",
      statusText: "1 CONTAINER",
      footerNote: "Dynamic GA4 & Pixel Routing"
    },
    summary: "Use lookup tables on incoming event hostnames to route regional storefronts or client properties cleanly inside one server-side GTM container.",
    body: `
      <h1 class="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white leading-tight">#TrackingTips: Multi-Domain Routing in a Single sGTM Container</h1>
      <p>When managing multiple regional domains, funnels, or properties, cloning an entire server-side GTM container for every hostname quickly becomes hard to maintain. A cleaner pattern is keeping one shared container and resolving destination IDs dynamically from the incoming hostname.</p>

      <h2 class="text-xl font-bold text-slate-900 dark:text-white pt-2">How Hostname Lookup Routing Works</h2>
      <ol class="list-decimal pl-6 space-y-2">
        <li>Read the incoming request or event hostname cleanly in sGTM.</li>
        <li>Use a lookup table variable to map each domain or subdomain to its specific GA4 Measurement ID, Pixel ID, or configuration value.</li>
        <li>Set a safe fallback or unmapped state so unrecognized traffic never pollutes a live property silently.</li>
      </ol>

      <h2 class="text-xl font-bold text-slate-900 dark:text-white pt-2">What to Double-Check</h2>
      <p>Test both root domains and subdomains (such as <code>www</code>, regional paths, or checkout subdomains) in Preview mode, and verify that cross-domain or session parameters are not dropped during routing.</p>
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
    thumbBg: "from-violet-900 via-indigo-950 to-slate-950",
    thumbBadge: "CALL ATTRIBUTION",
    thumbTitle: "Phone Leads to Google Ads",
    visual: {
      mode: "flow",
      header: "CALLRAIL &bull; TWILIO &bull; GHL",
      mainBox: "Inbound Call &gt; 90s (Qualified)",
      subCode: "caller_id + gclid &rarr; Offline Call Conv.",
      statusText: "MATCHED",
      footerNote: "Qualified Phone Calls to Ads"
    },
    summary: "Connect call tracking logs and qualifying call durations back to Google Ads offline conversions so high-intent phone leads are properly valued.",
    body: `
      <h1 class="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white leading-tight">Offline Call Conversion Tracking: CallRail, Twilio &amp; GoHighLevel</h1>
      <p>For appointment-driven and service businesses, a 2-minute phone call can be worth far more than ten form clicks—while a 5-second wrong number is noise. Treating every call equally wastes bidding budget.</p>

      <h2 class="text-xl font-bold text-slate-900 dark:text-white pt-2">Building a Quality-Filtered Call Loop</h2>
      <ul class="list-disc pl-6 space-y-1.5">
        <li><strong>Capture session &amp; click context:</strong> Preserve landing click IDs and campaign details when a visitor views or dials a tracked number.</li>
        <li><strong>Define real qualification rules:</strong> Filter by call duration, call status, or CRM disposition/tag so short hang-ups or spam calls do not pollute conversion signals.</li>
        <li><strong>Send structured call conversions:</strong> Include consistent timestamps, identifiers, and value rules aligned with your ad account.</li>
      </ul>

      <h2 class="text-xl font-bold text-slate-900 dark:text-white pt-2">Verification Notes</h2>
      <p>Check call logs against ad click timestamps to ensure attribution windows match, and confirm that numbers on mobile and desktop swap or record consistently without breaking click attribution.</p>
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
    thumbBg: "from-amber-900 via-orange-950 to-slate-950",
    thumbBadge: "LOOKER STUDIO",
    thumbTitle: "Custom Performance Views",
    visual: {
      mode: "dashboard",
      header: "LOOKER STUDIO &bull; GA4 BI",
      mainBox: "SQL Leads: 318 | CAC: $42.50",
      subCode: "Channel &rarr; Qualified Pipeline &rarr; Revenue",
      statusText: "LIVE BI",
      footerNote: "Decision-Ready KPI Dashboard"
    },
    summary: "Structure GA4 custom dimensions, calculated metrics, and BigQuery tables into clear Looker Studio views focused on lead quality, CAC, and revenue.",
    body: `
      <h1 class="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white leading-tight">Building Decision-Ready GA4 &amp; Looker Studio Performance Reports</h1>
      <p>A report is only useful if it helps someone decide what to do next. Packing dozens of charts onto one screen often hides the real story—whether acquisition is bringing qualified pipeline, profitable orders, or wasted spend.</p>

      <h2 class="text-xl font-bold text-slate-900 dark:text-white pt-2">Designing Clear Reporting Layers</h2>
      <ul class="list-disc pl-6 space-y-1.5">
        <li><strong>Lead with outcome metrics:</strong> Show qualified leads, pipeline value, revenue, and acquisition cost near the top.</li>
        <li><strong>Keep dimensions clean:</strong> Standardize channel, campaign, and event parameters before building charts so <code>(not set)</code> does not surprise stakeholders.</li>
        <li><strong>Separate summary and diagnostics:</strong> Give executives a clean overview while keeping event/channel troubleshooting in a dedicated view.</li>
      </ul>

      <h2 class="text-xl font-bold text-slate-900 dark:text-white pt-2">Maintenance Habit</h2>
      <p>Whenever you add a new campaign parameter, form event, or CRM stage, update your reporting documentation and check Looker Studio scorecards for unexpected drops or spikes.</p>
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
    thumbBg: "from-rose-900 via-pink-950 to-slate-950",
    thumbBadge: "MATCH QUALITY",
    thumbTitle: "Clean SHA-256 Normalization",
    visual: {
      mode: "tip",
      header: "#TrackingTips &bull; PII Normalization",
      mainBox: "trim().toLowerCase() &rarr; sha256()",
      subCode: "\" User@Mail.com \" &rarr; 64-char hex hash",
      statusText: "EMQ 9.1/10",
      footerNote: "Clean Email & E.164 Phone Hash"
    },
    summary: "Trim whitespace, lowercase emails, format phone numbers consistently, and verify hash output length before sending customer match parameters.",
    body: `
      <h1 class="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white leading-tight">#TrackingTips: Normalizing Email &amp; Phone Before SHA-256 Hashing</h1>
      <p>SHA-256 is deterministic: even a single leading space or uppercase letter changes the resulting hash completely. If your data is not normalized before hashing, matching rates drop even when the underlying user is the same person.</p>

      <h2 class="text-xl font-bold text-slate-900 dark:text-white pt-2">Normalization Rules to Apply First</h2>
      <ol class="list-decimal pl-6 space-y-2">
        <li><strong>Email:</strong> Trim leading/trailing spaces and convert to lowercase before hashing.</li>
        <li><strong>Phone numbers:</strong> Strip spaces, dashes, and formatting characters consistently according to the target platform's expected format.</li>
        <li><strong>Hash format:</strong> Produce a lowercase 64-character hexadecimal SHA-256 digest—never hash an already-hashed string a second time.</li>
      </ol>

      <h2 class="text-xl font-bold text-slate-900 dark:text-white pt-2">Quick Sanity Check</h2>
      <p>Test sample inputs before going live and confirm that empty or missing fields are omitted cleanly rather than hashed as empty strings or placeholder text.</p>
    `
  }
  
];
