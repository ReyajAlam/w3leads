import sanitizeHtml from 'sanitize-html';

interface ArticleContentProps {
  htmlContent: string;
}

/** Sanitized WP post content rendered with prose typography */
export function ArticleContent({ htmlContent }: ArticleContentProps) {
  const cleanHtml = sanitizeHtml(htmlContent, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([
      'img', 'figure', 'figcaption', 'iframe', 'video', 'source',
      'table', 'thead', 'tbody', 'tr', 'th', 'td',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'details', 'summary', 'mark', 'del', 'ins',
    ]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ['src', 'alt', 'width', 'height', 'loading', 'decoding', 'srcset', 'sizes', 'class'],
      a: ['href', 'target', 'rel', 'title'],
      iframe: ['src', 'width', 'height', 'frameborder', 'allow', 'allowfullscreen', 'title'],
      video: ['src', 'controls', 'width', 'height', 'poster'],
      source: ['src', 'type'],
      td: ['colspan', 'rowspan'],
      th: ['colspan', 'rowspan', 'scope'],
      figure: ['class'],
      '*': ['id', 'class'],
    },
    allowedIframeHostnames: ['www.youtube.com', 'player.vimeo.com'],
    transformTags: {
      a: (tagName, attribs) => {
        const isExternal = attribs.href?.startsWith('http');
        return {
          tagName,
          attribs: {
            ...attribs,
            ...(isExternal && {
              target: '_blank',
              rel: 'noopener noreferrer',
            }),
          },
        };
      },
    },
  });

  return (
    <div
      className="prose mx-auto"
      dangerouslySetInnerHTML={{ __html: cleanHtml }}
    />
  );
}
