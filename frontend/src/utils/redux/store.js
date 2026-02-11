import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./slices/categoriesSlice";
import productsReducer from "./slices/productsSlice";
import orderReducer from "./slices/orderSlice";
import saleReducer from "./slices/saleSlice";
import cartReducer from "./slices/cartSlice";

const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    products: productsReducer,
    order: orderReducer,
    sale: saleReducer,
    cart: cartReducer,
  },
});

export default store;
