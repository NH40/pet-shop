import clsx from "clsx";
import React from "react";

const CustomCheckbox = React.memo(({ checked = false, onChange }) => {
  return (
    <label className="flex items-center space-x-3 cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          className="absolute opacity-0 w-0 h-0"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div
          className={clsx(
            "w-8 h-8 border rounded flex items-center justify-center transition-colors",
            checked
              ? "bg-main-blue border-main-blue"
              : "bg-main-white border-light-grey"
          )}
        >
          {checked && (
            <svg
              className="w-5 h-5 text-main-white"
              viewBox="0 0 12 9"
              fill="none"
            >
              <path
                d="M1 4.5L4.5 8L11 1"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      </div>
    </label>
  );
});

export default CustomCheckbox;
