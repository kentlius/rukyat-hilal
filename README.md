# Sistem Informasi Rukyat Hilal

> Built for [Imahnoong](https://imahnoong.com/) to report and verify hilal
> observations.

> Demo: not currently deployed. The previous Vercel URL is offline.

## Features

- Register and sign in with email verification
- Submit hilal observations with camera or telescope images
- Browse and search the public observation gallery
- Manage your own submissions from a dashboard
- Admin review, approval, rejection, editing, and deletion
- Azimuth/altitude calculator for observation planning
- Installable progressive web app with an offline fallback

## Setup Project

---

### Pre-requisite

- [NodeJS](https://nodejs.org/)
- [MySQL](https://www.mysql.com/)

---

### Database

Host Local [MySQL](https://www.mysql.com/) or create a database on
[PlanetScale](https://planetscale.com/).

---

### Environment

Copy file [`.env.example`](.env.example) to `.env` and fill the environment
variables.

---

### Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

---

## Run Project

1. Migrate Database

```bash
npx prisma db push
```

2. Start Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## License

MIT. See [LICENSE](LICENSE).
