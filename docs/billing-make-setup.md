# Grow billing through Make — how it's set up

Branch `grow-make`. The Make side is built through Make's API (team 545065, region eu1), so this page
mostly documents what exists and what's left for the owner.

## How it works

```
Parent / teacher clicks "Pay" on /pricing
  → site ──► Make scenario A ("Small Talk to Grow", action=checkout)
               → Grow "Create Payment Link" (recurring, 36 monthly charges, card only) → { url } back to the site
  → the payer pays the FIRST month (half price) on Grow's page
Grow ──► Make scenario B ("Grow to Small Talk"): Notify URL Webhook → POST /api/billing/make/notify → Approve Transaction
  → site activates the subscription, then asks scenario A (action=update_direct_debit) to raise the
    standing order to the full monthly price (Grow updateDirectDebit, sum)
Month 2 onward / failed charges ──► Grow webhooks (enabled by Grow support) → /api/billing/grow/webhook
Cancel / undo / children change / account deleted ──► scenario A update_direct_debit (changeStatus / sum)
Anything Grow doesn't confirm ──► a task in /admin + email to the owner (scenario A action=task, if an email connection exists)
```

Access always follows the paid period (`currentPeriodEnd`, +5 days grace unless cancelled), so even a missed manual
step can't give free access forever.

## Security

- `MAKE_SHARED_SECRET` (in `.env`, never in git): the site sends it in every request body (`secret`); every route of
  scenario A has a filter requiring it. Scenario B sends it back to the site as `Authorization: Bearer …`.
  Optional extra: in the Make editor, open the webhook "Small Talk to Grow" → API key → "Small Talk site key"
  (same value, already created).
- Grow's own webhooks are checked against `GROW_WEBHOOK_KEY`.
- Scenarios are marked confidential (their execution data is hidden in Make's logs).

## Owner to-do

1. **Make → Connections:** create **Grow Sandbox** (business ID + Grow login mobile + SMS code).
   Optional: an email connection (e.g. Gmail) for task emails. Without it, tasks still appear in /admin.
2. **Grow support (apisupport@grow.business):**
   - Enable webhooks: *recurring payments from the second charge* + *failed recurring payments* →
     `https://small-talk.online/api/billing/grow/webhook`. Ask for the webhook key (`GROW_WEBHOOK_KEY`).
   - Confirm `updateDirectDebit` (change `sum`, `changeStatus` 1/2) is enabled for the account and works through the
     Make connection.
   - Automatic tax invoice/receipt for every charge.
3. **Vercel env** (at go-live): `MAKE_WEBHOOK_URL`, `MAKE_SHARED_SECRET`, `GROW_WEBHOOK_KEY`.
   The pay button only appears once `MAKE_WEBHOOK_URL` + `MAKE_SHARED_SECRET` are set. `PAYWALL_ENABLED` stays off
   until the owner decides to charge.

## Testing (no production involved)

- `scratchpad/pgtest`: local embedded Postgres + fake Make + 41-step end-to-end test of every flow and fallback.
- Sandbox run: the site runs locally against the local database behind a temporary public tunnel; scenario B posts to
  the tunnel; pay with Grow's test card `4580458045804580` (never Bit / Apple Pay / Google Pay: those charge for real).

## Going live (together with the owner)

1. Apply the migration to the production database (it stops by itself unless the old Subscription table is empty).
2. Merge `grow-make` → `master`.
3. In Make: switch the Grow modules to the production **Grow** connection; scenario B's URL → small-talk.online.
4. Update `/legal/refunds` + `/legal/terms` to the real flow (lawyer review).
5. When ready to charge: `PAYWALL_ENABLED=true`.

## Prices

`src/lib/billing/plans.ts`: family tiers 1 child ₪39 · up to 3 children ₪49 · unlimited ₪69 (safety cap 20 profiles) · teacher plan + class codes OFF (`NEXT_PUBLIC_TEACHERS_ENABLED`) ·
class-code discount **20% off the family price (placeholder)** · full price from the first month (no API → no automatic amount changes).
Note: a Grow recurring link allows at most 36 charges (3 years); after that the parent subscribes again.

## App lock, admins, landing page, family extras (2026-11-22)

- **Lock:** `PAYWALL_ENABLED=true` locks the whole app (src/middleware.ts). Open without access: `/` (landing page
  for visitors, app home for members), `/welcome` (landing always), `/pricing`, `/legal`, `/account`, `/profiles`.
  An access token (30 min, bound to the session) avoids a database check on every page.
- **Admins:** `ADMIN_EMAILS` (Vercel env, comma-separated, never in git — the repo is public). Listed accounts get
  the whole app + every extra for free and become ADMIN on their next sign-in.
- **Family extras** (src/lib/billing/perks.ts): ₪49+ sibling challenge + family goal (/account/family, card on the
  app home) · ₪69 monthly report (/account/report/[child]), certificates (/account/certificates), early access
  (src/lib/earlyAccess.ts), personal support. Families may pick a higher tier than their children need.
- Stars per day: table `StarDay`, filled by the progress sync.
