import "./globals.css";
import { Inter } from "next/font/google";
import Toaster from "@/components/toaster";
import AuthStatus from "@/components/auth-status";

export const metadata = {
  title: "Rukyat Hilal - Imahnoong",
  description: "Sistem Informasi Rukyat Hilal",
};

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const AuthStatusDiv = await AuthStatus();
  return (
    <html lang="en">
      <body>
        <Toaster />
        {AuthStatusDiv}
        {children}
      </body>
    </html>
  );
}
