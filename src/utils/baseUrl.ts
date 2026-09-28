/**
 * Helper utility to convert relative/absolute static asset paths
 * to use Vite's import.meta.env.BASE_URL so that images, videos, and PDFs
 * resolve correctly when deployed on subpath domains (e.g., GitHub Pages /Yogesh/).
 */
export const getAssetUrl = (path: string): string => {
  if (!path) return path;
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  const base = import.meta.env.BASE_URL || '/';
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return base.endsWith('/') ? `${base}${cleanPath}` : `${base}/${cleanPath}`;
};
