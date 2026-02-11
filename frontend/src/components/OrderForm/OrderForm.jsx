import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../../ui/Input/Input";
import Alert from "../../ui/Alert/Alert";
import ErrorInfo from "../ErrorInfo/ErrorInfo";
import { useDispatch, useSelector } from "react-redux";
import {
  sendOrder,
  resetOrderState,
} from "../../utils/redux/slices/orderSlice";
import Button from "../../ui/Button/Button";
import { clearCart } from "../../utils/redux/slices/cartSlice";
import {
  discountConsumed,
  resetSubmission,
} from "../../utils/redux/slices/saleSlice";

const OrderForm = ({ cartItems, totalSum }) => {
  const dispatch = useDispatch();
  const { error, success } = useSelector((state) => state.order);
  const discountUsed = useSelector((state) => state.sale.discountUsed);

  const [alertOpen, setAlertOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (success) {
      dispatch(discountConsumed());
      setAlertOpen(true);
      reset();
      dispatch(resetSubmission());
    }
  }, [success, reset, dispatch, discountUsed]);

  const onSubmit = (formData) => {
    const order = {
      ...formData,
      products: cartItems.map(({ id, title, quantity }) => ({
        id,
        title,
        quantity,
      })),
      total: totalSum,
    };
    dispatch(sendOrder(order));
  };

  if (error) return <ErrorInfo />;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full">
      <Input
        {...register("name", { required: "Name is required" })}
        placeholder="Name"
        message={errors?.name?.message}
        variant="light"
      />
      <Input
        {...register("phoneNumber", { required: "Phone Number is required" })}
        placeholder="Phone Number"
        message={errors?.phoneNumber?.message}
        variant="light"
      />
      <Input
        {...register("email", { required: "Email is required" })}
        placeholder="Email"
        type="email"
        message={errors?.email?.message}
        variant="light"
      />

      <Button type="submit" className="mt-4">
        Order
      </Button>

      {alertOpen && (
        <Alert
          title={"Congratulations!"}
          p1={"Your order has been successfully placed on the website."}
          p2={"A manager will contact you shortly to confirm your order."}
          isOpen={alertOpen}
          onClose={() => {
            setAlertOpen(false);
            dispatch(resetOrderState());
            dispatch(clearCart());
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      )}
    </form>
  );
};

export default OrderForm;
