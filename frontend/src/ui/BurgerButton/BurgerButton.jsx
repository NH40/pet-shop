import clsx from "clsx";

const BurgerButton = ({ isOpen, onClick }) => {
  return (
    <button
      onClick={onClick}
      aria-label="Toggle menu"
      className="flex flex-col justify-around p-2 border-0 bg-transparent cursor-pointer h-10 w-10 md:hidden z-30"
    >
      <span
        className={clsx(
          "w-full h-1 bg-main-blue rounded block transition-transform duration-300",
          {
            "rotate-45 translate-y-2.5": isOpen,
          }
        )}
      />
      <span
        className={clsx(
          "w-full h-1 bg-main-blue rounded block my-1 transition-opacity duration-300",
          {
            "opacity-0": isOpen,
            "opacity-100": !isOpen,
          }
        )}
      />
      <span
        className={clsx(
          "w-full h-1 bg-main-blue rounded block transition-transform duration-300",
          {
            "-rotate-45 -translate-y-2.5": isOpen,
          }
        )}
      />
    </button>
  );
};

export default BurgerButton;
