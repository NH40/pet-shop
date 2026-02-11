import React, { useEffect } from "react";
import BreadCrumbs from "../../ui/BreadCrumbs/BreadCrumbs";
import {
  fetchProductById,
  setCurrentProduct,
} from "../../utils/redux/slices/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getIdFromSlug } from "../../utils/slugify";
import { getDiscountPercent, priceFormatting } from "../../utils/price";
import CartButton from "../../ui/CartButton/CartButton";
import Button from "../../ui/Button/Button";
import ProductDescription from "./ProductDescription/ProductDescription";
import ImageBlock from "./ImageBlock/ImageBlock";
import SkeletonProductPage from "./SkeletonProductPage/SkeletonProductPage";
import ErrorInfo from "../../components/ErrorInfo/ErrorInfo";
import { makeSelectCartItemById } from "../../utils/redux/selectors";
import {
  addToCart,
  updateQuantity,
  removeFromCart,
} from "../../utils/redux/slices/cartSlice";
import NotFoundPage from "../NotFoundPage/NotFoundPage";

const isValidProduct = (product) => {
  return product && typeof product.price === "number";
};

const ProductPage = () => {
  const dispatch = useDispatch();
  const { productSlug } = useParams();
  const {
    data: products,
    current,
    loading,
    error,
  } = useSelector((state) => state.products);

  const id = getIdFromSlug(productSlug);

  useEffect(() => {
    if (!id) return;
    if (!products.length) {
      dispatch(fetchProductById(id));
    } else {
      const product = products.find((p) => p.id === id);
      if (product) {
        dispatch(setCurrentProduct(product));
      }
    }
  }, [products, productSlug, dispatch, id]);

  const sale = getDiscountPercent(current?.price, current?.discont_price);

  // WORKING WITH CART
  const selectCartItem = React.useMemo(
    () => (current?.id ? makeSelectCartItemById(current.id) : () => undefined),
    [current?.id]
  );
  const cartItem = useSelector(selectCartItem);
  const quantity = cartItem?.quantity ?? 0;
  const isInCart = Boolean(cartItem);

  if (error) {
    return <ErrorInfo />;
  }

  if (!id) {
    return <NotFoundPage />;
  }

  return (
    <div className="mb-10 lg:mb-20">
      <BreadCrumbs />

      {!isValidProduct(current) || loading ? (
        <SkeletonProductPage />
      ) : (
        <div className="flex flex-col lg:flex-row lg:gap-8 w-full items-start">
          <ImageBlock image={current?.image} />

          <div className="w-full lg:w-[45%] flex flex-col gap-6 items-center lg:items-start">
            <h2 className="font-bold text-[24px] md:text-[40px] text-center lg:text-left">
              {current?.title}
            </h2>

            <div className="relative flex items-end w-max">
              {sale > 0 ? (
                <>
                  <span className="font-bold text-[36px] md:text-[64px] leading-none mr-4 lg:mr-8">
                    {priceFormatting(current?.discont_price)}
                  </span>
                  <span className="text-[24px] md:text-[40px] text-main-grey line-through leading-tight mr-2 lg:mr-4">
                    {priceFormatting(current?.price)}
                  </span>
                  <span className="self-start px-2 py-1 bg-main-blue text-white rounded-md text-sm md:text-base">
                    {`-${sale}%`}
                  </span>
                </>
              ) : (
                <span className="font-bold text-[36px] md:text-[64px] leading-none">
                  {priceFormatting(current?.price)}
                </span>
              )}
            </div>

            <div className="flex w-full flex-col lg:flex-row gap-4 lg:gap-8 items-center">
              <CartButton
                quantity={quantity}
                onAdd={() => {
                  if (isInCart) {
                    dispatch(
                      updateQuantity({ id: current.id, quantity: quantity + 1 })
                    );
                  } else {
                    dispatch(addToCart(current));
                  }
                }}
                onSubtract={() => {
                  if (quantity > 1) {
                    dispatch(
                      updateQuantity({ id: current.id, quantity: quantity - 1 })
                    );
                  } else {
                    dispatch(removeFromCart(current.id));
                  }
                }}
              />
              <Button
                className="w-full md:max-w-[300px]"
                onClick={() => {
                  if (isInCart) {
                    dispatch(removeFromCart(current.id));
                  } else {
                    dispatch(addToCart(current));
                  }
                }}
                variant={isInCart ? "addedActive" : "default"}
              >
                {isInCart ? "Remove from cart" : "Add to cart"}
              </Button>
            </div>

            <ProductDescription text={current?.description} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
