import prisma from "@/lib/prisma";
import { Suspense } from "react";
import HilalCards from "@/components/HilalManagement/HilalCards";
import HilalSearch from "@/components/HilalSearch";

async function getHilals() {
    const hilals = await prisma.hilal.findMany({
      include: {
        images: true,
      },
    });
    return hilals;
  }

export default async function HilalManagement(
  { searchParams }: {
    searchParams: { [key: string]: string | string[] | undefined },
  }
) {
    const baseUrl = "/admin/hilal-management";
    const hilals = await getHilals();
  
    return (
        <div className="flex flex-col px-10 py-6">
            <h1 className="text-2xl font-semibold my-4">Manajemen Hilal</h1>
            <HilalSearch baseUrl={baseUrl}/>

            <div className="flex flex-wrap pb-8 justify-center gap-x-12 gap-y-8">
                <Suspense fallback={<div>Fetching data...</div>}>
                    <HilalCards hilals={
                      (searchParams.query && searchParams.query != "") ? hilals.filter((hilal) => 
                        hilal.description.toLowerCase().includes((searchParams.query as string).toLowerCase()) ||
                        hilal.status.toLowerCase() == (searchParams.query as string).toLowerCase() 
                      ) : hilals
                    } />
                </Suspense>
            </div>
        </div>
    );
}
