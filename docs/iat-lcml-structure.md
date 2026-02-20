# IAT LCML – structure and wiring

Self-contained copy of the IAT improved journey for wholesale changes. All iat-lcml files live in two places: a **module folder** (routes + data) and a **view subtree**.

## Folder layout

```
app/
├── iat-lcml/                    # Module folder (routes + data)
│   ├── content.json             # Questions, outcomes, sections, outcomeTypes (from iat-improved-content.json)
│   ├── routes.js                # Builds GET/POST routes from content.json; serves start + journey steps
│   └── README.md                # Short pointer to this doc and view location
├── views/
│   └── iat-lcml/                # All views for this version
│       ├── start.html           # "Check if you need a marine licence" start page
│       └── layouts/
│           └── iat/
│               ├── radio-page.njk   # Radio question pages
│               ├── outcome.njk      # Outcome / result pages
│               └── card-selection.njk  # Card-style choice pages
└── routes.js                    # Registers: require('./iat-lcml/routes.js')(router)
```

## What each part does

| Location | Role |
|--------|------|
| **app/iat-lcml/content.json** | Single source of truth: sections, outcomeTypes, questions, outcomes. Routes and copy are derived from this. |
| **app/iat-lcml/routes.js** | Loads content.json; registers GET `/versions/multiple-sites-v2/iat-lcml` (start) and GET/POST for every question/outcome under `/versions/multiple-sites-v2/iat-lcml/...`. Chooses radio-page, card-selection, or outcome template per item. |
| **app/views/iat-lcml/start.html** | Start page; "Start now" links to `/versions/multiple-sites-v2/iat-lcml/sea`. |
| **app/views/iat-lcml/layouts/iat/*.njk** | Reusable IAT layouts (radio, card, outcome). Extend `layouts/main.html`. |

## URLs

- **Start:** `/versions/multiple-sites-v2/iat-lcml`
- **First step:** `/versions/multiple-sites-v2/iat-lcml/sea`
- **All journey steps:** `/versions/multiple-sites-v2/iat-lcml/<route>` (routes come from content.json, e.g. `/sea`, `/construction`, etc.)

## Registration

In **app/routes.js**, after the IAT improved require:

```js
require('./iat-lcml/routes.js')(router);
```

## How to open from the prototype index

**Low complexity marine licences** → **Iteration 2 – start as:** → **LCML IAT**  
That link goes to `/versions/multiple-sites-v2/iat-lcml`.

## Relationship to the original improved journey

- **Original:** Start at `/versions/multiple-sites-v2/start-improved`, journey at `/versions/multiple-sites-v2/journey-improved/...`; data in `app/data/iat-improved-content.json`, routes in `app/routes/versions/multiple-sites-v2/iat-improved.js`, views under `app/views/versions/multiple-sites-v2/`.
- **iat-lcml:** Start and journey both under `/versions/multiple-sites-v2/iat-lcml/`; data and route logic in `app/iat-lcml/`, views in `app/views/iat-lcml/`. Isolated so you can change content and behaviour without affecting the improved journey.
