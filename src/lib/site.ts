export const site = {
  name: "Zulaiz",
  /*
    Kept under 155 characters. This is the fallback description and the one
    used for Open Graph and Twitter, and Google truncates the snippet around
    that length. The previous copy ran to 173 and was cut mid-clause.
  */
  description:
    "Zulaiz runs customer support for ecommerce brands, rental hosts and course creators. Named agents handle email, live chat, WISMO, guest messaging and student enquiries from $7 an hour.",
  url: "https://zulaiz.com",
  email: "hello@zulaiz.com",
  social: {
    linkedin: "https://www.linkedin.com/company/zulaiz",
  },
} as const;

/* One CTA label per intent, used everywhere on the site. */
export const CTA = {
  primary: "Book a demo",
  primaryHref: "/contact",
  secondary: "See pricing",
  secondaryHref: "/pricing",
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export type Service = {
  slug: string;
  name: string;
  navLabel: string;
  href: string;
  summary: string;
  /*
    Written for the search snippet, not the page. The summary reads as body
    copy mid-scroll, where the brand and the channel are already established;
    a snippet has neither, so it needs the service named in the first few
    words and has to stop under 155 characters.
  */
  metaDescription?: string;
  /* Phosphor icon name, resolved in components/service-icon.tsx */
  icon:
    | "envelope"
    | "chats"
    | "package"
    | "arrows"
    | "star"
    | "house"
    | "graduation";
  image?: { src: string; alt: string };
  /* Only WISMO has one: the home page bento tile uses a different crop. */
  tileImage?: { src: string; alt: string };
  metrics: { value: string; label: string }[];
  /* Grouped so the detail page never renders a flat list of more than five rows. */
  scope: { group: string; items: string[] }[];
  approach: { title: string; body: string }[];
  faq: { q: string; a: string }[];
  cta?: { title: string; body: string };
  featured: boolean;
};

export const services: Service[] = [
  {
    slug: "wismo",
    name: "WISMO and order tracking",
    navLabel: "WISMO",
    href: "/services/wismo",
    summary:
      "Where is my order is usually half your inbox. We answer it in minutes, then remove it with proactive delay alerts and carrier escalations.",
    metaDescription:
      "WISMO support that answers in minutes and then removes the ticket. Live carrier lookups, proactive delay alerts and same day claims, from $7 an hour.",
    icon: "package",
    image: {
      src: "/images/banner-wismo.jpg",
      alt: "Cardboard parcels moving along a sorting conveyor in a fulfilment warehouse",
    },
    tileImage: {
      src: "/images/wismo-tile.jpg",
      alt: "A fulfilment warehouse aisle with parcels on a conveyor",
    },
    metrics: [
      { value: "Up to 30%", label: "WISMO deflection by month three" },
      { value: "Same day", label: "Carrier claims filed for lost parcels" },
      { value: "47%", label: "Median share of an inbox before we start" },
    ],
    scope: [
      {
        group: "Answering",
        items: [
          "Live carrier lookups instead of a pasted tracking link",
          "In-policy reship and refund calls without waiting on your team",
          "Address corrections and delivery reroutes while the parcel moves",
        ],
      },
      {
        group: "Preventing",
        items: [
          "Proactive delay emails sent before the customer thinks to ask",
          "Branded tracking page and post-purchase email sequence review",
          "Weekly carrier performance read by lane and service level",
        ],
      },
    ],
    approach: [
      {
        title: "Answer",
        body: "Every ticket gets a real status pulled live from the carrier, with a next step and a date the customer can plan around.",
      },
      {
        title: "Anticipate",
        body: "We watch shipments in transit and email customers about delays first. That is where most of the deflection comes from.",
      },
      {
        title: "Eliminate",
        body: "Carrier and lane data goes back to your ops team monthly, so the root causes get fixed instead of handled again next week.",
      },
    ],
    faq: [
      {
        q: "Which carriers and platforms do you work with?",
        a: "Shopify, WooCommerce and BigCommerce on the storefront side. USPS, UPS, FedEx, DHL, Royal Mail, Evri and most regional couriers on the delivery side, plus tracking tools like AfterShip and Shippo.",
      },
      {
        q: "Can you issue refunds or reships?",
        a: "Within limits you set. You define the policy and the value thresholds, we execute inside them, and anything outside comes to you with a recommendation attached.",
      },
    ],
    cta: {
      title: "Want WISMO off your plate?",
      body: "Book thirty minutes. We will read your recent tracking tickets and come back with a deflection estimate.",
    },
    featured: true,
  },
  {
    slug: "email-support",
    name: "Email support",
    navLabel: "Email support",
    href: "/services/email-support",
    summary:
      "A trained pod owns your shared inbox. Triage, replies, escalations and reporting, in a voice indistinguishable from your own team.",
    metaDescription:
      "Email support for ecommerce brands. A named pod owns your shared inbox and replies in your voice, with a 20 minute median first response.",
    icon: "envelope",
    image: {
      src: "/images/banner-email-support.jpg",
      alt: "Three support specialists at spaced desks in a sunlit open-plan office",
    },
    metrics: [
      { value: "20 min", label: "Median first response across accounts" },
      { value: "79%", label: "Tickets resolved in a single reply" },
      { value: "4.8", label: "Average CSAT out of 5" },
    ],
    scope: [
      {
        group: "The team",
        items: [
          "Named agents trained on your catalogue, policies and tone",
          "A team lead who owns quality and talks to you directly",
          "Weekly QA against a rubric you can read",
        ],
      },
      {
        group: "The setup",
        items: [
          "Helpdesk build or clean-up in Gorgias, Zendesk, Front or Help Scout",
          "Macro library written from your last 90 days of tickets",
          "Tagging taxonomy so you can see what customers actually complain about",
        ],
      },
    ],
    approach: [
      {
        title: "Audit",
        body: "We read 500 of your recent tickets, map the top contact drivers, and flag the ones that should not exist at all.",
      },
      {
        title: "Build",
        body: "Macros, tags, routing and a written voice guide get approved by you before a single live ticket is touched.",
      },
      {
        title: "Run",
        body: "Your pod works the queue to an agreed SLA and logs every fix that would prevent the next ticket like it.",
      },
    ],
    faq: [
      {
        q: "Do you use our helpdesk or your own?",
        a: "Yours. We work inside your instance as named users, so your history, your data and your reporting never move to a system you cannot audit.",
      },
      {
        q: "How do you keep replies on brand?",
        a: "We write a voice guide with you in the first week. Greetings, sign-offs, how much personality, what we never promise. A sample of replies is scored against it every week.",
      },
    ],
    cta: {
      title: "Want your inbox handled properly?",
      body: "Book thirty minutes. We will read 500 of your recent tickets and come back with a pod size and a number.",
    },
    featured: true,
  },
  {
    slug: "live-chat",
    name: "Live chat",
    navLabel: "Live chat",
    href: "/services/live-chat",
    summary:
      "Staffed chat during the hours your traffic converts, answering the sizing, stock and shipping questions that decide whether the cart survives.",
    metaDescription:
      "Live chat support staffed for the hours your traffic converts. Sizing, stock and delivery answers in 22 seconds, evenings and weekends included.",
    icon: "chats",
    image: {
      src: "/images/banner-live-chat.jpg",
      alt: "A shopper using their phone at a kitchen counter in the evening",
    },
    metrics: [
      { value: "22 sec", label: "Median pickup during staffed hours" },
      { value: "17.4%", label: "Lift in chat-assisted conversion" },
      { value: "3 to 4", label: "Concurrent chats per agent" },
    ],
    scope: [
      {
        group: "Coverage",
        items: [
          "Staffed across your peak hours, evenings and weekends included",
          "Proactive triggers on high-intent pages and stalled checkouts",
          "Escalation path to your team for anything outside policy",
        ],
      },
      {
        group: "Quality",
        items: [
          "Pre-sale guidance on sizing, fit, materials, stock and delivery windows",
          "Bot flow tuning so automation handles the repetitive share",
          "Handoff from bot to human without making the customer repeat themselves",
        ],
      },
    ],
    approach: [
      {
        title: "Cover",
        body: "We map traffic and conversion by hour, then staff the windows where a live human actually moves revenue.",
      },
      {
        title: "Convert",
        body: "Agents work from a real product knowledge base, and are measured on resolution and assisted revenue rather than chat count.",
      },
      {
        title: "Compound",
        body: "Recurring questions become site copy, FAQ entries and bot flows, so the same chat does not happen a thousand more times.",
      },
    ],
    faq: [
      {
        q: "Can you cover nights and weekends?",
        a: "Yes. The team spans US, UK and APAC time zones, so extended and around the clock coverage is a staffing decision rather than an engineering project.",
      },
      {
        q: "Will agents actually know our products?",
        a: "Every agent works from a knowledge base we build with your team, and new launches are briefed before they go live rather than after the first confused customer.",
      },
    ],
    cta: {
      title: "Want chat staffed when it actually matters?",
      body: "Book thirty minutes. We will map your traffic by hour and tell you which windows are worth covering.",
    },
    featured: true,
  },
  {
    slug: "returns-and-exchanges",
    name: "Returns and exchanges",
    navLabel: "Returns",
    href: "/services#returns-and-exchanges",
    summary:
      "Return authorisations, labels, exchange offers and refunds handled inside your policy, with every reason coded so merchandising can act on it.",
    icon: "arrows",
    metrics: [],
    scope: [],
    approach: [],
    faq: [],
    featured: false,
  },
  {
    slug: "guest-communication",
    name: "Guest communication",
    navLabel: "Guest comms",
    href: "/services#guest-communication",
    summary:
      "Airbnb, Booking.com, Vrbo and Expedia messages from first enquiry to checkout, with review protection and cleaning coordination in between.",
    icon: "house",
    metrics: [],
    scope: [],
    approach: [],
    faq: [],
    featured: false,
  },
  {
    slug: "student-support",
    name: "Student and member support",
    navLabel: "Student support",
    href: "/services/student-support",
    summary:
      "Enrolment questions, login and access problems, and in-policy refund requests for coaches and course platforms, handled before a stuck student gives up.",
    metaDescription:
      "Student support for coaches and course platforms. Enrolment questions, access problems and refund requests answered inside Teachable, Kajabi, Thinkific or Skool.",
    icon: "graduation",
    image: {
      src: "/images/banner-student-support.jpg",
      alt: "A student working through an online course at a kitchen table at night",
    },
    metrics: [
      { value: "Same day", label: "Access and login problems cleared" },
      { value: "In policy", label: "Refund decisions made without waiting on you" },
      { value: "Every launch", label: "Cohort and launch weeks staffed up" },
    ],
    scope: [
      {
        group: "Before they enrol",
        items: [
          "Course content, prerequisites and format questions answered properly",
          "Pricing, payment plan and bundle queries",
          "Cohort dates, time zones and what happens if they fall behind",
        ],
      },
      {
        group: "After they enrol",
        items: [
          "Login, access and video playback problems fixed or escalated same day",
          "Refund and cancellation requests handled inside the window you set",
          "Community moderation in Circle, Discord or Slack to your house rules",
        ],
      },
    ],
    approach: [
      {
        title: "Learn the curriculum",
        body: "Agents take the course themselves before answering a single ticket. You cannot answer a question about module four without having seen module four.",
      },
      {
        title: "Clear the blockers",
        body: "Most student tickets are access, not curriculum. We fix what we can inside your platform and escalate the rest with the detail your developer actually needs.",
      },
      {
        title: "Protect the cohort",
        body: "Launch weeks and cohort starts are where the volume lands. We staff those in advance rather than discovering them on the day.",
      },
    ],
    faq: [
      {
        q: "Which platforms do you work in?",
        a: "Teachable, Thinkific, Kajabi, Skool, Podia and Circle, plus Calendly and Zoom for anything with live sessions. As with every other service we work inside your account as named users, so nothing moves to a system you cannot audit.",
      },
      {
        q: "Can you approve refunds?",
        a: "Inside the window and the reasons you set. You define the policy, we execute it, and anything outside comes to you with a recommendation rather than sitting in the queue.",
      },
    ],
    cta: {
      title: "Want your student inbox handled?",
      body: "Book thirty minutes. We will read your recent student tickets and tell you how much of it is access rather than curriculum.",
    },
    featured: true,
  },
  {
    slug: "reviews-and-social",
    name: "Reviews and social",
    navLabel: "Reviews and social",
    href: "/services#reviews-and-social",
    summary:
      "Product reviews, marketplace messages and Instagram DMs answered on your tone and escalation rules, before a bad day becomes a public one.",
    icon: "star",
    metrics: [],
    scope: [],
    approach: [],
    faq: [],
    featured: false,
  },
];

export const featuredServices = services.filter((s) => s.featured);
export const additionalServices = services.filter((s) => !s.featured);

export function getService(slug: string) {
  return services.find((s) => s.slug === slug && s.featured);
}

export const headlineStats = [
  { value: "20 min", label: "Median first response" },
  { value: "4.8", label: "Average CSAT out of 5" },
  { value: "Up to 30%", label: "WISMO tickets deflected" },
  { value: "7 days", label: "Kickoff to live queue" },
];

/* Verb labels, not "Step 1 / Step 2". */
export const onboarding = [
  {
    title: "Discovery call",
    body: "Thirty minutes on volume, channels, tooling and the tickets that keep you up at night. You leave with a staffing and cost estimate whether or not you hire us.",
  },
  {
    title: "Ticket audit",
    body: "We read your recent history and return a written plan: pod size, coverage hours, SLAs, and the deflection we think is realistic for your catalogue.",
  },
  {
    title: "Build and train",
    body: "Voice guide, macros, tagging, escalation rules and access. Your pod trains on your products and shadows your team before touching a live ticket.",
  },
  {
    title: "Go live and tune",
    body: "We take the queue and report weekly against SLA. Scale the pod up for peak, back down after, without you hiring or firing anyone.",
  },
];

export const differentiators = [
  {
    title: "A pod, not a call centre",
    body: "The same small named team every day. They learn your catalogue, your edge cases and your regulars, which is why quality holds when volume triples.",
  },
  {
    title: "We work inside your stack",
    body: "Your helpdesk, your Shopify, your returns platform, your data. Nothing migrates into a black box you cannot audit or take back.",
  },
  {
    title: "We would rather you booked fewer hours",
    body: "Every recurring driver we find becomes a site fix, a policy change or an automation. Fewer tickets means fewer hours billed, and we would rather shrink the invoice than protect it.",
  },
  {
    title: "Peak is a slider",
    body: "Black Friday, a viral video, a delayed container. We staff up in days and back down after, with no severance and no idle seats in January.",
  },
];

/*
  PLACEHOLDER, NOT IN USE. Invented quotes from invented people at invented
  companies. The section that rendered these is disabled. Replace with real,
  permissioned quotes before re-enabling <Voices /> on the home page.
*/
export const testimonials = [
  {
    quote:
      "WISMO was 58% of our inbox and eating the whole ops week. Zulaiz took the queue in two weeks and had proactive delay emails live by month two. It sits at 19% now.",
    name: "Priya Raghunathan",
    role: "Head of Operations",
    company: "Marden Supply",
    seed: "zulaiz-testimonial-priya",
  },
  {
    quote:
      "First team that reads the ticket before answering it. Our CSAT went from 3.9 to 4.8 in a quarter.",
    name: "Marcus Delaney",
    role: "Founder",
    company: "Halstead Goods",
    seed: "zulaiz-testimonial-marcus",
  },
  {
    quote:
      "They cover nights and weekends, which is when half our chat volume actually happens. It paid for itself in the first quarter.",
    name: "Noor Haddad",
    role: "Ecommerce Director",
    company: "Vessel Skincare",
    seed: "zulaiz-testimonial-noor",
  },
];

export const rate = {
  amount: "$7",
  unit: "an hour",
} as const;

export type Commitment = {
  name: string;
  monthly: string;
  measure: string;
  equivalent: string;
  /* Rendered as an accent line. Only the standard plan carries bonus hours. */
  bonus?: string;
  points: string[];
  suits: string;
  badge?: string;
  featured?: boolean;
};

/*
  Priced off $7 an hour on a four week month, so every figure is exact:
  10 hrs/wk = 40 billed = $280, 20 hrs/wk = 80 billed = $560, 40 hrs/wk = 160
  billed = $1,120. The standard plan adds 20 hours at no charge, which brings its
  effective rate to $5.60 an hour.
*/
export const commitments: Commitment[] = [
  {
    name: "Part time",
    monthly: "$280",
    measure: "10 hours a week",
    equivalent: "40 hours a month",
    points: [
      "Email and WISMO",
      "Business hours in one time zone",
      "One named agent",
    ],
    suits: "A first pair of hands for a queue that is still small.",
  },
  {
    name: "Standard",
    monthly: "$560",
    measure: "20 hours a week",
    equivalent: "80 hours billed a month",
    bonus: "Plus 20 hours free, so 100 hours in total",
    points: [
      "Email, live chat and WISMO",
      "One named agent who learns your catalogue",
      "Works out at $5.60 an hour, not $7",
    ],
    suits: "The one most brands start on, and the best value on the page.",
    badge: "Most sold",
    featured: true,
  },
  {
    name: "Full time",
    monthly: "$1,120",
    measure: "40 hours a week",
    equivalent: "160 hours a month",
    points: [
      "Every channel we run",
      "Extended hours, weekends included",
      "Named agent plus a team lead",
    ],
    suits: "Daily cover for a queue that keeps moving after five.",
  },
];

/* Shown on the pricing page only, under the three commitments. */
export const ticketBundle = {
  name: "500 tickets",
  monthly: "$350",
  measure: "500 tickets a month",
  equivalent: "about 50 hours",
  body: "If you would rather think in tickets than hours, we price the queue instead of the clock. Anything over 500 bills at $7 an hour.",
};

/* No tiers, so this is what every hour includes regardless of commitment. */
export const included = [
  "Named agents assigned to your brand, not a rotating pool",
  "We work inside your helpdesk, your Shopify and your returns platform",
  "Macro library, tagging taxonomy and escalation rules built with you",
  "Weekly QA against a rubric you can read",
  "Weekly reporting on volume, drivers, CSAT and backlog",
  "A monthly review of the contact drivers worth fixing upstream",
];

/* Shared by the contact page and the contact section on the home page. */
export const callExpectations = [
  "A read on your ticket volume and the drivers behind it",
  "The hours you actually need and what that costs",
  "A realistic go live date, usually about a week out",
];

export const rateNotes = [
  {
    title: "One rate, every channel",
    body: "Email, live chat, WISMO, returns, guest messaging and social all bill at the same hourly rate. There is no premium channel and nothing is gated behind a bigger plan.",
  },
  {
    title: "Hours flex month to month",
    body: "Forecast peak with us and add hours for the weeks you need them. Scale back after. You are not carrying a Black Friday headcount into January.",
  },
  {
    title: "The bonus hours are a real discount",
    body: "The standard plan bills 80 hours and delivers 100, which works out at $5.60 an hour rather than $7. It is the only plan with bonus hours, and it is why most brands land there.",
  },
];

export const faqs = [
  {
    q: "How fast can we go live?",
    a: "Seven days is typical for email and WISMO, covering the audit, voice guide, macros, access and training. Live chat usually follows a few days later, once agents are confident on the catalogue. If you are mid peak and need cover sooner, say so on the call and we will tell you honestly whether we can do it well.",
  },
  {
    q: "Do we have to switch helpdesks?",
    a: "No. We work inside whatever you already run, including Gorgias, Zendesk, Front, Help Scout, Intercom and Re:amaze. If the setup is messy we will tell you what we would change, but switching is your call and never a condition.",
  },
  {
    q: "How is pricing calculated?",
    a: "One flat rate of $7 an hour, for every channel. You pick how many hours a week you need and pay for those. The standard plan adds 20 hours a month at no charge, which brings it to $5.60 an hour. We do not gate channels behind bigger plans.",
  },
  {
    q: "Who actually answers our tickets?",
    a: "Named agents assigned to your brand and nobody else's. Part time hours get one; past full time you get a pod of two to six plus a team lead. You meet them, you can reach them in Slack, and they do not rotate between accounts.",
  },
  {
    q: "What happens during peak season?",
    a: "We forecast with you in advance and staff up. Doubling or tripling a pod for eight weeks is routine, and it scales back down after without you carrying the cost into January.",
  },
  {
    q: "How do you handle our customer data?",
    a: "We work as named users in your systems under least privilege access, sign a DPA, and use SSO and two factor on every tool. We do not export customer data, and access is revoked the day a contract ends.",
  },
  {
    q: "Is there a long contract?",
    a: "A three month initial term so the team has time to learn your business properly, then rolling month to month with 30 days notice. Your hours can change every month inside that.",
  },
  {
    q: "What if quality slips?",
    a: "Every pod is scored against a QA rubric weekly and you see the results. If CSAT or SLA misses the agreed target for a month, we fix the staffing at our cost. That is written into the agreement.",
  },
];

/* Simple Icons slugs. Rendered from cdn.simpleicons.org in a single neutral tone. */
export const integrations = [
  { slug: "shopify", name: "Shopify" },
  { slug: "woocommerce", name: "WooCommerce" },
  { slug: "bigcommerce", name: "BigCommerce" },
  { slug: "etsy", name: "Etsy" },
  { slug: "zendesk", name: "Zendesk" },
  { slug: "helpscout", name: "Help Scout" },
  { slug: "intercom", name: "Intercom" },
  { slug: "gmail", name: "Gmail" },
  { slug: "aftership", name: "AfterShip" },
  { slug: "airbnb", name: "Airbnb" },
  { slug: "bookingdotcom", name: "Booking.com" },
  { slug: "expedia", name: "Expedia" },
  { slug: "trustpilot", name: "Trustpilot" },
  { slug: "circle", name: "Circle" },
  { slug: "calendly", name: "Calendly" },
  { slug: "zoom", name: "Zoom" },
];

/*
  Tools without a Simple Icons mark, so they are listed as text on /services
  rather than shown in the logo strip.
*/
export const toolsByJob = [
  {
    job: "Helpdesks",
    tools: ["Gorgias", "Freshdesk", "Zendesk", "Help Scout", "Richpanel", "Re:amaze", "Tawk.to", "Gmail", "Outlook"],
  },
  {
    job: "Tracking",
    tools: ["ParcelPanel", "Track123", "AfterShip", "17Track"],
  },
  {
    job: "Rentals",
    tools: ["Guesty", "Hostaway", "Smoobu", "Lodgify", "Hospitable", "Kross Booking"],
  },
  {
    job: "Coaching and courses",
    tools: ["Teachable", "Thinkific", "Kajabi", "Skool", "Podia", "Circle", "Calendly", "Zoom"],
  },
  {
    job: "Working with you",
    tools: ["Slack", "Discord", "Lark", "Skype", "WhatsApp"],
  },
];

export const teamFacts = [
  {
    value: "2019",
    label: "Year Zulaiz took its first ticket",
  },
  {
    value: "60+",
    label: "Specialists across three time zones",
  },
  {
    value: "38",
    label: "Ecommerce brands currently supported",
  },
];
