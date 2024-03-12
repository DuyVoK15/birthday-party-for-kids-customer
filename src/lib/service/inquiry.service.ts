import { AxiosResponse } from "axios";
import axiosClient from "./axiosClient";
import { INQUIRY_RESPONSE } from "@/dtos/inquiry.dtos";

export const inquiryService = {
  getAllInquiryByAuthor: (): Promise<AxiosResponse<INQUIRY_RESPONSE>> => {
    const url = "/api/inquiry/get-all-question";
    return axiosClient.get(url);
  },
  getInquiryById: (id: number): Promise<AxiosResponse<INQUIRY_RESPONSE>> => {
    const url = `/api/inquiry/get-question-by-id/${id}`;
    return axiosClient.get(url);
  },
  createInquiry: (payload: {
    inquiryQuestion: string;
  }): Promise<AxiosResponse<any>> => {
    const url = "/api/inquiry/create-question";
    return axiosClient.post(url, { ...payload });
  },
  updateInquiry: (request: {
    id: number;
    payload: { inquiryQuestion: string };
  }): Promise<AxiosResponse<INQUIRY_RESPONSE>> => {
    const url = `/api/inquiry/update-question/${request.id}`;
    return axiosClient.put(url, { ...request.payload });
  },
  deleteInquiry: (id: number): Promise<AxiosResponse<INQUIRY_RESPONSE>> => {
    const url = `/api/inquiry/delete-question/${id}`;
    return axiosClient.delete(url);
  },
};
