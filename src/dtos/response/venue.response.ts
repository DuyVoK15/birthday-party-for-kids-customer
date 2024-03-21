import { SlotInVenueDataResponse } from "./slot.response";

export interface VenueDataResponse {
  id: number;
  venueName: string;
  venueDescription: string;
  venueImgUrl: string;
  location: string;
  capacity: number;
  slotInVenueList: SlotInVenueDataResponse[] | [];
  active: boolean;
}
export interface VenueArrayResponse {
  status: string;
  message: string;
  data: VenueDataResponse[] | [];
}
export interface VenueObjectResponse {
  status: string;
  message: string;
  data: VenueDataResponse;
}
