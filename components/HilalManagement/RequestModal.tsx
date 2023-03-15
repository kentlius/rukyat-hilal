"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LoadingDots from "@/components/loading-dots";
import toast from "react-hot-toast";

export default function RequestModal (
{setModalContent, setModalOpen, content}:
{
  setModalContent: any,
  setModalOpen: any,
  content: any,
}
) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    
    function validateHilalHandler(accept: Boolean) {
        setLoading(true);
        const newStat = accept ? "APPROVED" : "REJECTED";

        const targetApi = `/api/hilals/${content.id}`;
        fetch(targetApi, {
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
                url: content.url,
                description: content.description,
                status: newStat,
            }),
        }).then(async (res) => {
            setLoading(false);
            if (res.status === 200) {
                setModalOpen();
                setModalContent({});
                if (accept) {
                    toast.success(`Validasi data ${content.description} telah berhasil diterima!`);
                } else {
                    toast.success(`Validasi data ${content.description} telah berhasil ditolak!`);
                }
                setTimeout(() => {
                    router.push("/admin/hilal-management");
                }, 2000);
            } else {
                toast.error(await res.text());
            }
        });
    }
    
  return (
    <div className="fixed top-0 flex w-screen h-screen justify-center items-center bg-slate-500/50 z-20">
        <div className="flex flex-col w-2/3 md:w-1/2 h-1/2 p-6 bg-slate-50 rounded-md shadow-md">
            <div className="flex justify-end" onClick={() => {
                    setModalOpen();
                    setModalContent({});
                }}>
                <button className="hover:bg-slate-200 px-3 py-2 rounded-sm text-base border-none ease-in-out duration-300">X</button>
            </div>
            
            <div className="TITLE text-center text-xl font-semibold">
                <h1>Validasi {content.description}</h1>
            </div>

            <div className="BODY flex flex-[50%] justify-center items-center text-lg">
                <h1 className="text-center">Apakah anda yakin untuk memvalidasi hasil pengamatan {content.description}?</h1>
            </div>
            
            <div className="BUTTON flex flex-[10%] justify-center items-center">
                <button 
                    disabled={loading}
                    className="py-2 m-3 w-2/5 rounded-sm bg-green-400 hover:bg-green-500 hover:w-3/5 ease-in-out duration-300" 
                    onClick={() => {
                        validateHilalHandler(true);
                    }}>
                        {loading ? (
                            <LoadingDots color="#808080" />
                        ) : (
                            "Terima"
                        )}
                    </button>
                <button 
                    disabled={loading}
                    className="py-2 m-3 w-2/5 rounded-sm bg-red-400 hover:bg-red-500 hover:w-3/5 ease-in-out duration-300"
                    onClick={() => {
                        validateHilalHandler(false);
                    }}>
                        {loading ? (
                            <LoadingDots color="#808080" />
                        ) : (
                            "Tolak"
                        )}
                    </button>
            </div>
        </div>
    </div>
  )
}
