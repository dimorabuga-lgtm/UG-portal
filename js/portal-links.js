// Єдина конфігурація: categories[].sections — категорії модальних вікон; resources — справжні документи.
// resourceIds посилається на id у resources: один URL можна використати в кількох категоріях.
// Кілька resourceIds відкривають вкладений список. questions: [{ question, answer }] — відповіді FAQ.
// Не додавайте вигаданих URL. Порожній список документів — очікує підключення.
// Документ: унікальний id, title, description, category або categories, url, type, status, priority (більше — вище).
window.portalCatalog = {
  "categories": [
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
      "accent": "#6bcafa",
      "modalDescription": "Оберіть потрібну категорію розділу «Графік роботи».",
      "sections": [
        {
          "id": "schedule-operator-schedule",
          "title": "Графік роботи операторів",
          "description": "Актуальні зміни та робочий час.",
          "category": "schedule",
          "icon": "calendar",
          "accent": "#6bcafa",
          "type": "documents",
          "status": "available",
          "resourceIds": [
            "operator-work-schedule"
          ]
        },
        {
          "id": "schedule-days-off",
          "title": "Розклад вихідних",
          "description": "Інформація про вихідні та розподіл змін.",
          "category": "schedule",
          "icon": "calendar",
          "accent": "#6bcafa",
          "type": "documents",
          "status": "pending",
          "resourceIds": []
        },
        {
          "id": "schedule-team-schedule",
          "title": "Графік команди",
          "description": "Загальний розклад роботи команди.",
          "category": "schedule",
          "icon": "users",
          "accent": "#6bcafa",
          "type": "documents",
          "status": "pending",
          "resourceIds": []
        }
      ]
    },
    {
      "id": "operator-payments",
      "title": "Розрахунок операторів",
      "description": "Ставки, KPI, бонуси та приклади розрахунків.",
      "buttonLabel": "Відкрити розрахунок",
      "icon": "calculator",
      "category": "payroll",
      "accent": "#a4a2ff",
      "modalDescription": "Оберіть потрібну категорію розділу «Розрахунок операторів».",
      "sections": [
        {
          "id": "payroll-salary",
          "title": "Розрахунок заробітної плати",
          "description": "Порядок розрахунку заробітної плати.",
          "category": "payroll",
          "icon": "calculator",
          "accent": "#a4a2ff",
          "type": "documents",
          "status": "pending",
          "resourceIds": []
        },
        {
          "id": "payroll-rates",
          "title": "Ставки та бонуси",
          "description": "Інформація про ставки та бонуси.",
          "category": "payroll",
          "icon": "chart",
          "accent": "#a4a2ff",
          "type": "documents",
          "status": "pending",
          "resourceIds": []
        },
        {
          "id": "payroll-kpi",
          "title": "KPI операторів",
          "description": "Показники ефективності операторів.",
          "category": "payroll",
          "icon": "chart",
          "accent": "#a4a2ff",
          "type": "documents",
          "status": "pending",
          "resourceIds": []
        },
        {
          "id": "payroll-leads",
          "title": "Розрахунок за кількістю лідів",
          "description": "Правила розрахунку за опрацьованими лідами.",
          "category": "payroll",
          "icon": "calculator",
          "accent": "#a4a2ff",
          "type": "documents",
          "status": "pending",
          "resourceIds": []
        },
        {
          "id": "payroll-examples",
          "title": "Приклади розрахунків",
          "description": "Приклади розрахунків виплат.",
          "category": "payroll",
          "icon": "check",
          "accent": "#a4a2ff",
          "type": "documents",
          "status": "pending",
          "resourceIds": []
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
      "id": "responsibilities",
      "title": "Посадові обов’язки",
      "description": "Обов’язки співробітників компанії.",
      "buttonLabel": "Переглянути",
      "icon": "book",
      "category": "roles",
      "accent": "#d19bef",
      "modalDescription": "Оберіть потрібну категорію розділу «Посадові обов’язки».",
      "sections": [
        {
          "id": "roles-head",
          "title": "Керівник контакт-центру",
          "description": "Посадові обов’язки керівника контакт-центру.",
          "category": "roles",
          "icon": "headset",
          "accent": "#d19bef",
          "type": "documents",
          "status": "pending",
          "resourceIds": []
        },
        {
          "id": "roles-admin",
          "title": "Адміністратор",
          "description": "Посадові обов’язки адміністратора.",
          "category": "roles",
          "icon": "settings",
          "accent": "#d19bef",
          "type": "documents",
          "status": "pending",
          "resourceIds": []
        },
        {
          "id": "roles-leader",
          "title": "Team Leader зміни",
          "description": "Обов’язки Team Leader зміни.",
          "category": "roles",
          "icon": "users",
          "accent": "#d19bef",
          "type": "documents",
          "status": "pending",
          "resourceIds": []
        },
        {
          "id": "roles-hr",
          "title": "HR та стажування",
          "description": "Обов’язки щодо роботи з персоналом та стажування.",
          "category": "roles",
          "icon": "cap",
          "accent": "#d19bef",
          "type": "documents",
          "status": "pending",
          "resourceIds": []
        },
        {
          "id": "roles-other",
          "title": "Інші посадові обов’язки",
          "description": "Документи щодо інших посадових обов’язків.",
          "category": "roles",
          "icon": "book",
          "accent": "#d19bef",
          "type": "documents",
          "status": "pending",
          "resourceIds": []
        }
      ]
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
    }
  ],
  "quickAccess": [
    {
      "category": "schedule",
      "title": "Графік роботи"
    },
    {
      "category": "payroll",
      "title": "Розрахунок операторів"
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
    }
  ]
};
