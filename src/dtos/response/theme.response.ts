export interface ThemeDataResponse {
  id: number;
  themeName: string;
  themeDescription: string;
  themeImgUrl: string;
  active: boolean;
}
export interface ThemeResponse {
  status: string;
  message: string;
  data: ThemeDataResponse[] | [];
}
