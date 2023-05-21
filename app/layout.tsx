import "./globals.css";
import { Poppins } from "next/font/google";
import Toaster from "@/components/ui/toaster";

export const metadata = {
  title: {
    default: "Rukyat Hilal",
    template: "%s | Imahnoong",
  },
  description: "Sistem Informasi Rukyat Hilal",
  manifest: "/manifest.json",
};

const poppins = Poppins({ weight: ["400"], subsets: ["latin"], variable: "--font-poppins" });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable}`}>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
