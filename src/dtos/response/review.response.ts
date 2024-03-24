import { USERINFO } from "./auth.response";

export interface ReviewDataResponse {
  id: number;
  createAt: string;
  updateAt: string;
  deleteAt: string;
  reviewMessage: string;
  replyMessage: string;
  rating: number;
  account: USERINFO;
  accountReply: string;
  active: string;
}
