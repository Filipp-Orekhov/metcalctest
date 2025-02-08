import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchShapesApi } from "../api/api.ts";
import { Shape, MetalState } from "../types";

const initialState: MetalState = {
  shapes: [],
  loading: false,
  error: null,
  selectedShape: null,
  selectedMaterial: null,
};

export const fetchShapes = createAsyncThunk<Shape[]>("metal/fetchShapes", async () => {
  return await fetchShapesApi();
});

const metalSlice = createSlice({
  name: "metal",
  initialState,
  reducers: {
    selectShape: (state, action: PayloadAction<string>) => {
      const newShape = state.shapes.find((shape) => shape.id === action.payload) || null;

      if (newShape && state.selectedMaterial) {
        const isMaterialValid = newShape.materials.some((m) => m.name === state.selectedMaterial?.name);
        if (!isMaterialValid) {
          state.selectedMaterial = null;
        }
      } else {
        state.selectedMaterial = null;
      }

      state.selectedShape = newShape;
    },
    selectMaterial: (state, action: PayloadAction<string>) => {
      if (state.selectedShape) {
        state.selectedMaterial = state.selectedShape.materials.find((material) => material.name === action.payload) || null;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShapes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShapes.fulfilled, (state, action) => {
        state.loading = false;
        state.shapes = action.payload;
      })
      .addCase(fetchShapes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Не удалось загрузить данные";
      });
  },
});

export const { selectShape, selectMaterial } = metalSlice.actions;
export default metalSlice.reducer;