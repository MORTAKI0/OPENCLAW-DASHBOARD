# AGENT.md

## Project Purpose

`openclaw-ui` is the custom dashboard and admin surface for OpenClaw, built as a separate Next.js application.

It is not the native OpenClaw Control UI and should not drift into being a clone of it. The native UI remains its own product surface. This app exists to provide a cleaner, more operational, more polished dashboard layer around OpenClaw.

## Product Principles

- Build the smallest useful thing first.
- Prefer clarity over cleverness.
- Optimize for operational usefulness, not feature count.
- Keep the UI calm, focused, and trustworthy.
- Avoid feature sprawl and accidental platform-building.
- Preserve a clear separation between dashboard UX and native OpenClaw UX.

## Long-Term Architecture Rules

- Use Next.js App Router conventions.
- Prefer Server Components by default.
- Use Client Components only for interactivity, browser APIs, or client-only state.
- Keep structure simple now, but scalable as the product grows.
- Prefer explicit boundaries over hidden coupling.
- Do not mix UI concerns with integration logic.
- Keep external-service logic isolated from rendering code.

Preferred structure:

- `app/` for routes, layouts, route handlers, and page-level composition.
- `components/` for reusable UI.
- `lib/` for integrations, auth, and shared helpers.
- `types/` for shared TypeScript types.
- `styles/` only if styling needs outgrow route-local or global styles.

File ownership rules:

- Auth logic belongs in `lib/auth.ts`.
- OpenClaw integration logic belongs in `lib/openclaw.ts`.
- Generic helpers belong in `lib/utils.ts`.
- Shared types belong in `types/`.

## Coding Standards

- TypeScript first.
- Prefer strong typing and explicit return types where they improve clarity.
- Do not use `any` unless unavoidable and documented.
- Keep components small, readable, and easy to change.
- Avoid premature abstraction.
- Avoid duplicated logic.
- Do not introduce dead code, placeholder branches, or unused helpers.
- Keep naming explicit and boring.
- Optimize for maintainability over cleverness.

## Data Fetching Rules

- Prefer server-side data access when possible.
- Keep secrets on the server.
- Do not expose internal OpenClaw credentials to the browser.
- Use environment variables for all URLs, credentials, and secrets.
- Clearly separate public URLs from internal/service URLs.
- Prefer thin API routes or server actions over scattered fetch logic.

## Auth Rules

- Auth must protect dashboard access.
- Current MVP auth is credentials-based admin login.
- Future auth may expand to OAuth or SSO, but current work must not overbuild for it.
- Do not place auth logic in random components.
- Do not hardcode credentials.
- Credentials and secrets must come from environment variables.
- Route protection is required for protected surfaces.

## OpenClaw Integration Rules

- This app is not a clone of the native OpenClaw UI.
- Native OpenClaw remains a separate surface.
- Consume minimal, purposeful OpenClaw state.
- Health and status integrations come before deeper control surfaces.
- Do not leak raw backend details into the UI unless required.
- Do not couple the UI to unstable implementation details unless necessary.
- Link into native OpenClaw where that is more appropriate than rebuilding functionality.

## UI / Design Rules

- Design mobile-first.
- Target an admin-premium aesthetic.
- Dark UI is acceptable and preferred if used consistently.
- Use large tap targets and clear interaction states.
- Favor strong spacing and restrained information density.
- Maintain clear hierarchy and status-first layouts.
- Avoid generic template feel.
- Avoid clutter, noisy cards, and decorative excess.
- Design should feel deliberate, not auto-generated.

## Performance Rules

- Keep the initial payload light.
- Prefer server rendering where suitable.
- Avoid unnecessary client state.
- Avoid unnecessary dependencies.
- Keep dashboard surfaces fast and operationally useful.

## Testing / Validation Rules

- Lint must pass.
- Typecheck must pass.
- Build must pass.
- Changed flows should be manually verified.
- Mobile layout must be checked for dashboard surfaces.
- Auth and protected routing must be verified when touched.
- Integration-related changes should fail safely.

## Definition of Done

- Code is clean.
- Scope is respected.
- Types are sound.
- No obvious dead code remains.
- No secrets are leaked.
- Lint, typecheck, and build pass.
- UI works on mobile.
- The solution matches the actual product goal.
- The solution does not add unrelated complexity.
