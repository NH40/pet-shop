import React from "react";
import { useLocation } from "react-router-dom";
import { ROUTES, LINKS, getLinkFromRoute } from "../../utils/routes.js";
import { useSelector } from "react-redux";
import CrumbButton from "./CrumbButton/CrumbButton.jsx";
import { getCategoryBySlug } from "../../utils/slugify.js";
import Divider from "../Divider/Divider.jsx";

const BreadCrumbs = () => {
  const location = useLocation();
  const { data: categories } = useSelector((state) => state.categories);
  const { current: currentProduct } = useSelector((state) => state.products);

  const pathnames = location.pathname.split("/").filter(Boolean);
  const mainPage = getLinkFromRoute(ROUTES.MAIN);

  return (
    <nav className="flex flex-wrap gap-y-2 items-center w-full  overflow-x-auto mb-[var(--m-bottom-title-xs)] md:mb-[var(--m-bottom-title-md)]">
      <CrumbButton to={mainPage.to}>{mainPage.label}</CrumbButton>
      <Divider className="w-4!" />
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;

        const linkMatch = LINKS.find(
          (link) => link.to.toLowerCase() === to.toLowerCase()
        );

        const reqCategory = getCategoryBySlug(categories, value);

        const label =
          linkMatch?.label ||
          reqCategory?.title ||
          currentProduct?.title ||
          value;

        return (
          <React.Fragment key={to}>
            <CrumbButton to={to} isLast={isLast}>
              {label}
            </CrumbButton>
            {!isLast && <Divider className="w-4!" />}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default BreadCrumbs;
