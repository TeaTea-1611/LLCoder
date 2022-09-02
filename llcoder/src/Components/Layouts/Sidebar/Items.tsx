import { GoHome } from "react-icons/go";
import { BiBookBookmark } from "react-icons/bi";
import { DiCodeBadge } from "react-icons/di";
import { FiUsers } from "react-icons/fi";
import { FaGraduationCap, FaRegNewspaper } from "react-icons/fa";
import { SiAboutdotme } from "react-icons/si";
import { FormattedMessage } from "react-intl";
import config from "../../../config";

export const NavItems = [
  {
    path: config.routes.home,
    label: <FormattedMessage id="sidebar-nav.home" />,
    icon: <GoHome size={18} />,
  },
  {
    path: config.routes.exercises,
    label: <FormattedMessage id="sidebar-nav.exercises" />,
    icon: <BiBookBookmark size={18} />,
    children: [
      {
        path: config.routes.createExercise,
        label: <FormattedMessage id="sidebar-nav.create-exercise" />,
      },
      {
        path: config.routes.exercisesNotConfirmed,
        label: <FormattedMessage id="sidebar-nav.exercises-not-confirmed" />,
      },
    ],
  },
  {
    path: config.routes.codepad,
    label: "Codepad",
    icon: <DiCodeBadge size={18} />,
  },
  {
    path: config.routes.members,
    label: <FormattedMessage id="sidebar-nav.members" />,
    icon: <FiUsers size={18} />,
  },
  {
    path: config.routes.exams,
    label: <FormattedMessage id="sidebar-nav.exams" />,
    icon: <FaGraduationCap size={18} />,
  },
  {
    path: config.routes.aboutMe,
    label: <FormattedMessage id="sidebar-nav.about-me" />,
    icon: <SiAboutdotme size={18} />,
  },
  {
    path: config.routes.blogs,
    label: <FormattedMessage id="sidebar-nav.blogs" />,
    icon: <FaRegNewspaper size={18} />,
    children: [
      {
        path: config.routes.createBlog,
        label: <FormattedMessage id="sidebar-nav.create-blog" />,
      },
      {
        path: config.routes.blogsNotConfirmed,
        label: <FormattedMessage id="sidebar-nav.blogs-not-confirmed" />,
      },
    ],
  },
];
