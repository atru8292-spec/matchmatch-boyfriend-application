# Boyfriend Application — MatchMatch

Один вопрос на экран (39 экранов + интро + "спасибо"), статика (HTML/CSS/JS)
без сборки. По исследованиям (Formsort, Reform, NN/g, IxDF) такой формат даёт
заметно выше completion rate, чем форма блоками или простынёй — мозг не видит
объём сразу. Счётчик показывает только текущий номер («/07»), не общее число —
так меньше ощущается marathon. Переход дальше — Enter (для текстовых полей и
селектов) или клик "Continue". Мелкие парные поля (возраст+рост, курит/пьёт,
дети/хочет детей) объединены на одном экране, чтобы не плодить лишние клики
там, где решение тривиальное.

Дизайн — по референсу: тёплый кремовый фон, чернильно-марсаловый акцент,
курсивный Fraunces, пилюли-аутлайны без заливки, без капса и шаблонных
ИИ-меток. Токены — в `styles.css`, блок `:root`.

Отправка идёт на собственный serverless-эндпоинт `/api/submit`, который:

1. создаёт в Google Drive папку на заявку и грузит туда фото + видео;
2. дописывает строку с текстовыми ответами в Google Sheets;
3. шлёт уведомление в личный Telegram-бот со сводкой + ссылкой на папку.

## Файлы

- `index.html` — форма (сгенерирована из `build/questions.js`, см. ниже)
- `build/questions.js` — единый источник правды по всем вопросам формы
- `build/template.html` + `build/generate.js` — генератор `index.html`
- `styles.css` — дизайн-токены + стили
- `app.js` — навигация по одному вопросу, Enter-переход, валидация, отправка
- `api/submit.js` — serverless-функция (Sheets + Drive + Telegram)
- `vercel.json` — таймаут функции увеличен до 60 сек (видео может грузиться долго)
- `.env.example` — какие переменные окружения нужны

## Если нужно поменять текст вопроса или порядок

Правь `build/questions.js` (не `index.html` напрямую — он перезатрётся),
потом:
```
node build/generate.js
```
Это пересоберёт `index.html`. `index.html` можно и руками поправить для
разовой правки — просто при следующей генерации изменения потеряются.

## Настройка Google (Sheets + Drive)

Таблица и папка уже созданы и лежат в твоём Drive:
- Таблица: https://docs.google.com/spreadsheets/d/1fArvngGRppk-4x1sObEJIQuMhO2evEy2AcjKl3vY96g/edit (ID уже вписан в `.env.example`)
- Папка под фото/видео: https://drive.google.com/drive/folders/15Ql1zn1e9-k_ZSvPsjoIn0yfQ4qPWWTZ (ID тоже вписан)

Осталось:

1. В Google Cloud Console создать проект → включить **Google Sheets API**
   и **Google Drive API**.
2. Создать Service Account → сгенерировать JSON-ключ.
3. Из JSON взять `client_email` → это `GOOGLE_SERVICE_ACCOUNT_EMAIL`,
   и `private_key` → это `GOOGLE_PRIVATE_KEY` (вставлять как есть, с `\n`).
4. В самой таблице переименовать вкладку снизу (сейчас `Sheet1` или похоже)
   в `Responses` — двойной клик по названию вкладки. Без этого код не найдёт
   куда писать (или поменяй `range` в `api/submit.js` под фактическое имя).
5. Расшарить и таблицу, и папку в Drive на email сервисного аккаунта
   (роль — Editor/Редактор), иначе запись не пройдёт.

## Telegram

Бот уже создан: **@boyfriendapplicbot**, токен лежит в `.env.example`
(`TELEGRAM_BOT_TOKEN`) — вынеси его в секреты Vercel, не держи в репо в открытую.

Чтобы получить `TELEGRAM_CHAT_ID`:
1. Напиши боту `/start` (или любое сообщение) в Telegram.
2. Открой в браузере: `https://api.telegram.org/bot8765764287:AAGKiNB3qmb8IEFZvZ_5IZVS-xjFLdHtscc/getUpdates`
3. В ответе найди `"chat":{"id": ...}` — это число и есть `TELEGRAM_CHAT_ID`.

## Деплой на Vercel

1. `vercel` (или через дашборд — импортируй эту папку как проект).
2. В настройках проекта → Environment Variables добавь все переменные
   из `.env.example` (с реальными значениями).
3. Привяжи поддомен MatchMatch в Vercel → Domains.
4. Готово — форма на поддомене, `/api/submit` работает как serverless function.

## Локально

```
npm install
vercel dev
```
