import { AxiosResponse } from "axios";
import axiosClient from "./axiosClient";
import { GetRoomRequest } from "@/dtos/request/room.request";

export const roomService = {
  getAllRoomCheckSlot: (
    payload: GetRoomRequest,
  ): Promise<AxiosResponse<any>> => {
    const url = `/api/room/check-slot-in-room-for-customer/${payload.venueId}`;
    return axiosClient.get(url);
  },
};
