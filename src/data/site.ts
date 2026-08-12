/**
 * SINGLE SOURCE OF TRUTH.
 *
 * Almost every piece of copy, contact detail, service and case study on the site
 * is read from this file. Edit here and the whole site updates — including the
 * structured data (JSON-LD) that Google and AI crawlers read.
 *
 * Anything marked TODO is a placeholder you should confirm before going live.
 */

export const site = {
  /** Must match `site` in astro.config.mjs. Used for canonicals + JSON-LD. */
  url: 'https://vikramaa.com',
  name: 'Vikram M A A',
  /** Shown in the browser tab after the page title. */
  brand: 'Vikram M A A',
  jobTitle: 'Digital Marketing Consultant',
  tagline: 'Digital marketing that is accountable to revenue, not vanity metrics.',
  yearsExperience: 10,
  /** Used in the footer copyright. */
  foundedYear: 2016,
} as const;

export const contact = {
  email: 'vikram.1996523@gmail.com',
  phone: '+91 70199 90776',
  /** E.164 format — used for tel: and WhatsApp links. */
  phoneRaw: '+917019990776',
  whatsapp: '917019990776',
  city: 'Bengaluru',
  region: 'Karnataka',
  country: 'India',
  countryCode: 'IN',
  /** Street address is intentionally omitted — set `streetAddress` if you want it public. */
  streetAddress: '',
  /** TODO: confirm these URLs, or delete the ones you do not use. */
  socials: [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/vikram-m-a-a/' },
    { name: 'Email', url: 'mailto:vikram.1996523@gmail.com' },
  ],
} as const;

/** Shown as the credibility strip under the hero. TODO: confirm every number. */
export const stats = [
  { value: '10+', label: 'Years in digital marketing' },
  { value: '19%', label: 'Bounce rate on social-driven traffic' },
  { value: '3X', label: 'Organic engagement growth in 2 months' },
  { value: '2', label: 'Continents of client work' },
] as const;

