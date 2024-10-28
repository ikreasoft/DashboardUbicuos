---
title: Welcome to Dashboard documentation
description: Get started building your dashboard.
cover: ../../../../assets/img/project/producto-plataforma-expediente-digitalizado.png
---

# Files and directories
**astro.config.mjs** — The Astro configuration file; includes the Starlight integration and configuration.
**src/content/config.ts** — Content collections configuration file; adds Starlight’s frontmatter schemas to your project.
**src/content/docs/** — Content files. Starlight turns each .md, .mdx or .mdoc file in this directory into a page on your site.
**src/content/i18n/** — Translation data to support internationalization.
**src/** — Other source code and files (components, styles, images, etc.) for your project.
**public/** — Static assets (fonts, favicon, PDFs, etc.) that will not be processed by Astro.

## Main project contents
<pre>

.
├── CHANGELOG.md
├── README.md
├── justmovedoc
│   ├── README.md
│   ├── astro.config.mjs
│   ├── node_modules
│   │   └── [...]
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   │   └── favicon.svg
│   ├── src
│   │   ├── assets
│   │   │   ├── 404
│   │   │   │   └── NoFound.jpg
│   │   │   ├── houston.webp
│   │   │   └── img
│   │   │       ├── logo
│   │   │       │   ├── logomami-dark.webp
│   │   │       │   └── logomami.webp
│   │   │       ├── project
│   │   │       │   ├── Plan-de-negocios.png
│   │   │       │   ├── banner.jpg
│   │   │       │   ├── books.jpg
│   │   │       │   ├── documentation.png
│   │   │       │   ├── full-stack-developer.jpeg
│   │   │       │   ├── producto-plataforma-expediente-digitalizado.png
│   │   │       │   ├── project-management.jpg
│   │   │       │   └── projectGitHub.png
│   │   │       └── team
│   │   │           └── alfonso.jpeg
│   │   ├── components
│   │   │   ├── container.astro
│   │   │   ├── footer.astro
│   │   │   ├── logos.astro
│   │   │   ├── navbar
│   │   │   │   ├── dropdown.astro
│   │   │   │   └── navbar.astro
│   │   │   └── ui
│   │   │       ├── button.astro
│   │   │       ├── icons
│   │   │       │   ├── index.js
│   │   │       │   └── tick.astro
│   │   │       └── link.astro
│   │   ├── content
│   │   │   ├── 404.astro
│   │   │   ├── blog
│   │   │   ├── config.ts
│   │   │   └── docs
│   │   │       ├── blog
│   │   │       │   └── [slug].astro
│   │   │       ├── guides
│   │   │       │   ├── configuracionproyecto.md
│   │   │       │   ├── estadodelarte.md
│   │   │       │   ├── index.md
│   │   │       │   └── planning.md
│   │   │       ├── index.mdx
│   │   │       ├── pages
│   │   │       │   ├── about.astro
│   │   │       │   ├── en
│   │   │       │   │   ├── about.astro
│   │   │       │   │   └── index.astro
│   │   │       │   ├── fr
│   │   │       │   │   ├── about.astro
│   │   │       │   │   └── index.astro
│   │   │       │   ├── index.astro
│   │   │       │   └── pt-br
│   │   │       │       ├── about.astro
│   │   │       │       └── index.astro
│   │   │       ├── reference
│   │   │       │   └── example.md
│   │   │       └── team
│   │   │           └── alfonso.md
│   │   ├── custom.css
│   │   ├── env.d.ts
│   │   ├── layouts
│   │   │   ├── Layout.astro
│   │   │   └── navbar.astro
│   │   └── middleware
│   │       └── index.js
│   ├── tailwind.config.mjs
│   └── tsconfig.json
└── tree.txt

3171 directories, 24515 files
</pre>