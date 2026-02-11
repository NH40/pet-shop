import React from "react";
import TitleWithCrumbButton from "../../ui/TitleWithCrumbButton/TitleWithCrumbButton";
import Button from "../../ui/Button/Button";
import CartCard from "../../components/CartCard/CartCard";
import OrderForm from "../../components/OrderForm/OrderForm";
import { ROUTES } from "../../utils/routes";
import { useSelector } from "react-redux";
import { priceFormatting } from "../../utils/price";

const totalItemsSum = (items) => {
  return items.reduce((acc, item) => {
    const price = item.discont_price ?? item.price;
    return acc + price * (item.quantity ?? 1);
  }, 0);
};

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalSum = totalItemsSum(cartItems);
  const {
    isSubmitted: isDiscountApplied,
    discountPercent,
    discountUsed,
  } = useSelector((state) => state.sale);
  const effectiveDiscount =
    !discountUsed && isDiscountApplied ? discountPercent : 0;
  const discountedTotal = +(totalSum * (1 - effectiveDiscount / 100)).toFixed(
    2
  );

  return (
    <div className="mb-10 md:mb-20">
      <TitleWithCrumbButton
        title={<>Shopping&nbsp;cart</>}
        to={ROUTES.MAIN}
        buttonTitle={"Back to the store"}
      />
      {cartItems.length <= 0 ? (
        <>
          <h2 className="mb-8">
            Looks like you have no items in your basket currently.
          </h2>
          <Button className="max-w-[300px]" to={ROUTES.PRODUCTS}>
            Continue Shopping
          </Button>
        </>
      ) : (
        <div className="flex flex-col lg:flex-row gap-4 w-full">
          <div className="flex flex-col gap-4 xl:w-[60%]">
            {cartItems.map((item) => (
              <CartCard key={item.id} item={item} />
            ))}
          </div>
          <div className="p-4 xl:p-5 bg-secondary-grey lg:w-[40%] h-max rounded-xl">
            {isDiscountApplied && (
              <div className="text-center text-main-blue mb-4">
                🎉 You have a 5% discount!
              </div>
            )}
            <h2 className="text-3xl xl:text-[40px] font-bold text-center  text-nowrap">
              Order details
            </h2>
            <p className="text-main-grey text-2xl xl:text-4xl">
              {cartItems.length} x Items
            </p>
            <div className="flex justify-between mb-6 flex-col md:items-center lg:items-start xl:items-end md:flex-row lg:flex-col xl:flex-row">
              <p className="text-main-grey text-2xl xl:text-4xl">Total</p>
              <p className="font-bold text-3xl xl:text-5xl leading-none">
                {priceFormatting(discountedTotal)}
                {isDiscountApplied && (
                  <span className="text-main-grey text-2xl xl:text-4xl line-through ml-2 md:ml-4">
                    {priceFormatting(totalSum)}
                  </span>
                )}
              </p>
            </div>
            <OrderForm cartItems={cartItems} totalSum={discountedTotal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
