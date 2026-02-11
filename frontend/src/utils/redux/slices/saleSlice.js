import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api";

// POST to discount
export const sendSaleRequest = createAsyncThunk(
  "sale/send",
  async (formData, thunkAPI) => {
    try {
      const res = await API.post("/sale/send", formData);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.message || "Failed to request sale"
      );
    }
  }
);

const saleSlice = createSlice({
  name: "sale",
  initialState: {
    status: null,
    message: "",
    loading: false,
    error: null,
    success: null,
    isSubmitted: false,
    dataUserSale: [],
    discountUsed: false,
    discountPercent: 5,
  },
  reducers: {
    resetSubmission: (state) => {
      state.isSubmitted = false;
      state.dataUserSale = null;
      state.success = null;
      state.error = null;
      state.loading = false;
    },
    discountConsumed: (state) => {
      state.discountUsed = true;
      state.isSubmitted = false;
      state.dataUserSale = [];
    },
    resetSuccess: (state) => {
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendSaleRequest.pending, (state) => {
        state.loading = true;
        state.status = null;
        state.message = "";
        state.error = null;
        state.success = null;
        state.isSubmitted = false;
        state.dataUserSale = [];
      })
      .addCase(sendSaleRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.status;
        state.success = true;
        state.message = action.payload.message;
        state.isSubmitted = true;
        state.dataUserSale = action.meta.arg;
      })
      .addCase(sendSaleRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { resetSubmission, discountConsumed, resetSuccess } =
  saleSlice.actions;
export default saleSlice.reducer;
