/**
 * SINGLE SOURCE OF TRUTH.
 *
 * Almost every piece of copy, contact detail, topic page and portfolio entry on
 * the site is read from this file. Edit here and the whole site updates —
 * including the structured data (JSON-LD) that Google and AI crawlers read.
 *
 * POSITIONING NOTE: this is a personal blog and portfolio. Nothing here offers,
 * sells or prices a service. Vikram is employed under contract and is not taking
 * outside work. The invitation everywhere on the site is a conversation by email
 * or LinkedIn, never an engagement.
 */

export const site = {
  /** Must match `site` in astro.config.mjs. Used for canonicals + JSON-LD. */
  url: 'https://vikramhere.com',
  name: 'Vikram M A A',
  /** Shown in the browser tab after the page title. */
  brand: 'Vikram M A A',
  jobTitle: 'Digital Marketing & GTM',
  tagline: 'Ten years of digital marketing and go-to-market, written down.',
  yearsExperience: 10,
  /** Used in the footer copyright. */
  foundedYear: 2016,
} as const;

export const contact = {
  email: 'vikram.1996523@gmail.com',
  linkedin: 'https://www.linkedin.com/in/vikram-m-a-a/',
  city: 'Bengaluru',
  region: 'Karnataka',
  country: 'India',
  countryCode: 'IN',
  /** Street address is intentionally omitted — set `streetAddress` if you want it public. */
  streetAddress: '',
  socials: [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/vikram-m-a-a/' },
    { name: 'Email', url: 'mailto:vikram.1996523@gmail.com' },
  ],
} as const;

/**
 * The one line that replaces every old sales CTA. Reused by the CTA component,
 * the contact page and the FAQ so the wording stays identical everywhere.
 */
export const chatInvite = {
  heading: 'Stuck on a GTM or marketing problem?',
  body: `This site is a blog and a portfolio, not a shop. I am working full time under contract and I am not taking on outside work. That said, if you would like to know how your GTM or digital marketing issue could be solved, feel free to reach out by email or on LinkedIn. Happy to have a quick chat and think it through with you.`,
} as const;

/** Shown as the credibility strip under the hero. */
export const stats = [
  { value: '10+', label: 'Years in digital marketing' },
  { value: '19%', label: 'Bounce rate on social-driven traffic' },
  { value: '3X', label: 'Organic engagement growth in 2 months' },
  { value: '2', label: 'Continents of work behind me' },
] as const;

export type Topic = {
  slug: string;
  title: string;
  /** Used in <title> and H1 on the topic page. Keyword-led on purpose. */
  seoTitle: string;
  metaDescription: string;
  /** One-sentence answer to "what is this page about" — AI crawlers quote this. */
  summary: string;
  /** The pattern I keep running into in this discipline. */
  pattern: string;
  /** What actually moves the needle, in the order I check it. */
  whatMatters: string[];
  /** How you know it is working. */
  signals: string[];
  /** Lowercase terms used to pull matching blog posts onto the topic page. */
  match: string[];
  faqs: { q: string; a: string }[];
};

/**
 * The disciplines I have spent ten years in. These pages are notes on how I
 * think about each one — a point of view, not a menu.
 */
