// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightTypeDoc, { typeDocSidebarGroup } from 'starlight-typedoc'
import { loadEnv } from 'vite';
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import expressiveCode from 'astro-expressive-code';
import remarkMermaid from 'remark-mermaidjs'
// import basicSsl from '@vitejs/plugin-basic-ssl';


// https://astro.build/config
export default defineConfig({
    markdown: {
        // Applied to .md and .mdx files
        remarkPlugins: [remarkMermaid],
    },
    integrations: [starlight({
        title: 'Just Move Doc -  Dashboard',
        logo: {
            light: './src/assets/img/logo/logomami.webp',
            dark: './src/assets/img/logo/logomami-dark.webp'
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
                autogenerate: { directory: 'pages/index' },                
            },
            {
                label: 'Guias',
                items: [
                    // Each item here is one entry in the navigation menu.                    
                    { label: 'Planning',slug: 'guides/1planning'},
                    { label: 'Estado del arte',slug: 'guides/2estadodelarte'},
                    { label: 'Guia de configuración', slug: 'guides/3configuracionproyecto' },
                    { label: 'Casos de uso', slug: 'guides/4diagramadecasosdeuso' },
                    { label: 'Diagrama proyecto', slug: 'guides/5diagramadoproyecto' },
                    { label: 'Estructura proyecto', slug: 'guides/6estructuraproyecto' },
                    { label: 'Infraestructura física Living Lab', slug: 'guides/7infraestructuradellivinglab' },
                    
                ]
            },
            {
                label: 'Simulación de datos con Python',
                autogenerate: { directory: 'blog' },                
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
        }), expressiveCode(), tailwind(), mdx(), sitemap(), react()],
        i18n: {
            defaultLocale: "es",
            locales: ["es", "en", "fr", "pt-br"],
            routing: {
                prefixDefaultLocale: false
            }
        }
});