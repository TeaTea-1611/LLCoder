import {
  Home,
  Exercises,
  CreateExercise,
  ExercisesNotConfirmed,
  Codepad,
  AboutMe,
  Exams,
  Members,
  Blogs,
  CreateBlog,
  BlogsNotConfirmed,
  Blog,
  PageNotFound,
  Exercise,
} from "../pages";
import config from "../config";

interface IRoute {
  path: string;
  component: any;
  auth?: "R0" | "R1" | "R2" | "R3" | "R4";
}

const pageRoutes: IRoute[] = [
  { path: config.routes.home, component: Home },
  { path: config.routes.exercises, component: Exercises },
  { path: config.routes.exercise, component: Exercise },
  {
    path: config.routes.createExercise,
    component: CreateExercise,
    // auth: "R4",
  },
  {
    path: config.routes.exercisesNotConfirmed,
    component: ExercisesNotConfirmed,
    auth: "R1",
  },
  { path: config.routes.codepad, component: Codepad },
  { path: config.routes.aboutMe, component: AboutMe },
  { path: config.routes.exams, component: Exams },
  { path: config.routes.members, component: Members },
  { path: config.routes.blog, component: Blog },
  { path: config.routes.blogs, component: Blogs },
  { path: config.routes.createBlog, component: CreateBlog, auth: "R4" },
  {
    path: config.routes.blogsNotConfirmed,
    component: BlogsNotConfirmed,
    auth: "R1",
  },
  { path: config.routes.pageNotFound, component: PageNotFound },
];

export { pageRoutes };
