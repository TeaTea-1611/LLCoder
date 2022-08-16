import {
  Home,
  Exercises,
  CreateExercisePage,
  Codepad,
  AboutMe,
  Exams,
  Members,
} from "../pages";
import config from "../config";

const publicRoutes = [
  { path: config.routes.home, component: Home },
  { path: config.routes.exercises, component: Exercises },
  { path: config.routes.createExercise, component: CreateExercisePage },
  { path: config.routes.codepad, component: Codepad },
  { path: config.routes.aboutMe, component: AboutMe },
  { path: config.routes.exams, component: Exams },
  { path: config.routes.members, component: Members },
];

export { publicRoutes };
