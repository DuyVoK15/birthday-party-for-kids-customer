export type REGISTER_RES_DATA = {
    id: number;
    userName: string;
    password: string;
    fullName: string;
    email: string;
    phone: string;
    avatarUrl: string;
  } | null;
export interface REGISTER_RESPONSE {
  status: string;
  message: string;
  data: REGISTER_RES_DATA | null;
}
