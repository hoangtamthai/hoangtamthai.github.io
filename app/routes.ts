import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("log", "routes/log.tsx"),
  route("log/:year/:month/:day/:slug", "routes/blog-post.tsx"),
] satisfies RouteConfig;
