// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

const lightCodeTheme = require('prism-react-renderer').themes.nightOwlLight;
const darkCodeTheme = require('prism-react-renderer').themes.nightOwl;
const {blogRenderer, docsRenderer, pagesRenderer} = require('./src/og-image-renderer');
const {postBuildFactory} = require('@acid-info/docusaurus-og/lib/server/index');

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'Блог Cloudea',
    tagline: 'Технический блог о разработке, self-hosting и автоматизации',
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
        // Theme color для Discord embed
        {
            tagName: 'meta',
            attributes: {
                name: 'theme-color',
                content: '#2196F3',
            },
        },
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
        function ogImagePlugin() {
            const ogOptions = {
                path: './preview-images',
                imageRenderers: {
                    'docusaurus-plugin-content-blog': blogRenderer,
                    'docusaurus-plugin-content-docs': docsRenderer,
                    'docusaurus-plugin-content-pages': pagesRenderer,
                },
            };
            return {
                name: 'docusaurus-og-wrapper',
                async postBuild(props) {
                    // Плагин OG не поддерживает i18n — генерируем только для дефолтной локали
                    if (props.i18n.currentLocale !== props.i18n.defaultLocale) return;
                    await postBuildFactory(ogOptions)(props);
                },
            };
        },
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
                    ignorePatterns: ['/tags/**', '/page/**'],
                    filename: 'sitemap.xml',
                    createSitemapItems: async ({defaultCreateSitemapItems, ...params}) => {
                        const items = await defaultCreateSitemapItems(params);
                        return items.map((item) => {
                            // Главная страница — высший приоритет
                            if (item.url.endsWith('/')) {
                                return {...item, changefreq: 'daily', priority: 1.0};
                            }
                            // Документация
                            if (item.url.includes('/docs/')) {
                                return {...item, changefreq: 'monthly', priority: 0.7};
                            }
                            // Блог посты
                            return {...item, changefreq: 'weekly', priority: 0.8};
                        });
                    },
                },

                theme: {
                    customCss: [
                        require.resolve('./src/css/custom.css'),
                        require.resolve('./src/css/layout.css'),
                        require.resolve('./src/css/overrides.css'),
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
                { name: 'description', content: 'Технический блог BazZziliuS о разработке, self-hosting, автоматизации и DevOps. Туториалы по Python, JavaScript, NGINX, Docker, MTProxy, n8n и другим инструментам для разработчиков.' },
                { name: 'keywords', content: 'bazzzilius, blog, cloudea, docs, хостинг, программирование, разработка, боты' },
                { name: 'author', content: 'BazZziliuS' },
                { name: 'robots', content: 'index, follow' },
                { name: 'theme-color', content: '#2196F3' },

                // Open Graph
                { property: 'og:type', content: 'website' },
                { property: 'og:site_name', content: 'Блог Cloudea' },
                { property: 'og:description', content: 'Технический блог BazZziliuS о разработке, self-hosting, автоматизации и DevOps. Туториалы по Python, JavaScript, NGINX, Docker, MTProxy, n8n и другим инструментам для разработчиков.' },
                { property: 'og:locale', content: 'ru_RU' },
                { property: 'og:locale:alternate', content: 'en_US' },
                // Twitter Cards
                { name: 'twitter:card', content: 'summary_large_image' },
                { name: 'twitter:creator', content: '@bazzzilius' },
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
                        href: 'https://t.me/tribute/app?startapp=dtnH',
                        position: 'right',
                        className: "header-tribute-link",
                        "aria-label": "Tribute",
                    },
                ],
            },
            prism: {
                theme: lightCodeTheme,
                darkTheme: darkCodeTheme,
                additionalLanguages: ['python', 'bash', 'lua', 'nginx'],
            },
            algolia: {
                appId: "P1AFP1WSPF",
                apiKey: "7b22b428a0088f392329b9abe2054292",
                indexName: "blog_cloudea_org_p1afp1wspf_pages",
                insights: true,
            },
        }),
};

export default config;
