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
} from "../pages";
import config from "../config";

const pageRoutes = [
  { path: config.routes.home, component: Home },
  { path: config.routes.exercises, component: Exercises },
  {
    path: config.routes.createExercise,
    component: CreateExercise,
    private: true,
  },
  {
    path: config.routes.exercisesNotConfirmed,
    component: ExercisesNotConfirmed,
  },
  { path: config.routes.codepad, component: Codepad },
  { path: config.routes.aboutMe, component: AboutMe },
  { path: config.routes.exams, component: Exams },
  { path: config.routes.members, component: Members },

  { path: config.routes.blog, component: Blog },
  { path: config.routes.blogs, component: Blogs },
  { path: config.routes.createBlog, component: CreateBlog, private: true },
  { path: config.routes.blogsNotConfirmed, component: BlogsNotConfirmed },
];

export { pageRoutes };
