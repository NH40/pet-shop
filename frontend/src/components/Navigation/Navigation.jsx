import { NavLink, useLocation } from "react-router-dom";
import { LINKS } from "../../utils/routes.js";
import clsx from "clsx";

const Navigation = ({ className = "" }) => {
  const location = useLocation();

  return (
    <nav className={className}>
      {LINKS.map(({ to, label, customActiveCheck }) => {
        const isActiveCustom = customActiveCheck
          ? customActiveCheck(location.pathname)
          : null;

        return (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              clsx(
                "hover:text-main-blue hover:-translate-y-0.5 active:text-main-blue active:scale-95 transition-all duration-300 w-max",
                (isActive && !customActiveCheck) || isActiveCustom
                  ? "text-main-blue"
                  : "text-main-black"
              )
            }
          >
            {label}
          </NavLink>
        );
      })}
    </nav>
  );
};

export default Navigation;
