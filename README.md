This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

📁 Структура app/

✅ app/layout.tsx

Обгортка всього додатку

Підключає ThemeProvider, AuthProvider

Стилі Tailwind

✅ app/admin/layout.tsx

Внутрішній layout для адмін-панелі

Використовує AdminSidebar

Має фіксований topbar

✅ app/client/layout.tsx

Layout для клієнтської частини (читання без керування)

📁 Сторінка логіну — app/login/page.tsx

🔹 Компоненти:

SafeInput

LoginForm

ThemeToggle (в хедері)

🔹 Логіка:

Валідація через react-hook-form + zod

Підключення до NextAuth

Перевірка ролі → редирект в /admin або /client

🔹 Стилі:

Tailwind: темна + світла тема

Анімація на input

📁 Проєкт (Project Page) — app/admin/projects/[projectId]/page.tsx

🔹 Компоненти:

ProjectSummaryChart (Pie)

ProjectLineChart (Line)

ScanSummaryTable

🔹 API:

/api/projects/[projectId]/summary

🔹 Дані:

summary.stats: totalPages, totalViolations

summary.history: для графіків

summary.pages: список сторінок

📁 Деталі скану сторінки — app/admin/projects/[projectId]/pages/[pageId]/page.tsx

🔹 Компоненти:

CompliantPieChart

ImpactBadge

HelpSection

SafeHtmlRenderer

ImpactBar

CriteriaList

🔹 API:

/api/projects/[projectId]/pages/[pageId]

/api/fetchHelpContent (POST)

🔹 Дані:

scanResult: violations[], summary, score

Help info з Deque University (why it matters, how to fix, standards)

📁 Сторінка додавання сторінок — app/admin/projects/[projectId]/pages/page.tsx

🔹 Компоненти:

AddPageForm

Кнопка для сканування окремої сторінки

🔹 API:

POST /api/projects/[projectId]/pages

📁 Глобальні компоненти

AdminSidebar — із підтримкою active через id

TopNavigationBar — пошук, перемикач теми, профіль

ThemeToggle

CompliantPieChart, ProjectLineChart