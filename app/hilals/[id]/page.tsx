import prisma from "@/lib/prisma";
import { Suspense } from "react";
import HilalCarousel from "@/components/HilalCarousel";

async function getHilal(hilalId: number) {
    const hilal = await prisma.hilal.findUnique({
        where:{
            id: Number(hilalId),
        },
        include:{
            owner: {
                select: {
                    name: true,
                    institution: true,
                },
            },
            images: true,
        }
    });
    return hilal;
}

export default async function HilalDetail (
    { params }: { 
        params: { 
            id: number 
        }, 
    }
) {
    // casting params.id to number type
    const hilalId = Number(params.id);
    // option for date string
    const dateOpt = {
        day: '2-digit' as const, 
        month: 'long' as const, 
        year: 'numeric' as const,
    };
    // option for time string
    const timeOpt = {
        timeZone: 'Asia/Jakarta' as const, 
        hour: '2-digit' as const, 
        minute: '2-digit' as const, 
        hour12: false as const, // format as 24-hour time
    };

    if(!isNaN(hilalId)) {
        const hilal = await getHilal(hilalId);
        
        return (
            <div className="flex flex-col px-10 py-6">
                <Suspense fallback={ <>Fetching data...</> }>
                    { hilal === null ? 
                        <div className="flex justify-center my-10 font-semibold text-xl">
                            Tidak Terdapat Hasil Rukyat Hilal dengan ID { hilalId }
                        </div> 
                    : 
                    <>
                        <h1 className="text-2xl font-semibold my-4">
                            { hilal.description }
                        </h1>
                        <div className="flex px-5 py-4 min-h-[500px] w-[95%] md:w-5/6 mx-auto bg-yellow-400/60 rounded-lg drop-shadow-lg">
                            <div className="flex items-center justify-center w-[60%]">
                                <HilalCarousel images={ hilal.images } />
                            </div>
                            <div className="flex flex-col px-3 justify-center w-[40%]">
                                <h2 className="text-xl font-semibold my-4">
                                    { hilal.description }
                                </h2>
                                <p className="">
                                    <span className="font-semibold">Tanggal : </span> 
                                    { hilal.createdAt.toLocaleDateString('en-GB', dateOpt) }
                                </p>
                                <p className="">
                                    <span className="font-semibold">Waktu : </span>
                                    { hilal.createdAt.toLocaleTimeString('en-US', timeOpt) } WIB
                                </p>
                                <p className="">
                                    <span className="font-semibold">Lokasi : </span>
                                    Kupang
                                </p>
                                <p className="">
                                    <span className="font-semibold">Lembaga : </span>
                                    { hilal.owner.institution }
                                </p>
                                <p className="">
                                    <span className="font-semibold">Jenis Teleskop : </span>
                                    NextStar 130SLT
                                </p>
                                <p className="">
                                    <span className="font-semibold">Nama Pengamat : </span>
                                    { hilal.owner.name }
                                </p>
                                <p className="">
                                    <span className="font-semibold">Tinggi Hilal : </span>
                                    11 11 45
                                </p>
                            </div>
                        </div>
                    </> 
                    }
                </Suspense>
            </div>
        );
    }
    else {
        return(
            <>URL TIDAK VALID</>
        );
    }
}
