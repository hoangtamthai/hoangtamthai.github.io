import type { Config } from "@react-router/dev/config";
import { getAllBlogPosts } from "./app/lib/blog";
import { vercelPreset } from "@vercel/react-router/vite";
export default {
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: true,
  async prerender() {
    const paths = ["/", "/blog", "/rss.xml"];
    const posts = await getAllBlogPosts();
    const postPaths = posts.map(
      (p) => `/blog/${p.year}/${p.month}/${p.day}/${p.slug}`,
    );

    return [...paths, ...postPaths];
  },
  presets: [vercelPreset()],
} satisfies Config;