export type Service = {
  slug: string;
  title: string;
  /** Used in <title> and H1 on the service page. Keyword-led on purpose. */
  seoTitle: string;
  metaDescription: string;
  /** One-sentence answer to "what is this and who is it for" — AI crawlers quote this. */
  summary: string;
  /** The pain the buyer feels before they call you. */
  problem: string;
  deliverables: string[];
  outcomes: string[];
  faqs: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: 'seo',
    title: 'SEO',
    seoTitle: 'SEO Consultant in Bengaluru — Technical, On-Page & Off-Page',
    metaDescription:
      'Freelance SEO consultant in Bengaluru. Technical audits, on-page optimisation, keyword mapping, content strategy and link building that grow organic traffic.',
    summary:
      'I plan and execute SEO end to end — technical fixes, on-page optimisation, content built around real search demand, and the off-page work that makes it rank.',
    problem:
      'Most sites do not have an SEO problem so much as three separate ones: crawlers cannot read the site properly, the pages that exist do not target what people actually search, and nothing credible links to them. Fixing one without the other two is why SEO retainers stall.',
    deliverables: [
      'Technical SEO audit — crawlability, URL structure, internal linking, Core Web Vitals, indexation',
      'Keyword research mapped page-by-page, split by search intent',
      'On-page optimisation — titles, meta descriptions, header hierarchy, content depth',
      'Schema / structured data markup so search engines and AI assistants can parse the site',
      'Content plan built around topic clusters, not one-off blog posts',
      'Off-page strategy — digital PR, article placement, backlink acquisition, domain authority growth',
      'Monthly reporting tied to rankings, qualified traffic and conversions',
    ],
    outcomes: [
      'Qualified organic traffic that converts, rather than raw sessions',
      'A site architecture that keeps compounding as you add pages',
      'Visibility in AI search — ChatGPT, Perplexity, Google AI Overviews',
    ],
    faqs: [
      {
        q: 'How long does SEO take to show results?',
        a: 'Technical fixes and on-page work usually move rankings within 4 to 8 weeks. Content and off-page work compound over 4 to 6 months. Anyone promising page one in 30 days is either buying links or targeting keywords nobody searches.',
      },
      {
        q: 'Do you work on the site yourself or hand over a document?',
        a: 'Both are available. I can deliver an audit and roadmap for your in-house team to run, or implement the changes directly with your developer. Most clients start with the audit and keep me on to execute.',
      },
      {
        q: 'What does SEO cost?',
        a: 'A one-off technical and content audit is priced per project depending on site size. Ongoing SEO runs as a monthly retainer scoped to how much content and off-page work you need. Tell me the site and the target market and I will quote specifically.',
      },
    ],
  },
  {
    slug: 'performance-marketing',
    title: 'Performance Marketing',
    seoTitle: 'Performance Marketing Consultant — Google & Meta Ads',
    metaDescription:
      'Performance marketing consultant managing Google Ads and Meta Ads. Campaign structure, audience research, creative testing and spend optimisation.',
    summary:
      'I run Google and Meta ad accounts against a cost-per-qualified-lead target — structuring campaigns, researching audiences, testing creative and cutting spend that does not convert.',
    problem:
      'Ad accounts rarely fail because of bidding. They fail because the audience is wrong, the creative says nothing specific, and the landing page asks for too much. Budget then gets spread evenly across everything instead of concentrated on what works.',
    deliverables: [
      'Account audit — structure, tracking accuracy, wasted spend, conversion attribution',
      'Target audience research and segment definition',
      'Campaign architecture across Google Search, Performance Max, Meta and remarketing',
      'Creative direction and ad copy, with a structured testing plan',
      'Conversion tracking setup — GA4, pixel, offline conversion import where relevant',
      'Landing page recommendations tied to the promise in the ad',
      'Weekly optimisation against cost per qualified lead, not cost per click',
    ],
    outcomes: [
      'Lower cost per qualified lead, tracked to the actual sale where the CRM allows it',
      'Budget concentrated on the segments and creatives that convert',
      'Reporting your sales team recognises, not a dashboard of impressions',
    ],
    faqs: [
      {
        q: 'What is the minimum ad budget you work with?',
        a: 'Below roughly ₹1,00,000 a month in media spend there is not enough data to optimise properly, and my fee eats too much of the budget. Under that, a one-off setup and training engagement is better value than a retainer.',
      },
      {
        q: 'Do you charge a percentage of ad spend?',
        a: 'No. A percentage of spend rewards me for spending more of your money. I charge a flat monthly retainer scoped to the number of accounts and campaigns.',
      },
      {
        q: 'Which platforms do you manage?',
        a: 'Google Ads (Search, Performance Max, Display, YouTube) and Meta Ads (Facebook and Instagram) are the core. LinkedIn Ads for B2B where the audience justifies the cost per click.',
      },
    ],
  },
  {
    slug: 'social-media-marketing',
    title: 'Social Media Marketing',
    seoTitle: 'Social Media Marketing Consultant — Strategy & Content',
    metaDescription:
      'Social media marketing consultant building organic strategy that drives traffic and leads. Audits, content mix, creative production and optimisation.',
    summary:
      'I build organic social strategy that sends qualified traffic to your site — audit, content mix, creative, cadence, and monthly optimisation against what analytics actually shows.',
    problem:
      'Most brands post consistently and get nothing back, because the content is about the company rather than the audience, and no post has a job to do. Volume without a content mix is just noise with a schedule.',
    deliverables: [
      'Social media audit — profile optimisation, current performance, competitor benchmark',
      'Platform strategy — where your audience actually is, and what belongs on each channel',
      'Content mix designed around specific jobs: reach, engagement, traffic, conversion',
      'Creative production — post design, carousels, short-form video direction',
      'Hashtag, tag and keyword research per platform',
      'Posting calendar aligned to when your audience is active',
      'Monthly analytics review and strategy correction',
    ],
    outcomes: [
      'Measurable referral traffic to the website, not just follower count',
      'Engagement from people who could actually buy',
      'A repeatable content system your team can run without you',
    ],
    faqs: [
      {
        q: 'Do you also produce the creatives?',
        a: 'Yes. Customised post creatives, carousels and short-form video direction are part of the engagement. If you have an in-house designer I direct them instead, which usually works out cheaper.',
      },
      {
        q: 'Which platforms do you cover?',
        a: 'Instagram, LinkedIn, Facebook, YouTube and X. I would rather run two channels properly than five badly, so the audit decides which ones earn the effort.',
      },
      {
        q: 'How do you measure organic social?',
        a: 'Reach and engagement are diagnostic, not the goal. The number that matters is referral traffic to the site and what that traffic does once it lands — which is why bounce rate and conversion are in every report I send.',
      },
    ],
  },
  {
    slug: 'content-marketing',
    title: 'Content Marketing',
    seoTitle: 'Content Marketing Consultant — Strategy & Distribution',
    metaDescription:
      'Content marketing consultant for B2B and B2C brands. Audience research, brand storyline, editorial planning, production and distribution.',
    summary:
      'I build the content engine — who you are talking to, the story that makes them care, what to publish, and how it gets distributed so it is not read by nobody.',
    problem:
      'Content fails at one of two ends. Either nobody defined the audience precisely enough, so everything is generic; or the content is good and gets published into a void with no distribution plan behind it.',
    deliverables: [
      'Target audience research — segments, objections, the questions they actually ask',
      'Brand storyline and messaging framework the whole company can use',
      'Editorial calendar built on topic clusters, tied to the SEO keyword map',
      'Long-form content production — articles, landing pages, case studies, whitepapers',
      'Platform-specific adaptation so one asset works across channels',
      'Distribution plan — organic, email, social, partnerships',
      'Performance review tied to traffic, leads and assisted conversions',
    ],
    outcomes: [
      'A content library that keeps generating leads months after publishing',
      'Consistent positioning across every channel and every salesperson',
      'Search and AI-assistant visibility for the questions your buyers ask',
    ],
    faqs: [
      {
        q: 'Do you write the content or manage writers?',
        a: 'Both. I write the high-stakes assets — positioning pages, pillar content, case studies — and build the brief-and-review system so a writing team can produce the rest at volume without drifting off-message.',
      },
      {
        q: 'How does content marketing connect to SEO?',
        a: 'They are the same project. The keyword map decides what gets written, and the content is what makes the SEO work. Running them as separate engagements is how you end up with well-optimised pages nobody wants to read.',
      },
    ],
  },
  {
    slug: 'lead-generation',
    title: 'Lead Generation',
    seoTitle: 'Lead Generation Consultant — Build a Predictable Pipeline',
    metaDescription:
      'Lead generation consultant building predictable pipeline. Offer design, channel selection, funnel build, lead scoring and CRM handover.',
    summary:
      'I build the full path from stranger to qualified conversation — the offer, the channels, the funnel, the scoring, and the handover into your CRM.',
    problem:
      'Most lead gen problems are actually qualification problems. The forms fill up, sales calls the leads, nobody buys, and everyone concludes the channel does not work. Usually the offer attracted the wrong person.',
    deliverables: [
      'Offer and lead magnet design matched to buying intent, not just anything downloadable',
      'Channel selection — paid, organic, email, partnerships — based on where your buyer is',
      'Funnel build: landing pages, forms, follow-up sequences',
      'Lead scoring and qualification criteria agreed with the sales team',
      'CRM setup and handover process so leads do not die in an inbox',
      'Nurture sequences for leads that are real but not ready yet',
      'Reporting from first touch through to closed revenue',
    ],
    outcomes: [
      'A pipeline you can forecast, instead of a good month followed by a dry one',
      'Sales and marketing agreeing on what counts as a qualified lead',
      'Lower cost per acquisition as the nurture layer starts converting the slow buyers',
    ],
    faqs: [
      {
        q: 'Do you guarantee a number of leads?',
        a: 'No, and be careful with anyone who does. Guaranteed lead counts are met by lowering the qualification bar. I commit to a cost per qualified lead target agreed with your sales team, and report against it honestly.',
      },
      {
        q: 'Can you work with our existing CRM?',
        a: 'Yes. HubSpot, Zoho, Salesforce or a spreadsheet if that is genuinely where you are. The tool matters far less than whether the handover process is defined and followed.',
      },
    ],
  },
  {
    slug: 'marketing-sales-training',
    title: 'Marketing & Sales Team Training',
    seoTitle: 'Marketing & Sales Training — Upskill Your In-House Team',
    metaDescription:
      'Hands-on marketing and sales training for in-house teams. Practical workshops on SEO, paid ads, social, content and sales process.',
    summary:
      'I train in-house marketing and sales teams to run this work themselves — practical sessions on your real accounts and your real pipeline, not slideware.',
    problem:
      'Agencies create dependency. The knowledge leaves when the contract does, and the team is back where it started. Training flips that: the capability stays inside the company.',
    deliverables: [
      'Skills assessment to find where the team is actually losing deals or budget',
      'Custom curriculum across SEO, paid media, social, content and analytics',
      'Sales enablement — messaging, objection handling, lead qualification, follow-up discipline',
      'Live workshops run on your own accounts, campaigns and pipeline',
      'Playbooks and SOPs the team keeps and uses after the sessions end',
      'Post-training review to check what stuck and what needs reinforcing',
    ],
    outcomes: [
      'A team that can plan and run campaigns without external help',
      'Marketing and sales working from one definition of a good lead',
      'Lower long-term agency spend, because the capability is in-house',
    ],
    faqs: [
      {
        q: 'Is the training remote or in person?',
        a: 'Both. In person across Bengaluru and most of India; remote for teams anywhere else. Workshops are hands-on either way — the team works on live accounts during the session.',
      },
      {
        q: 'How long is a training engagement?',
        a: 'A focused workshop runs one to two days. A full team upskilling programme typically runs six to eight weeks part-time, so people can apply each module before the next one.',
      },
      {
        q: 'Do you train sales teams as well as marketing?',
        a: 'Yes. Training them separately is part of why the two functions argue about lead quality. The most useful sessions have both in the room agreeing on what a qualified lead looks like.',
      },
    ],
  },
];

