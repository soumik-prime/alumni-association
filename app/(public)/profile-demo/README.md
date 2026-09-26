# Public Alumni Profile — component set

Files:

```
types/profile.ts                     — schema-matched TypeScript types
data/example-profile.ts              — static placeholder Profile object
lib/profile-utils.ts                 — formatting/derivation helpers
components/profile/
  Profile.tsx                        — top-level, entry point: <Profile profile={...} />
  ProfileHero.tsx                    — identity, current role, bio, social row
  ProfileOverview.tsx                — compact scan-friendly grid
  AboutSection.tsx                   — bio (hidden if absent)
  AcademicSection.tsx                — NEU CSE record + SSC/HSC
  HigherStudiesSection.tsx           — postgraduate timeline
  ExperienceSection.tsx              — work history timeline, current highlighted
  PublicationsSection.tsx            — research cards with type/status badges
  SocialContactSection.tsx           — full "Connect" link list
  AddressSection.tsx                 — present/permanent location
  SocialLinks.tsx                    — shared icon-link row, used compact + full
app-example-page.tsx                 — example route wiring
```

## Assumptions to verify against your actual project

- **Color tokens**: components reference `var(--neu-green)`, `var(--neu-green-hover)`,
  `var(--neu-emerald)`, `var(--neu-emerald-light)` via Tailwind arbitrary values
  (e.g. `bg-[color:var(--neu-green)]`), matching the CSS custom properties already
  defined in your global stylesheet. If your project instead has these registered
  as named Tailwind colors (e.g. `bg-brand-primary`), swap the arbitrary-value
  classes for those utility names.
- **Fonts**: headings use `font-[Bricolage_Grotesque]`, matching the Google Fonts
  import in your existing profile.html reference (Bricolage Grotesque + Public
  Sans). Body text uses your project's default sans stack. Confirm both are
  registered in `tailwind.config` as `font-display` / `font-sans` (or similar) and
  swap the class names to match if so.
- **Icons**: `lucide-react`. Swap for your project's existing icon set if different.
- **Path alias**: imports use `@/…`, matching a standard `tsconfig.json` baseUrl
  setup — adjust if your project uses a different alias.
- **Images**: `next/image` is used for the profile photo; point `photo` at a real
  path or remote pattern allowed in `next.config`.

## Behavior notes

- Every optional field is conditionally rendered — no empty "—" placeholders.
  Missing bio hides About, missing higher studies hides that whole section, etc.
- Current role is derived as the work experience with no `end_date`, falling back
  to the most recent by `start_date` — no employment record is invented.
- Publications never state "Published" unless `status === "PUBLISHED"`; other
  statuses get a neutral/amber badge and slightly quieter card treatment.
- Present/permanent addresses are deduplicated visually when city + country match.
