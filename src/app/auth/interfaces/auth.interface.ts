import { User } from "./user.interface";


export interface AuthResponse {
  ok: boolean;
  path?: string;
  msg?: string;
  token?: string;
  id?: string;
  name?: string;
  email?: string;
  role?: string;
}
