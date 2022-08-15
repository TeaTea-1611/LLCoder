import { NavLink } from "react-router-dom";
import { NavItems } from "./Items";

function Nav() {
  return (
    <nav className="m-auto">
      <ul>
        {NavItems.map((item) => {
          return (
            <li key={item.path} className="">
              <NavLink
                className={(nav) =>
                  `flex items-center lg:text-sm lg:leading-6 mb-4 font-semibold space-x-3${
                    nav.isActive ? " text-primary" : ""
                  }`
                }
                to={item.path}
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Nav;
