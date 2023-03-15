"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LoadingDots from "@/components/loading-dots";
import toast from "react-hot-toast";

export default function EditModal (
{setModalContent, setModalOpen, content}:
{
    setModalContent: any,
    setModalOpen: any,
    content: any,
}
) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

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
                    <h1>Edit {content.description}</h1>
                </div>

                <div className="BODY flex flex-[60%] justify-center items-center text-lg">
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
                                toast.success(`Data ${content.description} telah berhasil diubah!`);
                                setTimeout(() => {
                                    router.push("/admin/hilal-management");
                                }, 2000);
                            } else {
                                toast.error(await res.text());
                            }
                        });
                    }}
                    className="flex flex-col w-full space-y-4 bg-gray-50"
                    >
                    <div className="px-5">
                        <label
                            htmlFor="description"
                            className="block text-xs text-gray-600 uppercase"
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
                            className="block text-xs text-gray-600 uppercase"
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
                    <div className="BUTTON flex justify-center items-end">
                        <button 
                            disabled={loading}
                            className="py-2 mx-3 mt-6 w-2/5 rounded-sm bg-green-400 hover:bg-green-500 hover:w-3/5 ease-in-out duration-300"
                        >
                            {loading ? (
                                <LoadingDots color="#808080" />
                            ) : (
                                "Simpan"
                            )}
                        </button>
                        <button 
                            onClick={() => {
                                setModalOpen();
                                setModalContent({});
                            }}
                            className="py-2 mx-3 mt-6 w-2/5 rounded-sm bg-slate-200 hover:bg-slate-300 hover:w-3/5 ease-in-out duration-300"
                        >Batal</button>    
                    </div>
                    </form>                
                </div>
            </div>
        </div>
    );
}
