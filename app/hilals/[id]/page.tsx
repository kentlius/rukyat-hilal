import prisma from "@/lib/prisma";
import { Suspense } from "react";
import HilalCarousel from "@/components/HilalCarousel";

async function getHilal(hilalId: number) {
  const hilal = await prisma.hilal.findUnique({
    where: {
      id: Number(hilalId),
    },
    include: {
      owner: {
        select: {
          name: true,
          institution: true,
        },
      },
      images: true,
    },
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

  if (!isNaN(hilalId)) {
    const hilal = await getHilal(hilalId);

    return (
      <div className="flex flex-col px-10 py-6">
        <Suspense fallback={<>Fetching data...</>}>
          {hilal === null ? (
            <div className="my-10 flex justify-center text-xl font-semibold">
              Tidak Terdapat Hasil Rukyat Hilal dengan ID {hilalId}
            </div>
          ) : (
            <>
              <h1 className="my-4 text-2xl font-semibold">
                {hilal.description}
              </h1>
              <div className="mx-auto flex min-h-[500px] w-[95%] rounded-lg bg-yellow-400/60 px-5 py-4 drop-shadow-lg md:w-5/6">
                <div className="flex w-[60%] items-center justify-center">
                  <HilalCarousel images={hilal.images} />
                </div>
                <div className="flex w-[40%] flex-col justify-center px-3">
                  <h2 className="my-4 text-xl font-semibold">
                    {hilal.description}
                  </h2>
                  <p className="">
                    <span className="font-semibold">Tanggal : </span>
                    {hilal.createdAt.toLocaleDateString("en-GB", dateOpt)}
                  </p>
                  <p className="">
                    <span className="font-semibold">Waktu : </span>
                    {hilal.createdAt.toLocaleTimeString("en-US", timeOpt)} WIB
                  </p>
                  <p className="">
                    <span className="font-semibold">Lokasi : </span>
                    Kupang
                  </p>
                  <p className="">
                    <span className="font-semibold">Lembaga : </span>
                    {hilal.owner.institution}
                  </p>
                  <p className="">
                    <span className="font-semibold">Jenis Teleskop : </span>
                    NextStar 130SLT
                  </p>
                  <p className="">
                    <span className="font-semibold">Nama Pengamat : </span>
                    {hilal.owner.name}
                  </p>
                  <p className="">
                    <span className="font-semibold">Tinggi Hilal : </span>
                    11 11 45
                  </p>
                </div>
              </div>
            </>
          )}
        </Suspense>
      </div>
    );
  } else {
    return <>URL TIDAK VALID</>;
  }
}
