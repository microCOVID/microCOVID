import MarkdownIt from 'markdown-it'
import markdownItFootnote from 'markdown-it-footnote'
import markdownItHeadings from 'markdown-it-github-headings'
import markdownItLinkAttributes from 'markdown-it-link-attributes'

export const processor = new MarkdownIt({
  html: true,
})
  .use(markdownItFootnote)
  .use(markdownItHeadings, {
    prefixHeadingIds: false,
  })
  .use(markdownItLinkAttributes, {
    pattern: /^https:/,
    attrs: {
      target: '_blank',
      rel: 'noopener',
    },
  })

/**
 * Strips the html tags from an html string, returning plain text.
 */
export const metaContent = (htmlContent: string): string => {
  const tmp = document.createElement('DIV')
  tmp.innerHTML = htmlContent
  return tmp.textContent || tmp.innerText || ''
}
