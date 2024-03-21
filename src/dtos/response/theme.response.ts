export interface ThemeDataResponse {
  id: number;
  themeName: string;
  themeDescription: string;
  themeImgUrl: string;
  active: boolean;
}

// Theme In Venue
export interface ThemeInVenueDataResponse {
  id: number;
  active: boolean;
  themeObject: ThemeDataResponse;
}
export interface ThemeInVenueResponse {
  status: string;
  message: string;
  data: ThemeInVenueDataResponse[] | [];
}

export interface ThemeInVenueObjectResponse {
  status: string;
  message: string;
  data: ThemeInVenueDataResponse;
}
