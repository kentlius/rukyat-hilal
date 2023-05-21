# Sistem Informasi Rukyat Hilal

> For [Imahnoong](https://imahnoong.com/) 🔭

[https://rukyat-hilal.vercel.app/](https://rukyat-hilal.vercel.app/)

## Setup Project

---

### Pre-requisite

- [NodeJS](https://nodejs.org/)
- [MySQL](https://www.mysql.com/)

---

### Database

Host Local [MySQL](https://www.mysql.com/) or Create Database on [PlanetScale](https://planetscale.com/).

---

### Environment

Copy file [`.env.example`](.env.example) to `.env` and fill the environment variables

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
