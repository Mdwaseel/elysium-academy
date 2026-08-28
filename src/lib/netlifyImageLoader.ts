/**
 * Custom next/image loader for Netlify.
 *
 * A static export (`output: "export"`) has no Next.js image optimizer at
 * runtime, so without a loader every image would ship at full size. Netlify's
 * Image CDN covers the same ground — it resizes on the fly and negotiates
 * WebP/AVIF from the Accept header — so we point the loader at it.
 *
 * The endpoint only exists on a deployed Netlify site, so local dev and any
 * other host fall back to the raw file.
 */

type LoaderArgs = {
  src: string;
  width: number;
  quality?: number;
};

export default function netlifyImageLoader({ src, width, quality }: LoaderArgs): string {
  // Remote URLs are already absolute; hand them back untouched.
  if (src.startsWith("http://") || src.startsWith("https://")) {
    return src;
  }

  // No Image CDN outside a Netlify production build.
  if (process.env.NODE_ENV !== "production") {
    return src;
  }

  const params = new URLSearchParams({
    url: src,
    w: String(width),
    q: String(quality ?? 75),
  });

  return `/.netlify/images?${params.toString()}`;
}
