import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
  index("routes/Dashboard.tsx"),
  
  // Resource routes for SEO
  route("robots.txt", "routes/robots.txt.ts"),
  route("sitemap.xml", "routes/sitemap.xml.ts"),
  
  ...prefix("auth", [
    index("routes/auth/index.tsx"),
    layout("components/layout/Auth.tsx", [
      route("login", "routes/auth/Login/Login.tsx"),
      route("register", "routes/auth/Register/Register.tsx"),
      route("reset", "routes/auth/Reset/Reset.tsx"),
    ])])
] satisfies RouteConfig;
