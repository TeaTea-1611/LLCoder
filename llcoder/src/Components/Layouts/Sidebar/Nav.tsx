import { NavLink } from "react-router-dom";
import { NavItems } from "./Items";

function Nav() {
  return (
    <nav className="m-auto">
      <ul className="space-y-4">
        {NavItems.map((item) => {
          return (
            <li key={item.path} className="space-y-2">
              <NavLink
                to={item.path}
                className={(nav) => {
                  if (nav.isActive)
                    return `group flex space-x-4 items-center lg:text-sm lg:leading-6 font-semibold text-sky-500 dark:text-sky-400`;
                  return `group flex space-x-4 items-center lg:text-sm lg:leading-6 font-medium text-slate-700 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300`;
                }}
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
              {item?.children?.length && (
                <ul className="space-y-6 lg:space-y-2 border-l border-slate-100 dark:border-slate-800">
                  {item.children?.map((iChil) => (
                    <li key={iChil.path}>
                      <NavLink
                        to={iChil.path}
                        className={(nav) => {
                          if (nav.isActive)
                            return `block border-l pl-4 -ml-px text-sky-500 border-current font-semibold dark:text-sky-400`;
                          return `block border-l pl-4 -ml-px border-transparent hover:border-slate-400 dark:hover:border-slate-500 text-slate-700 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300`;
                        }}
                      >
                        <span>{iChil.label}</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Nav;
