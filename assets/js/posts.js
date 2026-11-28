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
     body: `
   body: body: `
      <h1 class="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white leading-tight">Single-Container sGTM on Cloudflare Workers with GA4 &amp; Meta CAPI</h1>

      <p>In real-world tracking audits, conversion loss rarely happens because a marketing team forgot to place a tag on the website. More often, the tag exists, the form or checkout works, and campaigns still look under-attributed because browser restrictions intercept hits, identifiers are not normalized properly, or client-side and server-side events drift out of sync.</p>

      <p>When you route first-party telemetry through a custom endpoint or Cloudflare Worker into a single server-side Google Tag Manager (sGTM) container, you gain a much cleaner control layer. Instead of letting every third-party script negotiate its own path and payload directly in the browser, incoming hits pass through a structured server-side pipeline where GA4 and Meta Conversions API (CAPI) can be handled consistently.</p>

      <div class="my-6 p-4 rounded-xl border border-sky-200 dark:border-sky-800/70 bg-sky-50/70 dark:bg-sky-950/25 space-y-2">
        <div class="text-xs font-mono font-bold uppercase tracking-wider text-sky-800 dark:text-sky-300">Core Architectural Takeaway</div>
        <p class="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Using <strong>one sGTM container</strong> fronted by a <strong>first-party edge endpoint</strong> reduces client-side signal loss, centralizes event validation, and allows you to pair <strong>GA4</strong> measurement with <strong>deduplicated Meta CAPI</strong> events without maintaining separate server containers for every channel.
        </p>
      </div>

      <h2 class="text-xl font-bold text-slate-900 dark:text-white pt-3">Why Consolidate into a Single sGTM Container?</h2>
      <p>Teams that scale tracking across multiple ad platforms and funnels often end up with fragmented setups: one GTM container for web events, ad-hoc scripts for forms, and inconsistent parameter names across tags. Over time, small naming or formatting differences turn reporting into guesswork.</p>
      <p>A single-container server-side architecture solves this by acting as a clean traffic and data-hygiene hub before events reach downstream platforms:</p>
      <ul class="list-disc pl-6 space-y-2">
        <li><strong>First-party request handling:</strong> Routing through a first-party subdomain or Cloudflare Worker path keeps tracking requests aligned with your own domain context instead of relying solely on exposed third-party endpoints.</li>
        <li><strong>Unified schema control:</strong> Event names, currency codes, transaction or lead values, and custom parameters can be checked in one place so GA4 and Meta CAPI reflect the same business action.</li>
        <li><strong>Cleaner deduplication:</strong> Passing a consistent <code>event_name</code> and <code>event_id</code> across browser Pixel and server CAPI helps Meta recognize that both hits belong to the same user action.</li>
        <li><strong>Simpler troubleshooting:</strong> When an event looks off, you can trace the flow from browser dataLayer to edge/server request to platform diagnostics without jumping across disconnected setups.</li>
      </ul>

      <h2 class="text-xl font-bold text-slate-900 dark:text-white pt-3">Client-Side vs. Single-Container sGTM Flow</h2>
      <p>Understanding where responsibilities sit between the browser, the edge/server layer, and destination platforms prevents duplicate fires and missing fields:</p>

      <div class="overflow-x-auto my-5 rounded-xl border border-slate-200 dark:border-slate-800">
        <table class="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr class="bg-slate-100 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 font-mono text-xs">
              <th class="py-2.5 px-3.5 border-b border-slate-200 dark:border-slate-700">Layer</th>
              <th class="py-2.5 px-3.5 border-b border-slate-200 dark:border-slate-700">Primary Responsibility</th>
              <th class="py-2.5 px-3.5 border-b border-slate-200 dark:border-slate-700">Key Watchout</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
            <tr>
              <td class="py-2.5 px-3.5 font-mono text-xs font-semibold">Browser / DataLayer</td>
              <td class="py-2.5 px-3.5">Captures user action, event payload, and a shared <code>event_id</code>; runs browser Pixel when allowed.</td>
              <td class="py-2.5 px-3.5">Script blockers, late triggers, or firing on thank-you page reloads.</td>
            </tr>
            <tr>
              <td class="py-2.5 px-3.5 font-mono text-xs font-semibold">Cloudflare Worker / Edge</td>
              <td class="py-2.5 px-3.5">Routes first-party tracking requests cleanly to the sGTM server endpoint.</td>
              <td class="py-2.5 px-3.5">Stripped headers, redirect loops, or unintended caching of dynamic requests.</td>
            </tr>
            <tr>
              <td class="py-2.5 px-3.5 font-mono text-xs font-semibold">sGTM Container</td>
              <td class="py-2.5 px-3.5">Parses incoming events, validates fields, normalizes/hashes user data, and dispatches GA4 &amp; CAPI tags.</td>
              <td class="py-2.5 px-3.5">Mismatched <code>event_id</code>, missing currency, or unguarded trigger conditions.</td>
            </tr>
            <tr>
              <td class="py-2.5 px-3.5 font-mono text-xs font-semibold">GA4 &amp; Meta CAPI</td>
              <td class="py-2.5 px-3.5">Records analytics events/key events and optimizes ad delivery using matched conversions.</td>
              <td class="py-2.5 px-3.5">Over-counting duplicates or under-matching due to raw unnormalized fields.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 class="text-xl font-bold text-slate-900 dark:text-white pt-3">Step-by-Step Setup &amp; Configuration Guide</h2>
      <p>Building this pipeline cleanly is all about sequence. Set up your event contract first, connect the edge/server transport second, and validate deduplication and parameters third:</p>

      <ol class="list-decimal pl-6 space-y-3">
        <li>
          <strong>Standardize your browser event &amp; <code>event_id</code>:</strong>
          Whenever a key conversion occurs (such as a qualified lead submission, checkout start, or completed purchase), generate one unique <code>event_id</code> for that specific action and push it alongside clean parameters like <code>value</code>, <code>currency</code>, and relevant item or lead attributes.
        </li>
        <li>
          <strong>Route traffic through Cloudflare Workers to sGTM:</strong>
          Configure your first-party endpoint on Cloudflare Workers so incoming tracking requests are forwarded to your server-side GTM container URL while preserving essential request context. Keep routing rules focused and avoid caching dynamic tracking endpoints.
        </li>
        <li>
          <strong>Configure the GA4 server tag:</strong>
          In sGTM, ensure your GA4 client receives the incoming event stream and triggers the GA4 tag with consistent event names, parameters, and conversion/key event alignment so analytics reports stay clean.
        </li>
        <li>
          <strong>Configure Meta CAPI with matching &amp; deduplication:</strong>
          Send the server event to Meta Conversions API using the exact same <code>event_name</code> and <code>event_id</code> used by the browser Pixel. Normalize customer match fields (such as trimming and lowercasing email addresses or formatting phone numbers consistently) before SHA-256 hashing.
        </li>
        <li>
          <strong>Guard against repeat fires:</strong>
          Add safeguards so a visitor refreshing a confirmation page or clicking a submit button multiple times does not trigger duplicate conversion events in your pipeline.
        </li>
      </ol>

      <h2 class="text-xl font-bold text-slate-900 dark:text-white pt-3">Real-World Edge Cases &amp; Audit Traps</h2>
      <p>In day-to-day troubleshooting, setups rarely break because of a single dramatic error. Instead, subtle edge cases quietly erode accuracy over time:</p>
      <ul class="list-disc pl-6 space-y-2">
        <li><strong>Different <code>event_id</code> values on client vs. server:</strong> If the browser Pixel tag and server CAPI tag generate separate IDs—or if <code>event_id</code> is missing on one side—Meta cannot deduplicate them properly, leading to inflated conversion counts or noisy optimization signals.</li>
        <li><strong>Improper normalization or double-hashing before SHA-256:</strong> Hashing raw strings with leading/trailing spaces or capital letters reduces match accuracy, and hashing an already-hashed string breaks matching completely.</li>
        <li><strong>Missing <code>currency</code> or inconsistent value types:</strong> Sending a conversion value without a valid ISO currency code (like <code>USD</code>) or passing formatted currency strings instead of clean numeric values can cause reporting or ad-platform warnings.</li>
        <li><strong>Redirects dropping query parameters or context:</strong> If a landing page or thank-you flow redirects across URLs or subdomains carelessly, attribution context or event triggers can be skipped.</li>
        <li><strong>Unverified consent states:</strong> If consent signals are delayed or misconfigured, tags may either fire too early or hold back signals longer than intended.</li>
      </ul>

      <h2 class="text-xl font-bold text-slate-900 dark:text-white pt-3">End-to-End QA &amp; Verification Checklist</h2>
      <p>Before marking any sGTM + GA4 + Meta CAPI setup complete, walk through a full live test from start to finish:</p>
      <ol class="list-decimal pl-6 space-y-2">
        <li>Open your website, browser developer tools / tag debugger, and sGTM Preview mode.</li>
        <li>Complete a real test action (such as a test lead form or checkout step) and verify that the request reaches your Cloudflare Worker / first-party endpoint and shows up in sGTM Preview.</li>
        <li>Inspect the event payload inside sGTM Preview to confirm <code>event_name</code>, <code>event_id</code>, <code>currency</code>, <code>value</code>, and user match fields are populated as expected.</li>
        <li>Verify that GA4 DebugView receives the event cleanly and that Meta Events Manager test events show both browser and server signals with proper deduplication.</li>
        <li>Re-test a page reload on the confirmation screen to confirm duplicate conversion tags do not fire unintentionally.</li>
      </ol>

      <h2 class="text-xl font-bold text-slate-900 dark:text-white pt-3">Frequently Asked Questions (FAQ)</h2>

      <div class="space-y-4 pt-1">
        <div class="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#161B22]">
          <h3 class="font-bold text-slate-900 dark:text-white text-base">Do I need separate sGTM containers for GA4 and Meta CAPI?</h3>
          <p class="mt-1.5 text-sm text-slate-700 dark:text-slate-300">Not necessarily. A single sGTM container can receive incoming events, validate shared parameters, and dispatch both GA4 and Meta CAPI tags cleanly, which usually keeps maintenance and debugging much simpler for most setups.</p>
        </div>

        <div class="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#161B22]">
          <h3 class="font-bold text-slate-900 dark:text-white text-base">Why is event_id so important when using both Meta Pixel and CAPI?</h3>
          <p class="mt-1.5 text-sm text-slate-700 dark:text-slate-300">When the same conversion is sent from both the browser and the server, a shared <code>event_id</code> (paired with the same <code>event_name</code>) allows Meta to recognize duplicate submissions of the same event and keep reporting accurate.</p>
        </div>

        <div class="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#161B22]">
          <h3 class="font-bold text-slate-900 dark:text-white text-base">Should I hash user data before or after normalizing it?</h3>
          <p class="mt-1.5 text-sm text-slate-700 dark:text-slate-300">Always normalize first—trim whitespace, convert emails to lowercase, and standardize phone formatting—before running SHA-256 hashing, and make sure you do not hash a value twice.</p>
        </div>

        <div class="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#161B22]">
          <h3 class="font-bold text-slate-900 dark:text-white text-base">Does server-side tracking replace proper QA and consent checks?</h3>
          <p class="mt-1.5 text-sm text-slate-700 dark:text-slate-300">No. Server-side tracking improves signal reliability and control, but accurate measurement still depends on clean event triggers, proper consent handling, and regular testing in Preview mode, GA4 DebugView, and platform event logs.</p>
        </div>
      </div>
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
