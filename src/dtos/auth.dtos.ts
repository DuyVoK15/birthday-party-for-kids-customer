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
export interface LOGIN_GOOGLE_RES {
  uid: string,
  email: string,
  emailVerified: true,
  displayName: string,
  isAnonymous: false,
  photoURL: string,
  providerData: [
    {
      providerId: string,
      uid: string,
      displayName: string,
      email: string,
      phoneNumber: string,
      photoURL: string
    }
  ],
  stsTokenManager: {
    refreshToken: string,
    accessToken: string,
    expirationTime: string
  },
  createdAt: string,
  lastLoginAt: string,
  apiKey: string,
  appName: []
}
