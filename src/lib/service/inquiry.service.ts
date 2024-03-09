import { AxiosResponse } from "axios";
import axiosClient from "./axiosClient";
import { INQUIRY_RESPONSE } from "@/dtos/inquiry.dtos";

export const inquiryService= {
  createQuestion: (payload: {
    inquiryQuestion: string;
  }): Promise<AxiosResponse<any>> => {
    const url = "/inquiry/create-question";
    return axiosClient.post(url, { ...payload });
  },
  getAllInquiryByAuthor: (): Promise<AxiosResponse<INQUIRY_RESPONSE>> => {
    const url = "/inquiry/get-all-question";
    return axiosClient.get(url);
  },
  
};
