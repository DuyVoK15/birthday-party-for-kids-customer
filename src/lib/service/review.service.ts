import { AxiosResponse } from "axios";
import axiosClient from "./axiosClient";

export const reviewService = {
  getAllInquiryByAuthor: (): Promise<AxiosResponse<any>> => {
    const url = "/api/inquiry/get-all-question";
    return axiosClient.get(url);
  },
  getInquiryById: (id: number): Promise<AxiosResponse<any>> => {
    const url = `/api/inquiry/get-question-by-id/${id}`;
    return axiosClient.get(url);
  },
  createReview: (request: {
    id: number;
    payload: {
      reviewMessage: string;
      rating: number;
    };
  }): Promise<AxiosResponse<any>> => {
    const url = `/api/review/create/${request.id}`;
    return axiosClient.post(url, { ...request.payload });
  },
};
