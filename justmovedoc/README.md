# Just Move Documentation


## 🚀 Project Structure

Inside of your Astro + Starlight project, you'll see the following folders and files:

```
.
├── justmovedoc
│   ├── README.md
│   ├── astro.config.mjs
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
```
# **Just Move**
Project: Just Move Dashboard - Ubiquitous Computing

🤔 **About the Project**
The Just Move project aims to develop an IoT-based monitoring and control system that enables data capture from sensors, real-time visualization, and remote actuator management. The primary purpose of this project is to optimize resource usage and enhance operational efficiency by automating processes and ensuring a secure environment for data transmission.

**Motivation**: With the growing importance of IoT systems in automation, managing large volumes of sensor data and enabling real-time actions has become essential. This project seeks to offer a comprehensive solution that facilitates monitoring and administration within connected environments.

**Objectives**:
1. Integrate sensors and actuators to monitor environmental conditions and manage resources remotely.
2. Create an interactive dashboard for real-time metric visualization.
3. Ensure secure authentication and user management to protect data integrity.

⚡ **Installation**

### Prerequisites
- Node.js v20.18.0
- Docker v27.2.0
- Kubernetes v1.31.1+k3s1 (for production deployment)
- MongoDB Atlas and InfluxDB (cloud or local instances)
- MQTT Broker (for message transmission between sensors and actuators)

### Installation Steps

1. Clone the repository:
```bash
   git clone https://github.com/ikreasoft/JustMove.git
   cd src justmovedoc
```
# Init the project 
```bash
npm run dev --verbose
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Check out [Starlight’s docs](https://starlight.astro.build/), read [the Astro documentation](https://docs.astro.build), or jump into the [Astro Discord server](https://astro.build/chat).
