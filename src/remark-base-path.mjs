import { visit } from 'unist-util-visit';

/**
 * Remark plugin that prepends the configured base path to internal links and images
 * in markdown content. This handles the case where markdown files reference local
 * assets like /documents/foo.pdf or /images/bar.jpg which need the base path prefix
 * when deployed to a subdirectory (e.g. GitHub Pages at /msnakorabe/).
 */
export function remarkBasePath() {
  const base = (process.env.BASE_PATH || '/').replace(/\/$/, '');

  return (tree) => {
    if (!base || base === '') return;

    visit(tree, (node) => {
      // Rewrite links: [text](/documents/foo.pdf) → [text](/msnakorabe/documents/foo.pdf)
      if (node.type === 'link' && node.url?.startsWith('/')) {
        node.url = `${base}${node.url}`;
      }
      // Rewrite images: ![alt](/images/foo.jpg) → ![alt](/msnakorabe/images/foo.jpg)
      if (node.type === 'image' && node.url?.startsWith('/')) {
        node.url = `${base}${node.url}`;
      }
    });
  };
}
