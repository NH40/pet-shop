export const ROUTES = {
  MAIN: "/",
  CATEGORIES: "/categories",
  PRODUCTS: "/products",
  SALES: "/discounted-items",
  CART: "/shopping-cart",
};

export const LINKS = [
  { to: ROUTES.MAIN, label: "Main Page" },
  {
    to: ROUTES.CATEGORIES,
    label: "Categories",
    customActiveCheck: (pathname) => {
      const parts = pathname.split("/").filter(Boolean);
      return (
        pathname === ROUTES.CATEGORIES ||
        (pathname.startsWith(`${ROUTES.CATEGORIES}/`) && parts.length === 2)
      );
    },
  },
  { to: ROUTES.PRODUCTS, label: "All products" },
  { to: ROUTES.SALES, label: "All sales", specLabel: "Discounted items" },
];

export const getLinkFromRoute = (route) => {
  return LINKS.find((link) => link.to === route);
};
