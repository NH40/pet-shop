import clsx from "clsx";
import React from "react";

const Input = React.memo(
  ({ message = null, variant = "dark", className, ...rest }) => {
    const baseClasses = "px-8 py-4 outline-none rounded-md w-full";
    const variants = {
      dark: "border border-main-white text-main-white placeholder-main-white bg-main-blue",
      light:
        "border border-light-grey text-main-grey placeholder-main-grey bg-main-white",
    };

    return (
      <div>
        <input
          {...rest}
          className={clsx(baseClasses, variants[variant], className)}
        />
        <div className="min-h-4">
          {message && (
            <p className="flex items-center rounded-md bg-red-900/20 px-4 py-2 text-xs text-red-400 h-4">
              {message}
            </p>
          )}
        </div>
      </div>
    );
  }
);

export default Input;
