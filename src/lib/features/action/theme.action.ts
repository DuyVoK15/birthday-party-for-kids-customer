import { themeService } from "@/lib/service/theme.service";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const getAllTheme = createAsyncThunk(
  "theme/getAllTheme",
  async (_, { rejectWithValue }) => {
    try {
      const response = await themeService.getAllTheme();
      return response.data;
    } catch (error: any) {
      const axiosError = error as AxiosError;
      console.log(axiosError);
      return rejectWithValue(axiosError.response?.data);
    }
  },
);

export const getThemeById = createAsyncThunk(
  "theme/getThemeById",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await themeService.getThemeById(id);
      return response.data;
    } catch (error: any) {
      const axiosError = error as AxiosError;
      console.log(axiosError);
      return rejectWithValue(axiosError.response?.data);
    }
  },
);

export const createTheme = createAsyncThunk(
  "theme/createTheme",
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await themeService.createTheme(payload);
      return response.data;
    } catch (error: any) {
      const axiosError = error as AxiosError;
      console.log(axiosError);
      return rejectWithValue(axiosError.response?.data);
    }
  },
);

export const updateTheme = createAsyncThunk(
  "theme/updateTheme",
  async (request: { id: number; payload: any }, { rejectWithValue }) => {
    try {
      const response = await themeService.updateTheme(request);
      return response.data;
    } catch (error: any) {
      const axiosError = error as AxiosError;
      console.log(axiosError);
      return rejectWithValue(axiosError.response?.data);
    }
  },
);

export const deleteTheme = createAsyncThunk(
  "theme/deleteTheme",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await themeService.deleteTheme(id);
      return response.data;
    } catch (error: any) {
      const axiosError = error as AxiosError;
      console.log(axiosError);
      return rejectWithValue(axiosError.response?.data);
    }
  },
);
