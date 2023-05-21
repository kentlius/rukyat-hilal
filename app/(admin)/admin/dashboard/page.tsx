import prisma from "@/lib/prisma";
import { Suspense } from "react";
import HilalCards from "@/components/HilalManagement/HilalCards";
import HilalSearch from "@/components/HilalSearch";
import Link from "next/link";

async function getHilals() {
  const hilals = await prisma.hilal.findMany({
    include: {
      images: true,
    },
  });
  return hilals;
}

export default async function HilalManagement({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const hilals = await getHilals();
  const baseUrl = "/admin/hilal-management";
  const searchPlaceholder =
    "Search by status (ex: 'approved') or description (ex: 'ramadhan')";

  return (
    <div className="flex flex-col px-10 py-6">
      <Link href="/">
        <h1 className="my-4 text-2xl font-semibold">Manajemen Hilal</h1>
      </Link>
      <HilalSearch baseUrl={baseUrl} placeholder={searchPlaceholder} />

      <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 pb-8">
        <Suspense fallback={<div>Fetching data...</div>}>
          <HilalCards
            hilals={
              searchParams.query && searchParams.query != ""
                ? hilals.filter(
                    (hilal) =>
                      hilal.description
                        .toLowerCase()
                        .includes(
                          (searchParams.query as string).toLowerCase()
                        ) ||
                      hilal.status.toLowerCase() ==
                        (searchParams.query as string).toLowerCase()
                  )
                : hilals
            }
          />
        </Suspense>
      </div>
    </div>
  );
}
