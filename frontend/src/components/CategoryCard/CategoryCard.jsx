import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes";
import { getCategorySlug } from "../../utils/slugify";

const CategoryCard = React.memo(({ category }) => {
  const { image, title } = category;
  const slugTitle = getCategorySlug(title);
  return (
    <Link
      className="transition-transform duration-300 hover:scale-105 hover:-translate-y-2 active:scale-105 active:-translate-y-2 w-max flex flex-col items-center"
      to={`${ROUTES.CATEGORIES}/${slugTitle}`}
    >
      <img src={image} className="h-[240px] md:h-[350px] mb-4" alt={title} />
      <h3 className="text-center">{title}</h3>
    </Link>
  );
});

export default CategoryCard;