export const topics: Topic[] = [
  {
    slug: 'seo',
    title: 'SEO',
    seoTitle: 'SEO Notes — How I Think About Search Visibility',
    metaDescription:
      'Notes on SEO from ten years of running it: why technical, on-page and off-page work only pay off together, and the order I check things in.',
    summary:
      'Most sites do not have an SEO problem. They have three at once, and fixing one without the other two is why the work appears to stall.',
    pattern:
      'The three problems are usually these: crawlers cannot read the site properly, the pages that exist do not target what people actually search, and nothing credible links to them. Each one caps the return on the other two. I have watched teams spend a year on content while the site was quietly serving duplicate URLs, and watched perfect technical audits get filed because nobody would write anything.',
    whatMatters: [
      'Crawlability and indexation first — URL structure, internal linking, Core Web Vitals, what Google is actually storing',
      'Keyword research mapped page by page, split by intent, before a single word gets written',
      'On-page depth — titles, meta descriptions, header hierarchy, and whether the page answers the query it targets',
      'Schema and structured data, so search engines and AI assistants can parse what the page is about',
      'Topic clusters instead of one-off posts, because an isolated article rarely ranks for anything competitive',
      'Off-page credibility — who links to you, and whether anyone outside your own site cites you',
      'Reporting tied to qualified traffic and conversions rather than raw sessions',
    ],
    signals: [
      'Organic traffic that converts, rather than sessions that bounce',
      'A site architecture that keeps compounding as pages get added',
      'Visibility in AI search — ChatGPT, Perplexity, Google AI Overviews',
    ],
    match: ['seo', 'search engine', 'ai search', 'chatgpt', 'google business profile', 'keyword', 'backlink'],
    faqs: [
      {
        q: 'How long does SEO take to show results?',
        a: 'Technical fixes and on-page work usually move rankings within 4 to 8 weeks. Content and off-page work compound over 4 to 6 months. Anyone promising page one in 30 days is either buying links or targeting keywords nobody searches.',
      },
      {
        q: 'What is the first thing to check when SEO is not working?',
        a: 'Indexation. Before touching content or links, confirm the pages you care about are actually indexed and that Google is not choosing a different canonical. A surprising share of stalled SEO turns out to be pages that were never in the index in the first place.',
      },
      {
        q: 'Does SEO still matter now that people ask AI assistants?',
        a: 'Yes, and the work overlaps more than people expect. Assistants pull from indexed pages, structured data and third-party citations, which is the same ground technical SEO, clear on-page answers and off-page credibility already cover. I have written about this in more detail on the blog.',
      },
    ],
  },
  {
    slug: 'performance-marketing',
    title: 'Performance Marketing',
    seoTitle: 'Performance Marketing Notes — Google & Meta Ads',
    metaDescription:
      'Notes on running Google and Meta ads: why accounts fail on audience and creative rather than bidding, and what I check before touching a bid.',
    summary:
      'Ad accounts rarely fail because of bidding. They fail on audience, creative and the landing page, in that order.',
    pattern:
      'The account gets blamed for a problem it did not create. The audience is wrong, the creative says nothing specific, the landing page asks for too much, and then the budget gets spread evenly across everything instead of concentrated on the two things that convert. Bid strategy is the last place I look, and it is almost never the answer.',
    whatMatters: [
      'Tracking accuracy before anything else — if the conversion data is wrong, every decision after it is wrong',
      'Audience definition specific enough to write an ad to one person',
      'Campaign architecture that keeps search, Performance Max, Meta and remarketing from cannibalising each other',
      'Creative testing with a structure, so a losing ad teaches you something',
      'Landing pages that keep the promise the ad made',
      'Cost per qualified lead as the number, not cost per click',
      'The search terms report, read weekly, which almost nobody does',
    ],
    signals: [
      'Cost per qualified lead falling while volume holds',
      'Budget concentrating on the segments and creatives that convert',
      'Reporting a sales team recognises, not a dashboard of impressions',
    ],
    match: ['google ads', 'ppc', 'performance marketing', 'paid', 'advertising'],
    faqs: [
      {
        q: 'Why is a Google Ads account spending money without converting?',
        a: 'In most accounts I have opened it is one of six settings: broad match with no negatives, Search Partners and Display expansion left on, location targeting set to presence-or-interest, automated bidding running on a conversion that is not real, one ad group covering five intents, or a landing page that does not match the ad. Check the settings before rebuilding the strategy.',
      },
      {
        q: 'How much ad budget is enough to learn anything?',
        a: 'Below roughly Rs 1,00,000 a month in media spend there is usually not enough conversion data to optimise properly, so decisions get made on noise. At that level, a smaller, tightly targeted account with one clear offer beats a spread-out one.',
      },
      {
        q: 'Should you pay someone a percentage of ad spend?',
        a: 'It is common and it is a structural conflict of interest, because it rewards whoever manages the account for spending more of your money. Flat fees scoped to the work are cleaner. That holds whether you are hiring an agency or an individual.',
      },
    ],
  },
  {
    slug: 'social-media-marketing',
    title: 'Social Media Marketing',
    seoTitle: 'Social Media Notes — Organic Strategy That Earns Traffic',
    metaDescription:
      'Notes on organic social: why consistent posting produces nothing without a content mix, and what I measure instead of follower count.',
    summary:
      'Posting consistently and getting nothing back is a content mix problem, not a frequency problem.',
    pattern:
      'Brands post on schedule and see flat numbers, because the content is about the company rather than the audience, and no individual post has a job to do. Volume without a mix is noise with a calendar attached. The fix is boring: decide what each post is for, then check whether it did that.',
    whatMatters: [
      'An honest audit first — what the profile is currently earning, and what competitors in the category actually get',
      'Choosing platforms by where the audience is, then running two properly instead of five badly',
      'A content mix where every post has one job: reach, engagement, traffic or conversion',
      'Creative that is legible on a phone at arm’s length, which rules out most carousels',
      'Platform-specific tags and keywords, researched rather than copied',
      'Posting when the audience is awake, which the analytics will tell you',
      'A monthly review that cuts formats instead of defending them',
    ],
    signals: [
      'Referral traffic to the site, and what that traffic does after it lands',
      'Engagement from people who could plausibly buy',
      'A repeatable system a team can run without the person who designed it',
    ],
    match: ['social media', 'instagram', 'facebook', 'linkedin'],
    faqs: [
      {
        q: 'How do you measure organic social properly?',
        a: 'Reach and engagement are diagnostic, not the goal. The numbers that matter are referral traffic to the site and what that traffic does once it arrives, which is why bounce rate and conversion belong in a social report at all.',
      },
      {
        q: 'How many platforms should a small brand be on?',
        a: 'Two, run properly. Five channels posted to out of obligation produce less than two channels with a real content mix, and they cost far more attention.',
      },
      {
        q: 'Does follower count matter?',
        a: 'Barely. A 2,000-follower account in a narrow category can send more qualified traffic than a 50,000-follower account built on giveaways. Look at saves, shares and outbound clicks instead.',
      },
    ],
  },
  {
    slug: 'content-marketing',
    title: 'Content Marketing',
    seoTitle: 'Content Marketing Notes — Audience, Story, Distribution',
    metaDescription:
      'Notes on content marketing: why content fails on audience definition or distribution, and how the editorial plan connects to the keyword map.',
    summary:
      'Content fails at one of two ends: nobody defined the audience precisely enough, or nobody planned how it would be read.',
    pattern:
      'The first failure produces content that is technically fine and speaks to no one. The second produces genuinely good work published into a void. Both get blamed on "content not working", and both are fixable before a single word is written.',
    whatMatters: [
      'Audience research that names the segments, the objections and the questions people actually ask',
      'A brand storyline the whole company can repeat without drifting',
      'An editorial calendar built on topic clusters and tied to the keyword map, not to whatever seems interesting that week',
      'Long-form assets that carry weight — pillar pages, case studies, the piece a salesperson forwards',
      'Adaptation, so one asset earns its keep across several channels',
      'A distribution plan written at the same time as the brief',
      'Review against traffic, leads and assisted conversions',
    ],
    signals: [
      'A library that keeps producing readers months after publishing',
      'Consistent positioning across every channel and every salesperson',
      'Search and AI-assistant visibility for the questions buyers actually ask',
    ],
    match: ['content', 'storytelling', 'blogging', 'brand'],
    faqs: [
      {
        q: 'How does content marketing connect to SEO?',
        a: 'They are the same project. The keyword map decides what gets written and the content is what makes the SEO work. Running them separately is how you end up with well-optimised pages nobody wants to read.',
      },
      {
        q: 'How much content is enough?',
        a: 'Fewer pieces, planned as a cluster, beat a high-volume calendar of unrelated posts. One well-researched pillar with four supporting articles will out-earn twenty scattered ones, and it is far less work to keep current.',
      },
      {
        q: 'Should a founder write it themselves?',
        a: 'For the high-stakes pieces, usually yes, at least in draft. The specifics that make content credible — the numbers, the objections, the story about the deal that went wrong — live in the founder’s head and rarely survive a briefing document.',
      },
    ],
  },
  {
    slug: 'lead-generation',
    title: 'Lead Generation',
    seoTitle: 'Lead Generation Notes — Pipeline, Not Form Fills',
    metaDescription:
      'Notes on lead generation: why most lead gen problems are qualification problems, and how the offer decides who fills the form.',
    summary:
      'Most lead generation problems are qualification problems wearing a different hat.',
    pattern:
      'The forms fill up, sales calls the leads, nobody buys, and everyone concludes the channel does not work. Usually the offer attracted the wrong person. A free download anyone would take brings you anyone, and then marketing and sales spend a quarter arguing about lead quality instead of fixing the offer.',
    whatMatters: [
      'An offer matched to buying intent, not just something downloadable',
      'Channel selection based on where the buyer already is',
      'A funnel that holds together — landing page, form, follow-up sequence',
      'Scoring and qualification criteria agreed with sales, in writing, before the campaign runs',
      'A handover process, so leads do not die in an inbox',
      'Nurture for the leads that are real but not ready yet',
      'Reporting that runs from first touch to closed revenue rather than stopping at the form',
    ],
    signals: [
      'A pipeline you can forecast, instead of a good month followed by a dry one',
      'Sales and marketing agreeing on what counts as qualified',
      'Acquisition cost falling as the nurture layer starts converting slow buyers',
    ],
    match: ['lead generation', 'lead conversion', 'cold email', 'funnel', 'ai lead'],
    faqs: [
      {
        q: 'Why are the leads coming in unqualified?',
        a: 'Look at the offer before the targeting. An offer that costs the prospect nothing to accept, and signals nothing about intent, will fill a form with people who are not buying. Tighten what you are asking them to say yes to and volume drops while quality rises.',
      },
      {
        q: 'Should anyone guarantee a number of leads?',
        a: 'Be careful with that promise. Guaranteed lead counts are met by lowering the qualification bar, which moves the problem to the sales team rather than solving it. A cost per qualified lead target, agreed with sales, is the honest version.',
      },
      {
        q: 'Does the CRM matter?',
        a: 'Less than people think. HubSpot, Zoho, Salesforce or a shared spreadsheet — the tool matters far less than whether the handover process is defined and actually followed.',
      },
    ],
  },
  {
    slug: 'marketing-sales-alignment',
    title: 'Marketing & Sales Alignment',
    seoTitle: 'Marketing & Sales Alignment — Why Teams Argue About Leads',
    metaDescription:
      'Notes on marketing and sales alignment: why the two teams disagree about lead quality, and what actually settles the argument.',
    summary:
      'Marketing reports lead volume, sales says the leads are junk, and both are right, because nobody wrote down what qualified means.',
    pattern:
      'This is the most common structural problem I have seen, and it is rarely about competence. The two teams are measured on different numbers, they have never sat in the same room to define a qualified lead, and the handover between them is an email nobody owns. Every campaign after that argues in circles.',
    whatMatters: [
      'One written definition of a qualified lead, signed off by both teams',
      'Shared visibility — marketing seeing what closed, sales seeing where leads came from',
      'A handover with an owner and a response time, not just a CRM record',
      'Messaging consistency, so the sales call sounds like the ad that produced it',
      'Objection handling built from what marketing hears and sales encounters',
      'A feedback loop where sales tells marketing which leads were real, weekly',
      'Reporting both teams read from the same dashboard',
    ],
    signals: [
      'Fewer arguments about lead quality, because the definition is not in dispute',
      'Faster follow-up, which usually lifts conversion more than any new channel',
      'Capability that stays inside the company rather than leaving with a contract',
    ],
    match: ['agency', 'consulting', 'consultant', 'hiring', 'strategy', 'sales'],
    faqs: [
      {
        q: 'What is the fastest fix for marketing and sales disagreeing on lead quality?',
        a: 'Get both teams in one room and write the definition of a qualified lead down, together, on one page. It sounds too simple to be the answer. In most companies I have seen it removes the argument entirely, because the disagreement was never about the leads.',
      },
      {
        q: 'Why does knowledge leave when an agency contract ends?',
        a: 'Because the work was done somewhere else. If an outside team runs the accounts and writes the reports, the reasoning behind the decisions never enters the company. Documenting the why alongside the what is what keeps it in-house.',
      },
    ],
  },
];

