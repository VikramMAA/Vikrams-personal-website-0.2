---
title: "What payment methods do Estonian shoppers actually use?"
seoTitle: "Estonian E-commerce Payment Methods (2026)"
description: "Bank links are roughly 80% of online payments here, and a card only checkout asks four in five buyers to do something they never do."
publishedAt: 2026-09-06
published: true
tags: ["Ecommerce", "Conversion", "Estonia"]
---

Watch what an Estonian buyer expects to happen when they click pay.

A list of bank logos. Swedbank, SEB, LHV, Coop, LHV again because half the country moved there. They pick theirs, land in their own banking app, confirm with Smart-ID or Mobile-ID, and they are back on your thank you page. No card number, no CVV, nothing copied off a piece of plastic.

Now put a card form in front of that person instead.

Bank links are somewhere around 80% of online payments in Estonia. Cards make up the remaining fifth, and most of that fifth is Apple Pay or Google Pay rather than anybody typing sixteen digits. So a card only checkout is not slightly inconvenient. It asks roughly four buyers in five to do the unfamiliar thing at the precise moment they had decided to buy.

That is the single highest value fix available to most Estonian shops, and it is a fortnight of work rather than a redesign.

## Why the obvious setup does not cover it

Plenty of Estonian shops run Stripe and nothing else, usually because it was the fastest thing to install and the documentation is excellent.

Stripe is genuinely good at what it does. Cards, subscriptions, international expansion, developer experience. None of that is in dispute and I would not move a subscription business off it lightly.

It is simply not where Estonian bank links live. That is a market coverage question rather than a quality one, and the mistake is not choosing Stripe, it is assuming that a payment processor which handles cards well handles this market well.

The two providers built for it are Montonio and Maksekeskus. Both aggregate the Estonian bank links behind one integration, both cover Latvia and Lithuania, and both bundle delivery alongside payment, which matters more than it sounds and I will come to it.

The common arrangement I see working is a local aggregator carrying the bank links plus a card processor alongside it. You are not replacing anything, you are adding the 80%.

Two things worth checking before you pick. Whether it plugs into your platform properly, because a half maintained WooCommerce or Shopify module will cost you more in support time than you save in fees. And what the actual per transaction cost is at your volume, since the published rates and the negotiated rates diverge quickly once you are doing real numbers.

## The half everybody forgets, which is delivery

Payment is the visible problem. Delivery selection is where the same shops lose a second slice of buyers, and it is more specific to this market than the payment question is.

Venipak's survey this year found that 85% of Estonian online shoppers use parcel lockers. Not "would consider". Use.

Locker delivery here is not an option you offer. It is the default the buyer assumed before they opened your site, and courier to the door is the alternative for the awkward parcels.

The detail that decides conversion is which locker. The same survey found the most important factor in choosing one is convenient location, with 37% wanting it on the way to or near home, work or school. That is a specific machine outside a specific Selver, not a carrier name.

So a checkout offering "Omniva parcel machine" as a shipping method, with the address chosen later by email, is failing at exactly the point where the buyer wanted to make a decision. The locker picker has to be in the checkout, with a searchable list, and it should remember their choice next time.

Offer all three networks if you can. Omniva, SmartPost and DPD. People are loyal to the machine outside their shop, not to the logo on it, and forcing somebody to use a network whose nearest locker is three kilometres away is a small friction you did not need to add.

One change worth knowing about if you sell outside the cities. Omniva began installing lockers in villages and smaller settlements in March, with around 150 in the spring and roughly 400 planned by the end of the year. Rural addresses that were courier only when you set your shipping rules are quietly becoming locker addresses. If your delivery matrix has not been looked at since 2024, it is now wrong in a way that costs you margin.

## Order of operations for an existing shop

If you are fixing a live shop rather than building one, do it in this order. It is roughly a fortnight and each step is independently useful.

**One. Add bank links.** Everything else on this list is smaller. Pick an aggregator, install the module, test a real payment from a real account with each major bank, not just the sandbox.

**Two. Put the locker picker in the checkout.** Searchable, all three networks if your logistics allow, remembered for returning customers.

**Three. Add Apple Pay and Google Pay.** That is where most of the card fifth actually sits, and both remove the typing.

**Four. Check your prices display including VAT.** Consumer prices here are quoted with the 24% included, and a total that grows at the final step is a well documented abandonment cause everywhere. This is a settings box, not a project.

**Five. Then look at everything else.** Guest checkout, field count, the shipping threshold. Real, but worth less than the four above combined.

## The checkout audit, on a phone, twenty minutes

Go and buy something from your own shop, on mobile data rather than office wifi, and note where you hesitate.

- Are bank links there, and is the list of banks visible before I commit to anything?
- Can I pick my exact parcel locker inside the checkout?
- Are Apple Pay and Google Pay offered?
- Does the total change at any point after the product page?
- How many fields do I fill in that you do not genuinely need?
- Does it work one handed on a phone, which is how most of this is bought?
- If I come back next week, does it remember my locker?

Every no on that list is a percentage of buyers, and unlike advertising it is a fix you pay for once.

## Worth saying plainly

Local payment coverage is not a nice to have in a small market. It is the difference between a shop that works and one where the traffic looks fine and the conversion rate quietly does not.

Estonia is 1.3 million people, so most shops here eventually need to sell outward, and the same principle repeats in every direction you go. I wrote separately about [what changes when you sell into Finland and Sweden](/blog/how-to-sell-to-nordic-customers-from-estonia/), and payment habits are on that list too.

But fix home first. If your checkout only takes cards, nothing you do upstream, including [the paid search arithmetic](/blog/is-google-ads-worth-it-estonia/), is worth doing until it does not.

My [notes on performance marketing](/expertise/performance-marketing/) cover where the rest of it fits. If you'd like a second read on your own checkout, [drop me a line](/contact/) on email, WhatsApp or LinkedIn and we can have a quick chat. I'm contracted full time so this isn't a pitch.
