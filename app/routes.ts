import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/Dashboard.tsx"),
  route("login", "routes/auth/Login.tsx"),
  route("register", "routes/auth/Register.tsx"),
  route("reset", "routes/auth/Reset.tsx"),
] satisfies RouteConfig;
