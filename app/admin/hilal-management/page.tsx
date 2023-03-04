import Image from "next/image";

export default function HilalManagement() {
    return (
        <div className="flex flex-col px-10 py-6">
            <h1 className="text-2xl font-semibold my-4">Manajemen Hilal</h1>
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-8">
                <div className="card flex flex-col w-4/5 md:w-2/5 bg-slate-500 rounded-md shadow-lg">
                    <div className="bg-slate-100 w-full rounded-t-md">
                        <Image
                            className="object-cover rounded-t-md"
                            src="https://picsum.photos/300/200"
                            alt="hilal"
                            width={300}
                            height={200}
                            layout="responsive"
                        />
                    </div>
                    <div className="flex p-4">
                        <div className="w-3/5">
                            Hilal - 1
                        </div>
                        <div className="w-2/5">
                            xx-yy-zzzz
                        </div>
                    </div>
                    <div className="flex">
                        <div className="flex justify-center w-1/3 p-4 bg-blue-300 rounded-bl-md">
                            Request
                        </div>
                        <div className="flex justify-center w-1/3 p-4 bg-yellow-300">
                            Edit
                        </div>
                        <div className="flex justify-center w-1/3 p-4 bg-red-300 rounded-br-md">
                            Delete
                        </div>
                    </div>
                </div>
                <div className="card flex flex-col w-4/5 md:w-2/5 bg-slate-500 rounded-md shadow-lg">
                    <div className="bg-slate-100 w-full rounded-t-md">
                        <Image
                            className="object-cover rounded-t-md"
                            src="https://picsum.photos/300/200"
                            alt="hilal"
                            width={300}
                            height={200}
                            layout="responsive"
                        />
                    </div>
                    <div className="flex p-4">
                        <div className="w-3/5">
                            Hilal - 1
                        </div>
                        <div className="w-2/5">
                            xx-yy-zzzz
                        </div>
                    </div>
                    <div className="flex">
                        <div className="flex justify-center w-1/3 p-4 bg-blue-300 rounded-bl-md">
                            Request
                        </div>
                        <div className="flex justify-center w-1/3 p-4 bg-yellow-300">
                            Edit
                        </div>
                        <div className="flex justify-center w-1/3 p-4 bg-red-300 rounded-br-md">
                            Delete
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
