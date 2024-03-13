import { createSlice } from "@reduxjs/toolkit";
import {
  createTheme,
  deleteTheme,
  getAllTheme,
  getThemeById,
  updateTheme,
} from "../action/theme.action";
import {
  ThemeDataResponse,
  ThemeResponse,
} from "@/dtos/response/theme.response";

interface AuthState {
  themeReponse: ThemeResponse;
  themeList: ThemeDataResponse[] | [];
  themeById: any;
  createTheme: any;
  updateTheme: any;
  loading: boolean;
}

const initialState: AuthState = {
  themeReponse: {
    status: "",
    message: "",
    data: [],
  },
  themeList: [],
  themeById: null,
  createTheme: null,
  updateTheme: null,
  loading: false,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTheme.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllTheme.fulfilled, (state, action) => {
        state.themeReponse = action.payload;
        state.themeList = action.payload.data;
        state.loading = false;
      })
      .addCase(getAllTheme.rejected, (state, action) => {
        state.loading = false;
      })
      //
      .addCase(getThemeById.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getThemeById.fulfilled, (state, action) => {
        state.themeById = action.payload;
        state.loading = false;
      })
      .addCase(getThemeById.rejected, (state, action) => {
        state.loading = false;
      })
      //
      .addCase(createTheme.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createTheme.fulfilled, (state, action) => {
        state.createTheme = action.payload.data;
        state.loading = false;
      })
      .addCase(createTheme.rejected, (state, action) => {
        state.loading = false;
      })
      //
      .addCase(updateTheme.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateTheme.fulfilled, (state, action) => {
        state.updateTheme = action.payload.data;
        state.loading = false;
      })
      .addCase(updateTheme.rejected, (state, action) => {
        state.loading = false;
      })
      //
      .addCase(deleteTheme.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteTheme.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteTheme.rejected, (state, action) => {
        state.loading = false;
      });
    //
  },
});

export default themeSlice.reducer;
