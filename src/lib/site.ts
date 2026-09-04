export const site = {
  name: "Zulaiz",
  /*
    Kept under 155 characters. This is the fallback description and the one
    used for Open Graph and Twitter, and Google truncates the snippet around
    that length. The previous copy ran to 173 and was cut mid-clause.
  */
  description:
    "Zulaiz runs customer support for ecommerce brands, rental hosts and course creators. Named human agents handle email, live chat, WISMO, guest messaging and student enquiries from $7 an hour.",
  url: "https://zulaiz.com",
  email: "hello@zulaiz.com",
  social: {
    linkedin: "https://www.linkedin.com/company/zulaiz",
    instagram: "https://www.instagram.com/zulaiz.zulaiz/",
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

/*
  Who a service is for. The site is organised by these four groups. A
  service without a parent is a "door" for its group: ecommerce, rentals and
  courses each have one bundle door, and "everyone" holds the channels any
  business uses (email, live chat) plus Virtual Assistance. The
  ecommerce door lists the detailed pages underneath it as parts, and email
  and live chat appear there too, since a store needs them as much as a
  course creator does.
*/
export type MarketId = "ecommerce" | "rentals" | "courses" | "everyone";
export type Market = { id: MarketId; label: string };
export const markets: Market[] = [
  { id: "ecommerce", label: "For ecommerce brands" },
  { id: "rentals", label: "For rental hosts" },
  { id: "courses", label: "For course creators" },
  { id: "everyone", label: "For everyone" },
];

export type Service = {
  slug: string;
  market: MarketId;
  /* A bundle page lists these services as its parts, in this order. */
  parts?: string[];
  /* A part points back at its bundle, for breadcrumbs. */
  parent?: string;
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
    | "graduation"
    | "clipboard"
    | "storefront";
  image?: { src: string; alt: string };
  /* Only the ecommerce door has one: the home page bento tile uses a different crop. */
  tileImage?: { src: string; alt: string };
  metrics: { value: string; label: string }[];
  /* Grouped so the detail page never renders a flat list of more than five rows. */
  scope: { group: string; items: string[] }[];
  approach: { title: string; body: string }[];
  faq: { q: string; a: string }[];
  cta?: { title: string; body: string };
  /*
    Names from `tools`, in display order, for the orbit on this service's
    page. The overview at /services shows every tool; a page shows only the
    ones that matter for that job so the section reads as specific, not
    boilerplate. `toolsNote` is the one sentence under the heading there.
  */
  tools?: string[];
  toolsNote?: string;
  featured: boolean;
};

export const services: Service[] = [
  {
    slug: "ecommerce-support",
    market: "ecommerce",
    parts: ["wismo", "email-support", "live-chat", "returns-and-exchanges", "reviews-and-social"],
    name: "Ecommerce support",
    navLabel: "Ecommerce support",
    href: "/services/ecommerce-support",
    summary:
      "Email, live chat, where-is-my-order, returns and reviews for online stores, run as one team inside your helpdesk and your Shopify, so a customer gets one answer whichever way they ask.",
    metaDescription:
      "Ecommerce customer support: email, live chat, WISMO, returns and reviews as one team inside your Shopify and helpdesk. Named human agents from $7 an hour.",
    icon: "storefront",
    image: {
      src: "/images/banner-ecommerce-support.jpg",
      alt: "Two people in a small brand's packing room, one sealing a parcel at a table of tissue paper and boxes while the other checks an order on a laptop",
    },
    tileImage: {
      src: "/images/wismo-tile.jpg",
      alt: "A fulfilment warehouse aisle with parcels on a conveyor",
    },
    metrics: [
      { value: "20 min", label: "Median first response across every channel" },
      { value: "Up to 30%", label: "WISMO tickets removed with proactive updates" },
      { value: "One team", label: "Orders, returns, chat and reviews with no handoffs between vendors" },
    ],
    scope: [
      {
        group: "Orders and delivery",
        items: [
          "Where is my order answered with the live tracking status, not a template",
          "Proactive delay alerts before the customer has to ask",
          "Carrier escalations, lost parcels and address changes chased to a resolution",
        ],
      },
      {
        group: "Email and live chat",
        items: [
          "Pre-purchase questions on sizing, stock and shipping that decide the sale",
          "Order edits, cancellations and discount codes applied inside your store",
          "Every reply in your voice guide, from the same named human agents every day",
        ],
      },
      {
        group: "Returns and exchanges",
        items: [
          "Return authorisations and labels issued inside your policy",
          "Exchange offers before refunds, so the revenue stays where it can",
          "Every return reason coded so merchandising can act on it",
        ],
      },
      {
        group: "Reviews and social",
        items: [
          "Product and marketplace reviews answered on your tone",
          "Instagram and Facebook DMs handled as support, not left to marketing",
          "A bad day caught before it becomes a public one",
        ],
      },
    ],
    approach: [
      {
        title: "One queue, one voice",
        body: "Every channel lands in your helpdesk and is answered by the same team from the same voice guide, so a customer who emails, then chats, then leaves a review meets one brand, not three vendors.",
      },
      {
        title: "Fix the drivers, not just the tickets",
        body: "Every ticket is tagged with why they wrote. Once a month you get the top drivers with a recommendation attached: a site fix, a policy change, an automation. Fewer tickets means fewer hours billed, and we would rather shrink the invoice.",
      },
      {
        title: "Peak is a slider",
        body: "Black Friday, a viral video, a delayed container. We staff up in days and back down after, with no severance and no idle seats in January.",
      },
    ],
    faq: [
      {
        q: "Do we have to buy all of it?",
        a: "No. Most stores start with the channel that hurts most, usually WISMO or email, and add live chat, returns and reviews as the team earns it. Everything bills at the same rate, so adding a channel is a conversation, not a new contract.",
      },
      {
        q: "Which stores and helpdesks do you work in?",
        a: "Shopify, WooCommerce, BigCommerce and Etsy on the store side. Gorgias, Zendesk, Freshdesk, Help Scout and plain Gmail or Outlook for the inbox. ParcelPanel and AfterShip for tracking. All of it inside your accounts as named human agents.",
      },
      {
        q: "Can you actually process refunds and edit orders?",
        a: "Yes, inside the policy you set. You define the limits, we work within them and bring anything outside to you with a recommendation. That is the difference between resolving a ticket and relaying it.",
      },
    ],
    cta: {
      title: "Want the whole inbox handled?",
      body: "Book thirty minutes and send your last three months of tickets. We will tell you how they split across orders, returns, chat and reviews, and what one team to cover all of it costs.",
    },
    tools: ["Shopify", "WooCommerce", "BigCommerce", "Etsy", "Gorgias", "Zendesk", "Freshdesk", "Help Scout", "ParcelPanel", "AfterShip", "Gmail", "Outlook"],
    toolsNote:
      "Your Shopify, WooCommerce or BigCommerce admin, your Gorgias or Zendesk, your ParcelPanel or AfterShip. One team works across all of them as named human agents, so an order question, a return and a review get the same answer.",
    featured: true,
  },
  {
    slug: "wismo",
    market: "ecommerce",
    parent: "ecommerce-support",
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
    tools: ["Shopify", "WooCommerce", "BigCommerce", "Etsy", "ParcelPanel", "AfterShip", "Gorgias", "Zendesk", "Gmail", "Outlook"],
    toolsNote:
      "Your Shopify orders, your ParcelPanel or AfterShip tracking, your Gorgias or Zendesk inbox. Every reply carries the live tracking status because we answer from inside the tools that hold it.",
    featured: true,
  },
  {
    slug: "email-support",
    market: "everyone",
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
          "Named human agents trained on your catalogue, policies and tone",
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
    tools: ["Gorgias", "Freshdesk", "Zendesk", "Help Scout", "Gmail", "Outlook", "Slack", "WhatsApp"],
    toolsNote:
      "Your helpdesk, your shared inbox, your macros. We log in as named human agents in Gorgias, Zendesk, Freshdesk, Help Scout or plain Gmail and Outlook, so every reply stays in your history.",
    featured: true,
  },
  {
    slug: "live-chat",
    market: "everyone",
    name: "Live chat",
    navLabel: "Live chat",
    href: "/services/live-chat",
    summary:
      "Staffed chat during the hours your traffic converts, answering the questions that decide whether someone buys, books or enrols.",
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
        body: "Human agents work from a real product knowledge base, and are measured on resolution and assisted revenue rather than chat count.",
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
        q: "Will your human agents actually know our products?",
        a: "Every human agent works from a knowledge base we build with your team, and new launches are briefed before they go live rather than after the first confused customer.",
      },
    ],
    cta: {
      title: "Want chat staffed when it actually matters?",
      body: "Book thirty minutes. We will map your traffic by hour and tell you which windows are worth covering.",
    },
    tools: ["Gorgias", "Zendesk", "Freshdesk", "Help Scout", "Intercom", "Shopify", "Slack", "WhatsApp"],
    toolsNote:
      "The chat widget stays yours. We staff Gorgias, Zendesk, Freshdesk, Help Scout or Intercom under named logins for each human agent, and hand off in Slack or WhatsApp when a conversation needs an owner.",
    featured: true,
  },
  {
    slug: "returns-and-exchanges",
    market: "ecommerce",
    parent: "ecommerce-support",
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
    market: "rentals",
    name: "Guest communication",
    navLabel: "Guest communication",
    href: "/services/guest-communication",
    summary:
      "Airbnb, Booking.com, Vrbo and Expedia messages from first enquiry to checkout, with review protection and cleaning coordination in between.",
    metaDescription:
      "Guest communication for short-term rental hosts. Airbnb, Booking.com, Vrbo and Expedia messages, enquiry to checkout. Named human agents from $7 an hour.",
    icon: "house",
    image: {
      src: "/images/banner-guest-communication.jpg",
      alt: "The entry hall of a bright rental apartment, with a welcome card, a bowl of fruit, keys and a phone on a wooden table and the front door open to morning light",
    },
    metrics: [
      { value: "Each stay", label: "Check-in details, house rules and checkout reminders sent on time" },
      { value: "In policy", label: "Refund and early checkout decisions made without waiting on you" },
      { value: "One inbox", label: "Airbnb, Booking.com, Vrbo and Expedia answered from your PMS" },
    ],
    scope: [
      {
        group: "Before they book",
        items: [
          "Enquiries answered inside the hour that keeps your response rate up",
          "Availability, pricing, pets, parking and house rules explained per listing",
          "Special requests checked with you and confirmed to the guest",
        ],
      },
      {
        group: "During the stay",
        items: [
          "Check-in instructions, Wi-Fi and appliance questions handled from the house manual",
          "Problems escalated to your cleaner, handyman or co-host with the detail they need",
          "Noise, party and late checkout situations handled to your rules",
        ],
      },
      {
        group: "After checkout",
        items: [
          "Review requests and replies, including the difficult ones",
          "Damage and lost property documented and raised within the platform windows",
          "Cleaning confirmed and the next arrival's details sent",
        ],
      },
    ],
    approach: [
      {
        title: "Learn the property",
        body: "A house manual per listing before the first message: the lockbox, the parking, the boiler that needs a reset. Guests ask the same twelve things and every answer should be right the first time.",
      },
      {
        title: "Answer inside your PMS",
        body: "Guesty, Hostaway, Smoobu, Lodgify or Hospitable, with every channel already in one inbox. We work there as named human agents, so the platform's response-rate clock is answered on time and every thread stays on your record.",
      },
      {
        title: "Protect the review",
        body: "Most bad reviews are a slow reply during the stay, not a bad property. Issues get a fast acknowledgement and a real escalation, and every review gets an answer on your tone.",
      },
    ],
    faq: [
      {
        q: "Which platforms do you work in?",
        a: "Guesty, Hostaway, Smoobu, Lodgify, Hospitable and Kross Booking on the PMS side, with Airbnb, Booking.com, Vrbo and Expedia threads inside them. Direct bookings by email or WhatsApp are covered too. All of it inside your accounts, nothing moved to a system of ours.",
      },
      {
        q: "Can you cover a 2am message?",
        a: "Extended hours cover evenings and weekends on the Full time package. True around-the-clock cover needs agents rotating through the night and is quoted rather than listed, as on the pricing page.",
      },
      {
        q: "Do you coordinate cleaners and maintenance?",
        a: "Yes, with the contacts you give us. We message them, confirm the job is done and tell the guest, and anything that needs money spent comes to you first.",
      },
    ],
    cta: {
      title: "Want your guest inbox handled?",
      body: "Book thirty minutes. We will read a month of your guest threads and tell you how many were check-in questions a better house manual would have answered, and how many needed a person.",
    },
    tools: ["Guesty", "Hostaway", "Smoobu", "Lodgify", "Hospitable", "Airbnb", "Booking.com", "Expedia", "WhatsApp", "Gmail"],
    toolsNote:
      "Your Guesty, Hostaway, Smoobu, Lodgify or Hospitable inbox, with the Airbnb, Booking.com and Expedia threads inside it. We work as named human agents in your account, so every guest message and every reply stays on your record.",
    featured: true,
  },
  {
    slug: "student-support",
    market: "courses",
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
        body: "Our human agents take the course themselves before answering a single ticket. You cannot answer a question about module four without having seen module four.",
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
    tools: ["Teachable", "Thinkific", "Kajabi", "Skool", "Circle", "Discord", "Calendly", "Zoom", "Gmail", "Slack"],
    toolsNote:
      "Your Teachable, Thinkific, Kajabi or Skool admin, your Circle or Discord community, your Calendly and Zoom. We work as named team members inside them, so students never meet a third-party ticket system.",
    featured: true,
  },
  {
    slug: "reviews-and-social",
    market: "ecommerce",
    parent: "ecommerce-support",
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
  {
    slug: "virtual-assistance",
    market: "everyone",
    name: "Virtual Assistance",
    navLabel: "Virtual Assistance",
    href: "/services/virtual-assistance",
    summary:
      "The daily admin that never makes it to the top of your list: data entry, spreadsheets, inbox and calendar, listing updates and research, done by a named assistant inside your own tools.",
    metaDescription:
      "Virtual Assistance for data entry, spreadsheets, inbox and calendar, listing updates and research. Named assistants inside your own tools from $7 an hour.",
    icon: "clipboard",
    image: {
      src: "/images/banner-virtual-assistance.jpg",
      alt: "A virtual assistant at a desk working through a spreadsheet on a laptop, with a calendar on a second screen",
    },
    metrics: [
      { value: "Daily", label: "Written handover of what got done and what is waiting" },
      { value: "2 days", label: "From first call to the first task list" },
      { value: "$7/hr", label: "Same rate and packages as every other service" },
    ],
    scope: [
      {
        group: "Data and spreadsheets",
        items: [
          "Data entry and clean-up in Sheets, Excel or Airtable, checked against the source",
          "Moving records between systems, CRM updates and deduplication",
          "Weekly reports and dashboards refreshed on the day you expect them",
        ],
      },
      {
        group: "Inbox and calendar",
        items: [
          "Your inbox triaged into reply, delegate and ignore, with drafts ready for the first pile",
          "Scheduling, rescheduling and confirmations across time zones",
          "Meeting notes and follow-ups sent the same day",
        ],
      },
      {
        group: "Store and listing admin",
        items: [
          "Product uploads, catalogue edits, price and stock changes in Shopify or WooCommerce",
          "Rental listing updates, calendar sync checks and photo swaps across channels",
          "Course platform housekeeping: enrolments, coupons, drip schedules",
        ],
      },
      {
        group: "Research and lists",
        items: [
          "Supplier, competitor and pricing research written up with sources",
          "Prospect and partner lists built to your criteria and verified before you see them",
          "Invoices logged and expenses coded in QuickBooks or Xero, ready for your accountant",
        ],
      },
    ],
    approach: [
      {
        title: "Start with the list",
        body: "The first call is spent writing down the recurring work: what, how often, where it lives and what done looks like. Each task gets a short procedure before anyone touches it, so the second time is as good as the first.",
      },
      {
        title: "Work in your systems",
        body: "Named logins with the least access needed, your two-factor, your Sheets, your Notion. Nothing is copied into a tool of ours, so if we ever part ways nothing needs handing back.",
      },
      {
        title: "Report every day",
        body: "A short written handover at the end of each day: what got done, what is blocked, what needs a decision from you. Questions are batched rather than sent one at a time, so you are interrupted once, not twenty times.",
      },
    ],
    faq: [
      {
        q: "What will a virtual assistant not do?",
        a: "Anything that needs a professional sign-off or your money. We log invoices and code expenses, your accountant closes the books. We prepare payments, you approve them. We draft the reply, you send anything contractual. Everything else on a recurring admin list is fair game.",
      },
      {
        q: "How do you handle access and sensitive data?",
        a: "Named logins per assistant, never shared credentials, and only the access the task needs. Two-factor stays on your devices. Every assistant is under a signed confidentiality agreement, and access is removed the day an engagement ends.",
      },
      {
        q: "Can I mix support and admin hours?",
        a: "Yes. Virtual Assistance hours bill at the same rate and come out of the same Part time, Standard or Full time package, so a brand can split a week between the inbox and the back office and change the split as the month goes.",
      },
    ],
    cta: {
      title: "Got a list of things you keep not getting to?",
      body: "Send it over or book thirty minutes. We will tell you which of it we can take, how many hours it needs and what it costs, in writing, before you commit to anything.",
    },
    tools: ["Google Sheets", "Google Docs", "Gmail", "Excel", "Outlook", "Notion", "Airtable", "Trello", "Asana", "ClickUp", "Shopify", "HubSpot", "QuickBooks", "Xero"],
    toolsNote:
      "Your Sheets and Docs, your Excel and Outlook, your Notion, Airtable, Trello or Asana boards, your Shopify admin, your HubSpot, your QuickBooks or Xero. We work inside them as named users, so the record of the work stays yours.",
    featured: true,
  },
];

export const featuredServices = services.filter((s) => s.featured);
export const additionalServices = services.filter((s) => !s.featured);

export function getService(slug: string) {
  return services.find((s) => s.slug === slug && s.featured);
}

/* The top-level services of a group, in data order: every service in that
   market that is not a part of something else. */
export function doorsFor(market: Market): Service[] {
  return services.filter((s) => s.market === market.id && !s.parent);
}

/* A bundle's parts in its declared order. Empty for a service without any. */
export function partsOf(service: Service): Service[] {
  return (service.parts ?? []).map((slug) => services.find((s) => s.slug === slug)!);
}

export const headlineStats = [
  { value: "20 min", label: "Median first response" },
  { value: "4.8", label: "Average CSAT out of 5" },
  { value: "Up to 30%", label: "WISMO tickets deflected" },
  { value: "2 days", label: "Kickoff to live queue" },
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
    body: "The same small team of named human agents every day. They learn your catalogue, your edge cases and your regulars, which is why quality holds when volume triples.",
  },
  {
    title: "We work inside your stack",
    body: "Your helpdesk, your Shopify, your returns platform, your data. Nothing migrates into a black box you cannot audit or take back, and everything we write for you stays yours.",
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
      "Every channel we run",
      "Business hours in one time zone",
      "One named human agent",
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
      "Every channel we run",
      "One named human agent who learns your catalogue",
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
      "Named human agent plus a team lead",
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
  "Named human agents assigned to your brand, not a rotating pool or a bot",
  "We work inside your helpdesk, your Shopify and your returns platform",
  "Every ticket tagged with why they wrote, on a taxonomy built with you",
  "Hours you can split between support and admin, and re-split monthly",
  "The voice guide, macros and procedures we write are yours to keep, even if you leave",
  "Weekly QA against a rubric you can read",
  "Weekly reporting on volume, drivers, CSAT and backlog",
  "A monthly review of the contact drivers worth fixing upstream",
];

/* Shared by the contact page and the contact section on the home page. */
export const callExpectations = [
  "A read on your ticket volume and the drivers behind it",
  "The hours you actually need and what that costs, priced from your real tickets",
  "A realistic go live date, usually two days out",
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
    title: "One package, inbox and back office",
    body: "Support hours and Virtual Assistance hours come out of the same package at the same rate. Split a week between the queue and the admin however you like, and change the split as the month goes.",
  },
  {
    title: "Start with a two-week pilot",
    body: "Two weeks on the Part time package at the same rate, then decide. Stop and you keep everything we built. Carry on and the fortnight counts toward the initial term.",
  },
  {
    title: "The bonus hours are a real discount",
    body: "The standard plan bills 80 hours and delivers 100, which works out at $5.60 an hour rather than $7. It is the only plan with bonus hours, and it is why most brands land there.",
  },
];

