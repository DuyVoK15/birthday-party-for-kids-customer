import { message } from "antd";
import { USERINFO } from "./auth.response";
import { PackageInVenueDataResponse } from "./package.response";
import { SlotInVenueDataResponse } from "./slot.response";
import { ThemeInVenueDataResponse } from "./theme.response";
import { UpgradeServiceDataResponse } from "./upgradeService.response";
import { VenueDataResponse } from "./venue.response";

export interface PartyBookingDataResponse {
  id: number;
  createAt: string;
  updateAt: string;
  deleteAt: string;
  kidName: string;
  kidDOB: string;
  email: string;
  phone: string;
  status: string;
  themeInVenue: ThemeInVenueDataResponse;
  packageInVenue: PackageInVenueDataResponse;
  account: USERINFO;
  upgradeServices: UpgradeServiceDataResponse[] | [];
  active: boolean;
  slotInVenueObject: SlotInVenueDataResponse;
  venue: VenueDataResponse;
  pricingTotal: number;
}

export interface PartyBookingArrayResponse {
  status: string;
  message: string;
  data: PartyBookingDataResponse[] | [];
}

export interface PartyBookingObjectResponse {
  status: string;
  message: string;
  data: PartyBookingDataResponse;
}
