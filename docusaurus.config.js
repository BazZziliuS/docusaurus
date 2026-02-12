// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

const lightCodeTheme = require('prism-react-renderer').themes.nightOwlLight;
const darkCodeTheme = require('prism-react-renderer').themes.nightOwl;

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'Блог Cloudea',
    tagline: 'BazZziliuS, Cloudea, Docusaurus',
    favicon: 'img/favicon.ico',

    // Set the production url of your site here
    url: 'https://blog.cloudea.org',
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: '/',

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: 'BazZziliuS', // Usually your GitHub org/user name.
    projectName: 'docusaurus', // Usually your repo name.

    onBrokenLinks: 'throw',

    markdown: {
        hooks: {
            onBrokenMarkdownLinks: 'throw',
        },
    },

    // Even if you don't use internationalization, you can use this field to set
    // useful metadata like html lang. For example, if your site is Chinese, you
    // may want to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: 'ru',
        locales: ['ru', 'en'],
    },

    headTags: [
        // Preconnect для внешних ресурсов
        {
            tagName: 'link',
            attributes: {
                rel: 'preconnect',
                href: 'https://fonts.googleapis.com',
            },
        },
        {
            tagName: 'link',
            attributes: {
                rel: 'preconnect',
                href: 'https://fonts.gstatic.com',
                crossorigin: 'anonymous',
            },
        },
        {
            tagName: 'link',
            attributes: {
                rel: 'dns-prefetch',
                href: 'https://www.google-analytics.com',
            },
        },
        {
            tagName: 'link',
            attributes: {
                rel: 'dns-prefetch',
                href: 'https://mc.yandex.ru',
            },
        },
        {
            tagName: 'link',
            attributes: {
                rel: 'dns-prefetch',
                href: 'https://www.googletagmanager.com',
            },
        },
        // JSON-LD для сайта
        {
            tagName: 'script',
            attributes: {
                type: 'application/ld+json',
            },
            innerHTML: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                name: 'Блог Cloudea',
                url: 'https://blog.cloudea.org',
                description: 'Технический блог о разработке, хостинге, ботах и автоматизации',
                author: {
                    '@type': 'Person',
                    name: 'BazZziliuS',
                    url: 'https://blog.cloudea.org/bazzzilius',
                    jobTitle: 'Back End Engineer',
                    image: 'https://github.com/bazzzilius.png',
                },
            }),
        },
    ],

    plugins: [
        ['docusaurus-plugin-yandex-metrica', {
            counterID: '101940986',
            enableInProdOnly: true,
            clickmap: true,
            trackLinks: true,
            accurateTrackBounce: true,
            webvisor: true
        }],
        '@koroligor/docusaurus-plugin-backlinks',
        [
            '@docusaurus/plugin-ideal-image',
            {
                quality: 85,
                max: 2000,
                min: 500,
                steps: 4,
                disableInDev: false,
            },
        ],
    ],

    presets: [
        [
            'classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    routeBasePath: "/docs",
                    sidebarPath: require.resolve('./sidebars.js'),
                    editUrl: 'https://github.com/BazZziliuS/docusaurus/tree/main/',
                    showLastUpdateTime: true,
                    breadcrumbs: true,
                },
                blog: {
                    routeBasePath: '/',
                    showReadingTime: true,
                    blogSidebarCount: 'ALL',
                    blogSidebarTitle: 'Другие посты',
                    feedOptions: {
                        type: 'all',
                        title: 'Блог Cloudea',
                        description: 'Технический блог о разработке, хостинге и автоматизации',
                        copyright: `Copyright © ${new Date().getFullYear()} BazZziliuS`,
                        language: 'ru',
                    },
                },

                sitemap: {
                    lastmod: 'date',
                    changefreq: 'weekly',
                    priority: 0.5,
                    ignorePatterns: ['/tags/**', '/page/**'],
                    filename: 'sitemap.xml',
                },

                theme: {
                    customCss: [
                        // not my styles. Taken from here:
                        // https://github.com/vendure-ecommerce/vendure/blob/cc4826dfb7c1a2f4e6ed8daa13eb017090d8bd9a/docs/src/css/custom.css
                        require.resolve('./src/css/custom.css'),
                        require.resolve('./src/css/layout.css'),
                        require.resolve('./src/css/overrides.css'),
                        // require.resolve('./src/css/code-blocks.css'),
                    ],
                },
                gtag: {
                    trackingID: 'GTM-MBTPCD7S',
                    anonymizeIP: true,
                },
            }),
        ],
    ],

    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            metadata: [
                { name: 'keywords', content: 'bazzzilius, blog, cloudea, docs, хостинг, программирование, разработка, боты' },
                { name: 'author', content: 'BazZziliuS' },
                { name: 'robots', content: 'index, follow' },

                // Open Graph
                { property: 'og:type', content: 'website' },
                { property: 'og:site_name', content: 'Блог Cloudea' },
                { property: 'og:locale', content: 'ru_RU' },
                { property: 'og:locale:alternate', content: 'en_US' },
                { property: 'og:image', content: 'https://blog.cloudea.org/img/og-default.png' },
                { property: 'og:image:width', content: '1200' },
                { property: 'og:image:height', content: '630' },

                // Twitter Cards
                { name: 'twitter:card', content: 'summary_large_image' },
                { name: 'twitter:creator', content: '@bazzzilius' },
                { name: 'twitter:image', content: 'https://blog.cloudea.org/img/og-default.png' },
            ],
            navbar: {
                title: '',
                logo: {
                    alt: 'Лого',
                    src: 'img/logo.png',
                },
                items: [
                    {
                        type: 'dropdown',
                        sidebarId: 'tutorialSidebar',
                        position: 'left',
                        label: '✍️ Блог',
                        items: [
                            { label: 'Главная', to: '/' },
                            { label: 'Теги', to: '/tags' },
                            { label: 'Все по годам', to: 'archive' },
                        ],
                    },
                    {
                        type: 'dropdown',
                        label: '🙃 Вики',
                        position: 'left',
                        items: [
                            { label: '📦 Куча полезностей', type: 'doc', docId: 'intro' },
                            { label: '✈️ Боты', to: 'docs/bots' },
                            { label: '👤 Обо мне', to: 'about' },
                        ],
                    },
                    {
                        href: 'https://github.com/BazZziliuS/docusaurus',
                        position: 'right',
                        className: "header-github-link",
                        "aria-label": "GitHub repository",
                    },
                    {
                        href: 'https://boosty.to/bazzzilius/',
                        position: 'right',
                        className: "header-boosty-link",
                        "aria-label": "Boosty",
                    },
                    // {
                    //   href: 'https://t.me/bazzziliu5',
                    //   position: 'right',
                    //   className: "header-telegram-link",
                    //   "aria-label": "Telegram",
                    // },
                ],
            },
            prism: {
                theme: lightCodeTheme,
                darkTheme: darkCodeTheme,
                additionalLanguages: ['python', 'bash', 'lua', 'nginx'],
            },
            algolia: {
                appId: "TFOGO1GS9R",
                apiKey: "195bfee57948f3cbdc1951750a4abcf94d8cc9409e3f6ad5d5a464e95e3f5cc8",
                indexName: "cloudea",
                insights: true,
            },
        }),
};

export default config;
