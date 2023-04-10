import { User } from "@/interfaces/user";

export interface Rukyat {
  id: number;
  link_photo: string;
  description: string;
  taken_date: string;
  userId: number;
  User: User;
}
