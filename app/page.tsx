"use client";

// import Image from "next/image";
import Link from "next/link";
import SignOut from "@/components/sign-out";
import { useState, useEffect } from "react";
import { Rukyat } from "@/interfaces/rukyat";

export default function Home() {
  const [rukyats, setRukyats] = useState<Rukyat[]>([]);
  
  async function getRukyats() {
    const res = await fetch("/api/rukyat/display-result");
    const data = await res.json();
    setRukyats(data);
    console.log("Data Rukyat: ")
    console.log(data);
  }

  useEffect(() => {
    getRukyats();
  }, []);

  return (
    <>
      <main className="mx-auto max-w-[1960px] p-4">
        <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
          <div className="relative mb-5 flex h-[629px] flex-col items-center justify-end gap-4 overflow-hidden border rounded-lg px-6 pb-16 pt-64 text-center after:pointer-events-none after:absolute after:inset-0 after:rounded-lg lg:pt-0">
            <h1 className="mt-8 mb-4 text-base font-bold uppercase tracking-widest">
              Imahnoong Hilal Gallery
            </h1>
            <p className="max-w-[40ch] sm:max-w-[32ch]">
              Sistem Informasi Rukyat Hilal.
            </p>
            <Link
              className="pointer z-10 mt-6 rounded-lg border border-white bg-s-green px-3 py-2 text-sm font-semibold text-white transition hover:bg-p-green md:mt-4"
              href="/form-upload"
            >
              Upload
            </Link>
            <SignOut />
          </div>
        </div>
        <div>
          {rukyats.map(rukyat => (
            <li key={rukyat.id}>
              {rukyat.id} | { rukyat.description } | { rukyat.taken_date } | User Name: { rukyat.User.name }
            </li>
          ))}
        </div>
        <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
          <div className="relative mb-5 flex h-[629px] flex-col items-center justify-end gap-4 overflow-hidden border rounded-lg px-6 pb-16 pt-64 text-center after:pointer-events-none after:absolute after:inset-0 after:rounded-lg lg:pt-0">
            <h1 className="mt-8 mb-4 text-base font-bold uppercase tracking-widest">
              Imahnoong Hilal Gallery
            </h1>
            <p className="max-w-[40ch] sm:max-w-[32ch]">
              Sistem Informasi Rukyat Hilal.
            </p>
            <Link
              className="pointer z-10 mt-6 rounded-lg border border-white bg-s-green px-3 py-2 text-sm font-semibold text-white transition hover:bg-p-green md:mt-4"
              href="/finder-bulan"
            >
              Finder Bulan
            </Link>
          </div>
        </div>
      </main>
      <footer className="p-6 text-center sm:p-12">
        For{" "}
        <a
          href="https://imahnoong.com/"
          target="_blank"
          className="font-semibold hover:text-gray-300"
          rel="noreferrer"
        >
          Imahnoong
        </a>{" "}🔭
      </footer>
    </>
  );
}
