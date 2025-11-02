## Pages ? Social Reading Log

Pages is a Letterboxd-inspired experience for books. Readers can log finished titles, write reviews, curate lists, and see what friends are enjoying. This repository contains the foundational project structure, placeholder UI, and demo data to kickstart development.

### Stack
- Next.js 16 (App Router, React Server Components)
- TypeScript
- Tailwind CSS v4
- Prisma + PostgreSQL (schema scaffolded)
- NextAuth (credentials-based demo setup)

### Local Development

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

### Demo Accounts

Authentication is wired through NextAuth with mock data. Use any of the following emails with any password to explore the authenticated flows:

- `alex@example.com`
- `brooke@example.com`
- `cam@example.com`

### Prisma

The Prisma schema is defined in `prisma/schema.prisma` against PostgreSQL. Adjust `DATABASE_URL` and run:

```bash
npm run db:generate
npm run db:push
```

### Project Structure Highlights
- `src/app/(main)` ? primary application routes (home, books, lists, profile, search) sharing the global navigation.
- `src/app/(auth)` ? authentication routes with focused layouts for sign-in/sign-up.
- `src/components` ? modular UI building blocks (layout, cards, reviews, auth forms).
- `src/data/mockData.ts` ? demo content for books, users, reviews, lists, and follows.
- `src/lib/mockService.ts` ? helper functions that simulate data fetching and aggregation using the mock data set.
- `src/lib/auth.ts` ? NextAuth configuration plus helpers for session-aware components.

### Next Steps
- Replace mock data with real Prisma queries once a database is connected.
- Flesh out create/edit flows for reviews, lists, and follows.
- Layer in activity notifications and richer search once APIs are available.
