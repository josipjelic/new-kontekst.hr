<!--
DOCUMENT METADATA
Owner: @documentation-writer
Update trigger: Any user-facing feature is added, changed, or removed
Update scope: Full document
Read by: @qa-engineer (to understand expected user behavior and flows), team members supporting the site
-->

# Kontekst.hr — User Guide

> Last updated: 2026-03-25
> Audience: Developers and team members supporting the marketing site
> Live site copy language: Croatian

---

## What This Site Is

Kontekst.hr is a single-page marketing website for a business automation and AI solutions company. The site targets business owners in Croatia who want to optimize operations with n8n workflows, business process automation, and custom AI applications.

Visitors navigate using the header menu or by scrolling to sections: Hero (headline + value prop), Services (three offerings), How We Work (process steps), About Us (company mission + stats), and Contact (form + email link).

**Developer note**: This is a static marketing site with no user accounts, no dashboard, and no authentication. The only dynamic element is the contact form, which posts to the Express backend API.

---

## Site Sections

### Navigation Header

The header contains:
- Logo (top left) — links to the page top
- Menu links (Usluge, Kako radimo, O nama, Kontakt) — anchor scroll to each section
- CTA button (Razgovarajmo) — links to the Contact section
- Mobile hamburger toggle — shows/hides menu links below the fold

**Note for developers**: On mobile (< 768px), menu links are hidden behind the hamburger. The CTA button always shows.

### Hero Section

Large headline "Automatizacija poslovanja koja zaista radi" with:
- Animated background orbs and dot grid
- Sub-headline explaining the value (n8n workflows, AI apps, team freed from repetitive work)
- Two CTAs: "Besplatni uvodni razgovor" (primary, scrolls to Contact) and "Pogledajte usluge" (secondary, scrolls to Services)
- Three stat cards below: "24/7 Automatizacije rade", "n8n Stručnjaci za Hrvatsku", "AI Rješenja po mjeri"

### Services Section (Usluge)

Three service cards, each with:
- Icon (48x48px)
- Title (e.g., "n8n Automatizacije")
- Description (2–3 sentences)
- "Saznajte više" link

Each card has hover animation: slight lift + teal border glow.

### How We Work Section (Kako radimo)

A 4-step numbered process:
1. Razumijevamo vaš posao
2. Gradimo automatizaciju
3. Testiramo i prilagođavamo
4. Puštamo u produkciju

Each step has a title, description, and connector line to the next step.

### About Us Section (O nama)

Contains:
- Company mission headline
- Differentiators (3 small cards in a 2-column grid on desktop, stack on mobile)
- Company tagline or vision statement

### Contact Section (Kontakt)

The contact form has fields:
- Name (required)
- Email (required)
- Message (required, textarea)

Submit button text: "Pošalji poruku"

Alongside the form or below it: "Ili nam napišite direktno" + mailto link to `info@kontekst.hr`.

### Footer

Links (Usluge, Kako radimo, O nama, Kontakt) + copyright text + email link.

---

## Contacting Kontekst (User Perspective)

1. Scroll to the **Kontakt** section or click "Razgovarajmo" in the header.
2. Fill in your name, email, and message.
3. Click "Pošalji poruku".
4. You will see a confirmation message (Croatian): "Hvala! Vaša poruka je poslana." or a specific error.

**If the form fails:**
- "Previše pokušaja" (too many requests) — wait 5–10 minutes before trying again (rate limiting)
- Other error — refresh the page and try again, or email `info@kontekst.hr` directly

You can also skip the form and email `info@kontekst.hr` directly using your mail client.

---

## Accessibility

The site meets WCAG 2.1 AA standards:
- **Touch targets**: All buttons and links are at least 44×44 pixels
- **Keyboard navigation**: Tab through links and form fields in order; focus outlines are visible (teal border)
- **Reduced motion**: If your system prefers reduced motion, animations (scroll reveal, hover effects, ambient orbs) are disabled
- **Color contrast**: Text meets AA or AAA standards against all background colors
- **Images**: All images have descriptive alt text
- **Form validation**: Error messages explain what to fix

---

## Troubleshooting

| Issue | Why | What to do |
|-------|-----|-----------|
| Contact form shows "Previše pokušaja" | Rate limiting — too many form submissions from your IP in a short time | Wait several minutes, then try again. Or email directly: `info@kontekst.hr` |
| Contact form fails with a server error | Backend API is down or unreachable | Refresh the page and try again. If the problem persists, email `info@kontekst.hr` directly |
| Page layout looks broken (sections misaligned, text huge or tiny) | Likely a browser compatibility issue, ad blocker, or old browser | Try a recent version of Chrome, Firefox, Safari, or Edge. If you use an aggressive ad blocker, try disabling it for this site. |
| Animations are jerky or slow | Your device is under heavy load, or your browser needs an update | Close other browser tabs and applications. Update your browser. These animations are not essential to using the site. |

---

## For Team Members: Local Development

### Run the site locally

**With Node.js (no Docker):**

```bash
# Frontend (terminal 1)
npm install
npm run dev
# → http://localhost:5173

# Backend (terminal 2)
cd backend
npm install
npm run dev
# → http://localhost:3000
```

The frontend Vite dev server proxies `/api` calls to the backend.

**With Docker:**

```bash
docker compose up
# → Frontend: http://localhost:5173
# → Backend: http://localhost:3000
```

**Production simulation:**

```bash
docker compose -f docker-compose.prod.yml up --build
# → http://localhost (nginx serves the frontend, proxies /api to backend)
```

### Testing the contact form

1. Navigate to http://localhost:5173 (or http://localhost in prod simulation)
2. Scroll to Contact or click "Razgovarajmo"
3. Fill in the form and submit
4. Check the terminal running the backend to see the email log (or check your configured email service)

### Deployment

Deployment is handled by GitHub Actions and Digital Ocean App Platform — push to `main` and the CI/CD pipeline takes over (see `TODO.md` / task #022).

---

## Getting Help

- **For business inquiries via the live site**: Use the contact form or email `info@kontekst.hr`
- **For technical issues, feature requests, or bugs**: Open an issue on the GitHub repository or contact your team lead
- **For deployment or infrastructure questions**: See `docs/technical/ARCHITECTURE.md` and `docs/technical/DECISIONS.md`
