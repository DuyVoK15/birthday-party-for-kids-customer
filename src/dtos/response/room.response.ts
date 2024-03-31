import { SlotInRoomDataResponse } from "./slot.response";

export interface RoomDataResponse {
  id: number;
  createAt: string;
  updateAt: string;
  deleteAt: string;
  roomName: string;
  roomImgUrl: string;
  capacity: number;
  pricing: number;
  slotInRoomList: SlotInRoomDataResponse[] | [];
  active: boolean;
}

export interface RoomArrayResponse {
  status: string;
  message: string;
  data: RoomDataResponse[] | [];
}

export interface RoomObjectResponse {
  status: string;
  message: string;
  data: RoomDataResponse;
}
