import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout("routes/_layout.tsx", [
    index("routes/_index.tsx"),
    route("community", "routes/community.tsx"),
    route("home", "routes/home.tsx"),
  ]),
] satisfies RouteConfig;