export type CaseStudy = {
  slug: string;
  client: string;
  industry: string;
  location: string;
  /** One line the whole project can be summarised as. */
  headline: string;
  challenge: string;
  approach: string[];
  results: string[];
  quote?: { text: string; attribution: string };
};

/** Past work. Figures are the outcomes reported during those projects. */
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
    headline: 'Content marketing for an international art brand',
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
    q: 'Who is Vikram M A A?',
    a: `I am a digital marketing and go-to-market specialist based in ${contact.city}, India, with ${site.yearsExperience}+ years across SEO, Google and Meta ads, social media, content marketing and lead generation. This site is my personal blog and portfolio.`,
  },
  {
    q: 'Are you available for freelance or consulting work?',
    a: 'No. I work full time under contract and I am not taking on outside work, so nothing on this site is an offer of services. If you would like to know how your GTM or digital marketing issue could be solved, reach out by email or on LinkedIn and we can have a quick chat about it.',
  },
  {
    q: 'What do you write about here?',
    a: 'SEO, paid media, organic social, content, lead generation and AI search — written for the person who has to justify the budget. Most posts come out of something I ran, got wrong, or watched happen in an account.',
  },
  {
    q: 'What is in the portfolio?',
    a: 'Work from earlier in my career: organic social for a real estate brand, lead generation and content for a drone manufacturer, and content marketing for an art brand in Canada. Each entry describes the problem, what was done and what it produced.',
  },
  {
    q: 'How do you approach a marketing problem?',
    a: 'Diagnose before spending. Look at the site, the analytics, the ad accounts, the content and the handover between marketing and sales, and find where the money is leaking before recommending a new channel. The problem is usually not where people assume it is.',
  },
  {
    q: 'Where are you based?',
    a: `${contact.city}, ${contact.region}, India. Most of the work I have done has been remote or hybrid, across India and internationally, including a Canadian brand.`,
  },
];

/** How I work through a marketing problem. A point of view, not a process to buy. */
export const approach = [
  {
    step: '01',
    title: 'Diagnose',
    description:
      'Look at what is already running — site, analytics, ad accounts, content and the sales handover — and find where the money is leaking. This is where most of the answer is.',
  },
  {
    step: '02',
    title: 'Decide',
    description:
      'Pick the channel and the audience, and name the single number the work is being held to. Written down, so it cannot quietly change later.',
  },
  {
    step: '03',
    title: 'Do',
    description:
      'Ship it. Campaigns built, pages fixed, content published. Most plans fail in this step, not in the planning.',
  },
  {
    step: '04',
    title: 'Review',
    description:
      'Check against the number. What works gets more, what does not gets cut. No channel is protected because it was somebody’s idea.',
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
