// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightTypeDoc, { typeDocSidebarGroup } from 'starlight-typedoc'
import { loadEnv } from 'vite';
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from '@astrojs/tailwind';
// import basicSsl from '@vitejs/plugin-basic-ssl';


// https://astro.build/config
export default defineConfig({
    integrations: [starlight({
        title: 'Just Move Doc -  Dashboard',
        logo: {
            light: './src/assets/img/logomami.webp',
            dark: './src/assets/img/logomami-dark.webp'
        },
        social: {
            github: 'https://github.com/ikreasoft/DashboardUbicuos/tree/docs',
            'x.com': 'https://twitter.com/mamiotlab',
            signal: 'https://mamilab.eu/'
        },
        disable404Route: true,
        sidebar: [            
            {
                label: 'Introducción',
                autogenerate: { directory: 'pages' },                
            },
            {
                label: 'Guias',
                items: [
                    // Each item here is one entry in the navigation menu.                    
                    { label: 'Planning',slug: 'guides/planning'},
                    { label: 'Estado del arte',slug: 'guides/estadodelarte'},
                    { label: 'Guia de configuración', slug: 'guides/configuracionproyecto' },
                    
                ]
            },
            {
                label: 'Referencias',
                autogenerate: { directory: 'reference' },
            },
            {
                label: 'Team',
                autogenerate: { directory: 'team' },                
            },
        ],
        }), tailwind(), mdx(), sitemap()],
        i18n: {
            defaultLocale: "es",
            locales: ["es", "en", "fr", "pt-br"],
            routing: {
                prefixDefaultLocale: false
            }
        }
});