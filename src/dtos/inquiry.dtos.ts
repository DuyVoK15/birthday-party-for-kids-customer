export type INQUIRY = {
  id: number;
  inquiryQuestion: string;
  inquiryReply: string;
  status: string;
  active: boolean;
};
export interface INQUIRY_RESPONSE {
  status: string;
  message: string;
  data: INQUIRY[] | [];
}
