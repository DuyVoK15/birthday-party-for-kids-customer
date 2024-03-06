import { AxiosResponse } from "axios";
import axiosClient from "./axiosClient";

export const inquiryService= {
  createQuestion: (payload: {
    inquiryQuestion: string;
  }): Promise<AxiosResponse<any>> => {
    const url = "/inquiry/create-question";
    return axiosClient.post(url, { ...payload });
  },
  getAllQuestion: (): Promise<AxiosResponse<any>> => {
    const url = "/inquiry/get-all-question";
    return axiosClient.get(url);
  },
  
};
