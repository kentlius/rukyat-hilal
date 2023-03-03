import Image from "next/image";
import Link from "next/link";
import SignOut from "@/components/sign-out";
import prisma from "@/lib/prisma";
import { Suspense } from "react";

// export const revalidate = 10;

async function getHilals() {
  const hilals = await prisma.hilal.findMany();
  return hilals;
}

export default async function Home() {
  const hilals = await getHilals();

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
          <Suspense fallback={<div>Loading...</div>}>
            <div>
              {hilals.map((hilal) => (
                <div key={hilal.id}>
                  <Image src={hilal.url} alt={hilal.description} width={300} height={200} />
                  {hilal.description} | {hilal.createdAt.toISOString()} | {hilal.status}
                </div>
              ))}
            </div>
          </Suspense>
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
        </a>{" "}
        🔭
      </footer>
    </>
  );
}
