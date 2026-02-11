import { createSelector } from "@reduxjs/toolkit";

const selectAllProducts = (state) => state.products.data;

export const selectDiscountedProducts = createSelector(
  [selectAllProducts],
  (products) => products.filter((product) => product.discont_price !== null)
);

export const selectCartItems = (state) => state.cart.items;

export const makeSelectIsProductInCart = (productId) =>
  createSelector([selectCartItems], (items) =>
    items.some((item) => item.id === productId)
  );

export const makeSelectCartItemById = (productId) =>
  createSelector([selectCartItems], (items) =>
    items.find((item) => item.id === productId)
  );
