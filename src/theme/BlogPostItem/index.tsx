import React, {type ReactNode} from 'react';
import BlogPostItem from '@theme-original/BlogPostItem';
import type BlogPostItemType from '@theme/BlogPostItem';
import type {WrapperProps} from '@docusaurus/types';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import Head from '@docusaurus/Head';

type Props = WrapperProps<typeof BlogPostItemType>;

export default function BlogPostItemWrapper(props: Props): ReactNode {
  const {metadata, frontMatter, isBlogPostPage} = useBlogPost();

  // Добавляем JSON-LD только на странице блог-поста (не в списках)
  const shouldAddStructuredData = isBlogPostPage;

  // JSON-LD structured data для BlogPosting
  const structuredData = shouldAddStructuredData ? {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: metadata.title,
    description: metadata.description || frontMatter.description || metadata.title,
    image: frontMatter.image
      ? `https://blog.cloudea.org${frontMatter.image}`
      : 'https://blog.cloudea.org/img/og-default.png',
    datePublished: metadata.date,
    dateModified: metadata.lastUpdatedAt || metadata.date,
    author: {
      '@type': 'Person',
      name: metadata.authors?.[0]?.name || 'BazZziliuS',
      url: metadata.authors?.[0]?.url || 'https://blog.cloudea.org/bazzzilius',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Блог Cloudea',
      logo: {
        '@type': 'ImageObject',
        url: 'https://blog.cloudea.org/img/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://blog.cloudea.org${metadata.permalink}`,
    },
    keywords: frontMatter.keywords?.join(', '),
  } : null;

  // Breadcrumbs structured data
  const breadcrumbStructuredData = shouldAddStructuredData ? {
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
        name: metadata.title,
        item: `https://blog.cloudea.org${metadata.permalink}`,
      },
    ],
  } : null;

  return (
    <>
      {shouldAddStructuredData && (
        <Head>
          <script type="application/ld+json">
            {JSON.stringify(structuredData)}
          </script>
          <script type="application/ld+json">
            {JSON.stringify(breadcrumbStructuredData)}
          </script>
        </Head>
      )}
      <BlogPostItem {...props} />
    </>
  );
}
