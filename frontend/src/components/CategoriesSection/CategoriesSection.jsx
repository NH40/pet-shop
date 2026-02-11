import CategoryCard from "../CategoryCard/CategoryCard";
import ListCards from "../ListCards/ListCards";
import ErrorInfo from "../ErrorInfo/ErrorInfo";
import TitleWithCrumbButton from "../../ui/TitleWithCrumbButton/TitleWithCrumbButton";
import { fetchAllCategories } from "../../utils/redux/slices/categoriesSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { ROUTES } from "../../utils/routes";

const VISIBLE_CATEGORIES = 4;

const CategoriesSection = () => {
  const { data, loading, error } = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!data.length) {
      dispatch(fetchAllCategories());
    }
  }, [dispatch, data.length]);

  return (
    <section>
      <TitleWithCrumbButton
        title={"Categories"}
        to={ROUTES.CATEGORIES}
        buttonTitle={"All categories"}
      />

      {error ? (
        <ErrorInfo />
      ) : (
        <ListCards loading={loading} skeletonCount={8}>
          {data.slice(0, VISIBLE_CATEGORIES).map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </ListCards>
      )}
    </section>
  );
};

export default CategoriesSection;
