export interface User {
  _id?: string;
  displayName?: string;
  username?: string;
  password?: string;
  phone?: string;
  image?: string;
  role?: string|string[];
  active?: boolean;
  createdAt?: string;
  status?: number;
}
