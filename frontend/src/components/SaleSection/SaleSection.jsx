import React, { useEffect, useMemo, useState } from "react";
import TitleWithCrumbButton from "../../ui/TitleWithCrumbButton/TitleWithCrumbButton";
import ListCards from "../ListCards/ListCards";
import ProductCard from "../ProductCard/ProductCard";
import { ROUTES } from "../../utils/routes";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../../utils/redux/slices/productsSlice";
import { selectDiscountedProducts } from "../../utils/redux/selectors";

const SaleSection = () => {
  const { data, loading, error } = useSelector((state) => state.products);
  const discounted = useSelector(selectDiscountedProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!data.length) {
      dispatch(fetchAllProducts());
    }
  }, [dispatch, data.length]);

  const [shuffled, setShuffled] = useState([]);

  useEffect(() => {
    const randomItems = [...discounted]
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);
    setShuffled(randomItems);
  }, [discounted]);

  return (
    <section>
      <TitleWithCrumbButton
        title={"Sale"}
        to={ROUTES.SALES}
        buttonTitle={"All sales"}
      />
      {error ? (
        <ErrorInfo />
      ) : (
        <ListCards loading={loading} skeletonCount={4}>
          {shuffled.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ListCards>
      )}
    </section>
  );
};

export default SaleSection;
