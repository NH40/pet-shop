import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import MainLayout from "./layouts/MainLayout/MainLayout";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import MainPage from "./pages/MainPage/MainPage";
import CategoriesPage from "./pages/CategoriesPage/CategoriesPage";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import ProductPage from "./pages/ProductPage/ProductPage";
import ProductsPage from "./pages/ProductsPage/ProductsPage";
import DiscountsPage from "./pages/DiscountsPage/DiscountsPage";
import CartPage from "./pages/CartPage/CartPage";
import { ROUTES } from "./utils/routes";

function App() {
  return (
    <MainLayout>
      <ScrollToTop />
      <Routes>
        <Route path={ROUTES.MAIN} element={<MainPage />} />
        <Route path={ROUTES.CATEGORIES} element={<CategoriesPage />} />
        <Route path={ROUTES.PRODUCTS} element={<ProductsPage />} />
        <Route path={ROUTES.SALES} element={<DiscountsPage />} />
        <Route path={`${ROUTES.CATEGORIES}/:slug`} element={<CategoryPage />} />
        <Route
          path={`${ROUTES.CATEGORIES}/:slug/:productSlug`}
          element={<ProductPage />}
        />
        <Route path={ROUTES.CART} element={<CartPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
