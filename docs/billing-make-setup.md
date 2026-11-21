# Grow billing through Make — setup guide

The site is built and tested (branch `grow-make`). What's left happens in Make, Grow and Vercel.
Do everything in **Grow Sandbox** first; switch to production only after a full test.

## How it works

```
Parent / teacher clicks "Pay" on /pricing
  → our site ──(scenario 1)──► Make ──► Grow "Create Payment Link" (recurring) ──► link back to the site
  → the payer pays on Grow's page (first month half price, then monthly)
Grow ──► Make (scenario 2: Notify URL Webhook → Approve Transaction) ──► our site: subscription active
Grow (month 2 onward, failed charges) ──► our site directly (/api/billing/grow/webhook)
Cancel / change of children / charge after cancel ──► task in /admin + email to you (scenario 3)
```

Cancelling a standing order and changing its amount can only be done **on the Grow website**.
The site never loses track: access always ends by itself when payments stop.

---

## Step 1 — a shared secret

Make and the site prove themselves to each other with one long random string. Create it on your PC:

```
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Keep it in a password manager. You'll paste it into Make (3 places) and into Vercel (`MAKE_SHARED_SECRET`).
Don't send it in chat.

## Step 2 — connect Grow in Make

In any scenario, add a **Grow** module → **Create a connection** → **Grow Sandbox** →
business ID (ח.פ / ת.ז of the business — not the bank account) + the mobile number you log in to Grow with → OTP code.
Later you'll add a second connection with **Grow** (production).

## Step 3 — Scenario 2 "Small Talk — payment received" (build this first: scenario 1 needs its address)

1. **Grow → Notify URL Webhook** (trigger). Copy the webhook address it gives you.
2. **Grow → Approve Transaction**. Map the fields it asks for from module 1.
3. **JSON → Transform to JSON**. Object: module 1's whole output (`data` if you see one).
4. **HTTP → Make a request**:
   - URL `https://small-talk.online/api/billing/make/notify`, method **POST**
   - Header `Authorization` = `Bearer <your secret>`
   - Body type **Raw**, content type **JSON (application/json)**, request content = the JSON string from module 3
5. Turn the scenario **on** (scheduling: immediately).

## Step 4 — Scenario 1 "Small Talk — create payment link"

1. **Webhooks → Custom webhook** → Add → name it "Small Talk checkout".
   In the webhook's settings add an **API key** = your secret (Make then requires the `x-make-apikey` header, which the site sends).
   **Data structure** → Add → **Generate** from this sample:
   ```json
   {
     "ref": "STcm3x9k2a10000abcd1234efgh",
     "plan": "parent",
     "title": "Small Talk — מנוי חודשי",
     "productName": "Small Talk — מנוי הורים (2 ילדים)",
     "monthlyAmount": 100,
     "firstAmount": 50,
     "fullName": "Dana Levi",
     "phone": "0501234567",
     "email": "dana@example.com",
     "successUrl": "https://small-talk.online/pricing?success=1"
   }
   ```
   Copy the webhook address.
2. **Grow → Create Payment Link**:
   | Field | Value |
   |---|---|
   | Sending Mode | `none` |
   | Full Name / Phone / Email | `fullName` / `phone` / `email` |
   | Charge Type | regular charge |
   | Success URL | `successUrl` |
   | **Notify URL** | the scenario 2 webhook address (step 3.1) |
   | Title | `title` |
   | **Payment Type** | **recurring payment page** |
   | Products | one item: Catalog Number = `ref`, Product Name = `productName`, Price = `monthlyAmount`, Quantity = 1, VAT = regular |
   | **Custom Field 1** | `ref` |
   | First payment amount (if the module offers it) | `firstAmount` |

   ⚠️ `ref` must be in the catalog number **and** custom field 1. That's how the payment finds its way back to the right account.
3. **Webhooks → Webhook response**: status `200`, header `Content-Type: application/json`,
   body `{"url": "<the payment URL from module 2>"}`.
4. Turn the scenario **on**.

## Step 5 — Scenario 3 "Small Talk — tasks for me"

1. **Webhooks → Custom webhook** "Small Talk tasks", same API key. Data structure sample:
   `{"kind":"cancel","title":"לבטל הוראת קבע ב-Grow","details":"Dana · טלפון 0501234567 …","adminUrl":"https://small-talk.online/admin#billing"}`
2. **Email** (or Gmail) → **Send an email** to yourself: subject `Small Talk: {{title}}`, body `{{details}}` + `{{adminUrl}}`.
3. Turn it **on**. Copy the webhook address.

## Step 6 — ask Grow support (apisupport@grow.business)

1. **Enable webhooks** for: *recurring payments from the second charge* and *failed recurring payments*,
   to `https://small-talk.online/api/billing/grow/webhook`. Ask for the **webhook key** → that's `GROW_WEBHOOK_KEY`.
2. **First month at half price on a recurring payment page created through Make**: how do we set a different
   first-payment amount? *(If it can't be done, tell me. The site promises "first month half price", so the text must change before launch.)*
3. In the payment-link notification: is `statusCode` `2` = paid? Are the custom fields included? Is the standing-order id
   (`directDebitId`) included? *(The site copes either way, but the answers make matching more reliable.)*
4. Automatic tax invoice/receipt for every monthly charge.

## Step 7 — Vercel environment variables

| Name | Value |
|---|---|
| `MAKE_CHECKOUT_WEBHOOK_URL` | scenario 1 webhook address |
| `MAKE_TASKS_WEBHOOK_URL` | scenario 3 webhook address |
| `MAKE_SHARED_SECRET` | your secret (step 1) |
| `GROW_WEBHOOK_KEY` | from Grow support |

`PAYWALL_ENABLED` stays off until you decide to start charging. The pay button only appears once
`MAKE_CHECKOUT_WEBHOOK_URL` + `MAKE_SHARED_SECRET` are set.

## Step 8 — test in the sandbox, then go live

**Never test on the production database.** For the sandbox test:
1. Create a Neon branch (e.g. `billing-test`), point Vercel's **Preview** `DATABASE_URL`/`DATABASE_URL_UNPOOLED` at it,
   apply the migration there, and open the Vercel preview of branch `grow-make`.
   (Scenario 2's HTTP URL then points at the preview address during the test.)
2. Pay with Grow's test card `4580458045804580` (not Bit / Apple Pay / Google Pay: those charge for real even in sandbox).
3. Check: subscription active on /pricing, the teacher gets a class code, a child joins with it and gets the discount,
   cancel → you get the email + the task in /admin.

Going live (I do this with you):
1. Apply the migration to the production database. It stops by itself if the old Subscription table isn't empty.
2. Merge `grow-make` → `master`.
3. In Make, switch both Grow modules to the **Grow** (production) connection, and scenario 2's URL back to small-talk.online.
4. Update `/legal/refunds` and `/legal/terms` to the real flow (lawyer review).
5. When you're ready to charge: `PAYWALL_ENABLED=true`.

## Prices

All in `src/lib/billing/plans.ts`: parent ₪50/child/month · teacher **₪99/month (placeholder)** ·
class-code discount **20% (placeholder)** · first month 50% off.
