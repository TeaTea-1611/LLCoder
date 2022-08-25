import { GoHome } from "react-icons/go";
import { BiBookBookmark } from "react-icons/bi";
import { DiCodeBadge } from "react-icons/di";
import { FiUsers } from "react-icons/fi";
import { FaGraduationCap, FaRegNewspaper } from "react-icons/fa";
import { SiAboutdotme } from "react-icons/si";
import { FormattedMessage } from "react-intl";

export const NavItems = [
  {
    path: "/",
    label: <FormattedMessage id="sidebar-nav.home" />,
    icon: <GoHome size={18} />,
  },
  {
    path: "/exercises",
    label: <FormattedMessage id="sidebar-nav.exercises" />,
    icon: <BiBookBookmark size={18} />,
    children: [
      {
        path: "/exercises/create",
        label: <FormattedMessage id="sidebar-nav.create-exercise" />,
      },
      {
        path: "/exercises/not-confirmed",
        label: <FormattedMessage id="sidebar-nav.exercises-not-confirmed" />,
      },
    ],
  },
  {
    path: "/codepad",
    label: "Codepad",
    icon: <DiCodeBadge size={18} />,
  },
  {
    path: "/members",
    label: <FormattedMessage id="sidebar-nav.members" />,
    icon: <FiUsers size={18} />,
  },
  {
    path: "/exams",
    label: <FormattedMessage id="sidebar-nav.exams" />,
    icon: <FaGraduationCap size={18} />,
  },
  {
    path: "/about-me",
    label: <FormattedMessage id="sidebar-nav.about-me" />,
    icon: <SiAboutdotme size={18} />,
  },
  {
    path: "/blogs",
    label: <FormattedMessage id="sidebar-nav.blogs" />,
    icon: <FaRegNewspaper size={18} />,
    children: [
      {
        path: "/blogs/create",
        label: <FormattedMessage id="sidebar-nav.create-blog" />,
      },
      {
        path: "/blogs/not-confirmed",
        label: <FormattedMessage id="sidebar-nav.blogs-not-confirmed" />,
      },
    ],
  },
];
