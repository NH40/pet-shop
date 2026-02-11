import React, { useEffect } from "react";
import Title from "../../ui/Title/Title";
import BreadCrumbs from "../../ui/BreadCrumbs/BreadCrumbs";
import ErrorInfo from "../../components/ErrorInfo/ErrorInfo";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import ListCards from "../../components/ListCards/ListCards";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCategories } from "../../utils/redux/slices/categoriesSlice";
import { ROUTES, getLinkFromRoute } from "../../utils/routes";

const CategoriesPage = () => {
  const { data, loading, error } = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const titleOfPage = getLinkFromRoute(ROUTES.CATEGORIES).label;

  useEffect(() => {
    if (!data.length) {
      dispatch(fetchAllCategories());
    }
  }, [data.length, dispatch]);

  return (
    <div className="mb-14 md:mb-28">
      <BreadCrumbs />
      <Title className="mb-[var(--m-bottom-title-xs)] md:mb-[var(--m-bottom-title-md)]">
        {titleOfPage}
      </Title>
      {error ? (
        <ErrorInfo />
      ) : (
        <ListCards loading={loading} skeletonCount={8}>
          {data.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </ListCards>
      )}
    </div>
  );
};

export default CategoriesPage;
