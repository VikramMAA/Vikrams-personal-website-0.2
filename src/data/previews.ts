/**
 * Private concept preview pages, one per creator, rendered by
 * src/pages/preview/[slug].astro at /preview/<slug>/.
 *
 * Rules every entry holds to (see the route file for how they are enforced):
 *  - labelled as a concept, not a product
 *  - no working checkout: the buy button is an inert, disabled control
 *  - not indexed, not in the sitemap, not linked from anywhere
 *  - no invented proof: no reviews, sales figures, testimonials or press claims
 *
 * /preview/mabelinthehouse/ predates this file and is its own page
 * (src/pages/preview/mabelinthehouse.astro). Do not add it here.
 */

export interface PreviewPage {
  slug: string;
  handle: string;
  /** Used in the <title>: "Concept preview: <titleSuffix>". */
  titleSuffix: string;
  notice: string;
  introHeading: string;
  intro: string;
  mockHeading: string;
  product: {
    name: string;
    subtitle: string;
    description: string;
    /** Line addressed to the creator under the description. Optional. */
    yoursLine?: string;
    price: string;
  };
  chaptersHeading: string;
  chapters: string[];
  /** Commentary paragraphs after the chapter list. */
  notes: string[];
  proposalHeading: string;
  /** Each item renders with its first sentence as the lead. */
  proposal: string[];
}

const YOURS = 'Written and designed for you. Yours to sell.';

