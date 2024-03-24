import { packageService } from "@/lib/service/package.service";
import { venueService } from "@/lib/service/venue.service";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const getAllPackage = createAsyncThunk(
  "package/getAllPackage",
  async (_, { rejectWithValue }) => {
    try {
      const response = await packageService.getAllPackage();
      return response.data;
    } catch (error: any) {
      const axiosError = error as AxiosError;
      console.log(axiosError);
      return rejectWithValue(axiosError.response?.data);
    }
  },
);

export const getPackageById = createAsyncThunk(
  "package/getPackageById",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await packageService.getPackageById(id);
      return response.data;
    } catch (error: any) {
      const axiosError = error as AxiosError;
      console.log(axiosError);
      return rejectWithValue(axiosError.response?.data);
    }
  },
);

export const getAllPackageInVenueByVenueId = createAsyncThunk(
  "package/getAllPackageInVenueByVenueId",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await venueService.getAllPackageInVenueByVenueId(id);
      return response.data;
    } catch (error: any) {
      const axiosError = error as AxiosError;
      console.log(axiosError);
      return rejectWithValue(axiosError.response?.data);
    }
  },
);

export const getAllPackageInVenueNotChoose = createAsyncThunk(
  "package/getAllPackageInVenueNotChoose",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await packageService.getAllPackageInVenueNotChoose(id);
      return response.data;
    } catch (error: any) {
      const axiosError = error as AxiosError;
      console.log(axiosError);
      return rejectWithValue(axiosError.response?.data);
    }
  },
);
