import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductLink } from "../../utils/slugify";
import Button from "../../ui/Button/Button";
import { getDiscountPercent, priceFormatting } from "../../utils/price";
import { addToCart } from "../../utils/redux/slices/cartSlice";
import clsx from "clsx";
import { makeSelectIsProductInCart } from "../../utils/redux/selectors";

const ProductCard = React.memo(({ product }) => {
  const { id, image, title, categoryId, price, discont_price } = product;
  const categories = useSelector((state) => state.categories.data);
  const selectIsInCart = React.useMemo(
    () => makeSelectIsProductInCart(id),
    [id]
  );
  const isInCart = useSelector(selectIsInCart);
  const dispatch = useDispatch();

  const productLink = getProductLink({ id, title, categoryId }, categories);

  const sale = getDiscountPercent(price, discont_price);

  return (
    <Link
      to={productLink}
      className={clsx(
        "transition-transform duration-300 hover:scale-105 hover:-translate-y-2 active:scale-105 active:-translate-y-2 w-full flex flex-col rounded-xl relative gap-4 group  border border-light-grey",
        { "opacity-50": isInCart }
      )}
    >
      <img
        src={image}
        alt={title}
        className="h-[200px] md:h-[280px] object-contain object-center border-b border-light-grey"
      />
      <div className="px-4 pb-4 md:px-8 md:pb-8 flex flex-col">
        <h3 className="truncate">{title}</h3>
        {sale ? (
          <div className="flex items-end">
            <p className="font-semibold text-[40px] mr-4">
              {priceFormatting(discont_price)}
            </p>
            <p className="text-main-grey line-through mb-0.5">
              {priceFormatting(price)}
            </p>
          </div>
        ) : (
          <p className="font-semibold text-3xl md:text-[40px] mr-4">
            {priceFormatting(price)}
          </p>
        )}
      </div>
      {sale > 0 && (
        <span className="absolute top-4 right-4 px-2 py-1 bg-main-blue text-main-white rounded-md">
          {`-${sale}%`}
        </span>
      )}
      <Button
        className={clsx(
          "absolute top-[140px] md:top-[210px] left-4 right-4 w-auto opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10",
          { "opacity-100!": isInCart }
        )}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          dispatch(addToCart(product));
        }}
        variant={isInCart ? "addedDisabled" : "default"}
      >
        {isInCart ? "Added" : "Add to cart"}
      </Button>
    </Link>
  );
});

export default ProductCard;
