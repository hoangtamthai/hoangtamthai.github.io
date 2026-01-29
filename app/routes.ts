import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("blog", "routes/blog.tsx"),
  route("blog/:year/:month/:day/:slug", "routes/blog-post.tsx"),
  route("rss.xml", "routes/rss.tsx"),
] satisfies RouteConfig;
