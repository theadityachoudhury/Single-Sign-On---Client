import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
  index("routes/Dashboard.tsx"),
  ...prefix("auth", [
    index("routes/auth/index.tsx"),
    layout("components/layout/Auth.tsx", [
      route("login", "routes/auth/Login.tsx"),
      route("register", "routes/auth/Register.tsx"),
      route("reset", "routes/auth/Reset.tsx"),
    ])])
] satisfies RouteConfig;
