export interface User {
  id: string;
  email: string;
  role: string;
  google_id?: string | null;
  created_at?: Date;
  updated_at?: Date;
}

export interface UserJwtPayload {
  userId: string;
  email: string;
  role: "ADMIN" | "USER";
}
