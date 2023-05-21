import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";

export default async function AuthStatus() {
  const session = await getServerSession(authOptions);
  
  return session?.user;
}
