export const site = {
  name: "Zulaiz",
  description:
    "Zulaiz runs customer support for ecommerce brands. Email, live chat and WISMO owned end to end by a named pod, so shoppers get fast answers and your team gets its week back.",
  url: "https://zulaiz.com",
  email: "hello@zulaiz.com",
  phone: "+1 (312) 847-1928",
  social: {
    linkedin: "https://www.linkedin.com/company/zulaiz",
    x: "https://x.com/zulaiz",
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
  /* Phosphor icon name, resolved in components/service-icon.tsx */
  icon: "envelope" | "chats" | "package" | "arrows" | "phone" | "star";
  image?: { seed: string; alt: string };
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
    icon: "package",
    image: {
      seed: "zulaiz-parcels-warehouse",
      alt: "Parcels moving through a fulfilment warehouse",
    },
    metrics: [
      { value: "58%", label: "Typical WISMO deflection by month three" },
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
      "A trained pod owns your shared inbox. Triage, replies, escalations and reporting, in a voice your customers will not notice is outsourced.",
    icon: "envelope",
    image: {
      seed: "zulaiz-support-desk-morning",
      alt: "A support specialist working through a morning queue",
    },
    metrics: [
      { value: "41 min", label: "Median first response across accounts" },
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
    icon: "chats",
    image: {
      seed: "zulaiz-storefront-checkout",
      alt: "A shopper completing a purchase on a phone",
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
    slug: "voice-and-sms",
    name: "Voice and SMS",
    navLabel: "Voice and SMS",
    href: "/services#voice-and-sms",
    summary:
      "Inbound phone and two-way SMS staffed by the same pod that knows the email history, so nobody explains their order twice.",
    icon: "phone",
    metrics: [],
    scope: [],
    approach: [],
    faq: [],
    featured: false,
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
  { value: "41 min", label: "Median first response" },
  { value: "4.8", label: "Average CSAT out of 5" },
  { value: "58%", label: "WISMO tickets deflected" },
  { value: "14 days", label: "Kickoff to live queue" },
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
    title: "Paid to reduce your tickets",
    body: "Every recurring driver we find becomes a site fix, a policy change or an automation. Volume going down is the goal, not a threat to the invoice.",
  },
  {
    title: "Peak is a slider",
    body: "Black Friday, a viral video, a delayed container. We staff up in days and back down after, with no severance and no idle seats in January.",
  },
];

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

export type Plan = {
  name: string;
  price: string;
  cadence: string;
  blurb: string;
  featured?: boolean;
  volume: string;
  channels: string;
  coverage: string;
  team: string;
  reporting: string;
  extras: string[];
};

export const plans: Plan[] = [
  {
    name: "Starter",
    price: "$1,450",
    cadence: "per month",
    blurb: "For brands under roughly 800 tickets a month who need the inbox handled properly.",
    volume: "Up to 800 tickets a month",
    channels: "Email",
    coverage: "Business hours, one time zone",
    team: "Shared pod, named lead",
    reporting: "Monthly",
    extras: ["Macro and tagging setup included", "Next business day escalation SLA"],
  },
  {
    name: "Growth",
    price: "$3,900",
    cadence: "per month",
    blurb: "The usual starting point. Email, chat and WISMO owned by a pod that is yours.",
    featured: true,
    volume: "Up to 3,000 tickets a month",
    channels: "Email, live chat, WISMO",
    coverage: "Extended hours, weekends included",
    team: "Dedicated named pod, team lead",
    reporting: "Weekly, plus a monthly driver review",
    extras: [
      "Proactive delay alerts and carrier claims",
      "Shared Slack channel with your team",
    ],
  },
  {
    name: "Scale",
    price: "Custom",
    cadence: "priced per seat",
    blurb: "High volume, multi region or multi brand, with contractual SLAs to report against.",
    volume: "Unlimited, priced per seat",
    channels: "Every channel including voice, SMS and social",
    coverage: "Around the clock or follow the sun",
    team: "Named account manager and QA analyst",
    reporting: "Weekly against contractual SLAs",
    extras: [
      "Multi brand and multi language",
      "Security review, DPA and BAA on request",
    ],
  },
];

export const faqs = [
  {
    q: "How fast can we go live?",
    a: "Fourteen days is typical for email and WISMO, covering the audit, voice guide, macros, access and training. Chat usually follows a week later once agents are confident on the catalogue. Urgent peak season onboarding compresses to about a week.",
  },
  {
    q: "Do we have to switch helpdesks?",
    a: "No. We work inside whatever you already run, including Gorgias, Zendesk, Front, Help Scout, Intercom and Re:amaze. If the setup is messy we will tell you what we would change, but switching is your call and never a condition.",
  },
  {
    q: "How is pricing calculated?",
    a: "Monthly retainers based on ticket volume, channel mix and coverage hours. We do not price per ticket, because that quietly rewards rushed replies. Above roughly 3,000 tickets a month it moves to per seat pricing, which usually works out cheaper.",
  },
  {
    q: "Who actually answers our tickets?",
    a: "A named pod of two to six agents plus a team lead, assigned to your brand and nobody else's. You meet them, you can reach them in Slack, and they do not rotate between accounts.",
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
    a: "A three month initial term so the pod has time to learn your business properly, then rolling month to month with 30 days notice.",
  },
  {
    q: "What if quality slips?",
    a: "Every pod is scored against a QA rubric weekly and you see the results. If CSAT or SLA misses the agreed target for a month, we fix the staffing at our cost. That is written into the agreement.",
  },
];

/* Simple Icons slugs. Rendered from cdn.simpleicons.org in a single neutral tone. */
export const integrations = [
  { slug: "shopify", name: "Shopify" },
  { slug: "hubspot", name: "HubSpot" },
  { slug: "bigcommerce", name: "BigCommerce" },
  { slug: "squarespace", name: "Squarespace" },
  { slug: "wix", name: "Wix" },
  { slug: "etsy", name: "Etsy" },
  { slug: "zendesk", name: "Zendesk" },
  { slug: "intercom", name: "Intercom" },
  { slug: "helpscout", name: "Help Scout" },
  { slug: "aftership", name: "AfterShip" },
  { slug: "stripe", name: "Stripe" },
  { slug: "mailchimp", name: "Mailchimp" },
  { slug: "trustpilot", name: "Trustpilot" },
  { slug: "shopware", name: "Shopware" },
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
