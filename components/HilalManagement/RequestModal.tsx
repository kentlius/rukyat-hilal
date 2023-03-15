"use client";

export default function RequestModal (
{setModalContent, setModalOpen, content}:
{
  setModalContent: any,
  setModalOpen: any,
  content: any,
}
) {
  return (
    <div className="fixed top-0 flex w-screen h-screen justify-center items-center bg-slate-500/50 z-20">
        <div className="flex flex-col w-1/2 h-1/2 p-6 bg-slate-50 rounded-md shadow-md">
            <div className="flex justify-end" onClick={() => {
                    setModalOpen();
                    setModalContent({});
                }}>
                <button className="hover:bg-slate-200 px-3 py-2 rounded-sm text-base border-none ease-in-out duration-300">X</button>
            </div>
            <div className="text-center text-xl font-semibold mt-2">
                <h1>Validasi {content.description}</h1>
            </div>
            <div className="flex flex-[50%] justify-center items-center text-center text-lg">
                <p>Apakah anda yakin untuk memvalidasi hasil pengamatan {content.description}?</p>
            </div>
            <div className="flex flex-[10%] justify-center items-center">
                <button className="py-2 m-3 w-2/5 rounded-sm bg-green-400 hover:bg-green-500 hover:w-3/5 ease-in-out duration-300" onClick={() => {
                    setModalOpen();
                    setModalContent({});
                }}>Terima</button>
                <button className="py-2 m-3 w-2/5 rounded-sm bg-red-400 hover:bg-red-500 hover:w-3/5 ease-in-out duration-300">Tolak</button>
            </div>
        </div>
    </div>
  )
}
