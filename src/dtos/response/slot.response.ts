export interface SlotDataResponse {
  id: number;
  timeStart: string;
  timeEnd: string;
  validTimeRange: boolean;
  active: boolean;
}
export interface SlotArrayResponse {
  data: SlotDataResponse[] | [];
}
export interface SlotObjectResponse {
  data: SlotDataResponse;
}

// Slot In Venue
export interface SlotInVenueDataResponse {
  id: number;
  active: boolean;
  status: boolean;
  slot: SlotDataResponse;
  partyDated: any;
}
