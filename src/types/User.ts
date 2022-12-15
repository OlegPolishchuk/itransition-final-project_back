export type UserType = {
  login: string;
  password: string;
  userName: string;
  reviewsCount:number;
  role: string;
  token: string;
  refreshToken: string;
  status: string;
  avatar: string;
  lastLogin: Date;
  created: Date;
  _doc: object;
  _id?: string;
}