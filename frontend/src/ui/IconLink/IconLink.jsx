import { Link } from "react-router-dom";
import clsx from "clsx";

const IconLink = ({
  to = "/",
  icon,
  size = 32,
  alt = "",
  external = false,
  className = "",
}) => {
  const imgElement = (
    <img
      src={icon}
      alt={alt}
      width={size}
      height={size}
      className={clsx(
        "object-contain transition-transform duration-300 ease-in-out",
        className
      )}
    />
  );

  if (external) {
    return (
      <a href={to} target="_blank" rel="noopener noreferrer">
        {imgElement}
      </a>
    );
  }

  return <Link to={to}>{imgElement}</Link>;
};

export default IconLink;
