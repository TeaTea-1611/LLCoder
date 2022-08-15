import { Home, Exercises, Codepad } from "../Pages";

// layout number | string (0 | 1 | 2)
const publicRoutes = [
  { path: "/", component: Home },
  { path: "/exercises", component: Exercises },
  { path: "/codepad", component: Codepad },
];

export { publicRoutes };
