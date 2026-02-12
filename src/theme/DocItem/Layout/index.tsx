import React, {type ReactNode} from 'react';
import Layout from '@theme-original/DocItem/Layout';
import type LayoutType from '@theme/DocItem/Layout';
import type {WrapperProps} from '@docusaurus/types';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import Head from '@docusaurus/Head';

type Props = WrapperProps<typeof LayoutType>;

export default function LayoutWrapper(props: Props): ReactNode {
  const {metadata, frontMatter} = useDoc();

  // Breadcrumbs structured data для документации
  const breadcrumbStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Главная',
        item: 'https://blog.cloudea.org',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Документация',
        item: 'https://blog.cloudea.org/docs',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: metadata.title,
        item: `https://blog.cloudea.org${metadata.permalink}`,
      },
    ],
  };

  // Article structured data для документов
  const articleStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: metadata.title,
    description: frontMatter.description || metadata.title,
    author: {
      '@type': 'Person',
      name: 'BazZziliuS',
      url: 'https://blog.cloudea.org/bazzzilius',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Блог Cloudea',
      logo: {
        '@type': 'ImageObject',
        url: 'https://blog.cloudea.org/img/logo.png',
      },
    },
    dateModified: metadata.lastUpdatedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://blog.cloudea.org${metadata.permalink}`,
    },
    keywords: frontMatter.keywords?.join(', '),
  };

  return (
    <>
      <Head>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbStructuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(articleStructuredData)}
        </script>
      </Head>
      <Layout {...props} />
    </>
  );
}
