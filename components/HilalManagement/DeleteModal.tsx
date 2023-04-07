"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LoadingDots from "@/components/loading-dots";
import toast from "react-hot-toast";

export default function DeleteModal({
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

  function deleteHilalHandler() {
    setLoading(true);
    const targetApi = `/api/hilals/${content.id}`;
    fetch(targetApi, {
      method: "DELETE",
    }).then(async (res) => {
      setLoading(false);
      if (res.status === 200) {
        setModalOpen();
        setModalContent({});
        toast.success(`Data ${content.description} telah berhasil dihapus!`);
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
          <h1>Hapus {content.description}</h1>
        </div>

        <div className="BODY flex flex-[50%] items-center justify-center text-lg">
          <h1 className="text-center">
            Apakah anda yakin untuk menghapus hasil pengamatan{" "}
            {content.description} dari database?
          </h1>
        </div>

        <div className="BUTTON flex flex-[10%] items-center justify-center">
          <button
            disabled={loading}
            className="m-3 w-2/5 rounded-sm bg-red-400 py-2 duration-300 ease-in-out hover:w-3/5 hover:bg-red-500"
            onClick={() => {
              deleteHilalHandler();
            }}
          >
            {loading ? <LoadingDots color="#808080" /> : "Hapus"}
          </button>
          <button
            onClick={() => {
              setModalOpen();
              setModalContent({});
            }}
            className="m-3 w-2/5 rounded-sm bg-slate-200 py-2 duration-300 ease-in-out hover:w-3/5 hover:bg-slate-300"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
}
