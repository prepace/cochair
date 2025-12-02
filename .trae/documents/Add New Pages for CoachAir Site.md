## Goals
- Expand from a single landing page into a clear, multi-page site aligned to CoachAir’s product, industries, and go-to-market.
- Preserve current theme, motion, and CTAs; improve IA, SEO, and conversion paths.

## Recommended Pages
- Product
  - Platform Overview (`/platform`) — unify benefits and features now under Home. CTA: Schedule, Engage.
  - Features (`/features`) — Dispatch AI, Compliance, Escrow, White-label app. CTA: Demo.
  - Pricing (`/pricing`) — tiers or “Talk to sales” with FAQs.
- Solutions
  - Aviation Brokers (`/solutions/brokers`) — value props, workflows, ROI.
  - Operators (`/solutions/operators`) — fleet, scheduling, compliance.
  - FBOs (`/solutions/fbos`) — services, concierge, integrations.
  - Medevac (`/solutions/medevac`) — dispatch, equipment, certification.
  - Defense (`/solutions/defense`) — secure ops, NDA protocols.
- Industries
  - Aviation (`/industries/aviation`) — umbrella page linking to sub-verticals.
  - Yachting (`/industries/yachting`) — charter, ports, concierge.
  - Luxury Vehicles (`/industries/vehicles`) — fleet, routing.
  - Events & Hospitality (`/industries/events`) — hotel, events, concierge.
- Resources
  - Blog (`/blog`, `/blog/[slug]`) — announce progress, thought leadership.
  - Case Studies (`/case-studies`, `/case-studies/[slug]`) — outcomes, metrics.
  - Docs (`/docs`, `/docs/[...slug]`) — partner/operator onboarding, API later.
  - FAQ (`/faq`) — compliance, escrow, onboarding.
- Company
  - Team (`/team`) — move current section into a page.
  - Investors (`/investors`) — move current section; SAFE info and deck links.
  - Partners (`/partners`) — white-label, program, apply form.
  - Careers (`/careers`, `/careers/[jobId]`) — roles, application.
  - Newsroom (`/newsroom`) — press releases, media kit.
- Trust & Legal
  - Security (`/security`) — compliance posture, data protections.
  - Privacy (`/legal/privacy`) — policy.
  - Terms (`/legal/terms`) — TOS.
  - Cookies (`/legal/cookies`) — banner + policy.
- Contact & Support
  - Contact (`/contact`) — HubSpot/Calendly integration.
  - Support (`/support`) — resources, ticket form.

## Route Structure (Next.js App Router)
- Create directories under `app/` to match pages above.
- Use route groups to organize: `app/(marketing)/…`, `app/(resources)/…`, `app/(legal)/…`.
- Dynamic routes: `app/blog/[slug]`, `app/case-studies/[slug]`, `app/docs/[...slug]`, `app/careers/[jobId]`.

## Navigation & Footer Updates
- Replace hash links with real routes in `app/page.js`:
  - Desktop nav: `Platform` (`app/page.js:168`), `Capabilities` (`175`) → `Features`, `Team` (`181`) → `/team`, `Investors` (`187`) → `/investors`.
- Add primary nav: Platform, Solutions, Industries, Pricing, Resources, Company, Contact.
- Expand footer groups to mirror new sections while keeping current contact block (`app/page.js:1193–1209`).

## Content & Design
- Reuse existing theme classes and motion patterns.
- Each page: clear H1, 2–4 benefit blocks, CTA (Schedule, Engage, Demo), relevant iconography (existing assets in `public/assets`).
- Add SEO metadata and OG tags per page.

## Phase Plan
- Phase 1: Skeleton pages
  - Create all routes with hero, brief copy, and CTAs.
  - Update nav/footer to link to new routes.
- Phase 2: Content depth
  - Fill Features, Solutions, Industries with structured sections, metrics, and forms.
  - Move Team and Investors sections into dedicated pages; keep anchor IDs on Home for backward compatibility.
- Phase 3: Resources & trust
  - Stand up Blog, Case Studies, Docs; add simple MD-based content loader.
  - Add Security and Legal pages with baseline content.

## Acceptance Criteria
- All routes build and render with consistent styling.
- Navigation works on desktop/mobile; CTAs link to Calendly/HubSpot.
- Lighthouse baseline SEO metadata present.
- No broken links; back-compat anchors still functional on Home.

## Next Steps (upon approval)
- Scaffold directories and minimal page components.
- Wire nav/footer and verify rendering locally.
- Add placeholder copy and CTAs; iterate content with you.