export const previews: PreviewPage[] = [
  {
    slug: 'thedailyammie',
    handle: '@thedailyammie',
    titleSuffix: 'The Restock Method',
    notice:
      'Nothing on this page is for sale. There is no checkout and no payment link. This is a mock-up built to show one idea of what a guide in your name could look like, so you can react to something real instead of a pitch. If you do not like it, nothing happens.',
    introHeading: 'Ammie, in one paragraph',
    intro:
      'Your grid does something unusual. The restock reels and the organising content pull the big numbers, the recipes keep people coming back, and 1,660 posts means none of it rests on one lucky video. What struck us most is the monetising. Every link on your bio.site goes somewhere else: the Amazon storefront, LTK, ShopMy, tracked Walmart links. You have already proved your audience will buy what you put in front of them. They just buy it from other people. That is the gap this is about.',
    mockHeading: 'What it could look like',
    product: {
      name: 'The Restock Method',
      subtitle: 'A 42-page guide to a home that is easy to put back.',
      description:
        'Your pantry does not fall apart because you are disorganised. It falls apart because it was organised once, for a photograph, and then real life ran through it. This is the system underneath the satisfying shelf: container sizes that actually fit a family shop, a labelling approach that survives a toddler, and a weekly rhythm short enough that you will keep doing it in February.',
      yoursLine: YOURS,
      price: '$29',
    },
    chaptersHeading: 'What is inside',
    chapters: [
      'Why your pantry keeps falling apart, and the one decision that fixes it',
      'The container audit: what to buy once, what to stop buying',
      'Zone by zone: the pantry',
      'Zone by zone: fridge and freezer',
      'Zone by zone: bathroom, linen and the under-sink drawer',
      'The labelling system that survives a three-year-old',
      'The twenty-minute weekly restock',
      'Ten dinners built from a restocked pantry',
    ],
    notes: [
      'Sections three to five lean on the rooms you already film. Section eight pulls your recipe content into the same product, so the guide works for the people who follow you for dinners as well as the ones who follow you for shelves.',
    ],
    proposalHeading: 'Ammie, here is the actual proposal',
    proposal: [
      'We build this. My team handles the research, the writing, the design, the payment processing and the delivery. You look at it, tell us what is wrong, and we fix it until it sounds like you.',
      'You get 50% of every sale. Not a flat fee, not a one-off payment. Half, on everything, for as long as it sells.',
      'You approve everything before a single page goes out with your name on it. If a chapter does not sound like you, it does not ship.',
      'No exclusivity. Keep your storefront, keep the brand work, keep every affiliate code you have. This sits alongside all of it.',
      'No call needed. If you want to talk it through, reply to the email. If you want to see the first section written before you decide anything, say so and we will write it.',
    ],
  },
  {
    slug: 'casa-karis',
    handle: '@casa.karis',
    titleSuffix: 'The Scandinavian Reset',
    notice:
      'Nothing here is for sale. No checkout, no payment link. This is a mock-up of one idea for a guide in your name, built so you can react to something real rather than a description. If it is not for you, nothing happens.',
    introHeading: 'Karis, in one paragraph',
    intro:
      'Thirty-eight posts and 78,000 people. That ratio is the whole story: almost nobody builds an audience that size on that few posts, which means your styling shots are doing something most home accounts cannot do. Your STYLING highlight is the proof, and the PR highlight says brands worked it out before we did. What you do not appear to have anywhere is something of your own with a price on it.',
    mockHeading: 'What it could look like',
    product: {
      name: 'The Scandinavian Reset',
      subtitle: 'A 40-page guide to restyling a room with what you already own.',
      description:
        'Not a renovation book. No walls come down and nothing gets ordered from a builder. This is the method behind a room that reads as calm instead of bare, which is the line almost everyone gets wrong when they try to copy a Scandinavian interior. It is about subtraction, light, and the three or four decisions that do the real work.',
      yoursLine: YOURS,
      price: '€27',
    },
    chaptersHeading: 'What is inside',
    chapters: [
      'The first rule: subtract before you buy anything',
      'Light, and the mistake that makes a bright room feel cold',
      'The three-height rule for any surface',
      'Texture carries a neutral room, not colour',
      'The open shelf, solved',
      'Seasonal swaps: two boxes, four changes a year',
      'The buy-once list',
      'One room, no renovation: before and after',
    ],
    notes: [
      'Section eight is the one that sells the guide, and it is built from the kind of transformation your grid already shows. Section six exists because autumn and Christmas content is where your reach spikes, and a seasonal system is something people will come back to four times a year.',
    ],
    proposalHeading: 'Karis, here is the actual proposal',
    proposal: [
      'We build it. My team handles research, writing, design, payments and delivery. You review it and tell us what is wrong until it sounds like you rather than like us.',
      'You get 50% of every sale. Half of everything, for as long as it sells. No flat fee.',
      'You approve everything before anything goes out under your name.',
      'No exclusivity. Keep the PR work, keep every brand relationship. This sits alongside it.',
      'No call needed. Reply to the email if you want to go further. If you would rather see one section written properly before deciding, we will write it first.',
    ],
  },
  {
    slug: 'laurengracewils',
    handle: '@laurengracewils',
    titleSuffix: 'From Shell to Snug',
    notice:
      'Nothing on this page is for sale. No checkout, no payment link, no sign-up. It is a mock-up of one idea for a guide in your name, so you can look at something real instead of reading a pitch. If you are not interested, nothing happens.',
    introHeading: 'Lauren, in one paragraph',
    intro:
      'Most interiors accounts show you a finished room. You showed the extension going up and the snug being built, which is a much harder thing to film and a much more useful thing to watch. People who are about to spend serious money on their own extension are watching you to find out what the decisions actually feel like. That audience is unusually valuable, because they are mid-project and looking for answers rather than inspiration.',
    mockHeading: 'What it could look like',
    product: {
      name: 'From Shell to Snug',
      subtitle: 'A 44-page handbook for an extension that comes out calm.',
      description:
        'The decisions that decide whether an extension feels finished or merely new are made months before anyone picks a cushion, and most of them are about light, floor level and joinery. This is the running order, written for someone standing in a shell wondering what to settle first.',
      yoursLine: YOURS,
      price: '£24',
    },
    chaptersHeading: 'What is inside',
    chapters: [
      'Decide what the room is for before you build it',
      'The calm palette, picked once and held',
      'Lighting an extension, which is what people retrofit and regret',
      'Flooring across old and new, and the threshold problem',
      'Soft structure: joinery, window seats and built-ins',
      'The snug: a small room that earns its keep',
      'What it costs, in honest ranges',
      'The order of operations, start to finish',
    ],
    notes: [
      'Sections five and six come straight from the builds on your grid. Section seven is the part nobody publishes and everybody searches for, and ranges are enough, no one needs your invoices.',
    ],
    proposalHeading: 'Lauren, here is the actual proposal',
    proposal: [
      'We build it. My team does the research, the writing, the design, the payment handling and the delivery. You read it and tell us what is wrong until it sounds like you.',
      'You get 50% of every sale. Half, on everything, for as long as it sells.',
      'You approve everything before anything is published in your name.',
      'No exclusivity. Keep your affiliate collection, keep the brand work, keep everything.',
      'No call needed. Reply to the email if you want to take it further, or ask us to write the first section so you can judge it properly before committing to anything.',
    ],
  },
  {
    slug: 'potterandbyrnehome',
    handle: '@potterandbyrnehome',
    titleSuffix: 'The Irish Vintage Handbook',
    notice:
      'Nothing here is for sale. There is no checkout and no payment link. This is a mock-up of one idea for a guide in your names, built so you can react to something real. If it is not for you, nothing happens.',
    introHeading: 'Aoife and Niall, in one paragraph',
    intro:
      'You two are the clearest case we have looked at, and the reason is your own highlights. You already run Vintage Guides and The Circular Guide as free story content, which means you worked out years ago that your audience wants to be taught how to buy, not just shown what you bought. The press coverage says the same thing from the outside. The guides are the right instinct sitting in the wrong format: stories expire, and a handbook does not.',
    mockHeading: 'What it could look like',
    product: {
      name: 'The Irish Vintage Handbook',
      subtitle: 'A 48-page guide to buying old things well.',
      description:
        'Where to go, what to look for, what it is worth and when to walk away. Written for the person who loves the look but has no idea whether the dresser in front of them is a bargain, a wreck or a reproduction.',
      yoursLine: YOURS,
      price: '€27',
    },
    chaptersHeading: 'What is inside',
    chapters: [
      'What to buy, and what to leave on the floor',
      'Reading a piece: joints, veneer, old repairs, woodworm',
      'Where to buy in Ireland: markets, auctions, fairs, online',
      'How an auction actually works: reserves, commission, collection',
      'What things are worth, in ranges, by category',
      'Restore it or leave it alone',
      'Mixing vintage into a house built in 2015',
      'The circular house: repair, rehome, resell',
    ],
    notes: [
      'Sections three and four are the ones only you two can write, because they need somebody who has stood in those rooms. Section eight is your Circular Guide, properly built out, and it is the part that makes this a handbook rather than a shopping list.',
      'A note on length: eight chapters is a real book, and we would want your eyes on the valuation ranges in section five before anything goes out. That is your expertise, not ours.',
    ],
    proposalHeading: 'Aoife and Niall, here is the actual proposal',
    proposal: [
      'We build it. My team handles the research, the writing, the design, the payments and the delivery. You review it and correct it until it reads like you.',
      'You get 50% of every sale. Half of everything, for as long as it sells.',
      'You approve everything before a page goes out with your names on it. On this one that matters more than usual, because the valuations carry your reputation.',
      'No exclusivity. Keep the press work, keep the fairs, keep everything.',
      'No call needed. Reply to the email, or ask us to write section two first so you can see whether we can handle the technical detail before you commit to anything.',
    ],
  },
  {
    slug: 'christaisatthegym',
    handle: '@christaisatthegym',
    titleSuffix: 'Your First Hyrox',
    notice:
      'Nothing on this page is for sale. No checkout, no payment link. It is a mock-up of one idea for a guide in your name, so you can react to something real instead of a description. If you are not interested, nothing happens.',
    introHeading: 'Christa, in one paragraph',
    intro:
      'Your coaching runs through an application form, which tells us you are deliberately filtering for people who are ready to commit. That is the right call and we are not proposing you change it. But an application form turns away everyone who is curious and not yet ready, and from your Boston and World Champs content there are a lot of those people watching you. They are not going to apply for coaching. They would buy a plan.',
    mockHeading: 'What it could look like',
    product: {
      name: 'Your First Hyrox',
      subtitle: 'A 44-page, 12-week plan for people who already train.',
      description:
        'Written for the person who lifts three or four times a week, has signed up or is thinking about it, and has no idea how to prepare for eight stations with a kilometre of running between each one. Not a beginner fitness book. A specific plan for a specific race.',
      yoursLine: YOURS,
      price: '$29',
    },
    chaptersHeading: 'What is inside',
    chapters: [
      'What the race actually asks of you',
      'Where to start if you already lift',
      'The twelve-week plan, week by week',
      'The eight stations, one at a time',
      'Running under fatigue, which is the part that breaks people',
      'Race week and race day',
      'Eating around the plan',
      'What to do after your first one',
    ],
    notes: [
      'Section five is the chapter that would sell this, and it is the thing you have lived rather than read. Section eight is where the guide hands people back to you: it is the natural place for someone who finished their first race to decide they want actual coaching.',
      'That is the point worth noticing. This does not compete with your 1:1. It catches the people who were never going to apply and sends the serious ones to your form.',
    ],
    proposalHeading: 'Christa, here is the actual proposal',
    proposal: [
      'We build it. My team handles research, writing, design, payments and delivery. You review it and correct it until the training actually matches what you would tell someone.',
      'You get 50% of every sale. Half, on everything, for as long as it sells.',
      'You approve everything, and on a training plan that is not a formality. Nothing goes out until you are happy that the programming is sound.',
      'No exclusivity. Keep the coaching, keep the ambassador work, keep your storefront.',
      'No call needed. Reply to the email, or tell us to write section three and you can judge the programming before agreeing to anything.',
    ],
  },
  {
    slug: 'our-broadisland-home',
    handle: '@our_broadisland_home',
    titleSuffix: 'The Neutral Home Handbook',
    notice:
      'Nothing here is for sale. No checkout, no payment link, no sign-up. This is a mock-up of one idea for a guide in your name, built so you can look at something real rather than read a pitch. If it is not for you, nothing happens.',
    introHeading: 'In one paragraph',
    intro:
      'Your highlights are a run of real brand partnerships, and three of them are window dressing and wall finishes. That is worth pointing out, because blinds and wallpaper are the two things people get wrong first and regret longest, and you have been paid repeatedly to talk about exactly that. The neutral palette your whole grid runs on is the other half of it. Between those two things there is a guide that nobody in your niche has written properly.',
    mockHeading: 'What it could look like',
    product: {
      name: 'The Neutral Home Handbook',
      subtitle: 'A 42-page guide to getting the basics right before you decorate.',
      description:
        'Most neutral rooms go flat, and the reason is almost always one of three things: the windows, the wall finish, or a palette built from paint chips rather than materials. This is the order to do it in, with the measuring and ordering mistakes written down before anyone makes them.',
      yoursLine: YOURS,
      price: '£24',
    },
    chaptersHeading: 'What is inside',
    chapters: [
      'Why neutral rooms go flat, and the three fixes',
      'Windows: blinds, curtains, and the measuring mistakes that cost money',
      'Walls: paint, panelling, paper, and when each one is right',
      'Building a neutral palette with depth in it',
      'The DIY jobs genuinely worth doing yourself',
      'The haul, edited: what to keep and what goes back',
      'Room by room: hall, living room, bedroom',
      'Costs and suppliers, in ranges',
    ],
    notes: [
      'Section two is the chapter your partnerships have been rehearsing. Section six is the honest one, and it is the sort of thing that makes people trust a guide: you have bought a lot of homeware on camera, and telling people which of it was worth keeping is more useful than another haul.',
    ],
    proposalHeading: 'Here is the actual proposal',
    proposal: [
      'We build it. My team handles the research, writing, design, payments and delivery. You review it and tell us what is wrong until it sounds like you.',
      'You get 50% of every sale. Half, on everything, for as long as it sells.',
      'You approve everything before anything is published in your name.',
      'No exclusivity. Every brand partnership you have stays exactly as it is. This sits alongside them, and it does not compete with any of them.',
      'No call needed. Reply to the email if you want to go further, or ask us to write the first section so you can judge it properly.',
    ],
  },
  {
    slug: 'wholesome-cravings',
    handle: '@wholesome.cravings',
    titleSuffix: 'The Gut-Friendly Kitchen',
    notice:
      'Nothing on this page is for sale. No checkout, no payment link. This is a mock-up of one idea for a guide in your name, built so you can react to something real instead of another email. If it is not for you, nothing happens.',
    introHeading: 'Diana, in one paragraph',
    intro:
      'Five reels over 100,000 views is not one lucky video, it is a subject people genuinely want. And your own site already has the shape of this: recipes up, and sections sitting there marked coming soon. We read that as the honest problem rather than a criticism. Building the finished thing is weeks of work that pays nothing while you do it, which is exactly why it stays marked coming soon. That is the part we would take off you.',
    mockHeading: 'What it could look like',
    product: {
      name: 'The Gut-Friendly Kitchen',
      subtitle: 'A 44-page guide: four weeks of meals that do not feel like a diet.',
      description:
        "Recipes, weekly plans and shopping lists, built around the way you already cook. No elimination protocol, no supplement list, no promises about anybody's symptoms. Just four weeks of food that happens to be gentle, organised well enough that someone can actually follow it.",
      yoursLine: YOURS,
      price: '£24',
    },
    chaptersHeading: 'What is inside',
    chapters: [
      'What gut-friendly means here, and what this guide is not',
      'The store cupboard, bought once',
      'Week one: breakfasts',
      'Week two: lunches that travel',
      'Week three: dinners in thirty minutes',
      'Week four: batch, freeze and reheat',
      'Shopping lists, by week',
      'Swaps for dairy, gluten and the usual triggers',
    ],
    notes: [
      'Section one matters as much as the recipes. It is where the guide says plainly that this is food, not medical advice, which protects you and is the right thing to put in writing anyway.',
    ],
    proposalHeading: 'Diana, here is the actual proposal',
    proposal: [
      'We build it. My team handles the research, the writing, the design, the payments and the delivery. You review it and correct it until the recipes are genuinely yours.',
      'You get 50% of every sale. Half of everything, for as long as it sells.',
      'You approve everything, and on recipes that is not a formality. Nothing goes out until you have cooked from it and it works.',
      'No exclusivity. Keep the UGC work, keep the rate card, keep your site exactly as it is. If anything, this fills in the part of it that says coming soon.',
      'No call needed. Reply to the email, or ask us to write week one so you can taste-test the idea before agreeing to anything.',
    ],
  },
  {
    slug: 'neal-cleans',
    handle: '@neal_cleans',
    titleSuffix: 'The Home Reset',
    notice:
      'Nothing here is for sale. No checkout, no payment link. This is a mock-up of one idea for a guide in your name, built so you can react to something real rather than another email. If it is not for you, nothing happens.',
    introHeading: 'Neal, in one paragraph',
    intro:
      'Every link on your Linktree goes to Amazon. That is a perfectly good way to earn, but it means the thing you are actually good at is the thing you give away free. People do not follow you to find out which spray to buy, they follow you because your resets have an order to them. The order is the product. A bottle of cleaner is available to everyone and your routine is not.',
    mockHeading: 'What it could look like',
    product: {
      name: 'The Home Reset',
      subtitle: 'A 40-page guide to cleaning routines that actually hold.',
      description:
        'Most cleaning plans die in week three, and not because people are lazy. They die because the plan was built for a perfect week. This is the version built for a normal one, with a daily that takes ten minutes and a weekly you can do badly and still stay on top of the house.',
      yoursLine: YOURS,
      price: '£24',
    },
    chaptersHeading: 'What is inside',
    chapters: [
      'Why cleaning routines collapse in week three',
      'The daily ten minutes, in order',
      'The weekly reset, room by room',
      'The monthly jobs everyone forgets',
      'Two big seasonal resets a year',
      'The actual product shortlist, and what not to bother buying',
      'Cleaning a house you share with other people',
      'Printable checklists, daily to seasonal',
    ],
    notes: [
      'Section six is where your affiliate links belong, inside a product you own, which earns you twice on the same recommendation. Section seven is the one nobody writes and everybody needs.',
    ],
    proposalHeading: 'Neal, here is the actual proposal',
    proposal: [
      'We build it. My team handles research, writing, design, payments and delivery. You review it and correct it until the routines are the ones you would actually give someone.',
      'You get 50% of every sale. Half, on everything, for as long as it sells.',
      'You approve everything before anything goes out in your name.',
      'No exclusivity. Keep the storefront and every affiliate link in it. This does not replace that, it sits on top of it.',
      'No call needed. Reply to the email, or tell us to write section three first and judge it from that.',
    ],
  },
  {
    slug: 'rachels-allotment',
    handle: '@rachels.allotment',
    titleSuffix: 'The First-Year Kitchen Garden',
    notice:
      'Nothing on this page is for sale. No checkout, no payment link. This is a mock-up of one idea for a guide in your name, built so you can react to something real instead of another email. If it is not for you, nothing happens.',
    introHeading: 'Rachel, in one paragraph',
    intro:
      "You have a credential almost nobody in gardening content has: you are a plant scientist, and you are growing on a bare new-build plot rather than an established allotment. Those two things together are the guide. Most gardening advice online is somebody repeating what worked in their soil, and most people reading it are standing on builder's rubble with no idea why nothing grows. You can explain the why, and you are living the exact starting conditions your readers are.",
    mockHeading: 'What it could look like',
    product: {
      name: 'The First-Year Kitchen Garden',
      subtitle: 'A 46-page sowing plan for a plot that is currently nothing.',
      description:
        'Written for year one on bare ground, by someone who can explain what the soil is actually doing. Month-by-month sowing, honest advice about what to skip, and diagnosis that goes further than spray it and hope.',
      yoursLine: YOURS,
      price: '£24',
    },
    chaptersHeading: 'What is inside',
    chapters: [
      'Starting from a bare new-build plot',
      'Soil first: what to test, what to add, what to ignore',
      'What to grow in year one, and what to leave until year two',
      'The sowing calendar, month by month',
      'Beds, containers, and the no-dig question answered properly',
      'Watering, feeding and composting',
      'Pests and problems, diagnosed rather than guessed',
      'Harvest, and what to do with a glut',
    ],
    notes: [
      'Section seven is the chapter that justifies the price, because it is the one where your background shows and nobody else in the niche can write it the same way. Section three is the kindest chapter: telling people what not to attempt in year one is why they will finish the guide still gardening.',
    ],
    proposalHeading: 'Rachel, here is the actual proposal',
    proposal: [
      'We build it. My team handles the research, the writing, the design, the payments and the delivery. You review it and correct it, and on the science you overrule us without argument.',
      'You get 50% of every sale. Half of everything, for as long as it sells.',
      'You approve everything before anything goes out in your name. Your name carries a scientific claim, which means the accuracy is not negotiable.',
      'No exclusivity. Keep the tip jar, keep the storefront, keep every code.',
      'No call needed. Reply to the email, or ask us to write section two so you can check whether we can handle the technical material before committing.',
    ],
  },
  {
    slug: 'mvp-quis',
    handle: '@mvp.quis',
    titleSuffix: 'High Protein, Low Effort',
    notice:
      'Nothing here is for sale. No checkout, no payment link. This is a mock-up of one idea for a guide in your name, built so you can react to something real rather than another email. If it is not for you, nothing happens.',
    introHeading: 'Marquis, in one paragraph',
    intro:
      'You sell training and meal plans through your DMs. That works, and it also means your income is capped by your own hours, and every plan you write is written once for one person. Your typical reel clears 100,000 views. The number of people seeing your food content every week is far larger than the number you could ever write plans for, and most of them will never DM you. A guide reaches those people while you sleep.',
    mockHeading: 'What it could look like',
    product: {
      name: 'High Protein, Low Effort',
      subtitle: 'A 42-page plan for people not ready to hire a coach.',
      description:
        'Twenty meals, a shopping list, and training that matches the food. Written for someone who wants to eat properly and has no interest in weighing a chicken breast on a kitchen scale for the rest of their life.',
      yoursLine: YOURS,
      price: '$29',
    },
    chaptersHeading: 'What is inside',
    chapters: [
      'The protein number, settled in two pages',
      'Twenty meals, five ingredients or fewer',
      'The shopping list',
      'Two hours of prep, a week of food',
      'Eating high protein without spending a fortune',
      'Training that matches the food',
      'The macro tracker',
      'Eating out, travelling, and the days it all goes wrong',
    ],
    notes: [
      'Section eight is the one that keeps people. Every plan works until a wedding or a work trip, and most guides say nothing about it.',
      'The part worth noticing: this does not take anything from your 1:1. It serves the people who were never going to pay for bespoke, and the ones who finish it and want more have an obvious next step, which is you.',
    ],
    proposalHeading: 'Marquis, here is the actual proposal',
    proposal: [
      'We build it. My team handles research, writing, design, payments and delivery. You review it and correct it until the training and the macros are what you would actually prescribe.',
      'You get 50% of every sale. Half, on everything, for as long as it sells.',
      'You approve everything, and on programming and macros that is a real review, not a rubber stamp.',
      'No exclusivity. Keep the 1:1, keep the bespoke plans, keep every partnership.',
      // Not in the source draft for this page; added so the "no call required"
      // term appears on every page, as the build file says it should.
      'No call needed. Reply to the email if you want to go further.',
    ],
  },
  {
    slug: 'small-nordic-tales',
    handle: '@small_nordic_tales',
    titleSuffix: 'finishing the guide you have a waitlist for',
    notice:
      'Nothing on this page is for sale and there is no checkout. More importantly: the idea on this page is not ours. It is yours, you announced it, and it stays yours whatever you decide here. This is a mock-up of what the finished version could look like, built so that you have something real to react to.',
    introHeading: 'Vasia, in one paragraph',
    intro:
      'You have a waitlist open for a home guide that is not finished yet. That is the whole reason we are writing, and we want to be straightforward about it. Your free hosting guide went out and did its job. The paid one has a page, a promise and people waiting on it, and it is still in progress. We have seen that exact position many times and it is almost never a motivation problem. It is that writing and designing a guide properly is weeks of unpaid work sitting behind the rest of your job, and the waitlist gets quieter the longer it takes. That gap is the only thing we are offering to close.',
    mockHeading: 'What the finished version could look like',
    product: {
      name: 'Your home guide, built',
      subtitle: 'Around 46 pages, written to your outline, designed and delivered.',
      description:
        'We are not renaming your guide or changing what you told your waitlist it would be. The structure below is a suggestion for what the inside could look like, based on the rooms and the ideas already on your grid. If your own outline is different, and it probably is, we build yours instead.',
      price: '€27',
    },
    chaptersHeading: 'A possible structure',
    chapters: [
      'Starting with what the room already has',
      'The audit: what stays, what moves, what goes',
      'Light through a Nordic winter',
      'One room at a time: the living room',
      'One room at a time: the bedroom',
      'Hosting, built into the house rather than staged for it',
      'Seasonal changes that cost nothing',
      'The finished rooms, before and after',
    ],
    notes: [
      'Section six is the deliberate one. It connects this to the free guide your audience already has, which means the people most likely to buy are the ones who downloaded that one and liked it. That is the warmest list you have.',
    ],
    proposalHeading: 'Vasia, here is the actual proposal',
    proposal: [
      'We build it to your outline. My team handles the writing, the design, the payment processing and the delivery to every buyer. You direct it, you correct it, and you decide when it is good enough to go to the people waiting.',
      'You get 50% of every sale. Half, on everything, for as long as it sells.',
      'You approve everything. On this one that is more than a formality, because the guide already has your name attached to it publicly.',
      'The concept stays yours. To be explicit, because it would be reasonable for you to wonder: if you say no to this, we do not build this guide with anyone else. It is your idea and your announcement. We would be hired hands on it, not partners in the idea.',
      'No exclusivity, and nothing to cancel. Your store, your free guide and your waitlist all stay exactly as they are.',
      'No call needed. Reply to the email if you want to talk, or send us the outline you have already written and we will build section one from it so you can see the quality before committing to anything.',
    ],
  },
];
