import clsx from "clsx";

const Divider = ({ className }) => {
  return <div className={clsx("w-full h-0.5 bg-light-grey", className)}></div>;
};

export default Divider;
