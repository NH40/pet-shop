import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API, { BASE_URL } from "../../api";

// fetch all categories
export const fetchAllCategories = createAsyncThunk(
  "categories/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await API.get("/categories/all");

      if (res.data.status === "ERR") {
        return thunkAPI.rejectWithValue(true);
      }

      return res.data.map((category) => ({
        ...category,
        image: `${BASE_URL}${category.image}`,
      }));
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.message || "Failed to fetch category"
      );
    }
  }
);

// fetch category with its products
export const fetchCategoryWithProducts = createAsyncThunk(
  "categories/fetchOne",
  async (id, thunkAPI) => {
    try {
      const res = await API.get(`/categories/${id}`);

      if (res.data.status === "ERR") {
        return thunkAPI.rejectWithValue(res.data.message);
      }

      return {
        category: {
          ...res.data.category,
          image: `${BASE_URL}${res.data.category.image}`,
        },
        data: res.data.data.map((product) => ({
          ...product,
          image: `${BASE_URL}${product.image}`,
        })),
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.message || "Failed to fetch category"
      );
    }
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    data: [],
    current: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // all
      .addCase(fetchAllCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAllCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // one with products
      .addCase(fetchCategoryWithProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.current = null;
      })
      .addCase(fetchCategoryWithProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;
      })
      .addCase(fetchCategoryWithProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default categoriesSlice.reducer;
