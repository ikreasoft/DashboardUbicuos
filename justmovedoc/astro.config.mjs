// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
	integrations: [
		
		starlight({
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
					label: 'Guides',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Example Guide', slug: 'guides/example' },
					],
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
			],
		}),
	],
});
