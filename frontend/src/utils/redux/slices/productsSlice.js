import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API, { BASE_URL } from "../../api";

// fetch all products
export const fetchAllProducts = createAsyncThunk(
  "products/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await API.get("/products/all");
      return res.data.map((product) => ({
        ...product,
        image: `${BASE_URL}${product.image}`,
      }));
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.message || "Failed to fetch products"
      );
    }
  }
);

// fetch product by id
export const fetchProductById = createAsyncThunk(
  "products/fetchById",
  async (id, thunkAPI) => {
    try {
      const res = await API.get(`/products/${id}`);

      if (res.data.status === "ERR") {
        return thunkAPI.rejectWithValue(res.data.message);
      }

      return {
        ...res.data[0],
        image: `${BASE_URL}${res.data[0].image}`,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.message || "Failed to fetch product"
      );
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    data: [],
    discounted: [],
    current: null,
    loading: false,
    error: null,
  },
  reducers: {
    setCurrentProduct: (state, action) => {
      state.current = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // All products
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // One product
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.current = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCurrentProduct } = productsSlice.actions;
export default productsSlice.reducer;
