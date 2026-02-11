import { Link } from "react-router-dom";
import clsx from "clsx";

const Button = ({
  children,
  to,
  className,
  onClick,
  variant = "default", // default, addedDisabled, addedActive
  disabled = false,
}) => {
  const baseClasses =
    "font-semibold cursor-pointer rounded-md flex items-center justify-center border py-4 transition-colors duration-300";

  const variantClasses = {
    default:
      "bg-main-blue text-main-white border-main-blue hover:bg-main-black hover:border-main-black active:bg-main-white active:text-main-black active:border-main-black",
    addedDisabled:
      "bg-main-white text-main-black border-main-black cursor-not-allowed pointer-events-none",
    addedActive:
      "bg-main-white text-main-black border-main-black hover:bg-main-black hover:text-main-white hover:border-main-black active:bg-main-white active:text-main-black active:border-main-black",
  };

  const finalClasses = clsx(
    baseClasses,
    variantClasses[variant],
    disabled && "cursor-not-allowed pointer-events-none",
    className
  );

  if (to) {
    return (
      <Link
        to={to}
        className={finalClasses}
        onClick={disabled ? (e) => e.preventDefault() : onClick}
      >
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={finalClasses} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
