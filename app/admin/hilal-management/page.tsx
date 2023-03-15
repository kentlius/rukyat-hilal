import prisma from "@/lib/prisma";
import { Suspense } from "react";
import HilalCards from "@/components/HilalManagement/HilalCards"

async function getHilals() {
    const hilals = await prisma.hilal.findMany();
    return hilals;
}

export default async function HilalManagement() {
    const hilals = await getHilals();

    return (
        // px-10 py-6
        <div className="flex flex-col">
            <h1 className="text-2xl font-semibold my-4">Manajemen Hilal</h1>
            <div className="flex flex-wrap pb-8 justify-center gap-x-12 gap-y-8">
                <Suspense fallback={<div>Fetching data...</div>}>
                    <HilalCards hilals={hilals} />
                </Suspense>
            </div>
        </div>
    );
}
