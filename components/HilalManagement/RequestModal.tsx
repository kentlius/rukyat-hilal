"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LoadingDots from "@/components/loading-dots";
import toast from "react-hot-toast";

export default function RequestModal({
  setModalContent,
  setModalOpen,
  content,
}: {
  setModalContent: any;
  setModalOpen: any;
  content: any;
}) {
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
          toast.success(
            `Validasi data ${content.description} telah berhasil diterima!`
          );
        } else {
          toast.success(
            `Validasi data ${content.description} telah berhasil ditolak!`
          );
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
    <div className="fixed top-0 z-20 flex h-screen w-screen items-center justify-center bg-slate-500/50">
      <div className="flex h-1/2 w-2/3 flex-col rounded-md bg-slate-50 p-6 shadow-md md:w-1/2">
        <div
          className="flex justify-end"
          onClick={() => {
            setModalOpen();
            setModalContent({});
          }}
        >
          <button className="rounded-sm border-none px-3 py-2 text-base duration-300 ease-in-out hover:bg-slate-200">
            X
          </button>
        </div>

        <div className="TITLE text-center text-xl font-semibold">
          <h1>Validasi {content.description}</h1>
        </div>

        <div className="BODY flex flex-[50%] items-center justify-center text-lg">
          <h1 className="text-center">
            Apakah anda yakin untuk memvalidasi hasil pengamatan{" "}
            {content.description}?
          </h1>
        </div>

        <div className="BUTTON flex flex-[10%] items-center justify-center">
          <button
            disabled={loading}
            className="m-3 w-2/5 rounded-sm bg-green-400 py-2 duration-300 ease-in-out hover:w-3/5 hover:bg-green-500"
            onClick={() => {
              validateHilalHandler(true);
            }}
          >
            {loading ? <LoadingDots color="#808080" /> : "Terima"}
          </button>
          <button
            disabled={loading}
            className="m-3 w-2/5 rounded-sm bg-red-400 py-2 duration-300 ease-in-out hover:w-3/5 hover:bg-red-500"
            onClick={() => {
              validateHilalHandler(false);
            }}
          >
            {loading ? <LoadingDots color="#808080" /> : "Tolak"}
          </button>
        </div>
      </div>
    </div>
  );
}
