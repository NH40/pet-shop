import React, { useEffect, useState, useRef } from "react";
import { SORT_OPTIONS } from "../../../utils/sortOptions";
import clsx from "clsx";

const CustomSelect = React.memo(
  ({ selectedValue, onSelect, placeholder = "Select" }) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef(null);

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (selectRef.current && !selectRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    const toggleSelect = () => setIsOpen(!isOpen);

    const handleSelect = (option) => {
      onSelect(option);
      setIsOpen(false);
    };

    return (
      <div className="relative w-52" ref={selectRef}>
        <div
          className={clsx(
            "flex justify-between items-center p-2 border rounded cursor-pointer transition-colors bg-secondary-grey",
            isOpen
              ? "border-main-blue bg-secondary-grey"
              : "border-light-grey hover:border-main-grey"
          )}
          onClick={toggleSelect}
        >
          <span
            className={selectedValue ? "text-main-black" : "text-main-grey"}
          >
            {selectedValue || placeholder}
          </span>
          <svg
            className={clsx(
              "w-4 h-4 transform transition-transform",
              isOpen ? "rotate-180" : ""
            )}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        {isOpen && (
          <div className="absolute z-110 w-full mt-1 bg-main-white border border-light-grey rounded shadow-lg">
            {SORT_OPTIONS.map((option) => (
              <div
                key={option}
                className={clsx(
                  "p-3 cursor-pointer transition-colors",
                  option === selectedValue
                    ? "text-main-black"
                    : "text-main-grey hover:bg-secondary-grey"
                )}
                onClick={() => handleSelect(option)}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);

export default CustomSelect;
