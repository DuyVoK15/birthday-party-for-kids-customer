import { inquiryService } from "@/lib/service/inquiry.service";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllInquiryByAuthor = createAsyncThunk(
  "inquiry/getAllInquiryByAuthor",
  async (_, { rejectWithValue }) => {
    try {
      const response = await inquiryService.getAllInquiryByAuthor();
      return response?.data?.data;
    } catch (error) {
      console.log(error);
    }
  },
);

export const getInquiryById = createAsyncThunk(
  "inquiry/getInquiryById",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await inquiryService.getInquiryById(id);
      return response?.data?.data;
    } catch (error) {
      console.log(error);
    }
  },
);

export const createInquiry = createAsyncThunk(
  "inquiry/createInquiry",
  async (
    payload: {
      inquiryQuestion: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await inquiryService.createInquiry(payload);
      return response?.data?.data;
    } catch (error) {
      console.log(error);
    }
  },
);

export const updateInquiry = createAsyncThunk(
  "inquiry/updateInquiry",
  async (
    request: { id: number; payload: { inquiryQuestion: string } },
    { rejectWithValue },
  ) => {
    try {
      const response = await inquiryService.updateInquiry({
        id: request.id,
        payload: request.payload,
      });
      return response?.data?.data;
    } catch (error) {
      console.log(error);
    }
  },
);

export const deleteInquiry = createAsyncThunk(
  "inquiry/deleteInquiry",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await inquiryService.deleteInquiry(id);
      return response?.data?.data;
    } catch (error) {
      console.log(error);
    }
  },
);
