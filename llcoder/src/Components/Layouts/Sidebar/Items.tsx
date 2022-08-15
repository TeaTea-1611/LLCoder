import { GoHome } from "react-icons/go";
import { BiBookBookmark } from "react-icons/bi";
import { DiCodeBadge } from "react-icons/di";
import { FiUsers } from "react-icons/fi";
import { FaGraduationCap } from "react-icons/fa";
import { SiAboutdotme } from "react-icons/si";

export const NavItems = [
  {
    path: "/",
    label: "Home",
    icon: <GoHome size={18} />,
  },
  {
    path: "/exercises",
    label: "Exercises",
    icon: <BiBookBookmark size={18} />,
  },
  {
    path: "/codepad",
    label: "Codepad",
    icon: <DiCodeBadge size={18} />,
  },
  {
    path: "/members",
    label: "Members",
    icon: <FiUsers size={18} />,
  },
  {
    path: "exams",
    label: "Exams",
    icon: <FaGraduationCap size={18} />,
  },
  {
    path: "/about-me",
    label: "About me",
    icon: <SiAboutdotme size={18} />,
  },
];
