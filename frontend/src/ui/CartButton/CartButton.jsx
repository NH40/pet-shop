import minus from "../../assets/minus.svg";
import plus from "../../assets/plus.svg";

const CartButton = ({ quantity = 0, onSubtract, onAdd }) => {
  return (
    <div className="flex items-center justify-between border border-light-grey rounded-md w-[200px]">
      <button
        className="flex items-center justify-center aspect-square h-full min-h-[48px] max-h-[60px] rounded-md cursor-pointer border border-light-grey outline-none hover:scale-105 active:bg-light-grey"
        onClick={onSubtract}
        disabled={quantity <= 0}
      >
        <img src={minus} alt="minus" />
      </button>
      <span className="w-[96px] flex items-center justify-center text-2xl font-semibold h-full cursor-default">
        {quantity}
      </span>
      <button
        className="flex items-center justify-center aspect-square h-full min-h-[48px] max-h-[60px] rounded-md cursor-pointer border border-light-grey outline-none hover:scale-105 active:bg-light-grey"
        onClick={onAdd}
      >
        <img src={plus} alt="plus" />
      </button>
    </div>
  );
};

export default CartButton;