export type CaseStudy = {
  slug: string;
  client: string;
  industry: string;
  location: string;
  /** One line the whole case study can be summarised as. */
  headline: string;
  challenge: string;
  approach: string[];
  results: string[];
  /** TODO: replace with real client quotes once you have permission to publish them. */
  quote?: { text: string; attribution: string };
};

/**
 * TODO: confirm every number below before publishing. These are drawn from the
 * portfolio PDF and are deliberately conservative where the source was vague.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: 'mapletree',
    client: 'Mapletree',
    industry: 'Real estate',
    location: 'India',
    headline: 'Organic social strategy that tripled engagement in two months',
    challenge:
      'Social channels were active but static — posting regularly with no measurable lift in reach, engagement or traffic to the website.',
    approach: [
      'Audited existing content and benchmarked against competitors in the category',
      'Rebuilt the content mix so each post had a defined job: reach, engagement or traffic',
      'Researched and applied platform-specific tags and keywords',
      'Shifted posting to the times the audience was actually active',
      'Reviewed analytics monthly and cut what was not performing',
    ],
    results: [
      'Sharp increase in accounts reached and engagements within two months',
      'Growth achieved entirely organically, with no paid amplification',
      'Visible spike in website traffic on every publishing day',
    ],
  },
  {
    slug: 'ayanam-aerospace',
    client: 'Ayanam Aerospace',
    industry: 'Drone manufacturing',
    location: 'India',
    headline: 'Lead generation and content strategy for a deep-tech manufacturer',
    challenge:
      'A technical product in a niche B2B category, where the buying audience is small, specific and hard to reach through generic marketing.',
    approach: [
      'Defined the buying audience precisely — segment, role and purchase trigger',
      'Built a content strategy that made a technical product legible to non-technical buyers',
      'Set up lead generation campaigns targeted at the qualified segment',
      'Optimised spend continuously against cost per qualified enquiry',
    ],
    results: [
      'A consistent flow of qualified enquiries from a narrow B2B audience',
      'Content that gave the sales team credible material to send to prospects',
    ],
  },
  {
    slug: 'muka',
    client: 'MUKA',
    industry: 'Art and design',
    location: 'Canada',
    headline: 'Content marketing consulting for an international art brand',
    challenge:
      'Building an audience in a category where the product is emotional and visual, and standard performance marketing tactics fall flat.',
    approach: [
      'Researched the audience and defined the brand storyline',
      'Built a content programme around audience engagement and community, not promotion',
      'Adapted each asset for the platforms where the audience actually spent time',
    ],
    results: [
      'A defined brand storyline the team could publish against consistently',
      'Engaged community growth rather than passive follower count',
    ],
  },
];

/** Home page FAQ. Written as direct answers — this is what AI assistants quote. */
export const faqs = [
  {
    q: 'What does a digital marketing consultant actually do?',
    a: `A digital marketing consultant diagnoses why a company's marketing is not producing revenue, then fixes it — either by executing the work directly or by building the strategy and training the in-house team to run it. In my case that covers SEO, Google and Meta ads, social media, content marketing, lead generation, and marketing and sales training.`,
  },
  {
    q: 'Do you work with startups or established companies?',
    a: 'Both. Startups usually need one channel working reliably before they scale. Established companies usually need a system fixed — leads that do not convert, ad spend with no attribution, or a marketing team that has plateaued. The diagnosis differs; the method does not.',
  },
  {
    q: 'Do you work with clients outside India?',
    a: `Yes. I have worked with clients across India and internationally, including a Canadian brand. Remote engagements are normal — most of the work happens in your accounts, your analytics and your CRM regardless of where I am sitting.`,
  },
  {
    q: 'How do engagements usually start?',
    a: 'With an audit. Before recommending spend, I look at what is already running — the site, the ad accounts, the analytics, the content and the sales handover. The audit tells us whether you need a new channel or a repair to an existing one, and it is usually the cheapest part of the engagement.',
  },
  {
    q: 'Do you take on retainers or one-off projects?',
    a: 'Both. Audits, strategy builds and training workshops run as fixed-scope projects. SEO, paid media and social run better as monthly retainers, because they depend on continuous optimisation.',
  },
  {
    q: 'What makes you different from an agency?',
    a: 'You get the person doing the work, not an account manager relaying instructions to a junior. And I will tell you when a channel is not worth your money, which is a harder conversation for an agency billing a percentage of your ad spend.',
  },
];

/** The engagement process shown on the home page. */
export const process = [
  {
    step: '01',
    title: 'Audit',
    description:
      'I look at what is already running — site, analytics, ad accounts, content and the sales handover — and find where the money is leaking.',
  },
  {
    step: '02',
    title: 'Strategy',
    description:
      'A written plan: which channels, which audience, what gets published, what gets spent, and the number we are holding it to.',
  },
  {
    step: '03',
    title: 'Execute',
    description:
      'The work gets done — campaigns built, pages optimised, content shipped. Either by me, or by your team with me directing.',
  },
  {
    step: '04',
    title: 'Optimise',
    description:
      'Monthly review against the target metric. What works gets more budget, what does not gets cut. No channel is protected by sunk cost.',
  },
];

/** Industries worked in. Used for topical relevance and internal linking. */
export const industries = [
  'Real estate',
  'Aerospace and drones',
  'Art and design',
  'SaaS and technology',
  'Manufacturing',
  'Education',
  'Professional services',
  'Retail and e-commerce',
] as const;
