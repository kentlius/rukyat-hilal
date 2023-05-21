import Image from "next/image";
import prisma from "@/lib/prisma";
import HilalSearch from "@/components/HilalSearch";
import Link from "next/link";

async function getHilals() {
  const hilals = await prisma.hilal.findMany({
    include: {
      images: true,
    },
    where: {
      status: "APPROVED",
    },
  });
  return hilals;
}

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const hilals = await getHilals();
  const searchPlaceholder = "Search by description key words (ex: 'ramadhan')";

  return (
    <>
      <main className="mx-auto max-w-[1960px] p-4">
        <HilalSearch baseUrl={``} placeholder={searchPlaceholder} />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {hilals
            .filter((hilal) =>
              searchParams.query && searchParams.query != ""
                ? hilal.description
                    .toLowerCase()
                    .includes((searchParams.query as string).toLowerCase())
                : hilal.description
            )
            .map((hilal) => (
              <Link
                key={hilal.id}
                href={`/hilal/${hilal.id}`}
                className="after:content after:shadow-highlight group relative block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg"
              >
                <Image
                  className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
                  style={{ transform: "translate3d(0, 0, 0)" }}
                  src={hilal.images[0].url}
                  alt={hilal.description}
                  width={720}
                  height={480}
                  sizes="(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  25vw"
                  priority
                />
              </Link>
            ))}
        </div>
      </main>
    </>
  );
}
