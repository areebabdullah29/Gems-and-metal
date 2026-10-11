# Gems and Metal

Sterling silver jewelry and watch studio website (Karachi, est. 1997), with
an owner-only admin panel for adding products (image, price, description,
category).

## Running locally

```bash
npm install
npm run set-admin-password   # one-time: sets your /admin login password
npm run dev
```

Site: http://localhost:3000
Admin: http://localhost:3000/admin

## Editing brand content

- `lib/content.ts`: brand name, tagline, currency, contact email/phone/
  Instagram, nav and footer links, and the real ordering/care policies shown
  on the Policies page. Almost everything text-based lives here.
- `app/(site)/about/page.tsx`: the studio story (father and daughter owned,
  since 1997, sterling silver only).
- `app/(site)/policies/page.tsx`: renders the policies from `lib/content.ts`
  as an accordion (`components/ui/accordion.tsx`, built on Radix UI).
- `app/(site)/privacy-policy/page.tsx` and `terms-and-conditions/page.tsx`:
  starting templates, not finished legal documents. Bracketed text needs
  filling in before launch.
- `public/brand/logo.png`: the logo mark, cropped from the tile you supplied.
  If you get a higher-resolution or vector version later, swap it in here and
  re-run the favicon generation (see below).

## Managing products

Go to `/admin`, sign in, and use "Add Product" to create a listing (name,
price, category, material, availability, description, one image). Edit or
delete any listing from the same dashboard. Product data lives in
`data/products.json` and uploaded images in `public/uploads/`. Both are
gitignored since they're live content, not source code.

If you forget the admin password, run `npm run set-admin-password` again to
set a new one.

## Regenerating the favicon

If you replace `public/brand/logo.png`, regenerate the favicon and
apple-touch-icon from it:

```bash
node -e "
const sharp = require('sharp');
Promise.all([
  sharp('public/brand/logo.png').resize(256,256,{fit:'contain', background:{r:255,g:255,b:255,alpha:1}}).toFile('app/icon.png'),
  sharp('public/brand/logo.png').resize(180,180,{fit:'contain', background:{r:255,g:255,b:255,alpha:1}}).toFile('app/apple-icon.png'),
]).then(()=>console.log('done'));
"
```

## Before launch

- [ ] Connect a custom domain
- [ ] Fill in `lib/content.ts` (contact email/phone, Instagram)
- [ ] Finish and legally review the Privacy Policy and Terms and Conditions
      pages
- [ ] Add real product photography through `/admin` (no AI-generated images)
- [ ] Confirm the policy wording in `lib/content.ts` still matches current
      practice (pricing, delivery timelines, COD coverage)

## Deployment note

Products and uploaded images are stored as files on disk (`data/products.json`,
`public/uploads/`). This works on any host with a persistent filesystem (a VPS,
Docker container, etc.) but **not** on serverless platforms like Vercel, where
the filesystem resets on every deploy. If you deploy to Vercel, this needs to
be swapped for a database (e.g. Postgres) and a blob store (e.g. Vercel Blob)
before adding real products.

## Tech

Next.js 16 (App Router, Server Actions, Cache Components), React 19,
Tailwind CSS 4, Framer Motion, Radix UI (accordion).
