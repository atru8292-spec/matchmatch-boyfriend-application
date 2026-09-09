# Boyfriend Application — MatchMatch

Форма на 5 шагов + интро/спасибо, статика (HTML/CSS/JS) без сборки.
Дизайн — тёмно-синий/золото, serif Fraunces, EN/ES переключатель в углу.

## Как уходят данные

Файлы **не** проходят через нашу serverless-функцию — Vercel режет запросы
тяжелее 4.5 МБ, а видео может быть до 200 МБ. Поэтому схема такая:

1. `POST /api/create-folder` — создаёт в Drive подпапку на заявку, отдаёт
   `folderId` + ссылку.
2. `GET /api/token` — отдаёт браузеру короткоживущий Google access token
   (только на этот сервис-аккаунт, только Drive-права).
3. Браузер сам инициирует resumable-сессию у Google и грузит файл
   **напрямую** — так соблюдается CORS (сессию должен начинать тот же
   источник, что потом делает PUT, иначе Google не даст загрузку).
4. `POST /api/submit` — получает только текстовые ответы + уже готовые
   ссылки на файлы, пишет строку в Google Sheets и шлёт сводку в Telegram.

## Файлы

- `index.html` — вся форма (5 шагов)
- `styles.css` — дизайн-токены + стили
- `app.js` — навигация по шагам, валидация, прямая заливка в Drive, отправка
- `api/create-folder.js` — создаёт подпапку заявки в Drive
- `api/token.js` — выдаёт браузеру временный Google access token
- `api/submit.js` — пишет в Google Sheets + шлёт в Telegram (только текст)
- `vercel.json` — таймаут функций увеличен до 60 сек
- `.env.example` — какие переменные окружения нужны

## Настройка Google (Sheets + Drive)

Таблица и папка уже созданы:
- Таблица: https://docs.google.com/spreadsheets/d/1fArvngGRppk-4x1sObEJIQuMhO2evEy2AcjKl3vY96g/edit
- Папка под фото/видео: https://drive.google.com/drive/folders/15Ql1zn1e9-k_ZSvPsjoIn0yfQ4qPWWTZ

Осталось:

1. В Google Cloud Console создать проект → включить **Google Sheets API**
   и **Google Drive API**.
2. Создать Service Account → сгенерировать JSON-ключ.
3. Из JSON: `client_email` → `GOOGLE_SERVICE_ACCOUNT_EMAIL`,
   `private_key` → `GOOGLE_PRIVATE_KEY` (вставлять как есть, с `\n`).
4. В таблице переименовать нижнюю вкладку в `Responses` (если ещё не сделано).
5. Расшарить и таблицу, и папку на email сервисного аккаунта, роль Editor.

## Telegram

Бот: **@boyfriendapplicbot**. Чтобы получить `TELEGRAM_CHAT_ID`:
1. Напиши боту `/start`.
2. Открой `https://api.telegram.org/bot<TOKEN>/getUpdates`.
3. В ответе — `"chat":{"id": ...}`.

Можно указать несколько получателей через запятую:
`TELEGRAM_CHAT_ID=111111,222222` — но каждый из них должен сам сначала
написать боту `/start`, иначе Telegram не даст слать им сообщения.

## Деплой на Vercel

1. Импортируй репозиторий в Vercel (Import Git Repository).
2. Settings → Environment Variables — добавь всё из `.env.example`.
3. Redeploy после добавления переменных.
4. Settings → Domains — привяжи свой поддомен, если нужен свой домен
   вместо `*.vercel.app`.

## Локально

```
npm install
vercel dev
```
