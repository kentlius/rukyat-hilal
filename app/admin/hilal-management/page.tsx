import prisma from "@/lib/prisma";
import { Suspense } from "react";
import HilalCards from "@/components/HilalManagement/HilalCards";

async function getHilals() {
  const hilals = await prisma.hilal.findMany({
    include: {
      images: true,
    },
  });
  return hilals;
}

export default async function HilalManagement() {
  const hilals = await getHilals();

  return (
    <div className="flex flex-col px-10 py-6">
      <h1 className="my-4 text-2xl font-semibold">Manajemen Hilal</h1>
      <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 pb-8">
        <Suspense fallback={<div>Fetching data...</div>}>
          <HilalCards hilals={hilals} />
        </Suspense>
      </div>
    </div>
  );
}
