import { serviceService } from "@/lib/service/service.service";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const getAllService = createAsyncThunk(
  "service/getAllService",
  async (_, { rejectWithValue }) => {
    try {
      const response = await serviceService.getAllService();
      return response.data;
    } catch (error: any) {
      const axiosError = error as AxiosError;
      console.log(axiosError);
      return rejectWithValue(axiosError.response?.data);
    }
  },
);

export const getServiceById = createAsyncThunk(
  "service/getServiceById",
  async (id: number | null, { rejectWithValue }) => {
    try {
      const response = await serviceService.getServiceById(id);
      return response.data;
    } catch (error: any) {
      const axiosError = error as AxiosError;
      console.log(axiosError);
      return rejectWithValue(axiosError.response?.data);
    }
  },
);