export interface DataUpgrade {
  serviceId: number;
  count: number;
}
export interface BookingRequest {
  kidName?: string;
  kidDOB?: string;
  email?: string;
  phone?: string;
  participantAmount?: number;
  packageDecoId?: number;
  packageFoodId?: number;
  slotInRoomId?: number;
  dataUpgrade?: DataUpgrade[] | [];
  date?: string;
}
