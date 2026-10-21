# Ручне оновлення dimorabuga-lgtm/UG-portal

Шляхи нижче відносні до **кореня GitHub-репозиторію**, де вже є `index.html`. Локально цей корінь знаходиться у `C:/Users/Dmytro/Desktop/ug portal/ug-internal-portal`.

## Результат аудиту

Перевірений GitHub main: `9c0f418542c7efca3932cc08a4b89d48facbf4a6`. Серверні файли й форма входу вже збігаються з виправленими локальними файлами. **Повторно завантажувати їх тільки для цього аудиту не потрібно.**

Production `/login` точно збігається з попередньою версією `cfda60ba33dda38f1637a5d5626de49d50e89636` після нормалізації випадкового nonce. Немає нової перевірки JSON і заголовка X-Request-ID. Потрібно застосувати вже завантажений актуальний код через правильний Production deployment; дублювання тих самих файлів не гарантує цього.

## Файли, змінені саме в цьому аудиті

| Локальний файл | Дія в GitHub, точний шлях від кореня |
| --- | --- |
| `AUTH-SETUP.md` | Замінити `/AUTH-SETUP.md` |
| `AUTH-DIAGNOSTICS.md` | Замінити `/AUTH-DIAGNOSTICS.md` |
| `RELEASE-CHECKLIST.md` | Замінити `/RELEASE-CHECKLIST.md` |
| `GITHUB-UPLOAD.md` | Додати `/GITHUB-UPLOAD.md` |

Це виправлення інструкцій та звіт аудиту, а не нова реалізація авторизації. Дизайн, карти, таблиці й URL не змінювалися. Згенерований `dist` перевірено та перезібрано; завантажувати його окремо не потрібно, якщо Pages запускає `node build.cjs`.

Не додавайте додаткову папку `ug-internal-portal/` навколо цих файлів у GitHub. Не завантажуйте `.qa-*`, `.wrangler`, `.dev.vars*`, `.env*`, секрети чи локальні профілі браузера.

## Серверні файли, які вже є в перевіреному main

Для звірки структури (це не список нових змін):

```text
/functions/_middleware.js
/functions/api/login.js
/functions/api/logout.js
/server/auth.mjs
/server/login-page.mjs
/js/session.js
/migrations/0001_auth_rate_limit.sql
/build.cjs
/index.html
```

У GitHub мають залишатися всі ці файли в показаних каталогах. Якщо обираєте інший commit для deployment, звіряйте його з перевіреним main, а не переносіть вибірково лише login.js без helper-файлів.

## Що зробити у Cloudflare (власнику)

1. Workers & Pages → **ug-portal** → Settings → Builds: Git repository `dimorabuga-lgtm/UG-portal`, Production branch `main`, Root directory **порожній або `/`**, Build command `node build.cjs`, Build output directory `dist`. У репозиторії немає вкладеної папки `ug-internal-portal`; попередня інструкція з таким Root directory була неправильною для фактично завантаженої структури.
2. У Deployments перевірити active Production SHA та результат збірки після commit `9c0f4185…`. Якщо нова збірка невдала, прочитати її build log. Невдалий deployment може залишити попередню робочу версію активною; чи саме це сталося тут, без Dashboard не підтверджено.
3. У Production Variables and Secrets перевірити наявність непорожнього `PORTAL_PASSWORD` та незалежного випадкового `SESSION_SECRET` щонайменше на 32 символи, обидва як Secret. Не надсилайте значення. За поточним кодом HTTP 503 для незалогіненого JS-запиту виникає саме коли ця перевірка не проходить. Яка конкретно змінна некоректна, без logs або Dashboard не визначено.
4. Перевірити D1 binding `AUTH_RATE_LIMIT` і таблиці `login_attempts`, `auth_sessions` з міграції. Після виправлення секретів D1 також потрібна для входу.
5. Після власного підтвердження запустити новий Production deployment актуального main. Не виконувати тільки статичний drag-and-drop замість Functions deployment. Зберегти Fail closed та відсутність публічного кешування приватних відповідей.

## Як перевірити застосування версії

- GET `/api/login` без пароля: HTTP 405, JSON та новий заголовок `X-Request-ID`. Якщо його немає — сайт ще не виконує перевірену версію endpoint.
- GET `/login`: форма містить перевірку `payload?.ok===true` у JavaScript.
- Без cookie: `/` та `/index.html` → `/login`; `/js/portal-links.js` → 401 за справних секретів, без внутрішніх URL у відповіді. 503 означає, що проблема конфігурації ще залишається.
- POST login: неправильний пароль → 401; правильний → JSON `{ok:true}`, HttpOnly/Secure/SameSite cookie та відкриття порталу. Перевірити reload і logout.

Якщо POST повертає 503 у новій версії, знайти в runtime logs запис `portal_auth_failure` з відповідним `X-Request-ID`. Для діагнозу достатньо `code` і `issues`; значення секретів, паролі, Cookie та повний Request Payload не потрібні.

У цьому аудиті не виконувалися завантаження на GitHub, зміна Dashboard або deployment. Локальні тести підтверджують працездатність перевіреного коду, а не успішний production-вхід із вашим паролем.
