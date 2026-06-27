# Publikacija — project conventions

Next.js (App Router) + Sanity + next-intl. Read this before changing UI or content code.

## Design system — typography & layout (IMPORTANT to the client)

Text size and layout are treated as critical. Two hard rules:

1. **Use the defined typography tokens** from `app/globals.css` (`@theme`) — they are the single source of truth. Do **not** invent arbitrary content sizes (`text-[18px]`, `text-[21px]`, `text-[clamp(...)]`).
   - `text-title` — page headings (H1). `clamp(3rem,5.5vw,5rem)` / 800
   - `text-subtitle` — section headings, pull quotes. `clamp(1.8rem,3vw,2.4rem)` / 800
   - `text-body` — all body copy. `22px` / 1.65 / 700
   - Small eyebrow / caption / helper labels: the established pattern `font-bold text-[13px]`/`text-[14px]` `tracking-[2px|3px]` `uppercase` is allowed.

2. **The blog article (when it has no sticky sidebar) is offset ~40% from the left on desktop** (centred-right), full width on mobile — `md:pl-[40%] md:pr-10` on a full-width container (use padding, not `mx-auto`/`ml-[x]`, so full-width dividers are preserved). A blog post **with** a sticky sidebar uses the two-column grid instead (sidebar left ~34%, article right). Inside the blog, media width is Studio-managed per item (default 70%). The **booking form is left-aligned** with a `max-w` (the offset was tried there and reverted) — don't re-apply it without asking.

Brand colors: text/ink `#221c14`, background `#e5e4d2` (see `:root` tokens in `app/globals.css`).

## Content & i18n

- All page content lives in Sanity with `{ lt, en }` locale objects (`localeString` / `localeText` / `localeBlock`). LT is primary and always the fallback.
- GROQ projects flat strings per locale: `"field": coalesce(field[$locale], field.lt)`.
- next-intl (`messages/lt.json`, `messages/en.json`) is UI chrome only (nav, form labels, errors) and acts as fallback when a Sanity doc is empty.
- The site shows **published content only** — both Sanity clients set `perspective: "published"`. Drafts never appear on the live site.

## Verify before declaring done

- `npx tsc --noEmit` and `npx eslint <files>` must pass.
- For anything that renders content, confirm with a production build (`pnpm build` + `pnpm start`) — some errors (e.g. `DYNAMIC_SERVER_USAGE`) only surface in prod, not `next dev`.
