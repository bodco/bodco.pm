// Single source of CV facts for the page, the PDF and the Word file.
// Every fact here comes from the Truth Bank. Keep EN and UK in sync.
// Never use the long dash anywhere in this file.

export const CONTACT = {
  name: 'Bohdan N.',
  email: 'bohdan.neymet@gmail.com',
  telegram: { handle: '@bodco', url: 'https://t.me/bodco' },
  linkedin: { handle: 'in/bneymet', url: 'https://www.linkedin.com/in/bneymet' },
  github: { handle: 'github.com/bodco', url: 'https://github.com/bodco' },
  site: 'https://bodco.pm',
  tower: 'https://tower.bodco.pm',
  towerRepo: 'https://github.com/bodco/pm-control-tower',
  towerNotion: 'https://bodco.notion.site/pm-control-tower',
};

export const FILES = {
  en: { pdf: '/cv/bohdan-n-senior-project-manager-cv.pdf', docx: '/cv/bohdan-n-senior-project-manager-cv.docx' },
  uk: { pdf: '/cv/bohdan-n-senior-project-manager-cv-uk.pdf', docx: '/cv/bohdan-n-senior-project-manager-cv-uk.docx' },
};

export const CV = {
  en: {
    title: 'Senior Project Manager',
    location: 'Uzhhorod, Ukraine · Remote · EET (UTC+2/+3)',
    summary:
      'Senior Project Manager with 7+ years in IT delivery, since 2019. Took a fintech payments product for an enterprise client in Latin America from unclear post-sale scope to live production with 50,000+ users, leading a cross-functional team of 13 through to a full handover. Delivers across Agile, Scrum, Kanban, Waterfall and hybrid models, on fixed-price and T&M contracts. Author of PM Control Tower, an open-source framework for AI-assisted project management.',
    h: {
      summary: 'Summary', skills: 'Skills', experience: 'Work Experience', projects: 'Projects',
      education: 'Education', certifications: 'Certifications', languages: 'Languages',
    },
    roles: [
      {
        title: 'Senior Project Manager',
        company: 'Volya Technologies (formerly Knubisoft)',
        where: 'Remote',
        start: '2022',
        end: 'present',
        lead: 'One enterprise account end to end: scope reset, production launch, team handover, ongoing production support.',
        groups: [
          {
            name: 'Delivery',
            items: [
              'Took over a fintech payments product for an enterprise client in Latin America after discovery, reverse-engineered what had been sold against what the client actually needed, set the real scope and drove it from early build to live production on card infrastructure, now serving 50,000+ users.',
              'Owned the full delivery lifecycle (requirements, planning, release management, budget, risk, quality) across hybrid Agile and fixed-scope phases.',
              'Led the structured handover of the development team to the client as the engagement moved in-house, keeping the production system stable.',
            ],
          },
          {
            name: 'Client and team',
            items: [
              'Single client-facing point of contact for enterprise stakeholders across time zones, handling conflict resolution and decisions under tight deadlines.',
              'Led a cross-functional team of 13: turned client requirements into prioritized work and, when scope spiked, reset priorities and walked the client through the trade-offs.',
              'Covered analyst and product owner duties where the project had no dedicated role.',
            ],
          },
          {
            name: 'Platform and releases',
            items: [
              'Ran the payment authorization component as a separate ongoing workstream, including production support.',
              'Owned all App Store Connect and Google Play publishing for the product. Earlier, delivered a portfolio of mobile apps through to release on both stores.',
              'Designed and open-sourced PM Control Tower, built through daily use on this project.',
            ],
          },
        ],
        tags: ['Fintech', 'Payments', 'Hybrid Agile', 'Fixed scope', 'Production support', 'Handover'],
      },
      {
        title: 'Project Manager',
        company: 'IT Outsourcing Company (name under NDA)',
        where: 'Remote',
        start: '2019',
        end: '2022',
        lead: 'Fixed-price and long-term T&M delivery for US-based clients, with account management for an enterprise engineering organization.',
        groups: [
          {
            name: 'Delivery',
            items: [
              'Delivered fixed-price and long-term T&M projects for US-based clients, with budget tracking on fixed-price contracts.',
              'Gathered and clarified requirements, did business analysis, and produced work plans, schedules and estimates.',
              'Reported progress and risks to stakeholders across the full delivery cycle.',
            ],
          },
          {
            name: 'Client and account',
            items: [
              "Account manager and primary point of contact for a US-based enterprise client's engineering organization: resourcing, staffing and partnership topics.",
              'Ran regular partnership reviews with client leadership and tech leads: agreed priorities for the next delivery phase, tracked action items, coordinated scope paperwork between both sides.',
            ],
          },
          {
            name: 'Team',
            items: [
              'Coordinated cross-functional, distributed teams of up to 20 people.',
              'Managed staffing and backfills: interviewed QA automation candidates and kept a bench of previously used engineers for fast ramp-up.',
              'Coordinated contractor access and tooling with the client, escalating recurring access issues until they were resolved.',
            ],
          },
        ],
        tags: ['Fixed-price', 'T&M', 'Account management', 'Distributed teams', 'US clients'],
      },
    ],
    project: {
      name: 'PM Control Tower',
      meta: 'Open source (MIT) · v1.6.1 beta',
      text: 'Claude plugin and Notion template for project managers: 22 project-agnostic Claude skills, a Notion hub of 11 linked databases and one config file per project. Collects context, preps meetings, drafts reports and tracks risks on daily, weekly and monthly schedules, with live tips during calls. A human approves every outgoing message. Built and used daily on a live client project.',
      links: 'tower.bodco.pm · github.com/bodco/pm-control-tower',
    },
    skills: [
      { name: 'Delivery and methodology', items: ['End-to-end delivery', 'Agile', 'Scrum', 'Kanban', 'Waterfall', 'Hybrid', 'Full SDLC', 'Release management', 'Change management', 'Risk management', 'Quality management'] },
      { name: 'Commercial', items: ['Fixed-price', 'T&M', 'Budget tracking', 'Requirements', 'Estimation', 'Scope management'] },
      { name: 'Stakeholders and teams', items: ['Stakeholder management', 'Enterprise clients', 'Conflict resolution', 'Prioritization', 'Distributed remote teams', 'Staffing and backfills', 'Mentoring and onboarding'] },
      { name: 'Domain', items: ['Fintech', 'Payments', 'Card infrastructure', 'Production support', 'Mobile releases (App Store, Google Play)'] },
      { name: 'AI-assisted delivery', items: ['Claude skills and scheduled routines', 'Notion and Jira integrations', 'Reporting and meeting prep automation', 'Human-in-the-loop communication'] },
      { name: 'Tools', items: ['Jira', 'Confluence', 'Linear', 'Trello', 'Notion', 'Slack', 'Figma', 'Claude (Cowork, MCP)', 'App Store Connect', 'Google Play Console'] },
    ],
    education: [
      { degree: "Master's degree, Cyber Security", school: 'Uzhhorod National University' },
      { degree: "Master's degree, Physics", school: 'Uzhhorod National University' },
    ],
    certifications: [
      { name: 'Google Project Management (Coursera)', meta: '2021 · Agile Project Management, Project Initiation, Project Planning, Project Execution' },
      { name: 'IAMPM: PM Hard Skills Planning, PM Hard Skills Release', meta: '2023' },
    ],
    languages: [
      { name: 'English', level: 'Advanced' },
      { name: 'Ukrainian', level: 'Native' },
      { name: 'Hungarian', level: 'Beginner' },
    ],
  },

  uk: {
    title: 'Senior Project Manager',
    location: 'Ужгород, Україна · віддалено · EET (UTC+2/+3)',
    summary:
      'Senior Project Manager, 7+ років в IT delivery (з 2019 року). Прийняв платіжний фінтех-продукт enterprise-клієнта з Латинської Америки з нечітким скоупом після продажу і вивів його в продакшн, де ним користуються 50 000+ людей. Вів крос-функціональну команду з 13 людей до повного handover. Працюю за Agile, Scrum, Kanban, Waterfall і гібридними моделями, на fixed-price і T&M контрактах. Автор PM Control Tower, open-source фреймворку для AI-assisted project management.',
    h: {
      summary: 'Про мене', skills: 'Навички', experience: 'Досвід роботи', projects: 'Проєкти',
      education: 'Освіта', certifications: 'Сертифікати', languages: 'Мови',
    },
    roles: [
      {
        title: 'Senior Project Manager',
        company: 'Volya Technologies (раніше Knubisoft)',
        where: 'Віддалено',
        start: '2022',
        end: 'дотепер',
        lead: 'Один enterprise-акаунт від початку до кінця: перезбірка скоупу, запуск у продакшн, handover команди, production support.',
        groups: [
          {
            name: 'Delivery',
            items: [
              'Прийняв платіжний фінтех-продукт enterprise-клієнта з Латинської Америки після discovery, розібрав, що продали, а що клієнту реально потрібно, зафіксував справжній скоуп і довів продукт від ранньої розробки до продакшену на картковій інфраструктурі. Сьогодні ним користуються 50 000+ людей.',
              'Відповідав за весь цикл delivery (вимоги, планування, release management, бюджет, ризики, якість) у гібридних Agile і fixed-scope фазах.',
              'Провів структурований handover команди розробки клієнту, коли той забирав розробку in-house, і зберіг стабільність продакшену.',
            ],
          },
          {
            name: 'Клієнт і команда',
            items: [
              'Єдина точка контакту для enterprise-стейкхолдерів клієнта в різних часових поясах: розв’язання конфліктів, рішення під жорсткими дедлайнами.',
              'Вів крос-функціональну команду з 13 людей: перетворював вимоги клієнта на пріоритезовані задачі, а коли скоуп різко зростав, переставляв пріоритети і погоджував компроміси з клієнтом.',
              'Закривав обов’язки аналітика і product owner там, де окремої ролі на проєкті не було.',
            ],
          },
          {
            name: 'Платформа і релізи',
            items: [
              'Окремим постійним потоком вів платіжний компонент авторизації, включно з production support.',
              'Сам вів усі публікації продукту в App Store Connect і Google Play. До цього вивів у реліз в обох сторах низку мобільних застосунків.',
              'Спроєктував і відкрив в open source PM Control Tower, який виріс зі щоденної роботи на цьому проєкті.',
            ],
          },
        ],
        tags: ['Фінтех', 'Платежі', 'Hybrid Agile', 'Fixed scope', 'Production support', 'Handover'],
      },
      {
        title: 'Project Manager',
        company: 'IT-аутсорсингова компанія (назва під NDA)',
        where: 'Віддалено',
        start: '2019',
        end: '2022',
        lead: 'Fixed-price і довгі T&M проєкти для клієнтів зі США, плюс акаунт-менеджмент для інженерного підрозділу enterprise-клієнта.',
        groups: [
          {
            name: 'Delivery',
            items: [
              'Вів fixed-price і довгострокові T&M проєкти для клієнтів зі США, контролював бюджет на fixed-price контрактах.',
              'Збирав і уточнював вимоги, робив бізнес-аналіз, готував робочі плани, графіки та естімейти.',
              'Звітував стейкхолдерам про прогрес і ризики на всьому циклі delivery.',
            ],
          },
          {
            name: 'Клієнт і акаунт',
            items: [
              'Акаунт-менеджер і основна точка контакту для інженерного підрозділу enterprise-клієнта зі США: ресурси, стафінг, питання партнерства.',
              'Проводив регулярні partnership review з керівництвом і техлідами клієнта: пріоритети на наступну фазу, action items, документи по скоупу з обох сторін.',
            ],
          },
          {
            name: 'Команда',
            items: [
              'Координував розподілені крос-функціональні команди до 20 людей.',
              'Відповідав за стафінг і заміни: проводив співбесіди з кандидатами на QA automation, тримав пул перевірених інженерів для швидкого старту.',
              'Координував доступи і тулінг для підрядників з боку клієнта, ескалював повторювані проблеми з доступами до повного вирішення.',
            ],
          },
        ],
        tags: ['Fixed-price', 'T&M', 'Акаунт-менеджмент', 'Розподілені команди', 'Клієнти зі США'],
      },
    ],
    project: {
      name: 'PM Control Tower',
      meta: 'Open source (MIT) · v1.6.1 beta',
      text: 'Claude-плагін і Notion-шаблон для проєктних менеджерів: 22 Claude skills, не прив’язані до проєкту, Notion-хаб з 11 пов’язаних баз і один конфіг-файл на проєкт. Збирає контекст, готує до мітингів, пише чернетки звітів і веде ризики за щоденним, тижневим і місячним розкладом, а під час дзвінків дає підказки. Кожне вихідне повідомлення погоджує людина. Створений і щодня працює на живому клієнтському проєкті.',
      links: 'tower.bodco.pm · github.com/bodco/pm-control-tower',
    },
    skills: [
      { name: 'Delivery і методології', items: ['End-to-end delivery', 'Agile', 'Scrum', 'Kanban', 'Waterfall', 'гібридні моделі', 'повний SDLC', 'Release management', 'Change management', 'Risk management', 'Quality management'] },
      { name: 'Комерційне', items: ['Fixed-price', 'T&M', 'контроль бюджету', 'вимоги', 'естімейти', 'управління скоупом'] },
      { name: 'Стейкхолдери і команди', items: ['Stakeholder management', 'enterprise-клієнти', 'розв’язання конфліктів', 'пріоритезація', 'розподілені віддалені команди', 'стафінг і заміни', 'менторинг і онбординг'] },
      { name: 'Домен', items: ['Фінтех', 'платежі', 'карткова інфраструктура', 'production support', 'мобільні релізи (App Store, Google Play)'] },
      { name: 'AI-assisted delivery', items: ['Claude skills і задачі за розкладом', 'інтеграції з Notion і Jira', 'автоматизація звітів і підготовки до мітингів', 'комунікація з погодженням людиною'] },
      { name: 'Інструменти', items: ['Jira', 'Confluence', 'Linear', 'Trello', 'Notion', 'Slack', 'Figma', 'Claude (Cowork, MCP)', 'App Store Connect', 'Google Play Console'] },
    ],
    education: [
      { degree: 'Магістр, кібербезпека', school: 'Ужгородський національний університет' },
      { degree: 'Магістр, фізика', school: 'Ужгородський національний університет' },
    ],
    certifications: [
      { name: 'Google Project Management (Coursera)', meta: '2021 · Agile Project Management, Project Initiation, Project Planning, Project Execution' },
      { name: 'IAMPM: PM Hard Skills Planning, PM Hard Skills Release', meta: '2023' },
    ],
    languages: [
      { name: 'Англійська', level: 'вільно (Advanced)' },
      { name: 'Українська', level: 'рідна' },
      { name: 'Угорська', level: 'початковий рівень' },
    ],
  },
};
