# Copilot instructions for this repo

This file is read automatically by GitHub Copilot Chat (including agent
mode) in VS Code and injected as context into every session — no need to
paste these rules manually each time.

## Project context

This is a client-pitch prototype (InfluencerX) for a social-listening +
influencer-marketing platform. The codebase was originally scaffolded via
Figma Make for a Lenovo engagement and is being re-themed for a P&G
Pantene pitch (South Korea / Japan market). The UI/UX and component logic
should NOT change — only brand identity and mock data content change
between client engagements.

## Hard rules

1. **Never hardcode brand-specific strings.** Brand name, tagline, logo
   paths, and colors live in `src/app/data/brandConfig.ts` and must be
   imported (`activeBrand.brandName`, etc.), not typed literally into
   components. If you find a literal brand string while editing a file,
   flag it and replace it with a `brandConfig` reference.

2. **Mock data lives in `src/app/data/`, not inside components.** Each
   module's mock arrays (`DiscoverModule` → `discoverData.ts`,
   `RecommendModule` → `recommendData.ts`, etc.) should be imported, not
   defined inline. When extracting data out of a component, preserve the
   exact TypeScript interface/shape already in use and only move the
   `const` declarations + their type — do not alter component logic,
   JSX, hooks, or styling in the same change.

3. **Keep diffs scoped.** When asked to extract or refactor, touch only
   the files necessary for that specific task (typically: the source
   component + the new/target data file + the one import line). Do not
   opportunistically refactor unrelated code in the same pass.

4. **Keep file sizes manageable.** Prefer splitting large components
   (>500 lines) into smaller pieces or extracting data/constants out,
   rather than letting files grow. `RecommendModule.tsx` is the largest
   offender in this repo and a good candidate for splitting further once
   its mock data is extracted.

5. **Preserve existing layout patterns.** Use flexbox/grid and the
   existing Tailwind + shadcn/ui component set already in
   `src/app/components/ui/`. Don't introduce absolute positioning unless
   an existing pattern already does so in that component.

6. **Don't touch `theme.css` color tokens without being asked.** Brand
   color changes should go through `brandConfig.ts` first; CSS variable
   updates are a manual, deliberate step (see project migration notes),
   not something to change as a side effect of an unrelated task.

7. **TypeScript strictness.** When reconciling generated/pasted mock
   data against an interface, fix mismatches by aligning the data to the
   existing interface — don't loosen or `any`-type the interface to make
   bad data fit.

## Useful context files

- `src/app/data/brandConfig.ts` — brand identity single source of truth
- `src/app/App.tsx` — shared `CampaignContext` type used across modules
- `guidelines/Guidelines.md` — human-readable rationale/design notes
  (this file is the machine-facing counterpart)