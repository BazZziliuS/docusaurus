const React = require('react');
const {readFileSync} = require('fs');
const {join} = require('path');

const h = React.createElement;

const FONTS_DIR = join(__dirname, '../static/fonts');

const fonts = [
    {
        name: 'Inter',
        data: readFileSync(join(FONTS_DIR, 'Inter-Regular.ttf')),
        weight: 400,
        style: 'normal',
    },
    {
        name: 'Inter',
        data: readFileSync(join(FONTS_DIR, 'Inter-Bold.ttf')),
        weight: 700,
        style: 'normal',
    },
];

const satoriOptions = {
    width: 1200,
    height: 630,
    fonts,
};

function renderCard({title, description, tags}) {
    const displayTitle = title || 'Блог Cloudea';
    const displayDescription = description || '';
    const displayTags = (tags || []).slice(0, 4);

    return h('div', {
        style: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '100%',
            height: '100%',
            backgroundColor: '#0f0f23',
            padding: '60px',
            fontFamily: 'Inter',
            position: 'relative',
            overflow: 'hidden',
        },
    }, [
        // Gradient accent (top-right)
        h('div', {
            key: 'gradient',
            style: {
                position: 'absolute',
                top: '-100px',
                right: '-100px',
                width: '500px',
                height: '500px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(33,150,243,0.15) 0%, transparent 70%)',
            },
        }),
        // Gradient accent (bottom-left)
        h('div', {
            key: 'gradient2',
            style: {
                position: 'absolute',
                bottom: '-150px',
                left: '-100px',
                width: '400px',
                height: '400px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(156,39,176,0.1) 0%, transparent 70%)',
            },
        }),
        // Top: site name
        h('div', {
            key: 'header',
            style: {
                display: 'flex',
                alignItems: 'center',
                fontSize: '20px',
                color: '#6a6a8a',
                fontWeight: 400,
                letterSpacing: '0.5px',
            },
        }, 'blog.cloudea.org'),
        // Middle: title + description
        h('div', {
            key: 'content',
            style: {
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                justifyContent: 'center',
                gap: '20px',
            },
        }, [
            h('div', {
                key: 'title',
                style: {
                    fontSize: displayTitle.length > 60 ? '42px' : '52px',
                    fontWeight: 700,
                    color: '#ffffff',
                    lineHeight: 1.2,
                    letterSpacing: '-0.5px',
                    overflow: 'hidden',
                },
            }, displayTitle),
            displayDescription ? h('div', {
                key: 'desc',
                style: {
                    fontSize: '22px',
                    color: '#a0a0b8',
                    lineHeight: 1.4,
                    overflow: 'hidden',
                },
            }, displayDescription.length > 120
                ? displayDescription.slice(0, 117) + '...'
                : displayDescription) : null,
        ]),
        // Bottom: tags
        displayTags.length > 0
            ? h('div', {
                key: 'tags',
                style: {
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '10px',
                },
            }, displayTags.map((tag, i) =>
                h('div', {
                    key: `tag-${i}`,
                    style: {
                        backgroundColor: 'rgba(33,150,243,0.12)',
                        color: '#7ab4f5',
                        padding: '6px 16px',
                        borderRadius: '20px',
                        fontSize: '16px',
                        fontWeight: 400,
                        border: '1px solid rgba(33,150,243,0.2)',
                    },
                }, `#${typeof tag === 'object' ? tag.label : tag}`)
            ))
            : null,
    ]);
}

/** @type {import('@acid-info/docusaurus-og').ImageRenderer} */
const blogRenderer = (data) => {
    if (data.pageType !== 'post') return false;

    const {metadata} = data.data;
    const tags = metadata.tags || [];

    return [
        renderCard({
            title: metadata.title,
            description: metadata.description,
            tags,
        }),
        satoriOptions,
    ];
};

/** @type {import('@acid-info/docusaurus-og').ImageRenderer} */
const docsRenderer = (data) => {
    if (!data.metadata || !data.metadata.title) return false;

    return [
        renderCard({
            title: data.metadata.title,
            description: data.metadata.description,
            tags: [],
        }),
        satoriOptions,
    ];
};

module.exports = {blogRenderer, docsRenderer};
