"use client";
import { signOut } from "next-auth/react";

export default function SignOut() {
  return (
    <button
      className="text-stone-600 transition-all hover:text-stone-200"
      onClick={() => signOut()}
    >
      Sign Out
    </button>
  );
}
