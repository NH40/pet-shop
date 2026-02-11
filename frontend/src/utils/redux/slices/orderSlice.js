import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api";

// POST order
export const sendOrder = createAsyncThunk(
  "order/send",
  async (formData, thunkAPI) => {
    try {
      const res = await API.post("/order/send", formData);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message || "Failed to send form");
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    status: null,
    message: "",
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    resetOrderState: (state) => {
      state.status = null;
      state.message = "";
      state.loading = false;
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(sendOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.status;
        state.message = action.payload.message;
        state.success = true;
      })
      .addCase(sendOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetOrderState } = orderSlice.actions;
export default orderSlice.reducer;
