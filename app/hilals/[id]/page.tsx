import prisma from "@/lib/prisma";
import HilalCarousel from "@/components/HilalCarousel";

export default async function HilalDetail() {
    return (
        <div className="flex flex-col px-10 py-6">
            <h1 className="text-2xl font-semibold my-4">
                Hilal 1 Ramadhan 1443 H
            </h1>
            <div className="flex px-5 py-4 min-h-[500px] w-[95%] md:w-5/6 mx-auto bg-yellow-400 rounded-lg drop-shadow-lg">
                <div className="flex items-center justify-center w-[60%] bg-red-400">
                    <HilalCarousel />
                </div>
                <div className="flex flex-col px-3 justify-center w-[40%] bg-blue-400">
                    <h2 className="text-xl font-semibold my-4">
                        Hilal 1 Ramadhan 1443 H
                    </h2>
                    <p className="">
                        <span className="font-semibold">Tanggal : </span> 
                        2 April 2022</p>
                    <p className="">
                        <span className="font-semibold">Waktu : </span>
                        18:30 WIB</p>
                    <p className="">
                        <span className="font-semibold">Lokasi : </span>
                        Kupang</p>
                    <p className="">
                        <span className="font-semibold">Lembaga : </span>
                        Stasiun Geofisika Kupang</p>
                    <p className="">
                        <span className="font-semibold">Jenis Teleskop : </span>
                        NextStar 130SLT</p>
                    <p className="">
                        <span className="font-semibold">Nama Pengamat : </span>
                        Michael Budiman</p>
                    <p className="">
                        <span className="font-semibold">Tinggi Hilal : </span>
                        11 11 45</p>
                </div>
            </div>
        </div>
    );
}
