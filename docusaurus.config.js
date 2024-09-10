// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

const lightCodeTheme = require('prism-react-renderer').themes.nightOwlLight;
const darkCodeTheme = require('prism-react-renderer').themes.nightOwl;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Блог BazZziliuS',
  tagline: 'BazZziliuS',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://your-docusaurus-site.example.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'BazZziliuS', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'ru',
    locales: ['en'],
  },

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
        },
        blog: {
          routeBasePath: '/',
          showReadingTime: true,
          blogSidebarCount: 'ALL',
          blogSidebarTitle: 'Другие посты',
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
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: '',
        logo: {
          alt: 'Лого',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'dropdown',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: '✍️ Блог',
            items: [
              {label: 'Главная', to: '/'},
              {label: 'Все по годам', to: 'archive'},
            ],
          },
          {
            type: 'dropdown',
            label: '🙃 Не блог',
            position: 'left',
            items: [
              {label: '📦 Куча полезностей', type: 'doc', docId: 'intro'},
              {label: '👤 Обо мне', to: 'about'},
              {label: '✈️ Боты', to: 'docs/bots'},
            ],
          },
          {
            href: 'https://github.com/BazZziliuS/docusaurus',
            position: 'right',
            className: "header-github-link",
            "aria-label": "GitHub repository",
          },
        ],
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['python', 'bash', 'lua'],
      },
			algolia: {
				appId: "QEC31FXAWB",
				apiKey: "5cd6537db1f15927e3df9a683a50642d",
				indexName: "bazzzilius",
			},
    }),
};

export default config;
