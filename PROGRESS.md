# PROGRESS — учебный дневник ZenAir КП

Пишу простыми словами, что и зачем сделано на каждом шаге. Ориентир — человек,
который знает JS/PHP, но только начинает React.

---

## Этап 0.1 — Инициализация монорепо
**Дата:** 2026-07-15
**Что сделано:** поднят каркас проекта — монорепо из трёх пакетов (веб, апи, общий код),
настроены сборка, линтинг, форматирование и тесты. Пока никакой бизнес-логики — только
«скелет», который собирается, проходит тесты и запускается.

**Структура:**
```
zenair-app/
├─ apps/web        React + Vite + Tailwind (фронт)
├─ apps/api        Express (бэкенд)
├─ packages/shared Zod-схемы, общие для фронта и бэка
├─ prisma/         схема БД (пока только Manager)
├─ package.json    корень: npm workspaces + общие скрипты
├─ eslint.config.js / .prettierrc  единые правила на весь репозиторий
└─ tsconfig.base.json  общие настройки TypeScript, от которых наследуются пакеты
```

**Ключевые концепции этого шага:**

- **npm workspaces (монорепо)** — один `node_modules` и один `npm install` на все три
  пакета. Пакет `@zenair/shared` подключается в web и api как обычная зависимость
  (`"@zenair/shared": "*"`), но физически это папка в этом же репозитории. Зачем: схемы
  валидации (Zod) пишем один раз и используем и на фронте, и на бэке — не дублируем типы.

- **Vite** — дев-сервер и сборщик для React. Даёт мгновенный запуск и hot-reload.
  Внутри `vite.config.ts` настроен **proxy**: запросы фронта на `/api/*` перенаправляются
  на Express (`localhost:3001`). Благодаря этому в разработке нет проблем с CORS.

- **Tailwind CSS** — стили классами прямо в разметке (`className="flex min-h-screen ..."`).
  Фирменные цвета вынесены в `tailwind.config.js` как `brand`/`menu`/`panel`, чтобы не
  разбрасывать хекс-коды по всему коду.

- **Express-приложение как фабрика** (`createApp()` в `apps/api/src/app.ts`) — сервер
  (`index.ts`) и само приложение разделены. Тест поднимает `createApp()` в памяти и дёргает
  `/health` через supertest, не занимая реальный порт. Это стандартный приём тестируемости.

- **Prisma** — ORM. В `schema.prisma` описываем модели, `prisma generate` создаёт
  типизированный клиент. Пока есть только модель `Manager`; подключение к MySQL (миграции)
  сделаем на Этапе 1, когда появится живая база.

- **Два вида тестов:**
  - **Vitest** (unit) — быстрые тесты в Node/jsdom. Smoke-тесты: `<App>` рендерит заголовок;
    `/health` отвечает `ok`; Zod-схема валидирует ответ.
  - **Playwright** (E2E) — запускает реальный браузер, открывает страницу, проверяет, что
    видно заголовок. Playwright сам поднимает дев-сервер перед тестом (`webServer` в конфиге).

**Файлы:**
- `apps/api/src/app.ts` — фабрика Express, роут `GET /health`
- `apps/api/src/app.test.ts` — supertest-проверка `/health`
- `apps/web/src/App.tsx` — заглушка главной страницы
- `apps/web/src/App.test.tsx` — Testing Library проверяет заголовок
- `apps/web/e2e/smoke.spec.ts` — Playwright открывает `/`
- `packages/shared/src/index.ts` — первая общая Zod-схема (`healthResponseSchema`)
- `prisma/schema.prisma` — модель `Manager`

**Проверка (всё зелёное):**
- `npm test` — 4 unit-теста (api 1, web 1, shared 2) проходят
- `npm run typecheck` — типы чистые во всех трёх пакетах
- `npm run lint` — без ошибок
- `npm run test:e2e` (в `apps/web`) — Playwright smoke проходит

**На что обратить внимание при изучении:**
- Как npm workspaces связывают локальный пакет `@zenair/shared` (почему import работает
  без публикации в npm).
- Разница между unit-тестом (Vitest, в памяти) и E2E (Playwright, реальный браузер).
- Почему Express-приложение отделено от запуска сервера (`createApp` vs `listen`).

**Команды:**
```
npm install            # поставить всё
npm run dev            # api + web параллельно (concurrently)
npm test               # unit-тесты по всем пакетам
npm run typecheck      # проверка типов
npm run lint           # eslint
npm --workspace apps/web run test:e2e   # Playwright
```
