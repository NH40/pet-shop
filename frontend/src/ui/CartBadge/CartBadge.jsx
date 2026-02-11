import { useSelector } from "react-redux";

const CartBadge = ({ children }) => {
  const cartItems = useSelector((state) => state.cart.items);

  return (
    <div className="relative group inline-block cursor-pointer">
      {children}
      {cartItems.length > 0 && (
        <span className="pointer-events-none absolute top-1.5 left-0 bg-main-blue text-main-white text-xs font-semibold rounded-full w-6 h-6 flex items-center justify-center">
          {cartItems.length}
        </span>
      )}
    </div>
  );
};

export default CartBadge;
