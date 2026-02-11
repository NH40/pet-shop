import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import bgImg from "../../assets/banner/banner2.png";
import Title from "../../ui/Title/Title";
import Input from "../../ui/Input/Input";
import ErrorInfo from "../ErrorInfo/ErrorInfo";
import Alert from "../../ui/Alert/Alert";
import { useDispatch, useSelector } from "react-redux";
import {
  resetSubmission,
  resetSuccess,
  sendSaleRequest,
} from "../../utils/redux/slices/saleSlice";
import resetImg from "../../assets/reset.svg";

const FormSection = () => {
  const dispatch = useDispatch();
  const { loading, success, error, isSubmitted, dataUserSale, discountUsed } =
    useSelector((state) => state.sale);

  const [alertOpen, setAlertOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isSubmitted && dataUserSale) {
      Object.entries(dataUserSale).forEach(([key, value]) => {
        setValue(key, value);
      });
    }
  }, [isSubmitted, dataUserSale, setValue]);

  const onSubmit = (data) => {
    if (isSubmitted) return;
    dispatch(sendSaleRequest(data));
  };

  useEffect(() => {
    if (success) {
      setAlertOpen(true);
    }
  }, [success]);

  useEffect(() => {
    if (discountUsed) {
      reset();
      dispatch(resetSubmission());
    }
  }, [discountUsed, reset, dispatch]);

  const disabled = loading || isSubmitted;

  if (error) {
    return <ErrorInfo />;
  }

  if (discountUsed) {
    return null;
  }

  return (
    <section>
      <div className="bg-main-blue relative flex flex-col rounded-xl px-[14px] py-8">
        <Title className="text-main-white mb-8 md:mb-14 w-full text-center">
          5% off on the first order
        </Title>
        <div className="flex w-full flex-col md:flex-row">
          <div className=" md:w-[50%] xl:w-[60%] flex items-end order-1 md:order-0 -mb-8">
            <img
              src={bgImg}
              alt="background"
              className="object-contain max-h-[360px]"
            />
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-8 w-full md:w-[50%] xl:w-[40%]"
          >
            <div className="flex flex-col">
              <Input
                {...register("name", { required: "Name is required" })}
                placeholder="Name"
                message={errors?.name?.message}
                disabled={disabled}
              />

              <Input
                {...register("email", { required: "Email is required" })}
                placeholder="Email"
                type="email"
                message={errors?.email?.message}
                disabled={disabled}
              />

              <Input
                {...register("password", { required: "Password is required" })}
                placeholder="Password"
                type="password"
                message={errors?.password?.message}
                disabled={disabled}
              />
            </div>

            <button
              type="submit"
              className="bg-main-white text-main-black border-main-white hover:bg-main-black hover:border-main-black hover:text-main-white active:border-main-black active:bg-secondary-grey active:text-main-black cursor-pointer rounded-md border px-8 py-4 font-semibold transition-colors duration-300 outline-none disabled:text-main-blue disabled:bg-secondary-grey disabled:pointer-events-none"
              disabled={disabled}
            >
              {disabled ? "Request Submitted" : "Get a discount"}
            </button>
            {!loading && isSubmitted && (
              <button
                type="button"
                onClick={() => {
                  dispatch(resetSubmission());

                  reset();
                }}
                className="absolute top-0 right-0 w-10 md:w-12 cursor-pointer hover:rotate-90 transition-transform duration-300"
              >
                <img src={resetImg} alt="" />
              </button>
            )}
          </form>
        </div>
      </div>

      {alertOpen && (
        <Alert
          title={"Congratulations!"}
          p1={"Thank you! Your request was submitted successfully."}
          p2={"Check your email to get the discount bonus."}
          isOpen={alertOpen}
          onClose={() => {
            setAlertOpen(false);
            dispatch(resetSuccess());
          }}
        />
      )}
    </section>
  );
};

export default FormSection;
