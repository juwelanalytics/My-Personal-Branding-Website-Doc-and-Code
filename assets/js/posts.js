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

      <p>In real-world analytics audits, tracking problems rarely look like a blank screen or a missing tag. Most of the time, the website form works, the checkout completes, and marketing campaigns still struggle because conversion signals get lost in transit, identifiers are formatted inconsistently, or client-side and server-side events disagree on what actually happened.</p>

      <p>When you run a single server-side Google Tag Manager (sGTM) container fronted by a first-party endpoint on Cloudflare Workers, you replace scattered browser-only guesses with a structured server-side measurement pipeline. Instead of letting every script fend for itself inside the visitor's browser, incoming telemetry passes through a controlled first-party path where GA4 and Meta Conversions API (CAPI) can be handled cleanly and consistently.</p>

      <p>This guide walks through why a single-container sGTM setup works well in practice, how data flows across each layer, which parameters and edge cases cause silent failures, and how to test the entire chain before trusting the numbers in reporting or ad optimization.</p>

      <div class="my-6 p-4 rounded-xl border border-sky-200 dark:border-sky-800/70 bg-sky-50/70 dark:bg-sky-950/25 space-y-2">
        <div class="text-xs font-mono font-bold uppercase tracking-wider text-sky-800 dark:text-sky-300">Core Architectural Takeaway</div>
        <p class="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          A <strong>single sGTM container</strong> fronted by a <strong>first-party Cloudflare Worker / edge endpoint</strong> gives you centralized payload control, stronger signal durability against browser restrictions, and a clean way to pair <strong>GA4</strong> measurement with <strong>deduplicated Meta CAPI</strong> conversions without multiplying separate server containers for every channel.
        </p>
      </div>

      <h2 class="text-xl font-bold text-slate-900 dark:text-white pt-3">Why Consolidate into a Single sGTM Container?</h2>
      <p>When teams build tracking piece by piece over time, setups often become fragmented: one GTM web container handles general events, a custom script pushes form actions, and ad tags are added or edited in different places with slightly different field names. Once an account has multiple funnels or campaigns, even small inconsistencies create big headaches.</p>
      <p>Consolidating into one server-side container behind a first-party endpoint helps keep the architecture disciplined and maintainable:</p>
      <ul class="list-disc pl-6 space-y-2">
        <li><strong>First-party request context:</strong> Routing browser tracking traffic through a first-party path or subdomain keeps requests aligned with your own domain context instead of relying solely on exposed third-party endpoints.</li>
        <li><strong>One place for event rules:</strong> Event names, currency codes, lead or order values, and user parameters can be checked and standardized inside one container rather than across multiple disconnected setups.</li>
        <li><strong>Cleaner browser + server deduplication:</strong> When Meta Pixel and Meta CAPI both report a conversion, keeping <code>event_name</code> and <code>event_id</code> aligned in one place makes deduplication much easier to control and audit.</li>
        <li><strong>Faster root-cause debugging:</strong> When numbers look off, you can trace a single action from browser push to edge/server request to GA4 and Meta diagnostics without guessing where the payload changed.</li>
      </ul>

      <h2 class="text-xl font-bold text-slate-900 dark:text-white pt-3">How Data Flows Across Each Layer</h2>
      <p>A reliable server-side setup is not magic—it is a chain of clear responsibilities. If any link in the chain drops a parameter, alters a timestamp, or fires out of order, downstream tools feel the impact immediately.</p>

      <div class="overflow-x-auto my-5 rounded-xl border border-slate-200 dark:border-slate-800">
        <table class="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr class="bg-slate-100 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 font-mono text-xs">
              <th class="py-2.5 px-3.5 border-b border-slate-200 dark:border-slate-700">Pipeline Layer</th>
              <th class="py-2.5 px-3.5 border-b border-slate-200 dark:border-slate-700">What Happens Here</th>
              <th class="py-2.5 px-3.5 border-b border-slate-200 dark:border-slate-700">What to Watch Closely</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
            <tr>
              <td class="py-2.5 px-3.5 font-mono text-xs font-semibold">1. Website &amp; DataLayer</td>
              <td class="py-2.5 px-3.5">Captures user interactions, conversion values, currency, and a unique <code>event_id</code>; fires browser Pixel when permitted.</td>
              <td class="py-2.5 px-3.5">Script blockers, late event pushes, or firing again on thank-you page reloads.</td>
            </tr>
            <tr>
              <td class="py-2.5 px-3.5 font-mono text-xs font-semibold">2. Cloudflare Worker / Edge</td>
              <td class="py-2.5 px-3.5">Receives first-party requests and forwards them to the sGTM server container endpoint.</td>
              <td class="py-2.5 px-3.5">Unintended caching, broken redirect rules, or dropped request headers/paths.</td>
            </tr>
            <tr>
              <td class="py-2.5 px-3.5 font-mono text-xs font-semibold">3. sGTM Server Container</td>
              <td class="py-2.5 px-3.5">Parses incoming events, validates fields, normalizes/hashes customer data, and triggers GA4 &amp; Meta CAPI tags.</td>
              <td class="py-2.5 px-3.5">Mismatched <code>event_id</code>, missing currency, or loose trigger conditions.</td>
            </tr>
            <tr>
              <td class="py-2.5 px-3.5 font-mono text-xs font-semibold">4. GA4 &amp; Meta CAPI</td>
              <td class="py-2.5 px-3.5">Stores analytics events/key events in GA4 and uses matched CAPI conversions to optimize Meta delivery.</td>
              <td class="py-2.5 px-3.5">Duplicate counts, unnormalized match fields, or inconsistent conversion values.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 class="text-xl font-bold text-slate-900 dark:text-white pt-3">Key Parameters to Align Between GA4 and Meta CAPI</h2>
      <p>One of the most common reasons teams struggle with cross-platform reporting is treating GA4 and Meta CAPI as completely separate languages without mapping core fields intentionally. While each platform has its own naming conventions, your conversion events should share consistent business meaning:</p>

      <div class="overflow-x-auto my-5 rounded-xl border border-slate-200 dark:border-slate-800">
        <table class="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr class="bg-slate-100 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 font-mono text-xs">
              <th class="py-2.5 px-3.5 border-b border-slate-200 dark:border-slate-700">Signal / Field</th>
              <th class="py-2.5 px-3.5 border-b border-slate-200 dark:border-slate-700">Role in Measurement</th>
              <th class="py-2.5 px-3.5 border-b border-slate-200 dark:border-slate-700">Practical Standard</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
            <tr>
              <td class="py-2.5 px-3.5 font-mono text-xs font-semibold">event_name</td>
              <td class="py-2.5 px-3.5">Identifies the action (lead, checkout, purchase, etc.) across client and server.</td>
              <td class="py-2.5 px-3.5">Keep naming consistent and documented so reports and triggers never drift.</td>
            </tr>
            <tr>
              <td class="py-2.5 px-3.5 font-mono text-xs font-semibold">event_id</td>
              <td class="py-2.5 px-3.5">Connects browser Pixel and server CAPI hits for the same action so they deduplicate.</td>
              <td class="py-2.5 px-3.5">Generate once per action in the browser and pass the exact same ID to both tags.</td>
            </tr>
            <tr>
              <td class="py-2.5 px-3.5 font-mono text-xs font-semibold">value &amp; currency</td>
              <td class="py-2.5 px-3.5">Quantifies lead or order value for reporting and value-based bidding.</td>
              <td class="py-2.5 px-3.5">Send clean numeric values with a standard currency code whenever value applies.</td>
            </tr>
            <tr>
              <td class="py-2.5 px-3.5 font-mono text-xs font-semibold">Normalized user fields</td>
              <td class="py-2.5 px-3.5">Improves customer matching on server events (such as email or phone when available).</td>
              <td class="py-2.5 px-3.5">Normalize first (trim, lowercase, consistent phone format) before SHA-256 hashing.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 class="text-xl font-bold text-slate-900 dark:text-white pt-3">Step-by-Step Implementation Blueprint</h2>
      <p>When setting up this pipeline from scratch—or untangling an existing setup that has grown messy—follow a deliberate order so you can isolate any issue quickly:</p>

      <ol class="list-decimal pl-6 space-y-3">
        <li>
          <strong>Lock down your event contract first:</strong>
          Decide which conversion events actually matter for your business (for example, form submission, booked call, or completed purchase), what parameters each event carries, and how a unique <code>event_id</code> is created for each single occurrence.
        </li>
        <li>
          <strong>Configure the Cloudflare Worker first-party route:</strong>
          Set up your worker or first-party routing rule so tracking requests hit your domain/edge path and forward cleanly to your sGTM server container URL. Make sure dynamic requests are not cached and error responses are easy to spot during testing.
        </li>
        <li>
          <strong>Verify incoming hits in sGTM Preview:</strong>
          Before worrying about ad platform dashboards, confirm that your server container receives the expected requests with intact event names, parameters, and identifiers.
        </li>
        <li>
          <strong>Wire up GA4 and Meta CAPI server tags:</strong>
          Configure your GA4 server tag to record clean analytics/key events, and configure your Meta CAPI tag with the matching <code>event_name</code>, matching <code>event_id</code>, and properly normalized/hashed user parameters where applicable.
        </li>
        <li>
          <strong>Add deduplication and reload guards:</strong>
          Confirm that a single conversion produces one browser Pixel hit and one server CAPI hit with the same <code>event_id</code>—and does not fire again if the visitor refreshes the thank-you page or navigates back and forth.
        </li>
      </ol>

      <h2 class="text-xl font-bold text-slate-900 dark:text-white pt-3">Real-World Edge Cases That Break Tracking Quietly</h2>
      <p>In real client work, broken setups rarely fail loudly with a big red error banner on the screen. Instead, they fail quietly—reporting slightly too many conversions, missing match data, or losing signals on specific browsers or pages:</p>
      <ul class="list-disc pl-6 space-y-2">
        <li><strong>Separate <code>event_id</code> generation on client and server:</strong> If your browser tag creates one random ID and your server tag creates another—or forgets to send <code>event_id</code>—Meta treats them as separate occurrences instead of deduplicating them.</li>
        <li><strong>Hashing unnormalized text or double-hashing:</strong> Uppercase letters, extra spaces, or inconsistent phone formatting reduce matching accuracy, while hashing a value that was already hashed produces an invalid result.</li>
        <li><strong>Thank-you page reloads and browser history:</strong> If a conversion fires on page load of a confirmation URL without checking whether that transaction/submission was already tracked, refreshing the page can inflate counts.</li>
        <li><strong>Redirects stripping query strings or context:</strong> A redirect from <code>http</code> to <code>https</code>, non-<code>www</code> to <code>www</code>, or a landing path to a confirmation path can drop context if URLs or storage are not handled carefully.</li>
        <li><strong>Consent timing mismatches:</strong> If tags fire before consent states are initialized or updated properly, signals can either be sent prematurely or held back unexpectedly.</li>
      </ul>

      <h2 class="text-xl font-bold text-slate-900 dark:text-white pt-3">End-to-End QA &amp; Troubleshooting Workflow</h2>
      <p>Never assume a pipeline is healthy just because a tag looks "published" in GTM. Run a structured verification pass every time you deploy changes to your site, Cloudflare Worker, or sGTM container:</p>
      <ol class="list-decimal pl-6 space-y-2">
        <li><strong>Trigger a real test action:</strong> Submit a test form or complete a test order in a clean browser session with your tag debugging tools and sGTM Preview open.</li>
        <li><strong>Trace the edge/server request:</strong> Confirm the request hits your Cloudflare Worker / first-party endpoint and appears inside sGTM Preview with the expected payload.</li>
        <li><strong>Check GA4 DebugView:</strong> Verify that the event arrives with the right name, parameters, currency/value, and key-event behavior.</li>
        <li><strong>Check Meta Events Manager diagnostics:</strong> Confirm that browser and server events both arrive, share the same <code>event_id</code>, and show healthy match and deduplication behavior.</li>
        <li><strong>Test the reload edge case:</strong> Refresh the confirmation page once and verify that duplicate conversion events do not fire.</li>
      </ol>

      <h2 class="text-xl font-bold text-slate-900 dark:text-white pt-3">Frequently Asked Questions (FAQ)</h2>

      <div class="space-y-4 pt-1">
        <div class="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#161B22]">
          <h3 class="font-bold text-slate-900 dark:text-white text-base">1. Should I use one sGTM container for both GA4 and Meta CAPI, or split them?</h3>
          <p class="mt-1.5 text-sm text-slate-700 dark:text-slate-300">For most websites, funnels, and agency setups, a single sGTM container is easier to manage. You receive events once, keep shared validation and deduplication logic in one place, and route tags to GA4 and Meta CAPI from the same container.</p>
        </div>

        <div class="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#161B22]">
          <h3 class="font-bold text-slate-900 dark:text-white text-base">2. What happens if event_id is missing or different between Pixel and CAPI?</h3>
          <p class="mt-1.5 text-sm text-slate-700 dark:text-slate-300">Without a matching <code>event_id</code> and <code>event_name</code> across both browser and server events, Meta cannot reliably deduplicate overlapping hits—which can lead to over-reported conversions and noisier campaign signals.</p>
        </div>

        <div class="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#161B22]">
          <h3 class="font-bold text-slate-900 dark:text-white text-base">3. Why normalize data before SHA-256 hashing?</h3>
          <p class="mt-1.5 text-sm text-slate-700 dark:text-slate-300">SHA-256 outputs a completely different hash for even minor formatting differences like leading spaces or capital letters. Normalizing first—and avoiding double-hashing—keeps matching clean and reliable.</p>
        </div>

        <div class="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#161B22]">
          <h3 class="font-bold text-slate-900 dark:text-white text-base">4. Why use Cloudflare Workers in front of sGTM?</h3>
          <p class="mt-1.5 text-sm text-slate-700 dark:text-slate-300">Cloudflare Workers give you lightweight, first-party edge routing and request control without heavy overhead, helping keep tracking endpoints clean and predictable alongside your server container.</p>
        </div>

        <div class="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#161B22]">
          <h3 class="font-bold text-slate-900 dark:text-white text-base">5. How often should I audit an sGTM + GA4 + Meta CAPI setup?</h3>
          <p class="mt-1.5 text-sm text-slate-700 dark:text-slate-300">Always test immediately after site, form, checkout, consent, or GTM changes, and do a periodic check whenever you notice sudden shifts in event counts, match quality, or campaign performance.</p>
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
