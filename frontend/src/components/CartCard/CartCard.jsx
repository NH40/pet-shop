import React from "react";
import CartButton from "../../ui/CartButton/CartButton";
import {
  removeFromCart,
  updateQuantity,
} from "../../utils/redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import closeImg from "../../assets/close-dark.svg";
import { getDiscountPercent, priceFormatting } from "../../utils/price";
import { Link } from "react-router-dom";
import { getProductLink } from "../../utils/slugify";

const CartCard = React.memo(({ item }) => {
  const { id, title, image, quantity, discont_price, price, categoryId } = item;
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.data);

  const productLink = getProductLink({ id, title, categoryId }, categories);

  const sale = getDiscountPercent(price, discont_price);

  return (
    <div className="flex flex-col md:flex-row  xl:gap-8 w-full border border-light-grey rounded-xl overflow-hidden h-auto md:h-[180px]">
      <Link
        className="w-full md:w-auto md:min-w-[140px] aspect-square lg:aspect-auto lg:h-full relative"
        to={productLink}
      >
        <img
          src={image}
          alt={title}
          className="object-contain object-center w-full h-full max-h-[300px] lg:max-h-full"
        />
        {sale > 0 && (
          <span className="absolute top-0 left-0 px-2 py-1 bg-main-blue text-main-white rounded-md">
            {`-${sale}%`}
          </span>
        )}
      </Link>

      <div className="flex flex-col justify-between gap-4 w-full p-4">
        <div className="flex justify-between items-center w-full">
          <h2 className="text-base md:text-lg font-semibold truncate">
            {title}
          </h2>
          <button
            className="aspect-square w-6 cursor-pointer hover:scale-110"
            onClick={() => dispatch(removeFromCart(id))}
          >
            <img src={closeImg} alt="close" />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 items-center md:items-start">
          <CartButton
            quantity={quantity}
            onAdd={() =>
              dispatch(updateQuantity({ id: id, quantity: quantity + 1 }))
            }
            onSubtract={() => {
              if (quantity > 1) {
                dispatch(updateQuantity({ id: id, quantity: quantity - 1 }));
              } else {
                dispatch(removeFromCart(id));
              }
            }}
          />

          <div className="flex flex-row items-baseline gap-2">
            {sale > 0 ? (
              <>
                <span className="font-bold text-[24px] md:text-[24px] lg:text-[32px]">
                  {priceFormatting(discont_price)}
                </span>
                <span className="text-[16px] md:text-[20px] lg:text-[24px] text-main-grey line-through">
                  {priceFormatting(price)}
                </span>
              </>
            ) : (
              <span className="font-bold text-[24px] md:text-[24px] lg:text-[32px]">
                {priceFormatting(price)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default CartCard;
