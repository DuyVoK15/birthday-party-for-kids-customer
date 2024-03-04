import { AxiosResponse } from "axios";
import axiosClient from "./axiosClient";
import { LOGIN_PARAM, REGISTER_PARAM } from "@/models/auth.param";
import { REGISTER_RESPONSE } from "@/dtos/auth.dtos";

export const authService = {
  register: (
    payload: REGISTER_PARAM,
  ): Promise<AxiosResponse<REGISTER_RESPONSE>> => {
    const url = "/api/account/register";

    return axiosClient.post(url, { ...payload });
  },
  login: (
    payload: LOGIN_PARAM,
  ): Promise<AxiosResponse<REGISTER_RESPONSE>> => {
    const url = "/api/account/authenticate";

    return axiosClient.post(url, { ...payload });
  },
  getUserInfo: (): Promise<AxiosResponse<REGISTER_RESPONSE>> => {
    const url = "/api/account/test";

    return axiosClient.get(url);
  },
};
