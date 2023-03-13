import Image from "next/image";
import Link from "next/link";
import SignOut from "@/components/sign-out";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";

// export const revalidate = 10;

async function getHilals() {
  const hilals = await prisma.hilal.findMany();
  return hilals;
}

export default async function Home() {
  const hilals = await getHilals();
  const session = await getServerSession();

  return (
    <>
      <main className="mx-auto max-w-[1960px] p-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          <div className="after:content relative col-span-1 row-span-2 flex flex-col items-center justify-end gap-4 overflow-hidden border rounded-lg px-6 pb-16 pt-64 text-center bg-gray-200 after:pointer-events-none after:absolute after:inset-0 after:rounded-lg lg:pt-0">
            <h1 className="mt-8 mb-4 text-base font-bold uppercase tracking-widest">
              Imahnoong Hilal Gallery
            </h1>
            <p className="max-w-[40ch] sm:max-w-[32ch]">
              Sistem Informasi Rukyat Hilal.
            </p>
            <Link
              className="pointer z-10 mt-6 rounded-lg border border-white bg-s-green px-3 py-2 text-sm font-semibold text-white transition hover:bg-p-green md:mt-4"
              prefetch={false} // workaround until https://github.com/vercel/vercel/pull/8978 is deployed
              href="/form-upload"
            >
              Upload
            </Link>
            {session && <SignOut />}
          </div>
          {hilals.map((hilal) => (
            <div
              key={hilal.id}
              className="after:content group relative block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
            >
              <Image
                className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
                style={{ transform: "translate3d(0, 0, 0)" }}
                src={`https://picsum.photos/720/480`}
                alt={hilal.description}
                width={720}
                height={480}
                sizes="(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  25vw"
                priority
              />
            </div>
          ))}
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