export const faqs = [
  {
    q: "How fast can we go live?",
    a: "Two days is typical for email and WISMO, covering the audit, voice guide, macros, access and training. Live chat usually follows a few days later, once the human agents are confident on the catalogue. If you are mid peak and need cover sooner, say so on the call and we will tell you honestly whether we can do it well.",
  },
  {
    q: "Can we try it before committing?",
    a: "Yes. Start with a two-week pilot on the Part time package, billed at the same rate. Stop at the end of it and you keep the voice guide and macros we wrote and owe nothing more. Carry on and the two weeks count toward the initial term.",
  },
  {
    q: "What happens if we stop?",
    a: "You keep everything we built: the voice guide, the macro library, the tagging taxonomy and every written procedure, all of it already sitting in your own tools. Notice is 30 days after the initial three months, and nothing needs handing back because nothing ever left.",
  },
  {
    q: "Do Virtual Assistance hours cost the same?",
    a: "Yes. Admin work bills at the same rate as support and comes out of the same package, so you can split a week between the inbox and the back office and move the split as the month goes.",
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
    a: "Named human agents assigned to your brand and nobody else's. Part time hours get one; past full time you get a pod of two to six plus a team lead. You meet them, you can reach them in Slack, and they do not rotate between accounts.",
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

/*
  Homepage logo strip. Brand marks in their own colours, served from
  /images/tools like the orbit on /services (Simple Icons files, plus the
  Zoom app icon). Each sits on a white chip so the dark ones stay legible in
  dark mode.
*/
export const integrations = [
  { name: "Shopify", logo: "/images/tools/shopify.svg" },
  { name: "WooCommerce", logo: "/images/tools/woo.svg" },
  { name: "BigCommerce", logo: "/images/tools/bigcommerce.svg" },
  { name: "Etsy", logo: "/images/tools/etsy.svg" },
  { name: "Zendesk", logo: "/images/tools/zendesk.svg" },
  { name: "Help Scout", logo: "/images/tools/helpscout.svg" },
  { name: "Intercom", logo: "/images/tools/intercom.svg" },
  { name: "Gmail", logo: "/images/tools/gmail.svg" },
  { name: "AfterShip", logo: "/images/tools/aftership.svg" },
  { name: "Airbnb", logo: "/images/tools/airbnb.svg" },
  { name: "Booking.com", logo: "/images/tools/bookingdotcom.svg" },
  { name: "Expedia", logo: "/images/tools/expedia.svg" },
  { name: "Trustpilot", logo: "/images/tools/trustpilot.svg" },
  { name: "Circle", logo: "/images/tools/circle.svg" },
  { name: "Calendly", logo: "/images/tools/calendly.svg" },
  { name: "Zoom", logo: "/images/tools/zoom.svg" },
];

/*
  Tools the team works in, grouped for the services page. `logo` points at a
  brand mark in public/images/tools, pulled from each vendor's own site or an
  open logo collection; entries without one render a monogram. `orbit` marks
  the curated 23 of the 50 that fit on the three rings without overlapping.
  The others are still tools we work in, and several appear on the service
  pages, which orbit only the tools relevant to that job.
*/
export type Tool = {
  name: string;
  logo?: string;
  group: string;
  orbit?: boolean;
};

export const tools: Tool[] = [
  // Helpdesks
  { name: "Gorgias", logo: "/images/tools/gorgias.svg", group: "Helpdesks", orbit: true },
  { name: "Freshdesk", logo: "/images/tools/freshdesk.svg", group: "Helpdesks", orbit: true },
  { name: "Zendesk", logo: "/images/tools/zendesk.svg", group: "Helpdesks", orbit: true },
  { name: "Help Scout", logo: "/images/tools/helpscout.svg", group: "Helpdesks", orbit: true },
  { name: "Intercom", logo: "/images/tools/intercom.svg", group: "Helpdesks" },
  { name: "Richpanel", group: "Helpdesks" },
  { name: "Re:amaze", group: "Helpdesks" },
  { name: "Tawk.to", group: "Helpdesks" },
  { name: "Gmail", logo: "/images/tools/gmail.svg", group: "Helpdesks", orbit: true },
  { name: "Outlook", logo: "/images/tools/outlook.svg", group: "Helpdesks", orbit: true },
  // Storefronts. Off the overview orbit, which is support tooling, but on
  // the WISMO and live chat pages where the order data lives.
  { name: "Shopify", logo: "/images/tools/shopify.svg", group: "Storefronts" },
  { name: "WooCommerce", logo: "/images/tools/woo.svg", group: "Storefronts" },
  { name: "BigCommerce", logo: "/images/tools/bigcommerce.svg", group: "Storefronts" },
  { name: "Etsy", logo: "/images/tools/etsy.svg", group: "Storefronts" },
  // Tracking
  { name: "ParcelPanel", logo: "/images/tools/parcelpanel.svg", group: "Tracking", orbit: true },
  { name: "Track123", group: "Tracking" },
  { name: "AfterShip", logo: "/images/tools/aftership.svg", group: "Tracking", orbit: true },
  { name: "17Track", group: "Tracking" },
  // Rentals
  { name: "Guesty", logo: "/images/tools/guesty.svg", group: "Rentals", orbit: true },
  { name: "Hostaway", logo: "/images/tools/hostaway.png", group: "Rentals", orbit: true },
  { name: "Smoobu", logo: "/images/tools/smoobu.png", group: "Rentals", orbit: true },
  { name: "Lodgify", logo: "/images/tools/lodgify.svg", group: "Rentals", orbit: true },
  { name: "Hospitable", logo: "/images/tools/hospitable.png", group: "Rentals", orbit: true },
  { name: "Kross Booking", group: "Rentals" },
  // Booking channels. Off the overview orbit; on the guest communication page.
  { name: "Airbnb", logo: "/images/tools/airbnb.svg", group: "Booking channels" },
  { name: "Booking.com", logo: "/images/tools/bookingdotcom.svg", group: "Booking channels" },
  { name: "Expedia", logo: "/images/tools/expedia.svg", group: "Booking channels" },
  // Coaching and courses
  { name: "Teachable", logo: "/images/tools/teachable.png", group: "Coaching and courses", orbit: true },
  { name: "Thinkific", logo: "/images/tools/thinkific.svg", group: "Coaching and courses", orbit: true },
  { name: "Kajabi", logo: "/images/tools/kajabi.svg", group: "Coaching and courses", orbit: true },
  { name: "Skool", logo: "/images/tools/skool.svg", group: "Coaching and courses", orbit: true },
  { name: "Podia", group: "Coaching and courses" },
  { name: "Circle", logo: "/images/tools/circle.svg", group: "Coaching and courses", orbit: true },
  { name: "Calendly", logo: "/images/tools/calendly.svg", group: "Coaching and courses", orbit: true },
  { name: "Zoom", logo: "/images/tools/zoom.svg", group: "Coaching and courses", orbit: true },
  // Admin and back office. Off the overview orbit; shown on the virtual
  // assistant page.
  { name: "Google Sheets", logo: "/images/tools/googlesheets.svg", group: "Admin and back office" },
  { name: "Google Docs", logo: "/images/tools/googledocs.svg", group: "Admin and back office" },
  { name: "Excel", logo: "/images/tools/excel.svg", group: "Admin and back office" },
  { name: "Notion", logo: "/images/tools/notion.svg", group: "Admin and back office" },
  { name: "Airtable", logo: "/images/tools/airtable.svg", group: "Admin and back office" },
  { name: "Trello", logo: "/images/tools/trello.svg", group: "Admin and back office" },
  { name: "Asana", logo: "/images/tools/asana.svg", group: "Admin and back office" },
  { name: "ClickUp", logo: "/images/tools/clickup.svg", group: "Admin and back office" },
  { name: "HubSpot", logo: "/images/tools/hubspot.svg", group: "Admin and back office" },
  { name: "QuickBooks", logo: "/images/tools/quickbooks.svg", group: "Admin and back office" },
  { name: "Xero", logo: "/images/tools/xero.svg", group: "Admin and back office" },
  // Working with you
  { name: "Slack", logo: "/images/tools/slack.svg", group: "Working with you", orbit: true },
  { name: "Discord", logo: "/images/tools/discord.svg", group: "Working with you", orbit: true },
  { name: "Lark", group: "Working with you" },
  { name: "WhatsApp", logo: "/images/tools/whatsapp.svg", group: "Working with you", orbit: true },
];

/* Tools by name, in the order given. An unknown name is dropped rather than
   rendered as a monogram, so a typo in a service list cannot ship a blank chip. */
export function toolsNamed(names: string[]): Tool[] {
  return names.flatMap((n) => tools.filter((t) => t.name === n));
}

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
