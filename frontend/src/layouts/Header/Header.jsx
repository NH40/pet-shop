import { useState } from "react";
import IconLink from "../../ui/IconLink/IconLink";
import cartIcon from "../../assets/cart.svg";
import CartBadge from "../../ui/CartBadge/CartBadge";
import BurgerButton from "../../ui/BurgerButton/BurgerButton";
import Navigation from "../../components/Navigation/Navigation";
import Divider from "../../ui/Divider/Divider";
import { ROUTES } from "../../utils/routes";
import { RemoveScroll } from "react-remove-scroll";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  return (
    <>
      <header className="relative py-6 md:h-32 flex items-center justify-between mb-[var(--m-bottom-title-xs)] md:mb-[var(--m-bottom-title-md)]">
        <div className="flex items-center gap-4">
          <BurgerButton isOpen={menuOpen} onClick={toggleMenu} />

          <IconLink
            to={ROUTES.MAIN}
            icon={"/logo.svg"}
            size={70}
            alt="Logo"
            className="hover:opacity-80 hover:scale-105 hidden md:block"
          />
        </div>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:hidden z-10">
          <IconLink to={ROUTES.MAIN} icon={"/logo.svg"} size={60} alt="Logo" />
        </div>

        <Navigation className="hidden md:flex gap-8 text-base md:text-xl" />

        <CartBadge>
          <IconLink
            to={ROUTES.CART}
            icon={cartIcon}
            size={48}
            alt="Cart"
            className="group-hover:-translate-y-1 group-hover:rotate-6 group-hover:scale-105 group-active:-translate-y-1 group-active:rotate-6 group-active:scale-105 transition-transform duration-300 w-10 md:w-12"
          />
        </CartBadge>

        {menuOpen && (
          <RemoveScroll>
            <div
              className="fixed top-0 left-0 h-full w-full bg-page shadow-lg z-20"
              onClick={toggleMenu}
            >
              <Navigation className="flex flex-col p-6 gap-6 mt-20 text-xl" />
            </div>
          </RemoveScroll>
        )}
        <Divider className="absolute bottom-0 left-1/2  -translate-x-1/2 w-screen max-w-[1440px]" />
      </header>
    </>
  );
};

export default Header;
