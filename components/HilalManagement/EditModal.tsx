"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LoadingDots from "@/components/loading-dots";
import toast from "react-hot-toast";

export default function EditModal({
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
          <h1>Edit {content.description}</h1>
        </div>

        <div className="BODY flex flex-[60%] items-center justify-center text-lg">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setLoading(true);

              const target = e.target as typeof e.target & {
                description: { value: string };
                url: { value: string };
              };
              const newDesc = target.description.value;
              const newUrl = target.url.value;

              const targetApi = `/api/hilals/${content.id}`;
              fetch(targetApi, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  url: newUrl,
                  description: newDesc,
                  status: content.status,
                }),
              }).then(async (res) => {
                setLoading(false);
                if (res.status === 200) {
                  setModalOpen();
                  setModalContent({});
                  toast.success(
                    `Data ${content.description} telah berhasil diubah!`
                  );
                  setTimeout(() => {
                    router.push("/admin/hilal-management");
                  }, 2000);
                } else {
                  toast.error(await res.text());
                }
              });
            }}
            className="flex w-full flex-col space-y-4 bg-gray-50"
          >
            <div className="px-5">
              <label
                htmlFor="description"
                className="block text-xs uppercase text-gray-600"
              >
                Deskripsi
              </label>
              <input
                defaultValue={content.description}
                id="description"
                name="description"
                type="text"
                required
                className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
              />
            </div>
            <div className="px-5">
              <label
                htmlFor="url"
                className="block text-xs uppercase text-gray-600"
              >
                URL
              </label>
              <input
                defaultValue={content.url}
                id="url"
                name="url"
                type="text"
                required
                className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
              />
            </div>
            <div className="BUTTON flex items-end justify-center">
              <button
                disabled={loading}
                className="mx-3 mt-6 w-2/5 rounded-sm bg-green-400 py-2 duration-300 ease-in-out hover:w-3/5 hover:bg-green-500"
              >
                {loading ? <LoadingDots color="#808080" /> : "Simpan"}
              </button>
              <button
                onClick={() => {
                  setModalOpen();
                  setModalContent({});
                }}
                className="mx-3 mt-6 w-2/5 rounded-sm bg-slate-200 py-2 duration-300 ease-in-out hover:w-3/5 hover:bg-slate-300"
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
