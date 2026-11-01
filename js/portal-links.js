// Єдина конфігурація: categories[].sections — категорії модальних вікон; resources — справжні документи.
// resourceIds посилається на id у resources: один URL можна використати в кількох категоріях.
// Кілька resourceIds відкривають вкладений список. questions: [{ question, answer }] — відповіді FAQ.
// Не додавайте вигаданих URL. Порожній список документів — очікує підключення.
// Документ: унікальний id, title, description, category або categories, url, type, status, priority (більше — вище).
window.portalCatalog = {
  "categories": [
    {
      "id": "crm-systems",
      "title": "CRM-системи",
      "description": "Швидкий доступ до робочих CRM-систем.",
      "buttonLabel": "Відкрити CRM",
      "icon": "settings",
      "category": "crm",
      "accent": "#70d3cf",
      "modalDescription": "Оберіть CRM-систему — вона відкриється в новій вкладці.",
      "sections": [
        {
          "id": "crm-mafia-section",
          "title": "CRM «Мафія»",
          "description": "Швидкий перехід до CRM «Мафія».",
          "icon": "users",
          "accent": "#70d3cf",
          "type": "site",
          "status": "available",
          "resourceIds": [
            "crm-mafia"
          ]
        },
        {
          "id": "crm-trimriot-section",
          "title": "CRM «Трімріот»",
          "description": "Швидкий перехід до CRM «Трімріот».",
          "icon": "settings",
          "accent": "#70d3cf",
          "type": "site",
          "status": "available",
          "resourceIds": [
            "crm-trimriot"
          ]
        },
        {
          "id": "crm-arbitrage-section",
          "title": "CRM «Арбітраж»",
          "description": "Швидкий перехід до CRM «Арбітраж».",
          "icon": "chart",
          "accent": "#70d3cf",
          "type": "site",
          "status": "available",
          "resourceIds": [
            "crm-arbitrage"
          ]
        },
        {
          "id": "crm-mobitrend-section",
          "title": "CRM «Мобітренд»",
          "description": "Швидкий перехід до CRM «Мобітренд».",
          "icon": "phone",
          "accent": "#70d3cf",
          "type": "site",
          "status": "available",
          "resourceIds": [
            "crm-mobitrend"
          ]
        },
        {
          "id": "crm-start-traf-section",
          "title": "CRM «Старт Траф»",
          "description": "Швидкий перехід до CRM «Старт Траф».",
          "icon": "settings",
          "accent": "#70d3cf",
          "type": "site",
          "status": "available",
          "resourceIds": [
            "crm-start-traf"
          ]
        },
        {
          "id": "crm-gurt-baza-section",
          "title": "CRM «Gurt baza»",
          "description": "Швидкий перехід до CRM «Gurt baza».",
          "icon": "settings",
          "accent": "#70d3cf",
          "type": "site",
          "status": "available",
          "resourceIds": [
            "crm-gurt-baza"
          ]
        }
      ]
    },
    {
      "id": "regulations",
      "title": "Регламенти",
      "description": "Основні правила роботи та стандарти компанії.",
      "buttonLabel": "Відкрити",
      "icon": "check",
      "category": "regulations",
      "accent": "#b096ff",
      "modalDescription": "Оберіть потрібну категорію регламентів для перегляду документів.",
      "sections": [
        {
          "id": "regulation-call-centre-section",
          "title": "Регламент КЦ",
          "description": "Основні правила роботи кол-центру, стандарти та процеси",
          "category": "regulations",
          "icon": "headset",
          "accent": "#b59aff",
          "type": "docs",
          "status": "available",
          "resourceIds": [
            "regulation-call-centre"
          ]
        },
        {
          "id": "regulation-crm-mafia-section",
          "title": "Регламент CRM «Мафія»",
          "description": "Робочі процеси та правила CRM «Мафія».",
          "category": "regulations",
          "icon": "users",
          "accent": "#71cafa",
          "type": "docs",
          "status": "available",
          "resourceIds": [
            "regulation-crm-mafia"
          ]
        },
        {
          "id": "regulation-crm-trimriot-section",
          "title": "Регламент CRM «Трімріот»",
          "description": "Правила та робочі процеси CRM «Трімріот».",
          "category": "regulations",
          "icon": "settings",
          "accent": "#a3a0ff",
          "type": "docs",
          "status": "available",
          "resourceIds": [
            "regulation-crm-trimriot"
          ]
        },
        {
          "id": "regulation-crm-arbitrage-section",
          "title": "Регламент CRM «Арбітраж»",
          "description": "Специфіка роботи та правила CRM «Арбітраж».",
          "category": "regulations",
          "icon": "chart",
          "accent": "#7daaff",
          "type": "docs",
          "status": "available",
          "resourceIds": [
            "regulation-crm-arbitrage"
          ]
        },
        {
          "id": "regulation-crm-mobitrend-section",
          "title": "Регламент CRM «Мобітренд»",
          "description": "Інструкції та робочі процеси для CRM «Мобітренд»",
          "category": "regulations",
          "icon": "phone",
          "accent": "#70d3cf",
          "type": "docs",
          "status": "available",
          "resourceIds": [
            "regulation-crm-mobitrend"
          ]
        },
        {
          "id": "regulation-crm-start-traf-section",
          "title": "СРМ START TRAF",
          "description": "Правила та робочі процеси СРМ START TRAF.",
          "category": "regulations",
          "icon": "settings",
          "accent": "#70d3cf",
          "type": "docs",
          "status": "available",
          "resourceIds": [
            "regulation-crm-start-traf"
          ]
        },
        {
          "id": "regulation-crm-gurt-baza-section",
          "title": "Регламент CRM «Gurt baza»",
          "description": "Правила та робочі процеси CRM «Gurt baza».",
          "category": "regulations",
          "icon": "settings",
          "accent": "#70d3cf",
          "type": "docs",
          "status": "available",
          "resourceIds": [
            "regulation-crm-gurt-baza"
          ]
        }
      ]
    },
    {
      "id": "schedule",
      "title": "Графік роботи",
      "description": "Актуальний графік змін операторів.",
      "buttonLabel": "Відкрити графік",
      "icon": "calendar",
      "category": "schedule",
      "directResourceId": "operator-work-schedule",
      "accent": "#6bcafa",
      "sections": []
    },
    {
      "id": "operator-payments",
      "title": "Розрахунки",
      "description": "Розрахунки менеджерів, Team Leader & HR та admin.",
      "buttonLabel": "Відкрити розрахунки",
      "icon": "calculator",
      "category": "payroll",
      "accent": "#a4a2ff",
      "modalDescription": "Оберіть таблицю розрахунків для відповідної команди.",
      "sections": [
        {
          "id": "payroll-managers-section",
          "title": "Розрахунок Менеджерів",
          "description": "Таблиця розрахунків менеджерів.",
          "category": "payroll",
          "icon": "users",
          "accent": "#a4a2ff",
          "type": "sheets",
          "status": "available",
          "resourceIds": [
            "payroll-managers"
          ]
        },
        {
          "id": "payroll-team-leader-hr-section",
          "title": "Розрахунок Team Leader & HR",
          "description": "Таблиця розрахунків Team Leader та HR.",
          "category": "payroll",
          "icon": "headset",
          "accent": "#71cafa",
          "type": "sheets",
          "status": "available",
          "resourceIds": [
            "payroll-team-leader-hr"
          ]
        },
        {
          "id": "payroll-admin-section",
          "title": "Розрахунок admin",
          "description": "Таблиця розрахунків admin.",
          "category": "payroll",
          "icon": "settings",
          "accent": "#70d3cf",
          "type": "sheets",
          "status": "available",
          "resourceIds": [
            "payroll-admin"
          ]
        }
      ]
    },
    {
      "id": "extra-shifts",
      "title": "Додаткові виходи та штрафи",
      "description": "Облік додаткових виходів, відпрацювань і штрафів співробітників.",
      "buttonLabel": "Відкрити таблицю",
      "icon": "document-plus",
      "category": "extra-shifts",
      "accent": "#74c5f2",
      "modalDescription": "Оберіть потрібну категорію розділу «Додаткові виходи та штрафи».",
      "sections": [
        {
          "id": "extra-shifts-extra-work",
          "title": "Додаткові виходи та відпрацювання",
          "description": "Облік додаткових змін, годин та відпрацювань.",
          "category": "extra-shifts",
          "icon": "document-plus",
          "accent": "#74c5f2",
          "type": "documents",
          "status": "available",
          "resourceIds": [
            "extra-shifts-and-fines"
          ]
        },
        {
          "id": "extra-shifts-penalties",
          "title": "Штрафи",
          "description": "Облік порушень і штрафів співробітників.",
          "category": "extra-shifts",
          "icon": "document-minus",
          "accent": "#74c5f2",
          "type": "documents",
          "status": "available",
          "resourceIds": [
            "extra-shifts-and-fines"
          ]
        }
      ]
    },
    {
      "id": "makeup-schedule",
      "title": "Графік відпрацювань",
      "description": "Графік відпрацювань співробітників кол-центру.",
      "buttonLabel": "Відкрити графік",
      "icon": "calendar",
      "category": "makeup-schedule",
      "directResourceId": "operator-makeup-schedule",
      "accent": "#70d3cf",
      "sections": []
    },
    {
      "id": "responsibilities",
      "title": "Посадові обов’язки та розподіл зон відповідальності співробітників кол-центру",
      "description": "Єдиний документ про обов’язки та відповідальність команди.",
      "buttonLabel": "Відкрити документ",
      "icon": "users",
      "category": "roles",
      "directResourceId": "staff-responsibilities",
      "accent": "#d19bef",
      "sections": []
    },
    {
      "id": "telephony",
      "title": "Телефонія",
      "description": "Прослуховування записів розмов у системі телефонії.",
      "buttonLabel": "Відкрити телефонію",
      "icon": "headset",
      "category": "telephony",
      "directResourceId": "ug-telephony",
      "accent": "#70d3cf",
      "sections": []
    },
    {
      "id": "scripts",
      "title": "Скрипти",
      "description": "Скрипти для розмов зі зручним пошуком за назвою.",
      "buttonLabel": "Відкрити скрипти",
      "icon": "headset",
      "category": "scripts",
      "accent": "#b096ff",
      "modalDescription": "Знайдіть потрібний скрипт за назвою.",
      "sections": []
    },
    {
      "id": "instructions",
      "title": "Робочі інструкції",
      "description": "Покрокові інструкції для робочих процесів.",
      "buttonLabel": "Відкрити інструкції",
      "icon": "notebook",
      "category": "instructions",
      "accent": "#8ea7fb",
      "modalDescription": "Оберіть потрібну категорію розділу «Робочі інструкції».",
      "sections": [
        {
          "id": "instructions-crm",
          "title": "Робота в CRM",
          "description": "Інструкції щодо роботи в CRM.",
          "category": "instructions",
          "icon": "settings",
          "accent": "#8ea7fb",
          "type": "documents",
          "status": "pending",
          "resourceIds": []
        },
        {
          "id": "instructions-orders",
          "title": "Оформлення замовлень",
          "description": "Порядок оформлення замовлень.",
          "category": "instructions",
          "icon": "check",
          "accent": "#8ea7fb",
          "type": "documents",
          "status": "pending",
          "resourceIds": []
        },
        {
          "id": "instructions-ttn",
          "title": "Оформлення ТТН",
          "description": "Інструкції з оформлення товарно-транспортних накладних.",
          "category": "instructions",
          "icon": "document-plus",
          "accent": "#8ea7fb",
          "type": "documents",
          "status": "pending",
          "resourceIds": []
        },
        {
          "id": "instructions-statuses",
          "title": "Статуси замовлень і передзвони",
          "description": "Правила роботи зі статусами та передзвонами.",
          "category": "instructions",
          "icon": "phone",
          "accent": "#8ea7fb",
          "type": "documents",
          "status": "pending",
          "resourceIds": []
        },
        {
          "id": "instructions-upsell",
          "title": "Допродажі та додаткові товари",
          "description": "Інструкції щодо допродажів та додаткових товарів.",
          "category": "instructions",
          "icon": "chart",
          "accent": "#8ea7fb",
          "type": "documents",
          "status": "pending",
          "resourceIds": []
        },
        {
          "id": "instructions-objections",
          "title": "Робота із запереченнями",
          "description": "Інструкції щодо роботи із запереченнями.",
          "category": "instructions",
          "icon": "chat",
          "accent": "#8ea7fb",
          "type": "documents",
          "status": "pending",
          "resourceIds": []
        }
      ]
    },
    {
      "id": "learning",
      "title": "Навчальні матеріали",
      "description": "Скрипти, презентації, відео та корисні файли.",
      "buttonLabel": "Перейти до навчання",
      "icon": "graduation",
      "category": "training",
      "accent": "#72d1ce",
      "modalDescription": "Оберіть потрібну категорію розділу «Навчальні матеріали».",
      "sections": [
        {
          "id": "training-scripts",
          "title": "Скрипти продажів",
          "description": "Скрипти для спілкування з клієнтами.",
          "category": "training",
          "icon": "headset",
          "accent": "#72d1ce",
          "type": "documents",
          "status": "pending",
          "resourceIds": []
        },
        {
          "id": "training-objections",
          "title": "Робота із запереченнями",
          "description": "Матеріали з роботи із запереченнями.",
          "category": "training",
          "icon": "chat",
          "accent": "#72d1ce",
          "type": "documents",
          "status": "pending",
          "resourceIds": []
        },
        {
          "id": "training-products",
          "title": "Презентації товарів",
          "description": "Презентаційні матеріали про товари.",
          "category": "training",
          "icon": "book",
          "accent": "#72d1ce",
          "type": "documents",
          "status": "pending",
          "resourceIds": []
        },
        {
          "id": "training-onboarding",
          "title": "Навчання нових операторів",
          "description": "Матеріали для нових операторів.",
          "category": "training",
          "icon": "cap",
          "accent": "#72d1ce",
          "type": "documents",
          "status": "pending",
          "resourceIds": []
        },
        {
          "id": "training-tests",
          "title": "Тести та перевірка знань",
          "description": "Матеріали для перевірки знань операторів.",
          "category": "training",
          "icon": "check",
          "accent": "#72d1ce",
          "type": "documents",
          "status": "pending",
          "resourceIds": []
        },
        {
          "id": "training-videos",
          "title": "Відеоінструкції",
          "description": "Навчальні відео та пояснення процесів.",
          "category": "training",
          "icon": "video",
          "accent": "#72d1ce",
          "type": "documents",
          "status": "pending",
          "resourceIds": []
        }
      ]
    },
    {
      "id": "faq",
      "title": "Часті питання",
      "description": "Відповіді на типові питання співробітників.",
      "buttonLabel": "Переглянути відповіді",
      "icon": "question",
      "category": "faq",
      "accent": "#bb9bfb",
      "modalDescription": "Оберіть потрібну категорію розділу «Часті питання».",
      "sections": [
        {
          "id": "faq-crm",
          "title": "Робота в CRM",
          "description": "Питання щодо роботи в CRM.",
          "category": "faq",
          "icon": "settings",
          "accent": "#bb9bfb",
          "type": "faq",
          "status": "pending",
          "resourceIds": [],
          "questions": []
        },
        {
          "id": "faq-orders",
          "title": "Замовлення та ТТН",
          "description": "Питання щодо замовлень і ТТН.",
          "category": "faq",
          "icon": "document-plus",
          "accent": "#bb9bfb",
          "type": "faq",
          "status": "pending",
          "resourceIds": [],
          "questions": []
        },
        {
          "id": "faq-schedule",
          "title": "Графік і робочий час",
          "description": "Питання щодо графіка та робочого часу.",
          "category": "faq",
          "icon": "calendar",
          "accent": "#bb9bfb",
          "type": "faq",
          "status": "pending",
          "resourceIds": [],
          "questions": []
        },
        {
          "id": "faq-pay",
          "title": "Оплата та розрахунки",
          "description": "Питання щодо оплати та розрахунків.",
          "category": "faq",
          "icon": "calculator",
          "accent": "#bb9bfb",
          "type": "faq",
          "status": "pending",
          "resourceIds": [],
          "questions": []
        },
        {
          "id": "faq-scripts",
          "title": "Допродажі та скрипти",
          "description": "Питання щодо допродажів і скриптів.",
          "category": "faq",
          "icon": "headset",
          "accent": "#bb9bfb",
          "type": "faq",
          "status": "pending",
          "resourceIds": [],
          "questions": []
        }
      ]
    },
    {
      "id": "nova-poshta",
      "hiddenFromGrid": true,
      "title": "UG Нова пошта",
      "description": "Перехід до сайту UG Нова пошта.",
      "buttonLabel": "Відкрити сайт",
      "icon": "document-plus",
      "category": "nova-poshta",
      "directResourceId": "ug-nova-poshta",
      "accent": "#f28b82",
      "sections": []
    }
  ],
  "quickAccess": [
    {
      "category": "nova-poshta",
      "resourceId": "ug-nova-poshta",
      "title": "UG Нова пошта"
    },
    {
      "category": "schedule",
      "resourceId": "operator-work-schedule",
      "title": "Графік роботи"
    },
    {
      "category": "payroll",
      "title": "Розрахунки"
    },
    {
      "category": "extra-shifts",
      "resourceId": "extra-shifts-and-fines",
      "title": "Додаткові виходи та штрафи"
    },
    {
      "category": "regulations",
      "title": "Регламенти"
    },
    {
      "category": "instructions",
      "title": "Робочі інструкції"
    }
  ],
  "resources": [
    {
      "id": "ug-nova-poshta",
      "title": "UG Нова пошта",
      "description": "Перехід до сайту UG Нова пошта.",
      "category": "nova-poshta",
      "url": "https://dimorabuga-lgtm.github.io/UG_novaposhta/",
      "type": "site",
      "status": "available",
      "buttonLabel": "Відкрити сайт"
    },
    {
      "id": "operator-makeup-schedule",
      "title": "Графік відпрацювань",
      "description": "Графік відпрацювань співробітників кол-центру.",
      "category": "makeup-schedule",
      "url": "https://docs.google.com/spreadsheets/d/15fRxY7SvLoRWKOpupAsBBRv8YHn7nr42IyiVChjpdrQ/edit?usp=sharing",
      "type": "sheets",
      "status": "available"
    },
    {
      "id": "regulation-call-centre",
      "title": "Регламент КЦ",
      "description": "Основні правила роботи кол-центру, стандарти та процеси",
      "modalIcon": "headset",
      "modalAccent": "#b59aff",
      "category": "regulations",
      "url": "https://docs.google.com/document/d/1K-d9g3KZDncXzEAvzhvlNZqaS0mQDNSOxQbHo6WNQuI/edit?usp=sharing",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "regulation-crm-mafia",
      "title": "Регламент CRM «Мафія»",
      "description": "Робота з CRM «Мафія», робочі процеси та інструкції",
      "modalIcon": "users",
      "modalAccent": "#71cafa",
      "category": "regulations",
      "url": "https://docs.google.com/document/d/1l6WRm49Fqr6ZSUV42nccV4qc55xu9NYEPzOXEvVa8KM/edit?tab=t.0#heading=h.o8xgtdqwc70q",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "regulation-crm-trimriot",
      "title": "Регламент CRM «Трімріот»",
      "description": "Налаштування, робочі процеси та правила для CRM «Трімріот»",
      "modalIcon": "settings",
      "modalAccent": "#a3a0ff",
      "category": "regulations",
      "url": "https://docs.google.com/document/d/1FNtYv-XCLwLbnlzhgE266cYN7ePnEDqRHXHRIQMDKIY/edit?tab=t.0#heading=h.dzzg0d44j528",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "regulation-crm-arbitrage",
      "title": "Регламент CRM «Арбітраж»",
      "description": "Специфіка роботи, етапи та правила для CRM «Арбітраж»",
      "modalIcon": "chart",
      "modalAccent": "#7daaff",
      "category": "regulations",
      "url": "https://docs.google.com/document/d/1xd5zn5kgnPJDnv2KXRJrcbF014pcPm9i-5IulLh6hc0/edit?tab=t.0",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "regulation-crm-mobitrend",
      "title": "Регламент CRM «Мобітренд»",
      "description": "Інструкції та робочі процеси для CRM «Мобітренд»",
      "modalIcon": "phone",
      "modalAccent": "#70d3cf",
      "category": "regulations",
      "url": "https://docs.google.com/document/d/1RAn7ClXz5seNSP2TIO9a2rx2ptxZSV6nUeu1V6OhFC4/edit?tab=t.0#heading=h.o8xgtdqwc70q",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "extra-shifts-and-fines",
      "title": "Таблиця додаткових виходів та штрафів",
      "description": "Облік додаткових виходів, відпрацювань і штрафів співробітників",
      "category": "extra-shifts",
      "url": "https://docs.google.com/spreadsheets/d/1jLvI7x8UEzpiC_I_Pbk6dWRef5R83rGvOrOMLI4I3uo/edit?usp=sharing",
      "type": "sheets",
      "status": "available",
      "buttonLabel": "Відкрити таблицю"
    },
    {
      "id": "operator-work-schedule",
      "title": "Графік роботи операторів",
      "description": "Актуальний графік змін, вихідних та робочого часу операторів",
      "category": "schedule",
      "url": "https://docs.google.com/spreadsheets/d/1F0C9tNikEEaGNxrd3O9YuRADAP0ktc_iCrqVJRGPlWY/edit?usp=sharing",
      "type": "sheets",
      "status": "available"
    },
    {
      "id": "payroll-managers",
      "title": "Розрахунок Менеджерів",
      "description": "Таблиця розрахунків менеджерів.",
      "category": "payroll",
      "url": "https://docs.google.com/spreadsheets/d/1esw302QAkdoAmsBgFraSR2DZJDFr7Z9GGMT8QW84D_o/edit?usp=sharing",
      "type": "sheets",
      "status": "available",
      "modalIcon": "users",
      "modalAccent": "#a4a2ff"
    },
    {
      "id": "payroll-team-leader-hr",
      "title": "Розрахунок Team Leader & HR",
      "description": "Таблиця розрахунків Team Leader та HR.",
      "category": "payroll",
      "url": "https://docs.google.com/spreadsheets/d/1lKwsUEj0xrvA7qGzEkF-1XO0s6otyPoX1yu1fSFS7j4/edit?usp=sharing",
      "type": "sheets",
      "status": "available",
      "modalIcon": "headset",
      "modalAccent": "#71cafa"
    },
    {
      "id": "payroll-admin",
      "title": "Розрахунок admin",
      "description": "Таблиця розрахунків admin.",
      "category": "payroll",
      "url": "https://docs.google.com/spreadsheets/d/15D0nsmPQzU9WBjzUPaPDd0rCm6oHxTDmC7DJanPw7gw/edit?usp=sharing",
      "type": "sheets",
      "status": "available",
      "modalIcon": "settings",
      "modalAccent": "#70d3cf"
    },
    {
      "id": "staff-responsibilities",
      "title": "Посадові обов’язки та розподіл зон відповідальності співробітників кол-центру",
      "description": "Єдиний документ про обов’язки та відповідальність команди.",
      "category": "roles",
      "url": "https://docs.google.com/document/d/1RHl51OBY9mcx5KrbjBaZ0N7XpEwbMC6sNfd3Gq67CjY/edit?usp=sharing",
      "type": "docs",
      "status": "available",
      "modalIcon": "users",
      "modalAccent": "#d19bef"
    },
    {
      "id": "script-1",
      "title": "📊 Товари на КРОС",
      "url": "https://docs.google.com/spreadsheets/d/1aODcpgbzhPJRhkE6rSV7rwrK97NBABjJsbNOzsoNfgY/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-2",
      "title": "🧼 Настінний кондиціонер ",
      "url": "https://docs.google.com/document/d/108Ke1W_Y7qHPPPdJr8ZjOnTbA-ycfiM59lmHmIe-QhM/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-3",
      "title": "🧼 Афганський казан  8 л ",
      "url": "https://docs.google.com/document/d/1V8AcB2KNdj6WclCGXE7wrqZoJi1ihlD1xiNBytSkqeg/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-4",
      "title": "🧼 Монокуляр ",
      "url": "https://docs.google.com/document/d/1nzT7DRbTGXVz-JP__432fujvu5BJHp26zO6xHLO2YH4/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-5",
      "title": "🧼 Крісло надувне",
      "url": "https://docs.google.com/document/d/1e_xezY0oSEFq2p4QvRIiOYE2Wznr4kFN9K_b9lwrGmc/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-6",
      "title": "⚡ Бінокль",
      "url": "https://docs.google.com/document/d/1hHWeKExX7KQrtJ-kpBLW5NQE-hsjxD40GIseD8A6QS8/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-7",
      "title": "⚡ Система відеоспостереження",
      "url": "https://docs.google.com/document/d/1G7Ci7lBmQnTLtfk5Lt9nV4VFKwaZTBJCvwzGLEsmdg0/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-8",
      "title": "⚡ Машинка літак 2в1",
      "url": "https://docs.google.com/document/d/1OQFiodCKRPQkfgUIDmAgSHtmTPngniGgoVRE6EDPdyc/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-9",
      "title": "⚡ Колонка Bluetooth TTD 2806 з мікрофоном",
      "url": "https://docs.google.com/document/d/1a0_1UStaZcJ4ilB2UZWlCimUiDOhKBFRsIEZQgI7yoM/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-10",
      "title": "⚡ Колонка акустична ZXX-5504 2*6.5",
      "url": "https://docs.google.com/document/d/1MxMyXcu__ZYNRQ3WT7FGESdTkzlj_-ee_d8Bp4dvX9A/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-11",
      "title": "⚡ Дошка для віджимання електрична",
      "url": "https://docs.google.com/document/d/1whPVMgVbGhwDSd43xj6hoEw_bkOXPIVQwdjKXL3Xy-Q/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-12",
      "title": "⚡ Полірувальна машина",
      "url": "https://docs.google.com/document/d/1r0C6d9xYbJg2XJEW6DjUDW4anpqG1YemNCl0_t76VHk/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-13",
      "title": "⚡ Компресор великий у кейсі DeWalt",
      "url": "https://docs.google.com/document/d/1PtE-uLywmYcdqEuWxCWiKrmyPHJZbk5chVH8JEurlX8/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-14",
      "title": "⚡ Камера подвійна з сонячною панеллю Wi-Fi",
      "url": "https://docs.google.com/document/d/1GCCGCiSb3cIs2P8RNG7iZmrXTo--uHdarLWm_KYeV_k/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-15",
      "title": "⚡  Компресор АКБ з цифровим екраном + пилосос",
      "url": "https://docs.google.com/document/d/1UXLqFDbk-xlZLDMyxlzH1ZJNjB491aNeQ9aApTNPI5A/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-16",
      "title": "🌿 Набір 4 в 1 тример пила сікатор дуйка Makita",
      "url": "https://docs.google.com/document/d/1FZ4xow_I7RM9xcCeUTLLrsLlJSdbRO7r1pEYBXf10n8/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-17",
      "title": "🧼 Пароочисник CLEANER",
      "url": "https://docs.google.com/document/d/1lmX-WRT8TbEO2TpsXbcCFZ9aaa1LOZejzjJcScuQpB4/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-18",
      "title": "🎣 Кастінгова сітка",
      "url": "https://docs.google.com/document/d/1fWFx5BzXJ_T1vtyBdUBWlOt4o7JI3qyFZUZ724A2HsQ/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-19",
      "title": "🔧 НАБІР КЛЮЧІВ MEISTER TOOLS MS-650 108 ЕЛ",
      "url": "https://docs.google.com/document/d/169aUIxo8t61q-eyzBimZQpW4E32vqFEozBri3w-0heA/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-20",
      "title": "🚗 Електромобіль дитячий",
      "url": "https://docs.google.com/document/d/1eEDuHWHbuZjWpsRCKx1-w_S00HbE8qChsJhWk1IcWkw/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-21",
      "title": "🎨 Фарбопульт",
      "url": "https://docs.google.com/document/d/1lGAaaNVSRrf2Flq4WdraA7bpPa1n8BghazSuAe7MLNs/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-22",
      "title": "🚤 Човен надувний",
      "url": "https://docs.google.com/document/d/1KNylEPq69t2mZDl2Nu_6RjWkGieJEYRSIKAjAhiploQ/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-23",
      "title": "🌱 Акумуляторний культиватор",
      "url": "https://docs.google.com/document/d/1TP3dtgeWfepc4JMZTxjCfkam-TxF9_R6f7sezbHYb6Y/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-24",
      "title": "⚡ Зварювальний апарат",
      "url": "https://docs.google.com/document/d/1AA5kMEIaygrhyRjX4dee0r2lLADd-r7uFiF3EtuyNo8/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-25",
      "title": "🚁 Квадрокоптер",
      "url": "https://docs.google.com/document/d/1tF0IFOU4o7RMgcAVZCZ8WMG0jRvijmGgK5xd26FrZAk/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-26",
      "title": "🕶 Розумні окуляри з камерою",
      "url": "https://docs.google.com/document/d/1LMGSuC7aeRHOXf7ulMjKsyq1JTpP6hogc8gICDcOiWY/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-27",
      "title": "🪚 Пила з сікатором та висоторізом в наборі Makita",
      "url": "https://docs.google.com/document/d/1whTwBpzNHRDnfIU72xYpw18RdWw8W4QjfITF8UlAyqM/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-28",
      "title": "🍳 Духовка електрична 3 в 1 RAF",
      "url": "https://docs.google.com/document/d/1pUBQrayn9C2qV1ysosIJyBwETT-zWDaUFg6U3OQJqdI/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-29",
      "title": "🔩 Шуруповерт Макіта",
      "url": "https://docs.google.com/document/d/1gZoj4uamVb0e5jl7zSNFDt8IORrIoDhozEd9tI4lcNg/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-30",
      "title": "🔋 Пускозарядний (бустер)",
      "url": "https://docs.google.com/document/d/115b46WM0b5mSNBBUtjRbj_O_PMOX0cCV4KXvk4GSGN0/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-31",
      "title": "👕 Жіноча термобілизна",
      "url": "https://docs.google.com/document/d/1iRoodBYBaoUD9QCRtltouqm3bUDo7dEO0r8gmjdAKOY/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-32",
      "title": "🧴 Шапунь проти сивини",
      "url": "https://docs.google.com/document/d/1Ki9fNUk1Eg2cWDZvmo26o7gG6-XXGVFEv0QMhxVbW6Q/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-33",
      "title": "🔋 Інвертори (універсальний)",
      "url": "https://docs.google.com/document/d/1viTXtmJZHRw2WRo6NM84Pxc-CYxti0__eRiUFHO5oLY/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-34",
      "title": "🔌 UPS (безперебійник)",
      "url": "https://docs.google.com/document/d/1XBvHE-MszG7lzAlYd4w0MO21bZHIcb-hSQxMouJElDQ/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-35",
      "title": "🚗 Тент на авто",
      "url": "https://docs.google.com/document/d/1WDYD6v-xeuxlvNFJqr1C31nHvqg56k_H7EmTcyp-qZo/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-36",
      "title": "🪚 Bosch ланцюгова пила",
      "url": "https://docs.google.com/document/d/1E_mT03cqsalFIYuGw0cQdYc7d4wA7de-cCfnrzn1ibU/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-37",
      "title": "🔋 Інвертор 3500W",
      "url": "https://docs.google.com/document/d/18HckT_R4Jj2SD0-KSbYU5WuIxsUAv6SQpIUug4y3pcw/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-38",
      "title": "🔋 Інвертор 5000W",
      "url": "https://docs.google.com/document/d/1MtQ46lYbFfiy2BxdaFdHIG6ecYj_oykB8lKP9mKnrd0/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-39",
      "title": "☕ Термос-чайник",
      "url": "https://docs.google.com/document/d/1HeFHQBvaO2j3dGESNoqTw_4iVWuw5wO4Mrjv9of981s/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-40",
      "title": "📽 Проектор",
      "url": "https://docs.google.com/document/d/1wjFvV9Y3Tnl2J2sN6iFr6PuuavS93-DhedEco7JK93I/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-41",
      "title": "🔧 Інструменти DeWalt",
      "url": "https://docs.google.com/document/d/1EghuXApDAMQbI43BvXQyCt3hn0TMJ_jjeFJUr_Q3VQ4/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-42",
      "title": "🏋️ Віброплатформа",
      "url": "https://docs.google.com/document/d/1F-v_VFm94gChYO4fgpAJ8nBwMfiIeUsW1pmdsb6DBJY/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-43",
      "title": "🥊 Тренажер для боксу",
      "url": "https://docs.google.com/document/d/1nvfm8C9CI-QLb7qOjIOgVyOaTyJh4kZS2JpU9u_L09g/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-44",
      "title": "🎁 LOST BOX",
      "url": "https://docs.google.com/document/d/1un_9nM5Vf2bLheaG5F7A_j1dbB7iVJZBRJ4r7DZjjn8/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-45",
      "title": "🪜 Телескопічна драбина",
      "url": "https://docs.google.com/document/d/1FIbDdCjbF4zTX1BFbjjfsfHqsrCQoennxRoNkwWPF0M/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-46",
      "title": "🧳 Косметичка",
      "url": "https://docs.google.com/document/d/1LqKpZE-aKuIgfsKkEhUv0D_gteNsdGH-wkQ_f8Tw-oY/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-47",
      "title": "🔧 Гайковерт Макіта",
      "url": "https://docs.google.com/document/d/1BBD7QjFDWyNniH2C84vCBmTQ_zeNJ7ikkhYOibvI83k/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-48",
      "title": "🎁 Подарунковий набір 7в1",
      "url": "https://docs.google.com/document/d/1qk_fPFxl74J_5gS1u30s-5Bfgg2AYd9Bvo0_-rBw9-E/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-49",
      "title": "🪚 Акумуляторна пила",
      "url": "https://docs.google.com/document/d/1dzADKI_BWDixa7DZ1xBQzwtfT2oqrCIe08HaAY4H0wc/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-50",
      "title": "🍽 Посуд 12в1",
      "url": "https://docs.google.com/document/d/1LVBpc5RKsLbvPGn9LRmLS2Y3-RRjvZe0HiB4_X0Yo9o/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-51",
      "title": "💨 Фен Supersonic",
      "url": "https://docs.google.com/document/d/1iztpCF9f5nJrugvzJYfQ1yXFllg_0dI_Vz_2bvzCJ8c/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-52",
      "title": "🪟 Термоштора",
      "url": "https://docs.google.com/document/d/1viT871Gh546Ru-seA3XUBw_Mp-jWTupdDJX-VyM3XBU/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-53",
      "title": "🪚 НАБІР 2в1 СЕКАТОР + ПИЛКА",
      "url": "https://docs.google.com/document/d/15fXK7ROknP1mu2qvfcnkJNfRFp86N9N9t01mnnUoEd8/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-54",
      "title": "🚗 Накидка на лобове",
      "url": "https://docs.google.com/document/d/1A1onbNTBN766AxNkKTcaAPiYlZL6qt7FHvu9dmmGHGc/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-55",
      "title": "📢 Тимчасові короткі скрипти",
      "url": "https://docs.google.com/document/d/1JoieTRP9_A00XjG7aRWcv9jM1XnSFGUADD-j7SGuaHk/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-56",
      "title": "🌱Крапельна стрічка",
      "url": "https://docs.google.com/document/d/1XsP2i0LfVA97-QG5_lnrgHMWpaEsrzUYYkkkr_NpZ9U/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-57",
      "title": "⚡Колонка + Флешка",
      "url": "https://docs.google.com/document/d/1dPZfoZyPS97jjJkBZ79T0K3n4YBZgalLdBhl8nk8Is0/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-58",
      "title": "⚡Садові світильники",
      "url": "https://docs.google.com/document/d/19HJoHhLaWfQxZtAz2-Ya4PacIfodBdwk9F8oUOdinPA/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-59",
      "title": "🌱 активатор грунту",
      "url": "https://docs.google.com/document/d/1Zc1mAY3M8Xc8W1T1Z-KTuvHU_7Qc8iRhVMhpG2uxY4o/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-60",
      "title": "🌱 Металева ваза",
      "url": "https://docs.google.com/document/d/1OB3Yp5_b0tZ8_cwiTk3plvoQFNSKjAMQHDIcRGi4Sow/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-61",
      "title": "🌱 Арка-пергола",
      "url": "https://docs.google.com/document/d/19HhAeht6xJrORijhxTpxzIUlgddhk6-_9KQrj_01f04/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-62",
      "title": "🌱 Конюшина",
      "url": "https://docs.google.com/document/d/1BN-lZOrSE9XG8b3MkwT_wRjJsxyVac9QguBmDycEABI/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-63",
      "title": "🌱 Мікробек/Септик",
      "url": "https://docs.google.com/document/d/1s8iQqmQjrmof2chkeR9oMQCbi8FWDpUDBE3iBh5-ZQE/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-64",
      "title": "🧱 Паркан конструктор",
      "url": "https://docs.google.com/document/d/1YKsrQVKYXLuwVfg1x1Yw_B7MX2lucrG9KpQcfVfnfzA/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-65",
      "title": "🧱 Бордюр смужка",
      "url": "https://docs.google.com/document/d/1drqXpcdGja8PMaid0trUZpTuXrbkm5lZGVPuyA4S9Po/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-66",
      "title": "🌱 Торф’яні таблетки для розсади",
      "url": "https://docs.google.com/document/d/1mtsPjyvW2OkxdmQF_D7TyrQ_GC6LYlksokShlE7OZFc/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-67",
      "title": "🚗 CarPlay",
      "url": "https://docs.google.com/document/d/1IqLZj1hL61po9KyJ3Dr1GVbQ7lgnD1ib5LqkFful_0s/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-68",
      "title": "💿 CD диск з музикою",
      "url": "https://docs.google.com/document/d/1HzHg0gxih83Y4t6eePV11IsN1CWqaMVuoynUP5mACAY/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-69",
      "title": "📚 Забута книга",
      "url": "https://docs.google.com/document/d/1gdZouQ84cFvwnie4SFNFpuC5YzfJK3zsRVbYzNfqwcU/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-70",
      "title": "🐔 Пробіотик для птиці",
      "url": "https://docs.google.com/document/d/1NRFC8APdQuDnbEufy45cmL53RIag_KkFnXA-OtnrTkY/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-71",
      "title": "🎄 Символ Різдва",
      "url": "https://docs.google.com/document/d/1vIEM6O89PuhCZMVFWTCvToPNndsBmnk1QKDHK0GOauA/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-72",
      "title": "💾 Флешка з піснями",
      "url": "https://docs.google.com/document/d/1rSmdyZcvtm_MmWMF7wRQn0WpALuT6w6CP2mDiTTFxLM/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-73",
      "title": "🕯 Лампадка",
      "url": "https://docs.google.com/document/d/1kyr8yKmOKpKg4z-7MoYNG_jTtqoj2PsQLgkYyRH_vp0/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-74",
      "title": "🏡 Теплиця",
      "url": "https://docs.google.com/document/d/1RMX39Wd8IsH9M368jXS7qfHPENoUepMeDOQZibTpqvk/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-75",
      "title": "🔌 Безперебійник UPS",
      "url": "https://docs.google.com/document/d/1qXfjoSNYYVEGtqsMqUt20sey6oePxwb1f3tJZJ3d9YQ/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-76",
      "title": "🔋 Інвертор (загальний)",
      "url": "https://docs.google.com/document/d/1zzeKJ-cOmvW-hvV4M-WSbW-fK-iXs_jjeeK2v4sL3x8/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-77",
      "title": "🪚 Акумуляторна ланцюгова пила DOMOTEC",
      "url": "https://docs.google.com/document/d/18jf1Ymwmf2yJphHpJS1xNVxz1bHMsNYpotgVrjDX-MY/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-78",
      "title": "☀️ Сонячна станція",
      "url": "https://docs.google.com/document/d/16urW1J-15diGga-pM8P91Xs1bXaWuRWGyki98VWplUA/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-79",
      "title": "🍗 Айрогриль",
      "url": "https://docs.google.com/document/d/1AsGhRbw00eQ3w10UO-IWbFe_7hy8xISiVNDrtYu-nEw/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-80",
      "title": "🚗 Авто компресор",
      "url": "https://docs.google.com/document/d/1PtE-uLywmYcdqEuWxCWiKrmyPHJZbk5chVH8JEurlX8/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-81",
      "title": "📐 Лазерний нівелір (рівень)",
      "url": "https://docs.google.com/document/d/1bz1ul0EC1FEo2m4HqUBBtuWtytTFliV5g7pSm2Yp9-U/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-82",
      "title": "🔦 Фонарь",
      "url": "https://docs.google.com/document/d/1riDsx9J5bqblYcgN5A3jq-CY8RnHMTCx-Sii6uBe9Xw/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-83",
      "title": "🌿 Секатор акумуляторний",
      "url": "https://docs.google.com/document/d/1OE3UBU095cF2TZu4Wzm0vyrPm3JJuhsPu_VUfCD10ZM/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-84",
      "title": "🔋 Павербанк",
      "url": "https://docs.google.com/document/d/1ndBpEG_XMBOH1-rJiw85tJtrIuHsM0eIIvG6CrRL_bA/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-85",
      "title": "📱 Дитячий телефон",
      "url": "https://docs.google.com/document/d/12Yg4sRlUW2N_zReKdYXZMJ5sgvyNypPogn_f3J_yPQQ/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-86",
      "title": "🪚 Акумуляторна пила Gold-TOR 12d",
      "url": "https://docs.google.com/document/d/1sM1biJZgfVJq3NHEzqWKW3VjVU5IhXymcNlQIA7Yloo/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-87",
      "title": "🔥 Газовий обігрівач-плита 2в1 APG Appliance",
      "url": "https://docs.google.com/document/d/19n7Uz20rlBSBM1JbrjKvbeSotg1I1cMVBTD_H37ycdI/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-88",
      "title": "🪜 Телескопічна драбина",
      "url": "https://docs.google.com/document/d/1x2QGbVnevAHd2odoQwpE8b1Nw_XOE03ut9ttLSwO0Ow/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-89",
      "title": "🌿 Газонокосилка",
      "url": "https://docs.google.com/document/d/1GMANFeAkpD61y2FUB-sjv3SaYwrSkYt8HJ_vomYKFKo/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-90",
      "title": "🪚 НАБІР 2в1 СЕКАТОР + ПИЛКА",
      "url": "https://docs.google.com/document/d/1xjqie-l70bkz-fBLmbIkw-C2gaGE-vBb-p4Z1gCTjRM/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-91",
      "title": "💧 Вологопоглинач",
      "url": "https://docs.google.com/document/d/1ZrapYg8_OKrk1LTnMZ2wAAPKykz20uY_xL1HLNGAJ74/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-92",
      "title": "🔥 Буржуйка (50/25/41)",
      "url": "https://docs.google.com/document/d/1lW2IjXHvCRKuQOAqGfylby8yWfTHAFIfx4esPnE33oc/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-93",
      "title": "🔋 Пускозарядний пристрій",
      "url": "https://docs.google.com/document/d/1t4-PFv9ENRXV8lJo3vzz0QhPSKWYD-LpPplif220KgQ/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-94",
      "title": "🧹 Пилосос",
      "url": "https://docs.google.com/document/d/15omNMsRbBFTxxy1Q2KLde3cmKpvJja8Eju9rucEZv70/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-95",
      "title": "🌿 Садова гойдалка",
      "url": "https://docs.google.com/document/d/1TUmlHJB70khqoPzmStQFtozQgVXPv1U3LZNxWswEBd4/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-96",
      "title": "🤸 Батут",
      "url": "https://docs.google.com/document/d/1Dg6tW1Dx9LyLyvvo5bpddmrkbNcniqgMfo2rYBnQvwk/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-97",
      "title": "🪑 Офісне крісло",
      "url": "https://docs.google.com/document/d/1MzF38xf8UKwG5j-K12ouNU51QY5XJ4TkAgrKBthGWPI/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-98",
      "title": "🌱 Теплиця",
      "url": "https://docs.google.com/document/d/1RMX39Wd8IsH9M368jXS7qfHPENoUepMeDOQZibTpqvk/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-99",
      "title": "🔥 Газовий обігрівач",
      "url": "https://docs.google.com/document/d/1HnKV-OEPLvnLnlIU_bmJU9bqABSrMjhMAisETCFHmiA/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-100",
      "title": "🛏️ Розкладушка 3в1",
      "url": "https://docs.google.com/document/d/1_7CrO1KIXwRsBHHeakwfwFpCyHZheMGnkVTnl1dif0w/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-101",
      "title": "🔥 Масляний обігрівач",
      "url": "https://docs.google.com/document/d/1pAQYIMbaqWAi97u3aOwqtgnPys8XULIZcjZvJ2NwOz8/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-102",
      "title": "🌿 Культиватор 6в1",
      "url": "https://docs.google.com/document/d/1cXHOprBX6HJ8v1SYCuZUzjXgSkCjvU2RlffdgOr6Eys/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-103",
      "title": "🔋 Гелевий акумулятор 12V 100Ah",
      "url": "https://docs.google.com/document/d/16DFZVXC81Rn2R9_jeLPKaknc0eff_XI2EiGOdRJYXlo/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-104",
      "title": "🛏️ Ортопедична подушка",
      "url": "https://docs.google.com/document/d/1-rvSO54zUvC3XXYA3A5o0J4nyKedXejlG6_2V8aV4mw/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-105",
      "title": "🍇 Прес для винограду Вілен 15/10 л",
      "url": "https://docs.google.com/document/d/17OGYV4mRymZ45Y4XmiC5glO-lQv0PyKHhcSwAWvxYgg/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-106",
      "title": "🔥 Портативний обігрівач 2в1",
      "url": "https://docs.google.com/document/d/1G6BSlpgavqcX8ABc-Gf3keYbzm3A8rXT50OVqPDo144/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "script-107",
      "title": "🩳 Чоловіча білизна CK",
      "url": "https://docs.google.com/document/d/19duRjEcXZlowue3R-7rErQt3y2uZQ0CTFdfuUne914A/edit?usp=sharing",
      "category": "scripts",
      "description": "",
      "type": "docs",
      "status": "available"
    },
    {
      "id": "ug-telephony",
      "title": "Телефонія",
      "description": "Прослуховування записів розмов у системі телефонії.",
      "category": "telephony",
      "url": "https://ug-call-centre.iptel.ua/login",
      "type": "site",
      "status": "available",
      "buttonLabel": "Відкрити телефонію"
    },
    {
      "id": "regulation-crm-start-traf",
      "title": "СРМ START TRAF",
      "description": "Правила та робочі процеси СРМ START TRAF.",
      "category": "regulations",
      "url": "https://docs.google.com/document/d/1n_vlY9jnJXp51yX_5z7uBUhtosST59yt_eJlUXeGiBA/edit?tab=t.0",
      "type": "docs",
      "status": "available",
      "modalIcon": "settings",
      "modalAccent": "#70d3cf"
    },
    {
      "id": "regulation-crm-gurt-baza",
      "title": "Регламент CRM «Gurt baza»",
      "description": "Правила та робочі процеси CRM «Gurt baza».",
      "category": "regulations",
      "url": "https://docs.google.com/document/d/1-0lfQw1MjyhUGUTcSqsqbTyIua3S2T3k8D9ByTmr5rs/edit?usp=sharing",
      "type": "docs",
      "status": "available",
      "modalIcon": "settings",
      "modalAccent": "#70d3cf"
    },
    {
      "id": "crm-mafia",
      "title": "CRM «Мафія»",
      "description": "Робоча CRM-система «Мафія».",
      "category": "crm",
      "url": "https://mafia.lp-crm.biz/orders?status=103",
      "type": "site",
      "status": "available"
    },
    {
      "id": "crm-trimriot",
      "title": "CRM «Трімріот»",
      "description": "Робоча CRM-система «Трімріот».",
      "category": "crm",
      "url": "https://trimriot.lp-crm.biz/orders?status=3&page=2",
      "type": "site",
      "status": "available"
    },
    {
      "id": "crm-arbitrage",
      "title": "CRM «Арбітраж»",
      "description": "Робоча CRM-система «Арбітраж».",
      "category": "crm",
      "url": "https://arbitrage.lp-crm.biz/orders?status=3",
      "type": "site",
      "status": "available"
    },
    {
      "id": "crm-mobitrend",
      "title": "CRM «Мобітренд»",
      "description": "Робоча CRM-система «Мобітренд».",
      "category": "crm",
      "url": "https://glummyth.lp-crm.biz/orders?status=3",
      "type": "site",
      "status": "available"
    },
    {
      "id": "crm-start-traf",
      "title": "CRM «Старт Траф»",
      "description": "Робоча CRM-система «Старт Траф».",
      "category": "crm",
      "url": "https://icytap.lp-crm.biz/",
      "type": "site",
      "status": "available"
    },
    {
      "id": "crm-gurt-baza",
      "title": "CRM «Gurt baza»",
      "description": "Робоча CRM-система «Gurt baza».",
      "category": "crm",
      "url": "https://gurtbaza.unicrm.pro/",
      "type": "site",
      "status": "available"
    }
  ]
};
